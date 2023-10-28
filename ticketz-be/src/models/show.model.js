const db = require("../configs/supabase");
const addShow = (body) => {
  return new Promise((resolve, reject) => {
    const sql = `insert into "show" (movies_id, cinemas_id, showdate, showtime, price) 
        values($1, $2, $3, $4, $5) returning *`;
    const values = [
      body.moviesId,
      body.cinemasId,
      body.showdate,
      body.showtime,
      body.prices,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};


module.exports = {
  addShow,
};
