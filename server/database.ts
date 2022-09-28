const mariadb = require("mariadb");

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
        feitje = this.SQLescape(feitje);
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
      feitje = this.SQLescape(feitje);
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
            element.feit = this.HTMLescape(element.feit);
            
          });
          return rows;
        } catch (err) {
          console.log("db error");
          console.log(err);
          throw err;
        }
      },
// sanetisation
      SQLescape: function(string){
        string = string.replace(/'/g, "\\'");
        string = string.replace(/"/g, '\\"');
        string = string.replace(/\\/g, "\\\\");
        string = string.replace(/`/g, "\\`");
        string = string.replace(/\$/g, "\\$");
        string = string.replace(/%/g, "\\%");
        string = string.replace(/;/g, "\\;");
        string = string.replace(/</g, "\\<");
        string = string.replace(/>/g, "\\>");
        string = string.replace(/\(/g, "\\(");
        string = string.replace(/\)/g, "\\)");
        string = string.replace(/\+/g, "\\+");
        string = string.replace(/\-/g, "\\-");
        string = string.replace(/\*/g, "\\*");
        string = string.replace(/\//g, "\\/");
        string = string.replace(/\^/g, "\\^");
        string = string.replace(/=/g, "\\=");
        string = string.replace(/!/g, "\\!");
        string = string.replace(/#/g, "\\#");
        string = string.replace(/~/g, "\\~");
        string = string.replace(/@/g, "\\@");
        string = string.replace(/&/g, "\\&");
        string = string.replace(/\|/g, "\\|");
        string = string.replace(/\[/g, "\\[");
        string = string.replace(/\]/g, "\\]");
        string = string.replace(/\{/g, "\\{");
        string = string.replace(/\}/g, "\\}");
        string = string.replace(/\?/g, "\\?");
        string = string.replace(/:/g, "\\:");
        string = string.replace(/,/g, "\\,");
        string = string.replace(/\./g, "\\.");
        string = string.replace(/\s/g, "\\s");
        return string;
      },

      HTMLescape: function(string){
        string = string.replace(/&/g, "&amp;");
        string = string.replace(/</g, "&lt;");
        string = string.replace(/>/g, "&gt;");
        string = string.replace(/"/g, "&quot;");
        string = string.replace(/'/g, "&#039;");
        string = string.replace(/\\s/g, "   ");
        return string;
      }
}

module.exports = database;