const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const chatSchema=new Schema({
    chat:{
        type:String,
        required:true
    },
    senderid:{
        type:String,
        required:true
    },
    reciverid:{
        type:String,
        required:true
    },
   date: {
    type: String,
    default: () => new Date().toISOString() // ✅ Correct - Generates a new timestamp for each document
}

})
const chatModel=mongoose.model('chat',chatSchema);
module.exports=chatModel;