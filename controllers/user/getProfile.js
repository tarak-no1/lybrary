const { getResponseObject } = require('../../helpers/supporter');

module.exports.getProfile = async (req, res, next) => {
    const response = getResponseObject();
    const { db, user } = req.headers;

    response.data = {
        user_id: user.userId,
        name: user.name,
        profile_image_url: user.profileImgUrl,
        email: user.email,
        mobile_number: user.mobileNumber,
        last_login: user.lastLogin,
    };
    return res.status(200).json(response);
};
