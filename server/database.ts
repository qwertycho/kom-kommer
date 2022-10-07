const mariadb = require("mariadb");
const DBescape = require("./DBescape");

const database = {
    pool: mariadb.createPool({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_pass,
        database: process.env.DB_name,
        connectionLimit: 5
      }),

      addFeitje: async function(feitje) {
        let conn;
        try {
        // connectie maken met de database
        conn = await this.pool.getConnection();
        feitje = DBescape.SQLescape(feitje);
        const row = await conn.query("INSERT INTO feitjes (feit) VALUES (?)", [feitje]);
      } catch (err) {
        // als er een error is, log deze dan
        console.log("db error");
        console.log(err);
      throw err;
      } finally {
        if (conn) return conn.end();
      }
    },

    updateFeitje: async function(ID,feitje) {
      let conn;
      try {
      // connectie maken met de database
      conn = await this.pool.getConnection();
      feitje = DBescape.SQLescape(feitje);
      const row = await conn.query("UPDATE feitjes SET feit = (?) WHERE feit_ID=(?)", [feitje, ID]);
    } catch (err) {
      // als er een error is, log deze dan
      console.log("db error");
      console.log(err);
    throw err;
    } finally {
      if (conn) return conn.end();
    }
  },

  deleteFeitje: async function(ID) {
    let conn;
    try {
    // connectie maken met de database
    conn = await this.pool.getConnection();
    const row = await conn.query("DELETE FROM feitjes WHERE feit_ID=(?)", [ID]);
  } catch (err) {
    // als er een error is, log deze dan
    console.log("db error");
    console.log(err);
  throw err;
  } finally {
    if (conn) return conn.end();
  }
},
      loadFeitjes: async function() {
        try {
        let conn;
          conn = await this.pool.getConnection();
          const rows = await conn.query("SELECT * FROM feitjes");
          conn.end();
          rows.forEach(element => {
            let string = element.feit;
            string = DBescape.SQLunescape(string);
            element.feit = DBescape.HTMLescape(string);
          });
          return rows;
        } catch (err) {
          console.log("db error");
          console.log(err);
          throw err;
        }
      },

      insert: async function(data) {
        try {
        let conn;
          conn = await this.pool.getConnection();
          console.log("inserting data");
          console.log("table");
          console.log(data.table);
          console.log("rows");
          console.log(data.rows);
          console.log("values");
          console.log(data.values);
          let waardes = [];
          
          data.values.forEach(element => {
            waardes.push(`'${DBescape.SQLescape(element)}'`);
          });

          const query = `"INSERT INTO ${data.table} (${data.rows}) VALUES (${waardes})"`;
          console.log(query);
          
          const rows = await conn.query(`INSERT INTO ${data.table} (${data.rows}) VALUES (${waardes})`);

          conn.end();
          return "rows";
        } catch (err) {
          console.log("db error");
          console.log(err);
          throw err;
        }
      },
      select: async function(data){
        return new Promise(async (resolve, reject) => {
          try {
            let conn;
            conn = await this.pool.getConnection();
            console.log("selecting data");
            let waardes = [];
            
            let query = `SELECT ${data.rows} FROM ${data.table}`;
            if(data.where){
              query += ` WHERE ${data.where} = ${data.waardes}`;
            }
            if(data.order){
              query += ` ORDER BY ${data.order}`;
            }
            if(data.limit){
              query += ` LIMIT ${data.limit}`;
            }
            console.log(query);
            
              const rows = await conn.query(query);
              conn.end();
              let result = [];
              rows.forEach(element => {
                let string = element.feit;
                string = DBescape.SQLunescape(string);
                result.push(DBescape.HTMLescape(string));
              });

            resolve(result);
          } catch (err) {
              console.log("db error");
              console.log(err);
              reject(err);
          }
        });
      },
      delete: async function(data){
        return new Promise(async (resolve, reject) => {
          try {
            let conn;
            conn = await this.pool.getConnection();
            console.log("deleting data");
                        
            let query = `DELETE FROM ${data.table}`;
            if(data.where){
              query += ` WHERE ${data.where} = ${data.value}`;
              const rows = await conn.query(query);
              resolve(rows.effectedRows);
            }
            console.log(query);
            reject("no where");
            conn.end();
          } catch (err) {
            console.log("db error");
            console.log(err);
            reject(err);
          }
        });
      }
}

module.exports = database;