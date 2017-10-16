let sendResponse = function (res, status, obj) {
    return res.status(status).jsonp(obj);
};

let successResponse = function (res, obj) {
    return res.status(200).jsonp(obj);
};

let errorResponse = function (res, status, obj) {
    return res.status(status).jsonp(obj);
};

module.exports = {
    sendResponse    : sendResponse,
    successResponse : successResponse,
    errorResponse   : errorResponse
}
