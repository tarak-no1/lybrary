const { getResponseObject } = require('../../helpers/supporter');

module.exports.verifyOtpParams = () => [
    { typee: 'string', value: 'mobile_number' },
    { typee: 'string', value: 'otp' },
];

module.exports.verifyOtp = async (req, res, next) => {
    const response = getResponseObject();

    const mobileNumber = req.body.mobile_number;
    const otpValue = req.body.otp;

    response.data = {
        user_id: '1234',
        jwt_token: '',
    };
    setTimeout(() => {
        res.status(200).json(response);
    }, 5000);
};
