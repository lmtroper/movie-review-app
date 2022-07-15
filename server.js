let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

    let sql = `SELECT mode FROM user WHERE userID = ?`;
    console.log(sql);
    let data = [userID];
    console.log(data);

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }

        let string = JSON.stringify(results);
        //let obj = JSON.parse(string);
        res.send({ express: string });
    });
    connection.end();
});

app.post('/api/getMovies', (req, res) => {
    let connection = mysql.createConnection(config);

    let sql = `SELECT * FROM movies`;
    let data = [];

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error('error: ' + error.message);
        }

        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

app.post('/api/addReview', (req, res) => {
    let connection = mysql.createConnection(config);
    let data = req.body;
    var errorsInTransaction = 0;

    connection.query(`START TRANSACTION`, data, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            errorsInTransaction = errorsInTransaction + 1;
        };
        let findMovieID = `SELECT id FROM movies where name = ?;`;
        let movieData = data.movie;

        connection.query(findMovieID, movieData, (error, results, fields) => {
            if (error) {
                console.log(error.message);
                errorsInTransaction = errorsInTransaction + 1;
            };
            let string = JSON.stringify(results);
            let obj = JSON.parse(string);

            let insertReview = `INSERT INTO review (reviewTitle, reviewContent, reviewScore, user_userID, movies_id) VALUES (?,?,?,?,?);`;
            let reviewData = [data.title, data.review, data.rating, data.userID, obj[0].id];

            connection.query(insertReview, reviewData, (error, results, fields) => {
                if (error) {
                    console.log(error.message);
                    errorsInTransaction = errorsInTransaction + 1;
                };

                if (errorsInTransaction > 0) {
                    connection.query(`ROLLBACK`, dataEmpty, (error, results, fields) => {
                        let string = JSON.stringify('Error')
                        res.send({ express: string });
                        connection.end();
                    });
                } else {
                    connection.query(`COMMIT`, data, (error, results, fields) => {
                        let string = JSON.stringify('Success')
                        res.send({ express: string });
                        connection.end();
                    })
                };
            });
        });
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server