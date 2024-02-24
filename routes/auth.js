const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const dashdb =require('../models/dashboard_db');

const authController = require('../controllers/auth');

const db = require('../util/database');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { authenticateToken } = require('../middleware/authentication');

const crypto = require('crypto');


const fs = require('fs');
const { stringify } = require('querystring');
const { log } = require('console');

require('dotenv').config();


router.use(cookieParser());

router.use(bodyParser.json({
  limit: '50mb'                   
}));




//------------------------------------------------------logout--------------------
router.get('/logout',authenticateToken, (req, res) => {


  // Clear the 'token' cookie

  const respondText = {
    
    status:200,
    message:"Successfully loged in!",
    
  }
  console.log("WORKS");
  res.clearCookie('authToken');
  res.json(respondText);
});
//----------------------------login route ------------(WORKING)
// router.get('/login', (req, res) => {
//   const nonce = crypto.randomBytes(16).toString('base64');
//   res.render('login.ejs' ,{ nonce })
// })

router.post('/login',async (req, res, next) => {



  
  var nic = (req.body.nic);
  var password = (req.body.password);


  //console.log(req.body.nic + " " + password);

  if (!(nic || password)) {

   
      res.status(400).send("NIC or password not there");

  }else{  

      try {

        //getting users password from db---------------------------
          var resl = await User.logincheck(nic);
        
       

          if(resl.length > 0){


// get the hashed password and dehashit------------------------------------------------------
              const storedHash = resl[0].PASSWORD;
              const userNIC = resl[0].NIC;
              


              //we are getting users name using there NIC-------------------------
             

// Compare the provided password with the stored hash------------------------------------------
              bcrypt.compare(password, storedHash, async (err, result) => {

              if (err) {

                  console.error('Error comparing passwords:', err);
                  res.status(500).send({message:"Error comparing passwords"});

              } else if (result) {


                 //getting users name by there NIC-----------------------------
              var emp_tbl_result = await User.getemp(userNIC);
        
              if(emp_tbl_result[0].EMP_NAME){
               
                    var name_of_the_emp = emp_tbl_result[0].EMP_NAME;
              }

                //setting up user Data object so pass along with token---------------

                
                const payload = { name_of_the_emp, userNIC };

                 //------------------------------creating token-----------------------------

                  //let privetKey = fs.readFileSync('./private.pem','utf8');
                 
                  let tokennw = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
      
                  //res.cookie('authToken', tokennw, { httpOnly: true, path: '/', domain: 'localhost' ,sameSite: 'none'});
        
                  //console.log(tokennw);

                  //const redirectUrl = '/index';
                  const respondText = {
                    redirectUrl:'/app/dashboard',
                    status:200,
                    message:"Successfully loged in!",
                    nic:userNIC,
                    token:tokennw

                  }
                  

    // Send the redirect URL as JSON response
                   res.json(respondText);

              } else {

                  console.log('Password is incorrect. Authentication failed.');
                  console.log("Password is incorrect. Authentication failed.");
                  res.status(500).send({message:"Password is incorrect. Authentication failed."});

              }
//db.end();
            });
           
           


          }else{

            console.log("User Not Found");
            //const userMessage = {message:"User Not Found!"}
            res.status(404).send({message:"User Not Found"}).redirect('/auth/login');

          }
          
      } catch (error) {

        next(error);
          
      }
         
  }


});


//----------------------------get all from user table------------(WORKING)
router.get('/items', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});



router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
    body('title').trim(),
  ],
  authController.signup
);


router.post('/getData', async (req, res) => {


  try {

    const data = {
     
      email: req.body.email
      
    };

    console.log(email);
    

    const result = await User.getData(data);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});

//----------------------------save new user data --------------------(WORKING)
router.post('/newuser', async (req, res) => {

 

  try { 
    //checking user alredy exist
    const result = await User.findalredy_A_user(req.body.nic);
    if(result.length>0){
      res.status(200).send({message:"Alredy Exist!"});
    }else{


      //hashing password
      bcrypt.hash(req.body.password, 10,async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          connection.end();
          return;
        }
  
        const data = {
          uid:req.body.uid ,
          password:hash,
          email:req.body.email,
          nic:req.body.nic
        };
  
        
        console.log(hash);
  
        const result = await User.adduser(data);
  
        if(result.affectedRows>0){
  
          console.log(result);
          res.status(200).send({message:"Successfully inserted!"});
    
        }else{
    
          //console.log("Error Occured!");
          throw res.status(500).send({message:"Error Occured!"});
          
        }
  
        
      });
    }

   

    //console.log(data.password);

    

      

      

    
      

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


  
});


//-----------------------------check user alredy in database for sign up
router.get('/getalredysignin', async (req, res) => {

  var email = (req.body.email);

  if (!email) {

      //User input cannot be validated. Send an error

      //var usererror = new CustomError('user','email is empty');
      res.status(400).send("email is not there");

      //log.info(usererror.message);
      //log.debug(usererror.stack);

  }else{  

      try {

          var resl = await User.retrieve(req.body);

          if(!resl){

              //var ret = new CustomError('user', 'record not exist');
              res.status(400).send("error from auth");

              //log.info(ret.message);
              //log.debug(ret.stack);

          }else{
      
              console.log(resl);
              res.status(200).send(resl);

          }
          
      } catch (error) {

          throw(error);
          
      }
         
  }

   
});

//router.post('/login', authController.login);

module.exports = router;
