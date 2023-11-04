const db = require('../configs/supabase')

const getAllCinemas = (query) => {
    return new Promise((resolve, reject) => {
        let sql = `select c.id, c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id `;
        if(query.cityId !== undefined) {
            sql += `where c.city_id='${query.cityId}' `
        }
        if(query.cinemasBrandId !== undefined) {
            query.cityId ? sql += `and c.cinemas_brand_id='${query.cinemasBrandId}' ` :
            sql += `where c.cinemas_brand_id='${query.cinemasBrandId}' `
        }
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const getSingleCinemas = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id where c.id=$1`;
        db.query(sql, [params.id], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};


module.exports = {
    getAllCinemas,
    getSingleCinemas,
}