var express = require('express');
var cors = require('cors');
var app = express();

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