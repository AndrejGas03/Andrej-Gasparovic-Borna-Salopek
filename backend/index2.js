
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    port:3306,
    user: 'agasparov',
    password: '11',
    database: 'agasparov'
  });
 
app.use(express.urlencoded({ extended: true }));
 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get("/api/gume", (request, response) => {
    
    connection.query("SELECT * FROM pzi_gume", (error, results) => {
      if (error) throw error;
      response.send(results);
    });
});

app.get("/api/gume/:id", (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM pzi_gume WHERE id = ?", id, (error, results) => {
        if (error) throw error;
        response.send(results);
      });
});
/////////////////
app.post("/api/rezerv_guma", (request, response) => {
    const data = request.body;
    rezervacija = [[data.datum, data.id_gume, data.korisnik]]

    connection.query(
      "INSERT INTO pzi_rezervacija_gume (datum_rezervacije, id_gume, korisnik) VALUES ?",
      [rezervacija],
      (error, results) => {
        if (error) throw error;
        response.send(results);
      }
    );
  });
///////////////////
  app.post("/api/unos_gume", (request, response) => {
    const data = request.body;
    gume = [[data.marka, data.dimenzije, data.god_proizvodnje]]

    connection.query("INSERT INTO pzi_gume (marka, dimenzija, godina_proizvodnje) VALUES ?", [gume], (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });

  app.listen(port, () => {
    console.log("Server running at port: " + port);
});
