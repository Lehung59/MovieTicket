const db = require("../configs/supabase");

const getCinemaById = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `select c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id where c.id=$1`;
    db.query(sql, [params.id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getSeatByIds = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `select c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id where c.id=$1`;
    db.query(sql, [params.id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  getCinemaById,
  getSeatByIds,
  createReservation,
  updateSeatOrderStatus,
};
