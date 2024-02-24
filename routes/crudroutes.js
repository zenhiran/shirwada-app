const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

const db = require('../util/database');
const { authenticateToken } = require('../middleware/authentication');


//----------------------------retrive data from STOCK---------------------------

router.get('/getfromstock/:itemId', async (req, res) => {


  try {
    const itm_id =req.params.itemId;

    const result = await User.getfromstock(itm_id);
    
    console.log(result);
    if(result.length <= 0){

      const resData = {
        status:404,
        message:"Cant Find Record Check the ID"
      }

      res.status(200).send(resData);

    }else if(result.length > 0){

      const resData = {
        status:200,
        message:"Record Found!",
        result:result
      }

      res.status(200).send(resData);

    }else{

      const resData = {
        status:200,
        message:"Internal Error!",
        result:result
      }

      console.error("ERROR WHILE LOADING");
      res.status(500).send(resData);

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new STOCK  --------------------(WORKING)
router.post('/addstock', async (req, res) => {

    try {
      const data = {
        itm_id: req.body.itm_id ,
        itm_name: req.body.itm_name,
        grd:req.body.grd,
        mfd: req.body.mfd,
        exp:req.body.exp,
        qty:parseInt(req.body.qty),
        unit_price:parseFloat(req.body.unit_price),
        unit_cost:parseFloat(req.body.unit_cost),
        b_id:req.body.bid,
      };
      //var stud_id = parseInt(req.body.id);
  
      const result = await User.addforstock(data);
      //res.json(result);

      //check the result
      if(result){

        const resData = {
          status:200,
          message:"Record Added!",
          result:result
        }

        console.log(resData);
        res.status(200).send(resData);

      }else{


        const resData = {
          status:500,
          message:"Error while adding!",
        }

        console.error(resData);
        res.status(500).send(resData);

      }

    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  
  
  
  });


//----------------------------update STOCK  --------------------(WORKING)
router.put('/updatestock/:itemId', async (req, res) => {



  try {
      
      const itm_id= req.params.itemId;
      const itm_name= req.body.itm_name;
      const mfd= new Date(req.body.mfd);
      const exp=new Date(req.body.exp);
      const grd=new Date(req.body.grd);
      const qty=parseInt(req.body.qty);
      const unit_price=parseFloat(req.body.unit_price);
      const unit_cost = parseFloat(req.body.unit_cost);
      const bid = req.body.bid;

      const data ={
        itm_id,
        itm_name,
        mfd,
        exp,
        grd,
        qty,
        unit_price,
        unit_cost,
        bid
      }
    
      if (!itm_id || !itm_name || !mfd || !exp ||!grd || !qty || !unit_price || !unit_cost || !bid ) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updateStock(data);

      
  
      if(result.affectedRows<=0){

        const resData = {
          status:404,
          message:"Record not Found!",
        }

        console.log(resData);
        res.status(200).send(resData);

      }else if(result.affectedRows > 0){

        const resData = {
          status:200,
          message:"Record Updated!",
        }
        console.log(resData);
        res.status(200).send(resData);

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from STOCK--------------(WORKING)
router.delete('/deletestock/:itemId', async (req, res) => {


  try {
    const itm_id =req.params.itemId ;

    const result = await User.deleteStock(itm_id);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});











//-------------------------------BRANCH TABLE----------

//----------------------------retrive data from BRANCH---------------------------

router.get('/getbranch/:bid', async (req, res) => {


  try {
    const bid =req.params.bid;
    //console.log(itm_id);

    const result = await User.getemp(bid);
    
    console.log(result);
    if(result.length <= 0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD CHECK THE BRANCH ID");

    }else if(result.length > 0){

      console.log(result);
      res.status(200).send(result);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new BRANCH  --------------------(WORKING)
router.post('/addbranch', async (req, res) => {

   

    try {
      const data = {
        bid: req.body.bid ,
        bname: req.body.bname,
        tp: req.body.tp,
        address:req.body.address,
      };


      //before add check the user alredy in db
      const userexist = await User.getbranch(data.bid);
      console.log(userexist);

      if((userexist.length>0)){
        console.log("User Exist!");
        res.status(409).send("Branch Alredy exist!")
      }else{ 

        const result = await User.addbranch(data);
        
        if(result){
  
          //console.log(result);
          res.status(200).send("RECORD ADDED!");
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update BRANCH  --------------------(WORKING)
router.put('/updatebranch/:bid', async (req, res) => {


  const bid_from_req_parm = req.params.bid;
  try {
      

      const data ={
        bid_from_req_parm,
        bname: req.body.bname,
        tp: req.body.tp,
        address:req.body.address,
        bid: req.body.bid ,
      }
    
      if (!data.bid || !data.bname || !data.tp || !data.address) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updatebranch(data);

      
  
      if(result.affectedRows<=0){

        console.log(result);
        res.status(200).send("CAN'T UPDATE RECORD NOT FOUND!");

      }else if(result.affectedRows > 0){

        console.log(result.affectedRows>=0);
        res.status(200).send("RECORD UPDATED!");

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from BRANCH--------------(WORKING)
router.delete('/deletebranch/:bid', async (req, res) => {


  try {
    const bid =req.params.bid ;

    const result = await User.deletebranch(bid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});





//-------------------------------EMPLOYEE TABLE--------------------------------------------------------------------------

//----------------------------retrive data from EMPLOYEE---------------------------

router.get('/getemp/:nic', async (req, res) => {


  try {
    const nic =req.params.nic;
    //console.log(itm_id);

    const result = await User.getemp(nic);
    
    console.log(result);
    if(result.length <= 0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD CHECK THE NIC");

    }else if(result.length > 0){

      console.log(result);
      res.status(200).send(result);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new EMPLOYEE  --------------------()
router.post('/addemp', async (req, res) => {

   

    try {
      const data = {
        emp_id: req.body.emp_id ,
        emp_name: req.body.emp_name,
        nic: req.body.nic,
        position:req.body.position,
        title:req.body.title,
        address:req.body.address,
        phone1:req.body.phone1,
        phone2:req.body.phone2
        //add dob 
      
      };


      //before add check the user alredy in db
      const userexist = await User.getemp(data.nic);
      console.log(userexist);

      if((userexist.length>0)){
        console.log("User Exist!");
        res.status(409).send("User Alredy exist!")
      }else{ 

        const result = await User.addemp(data);
        
        if(result){
  
          //console.log(result);
          res.status(200).send("RECORD ADDED!");
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }

    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update EMPLOYEE  --------------------(WORKING)
router.put('/updateemp/:nic', async (req, res) => {



  try {
      


      const emp_id= req.body.emp_id;
      const emp_name= req.body.emp_name;
      const nic= req.params.nic;
      const position= req.body.position;
      const title=req.body.title;
      const address=req.body.address;
      const phone1=req.body.phone1;
      const phone2=req.body.phone2;

      const data ={
        emp_id,
        emp_name,
        nic,
        position,
        title,
        address,
        phone1,
        phone2
      }
    
      if (!emp_id || !emp_name || !position || !title || !address || !phone1 || !phone2) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updateemp(data);

      
  
      if(result.affectedRows<=0){

        console.log(result);
        res.status(200).send("CAN'T UPDATE RECORD NOT FOUND!");

      }else if(result.affectedRows > 0){

        console.log(result.affectedRows>=0);
        res.status(200).send("RECORD UPDATED!");

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from EMPLOYEE--------------(WORKING)
router.delete('/deleteemp/:nic', async (req, res) => {


  try {
    const nic =req.params.nic ;

    const result = await User.deleteemp(nic);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});












//-------------------------------STORE LIST TABLE----------

//----------------------------retrive data from STORE LIST---------------------------

router.get('/getstr/:sid', async (req, res) => {


  try {
    const sid =req.params.sid;
    //console.log(itm_id);

    const result = await User.getstr(sid);
    
    
    if(result.length <= 0){

      const resobject = {
        status:404,
        message:"Record not Found!"
      }

      //console.log(result);
      res.status(200).send(resobject);

    }else if(result.length > 0){


      const resobject = {
        status:200,
        message:"User Exist!",
        result:result
      }

      res.status(200).send(resobject);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new STORE LIST  --------------------(WORKING)
router.post('/addstr', async (req, res) => {

   

    try {
      const data = [
        req.body.strid,
        req.body.name,
        req.body.address,
        req.body.regDate,
        req.body.to1,
        req.body.to1
        
      ];


      //before add check the user alredy in db
      const userexist = await User.getstr(req.body.sid);
      console.log(userexist);

      if((userexist.length>0)){

        const respons ={

          status:403,
          message:"Store Alredy exist!"
        }

        res.status(409).send(respons);
      }else{ 

        const result = await User.addstr(data);
        
        if(result){
  
          const respons ={

            status:200,
            message:"Record Added!",

          }
          res.status(200).send(respons);
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update STORE LIST  --------------------(WORKING)
router.put('/updatestr/:strid', async (req, res) => {


  const sid_from_parms = req.params.strid;
  try {
      

    const data = [
      req.body.strid,
      req.body.name,
      req.body.address,
      req.body.regDate,
      req.body.to1,
      req.body.to2,
      sid_from_parms
    ];

  
      if (!req.body.strid || !req.body.name || !req.body.address || !req.body.regDate || !req.body.to1|| !req.body.to2) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updatestr(data);

      
  
      if(result.affectedRows<=0){

        const resData = {
          status:404,
          message:"Cant update record not Found!",
        }

        res.status(200).send(resData);

      }else if(result.affectedRows > 0){

        const resData = {
          status:200,
          message:"Record Added!",
          result:result
        }
        res.status(200).send(resData);

      }else{

        const resData = {
          status:500,
          message:"Error while adding store"
        }


        res.status(500).send(resData);

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from STORE LIST--------------(WORKING)
router.delete('/deletestr/:sid', async (req, res) => {


  try {
    const sid =req.params.sid ;

    const result = await User.deletestr(sid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});












//-------------------------------SALES TABLE----------

//----------------------------retrive data from SALES---------------------------


//getALL
router.get('/getALLsales', async (req, res) => {


  try {
    //const inid =req.params.inid;
    //console.log(itm_id);

    const result = await User.getsalesALL();
    
    console.log(result);
    if(result.length <= 0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD CHECK THE INVOICE ID");

    }else if(result.length > 0){

      console.log(result);
      res.status(200).send(result);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});



router.get('/getsales/:inid', async (req, res) => {


  try {
    const inid =req.params.inid;
    //console.log(itm_id);

    const result = await User.getsales(inid);

    
    
    console.log(result);
    if(result.length <= 0){

      const sendData = {
        status:404,
        message:"CAN'T FIND RECORD CHECK THE INVOICE ID",
        result:result

      }

   
      res.status(200).send(sendData);

    }else if(result.length > 0){

      const sendData = {
        status:200,
        message:"Record Found!",
        result:result

      }

      
      res.status(200).send(sendData);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new SALES --------------------(WORKING)
router.post('/addsales', async (req, res) => {

   

    try {
      const data = [
        req.body.inv,
        req.body.idate,
        req.body.itemid,
        parseFloat(req.body.unit),
        parseInt(req.body.qty),
        parseInt(req.body.total),
        req.body.nic,
        req.body.strid
       
      ];


      //before add check the user alredy in db
      const userexist = await User.getsales(req.body.invoiceid);
      console.log(userexist);

      if((userexist.length>0)){
        console.log("User Exist!");
        res.status(409).send("Alredy exist!")
      }else{ 

        const result = await User.addsales(data);
        
        if(result){

          const sendDate={
            status:200,
            message:"Record Added!",
            result:result
          }
  
          //console.log(result);
          res.status(200).send(sendDate);
  
        }else{

          const sendDate={
            status:200,
            message:"Error while adding store",
            result:result
          }
  
          
          res.status(500).send(sendDate);
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update SALES --------------------(WORKING)
router.put('/updatesales/:inid', async (req, res) => {


  const inid_from_parms = req.params.inid;
  try {
      

    const data = [
        req.body.inv,
        req.body.idate,
        req.body.itemid,
        parseFloat(req.body.unit),
        parseInt(req.body.qty),
        parseFloat(req.body.total),
        req.body.nic,
        req.body.strid,
        inid_from_parms 
    ];

  
      if (!req.body.inv || !req.body.idate || !req.body.itemid || !req.body.unit || !req.body.qty|| !req.body.total || !req.body.nic || !req.body.strid) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updatesales(data);

      
  
      if(result.affectedRows<=0){

        const senddata = {
          status:404,
          message:"Cant Update record Not Found!",
          
        }

        res.status(200).send(senddata);

      }else if(result.affectedRows > 0){

        const senddata = {
          status:200,
          message:"Record Updated!",
          result:result
        }

        res.status(200).send(senddata);

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from SALES--------------(WORKING)
router.delete('/deletesales/:inid', async (req, res) => {


  try {
    const inid =req.params.inid ;

    const result = await User.deletesales(inid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});












//-------------------------------PAYEMENT TABLE----------

//----------------------------retrive data from PAYEMENT---------------------------

router.get('/getpay/:pid', async (req, res) => {


  try {
    const pid =req.params.pid;
    //console.log(itm_id);

    const result = await User.getpayments(pid);
    
    console.log(result);
    if(result.length <= 0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD CHECK THE STORE ID");

    }else if(result.length > 0){

      console.log(result);
      res.status(200).send(result);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new PAYEMENT --------------------(WORKING)
router.post('/addpay', async (req, res) => {

   

    try {
      const data = [
        req.body.pid,
        req.body.inv,
        req.body.pmeth,
        parseFloat(req.body.outtot),
        req.body.lpdate
      ];


      //before add check the user alredy in db
      const userexist = await User.getpayments(req.body.storeid);
      console.log(userexist);

      if((userexist.length>0)){
        console.log("User Exist!");
        res.status(409).send("Alredy exist!");
      }else{ 

        const result = await User.addpayments(data);
        
        if(result){
  
          //console.log(result);
          res.status(200).send("RECORD ADDED!");
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update PAYEMENT --------------------(WORKING)
router.put('/updatepay/:pid', async (req, res) => {


  const pid_from_parms = req.params.pid;
  try {
      

    const data = [
      req.body.pid,
      req.body.inv,
      req.body.pmeth,
      parseFloat(req.body.outtot),
      req.body.lpdate
    ];
  
      if (!req.body.pid || !req.body.inv || !req.body.pmeth || !req.body.outtot  || !req.body.totpaid|| !req.body.totpaid) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updatepayments(data);

      
  
      if(result.affectedRows<=0){

        console.log(result);
        res.status(200).send("CAN'T UPDATE RECORD NOT FOUND!");

      }else if(result.affectedRows > 0){

        console.log(result.affectedRows>=0);
        res.status(200).send("RECORD UPDATED!");

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from PAYEMENT--------------(WORKING)
router.delete('/deletepay/:pid', async (req, res) => {


  try {
    const pid =req.params.pid ;

    const result = await User.deletepayments(pid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send("CAN'T FIND RECORD TO DELETE!");

    }else if(result){

      console.log(result);
      res.status(200).send("RECORD DELETED!");

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});












///----create new function for thias

//-------------------------------BRANCH_EX TABLE----------

//----------------------------retrive data from BRANCH_EX---------------------------

router.get('/getbex/:exid', async (req, res) => {


  try {
    const exid =req.params.exid;
    //console.log(itm_id);

    const result = await User.getbex(exid);
    
    console.log(result);
    if(result.length <= 0){

      console.log(result);

      response = {

        status:404,
        message:"Cant Find ID"
      }
      res.status(200).send(response);

    }else if(result.length > 0){

      console.log(result);

      response = {
        
        status:200,
        message:"User Exist",
        data:result
      }

      res.status(200).send(response);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new BRANCH_EX --------------------(WORKING)
router.post('/addbex', async (req, res) => {

   
debugger
    try {
      const data = [
        req.body.exid,
        req.body.fromBid,
        req.body.issuedate,
        req.body.tobid,
        req.body.ReciveDate,
        req.body.issueby,
        req.body.itemId,
        req.body.qty
      ];


      //before add check the user alredy in db
      const userexist = await User.getbex(req.body.exid);
      console.log(userexist);

      if((userexist.length>0)){
        console.log({message:"Alredy exist!"});
        res.status(409).send({message:"Alredy exist!"});
      }else{ 

        const result = await User.addbex(data);
        
        if(result){
  
          //console.log(result);
          res.status(200).send({message:"Record Added!"});
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });

//----------------------------update BRANCH_EX --------------------(WORKING)
router.put('/updatebex/:exid', async (req, res) => {


  const exid_from_parms = req.params.exid;
  try {
      

    const data = [
      req.body.exid,
        req.body.fromBid,
        req.body.issuedate,
        req.body.tobid,
        req.body.ReciveDate,
        req.body.issueby,
        req.body.itemId,
        req.body.qty,
        exid_from_parms
    ];
    
  
      if (!req.body.fromBid || !req.body.issuedate || !req.body.tobid || !req.body.ReciveDate || !req.body.issueby || !req.body.itemId || !req.body.qty) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updatebex(data);

      
  
      if(result.affectedRows<=0){

        console.log(result);
        res.status(200).send({ message: "CAN'T UPDATE RECORD NOT FOUND!"});

      }else if(result.affectedRows > 0){

        console.log(result.affectedRows>=0);
        res.status(200).send({ message: "Record Updated!"});

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from BRANCH_EX--------------(WORKING)
router.delete('/deletebex/:exid', async (req, res) => {


  try {
    const exid =req.params.exid ;

    const result = await User.deletebex(exid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send({message:"CAN'T FIND RECORD TO DELETE!"});

    }else if(result){

      console.log(result);
      res.status(200).send({message:"RECORD DELETED!"});

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});














//-------------------------------ISSUE FOR SALE TABLE----------

//----------------------------retrive data from ISSUE FOR SALE---------------------------


router.get('/getiid/:iid',authenticateToken, async (req, res) => {


  try {
    const iid =req.params.iid;
    //console.log(itm_id);

    const result = await User.getiid(iid);
    
    console.log(result);
    if(result.length <= 0){

      response = {

        status:404,
        message:"Cant Find ID"
      }

      console.log(result);


      res.status(200).send(response);

    }else if(result.length > 0){



      response = {

        status:200,
        message:"User Exist",
        result:result
      }

      console.log(result);
      res.status(200).send(response);

    }else{

      console.error("ERROR WHILE LOADING");
      res.status(500).send('ERROR WHILE LOADING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


//----------------------------save new ISSUE FOR SALE --------------------(WORKING)
router.post('/addiid',authenticateToken, async (req, res) => {

   

    try {
      const data = [
        req.body.iid,
        req.body.ibranch,
        req.body.iby,
        req.body.idate,
        req.body.ito,
        req.body.iRNIC,
        req.body.itemid,
        req.body.iqty
        
      ];


      //before add check the user alredy in db
      const userexist = await User.getiid(req.body.iid);
      console.log(userexist);

      if((userexist.length>0)){

        const resData = {
          status:403,
          message:"Alredy exist!"
        }
        console.log(resData);
        res.status(200).send(resData);
      }else{ 

        const result = await User.addiid(data);
        
        if(result){

          const resData = {
            status:200,
            message:"Record Added!"
          }
  
          //console.log(result);
          res.status(200).send(resData);
  
        }else{
  
          console.error("Error while adding store");
          res.status(500).send('Error while adding store');
  
        }


       }
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  
  
  });


//----------------------------update ISSUE FOR SALE --------------------(WORKING)
router.put('/updateiid/:iid',authenticateToken, async (req, res) => {


  const iid_from_parms = req.params.iid;
  try {
      

    const data = [
        req.body.iid,
        req.body.ibranch,
        req.body.iby,
        req.body.idate,
        req.body.ito,
        req.body.iRNIC,
        req.body.itemid,
        req.body.iqty,
        iid_from_parms
    ];
  
      if (!req.body.iid || !req.body.ibranch || !req.body.iby || !req.body.idate || !req.body.ito || !req.body.itemid || !req.body.iqty) {
        return res.status(400).json({ message: 'PLEASE FILL THE ALL THE FIELDS!' });
      }
  
      const result = await User.updateiid(data);

      
  
      if(result.affectedRows<=0){

        const resData = {
          status:403,
          message:"Record Not Found!"
        }

        console.log(result);
        res.status(200).send(resData);

      }else if(result.affectedRows > 0){


        const resData = {
          status:200,
          message:"Record Updated!"
        }

        console.log(result.affectedRows>0);
        res.status(200).send(resData);

      }else{

        console.error("Error while adding store");
        res.status(500).send('Error while adding store');

      }

    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });


//-----------------------------delete a record from ISSUE FOR SALE--------------(WORKING)
router.delete('/deleteiid/:iid',authenticateToken, async (req, res) => {


  try {
    const iid =req.params.iid ;

    const result = await User.deleteiid(iid);
    

    if(result.affectedRows<=0){

      console.log(result);
      res.status(200).send({message:"CAN'T FIND RECORD TO DELETE!"});

    }else if(result){

      console.log(result);
      res.status(200).send({message:"RECORD DELETED!"});

    }else{

      console.error("ERROR WHILE DELETING");
      res.status(500).send('ERROR WHILE DELETING');

    }

  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }



});


module.exports = router;
