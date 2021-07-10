const express=require('express'); //import express
const app=express();
const dataservice=require('./services/data.service'); // import data.service
const cors=require('cors'); //import cors
app.use(cors({
  origin:'http://localhost:4200', 
  credentials:true  
}))
const session=require('express-session');//import session
app.use(session({
  secret:'cookie_secret',
  resave : false,
  saveUninitialized: false
}));
app.use(express.json());
app.listen(3000,()=>{
  console.log("server started....");
})
app.post('/signUp',(req,res)=>{
    dataservice.signUp(req.body.uname,req.body.email,req.body.password)
.then(result=>{
  res.status(result.statusCode).json(result)
})
});

app.post('/login',(req,res)=>{
    //console.log(req.body);
    dataservice.login(req,req.body.email,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result); 
    })
       
    });
    app.post('/addStock',(req,res)=>{
        dataservice.addStock(req,req.body.email,req.body.Medicine,req.body.Quantity,req.body.Price)
        .then(result=>{
          res.status(result.statusCode).json(result)
        })
      });
      app.post('/displayStock',(req,res)=>{
        dataservice.displayStock(req,req.body.email,)
    .then(result=>{
      res.status(result.statusCode).json(result)
    })
});
app.post('/deleteMedicine',(req,res)=>{
    dataservice.deleteMedicine(req.body.email,req.body.index)
  .then(result=>{
  res.status(result.statusCode).json(result)
  })
  });
  app.post('/updateStock',(req,res)=>{
    //console.log(req);
    dataservice.updateStock(req.body.email,req.body.indexNum,req.body.Medicine,req.body.Quantity,req.body.Price)
  .then(result=>{
  res.status(result.statusCode).json(result)
  })
  });