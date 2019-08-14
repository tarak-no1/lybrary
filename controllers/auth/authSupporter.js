const {
    getDataCount, getSingleRow, createData, updateData,
} = require('../../database/dataModel');

const createNewUser = async (db, mobileNumber) => {
    const userData = {
        mobileNumber,
    };
    return createData(db.user, userData);
};

const getUserDetails = async (db, mobileNumber) => {
    const where = {
        mobileNumber,
    };
    const isUserExists = await getDataCount(db.user, where)
        .then(count => Promise.resolve(count > 0));
    if (!isUserExists) {
        await createNewUser(db, mobileNumber);
    }
    return getSingleRow(db.user, where);
};

const updateUser = async (db, mobileNumber, dataToUpdate) => {
    const where = {
        mobileNumber,
    };
    return updateData(db.user, where, dataToUpdate);
};

module.exports = {
    getUserDetails,
    updateUser,
};
