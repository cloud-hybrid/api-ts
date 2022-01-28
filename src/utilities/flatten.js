/***
 *
 * @param obj {object}
 *
 * @returns {{}}
 *
 */

export const flatten = (obj) => {
    const _ = {};

    Object.keys(obj).forEach((key, index) => {
        _[key] = typeof obj[key];

        if ( typeof obj[key] === "object" && obj[key] !== null ) {
            _[key] = flatten(obj[key]);
        } else (
            obj[key] === null
        ) ? _[key] = null
            : _[key] = typeof obj[key];

    });

    return _;
};

export default flatten;