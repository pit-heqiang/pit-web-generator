const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const getConnection = require("./common/connection");

/**
 * vsce package打包 会打包package.json dependencies 下的插件
 * @param {*} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "pit-web-generator.webGenerator",
    () => {
      const webGeneratorConfig =
        vscode.workspace
          .getConfiguration()
          .get("pit-web-generator.webGeneratorConfig") || {};
      const panel = vscode.window.createWebviewPanel(
        "pit-web-generator",
        "pit-web-generator",
        vscode.ViewColumn.One,
        {
          enableScripts: true, // 启用js
          retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        }
      );
      let connectionObj = null;

      panel.webview.html = getWebViewContent(
        context,
        "./dist/index.html",
        panel.webview
      );
      panel.webview.onDidReceiveMessage(
        (res) => {
          switch (res.command) {
            case "getConnection":
              if (connectionObj && connectionObj.connection) {
                connectionObj.connection.end(() => {
                  connectionObj = null;
                  connectionObj = createConnection(res.data, panel.webview);
                });
              } else {
                connectionObj = createConnection(res.data, panel.webview);
              }
              break;
            case "getTableName":
              connectionObj.getTableName(res.data, (data) => {
                webPostMessage(res.command, panel.webview, data);
              });
              break;
            case "getTableColumn":
              connectionObj.getTableColumn(
                res.data.dataBase,
                res.data.tableName,
                (data) => {
                  webPostMessage(res.command, panel.webview, data);
                }
              );
              break;
            case "getTemplateUrl":
              showOpenFileDialog(panel.webview, res.command, res.data);
              break;
            case "getFolderUrl":
              showOpenFileDialog(panel.webview, res.command, {});
              break;
            case "createAFile":
              createAFile(res.data, panel.webview);
              break;
            case "tips":
              vscode.window.showInformationMessage(res.text);
              break;
          }
        },
        undefined,
        context.subscriptions
      );
      webPostMessage("webGeneratorConfig", panel.webview, webGeneratorConfig);
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * 获取html模板
 * @param context
 * @param templatePath
 * @returns
 */
function getWebViewContent(context, templatePath, webview) {
  const resourcePath = path.join(context.extensionPath, templatePath);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, "utf-8");
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  html = html.replace(/(src="|href=")(.+?)"/g, (m, $1, $2) => {
    return (
      $1 +
      webview.asWebviewUri(vscode.Uri.file(path.resolve(dirPath, $2))) +
      '"'
    );
  });
  return html;
}

/**
 * 渲染模板
 * @param {*} path
 * @param {*} templateData
 * @param {*} callBack
 */
const renderTemplate = (path, templateData, callBack) => {
  fs.readFile(path, function (err, res) {
    //判断读取是否成功，输出想对应的值
    if (err) {
      console.log("读取模板文件失败" + err);
      return;
    }
    const renderTemplate = ejs.render(res.toString(), templateData, {});
    callBack && callBack(renderTemplate);
  });
};

/**
 * 生成文件
 * @param {*} res
 * @param {*} webview
 */
const createAFile = (res, webview) => {
  const url = `${res.generateForm.path}/${res.generateForm.fileName}`;
  renderTemplate(res.generateForm.templateFile, res.data, (str) => {
    fs.writeFile(url, str, function (err) {
      webPostMessage("tips", webview, {
        type: err ? "error" : "success",
        message: err ? "生成失败" : "生成成功",
      });
    });
  });
};

/**
 * 选择文件夹
 * @param {*} webview
 * @param {*} command
 * @param {*} obj
 */
const showOpenFileDialog = (webview, command, obj) => {
  let options = Object.assign(
    {
      canSelectFiles: false, //是否可选择文件
      canSelectFolders: true, //是否可选择目录
      canSelectMany: false, //是否可多选
      defaultUri: vscode.Uri.file("D:/VScode"), //默认打开的文件夹
      openLabel: "选择文件夹",
    },
    obj
  );
  //向用户显示“文件打开”对话框，允许用户选择用于打开目的的文件。
  vscode.window.showOpenDialog(options).then((result) => {
    if (!result) {
      return;
    }
    let loadUri = result[0].path.toString();
    let loadDir = loadUri.substr(1, loadUri.length);
    webPostMessage(command, webview, loadDir);
  });
};

/**
 * 创建数据库连接
 * @param config
 */
const createConnection = (config, webview) => {
  const connectionObj = new getConnection(config, webview, () => {
    connectionObj.getDataBases((res) => {
      webPostMessage("getDataBases", webview, res);
    });
  });
  return connectionObj;
};

/**
 * 向页面发送信息
 * @param webview
 */
const webPostMessage = (command, webview, data) => {
  webview.postMessage({
    command,
    data,
  });
};

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
