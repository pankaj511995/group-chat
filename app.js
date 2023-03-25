const express=require('express')
const path=require('path')
const app=express()

app.use((req,res)=> {
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

app.listen(8000)