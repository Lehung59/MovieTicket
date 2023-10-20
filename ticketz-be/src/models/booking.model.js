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

const createReservation = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `insert into cinemas(cinemas_brand_id, city_id, address) 
        values ($1, $2, $3) returning *`;
    const values = [data.cinemasBrandId, data.cityId, data.address];
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const updateSeatOrderStatus = (params, data) => {
  return new Promise((resolve, reject) => {
    console.log(data.address);
    const dataAvail = [];
    if (data.cinemasBrandId != null) {
      dataAvail.push("cinemas_brand_id=");
    }
    if (data.cityId != null) {
      dataAvail.push("city_id=");
    }
    if (data.address != null) {
      dataAvail.push("address=");
    }

    const dataQuery = dataAvail.map((data, i) => `${data}$${i + 1}`).join(`, `);
    const rawValues = [
      data.cinemasBrandId,
      data.cityId,
      data.address,
      params.id,
    ];
    const values = rawValues.filter((d) => d);
    let sql = `update cinemas set ${dataQuery} where id=$${values.length} RETURNING *`;
    db.query(sql, values, (err, result) => {
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
