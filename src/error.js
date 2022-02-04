const ERROR_TYPE_INVALID_PAYLOAD = "invalidPayload";
function InvalidPayload(message) {
    return {type: ERROR_TYPE_INVALID_PAYLOAD, message};
}

module.exports = {InvalidPayload};

