


    // "start": "nodemon index.js"


    // "start": "node index.js",
    //  "dev": "nodemon index.js"
// https://cloud.mongodb.com/v2/69174dafe7ce87484f328a3f#/metrics/replicaSet/69174ed97aa26f33bdfdcf55/explorer/schoolDB/users/find
// div multi line in react
// design ui/ux add event web 
// https://www.w3schools.com/css/css_image_transparency.asp
// https://dashboard.render.com/
// This is how you "create" data in MongoDB through a React app.
//React sends a POST request.
// Express receives it and uses Mongoose to create in MongoDB.
// https://cloud.mongodb.com/v2/69174dafe7ce87484f328a3f#/explorer/69174df495eaf35c70234139





// import dotenv from "dotenv";


const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
// const bodyParser = require("body-parser");
 

// const fs = require('fs');
// const path = require('path');
 

// event activities 
// const EventModel = require('./models/event.js')
const ServiceModel = require('./models/service.js')

// const ContactModel = require('./models/contact.js')
const User = require('./models/User.js')
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT;
// const PORT = 3001;
const app = express()

dotenv.config();
app.use(express.json())

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cors({
//   origin: "https://school-f.vercel.app",
//   methods: "GET,POST,PUT,DELETE,OPTIONS",
//   allowedHeaders: "Content-Type, Authorization"
// }));

// const allowedOrigins = [
//   process.env.FRONTEND_URL_LOCAL,
//   process.env.FRONTEND_URL_PROD
// ];
app.use(cors());

// const allowedOrigins = [
//   process.env.FRONTEND_URL_LOCAL,
//   process.env.FRONTEND_URL_PROD
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve uploaded files

// mongoose.connect('mongodb://127.0.0.1:27017/associationDB')
 const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
.then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err.message));
// const URL = "mongodb://127.0.0.1:27017/school"
//  const URL = process.env.MONGODB_URL;
// //  {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }
// mongoose.connect(URL)
// .then(() => console.log("✅ Connected to MongoDB successfully"))
// .catch(err => console.error("❌ MongoDB connection error:", err));







//  Ensure uploads folder exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).json({ message: " البريد الإلكتروني أو كلمة المرور  غير صحيحة " });

  const valid = await user.validatePassword(password);
  if (!valid) return res.status(400).json({ message: " البريد الإلكتروني أو كلمة المرور  غير صحيحة " });

  res.json({ message: " تسجيل دخول صحيح", email: user.email });
});

//  Change Password Route
app.post("/api/auth/change-password", async (req, res) => {
  const { email, oldPassword,newPassword } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).json({ message: "User not found" });

  //  Verify old password
  const valid = await user.validatePassword(oldPassword);
  if (!valid) return res.status(400).json({ message: "Old password is incorrect" });

  await user.setPassword(newPassword);
  await user.save();

  res.json({ message: "Password updated successfully" });
});

//  Register Route
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email: email.toLowerCase() });
  if (exist) return res.status(400).json({ message: "Email already exists" });

  const user = new User({ email: email.toLowerCase() });
  await user.setPassword(password);
  await user.save();

  res.json({ message: "User created" });
});








//ContactModel

// app.post('/contactassociation', (req, res) => {
//     // console.log(" Incoming order:", req.body); 
//      // للتأكد من وصول البيانات

//   ContactModel.create(req.body)
//     .then(contactsch=>{
//             console.log(" Saved order:", contactsch);

//        res.json(contactsch)})
//     .catch(err => res.json(err));
// })



// app.get('/contactschool', async (req, res) => {
//   try {
//     const contacts = await ContactModel.find();
//         // console.log(" Sending contacts:", contacts); 

//     res.json(contacts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch contacts" });
//   }
// });


// app.delete("/deleteMessage/:id", async (req, res) => {
//   try {
//     await ContactModel.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Message deleted" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// app.post('/contactschool', (req, res) => {
//     // console.log(" Incoming order:", req.body); 
//      // للتأكد من وصول البيانات

//   ContactModel.create(req.body)
//     .then(contactsch=>{
//             console.log(" Saved order:", contactsch);

//        res.json(contactsch)})
//     .catch(err => res.json(err));
// })
// app.get("/events" , (req,res) => {
//  EventModel.find({}) //حتىalways returns an array, even  if empty .
//     .then(event => res.json(event))     // sends array of events
//     .catch(err => res.json(err))
// })

 
// true

// app.get("/getEvent/:id" , (req,res) => {
//     const id = req.params.id;
//     EventModel.findById({_id:id})
//     .then(event => res.json(event)) 
//     .catch(err => res.json(err))
// })



// app.post("/createEventBase64", async (req, res) => {
//   try {
//     const { date, place, title, text, mainImage, images } = req.body;

//     const newEvent = new EventModel({
//       mainImage: mainImage || "",
//       images: images || [],
//       date,
//       place,
//       title,
//       text,
//     });

//     const savedEvent = await newEvent.save();
//     res.status(201).json(savedEvent);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// app.put("/updateEvent/:id" , (req,res) => {
//     const id = req.params.id;
//     EventModel.findByIdAndUpdate({_id:id}, {
// // Updated fields
//      mainImage	: req.body.mainImage	,  
//       images	: req.body.images	,  
//       date	: req.body.date,  
//      place: req.body.place,  
//            title : req.body.title , 
//          text: req.body.text,  
 
            

//     })
//     .then(event => res.json(event))
//             // .then(user => res.json(user))

//         // .then(groups => res.json(groups))

//     .catch(err => res.json(err))
// })  






// app.delete("/deleteEvent/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deletedUser = await EventModel.findByIdAndDelete(id);
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });





// services

app.get("/services", async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/getService/:id" , (req,res) => {
    const id = req.params.id;
    EventModel.findById({_id:id})
    .then(event => res.json(event)) 
    .catch(err => res.json(err))
})
app.post("/createservices", async (req, res) => {
  try {
    const service = await ServiceModel.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});




app.put("/services/:id", async (req, res) => {
  try {
    const updated = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.delete("/services/:id", async (req, res) => {
  try {
    await ServiceModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});





app.get("/req", (req, res) => {
  res.send("Backend is working success. ✅");
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)

})


// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => console.log("Local server running"));
// }

// module.exports = app;
