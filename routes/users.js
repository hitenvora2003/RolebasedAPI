var express = require('express');
var router = express.Router();

const uc = require('../controller/user')
const mw = require('../middleware/auth')

/* GET users listing. */
router.get('/',mw.authcheck,uc.pageview,);
router.post('/createdata',uc.createdata );
router.delete('/:deleteid',mw.authcheck,mw.issuperAdmin,uc.deletedata );

router.post('/login', uc.login);


module.exports = router;
