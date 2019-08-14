const { getResponseObject } = require('../../helpers/supporter');
const {
    getUserDetails, updateUser,
} = require('./authSupporter');

module.exports.verifyOtpParams = () => [
    { typee: 'string', value: 'mobile_number' },
    { typee: 'int', value: 'otp' },
];

module.exports.verifyOtp = async (req, res, next) => {
    const response = getResponseObject();
    const { db } = req.headers;

    const requestData = req.body;
    const mobileNumber = requestData.mobile_number;
    const otpValue = requestData.otp;

    console.log(requestData);

    const userDetails = await getUserDetails(db, mobileNumber);

    if (userDetails.otp !== parseInt(otpValue)) {
        response.status = 'error';
        response.message = 'Invalid Otp';
        return res.status(200).json(response);
    }
    response.data = {
        user_id: userDetails.userId,
        jwt_token: '',
    };
    return res.status(200).json(response);
};
