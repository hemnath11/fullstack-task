const { body } = require('express-validator')
exports.validate = (method) => {
    console.log(method);
switch (method) {
    case 'createUser': {
     return [ 
        body('userName', `userName doesn't exists`).exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }
  }
}