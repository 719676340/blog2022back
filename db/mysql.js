const mysql=require('mysql')
const config=require('./infoConfig')


const pool=mysql.createPool({
    host:config.HOST,
    user:config.USERNAME,
    password:config.PASSWORD,
    database:config.DATEBASE
})

const query=function(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                console.log(err)
                reject(err)
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows)
                    }
                })
                connection.release()
            }
        })
    })
}
module.exports={
    query
}