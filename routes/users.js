const router = require('koa-router')()
var {query}=require('../db/mysql')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
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
router.get('/getallarticle',async function(ctx,next){
  await query('select * from article').then((res)=>{
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
