const arrayToMapStateToProps = arr =>
    state => {
        if (!Array.isArray(arr)) {
            throw new Error('Mapping must be an array of prop names.');
        }

        return arr.reduce((accumulator, propName) => {
            accumulator[propName] = state[propName];
            return accumulator;
        }, {});
    }

export default arrayToMapStateToProps;