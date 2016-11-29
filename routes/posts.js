var express = require('express');
var Post = require('../models/Post');
var router = express.Router();

// posts/index를 찾아서 렌더링해줌
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    if(err){
      return next(err);
    }
    res.render('posts/index',{posts: posts});
  });
});

// 
router.get('/new', function(req, res, next) {
  res.render('posts/edit',{post: {}});
});

// DB에 해당 값을 입력하고 저장한다.
router.post('/', function(req, res, next) {
  var post = new Post({
   title : req.body.title,
    fee : req.body.fee,
    city : req.body.city,
    detail : req.body.detail,
    password : req.body.password
  });
  post.save(function(err){

  });
  // 요청의 경로를 posts로 재 지정해줌
  res.redirect('/posts');
});

// 몽구스가 id에 의해 해당 문서를 찾고 조회수를 증가시켜줌
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    
    post.read++;
    post.save(function(err){
      if (err) {
         return next(err);
     }
    });
    res.render('posts/show', {post: post});
  });
});
 
// 해당 id를 찾아서 그 id에 해당하는 정보를 지움
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

// 해당 id를 찾아서 비밀번호를 제외한 그 id의 내용을 보여줌
router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
  });
});


router.put('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
   // 패스워드가 해당 데이터와 맞지 않으면 원래되로 돌아감
    if(post.password !== req.body.password){
      return res.redirect('back');
    }
    if (err) {
      return next(err);
    }
    // 맞으면 이메일과 제목, 내용을 해당 정보로 바꾼후 저장
    
    post.title = req.body.title;
    post.city = req.body.city;
    post.fee = req.body.fee;
    post.detail = req.body.detail;
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      // posts로 돌아감
      res.redirect('/posts');
    });
  });
});

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  res.render('todos');
});



module.exports = router;

