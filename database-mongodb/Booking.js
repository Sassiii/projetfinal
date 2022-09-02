const Visitor = require('./Visitor');
const Host = require('./Host');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
const db = require('./index.js');
mongoose.Promise = global.Promise;

const bookingSchema = new mongoose.Schema({
  title: String,
  description: String,
  address:String,
  numberOfRooms:Number,
  numberOfVisitors: Number,
  picture1:String,
  picture2:String,
  picture3:String,
  picture3:String,
  picture4:String,
  picture5:String,
  strongPoints:String,
  extraAccomodations:String,
  startDate:Date,
  endDate:Date,
  announcementId:String,
  host : { type: Schema.Types.ObjectId, ref: 'Host' },
  visitor : { type: Schema.Types.ObjectId, ref: 'Visitor' }
    },
      {
        timestamps: true
      }
    );

    const Booking = mongoose.model('Booking', bookingSchema);

    module.exports = Booking;