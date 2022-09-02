const express = require('express');
const bodyParser = require('body-parser');
const Booking = require('../database-mongodb/Booking.js');
const Admin = require('../database-mongodb/Admin.js');
const Host = require('../database-mongodb/Host.js');
const Visitor = require('../database-mongodb/Visitor.js');
const Announcement = require('../database-mongodb/Announcement.js');
const AnnouncementHistory = require('../database-mongodb/AnnouncementHistory.js');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//login request
app.post('/api/renting/login', function (req, res) {
  // console.log("data from req:", req.body);
  Host.find(req.body, (error, data) => {
    if (error) {
      throw error
    }
    else {
      if (data.length > 0) {
        // console.log("data from db host:", data);
        res.send(data)
      } else {
        Visitor.find(req.body, (error, data) => {
          if (error) {
            throw error
          }
          else {
            if (data.length > 0) {
              // console.log("data from db visitor:", data);
              res.send(data)
            } else {
              Admin.find(req.body, (error, data) => {
                if (error) {
                  throw error
                }
                else {
                  // console.log("data from db admin:", data);
                  res.send(data)
                }
              })
            }
          }
        })
      }
    }
  })
});
///signup request

// app.post('/api/renting/signup/host', function (req, res) {
//   console.log("data from req:", req.body);

//   var host = new Host(req.body);
//   host.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   });

// });
// app.post('/api/renting/signup/visitor', function (req, res) {
//   // console.log("data from req:", req.body);
//   Visitor.create(req.body, (error) => {
//     if (error) {
//       throw error
//     }

//   })
// });
app.post('/api/renting/signup/host', function (req, res) {
  console.log("data from req:", req.body);
  console.log(req.body.username);
  Host.findOne({ username: req.body.username }, function (err, result) {
    if (result) {
      res.send({ message: 'already exist' })
    } else {
      var host = new Host(req.body);
      host.save(function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.send(data)
      });
    }
  }
  )
});
app.post('/api/renting/signup/visitor', function (req, res) {
  // console.log("data from req:", req.body);
  Visitor.findOne({ username: req.body.username }, function (err, result) {
    if (result) {
      res.send({ message: 'already exist' })
    } else {
      var host = new Visitor(req.body);
      host.save(function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.send(data)
      });
    }
  }
  )
});
///create an annoucement request
app.post("/api/announcement", function (req, res) {
  console.log(req.body);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const { title, description, address, numberOfRooms, numberOfVisitors, picture1, picture2, picture3, picture4, picture5,
    strongPoints, extraAccomodations, startDate, endDate } = req.body
  Announcement.create(req.body, (error, data) => {
    if (error) {
      res.send(error)
    } else {
      console.log('message', data._id)
      Host.findByIdAndUpdate(
        req.body.host,
        { $push: { announcements: data._id } },
        { new: true, useFindAndModify: false }, (error, data) => {
          if (error) {
            throw error
          }
          else {
            console.log("data from db:", data);
            res.send(data)
          }
        }
      );
    }
  })
  // if(!title || !description || !address || !numberOfRooms|| !numberOfVisitors|| !picture1 || !picture2 || 
  //   !picture3 || !picture4 || !picture5 || !strongPoints || !extraAccomodations || !startDate || !endDate 
  //   || endDate<startDate || startDate < date){
  //  return res.status(400).json({
  //    message: 'Announcement informations are required',
  //  });
  // }else{
  //    Announcement.create(req.body,(error)=>{
  //   if(error) {
  //     res.send(error  )
  //   }
  // })
  // }
})
app.get('/api/renting/fetching', function (req, res) {
  Announcement.find().populate('host visitor').exec(function (err, data) {
    if (err) {
      console.error("iam in error", err)

    } else {
      res.send(data)
    }
  })
})
//add to favoris
app.put('/api/renting/favoris/add/:id', function (req, res) {
  console.log("req in server: ", req.params);
  Visitor.findByIdAndUpdate(
    req.params.id,
    { $push: { Favoris: req.body.favoris } },
    { new: true, useFindAndModify: false }, (error, data) => {
      if (error) {
        throw error
      }
      else {
        console.log("data from db from table visitor:", data);
        res.send(data)
      }
    }
  );
});
app.put('/api/renting/favoris/addvisitor/:id', function (req, res) {
  Announcement.findByIdAndUpdate(
    { _id: req.body.favoris },
    { $push: { visitor: req.params.id } },
    { new: true, useFindAndModify: false }, (error, data) => {
      if (error) {
        throw error
      }
      else {
        console.log("data from db from table announcement:", data);
        res.send(data)
      }
    }
  );

});
//get favoris 
app.get('/api/renting/fetching/favoris/:id', function (req, res) {
  Announcement.find({ visitor: req.params.id }).populate("visitor ").exec((err, data) => {

    if (err) {
      console.error("i am in error");
      throw err

    } else {

      console.log("data fetching favourite from query:", data);
      res.send(data)
    }
  })
})
//delete announcement from the favoris in visitor and visitor  in announcements
app.put('/api/renting/favoris/delete/:_id', function (req, res) {
  console.log("req in server: ", req.body);
  Visitor.findByIdAndUpdate(
    req.params,
    { $pull: { Favoris: { $in: [req.body.favoris] } } }, { new: true }, (error, data) => {
      if (error) {
        throw error
      }
      else {
        console.log("data from db:", data);
        res.send(data)
      }
    }
  );
  app.put('/api/renting/favoris/delete/announcement/:_id', function (req, res) {
    console.log("req in server: ", req.body);
    Announcement.findByIdAndUpdate(
      req.body.favoris,
      { $pull: { visitor: { $in: [req.params] } } },
      { new: true }, (error, data) => {
        if (error) {
          throw error
        }
        else {
          console.log("data from db:", data);
          res.send(data)
        }
      }
    );

  });
})
/*update views for announcement */
app.put('/api/announcement/:Id', function (req, res) {
  console.log("req in server", req.body);
  Announcement.updateOne({ _id: req.params.Id }, req.body, (error, data) => {
    if (error) {
      throw error
    }
    else {
      // console.log("data from db:", data);
      res.send(data)
    }
  })
});
/// get request to fetch host annoucement
app.get("/api/host", function (req, res) {
  Announcement.find({}, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})
//// a delete request for one annoucement
app.delete('/api/host/delete/:id', function (req, res) {
  console.log(req.params.id);
  console.log('hey');
  Announcement.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})
app.put('/api/renting/announcement/update', function (req, res) {
  console.log("req in server", req.body);
  Host.findOneAndUpdate(
    req.body.host,
    { $pull: { announcements: req.body.id } }, { new: true }, (error, data) => {
      if (error) {
        throw error
      }
      else {
        console.log("data from db:", data);
        res.send(data)
      }
    }
  );
});
/// get request to add host annoucement in history
app.post("/api/host/addtohistoric/:id", function (req, res) {
  AnnouncementHistory.create(req.body, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
  //////////////////////////////////////////////////
  ////////////////need more time to fix relation ///
  //////////////////between tables//////////////////
  //////////////////////////////////////////////////
  // Host.findOneAndUpdate(
  //   req.params.id ,
  //   {$push:{history:req.body._id }} ,  { new: true, useFindAndModify: false },{new:true},(error, data) => {
  //     if (error) {
  //               throw error
  //             }
  //             else {
  //                console.log("data from db:", data);
  //               res.send(data)
  //             }
  //   }
  // );
})
// get all data in historic for one host
app.post('/api/host/historic', function (req, res) {
  console.log('req:', req.body);
  AnnouncementHistory.find({ host: req.body.id }).populate('host').exec(function (err, data) {
    if (err) {
      console.error("iam in error", err)

    } else {
      res.send(data)
    }
  })
})
///delete one announcement form history of host
//// a delete request for one annoucement
app.delete('/api/host/historic/delete/:id', function (req, res) {
  console.log('delete from history', req.params.id);
  console.log('hey');
  AnnouncementHistory.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})
///delete all announcement form history of host
app.delete('/api/host/historic/deleteall/:id', function (req, res) {
  console.log('delete from history', req.params.id);
  console.log('hey');
  AnnouncementHistory.remove({ host: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})
///update an annoucement 
app.post("/api/announcement/update", function (req, res) {
  console.log(req.body);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const { title, description, address, numberOfRooms, numberOfVisitors, picture1, picture2, picture3, picture4, picture5,
    strongPoints, extraAccomodations, startDate, endDate } = req.body
  Announcement.update(req.body._id, req.body, (error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.send(date)
    }
  })
})
///add to booking table
app.post('/api/booking', function (req, res) {
  // console.log("data from req:", req.body);
  Booking.create(req.body.bookedAnnouncement, (error, data) => {
    if (error) {
      throw error
    } else {
      res.send(data)
    }
  })
});
app.put('/api/booking/update/visitor/:id', function (req, res) {
  console.log('req.body=', req.body, req.params);
  Visitor.findByIdAndUpdate(req.body._id,
    { $push: { bookings: req.params.id } }, { new: true, useFindAndModify: false },
    (error, data) => {
      if (error) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
})
app.put('/api/booking/update/host/:id', function (req, res) {
  Host.findByIdAndUpdate(req.body._id,
    { $push: { bookings: req.params.id } }, { new: true, useFindAndModify: false },
    (error, data) => {
      if (error) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
})
//update announcement with new start date
app.put('/api/booking/update/announcement/start', function (req, res) {
  Announcement.findByIdAndUpdate(req.body._id,
    { startDate: req.body.startDate },
    (error, data) => {
      if (error) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
})
//update announcement with new start date
app.put('/api/booking/update/announcement/end', function (req, res) {
  Announcement.update({ _id: req.body._id },
    { endDate: req.body.endDate },
    (error, data) => {
      if (error) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
})
//create new announcement with new dates
app.post('/api/booking/update/announcement/create', (req, res) => {
  Announcement.create(req.body, (error, data) => {
    if (error) {
      res.send(error)
    } else {
      console.log('message', data._id)
      Host.findByIdAndUpdate(
        req.body.host,
        { $push: { announcements: data._id } },
        { new: true, useFindAndModify: false }, (error, data) => {
          if (error) {
            throw error
          }
          else {
            console.log("data from db:", data);
            res.send(data)
          }
        }
      );
    }
  })
})
/// get request to fetch host bookings
app.post("/api/renting/fetching/booking/list/host/:id", function (req, res) {
  Booking.find({ host: req.params.id }).populate("visitor ").exec(function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})
app.post("/api/renting/fetching/booking/list/visitor/:id", function (req, res) {
  Booking.find({ host: req.params.id }).populate("host ").exec(function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});