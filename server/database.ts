const mariadb = require("mariadb");

const database = {
    pool: mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5
      }),
      addFeitje: async function(feitje) {
        let conn;
        try {
        // connectie maken met de database
        conn = await this.pool.getConnection();
        const row = await conn.query("SELECT * FROM gebruikers WHERE username = ?", [feitje]);
        // als de gebruiker niet bestaat in de database is de row leer
      } catch (err) {
        // als er een error is, log deze dan
        console.log("db error");
        console.log(err);
      throw err;
      } finally {
        if (conn) return conn.end();
      }
}
}

module.exports = database;