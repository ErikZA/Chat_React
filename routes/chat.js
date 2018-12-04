var express = require('express');
var router = express.Router();
var app = express();

/* GET login listing. */
router.get('/chat/:name', function (req, res, next) {
  if(req.params.name === req.cookies.login){
    res.json(req.params); 
  return;
  }else{
    var context = {
      people: [
        { errorMSG: 'User not found' },
      ]
    };
  res.json(context.people);
  }
});

/* POST exit. */
router.post('/exit', function (req, res, next) {
  res.clearCookie('login',req.cookies.login);
  res.redirect('/login/' + 'exit');
});


/* POST Chat. */
router.post('/getChat',function(req,res,next){
  //console.log( 'abc:' + req.body.lastNameChat);
  require('../db').getChat( req.body.nameUser,
                            req.body.userSelect,
                            function(docs){
                              res.json(docs);
                            });
});

/* POST Users. */
router.post('/listChat', function (req, res, next) {
  var name = req.body.nameSear;
  switch (name) {
    case '': case null: case undefined: {
        var context = {
          people: [
            { name: 'User', lastName: 'not found' },
          ]
        };
        res.json(context.people);
      break;
    };
    default: {
      require('../db').getUser(name, function (docs) {
        res.json(docs);
      });
      break;
    };
  };
});

/* POST conversation. */
router.post('/conversation', function (req, res, next) {
  var txtMsg = req.body.msgList;
  var nameChat = req.body.nameUser;
  var nameUser = req.body.userSelect;
  require('../db').setMsg(nameChat, nameUser, txtMsg, function(docs){
      console.log('route\n'+docs);
      res.json(docs);
  });
});



module.exports = router;
