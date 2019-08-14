const { getResponseObject } = require('../../helpers/supporter');
const {
    getUserDetails, updateUser,
} = require('./authSupporter');
const { generateOtp } = require('../../helpers/otpClient');

module.exports.resendOtpParams = () => [
    { type: 'string', value: 'mobile_number' },
];


module.exports.resendOtp = async (req, res, next) => {
    const response = getResponseObject();
    const { db } = req.headers;

    const requestData = req.query;
    const mobileNumber = requestData.mobile_number;

    const userDetails = await getUserDetails(db, mobileNumber);

    const otpToken = `${userDetails.userId}-${userDetails.lastLogin}`;
    const otp = generateOtp(otpToken);
    await updateUser(db, mobileNumber, otp);

    return res.status(200).json(response);
};
