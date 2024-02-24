const db = require('../util/database');
const bcrypt = require('bcryptjs');



function findalredy_A_user (nic) {
  //return db.query('SELECT * FROM users WHERE NIC = ?', [nic]);


  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE NIC = ?';
    const values = [nic]; // Replace with your actual data
  
    db.query(sql, nic, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  
}

//--------------------------------insert data to the users table------------------(WORKING)
function  insertData(data) {


  try {
    


    const password = data.password;

    
      
      console.log(data);
      return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (UID,PASSWORD,EMAIL,NIC) VALUES (?, ?, ?, ?)';
     
        db.query(sql, [data.uid ,data.password, data.email, data.nic], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    



  // bcrypt.hash(password, 10, (err, hash) => {
  // if (err) {
  //   console.error('Error hashing password:', err);
  //   connection.end();
  //   return;
  // }




  //-------------------------------query for insert for user table findalredy_A_user
  
 




    
  } catch (error) {

    throw error;

  }

  

}

function adduser(data){

  


      console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users ( UID , PASSWORD, EMAIL, NIC ) VALUES (?, ?, ?, ?)';
    const values = [data.uid,
                     data.password, 
                     data.email, 
                     data.nic,
                     ]; // Replace with your actual data

    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });


    }
 
  
    

    
  
  
  
  

  

  





//---------------------------------check the exsisting users------------------------(WORKING)
 function logincheck (data) {

return new Promise((resolve, reject) => {
  const sql = 'SELECT PASSWORD,NIC FROM users WHERE NIC = ?';
  const values = [data]; // Replace with your actual data

  db.query(sql, values, (error, results) => {
    if (error) {
      reject(error);
    } else {
      resolve(results);
    }
  });
});
  
  }








//---------------------------------this function adding data to STOCK table---------(WORKING)
function addforstock(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO stock ( ITEM_ID, ITEM_NAME,GRD, MFD, EXP,QTY,UNIT_PRICE,UNIT_COST, B_ID) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [data.itm_id,
                     data.itm_name,
                     data.grd, 
                     data.mfd, 
                     data.exp,
                     data.qty,
                     data.unit_price,
                     data.unit_cost,
                     data.b_id]; // Replace with your actual data

    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------UPDATE STOCK-----------
function updateStock(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE stock SET ITEM_NAME = ?, GRD=? , MFD = ?, EXP = ?, QTY = ?, UNIT_PRICE = ?,UNIT_COST=?, B_ID = ? WHERE ITEM_ID = ?';
   

    db.query(sql, [data.itm_name ,data.exp,data.mfd, data.exp, data.qty, data.unit_price,data.unit_cost,data.bid, data.itm_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE record from STOCK-----------
function deleteStock(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM stock WHERE ITEM_ID = ?';

    console.log(data);
 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  

//-----------------RETRIVE from STOCK-----------
function getfromstock (itm_id) {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM stock WHERE ITEM_ID = ? ';
    const values = [itm_id]; // Replace with your actual data
  
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  

    
    }












//------------------EMPLOYEE TABLE FUNCTION---


//---------------ADD EMPLOYEES-----------------(WORKING)

function addemp(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO employee ( EMP_ID, EMP_NAME, NIC, POSITION,TITLE,ADDRESS,PHONE_ONE,PHONE_TWO) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [data.emp_id,
                     data.emp_name, 
                     data.nic, 
                     data.position,
                     data.title,
                     data.address,
                     data.phone1,
                     data.phone2]; // Replace with your actual data

    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE from EMPLOYEE-----------
function getemp(nic) {


  console.log(nic);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM employee WHERE NIC = ? ';
    const values = [nic]; // Replace with your actual data
  
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE EMPLOYEE-----------
function updateemp(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE employee SET EMP_ID = ?, EMP_NAME = ?, POSITION = ?, TITLE = ?, ADDRESS = ? , PHONE_ONE = ?, PHONE_TWO = ? WHERE NIC = ?';
    const values = [
                     data.emp_id, 
                     data.emp_name, 
                     data.position,
                     data.title,
                     data.address,
                     data.phone1,
                     data.phone2,
                     data.nic]; // Replace with your actual data

    db.query(sql, [data.emp_id ,data.emp_name, data.position, data.title, data.address, data.phone1,data.phone2,data.nic], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE record from EMPLOYEE-----------
function deleteemp(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM employee WHERE NIC = ?';

    console.log(data);
 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  










//------------------BRANCH TABLE FUNCTION---


//---------------ADD branches-----------------()
function addbranch(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO branches ( B_ID, B_NAME, B_TELEPHONE, B_ADDRESS) VALUES (?, ?, ?, ?)';
    const values = [data.bid,
                     data.bname, 
                     data.tp,
                     data.address]; // Replace with your actual data

    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE BRANCHES-----------
function getbranch(bid) {


  console.log(bid);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM branches WHERE B_ID = ? ';
    const values = [bid]; // Replace with your actual data
  
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE BRANCHES-----------
function updatebranch(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE branches SET B_ID = ?, B_NAME = ?, B_TELEPHONE = ?, B_ADDRESS = ? WHERE B_ID = ?';
    const values = [
                    data.bid,
                    data.bname, 
                    data.tp,
                    data.address,
                    data.bid_from_req_parm]; // Replace with your actual data

    db.query(sql,values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE BRANCHES-----------
function deletebranch(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM branches WHERE B_ID = ?';

    //console.log(data);
 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  









//------------------STRORE LIST TABLE FUNCTION---


//---------------ADD STRORE LIST-----------------(WORKING)
function addstr(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO store_list ( STORE_ID, NAME, ADDRESS, REG_DATE,TELEPHONE_NO_ONE,TELEPHONE_NO_TWO) VALUES (?, ?, ?, ?, ?, ?)';
 
    db.query(sql, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE STRORE LIST-----------(WORKING)
function getstr(bid) {


  
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM store_list WHERE STORE_ID  = ? ';
    //const values = [bid]; // Replace with your actual data
  
    db.query(sql, [bid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE STRORE LIST-----------(WORKING)
function updatestr(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE store_list SET STORE_ID  = ?, NAME = ?, ADDRESS = ?, REG_DATE = ?, TELEPHONE_NO_ONE = ?, TELEPHONE_NO_TWO = ? WHERE STORE_ID = ?';
  

    db.query(sql,data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE STRORE LIST-----------(WORKING)
function deletestr(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM store_list WHERE STORE_ID = ?';

 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  











//------------------SALES TABLE FUNCTION---


//getALL RECORD
function getsalesALL() {


  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM sales';
    //const values = [bid]; // Replace with your actual data
  
    db.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }





//---------------ADD SALES-----------------(WORKING)
function addsales(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO sales ( INVOICE_ID, DATE, ITEM_ID,UNIT_PRICE, QTY,TOTAL,NIC,STORE_ID ) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
 
    db.query(sql, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE SALES-----------(WORKING)
function getsales(inid) {


  console.log(inid);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM sales WHERE INVOICE_ID  = ? ';
    //const values = [bid]; // Replace with your actual data
  
    db.query(sql, [inid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE SALES-----------(WORKING)
function updatesales(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE sales SET INVOICE_ID = ?, DATE = ?, ITEM_ID = ?, UNIT_PRICE =?, QTY = ?, 	TOTAL = ?, NIC = ?, STORE_ID = ? WHERE INVOICE_ID = ?';
  

    db.query(sql,data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE SALES-----------(WORKING)
function deletesales(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM sales WHERE INVOICE_ID  = ?';

 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  















//---------------------------------------------------------PAYMENT FUNCTION--------------

//---------------ADD PAYEMENT-----------------(WORKING)
function addpayments(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO payments ( STORE_ID, OUTSTAND_TOTAL, PAYMENT_RECIVE) VALUES (?, ?, ?)';
 
    db.query(sql, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE PAYEMENT-----------(WORKING)
function getpayments(sid) {


  console.log(sid);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM payments WHERE STORE_ID  = ? ';
    //const values = [bid]; // Replace with your actual data
  
    db.query(sql, [sid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE PAYEMENT-----------(WORKING)
function updatepayments(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE payments SET STORE_ID   = ?, OUTSTAND_TOTAL = ?, PAYMENT_RECIVE = ? WHERE STORE_ID = ?';
  

    db.query(sql,data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE PAYEMENT-----------(WORKING)
function deletepayments(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM payments WHERE STORE_ID  = ?';

 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  
















//ISSUE FOR SALE
//---------------------------------------------------------ISSUE FOR SALE FUNCTION--------------

//---------------ADD ISSUE FOR SALE-----------------(WORKING)
function addiid(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO issue_for_sale ( ISSUE_ID , ISSUED_BRANCH, ISSUED_BY,ISSUED_DATE,ISSUE_TO ,REP_NIC,	ISSUED_ITEM_ID, ISSUED_QTY) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
 
    db.query(sql, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE ISSUE FOR SALE-----------(WORKING)
function getiid(sid) {


  console.log(sid);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM issue_for_sale WHERE ISSUE_ID  = ? ';
    
  
    db.query(sql, [sid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE PAYEMENT-----------(WORKING)
function updateiid(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE issue_for_sale SET ISSUE_ID   = ?, ISSUED_BRANCH = ?, ISSUED_BY = ? ,ISSUED_DATE   = ?, ISSUE_TO = ?, REP_NIC = ?, ISSUED_ITEM_ID = ?, ISSUED_QTY = ? WHERE ISSUE_ID = ?';
  

    db.query(sql,data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE PAYEMENT-----------(WORKING)
function deleteiid(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM issue_for_sale WHERE ISSUE_ID  = ?';

 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  












//BRANCH_EX

//---------------------------------------------------------ISSUE FOR SALE FUNCTION--------------

//---------------ADD ISSUE FOR SALE-----------------(WORKING)
function addbex(data){

  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO branch_ex ( EX_ID , FROM_B_ID , ISSUED_DATE, TO_B_ID , RECEIVED_DATE ,	ISSUED_BY, ITEM_ID , QTY) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
 
    db.query(sql, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------RETRIVE branch_ex-----------(WORKING)
function getbex(exid) {



  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM branch_ex WHERE EX_ID = ? ';
    
  
    db.query(sql, exid, (error, results) => {
      if (error) {
        reject(error);
      } else {
        //  console.log(results);
        resolve(results);
      }
    });
  });
  

    
    }
 
//-----------------UPDATE branch_ex-----------(WORKING)
function updatebex(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE branch_ex SET EX_ID   = ?, FROM_B_ID = ?, ISSUED_DATE = ? ,TO_B_ID   = ?, RECEIVED_DATE = ?, 	ISSUED_BY = ?, ITEM_ID = ?, QTY = ? WHERE EX_ID = ?';
  

    db.query(sql,data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

//-----------------DELETE branch_ex-----------(WORKING)
function deletebex(data){

  
  console.log(data);
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM branch_ex WHERE EX_ID  = ?';

 
    db.query(sql, [data], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}  













//----------------------------------get from USER table
  function retrieve (data) {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE EMAIL = ? ';
      const values = [data.email]; // Replace with your actual data
    
      db.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    
  
      
      }

module.exports = {
  findalredy_A_user,
  insertData,
  retrieve,
  logincheck,

  addforstock,
  updateStock,
  deleteStock,
  getfromstock,

  addemp,
  getemp,
  updateemp,
  deleteemp,

  addbranch,
  getbranch,
  updatebranch,
  deletebranch,

  addstr,
  getstr,
  updatestr,
  deletestr,

  addsales,
  getsales,
  updatesales,
  deletesales,

  addpayments,
  getpayments,
  updatepayments,
  deletepayments,


  addiid,
  getiid,
  updateiid,
  deleteiid,

  addbex,
  getbex,
  updatebex,
  deletebex,

  findalredy_A_user,
  adduser,


  getsalesALL,
};

