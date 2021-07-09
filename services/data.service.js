const db=require('./db');
let currentUser="";
const signUp=(uname,email,password)=>{
    return db.User.findOne({email})
    .then(user=>{
      if(user){
        return{
          statusCode:422,
          status:false,
          message:"user exit"
        }
      }
      else{
        const newUser=new db.User({
          uname,
          email,
          password,
          stockDetails:[]
        })
        newUser.save();
        return{
          statusCode:200,
          status:true,
          message:"successfully registered"
        }
      }
    })
  }
  
  const login=(req,email,password)=>{
      
      return db.User.findOne({email,password})
     .then(user=>
       {
         if(user){
           req.session.currentUser=user.email
          
           return{
             statusCode:200,
             status:true,
             name:user.uname,
             uID:user.email,
             message:"Successfully login"
         } 
         }
         else{
       
           return {
             statusCode:422,
             status:false,
            message:"invalid user id"
           }
         }
       })
     }
     
     const addStock=(req,email,Medicine,Quantity,Price)=>{
        let userID= req.session.currentUser
         console.log(userID);
          return db.User.findOne({email})
          .then(user=>{
           if(!user){
               return {
                 statusCode:422,
                 status:false,
                 message:"Failed to add"
             }
           }
           else{
               
               user.stockDetails.push({Medicine:Medicine,Quantity:Quantity,Price:Price})
               user.save();
            return {
               statusCode:200,
               status:false,
               message:`Stock added successfully.... `
           }
           }
          })
          }
          const displayStock=(req,email)=>{
            let userID= req.session.currentUser
            console.log(userID);
            return db.User.findOne({email})
            .then(user=>{
             if(!user){
                 return {
                   statusCode:422,
                   status:false,
                   message:"error"
               }
             }
             else{
                
                 
              return {
                 statusCode:200,
                 status:true,
                 message:user.stockDetails
             }
             }
            })
            }

  module.exports={
    signUp,
    login,
    addStock,
    displayStock

  }