// Importing the Supabase configuration
const db = require("../configs/supabase");

// Function to retrieve user profile by ID
const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    // SQL query to select user information based on ID
    let sqlQuery = `SELECT id, email, first_name, last_name, role_id, phone, poin, image FROM users WHERE id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// Function to update user details
const updateUsers = (client, req) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE users SET ";
    let values = [];
    let i = 1;
    const body = req.body;

    // Omitting password from the update body if present
    if (body.password) {
      delete body.password;
    }

    // Constructing the SQL update query dynamically based on request body
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);

    // Executing the SQL update query
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// Function to update user profile image
const updateProfileImage = (client, req, fileLink) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE users SET ";
    let values = [];
    let i = 1;
    const body = req.body;

    // Omitting password from the update body if present
    if (body.password) {
      delete body.password;
    }

    // Constructing the SQL update query for profile image update
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }

    // Adding profile image update to the SQL query
    if (req.file) {
      sqlQuery += `image = '${fileLink}', `;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);

    // Executing the SQL update query
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// Function to delete user profile image
const deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    // SQL query to set user's image field to NULL based on ID
    let sqlQuery = `UPDATE users SET image = NULL WHERE id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// Exporting functions for use in other modules
module.exports = {
  getProfile,
  updateUsers,
  updateProfileImage,
  deleteImage,
};
