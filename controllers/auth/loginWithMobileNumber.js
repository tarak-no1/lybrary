const { getResponseObject } = require('../../helpers/supporter');
const {
    getUserDetails, updateUser,
} = require('./authSupporter');
const { generateOtp } = require('../../helpers/otpClient');


module.exports.loginWithMobileNumberParams = () => [
    { type: 'string', value: 'mobile_number' },
];

module.exports.loginWithMobileNumber = async (req, res, next) => {
    const response = getResponseObject();
    const { db } = req.headers;

    const requestData = req.body;
    const mobileNumber = requestData.mobile_number;

    const userDetails = await getUserDetails(db, mobileNumber);

    const otpToken = `${userDetails.userId}-${userDetails.lastLogin}`;
    const otp = generateOtp(otpToken);

    const dataToUpdate = {
        otp,
    };
    await updateUser(db, mobileNumber, dataToUpdate);
    response.message = otp;
    response.data = {
        user_id: userDetails.userId,
    };
    return res.status(200).json(response);
};
