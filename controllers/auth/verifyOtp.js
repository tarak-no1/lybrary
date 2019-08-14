const moment = require('moment');
const { getResponseObject } = require('../../helpers/supporter');
const {
    getUserDetails, updateUser,
} = require('./authSupporter');
const {
    generateSecretKey,
    generateJwtToken,
    verifyJwtToken,
} = require('../../helpers/jwtClient');


module.exports.verifyOtpParams = () => [
    { type: 'string', value: 'mobile_number' },
    { type: 'int', value: 'otp' },
];

module.exports.verifyOtp = async (req, res, next) => {
    const response = getResponseObject();
    const { db } = req.headers;

    const requestData = req.body;
    const mobileNumber = requestData.mobile_number;
    const otpValue = requestData.otp;

    const userDetails = await getUserDetails(db, mobileNumber);

    if (userDetails.otp !== parseInt(otpValue)) {
        response.status = 'error';
        response.message = 'Invalid Otp';
        return res.status(200).json(response);
    }

    userDetails.lastLogin = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const payload = {
        id: userDetails.userId,
        jwtId: generateSecretKey(userDetails),
    };

    const jwtToken = await generateJwtToken(payload);

    const dataToUpdate = {
        otp: null,
        lastLogin: userDetails.lastLogin,
    };
    await updateUser(db, mobileNumber, dataToUpdate);

    response.data = {
        user_id: userDetails.userId,
        jwt_token: jwtToken,
    };
    return res.status(200).json(response);
};
