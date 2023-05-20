export const removeUndefinedField = (params: object) => {
    Object.keys(params).forEach(key => {
        if (typeof params[key] === 'undefined') {
            delete params[key];
        }
    });
    return params;
};

export const convertPayloadToQueryString = (payload: object = {}) => {
    return Object.keys(payload).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
    }).join('&');
};
