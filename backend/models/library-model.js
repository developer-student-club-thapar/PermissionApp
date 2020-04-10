const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LibrarySchema = new Schema({
    room_num: { type: String, required: true },
    intime : { type: String , required: true },
    outtime : { type: String, required: true },
    status : {type : String, default: "pending"},
    category : {type: String, default :"library"},
    // creator : { type : String , required :true}
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}

});



module.exports = mongoose.model('Librarypermi', LibrarySchema);

