const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
    console.log(__dirname);
    response.sendFile(__dirname+='/index.html');
});

app.post('/', (request, response) => {
    let nimi = request.body.nimi;
    let vanus = Number(request.body.vanus);
    let pikkus = Number(request.body.pikkus);
    let kaal = Number(request.body.kaal);

    response.setHeader("Content-Type", "application/json; charset=utf-8");

    if(vanus > 20 && vanus < 60){
        pikkus = pikkus / 100;
        let valem = kaal / (pikkus*pikkus);
        valem = valem.toFixed(1);
        let tabel = '';
        if(valem < 19){ tabel = 'alakaal'; }
        else if(valem < 24.9 && valem > 19){ tabel = 'normaalkaal'; }
        else if(valem < 29.9 && valem > 25){ tabel = 'ülekaal'; }
        else if(valem > 30){ tabel = 'rasvumine'; }

        response.write(`Tere ${nimi}, sinu kehamassiindeks on: ${valem}\n`);
        response.write(`Sul on ${tabel}`);
        response.send();
    }
    else {
        response.send(`Tere ${nimi}, kahjuks annab programm ainult õigeid tulemusi vaid vanusevahemikus 20-60 aastat.`);
    }
});

// Ctrl + C
app.listen(8000, function() {
    console.log('Server is running on Port 8000');
});