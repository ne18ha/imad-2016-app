var express = require('express');                                    //create web server
var morgan = require('morgan');                                      //to output logs of a server
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'ne18ha',
    database: 'ne18ha',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/logo.png', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','logo.png'));
});
var pool= new Pool(config);
app.get('/article-db',function (req,res){
   pool.query('SELECT * FROM article',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } 
      else{
          res.send(JSON.stringify(result.rows));
      }
   });
});
app.get('/articles/:articleName', function(req,res){
    pool.query("SELECT * FROM article WHERE title="+ req.params.articleName + "'", function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else {
            if(result.rows.length===0){
             res.status(404).send('Oops ! Article not found') ;
            }
            else{
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
            }
    });
    });
app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});
app.get('/ui/news.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'news.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/logo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo.png'));
});
app.get('/ui/coc.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'coc.png'));
});
app.get('/ui/royale.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'royale.png'));
});
app.get('/ui/hayday.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hayday.jpg'));
});
app.get('/ui/subway.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'subway.png'));
});
app.get('/ui/youtube.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'youtube.png'));
});
app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});
app.get('/ui/googleplus.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'googleplus.png'));
});
app.get('/ui/man.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'man.png'));
});
app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

