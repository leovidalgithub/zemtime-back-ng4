let sendResponse = (res, status, obj) => {
    return res.status(status).jsonp(obj);
};

let successResponse = (res, obj) => {
    return res.status(200).jsonp(obj);
};

let errorResponse = (res, status, obj) => {
    return res.status(status).jsonp(obj);
};

module.exports = {
    sendResponse    : sendResponse,
    successResponse : successResponse,
    errorResponse   : errorResponse
}
