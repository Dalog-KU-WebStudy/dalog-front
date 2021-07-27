// 필요없음. 혹시 모르니 일단 주석처리만 하고 삭제는 X


/*const express = require('express');
const app = express()
const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const router = express.Router();
const passport = require('passport')
const path = require('path');

router.get('/', function(req,res){
    var id=req.user;
    if(!req.user) res.render('login.html');
    else res.render('index.html', {'id' : id});
})


// nunjucks 세팅
router.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
})

// session 세팅
router.use(session({
    secret:'ras',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))



router.use('/kakao', require('../passport/kakao'));
router.use('/naver', require('../passport/naver'));


module.exports = router;
*/

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const naver_login = require('../passport/naver');
router.use('/login/naver', naver_login);

const user_join = require('./join/index');
router.use('/user/join', user_join);


module.exports = router;