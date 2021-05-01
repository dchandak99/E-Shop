// const Prod = require('../models/prod');
const Cart = require('../models/cart');
const User = require('../models/user');
const Orders = require('../models/orders')


exports.get_test = (req,res,next) => {

    Orders
        .get_all()
        .then((value) => {
            res.render('orders', {
                pageTitle: 'Orders',
                path: '/orders',
                editing: false,
                orders: value.rows
            });
        })
        .catch(err => console.log(err));

    
};

exports.post_test = (req,res,next) => {

    var user_id = 1;

    Cart
        .get_all()
        .then((value) => {
            const carts = value.rows;
            var cartAmount = 0;
            for (i = 0; i < carts.length; i++) { 
                cartAmount += (carts[i]["qty"] * carts[i]["price"]); 
            }
            
            //var siz = carts.length;

            if(carts.length == 0)
                res.redirect('/cart');
            else
            {
            const user = new User(user_id);
            user
                .get_creds()
                .then((credits) => {

                    if(cartAmount > credits.rows[0].credit){
                        res.redirect('/cart');
                        console.log("k");
                    }
                    else
                    {
                        user
                        .reduce_creds(cartAmount)
                        .then(() => {

                        for (i = 0; i < carts.length; i++) { 
                            const order = new Orders(user_id, carts[i]["item_id"], carts[i]["qty"]);
                            order
                            .add_to_orders()
                            .then(() => {
                                    setTimeout(function(){ res.redirect('/orders'); }, 3000);
                           // res.redirect('/orders');
                        })
                        .catch(err => console.log(err));
                }
                Cart.delete_all();
            })
            .catch(err => console.log(err));

                    }  
                })
                .catch(err => console.log(err));
        }
        })
        .catch(err => console.log(err));
};