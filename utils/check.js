const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const verify = Promise.promisify(jwt.verify);
// https://www.it610.com/article/1489933741479452672.htm
// https://www.csdn.net/tags/MtTaIgxsMzgyNjk5LWJsb2cO0O0O.html

const checkToken= async (ctx,next)=>{
    let url = ctx.request.url;
    if (url == "/login"||url.indexOf('/user')==0) {
        await next();
    }else{
        let token = ctx.request.headers["authorization"];
        if(token){
            let payload = await verify(token,'secret');
            let { time, timeout } = payload;
            let data = new Date().getTime();
            if (data - time <= timeout) {
                // 未过期
              await next();
            }else{
                ctx.status=401
                ctx.body = {
                    status: 1,
                    message:'token 已过期'
                };
            }
        }else{
            ctx.status=401
            ctx.body = {
                status: 1,
                message:'没有token'
            };            
        }
    }
}
module.exports = checkToken