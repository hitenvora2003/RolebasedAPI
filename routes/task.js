var express = require('express');
var router = express.Router();

const uc = require('../controller/task')
const mw = require('../middleware/auth')

/* GET users listing. */
router.get('/',mw.authcheck,uc.pageview);
router.post('/createdata',uc.createdata );
router.delete('/:deleteid',mw.authcheck,mw.issuperAdmin,uc.deletedata );
router.patch('/:updateid',mw.authcheck,mw.issuperAdmin,uc.updatedata);



module.exports = router;