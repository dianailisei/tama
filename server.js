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
        request.query(`select u.Id, u.Username, u.Country, o.IdPet, p.Name, p.Color, p.EyesColor, p.Type from Users as u 
        join Friends as f on u.id = f.IdUser2 
        left join Owner as o on f.IdUser2 = o.IdUser
        left join Pets as p on o.IdPet = p.Id
        where f.IdUser1 = ${id}`, function (err, recordset) {
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
    var result;
    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`update Users set Username = '${username}', Password = '${pwd}', Country = '${country}' where Email='${email}'`, function (err, recordset) {
            if (err) console.log(err);
            var req2 = new sql.Request();
            req2.query(`select * from Users where Email = '${email}'`, function(err, recordset2){
                if (err) console.log(err);
                console.log(recordset2.recordset);
                result = recordset2.recordset;
                res.send(result);
            })
            // res.end();
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
    var id = req.query.id;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`SELECT p.Id, p.Name, p.Age, p.Type, p.Color, p.EyesColor, p.XPStatus, p.EnergyStatus, p.LoveStatus, p.PlayStatus, p.Description 
                        from Owner as o
                        JOIN Pets as p on o.IdPet = p.Id
                        WHERE o.IdUser =${id}`, function (err, recordset) {
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
    console.log(id, xp, pfs, pes, pss);

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
    var userId = req.query.id;
    var name = req.body.Name;
    var age = req.body.Age;
    var gender = req.body.Gender;
    var type = req.body.Type;
    var color = req.body.Color;
    var description = req.body.Description;
    var eyesColor = req.body.EyesColor;
    var xp = req.body.XPStatus;
    // console.log(name, age, gender, type, color, description, eyesColor, xp);
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        console.log(req.body);
        var request = new sql.Request();
        request.query(`insert into Pets(Name, Age, Gender, Type, Color, EyesColor, Description, XPStatus) values ('${name}', ${age}, '${gender}', '${type}', '${color}','${eyesColor}', '${description}', ${xp})`, function (err, result) {
            if (err) console.log(err)

            let request2 = new sql.Request();
            request2.query(`SELECT Id FROM Pets WHERE Name = '${name}' and Age = ${age} and Description ='${description}'`, function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset);
                let petId = recordset.recordset[0].Id;
                var req3 = new sql.Request();
                req3.query(`INSERT into Owner (owner.IdUser, owner.IdPet) values (${userId}, ${petId})`, function (err, recordset3) {
                    if (err) console.log(err)
                })

                // console.log(recordset.recordset);
                // console.log(recordset.recordset[0].Id);
                res.send(JSON.stringify({ "id": recordset.recordset[0].Id }));
                res.end();

            })
        });
    });
});

/* Pet */
app.get(`/api/pets`, function (req, res) {
    var id = req.query.id;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        request.query(`select p.Id, p.Age, p.Gender, p.Name, p.Type, p.Color, p.EyesColor, p1.Id, p1.Name, p1.Color, p1.Age, p1.EyesColor, p1.Gender, p1.Type from Pets p 
        join Owner o on p.Id = o.IdPet 
        left join PetFriends pf on p.Id = pf.IdPet1 
        left join Pets p1 on pf.idPet2 = p1.Id
        where o.IdUser = ${id}`, function (err, recordset) {
                if (err) console.log(err);
                else {
                    console.log(recordset.recordset);
                    res.send(recordset.recordset);
                }
            });
    });
});

app.get('/api/owner', function (req, res) {
    var id = req.query.id;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`select IdPet from Owner where IdUser = ${id}`, function (err, recordset) {
            if (err) console.log(err);
            else {
                res.send(recordset.recordset);
            }
        });
    });
})

app.get('/api/owner/pets', function (req, res) {
    var id = req.query.id;
    sql.close();

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`select p.Id, p.Name, p.Type, p.Color, p.EyesColor from Owner o 
        join Pets p on o.IdPet = p.Id
        where IdUser = ${id}`, function (err, recordset) {
                if (err) console.log(err);
                else {
                    res.send(recordset.recordset);
                }
            });
    });
})

app.post('/api/petFriends', function (req, res) {
    var IdPet1 = req.body.id1;
    var IdPet2 = req.body.id2;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`insert into PetFriends (IdPet1, idPet2) values(${IdPet1}, ${IdPet2})`, function (err, recordset) {
            if (err) console.log(err);
            res.end();
        })
    })
});

app.delete('/api/pets', function (req, res) {
    var id = req.body.id;
    sql.close();
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(`delete from Owner where IdPet = ${id}`, function (err, recordset) {
            if (err) console.log(err);
            let request2 = new sql.Request();
            request2.query(`delete from PetFriends where IdPet1=${id} or IdPet2=${id}`, function (err, recordset1) {
                if (err) console.log(err);
                let request3 = new sql.Request();
                request3.query(`delete from Pets where Id=${id}`, function (err, recordset2) {
                    if (err) console.log(err);
                })
            })
            res.end();
        })
    })
});
/* DEFAULT */
app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});


app.listen(5000);