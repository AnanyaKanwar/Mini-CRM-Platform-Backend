// // ======= Load Environment Variables FIRST =======
// require('dotenv').config();

// // ======= Import Dependencies =======
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const session = require('express-session');

// // ======= Initialize App =======
// const app = express();

// // ======= Middleware =======
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());

// // ======= Session & Passport Setup =======
// app.use(session({
//   secret: process.env.JWT_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // ======= Connect to MongoDB =======
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // ======= Routes =======
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/customers', require('./routes/customers'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/campaigns', require('./routes/campaigns'));
// app.use('/api/communication-logs', require('./routes/communicationLogs'));
// app.use('/api/delivery-receipt', require('./routes/deliveryReceipt'));
// app.use('/api/ai', require('./routes/ai')); 

// // ======= Root Route =======
// app.get('/', (req, res) => {
//   res.send('Mini CRM Platform Backend is running!');
// });

// module.exports = app;























// ======= Load Environment Variables FIRST =======
require('dotenv').config();

// ======= Import Dependencies =======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


// ======= Initialize App =======
const app = express();

// ======= Middleware =======
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// ======= Session & Passport Setup =======
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ======= Connect to MongoDB =======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ======= Routes =======
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/communication-logs', require('./routes/communicationLogs'));
app.use('/api/delivery-receipt', require('./routes/deliveryReceipt'));
app.use('/api/ai', require('./routes/ai')); 

// ======= Root Route =======
app.get('/', (req, res) => {
  res.send('Mini CRM Platform Backend is running!');
});

const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`app is running on port: ${port}`);
// })


module.exports = app;
