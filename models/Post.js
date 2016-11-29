var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// schema선언   DB에 title, email, content, password, read, createdAt을 넣어주겠다고 선언함
var schema = new Schema({
  title: {type: String, required: true, unique: true, trim: true},
  fee: {type: String, required: true, index: true, trim: true},
  city: {type: String, required: true, index: true, trim: true },
  detail: {type : String},
  password: {type: String},
  read: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
