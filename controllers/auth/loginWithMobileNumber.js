const { getResponseObject } = require('../../helpers/supporter');

module.exports.loginWithMobileNumberParams = () => [
    { type: 'string', value: 'mobile_number' },
];

module.exports.loginWithMobileNumber = async (req, res, next) => {
    const response = getResponseObject();
    response.data.user_id = '12345';
    setTimeout(() => {
        res.status(200).json(response);
    }, 3000);
};
