const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const imdb = require('imdb-api')
const app = express();
const apikey = process.env.IMDB_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {imdb: null, error: null})
})

app.post('/', function (req, res) {
    let name = req.body.movie;
    let url = `http://www.omdbapi.com/?apikey=${apikey}&t=${name}`
    console.log(name)

    imdb.get({name: name}, {apiKey: '59f8fab9', timeout: 30000})
    .then( function (result){

        // if(error) {
        //     res.render('index', {imdb: null, error: 'Ha ocurrido un error, intenta otra vez.'})
        // } else
            
            if(result.title == undefined) {
                res.render('index', {imdb: null, error: 'Ha ocurrido un error, intenta escribiendo el título correctamente.'})
            } else {
                res.render('index', {imdb: `${result.title}`, imdb2: `${result.plot}`, imdb3: `${result.poster}`, imdb4: `${result.year}`, imdb5: `${result.rating}`, imdb6: `${result.rated}`, imdb7: `${result.runtime}`, error: null});
            }
            

    })
    .catch(function (e) {
        res.render('index', {imdb: null, error: 'An error has ocurred.'})
    })

    

})

app.listen(process.env.PORT || 3000, function () {
    console.log("Andamo ruleta en una camioneta recogimos la vaina que llego la avioneta")
})
