const path = require('path');
const express = require('express');

const prodsCon = require('../controllers/prods');

const router = express.Router();


router.get('/',prodsCon.get_test);
router.post('/',prodsCon.post_test);



module.exports = router;
