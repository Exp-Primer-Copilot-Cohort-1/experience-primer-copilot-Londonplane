// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set port
app.set('port', (process.env.PORT || 5000));

// Set path
app.use(express.static(__dirname + '/public'));

// Set views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Render index
app.get('/', function(request, response) {
  response.render('pages/index');
});

// Render comments
app.get('/comments', function(request, response) {
  response.render('pages/comments');
});

// Render comments
app.post('/comments', urlencodedParser, function(request, response) {
  var comment = request.body.comment;
  var name = request.body.name;
  var email = request.body.email;
  var data = {
    name: name,
    email: email,
    comment: comment
  };
  fs.readFile('comments.json', function(err, data) {
    var json = JSON.parse(data);
    json.push(data);
    fs.writeFile('comments.json', JSON.stringify(json), function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
  response.render('pages/comments');
});

// Listen
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});