const mongoose=require("mongoose");
const dbconnectionjs=mongoose.connect('mongodb+srv://***:***@cluster0.oh20y.mongodb.net/socketio')
.then(()=>console.log("connection created with db done")
)
.catch(()=>console.log("Problem when connect with connection created"))
module.exports=dbconnectionjs;
