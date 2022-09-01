const mysql = require('mysql');

class Mysql {
  /**
   * 初始化连接池
   * @param {*} config 
   * @param {*} webview 
   * @param {*} callBack 
   */
  constructor(config, webview, callBack) {
    this.isConnect = false;
    this.webview = webview;
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
      this.isConnect = err ? false : true;
      this.webview.postMessage({
        command: 'tips',
        data: { type: err ? 'error' : 'success', message: err ? '连接失败' : '连接成功' }
      });
      this.isConnect && callBack && callBack(err);
    });
    this.connection = connection;
  }

  /**
   * 封装查询方法
   * @param sql 
   */
  query(sql, callBack, message) {
    this.isConnect && this.connection.query(sql, (err, result) => {
      const msg = message ? message + (err ? '失败' : '成功') : err ? '查询失败' : '查询成功';
      this.webview.postMessage({
        command: 'tips',
        data: { type: err ? 'error' : 'success', message: msg }
      });
      callBack && callBack(result);
    });
  }

  /**
   * 获取数据库表名称
   * @param dataBase 
   */
  getTableName(dataBase, callBack) {
    let sql = `select table_name from information_schema.tables where table_schema='${dataBase}'`;
    this.query(sql, callBack, '获取数据库表名称');
  }

  /**
   * 获取表的字段信息
   * @param dataBase 
   * @param tableName 
   * @param callBack 
   */
  getTableColumn(dataBase, tableName, callBack) {
    let sql = `SELECT
    COLUMN_NAME as Field,
      COLUMN_COMMENT as label,
      IF
        (column_key = 'PRI', '是', '否')  primaryKey,
          IF
            (IS_NULLABLE = 'YES', '是', '否') isNull
    FROM
    INFORMATION_SCHEMA.COLUMNS
    WHERE
    table_schema = '${dataBase}'
    AND table_name in ('${tableName.join("','")}')`;
    this.query(sql, callBack, '获取表的字段信息');
  }

  /**
   * 获取数据库
   * @param {*} callBack 
   */
  getDataBases(callBack) {
    let sql = `SHOW DATABASES`;
    this.query(sql, callBack, '获取数据库');
  }
}
module.exports = Mysql;