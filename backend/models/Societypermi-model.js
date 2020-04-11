const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocietySchema = new Schema({
    room_num: { type: String, required: true },
    intime : { type: String , required: true },
    outtime : { type: String, required: true },
    society_name: { type: String, required: true },
    status : {type : String, default: "Pending"},
    category : {type: String, default :"society"},
    date:{type:String , required: true} ,
    creator : {type: mongoose.Types.ObjectId, required: true, ref:'User'},
});

module.exports = mongoose.model('Societypermi', SocietySchema);


