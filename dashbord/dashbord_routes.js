const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

const db = require('../util/database');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { authenticateToken } = require('../middleware/authentication');

const dashboard  = require('../models/dashboard_db');


require('dotenv').config();


router.use(cookieParser());

router.use(bodyParser.json({
  limit: '50mb'                   
}));



router.get('/dashboard',authenticateToken, (req, res) => {

  res.status(200).send("dashboard get is ok!");
    //res.render('index.ejs')
  })
  
router.post('/dashboard',authenticateToken, async (req, res, next) => {
  
    try {

      const token = req.token;
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const { name_of_the_emp, userNIC } = decoded;
  
      const data = {
        EMP_NAME: name_of_the_emp,
        NIC: userNIC
      };
  
     return res.status(200).json(data); // Send the response here, and remove the duplicate send calls

    } catch (error) {
        throw error;
    }

   });

  //dash test two
  // router.post('/dashboard',authenticateToken, async (req, res, next) => {

  //       const data = {EMP_NAME:"SHAMAL"}
  //       res.status(200).send(data);

  // });
  

//--------------------------get exchange data when page loading--------------
  router.post('/exchange',authenticateToken, async (req, res, next) => {

    
  
    try {

        const token = req.token;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const { name_of_the_emp, userNIC } = decoded;
        console.log("dashboard is up " +  name_of_the_emp);
    


        //----------------------------------------getting Exchange Table Joint query---------------------------
        
        var dashExchangeTBL = await dashboard.loadBranchExToDash_Exchange();

        const issuedDateStrings = [];

      //------------------------------------Setting date format--------------
        function getformattedDate(parsedDate){
             
          return  formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;

            //console.log(formattedDate); // Output: "2023-09-28"

          }
        
        for (let i =0; i<dashExchangeTBL.length ; i++){

          const issuedDate = dashExchangeTBL[i].ISSUED_DATE;
          const reciveDate = dashExchangeTBL[i].RECEIVED_DATE;
          //const issuedDateString = issuedDate.toString();

            // Parse the date string
            const issuedt = new Date(issuedDate);
            const recivedt = new Date(reciveDate);
            

            const IssueD = getformattedDate(issuedt);
            const ResiveD = getformattedDate(recivedt);

            
          issuedDateStrings.push({ 

            EmployeeName: dashExchangeTBL[i].EmployeeName,
            EX_ID: dashExchangeTBL[i].EX_ID,
            FromBranchName:dashExchangeTBL[i].FromBranchName,
            ISSUED_DATE:IssueD,
            ITEM_NAME:dashExchangeTBL[i].ITEM_NAME,
            QTY:dashExchangeTBL[i].QTY,
            RECEIVED_DATE:ResiveD,
            ToBranchName:dashExchangeTBL[i].ToBranchName

          });

        }
        res.status(200).send(issuedDateStrings)


    } catch (error) {
        throw error;
    }


    


    
    
  });


  //--------------get echage date when editing------------------------
  router.post('/exchange/:id',authenticateToken, async (req, res, next) => {

    const EX_ID = req.params.id;
  
    try {

        const token = req.token;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const { name_of_the_emp, userNIC } = decoded;
   
        //----------------------------------------getting Exchange Table Joint query---------------------------
        
        var dashExchangeTBL = await dashboard.loadBranchExToDash_Exchange(EX_ID);

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }


    


    
    
  });
 





  //------------------get Exchange data before Insert Routes-------------------------------------
  router.post('/loadEmployeeToDash',authenticateToken, async (req, res, next) => {
  
    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.loadEmployeeToDash();

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }


    


    
    
  });

  router.post('/loadBranchToDash',authenticateToken, async (req, res, next) => {
  
    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.loadBranchToDash();

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }


    


    
    
  });

  router.post('/gettingItemFromStock',authenticateToken, async (req, res, next) => {
  
    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.gettingItemFromStock();

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }
    
  });

 








  //------------------------Dashboadr sub queries for issue_for_sale TABLE--------
  router.post('/loadStoreListToDash',authenticateToken, async (req, res, next) => {
  
    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.loadStoreListToDash();

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }


    


    
    
  });

  router.post('/loadSalesmens',authenticateToken, async (req, res, next) => {
  
    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.loadSalesmens();

        
        res.status(200).send(dashExchangeTBL)


    } catch (error) {
        throw error;
    }


    


    
    
  });

  router.get('/getalliid',authenticateToken, async (req, res, next) => {
  
    try {

      //------------------------------------------get name from token-------------
      const token = req.token;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const { name_of_the_emp, userNIC } = decoded;
        console.log("dashboard is up " +  name_of_the_emp);

        //----------------------------------------getting Exchange Table Joint query---------------------------
        var iidDataTodash = await dashboard.getiidDataUsingJoint();

        const issuedDateStrings = [];

      //------------------------------------Setting date format--------------
        function getformattedDate(parsedDate){
             
          return  formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;

            //console.log(formattedDate); // Output: "2023-09-28"

          }
        
        for (let i =0; i<iidDataTodash.length ; i++){

            const issuedDate = iidDataTodash[i].ISSUED_DATE;
      
            const issuedt = new Date(issuedDate);
    
            const IssueD = getformattedDate(issuedt);
      

            
          issuedDateStrings.push({ 

            BRANCH_NAME: iidDataTodash[i].BRANCH_NAME,
            EMP_NAME: iidDataTodash[i].EMP_NAME, 
            ISSUED_DATE:IssueD.toString(),
            ISSUED_QTY:iidDataTodash[i].ISSUED_QTY,
            ISSUE_ID:iidDataTodash[i].ISSUE_ID,
            ITEM_NAME:iidDataTodash[i].ITEM_NAME,
            REP_NAME:iidDataTodash[i].REP_NAME,
            STORE_NAME:iidDataTodash[i].STORE_NAME

          });

          

        }

        res.status(200).send(iidDataTodash);


    } catch (error) {
        throw error;
    }


    


    
    
  });

  router.post('/getaCountOfid',authenticateToken, async (req, res, next) => {
  
    try {

      //------------------------------------------get name from token-------------
      const token = req.token;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const { name_of_the_emp, userNIC } = decoded;
        console.log("dashboard is up " +  name_of_the_emp);

        const id_and_table_name = {
          tableName:req.body.tableName,
          userId:req.body.id,
          fieldName:req.body.fieldName

        }

        //----------------------------------------getting Exchange Table Joint query---------------------------.
        var first_part_of_iid = req.body.First_part_of_iid;
        var iidCount = await dashboard.acordingTo_date_how_many_ids_in_db(id_and_table_name,);

        if(iidCount.length<=0){

          const issuedDateStrings = {
            status:404,
            message:"Not Found!",
            
          };
          res.status(200).send(issuedDateStrings);

        }else{

          const issuedDateStrings = {
            status:200,
            message:"Query has Results!",
            result:iidCount
          };
          res.status(200).send(issuedDateStrings);

        }
        
      

        


    } catch (error) {
        throw error;
    }


    


    
    
  });
  


   //------------------------Dashboadr sub queries for sale TABLE--------
   router.post('/loadSaleToDash',authenticateToken, async (req, res, next) => {
  

    const inv = req.body.invid;

    try {

      
        //----------------------------------------getting Exchange Table Joint query---------------------------
        var dashExchangeTBL = await dashboard.loadSaleToDash(inv);

        if(dashExchangeTBL.length>0){

          const result = {
            status:200,
            message:"Have Record!",
            result:dashExchangeTBL
          }
  
          
          res.status(200).send(dashExchangeTBL)

        }else{

          const result = {
            status:404,
            message:"Not Found!",
            result:dashExchangeTBL
          }
  
          
          res.status(200).send(dashExchangeTBL)
        }
       


    } catch (error) {
        throw error;
    }


    


    
    
  });


    //------------------------Dashboadr sub queries for payment TABLE--------
    router.post('/loadpaymentsToDash',authenticateToken, async (req, res, next) => {
  

      const inv = req.body.invid;
  
      try {
  
        
          //----------------------------------------getting Exchange Table Joint query---------------------------
          var dashExchangeTBL = await dashboard.loadpaymentToDash(inv);
  
          if(dashExchangeTBL.length>0){
  
            const result = {
              status:200,
              message:"Have Record!",
              result:dashExchangeTBL
            }
    
            
            res.status(200).send(dashExchangeTBL)
  
          }else{
  
            const result = {
              status:404,
              message:"Not Found!",
              result:dashExchangeTBL
            }
    
            
            res.status(200).send(dashExchangeTBL)
          }
         
  
  
      } catch (error) {
          throw error;
      }
  
  
      
  
  
      
      
    });



      //------------------------Dashboadr sub queries for Stock TABLE--------
      router.post('/loadstockToDash',authenticateToken, async (req, res, next) => {
  

        const stid = req.body.stid;
    
        try {
    
          
            //----------------------------------------getting Exchange Table Joint query---------------------------
            var dashExchangeTBL = await dashboard.loadstockToDash(stid);
    
            if(dashExchangeTBL.length>0){
    
              const result = {
                status:200,
                message:"Have Record!",
                result:dashExchangeTBL
              }
      
              
              res.status(200).send(dashExchangeTBL)
    
            }else{
    
              const result = {
                status:404,
                message:"Not Found!",
                result:dashExchangeTBL
              }
      
              
              res.status(200).send(dashExchangeTBL)
            }
           
    
    
        } catch (error) {
            throw error;
        }
    
    
        
    
    
        
        
      });



            //------------------------Dashboadr sub queries for store list TABLE--------
router.post('/loadstoreListToDash',authenticateToken, async (req, res, next) => {
  
  debugger 
              const stid = req.body.stid;
          
              try {
          
               
                  //----------------------------------------getting Exchange Table Joint query---------------------------
                  var dashExchangeTBL = await dashboard.jointstoreListToDash(stid);
          
                  if(dashExchangeTBL.length>0){
          
                    const result = {
                      status:200,
                      message:"Have Record!",
                      result:dashExchangeTBL
                    }
            
                    
                    res.status(200).send(dashExchangeTBL)
          
                  }else{
          
                    const result = {
                      status:404,
                      message:"Not Found!",
                      result:dashExchangeTBL
                    }
            
                    
                    res.status(200).send(dashExchangeTBL)
                  }
                 
          
          
              } catch (error) {
                  throw error;
              }
          
          
              
          
          
              
              
});
        
  


    

  


  


  
  module.exports = router;