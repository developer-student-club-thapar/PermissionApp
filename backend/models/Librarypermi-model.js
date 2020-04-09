const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LibrarySchema = new Schema({
    room_num:{type: String, required: true},
    intime:{type: String, required: true},
    outtime:{type: String, required: true},
    status:{type: String, default: "pending"},
    date:{type: String, required:true},   //include it later
    creator:{type: String, required: true},
});

module.exports=mongoose.model('Librarypermi',LibrarySchema);