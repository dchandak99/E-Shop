const pool= require('../utils/database');
module.exports = class Prod{

    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    add_prod(){
        return pool.query('INSERT INTO products(title, price, image, quantity) VALUES ($1, $2, $3, $4);', [this.title, this.price, this.image, this.quantity]);
    }
    static get_all(){
        return pool.query('SELECT * FROM products');

    }

    static get_info(item_id){
        return pool.query('SELECT title, price, image, quantity FROM products where id = $1;', [item_id]);

    }

    static reduce_quantity(item_id){
        return pool.query('UPDATE products set quantity = quantity -1 where id = $1;', [item_id]);
    }
    // take prod_id, quantity -- 
};