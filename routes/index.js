const router = require('koa-router')()
var {query}=require('../db/mysql')
const jwt = require("jsonwebtoken");

router.post('/login', async (ctx, next)=>{
  const { username, password } = ctx.request.body;
  await query('SELECT * FROM login where id=?',[username]).then((res)=>{
    if(res.length==0){
      ctx.status=200
      ctx.body={
        // data:res,
        data:{
          status: 1,
          message: '用户不存在'
        }

      }         
    }else if(res[0].password!=password){
      ctx.status=200
      ctx.body={
        data:{
          status: 1,
          message: '密码错误'
        },

      } 
    }else{
      let payload = {username:username,time:new Date().getTime(),timeout:1000*60*60*2}
      let token = jwt.sign(payload,'secret',{ expiresIn: "1day" })
      ctx.status=200
      ctx.body = {
        data:{
          status: 0,
          message: '登录成功',
          data:token
        }
      }
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:{
        status: 1,
        data:err,
        message: '服务器有问题',
      }
    }   
  })
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/newcategory',async function(ctx,next){
  let {categoryname}=ctx.request.body
  await query('INSERT INTO categorylist VALUES(?)',[categoryname]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })
})
router.get('/categorylist',async function(ctx,next){
  await query('SELECT * FROM categorylist').then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.post('/newtag',async function(ctx,next){
  let {tagname}=ctx.request.body
  await query('INSERT INTO taglist VALUES(?)',[tagname]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })
})
router.get('/taglist',async function(ctx,next){
  await query('SELECT * FROM taglist').then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.post('/newarticle',async function(ctx,next){
  let {uid,title,category,tag,date,show,content}=ctx.request.body
  await query('INSERT INTO article VALUES(?,?,?,?,?,?,?)',[uid,title,category,tag,date,show,content]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })
})
router.get('/getarticlebycategory',async function(ctx,next){
  let {category}=ctx.query
  // console.log(ctx.query.category)
  // console.log(category)
  await query('SELECT * FROM article WHERE category=?',[category]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getarticlebycategorylimit',async function(ctx,next){
  let {category,start,num}=ctx.query
  await query('SELECT * FROM article WHERE category=? limit ?,?',[category,Number(start),Number(num)]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getarticlebytag',async function(ctx,next){
  let {tag}=ctx.query
  await query('SELECT * FROM article WHERE tag=?',[tag]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getarticlebytaglimit',async function(ctx,next){
  let {tag,start,num}=ctx.query
  await query('SELECT * FROM article WHERE tag=? limit ?,?',[tag,Number(start),Number(num)]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getarticlelist',async function(ctx,next){
  let {start,num}=ctx.query
  start=Number(start)
  num=Number(num)
  await query('select * from article limit ?,?',[start,num]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getallarticle',async function(ctx,next){
  let {start,num}=ctx.query
  start=Number(start)
  num=Number(num)
  await query('select * from article',[start,num]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})



router.get('/getarticlebycategory',async function(ctx,next){
  let {category}=ctx.request.body
  await query('SELECT * FROM article WHERE category=(?)',[category]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.get('/getarticle',async function(ctx,next){
  let {uid}=ctx.query
  await query('select * from article WHERE uid=?',[uid]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })  
})
router.post('/changehide',async function(ctx,next){
  let {uid,showsign}=ctx.request.body
  await query('UPDATE article SET showsign = ? WHERE uid=?',[showsign,uid]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })
})
router.post('/modifyarticle',async function(ctx,next){
  let {uid,title,category,tag,content}=ctx.request.body
  await query('UPDATE article SET title = ?,category = ?,tag = ?,content = ? WHERE uid=?',[title,category,tag,content,uid]).then((res)=>{
    ctx.status=200
    ctx.body={
      data:res
    }
  }).catch((err)=>{
    ctx.status=500
    ctx.body={
      data:err
    }    
  })
})
module.exports = router
