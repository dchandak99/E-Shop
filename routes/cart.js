const path = require('path');
const express = require('express');

const cartCon = require('../controllers/cart');

const router = express.Router();


router.get('/',cartCon.get_test);
router.post('/',cartCon.post_test);



module.exports = router;
