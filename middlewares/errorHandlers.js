module.exports = fn => (request, response, next) => fn(request, response, next)
    .catch((e) => {
        if (e.response) {
            e.status = e.response.status;
        }
        return next(e);
    });
