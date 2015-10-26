var mongoose = require('../database.js');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
  created_by:  String,
  assigned_to: String,
  comments: [{ body: String, date: Date ,_id:false}],
  date: { type: Date, default: Date.now },
  status: String,
  customer_information: {
      name:String,
      number:Number,
      
  },
    area:String,
    
});
var Ticket = mongoose.model('Ticket', ticketSchema);
module.exports=Ticket;