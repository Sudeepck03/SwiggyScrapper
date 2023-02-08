const express = require('express')
const app = express()
const nodemailer = require('nodemailer');


let str = "Restuarnts are" + " " +  "\n";
let counter = 0;

let {main} = require('./Main')


app.get('/dishes',async(req,res)=>{
    let {city,restaurants} = req.query
   const resturantData =await main(city,restaurants);
    req.dishes = resturantData
    let requiredResturantData = resturantData
    console.log(resturantData)
      let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"1ms19is119@gmail.com",
        pass:"popoqibpxuxpclbr"
    },
    tls:{
        rejectUnauthorized : false
    },
    secure : false
})

     let mailOptions = {
        from :"1ms19is119@gmail.com",
        to:"sudeepck03@gmail.com",
        subject:"Swiggy.com",
        text:"Firts Email Using Nodejs" +" " + requiredResturantData + resturantData + " " ,
        html: requiredResturantData,
        amp:`${requiredResturantData}`,
        secure : false,
    }

      transporter.sendMail(mailOptions,function(err,success){
        if(err){
          console.log(err);
        }else{
            console.log(success)
        }
      })  

     res.send(req.dishes)
    //  res.send(req.dishes)
})

const port = 8000
app.listen(port,()=>console.log(`Successfully connected to Servere ${port}`))



