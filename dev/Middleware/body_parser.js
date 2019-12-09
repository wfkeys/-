 import queryString from "querystring"


export default (req,res,next) => {

    if (req.method.toLowerCase() === 'get') {
        return next()
      }
      // 如果是普通表单POST，则自己处理 application/x-www-form-urlencoded
      // 如果是有文件的表单POST，则不处理
      if( req.headers['content-type'].startsWith('multipart/form-data') ) {
        return next()
      }

     let data =""
     req.on("data",v => {

       data+= v
     })
     req.on('end', () => {
        req.body = queryString.parse(data)
        next()
      })
 
}
