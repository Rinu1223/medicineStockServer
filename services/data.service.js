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

            const deleteMedicine=(email,index)=>{
                //return db.User.updateOne({"email":email},{$pull:{stockDetails:{Medicine:Medicine}}})
                return db.User.findOne({email})
                     .then(result=>{
                    if(!result){
                        return {
                          statusCode:422,
                          status:false,
                          message:"Failed to delete"
                      }
                    }
                    else{
                        result.stockDetails.splice(index,1)
                        result.markModified('stockDetails');
                        result.save();
                     return {
                        statusCode:200,
                        status:true,
                        message:"deleted one row"
                    }
                    }
                   })
              }

              const updateStock=(email,indexNum,Medicine,Quantity,Price)=>{
                let index=parseInt(indexNum)
                return  db.User.findOne({email})
                           .then(user=>{
                          if(!user){
                              return {
                                statusCode:422,
                                status:false,
                                message:"Failed to update"
                            }
                          }
                          else{
                               user.stockDetails[index].Medicine=Medicine;
                               user.stockDetails[index].Quantity=Quantity;
                               user.stockDetails[index].Price=Price;
                               user.markModified('stockDetails');
                               user.save();
                          return {
                              statusCode:200,
                              status:true,
                              message:"updated ...."
                          }
                          }
                         })
                    
                        }
                     

  module.exports={
    signUp,
    login,
    addStock,
    displayStock,
    deleteMedicine,
    updateStock

  }