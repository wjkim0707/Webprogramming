var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema선언   DB에 title, fee, city, detail, password, read, createdAt을 넣어주겠다고 선언함
var schema = new Schema({
  title: {type: String, required: true, trim: true},
  user_id: {type: ObjectId},
  fee: {type: Number, required: true, index: true, trim: true},
  city: {type: String},
  address: {type: String},
  facilities: {type: String},
  rule: {type: String},
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
