
const pool= require('../utils/database');
module.exports = class Orders{

    constructor(user_id, item_id, quantity){
        this.item_id = item_id;
        this.user_id = user_id;
        this.quantity = quantity;
    }

    add_to_orders(){
        pool
            .query('SELECT quantity FROM orders WHERE user_id = $2 and item_id = $1;', [this.item_id, this.user_id])
            .then((value) => {
                if(value.rows.length == 0)
                {
                    pool.query('INSERT INTO orders(user_id, item_id, quantity) VALUES ($1, $2, $3);', [this.user_id, this.item_id, this.quantity]);
                }
                else
                {
                    pool.query('UPDATE orders SET quantity = $3 WHERE user_id = $1 and item_id = $2;', [this.user_id, this.item_id, value.rows[0]["quantity"]+this.quantity]);
                }
            })
            .catch(err => console.log(err));
        
        return Promise.resolve(0);
    }
    static get_all(){
        return pool.query('SELECT user_id, item_id, orders.quantity as qty, title, image, price FROM orders, products where id = item_id;');
    }

};