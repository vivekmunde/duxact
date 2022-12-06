var arrayToMapStateToProps = function (arr) {
    return function (state) {
        if (!Array.isArray(arr)) {
            throw new Error('Mapping must be an array of prop names.');
        }
        return arr.reduce(function (accumulator, propName) {
            accumulator[propName] = state[propName];
            return accumulator;
        }, {});
    };
};
export default arrayToMapStateToProps;
//# sourceMappingURL=array-to-map-state-to-props.js.map