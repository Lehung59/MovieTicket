const profileModel = require("../models/profile.model");
const { uploaderUsers } = require("../utils/cloudinary");
const db = require("../configs/supabase");

const handleDatabaseError = (res, error) => {
  console.log(error.message);
  res.status(500).json({
    msg: "Internal server error",
  });
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const result = await profileModel.getProfile(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "User Not Found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    handleDatabaseError(res, error);
  }
};

const updateProfile = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const resultUserBio = await profileModel.updateUsers(client, req);
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Update Success...",
      data: resultUserBio.rows,
    });
  } catch (err) {
    handleDatabaseError(res, err);
  } finally {
    client.release();
  }
};

const updateProfileImage = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    let fileLink = "";
    if (!req.file) {
      return res.status(400).json({
        msg: "Only Use Allowed Extension (JPG, PNG, JPEG, WEBP)",
        data: null,
      });
    }
    if (req.file) {
      const fileName = req.authInfo.id;
      const upCloud = await uploaderUsers(req, "user", fileName);
      fileLink = upCloud.data.secure_url;
    }
    const resultUserBio = await profileModel.updateProfileImage(
      client,
      req,
      fileLink
    );
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Update Success...",
      data: resultUserBio.rows,
    });
  } catch (err) {
    handleDatabaseError(res, err);
  } finally {
    client.release();
  }
};

const updatePoin = async (req, res) => {
  try {
    const { poin } = req.body;
    const { id } = req.authInfo;
    const getPoinDB = await profileModel.getPoin(id);
    if (getPoinDB.rows.length < 1) {
      res.status(404).json({
        data: result.rows,
        msg: "User Not Found",
      });
    }
    const poinTotal = getPoinDB.rows[0].poin + parseInt(poin);
    const result = await profileModel.updatePoin(id, poinTotal);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "User Not Found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
      msg: "Points Increased",
    });
  } catch (error) {
    handleDatabaseError(res, error);
  }
};

const deleteImage = async (req, res) => {
  const client = await db.connect();
  try {
    const { id } = req.authInfo;
    await client.query("BEGIN");
    const resultUserBio = await profileModel.deleteImage(id);
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Update Success...",
    });
  } catch (err) {
    handleDatabaseError(res, err);
  } finally {
    client.release();
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePoin,
  updateProfileImage,
  deleteImage,
};
