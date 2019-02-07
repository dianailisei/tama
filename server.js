'use strict';
var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// config for your database
var config = {
    user: 'tama',
    password: 'Zq4ZU299z~-0',
    server: 'den1.mssql7.gear.host',
    database: 'tama'
};
var sql = require("mssql");

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});


/* USERS */
app.get(`/api/user`, function (req, res) {
    var id = req.query.id;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`select * from Users where Id='${id}'`, function (err, recordset) {
            if (err) console.log(err);
            else {
                res.send(recordset.recordset);
            }
        });
    });
});


app.get(`/api/users`, function (req, res) {
    var username = req.query.username;
    var pwd = req.query.password;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`select * from Users where Username='${username}' and Password='${pwd}'`, function (err, recordset) {
            if (err) console.log(err);
            else {
                // console.log(recordset);
                res.send(recordset.recordset);
            }
        });
    });
});

app.get(`/api/users/all`, function (req, res) {
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`select * from Users`, function (err, recordset) {
            if (err) console.log(err);
            else {
                res.send(recordset.recordset);
            }
        });
    });
});

app.get(`/api/users/friends`, function (req, res) {
    var id = req.query.id;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`select u.Id, u.Username, u.Country from Users as u join Friends as f on u.id = f.IdUser2 where f.IdUser1=${id}`, function (err, recordset) {
            if (err) console.log(err);
            else {
                res.send(recordset.recordset);
            }
        });
    });
});

app.post('/api/users', function (req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var country = req.body.country;
    var pwd = req.body.password;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`insert into Users(Email, Username, Password, Country) values ('${email}', '${username}', '${pwd}', '${country}')`, function (err, result) {
            if (err) console.log(err)

            let request2 = new sql.Request();
            request2.query(`SELECT Id FROM Users WHERE Email = '${email}' and Password = '${pwd}'`, function (err, recordset) {
                if (err) console.log(err)

                // console.log(recordset.recordset);
                console.log(recordset.recordset[0].Id);

                res.send(JSON.stringify({ "id": recordset.recordset[0].Id }));
                res.end();

            })
        });
    });
});

app.put('/api/users', function (req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var country = req.body.country;
    var pwd = req.body.password;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`update Users set Username = '${username}', Password = '${pwd}', Country = '${country}' where Email='${email}'`, function (err, recordset) {
            if (err) console.log(err)
            res.end();
        });
    });
});


/* Friends */

app.post('/api/friends', function (req, res) {
    var IdUser1 = req.body.id1;
    var IdUser2 = req.body.id2;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`insert into Friends (IdUser1, IdUser2) values(${IdUser1}, ${IdUser2})`, function (err, recordset) {
            if (err) console.log(err);
            res.end();
        })
    })
});

app.delete('/api/friends', function (req, res) {
    var IdUser1 = req.body.id1;
    var IdUser2 = req.body.id2;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`delete from Friends where IdUser1 = ${IdUser1} and IdUser2 = ${IdUser2}`, function (err, recordset) {
            if (err) console.log(err);
            res.end();
        })
    })
});
/* PLAYGROUND */
app.get('/api/playground', function (req, res) {
    var id = req.query.petId;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`select * from Pets where Id='${petId}'`, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});




app.put('/api/playground', function (req, res) {
    var id = req.body.Id;
    var xp = req.body.XPStatus;
    var pfs = req.body.PlayStatus;
    var pes = req.body.EnergyStatus;
    var pss = req.body.LoveStatus;
    sql.close();

    sql.connect(config, function (err) {

        if (err) console.log(err);
        var request = new sql.Request();

        request.query(`update Pets set XPStatus ='${xp}', PlayStatus ='${pfs}', EnergyStatus='${pes}' ,LoveStatus = '${pss}' where Id='${id}'`, function (err, recordset) {
            if (err) console.log(err)
            res.send();
        });
    });
});

/* ADD PET */
app.post('/api/addPet', function (req, res) {
    var name = req.body.Name;
    var age = req.body.Age;
    var type = req.body.Type;
    var color = req.body.Color;
    var description = req.body.Description;
    var eyesColor = req.body.EyesColor;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        console.log(req.body);
        var request = new sql.Request();
        request.query(`insert into Pets(Name, Age, Type, Color, EyesColor, Description) values ('${name}', '${age}', '${type}', '${color}','${eyesColor}', '${description}')`, function (err, result) {
            if (err) console.log(err)

            let request2 = new sql.Request();
            request2.query(`SELECT Id FROM Pets WHERE Name = '${name}' and Age = '${age}' and Description ='${description}'`, function (err, recordset) {
                if (err) console.log(err)

                console.log(recordset.recordset);
                console.log(recordset.recordset[0].Id);
                res.send(JSON.stringify({ "id": recordset.recordset[0].Id }));
                res.end();

            })
        });
    });
});

/* DEFAULT */
app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});


app.listen(5000);