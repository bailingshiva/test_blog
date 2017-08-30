var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var postSchema = new Schema({
    author:{
        type:ObjectId,
        ref:'user'
    },
    tittle:String, //昵称
    content: String
});
module.exports = mongoose.model('posts', postSchema);