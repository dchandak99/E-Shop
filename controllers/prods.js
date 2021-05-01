const Prod = require('../models/prod');
const Cart = require('../models/cart');


exports.get_test = (req,res,next) => {

    var products = Prod.get_all();
        products.then((result) => {
            res.render('prods', {
            pageTitle: 'All Products',
            path: '/prods',
            editing: false,
            products: result.rows
    });
});

};

exports.post_test = (req,res,next) => {
     
   
 };