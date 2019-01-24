var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.get('/api/test', function (req, res) {

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
        console.log(req.body);
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`insert into Users(Email, Username, Password, Country) values ('${email}', '${username}', '${pwd}', '${country}')`, function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            // res.send(recordset.recordset);
            res.end();
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
        console.log(req.body);
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
app.post('/api/testpost', function (req, res) {

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
        //console.log(req);
        console.log(req.body);
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
var server = app.listen(5000, function () {
    console.log('Server is running..');
});