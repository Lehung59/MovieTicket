const supabase = require("../configs/supabase");



const getMetaMovies = (query) => {

  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_movies from movies m left join show s on s.movies_id = m.id `;
    let endpoint = `/movies?`;
    if (query.show && query.show === "now") {
      sql += `where date_trunc('month', s.showdate) = date_trunc('month', current_date) `;
      endpoint += `show=${query.show}&`;
    }
    if (query.show && query.show !== "now") {
      let showDate = query.show.split("-");
      sql += `where date_part('month', s.showdate)=${showDate[1]} and date_part('year', s.showdate)=${showDate[0]} `;
      endpoint += `show=${query.show}&`;
    }
    if (query.category !== undefined) {
      query.category && query.show
        ? (sql += `and lower(category) like lower('%${query.category}%') `)
        : (sql += `where lower(category) like lower('%${query.category}%') `);
      endpoint += `category=${query.category}&`;
    }
    if (query.search !== undefined) {
      query.search && query.show
        ? (sql += `and lower(title) like lower('%${query.search}%') `)
        : query.search && query.category
        ? (sql += `and lower(title) like lower('%${query.search}%') `)
        : (sql += `where lower(title) like lower('%${query.search}%') `);
      endpoint += `search=${query.search}&`;
    }
    if (query.sort !== undefined) {
      endpoint += `sort=${query.sort}&`;
    }
    if (query.show !== undefined) {
      endpoint += `show=${query.show}&`;
    }
    supabase.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      const totalMovies = Number(result.rows[0].total_movies);
      const page = Number(query.page || 1);
      const dataLimit = Number(query.limit);
      let totalPage = 1;
      if (query.limit !== undefined) {
        endpoint += `limit=${query.limit}&`;
        totalPage = Math.ceil(totalMovies / dataLimit);
      }

      let prev = `${endpoint}page=${page - 1}`;
      let next = `${endpoint}page=${page + 1}`;
      if (page === 1) {
        prev = null;
      }
      if (page === totalPage) {
        next = null;
      }
      const meta = {
        totalMovies,
        totalPage,
        page,
        prev,
        next,
      };
      resolve(meta);
    });
  });
};

const getSingleMovies = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `select * from movies where id = $1`;
    supabase.query(sql, [params.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const editMovies = (data, params) => {
  return new Promise((resolve, reject) => {
    const dataAvail = [];
    if (data.title != null) {
      dataAvail.push("title=");
    }
    if (data.image != null) {
      dataAvail.push("image=");
    }
    if (data.category != null) {
      dataAvail.push("category=");
    }
    if (data.releaseDate != null) {
      dataAvail.push("release_date=");
    }
    if (data.duration != null) {
      dataAvail.push("duration=");
    }
    if (data.director != null) {
      dataAvail.push("director=");
    }
    if (data.casts != null) {
      dataAvail.push("casts=");
    }
    if (data.synopsis != null) {
      dataAvail.push("synopsis=");
    }
    const dataQuery = dataAvail.map((data, i) => `${data}$${i + 1}`).join(`, `);
    const rawValues = [
      data.title,
      data.image,
      data.category,
      data.releaseDate,
      data.duration,
      data.director,
      data.casts,
      data.synopsis,
      params.id,
    ];
    const values = rawValues.filter((d) => d);
    let sql = `update show set ${dataQuery} where id=$${values.length} RETURNING *`;
    supabase.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteMovies = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `delete from movies where id=$1`;
    supabase.query(sql, [params.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateMoviesImage = (client, req, fileLink) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE movies SET ";
    let values = [];
    let i = 1;
    const body = req.body;
    if (body.password) {
      delete body.password;
    }
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }
    if (req.file) {
      sqlQuery += `image = '${fileLink}', `;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);
    console.log(sqlQuery);
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {

  getSingleMovies,
  getMetaMovies,
};
