
const pool= require('../utils/database');
module.exports = class User{

    constructor( user_id){
        this.user_id = user_id
    }

    get_creds(){
        return pool.query('SELECT credit FROM users WHERE user_id = $1;', [this.user_id]);
    }

    reduce_creds(amount){
        return pool.query('UPDATE users SET credit = (SELECT credit FROM users WHERE user_id = $1)-$2 WHERE user_id = $1;', [this.user_id, amount]);
    }

};