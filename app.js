const express = require('express')
const formidable = require('formidable')
const app = express()
const db = require('./model/db')
app.set('view engine','ejs')
app.use(express.static('./public'))
app.get('/',(req,res,next)=>{
    res.render('index')
})
app.post('/send',(req,res,next)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        db.insert('Message', [
            { 'name': fields.name, 'message': fields.message ,'time': new Date()}
        ], (err, result) => {
            if (err) {
                res.json('失败')
                return
            } else {
                res.json('成功')
            }
        })
    })
})
app.get('/find',(req,res)=>{
    let page = req.query.page
    db.find('Message',{},page,(err,result)=>{
        res.json(JSON.stringify(result))
    })
})
app.get('/count',(req,res)=>{
    db.count('Message', {}, (err, result) => {
        res.json(result)
    })
})
app.listen(3000)