const Prod = require('../models/prod');
const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/orders')


exports.get_test = (req,res,next) => {

    //console.log("i am here");
    var carts = Cart.get_all();
    var credits = Cart.get_cred();
    //console.log(carts);

    credits.then((credits) => {
        console.log(credits.rows)
        carts.then((result) => {
            res.render('cart', {
            pageTitle: 'All Products',
            path: '/cart',
            editing: false,
            carts: result.rows,
            credits: credits.rows[0].credit
    });
})});
};

exports.post_test = (req,res,next) => {
     
        const product_id = req.body.product_id;
        const qty = req.body.quantity;
        
        if(qty <= 0){
            //console.log("Hi");
            res.redirect('/prods');
        }
        else{
        const cart_prod = new Cart(1, product_id);
        Prod.reduce_quantity(product_id);

        cart_prod
            .add_to_cart()
            .then(() => {
                //res.redirect('/cart');
                setTimeout(function(){ res.redirect('/cart'); }, 2000);
                //res.send('<script>window.location.href="http://localhost:3000/cart";</script>');
                
            })
            .catch(err => console.log(err));
        }
 };
