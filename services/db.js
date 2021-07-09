const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MedicineStock',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })

 const User= mongoose.model('User',{
   uname:String,
   email:String,
   password:String,
   stockDetails:[]
})


 module.exports={
User
 }

