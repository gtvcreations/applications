export const isBoolean = (data: any) => {
    return (typeof data === "boolean");
};

export const isNumber = (data: any) => {
    return (typeof data === "number" && !isNaN(data));
};

export const isString  = (data: any) => {
    return (typeof data === "string");
};

export const isArray = (data: any) => {
    return (data instanceof Array);
};

export const isObject = (data: any) => {
    return (data && typeof data === "object" && !(data instanceof Array));
};

export const getValidNumber = (data: any) => {
    let number = null;
    let ignoreData = ['', undefined, null, NaN];

    if(!ignoreData.includes(data) && !isArray(data)) {
        number = isNaN(data) ? null : Number(data);
    }

    return number;
};