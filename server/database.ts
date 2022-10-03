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
      }
}

module.exports = database;