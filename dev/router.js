import express from "express"
import Advert from "./models/advert"
import formidable from "formidable"
import path from "path"

const router = express.Router()

//首页渲染
router.get("/",(req,res) => {
    res.render("index.html")
})


router.get("/advert/add",(req,res,next) => {
       
      res.render("advert_add.html")


})


//存储
router.post("/advert/add",(req,res,next) => {
  
    const   form = new formidable.IncomingForm()
            form.uploadDir = "./public/uploads"
            // 配置保持文件原始的扩展名
            form.keepExtensions = true
             
    form.parse(req, (err, fields, files) => {   
              const body = fields
              body.image = path.basename(files.image.path)
             
            //   path.basename('C:\\temp\\myfile.html');
           // 结果 Returns: 'C:\\temp\\myfile.html'path的一个方法
           const s1 = new Advert({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time
        })
       s1.save((err)=>{
    
        if(err){
            return next(err)
        }
        res.json({
            err_code:0
            })
       })    

    })
      
   })
  
//查询
router.get("/advert/list",(req,res,next) => {
     res.render("advert_list.html")  
})


//异步无刷新分页
router.get("/advert/page",(req,res,next) => {
  Advert.count((err,count) =>{

    res.json({
      err_code:0,
      totalPage:count
  })
  })
})

router.get("/advert/pagemodul",(req,res,next) => {
const pageSize = Number.parseInt(req.query.pageSize)
const page = Number.parseInt(req.query.page)
  Advert
       .find()
       .limit(pageSize)
       .skip(pageSize*(page-1))
       .exec((err,adverts) => {
         if(err){return next(err)}
         res.json({
          err_code:0,
          adverts:adverts
      })


       })
       
})



//查询
// router.get("/advert/list",(req,res,next) => {
//     const  page = Number.parseInt(req.query.page,10)
//     const  pagesize = 5
    
//     Advert
//          .find()
//          .limit(pagesize)
//          .skip((page-1)*pagesize)
//          .exec((err, adverts) => {
//             if (err) {
//               return next(err)
//             }
//     Advert.count((err,count) =>{
//       const  totalPage = Math.ceil(count/pagesize)
    
//       res.render("advert_list.html",{
//         adverts,
//         totalPage,
//         page
//       })
//   })
// })
// })


//remove
router.get("/advert/remove/:advertID",(req,res,next) => {
      Advert.remove({_id:req.params.advertID},err => {
             if(err){
                 return next(err)
             }
            res.json({
                 err_code:0,
                 result: "删除成功！"
            })
      })
})

//修改
router.post("/advert/updata/:advertID",(req,res,next) => {
     Advert.findById({_id: req.params.advertID},(err,data) => {
          if(err){
              return next(err)
          }
          const body = req.body
          data.title =  body.title,
          data.image = body.image,
          data.link = body.link,
          data.start_time = body.start_time,
          data.end_time = body.end_time

          
       data.save(err => {
            res.json({
              err_code: 0,
              result: "修改成功!"
            })
       })

    })

})


export default router