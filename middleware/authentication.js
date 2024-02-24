
const jwt = require('jsonwebtoken');
require('dotenv').config();













//-----------------chech the token once after extraction------------------

const authenticateToken = (req, res, next) => {





  const authHeader = req.headers['authorization'];

  if (authHeader) {
    // Split the header to get the token part (e.g., "Bearer <token>")
    const token = authHeader.split(' ')[1];

    if (token) {
      // Store the token in the request object for use in your routes
      req.token = token;

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
    
        // Set the authenticated user on the request object
      
        req.user = user;
        //return res.redirect('/');
        next(); // Continue to the next middleware or route
    
      });

     
    } else {
      return res.status(401).json({ message: 'Invalid token format' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  
};

module.exports = { authenticateToken };

  
  