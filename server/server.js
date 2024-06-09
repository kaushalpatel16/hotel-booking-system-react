const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Bookinfo =require('./modules/Bookinfo.js');
const cors = require('cors');
const Question=require('./modules/Question.js');
const logindata =require('./modules/logindata.js');
const Subscriber = require('./modules/Subscriber.js')
const Roominfos = require('./modules/Roominfo')
const Bookedroom = require('./modules/BookedRoom')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();


const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>{
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());


//bookinginfo api

app.get('/bookinfos',async (req,res)=>{
    const datas = await Bookinfo.find();
    res.send(datas);
});

app.get('/bookinfo/:id',async (req,res)=>{
    const datas = await Bookinfo.findOne({name:req.params.id});
    res.send(datas);
});

app.get('/bookinfos/:Time/:date', async (req, res) => {
    const { Time, date } = req.params;
    console.log(Time);

    const datas = await Bookinfo.aggregate([
        {
            $match: {
                date: date,
                Time: Time,
                visibility: "able"
            }
        },
        {
            $group: {
                _id: null,
                totalfivepersontable: { $sum: "$fivepersontable" },
                totalfourpersontable: { $sum: "$fourpersontable" },
                totalthreepersontable: { $sum: "$threepersontable" }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field from the result
                totalfivepersontable: 1,
                totalfourpersontable: 1,
                totalthreepersontable: 1
            }
        }
    ]);

    if (datas.length > 0) {
        res.send(datas[0]);
    } else {
        // Return an object with all values set to 0
        res.send({
            totalfivepersontable: 0,
            totalfourpersontable: 0,
            totalthreepersontable: 0
        });
    }

    console.log(datas);
});

app.post('/bookinfo', async (req, res) => {
    const datas = new Bookinfo();
    datas.name = req.body.name;
    datas.Time = req.body.Time;
    datas.request = req.body.request;
    datas.phonenumber=req.body.phonenumber;
    datas.fivepersontable = req.body.fivepersontable;
    datas.fourpersontable = req.body.fourpersontable;
    datas.threepersontable = req.body.threepersontable;
    datas.visibility=req.body.visibility;
    datas.date=req.body.date;


    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);

    client.messages
    .create({
        body: `hello ${req.body.name} your booking in date ${req.body.date} and time is ${req.body.Time} is confirm . thank you for booking`,
        from: '+12342629139',
        to: '+-your-phone-number'
    })
    .then(message => {
        console.log('SMS sent:', message.sid);
        // Additional logic after SMS is sent
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        // Handle error
    });
});


app.put('/bookinfo/:id', async (req, res) => {
    const datas = await Bookinfo.findOne({ _id: req.params.id });
    datas.name = req.body.name;
    datas.Time = req.body.Time;
    datas.request = req.body.request;
    datas.phonenumber=req.body.phonenumber;
    datas.fivepersontable = req.body.fivepersontable;
    datas.fourpersontable = req.body.fourpersontable;
    datas.threepersontable = req.body.threepersontable;
    datas.visibility=req.body.visibility;
    datas.date=req.body.date;

    await datas.save(); // Fix the variable name here
    res.send(datas);
});


app.delete('/bookinfo/:id',async (req,res)=>{
    const datas = await Bookinfo.deleteOne({_id:req.params.id});
    res.send(datas);
});



















//rommboking api

app.get('/roominfos',async (req,res)=>{
    const datas = await Bookedroom.find();
    res.send(datas);
});
app.get('/roominfos/:name/:phone/:from/:to',async (req,res)=>{
    const { name, phone, from, to } = req.params;
    const datas = await Bookedroom.find({
        name: name,
        phone: phone,
        bookedDates: { $all: [from, to] } });
    res.send(datas);
});
app.get('/Rooms',async (req,res)=>{
    const datas = await Roominfos.find();
    res.send(datas);
});

app.post('/Roominfo', async (req, res) => {
    const datas = new Roominfos();
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.kingsize=req.body.kingsize;
    datas.queensize = req.body.queensize;
    datas.familysize = req.body.familysize;
    datas.adult = req.body.adult;
    datas.children=req.body.children;
    datas.from=req.body.from;
    datas.to=req.body.to;
    datas.status="able";

    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);

   
});

app.put('/roominfos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datas = await Bookedroom.findOne({_id:id});
        datas.kingsize = datas.kingsize;
        datas.queensize =  datas.queensize;
        datas.familysize = datas.familysize;
        datas.bookedDates=datas.bookedDates;
        datas.name = datas.name;
        datas.phone = datas.phone ;
        datas.status=req.body.status;

        await datas.save();
        res.send(datas);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});

app.put('/Rooms/:id', async (req, res) => {
    const datas = await Roominfos.findOne({ _id: req.params.id });
    datas.name = datas.name;
    datas.phone = datas.phone;
    datas.email = datas.email;
    datas.kingsize=datas.kingsize;
    datas.queensize = datas.queensize;
    datas.familysize = datas.familysize;
    datas.adult = datas.adult;
    datas.children=datas.children;
    datas.from=datas.from;
    datas.to=datas.to;
    datas.status=req.body.status;
    await datas.save(); // Fix the variable name here
    res.send(datas);
});



app.post('/sendmsg', async (req, res) => {
    try {
        
        const roomnumbers = req.body.roomnumber.split(',');
        const roomNumbersString = roomnumbers.join(', ');
         console.log(roomNumbersString)
        const message = await client.messages.create({
            body: `Hello ${req.body.name}, your booking is confirmed. Your room number(s) is/are: ${roomNumbersString}. Thank you for booking.`,
            from: '+12342629139',
            to: '+your-phone-number'
        });

        console.log('SMS sent:', message.sid);
        // Additional logic after SMS is sent

        res.status(200).json({ success: true, message: 'SMS sent successfully.' });
    } catch (error) {
        console.error('Error sending SMS:', error);
        // Handle error
        res.status(500).json({ success: false, message: 'Failed to send SMS.' });
    }
});



app.post('/bookedroominfo/:From/:To',async (req,res)=>{

    const { From, To } = req.params;

    const datas = new Bookedroom();
    datas.kingsize = req.body.kingsize;
    datas.queensize = req.body.queensize;
    datas.familysize = req.body.familysize;
    datas.bookedDates=[From,To];
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.status = req.body.status;

    console.log("date array ",From);

    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
});

app.get('/bookedroominfos/:From/:To',async (req,res)=>{

    const { From, To } = req.params;
    const fromDateString = From;
    const toDateString = To;

    console.log(From);
    console.log(To);

   const availablerooms =[]

const queensizebookedRooms = [];
const kingsizebookedRooms = [];
const familysizebookedRooms = [];



const roomData = await Bookedroom.find({ queensize: { $exists: true } });

roomData.forEach((room) => {
  const bookfrom = new Date(room.bookedDates[0]);
  const bookto = new Date(room.bookedDates[1]);
  const fromDate = new Date(fromDateString);
  const toDate = new Date(toDateString);
  
  if ((fromDate >= bookfrom && fromDate < bookto) || (toDate > bookfrom && toDate <= bookto)) {
    queensizebookedRooms.push(room.queensize);
  } else {
    console.log("Room is available for the specified date range:", room.queensize);
    // You can add the room to availableRooms if needed
  }
  if(fromDate < bookfrom && bookto < toDate){
    queensizebookedRooms.push(room.queensize);
  }
});

  console.log("Booked Rooms:", queensizebookedRooms);



const roomDataa = await Bookedroom.find({ kingsize: { $exists: true } });

roomDataa.forEach((room) => {
  const bookfrom = new Date(room.bookedDates[0]);
  const bookto = new Date(room.bookedDates[1]);
  const fromDate = new Date(fromDateString);
  const toDate = new Date(toDateString);
  
  if ((fromDate >= bookfrom && fromDate < bookto) || (toDate > bookfrom && toDate <= bookto)) {
    kingsizebookedRooms.push(room.kingsize);
  } else {
    console.log("Room is available for the specified date range:", room.kingsize);
    // You can add the room to availableRooms if needed
  }
  if(fromDate < bookfrom && bookto < toDate){
    kingsizebookedRooms.push(room.kingsize);
  }
});

  console.log("Booked Rooms:", kingsizebookedRooms);


  const roomDataaa = await Bookedroom.find({ familysize: { $exists: true } });

roomDataaa.forEach((room) => {
  const bookfrom = new Date(room.bookedDates[0]);
  const bookto = new Date(room.bookedDates[1]);
  const fromDate = new Date(fromDateString);
  const toDate = new Date(toDateString);
  
  if ((fromDate >= bookfrom && fromDate < bookto) || (toDate > bookfrom && toDate <= bookto)) {
    familysizebookedRooms.push(room.familysize);
  } else {
    console.log("Room is available for the specified date range:", room.familysize);
    // You can add the room to availableRooms if needed
  }
  if(fromDate < bookfrom && bookto < toDate){
    familysizebookedRooms.push(room.familysize);
  }
});

  console.log("Booked Rooms:", familysizebookedRooms);
  availablerooms.push(5-queensizebookedRooms.length)
  availablerooms.push(5-kingsizebookedRooms.length)
  availablerooms.push(5-familysizebookedRooms.length)
  availablerooms.push(kingsizebookedRooms)
  availablerooms.push(queensizebookedRooms)
  availablerooms.push(familysizebookedRooms)

   console.log(queensizebookedRooms.length)


      res.send(availablerooms);
      
});















app.get('/roominfoss', async (req, res) => {
    const { Time, date } = req.params;
    console.log(Time);

    const datas = await Bookinfo.aggregate([
        {
            $match: {
                date: date,
                Time: Time,
                visibility: "able"
            }
        },
        {
            $group: {
                _id: null,
                totalfivepersontable: { $sum: "$fivepersontable" },
                totalfourpersontable: { $sum: "$fourpersontable" },
                totalthreepersontable: { $sum: "$threepersontable" }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field from the result
                totalfivepersontable: 1,
                totalfourpersontable: 1,
                totalthreepersontable: 1
            }
        }
    ]);

    if (datas.length > 0) {
        res.send(datas[0]);
    } else {
        // Return an object with all values set to 0
        res.send({
            totalfivepersontable: 0,
            totalfourpersontable: 0,
            totalthreepersontable: 0
        });
    }

    console.log(datas);
});














//logindata api


app.get('/logindatas',async (req,res)=>{
    const datas = await logindata.find();
    res.send(datas);
});
app.get('/logindatas/:userid', async (req, res) => {
    const { userid } = req.params;
    const datas = await logindata.findOne({_id:userid});
    res.send(datas);
});

app.get('/logindata/:name/:password',async (req,res)=>{
    const { name, password } = req.params;
    const datas = await logindata.findOne({ name, password});
    res.send(datas);
});


app.post('/logindata', async (req, res) => {
    const datas = new logindata();
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.password=req.body.password;
    datas.user = req.body.user;

    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
});


app.put('/logindata/:id', async (req, res) => {
    const datas = await logindata.findOne({ _id: req.params.id });
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.password=req.body.password;
    datas.user = req.body.user;
    await datas.save(); // Fix the variable name here
    res.send(datas);
});


app.delete('/logindata/:id',async (req,res)=>{
    const datas = await logindata.deleteOne({_id:req.params.id});
    res.send(datas);
});














//newslatter  handling

app.get('/Subscribers',async (req,res)=>{
    const datas = await Subscriber.find();
    res.send(datas);
});
app.post('/Subscriber', async (req, res) => {
    const datas = new Subscriber();
    datas.name = req.body.name;
    datas.email = req.body.email;
   
    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
});




app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const lineItems = {
            price_data: {
                currency: "inr",
                product_data: {
                    name: `hi ${req.body.name}, we give your money back`,
                },
                unit_amount: 50 * 100,
            },
            quantity: 1,
        };

        console.log(req.body.name);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [lineItems],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/booktable",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/api/questions/:language', async (req, res) => {
      const questions = await Question.find({ language: req.params.language });
      res.json(questions);
      console.log(questions);
  
  });

  



app.listen(8081,()=>{
    console.log("Server started at @ 8081");
});
})