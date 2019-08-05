let controller = {};

controller = Object.assign(controller, require('./loginWithMobileNumber'));
controller = Object.assign(controller, require('./resendOtp'));
controller = Object.assign(controller, require('./verifyOtp'));

module.exports = controller;
