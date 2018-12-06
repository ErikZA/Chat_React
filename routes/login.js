var express = require('express');
var router = express.Router();



/* GET login Exit. */
router.get('/login/:exit', function (req, res, next) {
  var context = {
    people: [
      { MSG: req.url },
    ]
  };
  res.json(context.people);
});

/* POST login listing. */
router.post('/new', function (req, res, next) {
  var name = req.body.cadName;
  var lastName = req.body.cadLastName;
  var passWord = req.body.cadPassWord;
  var confirmedPassWord = req.body.cadConfirmedPassWord;
  switch (passWord) {
    case '': case null: case ' ': case undefined:
      {
        var context = {
          people: [
            { errorMSG: 'User not found' },
          ]
        };
        res.json(context.people); 
        break;
      };
    case confirmedPassWord: {
      require('../db').chekUser(name, lastName, function (docs) {
        if(docs){
          var context = {
            people: [
              { errorMSG: 'Usuario ja cadastrado' },
            ]
          };
          res.json(context.people); 
        } else{
          require('../db').saveUser(name, lastName, passWord,
            function () { 
              var context = {
                people: [
                  { errorMSG: 'Usuario cadastrado com sucesso' },
                ]
              };
              res.json(context.people);  
            });
        }  
      });
      break;
    };
    default:
      {
        var context = {
          people: [
            { errorMSG: 'Senha invalida' },
          ]
        };
        res.json(context.people); 
        break;
      };
  }
});

/* Post login db. */
router.post('/loginChat', function (req, res, next) {
  //console.log(req.body.name);
  require('../db').chekPasswordUser(req.body.name, req.body.lastName, req.body.passWord, function (docs) {
    if(docs){
        res.cookie('login',req.body.name+' '+req.body.lastName);
        res.redirect('/chat/'+req.body.name+" "+req.body.lastName);
        return;
    } else{
      console.log(docs);
      var context = {
        people: [
          { errorMSG: 'User not found' },
        ]
      };
      res.json(context.people);   
    }  
  });
});

router.get('/Teste', function (req, res, next) {
  var context = {
    people: [
      { MSG:'RETORNO SERVIDOR'},
    ]
  };
  res.json(context.people);
});

module.exports = router;
