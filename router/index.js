const express = require("express");
const router = express.Router();
const path = require("path");
const dbconfig = require("../config/dbconfig");
const mysql = require("mysql");
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function (app, router, passport) {
  const naver_login = require("../passport/naver");
  naver_login(passport);

  const kakao_login = require("../passport/kakao");
  kakao_login(passport);

  router.get("/login/kakao", passport.authenticate("kakao-login"));
  router.get(
    "/login/kakao/callback",
    passport.authenticate("kakao-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
    })
  );

  router.get("/", function (req, res) {
    console.log("main page");
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            console.log(rows[0]);
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          console.log(req.user);
          res.render("index.ejs", { profile: req.user, title: req.user.title });
        }
      );
    } else res.render("index.ejs", { profile: req.user, title: "여기를 눌러 타이틀을 수정하세요!" });
  });

  app.get("/calendar/memo", function (req, res) {
    console.log("calendar/memo get 실행");
    var query2 = connection.query(
      "select * from calendar where user_id=?",
      [req.user.user_id],
      function (err, rows) {
        if (err) {
          throw err;
        }
        if (rows) {
          console.log(rows);
          res.send(rows);
        } else {
          console.log("반환값없음");
        }
        // console.log(req.user);
        // res.render("index.ejs", { profile: req.user, title: req.user.title });
      }
    );
  });

  router.get("/diary/write", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/write.html'));
    // }
    console.log("write get");
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            console.log(rows[0]);
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          console.log(req.user);
          res.render("write.ejs", { profile: req.user, title: req.user.title });
        }
      );
    } else res.render("write.ejs", { profile: req.user, title: "여기를 눌러 타이틀을 수정하세요!" });
    // res.sendFile(path.join(__dirname, '../public/diary/write.html'));
  });
  router.get("/diary/view", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/view.html'));
    // }
    // console.log("view get");
    // if(req.user){
    //     var query = connection.query("select title from title where user_id=?", [req.user.user_id], function(err, rows){
    //         if(err) { throw err; }
    //         if(rows[0]){
    //             console.log(rows[0]);
    //             req.user.title = rows[0].title;
    //         }
    //         else{
    //             req.user.title = "여기를 눌러 타이틀을 수정하세요!";
    //         }
    //         console.log(req.user);
    //         res.render('view.ejs', {profile:req.user, title:req.user.title});
    //     })
    // }
    // else
    //     res.render('view.ejs',{profile:req.user, title:"여기를 눌러 타이틀을 수정하세요!"});
    res.sendFile(path.join(__dirname, "../public/diary/view.html"));
  });
  router.get("/diary/edit", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
    // }
    console.log("edit get");
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            console.log(rows[0]);
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          console.log(req.user);
          res.render("edit.ejs", { profile: req.user, title: req.user.title });
        }
      );
    } else res.render("edit.ejs", { profile: req.user, title: "여기를 눌러 타이틀을 수정하세요!" });
    // res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
  });
  router.get("/diary/board_grid", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
    // }
    console.log("board grid get");
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            console.log(rows[0]);
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          console.log(req.user);
          res.render("board_grid.ejs", {
            profile: req.user,
            title: req.user.title,
          });
        }
      );
    } else res.render("board_grid.ejs", { profile: req.user, title: "여기를 눌러 타이틀을 수정하세요!" });
    // res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
  });
  router.get("/diary/board_row", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
    // }
    console.log("board row get");
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            console.log(rows[0]);
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          console.log(req.user);
          res.render("board_row.ejs", {
            profile: req.user,
            title: req.user.title,
          });
        }
      );
    } else res.render("board_row.ejs", { profile: req.user, title: "여기를 눌러 타이틀을 수정하세요!" });
    // res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
  });

  router.get("/diary/write", function (req, res) {
    if (!req.user) {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    } else {
      res.sendFile(path.join(__dirname, "../public/diary/write.html"));
    }
  });
  router.get("/diary/view", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/view.html'));
    // }
    res.sendFile(path.join(__dirname, "../public/diary/view.html"));
  });
  router.get("/diary/edit", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
    // }
    res.sendFile(path.join(__dirname, "../public/diary/edit.html"));
  });
  router.get("/diary/board_grid", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
    // }
    res.sendFile(path.join(__dirname, "../public/diary/board_grid.html"));
  });
  router.get("/diary/board_row", function (req, res) {
    // if(!req.user){
    //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    // } else {
    //     res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
    // }
    res.sendFile(path.join(__dirname, "../public/diary/board_row.html"));
  });

  router.get("/user/join", (req, res) => {
    console.log("get join url");
    var msg;
    var errMsg = req.flash("joinMessage");
    if (errMsg) msg = errMsg;
    res.render("join.ejs", { message: msg });
  });

  router.post(
    "/user/join",
    passport.authenticate("local-join", {
      successRedirect: "/profile", //인증성공시 이동하는화면주소
      failureRedirect: "/user/join", //인증실패시 이동하는화면주소
      failureFlash: true, //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨.
    })
  );

  router.get("/user/join", (req, res) => {
    console.log("get join url");
    var msg;
    var errMsg = req.flash("error");
    if (errMsg) msg = errMsg;
    res.render("join.ejs", { message: msg });
  });

  router.post(
    "/user/join",
    passport.authenticate("local-join", {
      successRedirect: "/profile", //인증성공시 이동하는화면주소
      failureRedirect: "/user/join", //인증실패시 이동하는화면주소
      failureFlash: true, //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨.
    })
  );

  router.get("/profile", function (req, res) {
    console.log("router get profile");
    console.log(req.user);
    res.send(
      "<script>alert('" +
        req.user.name +
        "님, 환영합니다.');location.href='/';</script>"
    );
    // res.redirect('/');
  });

  //메모부분

  router.post("/calendar/write", function (req, res) {
    console.log("calendar write post router 호출");
    if (req.user) {
      const query = connection.query(
        `insert into calendar (user_id, cal_date, memo) values (?,?,?)`,
        [req.user.user_id, req.body.date, req.body.content],
        (err, result) => {
          if (err) {
            return done(err);
          } else {
            console.log("메모 post 성공");
            res.redirect("/");
          }
        }
      );
    } else {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    }
  });

  // naver 로그인
  router.get("/login/naver", passport.authenticate("naver"));
  // naver 로그인 연동 콜백
  router.get(
    "/login/naver/callback",
    passport.authenticate("naver", {
      successRedirect: "/profile",
      failureRedirect: "/user/login",
    })
  );

  router.get("/profile", function (req, res) {
    console.log("router get profile");
    console.log(req.user);
    res.redirect("/");
  });

  const user_modify = require("./user/modify");
  user_modify(router);

  const user_login = require("./user/login");
  user_login(router, passport);

  const user_delete = require("./user/delete");
  router.use("/user/delete", user_delete);

  const logout = require("./user/logout");
  router.use("/user/logout", logout);

  const title_change = require("./user/title");
  title_change(router);
};
