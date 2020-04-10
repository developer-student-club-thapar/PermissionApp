const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LateEntrySchema = new Schema({
    room_num:{type: String, required: true},
    destination:{type: String, required: true},
    //outtime:{type: String, required: true},
    intime:{type: String, required: true},
    status:{type: String, default: "pending"},
    date:{type: String, required: true},   //include it later
    creator:{type: mongoose.Types.ObjectId, required: true, ref:'User'},
});

module.exports=mongoose.model('LateEntrypermi',LateEntrySchema);