var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')
var port = process.env.PORT || 5000;
var hbs = require('handlebars');
var scrapeParagraphs = require('./scrapeParagraphs')

var env = process.env.NODE_ENV || 'development' // string
var knexConfig = require('./knexfile'); //big object
var knexGenerator = require('knex')
var knexDbConfig = knexConfig[env] //small object
global.knex = knexGenerator(knexDbConfig)

var scraper = require('./scraper.js')
var scrapeParagraphs = require('./scrapeParagraphs')

var app = express();
app.use(express.static('public'));
var hbs = require('express-hbs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.listen(port, function(err, res){  //Setting up server.
    if (err) {
      console.log("bitch, yo server broke.")
    }
    else {
      console.log("soft Serve 5000, bitchez!")
    }
});


app.get('/', function (req, res) {
      knex.select('title', 'url').from('submission_data')
      .then(function(data){
      res.render('list-view', {submissions: data, name: 'Lizzie'} );
    })
  })

// app.get('/submission/:id', function (req, res) {
//   res.send('testing')
// })

app.post('/scrape', function (req, res){
  //console.log("this is req.body", req.body)
  scrapeParagraphs(req.body.linkToScrape, function(subInfo){
    res.json(subInfo)
    console.log(subInfo)

  })
})
//need to bundle this so it can render when button is clicked!
function bundleForm(){
  app.get('/form', function(req, res){
  console.log("hello!")
  res.render('submissionform')
})
}

app.post('/submit', function(req, res){
  knex('submission_entries').insert(req.body)
  .then(function(data){
    res.render('thankyouPage')
  })
})

module.exports = {
  bundleForm: bundleForm
}
