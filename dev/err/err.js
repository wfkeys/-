export default (err,req,res,next) => {
    
   const message = err.message
   res.json({
      err_code:-1,
      message: message
   })
   next()
}


