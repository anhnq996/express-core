const { SuccessCodes, ErrorCodes } = require('../enums/responseCodes');
const { SuccesStatus, ErrorStatus } = require('../enums/httpStatusCode');
function formatResponse(success, code, message, data = null, errors = null, debug = null) {
  return {
    success,
    code,
    message,
    data,
    errors,
    debug: process.env.NODE_ENV === 'development' ? debug : undefined
  };
}

module.exports = {
  formatResponse,
  SuccessCodes,
  ErrorCodes,
  SuccesStatus,
  ErrorStatus
};
