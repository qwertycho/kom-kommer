const mariadb = require("mariadb");
const DBescape = require("./DBescape");

let conn = false;

const pool = mariadb.createPool({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name,
  connectionLimit: 5
});

const database = {

  checkConnectie: async () => {
    if (!conn) {
      try{
        conn = await pool.getConnection();
      } catch (err) {
        console.log(err);
        return false;
      }
    } else{
      return true;
    }
  },

  addFeitje: async function(feitje) {

    await this.checkConnectie();

    try {
      feitje = DBescape.SQLescape(feitje);
      const row = await conn.query("INSERT INTO feitjes (feit) VALUES (?)", [feitje]);

    } catch (err) {
        // als er een error is, log deze dan
        console.log(`DB addFeitje error ${err}`);
        throw err;
    }
  },

  updateFeitje: async function(ID,feitje) {

    await this.checkConnectie();	

    try {
      feitje = DBescape.SQLescape(feitje);
      const row = await conn.query("UPDATE feitjes SET feit = (?) WHERE feit_ID=(?)", [feitje, ID]);
    } catch (err) {
      // als er een error is, log deze dan
      console.log(`DB updateFeitje error ${err}`);
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  },

  deleteFeitje: async function(ID) {
    
    await this.checkConnectie();

    try {
    const row = await conn.query("DELETE FROM feitjes WHERE feit_ID=(?)", [ID]);
  } catch (err) {
    // als er een error is, log deze dan
    console.log(`DB deletefeitje error ${err}`);
  throw err;
  } finally {
    if (conn) return conn.end();
  }
},

  loadFeitjes: async function() {
    try {

      await this.checkConnectie();

      const rows = await conn.query("SELECT * FROM feitjes");
      conn.end();
      rows.forEach(element => {
        let string = element.feit;
        string = DBescape.SQLunescape(string);
        element.feit = DBescape.HTMLescape(string);
      });
      return rows;
    } catch (err) {
        console.log(`DB loadfeitjes error ${err}`);
    }
  },

  insert: async function(data) {

    await this.checkConnectie();

    try {
      let waardes = [];
          
      data.values.forEach(element => {
        waardes.push(`'${DBescape.SQLescape(element)}'`);
      });

      const query = `INSERT INTO ${data.table} (${data.rows}) VALUES (${waardes})`;
      console.log(query);
          
      const rows = await conn.query(query);

      return "rows";
    } catch (err) {
        console.log(`DB insert error ${err}`);
    }
  },

  select: async function(data){

    await this.checkConnectie();

      try {
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

        return(rows);
      } catch (err) {
          console.log(`DB select error ${err}`);
      }
  },

  delete: async function(data){

    await this.checkConnectie();

      try {
                        
        let query = `DELETE FROM ${data.table}`;
        if(data.where){
        query += ` WHERE ${data.where} = ${data.value}`;
        const rows = await conn.query(query);
        return(rows.effectedRows);
      }
        console.log(query);
        throw new Error("No where clause");
      } catch (err) {
        console.log(`DB delete error ${err}`);
      }
  },

  getURL: async function() {

    await this.checkConnectie();

    try {

      // select top 5 most common urls
      const rows = await conn.query("SELECT url, COUNT(url) AS count FROM badPages GROUP BY url ORDER BY count DESC LIMIT 10");
      return rows;
    } catch (err) {
      console.log(`DB getUrl error ${err}`);
      throw err;
    }
  },

  quizStats: async function(data) {

    await this.checkConnectie();

      try {
        // de query voor het opvragen van de quiz stats
        const vraagQ = `SELECT quizVraag FROM quiz WHERE ${data.where}`;
        const countQ = `SELECT COUNT(*) as count FROM quizResultaten WHERE ${data.where} `;
        const uniekQ = "SELECT DISTINCT(antwoord) FROM quizResultaten";

        let stats = {
          vraag: "",
          count: 0,
          vragen: [],
        }

        async function getVraagCount(antwoord){
            const count = await conn.query(`SELECT count(antwoord) FROM quizResultaten WHERE antwoord = '${antwoord}' AND ${data.where}`);
                
            stats.vragen.push({
              antwoord: antwoord,
              count: count[0]["count(antwoord)"],
            });
            return("done");
        }

        const vraag = await conn.query(vraagQ);
        stats.vraag = vraag[0].quizVraag;
          
        const uniek = await conn.query(uniekQ);
        uniek.forEach(element => {
          getVraagCount(element.antwoord);
        });
            

        // selecteer count from all distinct quiz results
        const count = await conn.query(countQ);                        
        stats.count = count[0]["count"];            

        return(stats);
      } catch (err) {
        console.log(`DB quizstats error ${err}`);
      }
  },

  badPages: async function(url, ip) {
      
      await this.checkConnectie();
  
      try {
        // de query voor het opvragen van de quiz stats
        // let url = DBescape.SQLescape(url);
        // let ip = DBescape.SQLescape(ip);

        // prevent sql injection with prepared statements
        let query = "INSERT INTO badPages (url, ip) VALUES (?,?)";
        const rows = await conn.query(query, [url, ip]);
  
      } catch (err) {
        console.log(`DB badpages error ${err}`);
      }
    }
}

module.exports = database;