const pool= require('../utils/database');
module.exports = class Cart{

    constructor(user_id, item_id, quantity){
        
        this.user_id = user_id;
        this.item_id = item_id;
       // this.quantity = quantity; 
    }

    // add_prod(){
    //     return pool.query('INSERT INTO products(user_id, item_id, quantity) VALUES ($1, $2, $3, $4);', [this.title, this.price, this.image, this.quantity]);
    // }
    add_to_cart(){
        //return pool.query('INSERT INTO cart(user_id, item_id, 1) VALUES ($1, $2);', [this.user_id, this.item_id]);
        
        pool
            .query('SELECT quantity FROM cart WHERE user_id = $1 and item_id = $2;', [this.user_id, this.item_id])
            .then((value) => {
                if(value.rows.length == 0){
                    pool.query('INSERT INTO cart(user_id, item_id, quantity) VALUES ($1, $2, $3);', [this.user_id, this.item_id, 1]);
                }else{
                    pool.query('UPDATE cart SET quantity = $3 WHERE user_id = $1 and item_id = $2;', [this.user_id, this.item_id, value.rows[0]["quantity"]+1]);
                }
            })
            .catch(err => console.log(err));
        
        console.log("HI");
        return Promise.resolve(0);
    
    
    }
    static get_all(){
        return  pool.query('SELECT user_id, item_id, title, image, price, cart.quantity as qty FROM cart, products where cart.item_id = products.id;');
    }
    inc_quantity(){
        return pool.query('UPDATE cart set quantity = quantity + 1 where item_id = $2 and user_id = $1;', [this.user_id, this.item_id]);
    }
    static get_cred(){
        return pool.query('SELECT credit FROM users where users.user_id = 1;');
    }

    static delete_all(){
        return pool.query('DELETE FROM cart;');
    }

};