import isUserDefinedObject from './is-user-defined-object';
import isFunction from './is-function';

const injectDispatch = dispatchMapping =>
    dispatch => {
        if (!isUserDefinedObject(dispatchMapping)) {
            throw new Error('Dispatch mapping must be a user defined object.');
        }

        return Object.keys(dispatchMapping)
            .reduce((dispatchers, currentMappingKey) => {
                if (!isFunction(dispatchMapping[currentMappingKey])) {
                    throw new Error('Dispatcher must be a function.')
                }
                dispatchers[currentMappingKey] = (...args) => dispatchMapping[currentMappingKey](dispatch, ...args);
                return dispatchers;
            }, {})
    };

export default injectDispatch;