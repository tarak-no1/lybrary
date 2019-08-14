const { getResponseObject } = require('../../helpers/supporter');

module.exports.getProfile = async (req, res, next) => {
    const response = getResponseObject();
    return res.status(200).json(response);
};
