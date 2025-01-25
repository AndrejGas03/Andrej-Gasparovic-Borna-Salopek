// Kreirati vlastite GET, POST, PUT, DELETE API-je za rad s objektom 
//unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let knjige = [
    {
        "id": 1,
        "marka": "Sava",
        "dimenzije": "195/45/16",
        "god_proizvodnje": "2022",
        
    },
    {
        "id": 2,
        "marka": "Dunlop",
        "dimenzije": "205/45/16",
        "god_proizvodnje": "2024",
        
    },
]
// READ -> GET API
app.get('/getGume/', (request, response) => {
    return response.send('Popis guma');
});

app.get('/getGume/:id', (request, response) => {
    let id = request.params.id;
    let guma = "";
    gume.forEach(element => {
        if (element.id == id) {
            guma = JSON.stringify(element);
        }
    });
    return response.send('Dohvat guma '+guma);
});

// CREATE -> POST API
app.post('/addGuma', (request, response) => {
    //naslov, autor, god_izdanja, izdavac
    const data = request.body;
    const marka = data.marka;
    const dimenzije = data.dimenzije;
    const god_proizvodnje = data.god_proizvodnje;
    //const izdavac = data.izdavac;

    let guma = {
        "id": gume.length+1,
        "marka": marka,
        "dimenzije": dimenzije,
        "god_proizvodnje": god_proizvodnje,
        //"izdavac": izdavac
    };
    gume.push(guma);
    return response.send("Dodavanje gume. Novi popis: "+ JSON.stringify(gume));
        //naslov+" "+autor+ " "+god_izdanja+" "+izdavac);
});

// UPDATE -> PUT API
app.put('/updateGuma/:id', (request, response) => {
    let id = request.params.id
    const data = request.body;
    const marka = data.marka;
    const dimenzije = data.dimenzije;
    const god_proizvodnje = data.god_proizvodnje;
    //const izdavac = data.izdavac;
    return response.send('Ažuriranje guma id '+id+" marka:"+marka+" "+
        dimenzije+" "+god_proizvodnje);
});

// DELETE -> DELETE API
app.delete('/deleteGuma/:id', (request, response) => {
    let id = request.params.id
    gume.forEach(element => {
        if (element.id == id) {
            gume.pop(element); // nije dobro rješenje!!
        }
    });
    
    return response.send('Brisanje gume s id '+id+". Novi popis "+JSON.stringify(gume));
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});