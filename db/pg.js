var pg = require('pg');
var connectionString = "postgres://Adam1:Move2core@localhost/burgers";

function addBurger(req, res, next) {
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("INSERT INTO burgers (burgerName, cheese) VALUES($1, $2 )",
    [req.body.burgerName, req.body.cheese],
    function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      next()
    });
  });
}

module.exports.addBurger = addBurger;


function showAll(req, res, next) {
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("SELECT * FROM burgers;", function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows
      next()
    });
  });
}

module.exports.showAll = showAll;

function showOne(req, res, next) {
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query( "SELECT * FROM burgers where id = $1 ", [req.params.burgerID] , function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows
      next()
    });
  });
}

module.exports.showOne = showOne;

module.exports.editBurger = function(req, res, next){
  pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        console.log(err);
        res.status(500).json({success: false, data: err});
      }


      client.query('UPDATE massages SET burgername = $1 WHERE id = $2', [req.body.burgername, req.params.id], (err, results) => {
        done();

        if (err) {
          console.error('Error with query', err);
        }

        next();
      });

    });


}
