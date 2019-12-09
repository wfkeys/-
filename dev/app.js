import express from "express" 
import path from "path"
import router from "./router"
import err_code from "./err/err"
import nunjucks from "nunjucks"
// import body_parser from "./Middleware/body_parser"
import bodyParser from "body-parser"



const app = express()

app.use('/public', express.static(path.join(__dirname, '../public')))
// app.use('/static', express.static(path.join(__dirname, '../view')))
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))



nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true //noCache - 如果为 true，不使用缓存，模板每次都会重新编译
});//配置nunjuck模板引擎


// app.use(body_parser)//表单body配置
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(router)
router.use(err_code)



app.listen(3000,() => console.log("server ...."))