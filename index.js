//------------------------------------ DEVELOPED BY HIRAN SHAMAL--------------------------

require('dotenv').config();

const cors = require('cors');

//const helmet = require('helmet');
const crypto = require('crypto');

const express = require('express');

const bodyParser = require('body-parser');

const crudRoutes = require('./routes/crudroutes');

const authRoutes = require('./routes/auth');

const dashbordRoutes = require('./dashbord/dashbord_routes');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');

const app = express();

const fs = require('fs');

const jwt = require('jsonwebtoken');

const flash = require('express-flash');

const session = require('express-session');

const ejs = require('ejs');

const cookieParser = require('cookie-parser');

const { authenticateToken } = require('./middleware/authentication');



app.use(cookieParser());

app.use(express.json());




//-----------------------------------------------------------Midlewares-----------------------
app.use(bodyParser.json({
  limit: '50mb'                   
}));

app.use(express.urlencoded({ extended: false }));


// Enable CORS for a specific origin (e.g., your Angular app)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your Angular app's URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Add the HTTP methods you want to allow
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Add the headers you want to allow

  // Set to true if you want to include cookies in cross-origin requests (requires appropriate cookie configuration on both sides)
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});



// const corsOptions = {
//   origin: 'http://localhost:4200', // Replace with your Angular app's URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable cookies and authentication headers
// };

// app.use(cors(corsOptions));


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Accept, X-Custom-Header, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }
//   next();
// });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Handle CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With ');

  

//   if ('OPTIONS' == req.method) {
//       res.status(200).send();
//   } else {
//       next();
//   }
// });


//app.use(helmet());

// Define a custom CSP policy using Helmet's contentSecurityPolicy middleware
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", 'example.com'],
//       styleSrc: ["'self'", 'example.com'],
//       imgSrc: ['*'],
//     },
//   })
// );


// Set CSP(CONTENT SICURITY POLICY) header
// app.use((req, res, next) => {

//   const nonce = crypto.randomBytes(16).toString('base64');
  
//   res.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline';");
//   next();
// });






//-------------------------------------------------------Routes--------------------------
app.get('/',authenticateToken, (req, res) => {
  // Redirect to a different URL
  res.redirect('/auth/login');
});

//---------------when user request by direct link this route will check the token and redirirect to login

app.get('/authcheck',authenticateToken, async (req, res) => {


});



//-------------------routes for first registration
app.use('/auth', authRoutes);

//------------------------------------dashbords------------------------
app.use('/app', dashbordRoutes);



//get token from cookie

app.use('/stock', crudRoutes);

app.use('/post', postsRoutes);




//app.use(errorController.get404);

//app.use(errorController.get500);
const ports = process.env.PORT || 3000;

app.listen(ports, () => console.log(`Listening on port ${ports}`));




