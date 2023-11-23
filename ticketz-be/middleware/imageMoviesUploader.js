const { uploaderMovies } = require('../utils/cloudinary');

const cloudUploadMovies = async (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(422).json({
            msg: req.fileValidationError
        })
    }
    const result = await uploaderMovies(req.file, "Movies", req.params.id);
    const { data, err } = result
    if (err) throw { msg: err };
    if (!data) {
        return next()
    }
    req.body.image = data.secure_url
    next()
}

module.exports = {cloudUploadMovies}