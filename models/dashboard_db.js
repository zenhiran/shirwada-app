const db = require('../util/database');
const bcrypt = require('bcryptjs');


//get user from user table----------------
function getUserName(nic) {
    //return db.query('SELECT * FROM users WHERE NIC = ?', [nic]);
  
  
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE NIC = ?';
      const values = [nic]; // Replace with your actual data
    
      db.query(query, nic, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    
  }






  //------------------Dashboard ---------branch_ex------table-----load----


  function loadBranchExToDash_Exchange(EX_ID) {


     var joint;

    if(EX_ID){

       joint =  `
       SELECT
    be.EX_ID,
    fromBranch.B_NAME AS FromBranchName,
    be.ISSUED_DATE,
    toBranch.B_NAME AS ToBranchName,
    be.RECEIVED_DATE,
    e.EMP_NAME AS EmployeeName,
    s.ITEM_NAME,
    be.QTY
      FROM
        branch_ex AS be
      INNER JOIN
        branches AS fromBranch ON be.FROM_B_ID = fromBranch.B_ID
      INNER JOIN
        branches AS toBranch ON be.TO_B_ID = toBranch.B_ID
      INNER JOIN
        employee AS e ON be.ISSUED_BY = e.NIC
      INNER JOIN
        stock AS s ON be.ITEM_ID = s.ITEM_ID
      WHERE
        be.EX_ID = '${EX_ID}';
      `




    }else{


       joint =  `SELECT
    be.EX_ID,
    fromBranch.B_NAME AS FromBranchName,
    be.ISSUED_DATE,
    toBranch.B_NAME AS ToBranchName,
    be.RECEIVED_DATE,
    e.EMP_NAME AS EmployeeName,
    s.ITEM_NAME,
    be.QTY
      FROM
        branch_ex AS be
      INNER JOIN
        branches AS fromBranch ON be.FROM_B_ID = fromBranch.B_ID
      INNER JOIN
        branches AS toBranch ON be.TO_B_ID = toBranch.B_ID
      INNER JOIN
        employee AS e ON be.ISSUED_BY = e.NIC
      INNER JOIN
        stock AS s ON be.ITEM_ID = s.ITEM_ID;
      `;



    }

    

    return new Promise((resolve, reject) => {
      const query = joint;
     
    
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log(results)
          resolve(results);
        }
      });
      
    });
  }




  //-------------------------Exchange Insert sub Queries--------------------


 //------------------Dashboard ---------employees------table-----load----
 function loadEmployeeToDash() {

    const joint =  `SELECT NIC, EMP_NAME
    FROM employee
    WHERE POSITION IN ('admin', 'storekeeper')`;

    return new Promise((resolve, reject) => {
      const query = joint;
     
    
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      
    });
  }

function loadBranchToDash() {

    const joint =  `SELECT B_ID,B_NAME FROM branches`;

return new Promise((resolve, reject) => {
  const query = joint;
 

  db.query(query, (error, results) => {
    if (error) {
      reject(error);
    } else {
      resolve(results);
    }
  });
  
});
  }

  function gettingItemFromStock() {

   

    return new Promise((resolve, reject) => {
      const query = `SELECT ITEM_ID,ITEM_NAME FROM stock`;
     
    
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      
    });
  }


  



    //------------------------Dashboadr sub queries for issue_for_sale TABLE--------
    function loadStoreListToDash() {

     
  
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM store_list`;
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }

    function loadSalesmens() {

  
      return new Promise((resolve, reject) => {
        const query = `SELECT NIC, EMP_NAME FROM employee WHERE POSITION = 'salesmen'`;
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }

    function getiidDataUsingJoint() {

      const joint =  `
      SELECT
      iss.ISSUE_ID,
      fromBranch.B_NAME AS BRANCH_NAME,
      e.EMP_NAME AS EMP_NAME,
      iss.ISSUED_DATE,
      stl.NAME AS STORE_NAME,
      rep.EMP_NAME AS REP_NAME,
      s.ITEM_NAME,
      iss.ISSUED_QTY
        FROM
            issue_for_sale AS iss
        INNER JOIN
            branches AS fromBranch ON iss.ISSUED_BRANCH = fromBranch.B_ID
        INNER JOIN
            store_list AS stl ON iss.ISSUE_TO = stl.STORE_ID 
        INNER JOIN
            employee AS e ON iss.ISSUED_BY = e.NIC
        INNER JOIN
            employee AS rep ON iss.REP_NIC = rep.NIC
        INNER JOIN
            stock AS s ON iss.ISSUED_ITEM_ID = s.ITEM_ID;`
  
      return new Promise((resolve, reject) => {
        const query = joint;
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }

    function acordingTo_date_how_many_ids_in_db(data) {

      const joint =  `SELECT COUNT(*) AS count FROM ${data.tableName} WHERE ${data.fieldName} LIKE '%${data.userId}%'`
  
      return new Promise((resolve, reject) => {
        const query = joint;
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }





    //---------------------------Sale Table sub queries-----------
    function loadSaleToDash(inv) {

      var query;
      if(inv){
        query = `SELECT
        s.INVOICE_ID,
        s.DATE,
        st.ITEM_NAME,
        st.UNIT_PRICE,
        s.QTY,
        s.TOTAL,
        e.EMP_NAME,
        sl.NAME
    FROM
        sales AS s
    INNER JOIN
        stock AS st
    ON
        s.ITEM_ID = st.ITEM_ID
    INNER JOIN
        employee AS e
    ON
        s.NIC = e.NIC
    INNER JOIN
        store_list AS sl
    ON
        s.STORE_ID = sl.STORE_ID
    WHERE
        s.INVOICE_ID = ${inv}`;

      }else{

        query = `SELECT
      s.INVOICE_ID,
      s.DATE,
      st.ITEM_NAME,
      st.UNIT_PRICE,
      s.QTY,
      s.TOTAL,
      e.EMP_NAME,
      sl.NAME
          FROM
              sales AS s
          INNER JOIN
              stock AS st
          ON
              s.ITEM_ID = st.ITEM_ID
          INNER JOIN
              employee AS e
          ON
              s.NIC = e.NIC
          INNER JOIN
              store_list AS sl
          ON
              s.STORE_ID = sl.STORE_ID`;
      }
      
  
      return new Promise((resolve, reject) => {
        
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }



    //---------------------------payment Table
    
    function loadpaymentToDash(inv) {

      var query;
      if(inv){
        query = `SELECT
        p.PAYMENT_ID,
        s.INVOICE_ID,
        (SELECT sl.NAME FROM store_list sl WHERE sl.STORE_ID = s.STORE_ID) AS STORE_NAME,
        p.LAST_PAYMENT_DATE,
        p.PAYMENT_METHORD,
        p.OUTSTAND_TOTAL

    FROM
        payments p
    INNER JOIN
        sales s ON p.INVOICE_ID = ${inv}`;

      }else{

        query = `SELECT
        p.PAYMENT_ID,
        s.INVOICE_ID,
        (SELECT sl.NAME FROM store_list sl WHERE sl.STORE_ID = s.STORE_ID) AS STORE_NAME,
        p.LAST_PAYMENT_DATE,
        p.PAYMENT_METHORD,
        p.OUTSTAND_TOTAL

    FROM
        payments p
    INNER JOIN
        sales s ON p.INVOICE_ID = s.INVOICE_ID
    `;
      }
      
  
      return new Promise((resolve, reject) => {
        
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }


    
    //---------------------------stock Table
    
    function loadstockToDash(stid) {

      var query;
      if(stid){
        query = `SELECT
        s.ITEM_ID,
        s.ITEM_NAME,
        s.GRD,
        s.MFD,
        s.EXP,
        s.QTY,
        s.UNIT_PRICE,
        s.UNIT_COST,
        b.B_NAME AS BRANCH_NAME
    FROM
        stock s
    JOIN
        branches b ON s.B_ID = ${stid}
    `;

      }else{

        query = `SELECT
        s.ITEM_ID,
        s.ITEM_NAME,
        s.GRD,
        s.MFD,
        s.EXP,
        s.QTY,
        s.UNIT_PRICE,
        s.UNIT_COST,
        b.B_ID,
        b.B_NAME AS BRANCH_NAME
    FROM
        stock s
    JOIN
        branches b ON s.B_ID = b.B_ID
    
    `;
      }
      
  
      return new Promise((resolve, reject) => {
        
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }


    //---------------------------store list Table
    
    function jointstoreListToDash(stid) {
debugger
      var query;
      if(stid){
        query = `SELECT * FROM store_list where STORE_ID = ${stid}`;

      }else{

        query = `SELECT * FROM store_list`;
      }
      
  
      return new Promise((resolve, reject) => {
        
       
      
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        
      });
    }


    

    
    
 





  module.exports = {
    getUserName,
    loadBranchExToDash_Exchange,

    //---Exchange Insert sub Queries---
    loadEmployeeToDash,
    loadBranchToDash,
    gettingItemFromStock,

    //------------------------Dashboadr sub queries for issue_for_sale TABLE--------
    loadStoreListToDash,
    loadSalesmens,
    getiidDataUsingJoint,
    acordingTo_date_how_many_ids_in_db,

    //--------------------sale table joins--------
    loadSaleToDash,

    //----------payments table
    loadpaymentToDash,

    //stock table
    loadstockToDash,
//store list
jointstoreListToDash,
  }