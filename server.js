var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodi

app.get('/api/playground', function (req, res) {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query("select * from Pets where Name = 'tama1'", function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);
        });
    });
});

app.get(`/api/user`, function (req, res) {

    var id = req.query.id;
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`select * from Users where Id='${id}'`, function (err, recordset) {

            if (err) console.log(err);
            else {// send records as a response
                // console.log(recordset);
                res.send(recordset.recordset);
            }
        });
    });
});


app.get(`/api/users`, function (req, res) {

    var username = req.query.username;
    var pwd = req.query.password;
    // console.log(email, pwd);
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`select * from Users where Username='${username}' and Password='${pwd}'`, function (err, recordset) {

            if (err) console.log(err);
            else {// send records as a response
                console.log(recordset);
                res.send(recordset.recordset);
            }
        });
    });
});

app.get(`/api/users/all`, function (req, res) {

    // console.log(email, pwd);
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`select * from Users`, function (err, recordset) {

            if (err) console.log(err);
            else {// send records as a response
                // console.log(recordset);
                res.send(recordset.recordset);
            }
        });
    });
});

app.get(`/api/users/friends`, function (req, res) {

    var id = req.query.id;
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {
        
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`select * from Friends where IdUser1='${id}'`, function (err, recordset) {

            if (err) console.log(err);
            else {// send records as a response
                // console.log(recordset);
                res.send(recordset.recordset);
            }
        });
    });
});

app.post('/api/users', function (req, res) {
    var sql = require("mssql");
    var email = req.body.email;
    var username = req.body.username;
    var country = req.body.country;
    var pwd = req.body.password;

    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);
        //console.log(req);
        // console.log(req.body);
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`insert into Users(Email, Username, Password, Country) values ('${email}', '${username}', '${pwd}', '${country}')`, function (err, result) {
            if (err) console.log(err)

            let request2 = new sql.Request();
            request2.query(`SELECT Id FROM Users WHERE Email = '${email}' and Password = '${pwd}'`,function (err, recordset) {
                if (err) console.log(err) 
            
                console.log(recordset.recordset);
                console.log(recordset.recordset[0].Id);  

                res.send(JSON.stringify({"id": recordset.recordset[0].Id }));
                res.end();
                 
            })
            // send records as a response
            // res.send(recordset.recordset);
            // console.log(result);
            // console.log(result.insertId);
        });
    });
});
app.post('/api/addPet', function(req, res){
    var sql = require("mssql");
    var name = req.body.Name;
    var age = req.body.Age;
    var type = req.body.Type;
    var color = req.body.Color;
    var description = req.body.Description;
    var eyesColor = req.body.EyesColor;
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    sql.connect(config, function (err) {

        if (err) console.log(err);
        console.log(req.body);
        var request = new sql.Request();

        request.query(`insert into Pets(Name, Age, Type, Color, EyesColor, Description) values ('${name}', '${age}', '${type}', '${color}','${eyesColor}', '${description}')`, function (err, result) {
            if (err) console.log(err)

            let request2 = new sql.Request();
            request2.query(`SELECT Id FROM Pets WHERE Name = '${name}' and Age = '${age}' and Description ='${description}'`,function (err, recordset) {
                if (err) console.log(err) 
            
                console.log(recordset.recordset);
                console.log(recordset.recordset[0].Id);  

                res.send(JSON.stringify({"id": recordset.recordset[0].Id }));
                res.end();
                 
            })
        });
    });
});

app.put('/api/users', function (req, res) {
    var sql = require("mssql");
    var email = req.body.email;
    var username = req.body.username;
    var country = req.body.country;
    var pwd = req.body.password;

    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);
        //console.log(req);
        // console.log(req.body);
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`update Users set Username = '${username}', Password = '${pwd}', Country = '${country}' where Email='${email}'`, function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            // res.send(recordset.recordset);
            res.end();
        });
    });
});

app.put('/api/playground', function (req, res) {
    var sql = require("mssql");
    var id = req.body.Id;
    var xp = req.body.XPStatus;
    var pfs = req.body.PlayStatus;
    var pes = req.body.EnergyStatus;
    var pss = req.body.LoveStatus;

    // config for your database
    var config = {
        user: 'tama',
        password: 'Zq4ZU299z~-0',
        server: 'den1.mssql7.gear.host',
        database: 'tama'
    };
    sql.close();

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);
        //console.log(req);
        // console.log(req.body);
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`update Pets set XPStatus ='${xp}', PlayStatus ='${pfs}', EnergyStatus='${pes}' ,LoveStatus = '${pss}' where Id='${id}'`, function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            res.send();
        });
    });
});


var server = app.listen(5000, function () {
    console.log('Server is running..');
});