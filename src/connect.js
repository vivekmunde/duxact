import isUndefinedOrNull from './is-undefined-or-null';
import connectState from './connect-state';
import connectDispatch from './connect-dispatch';

const connect = (mapStateToProps, mapDispatchToProps) =>
    Component => {
        if (isUndefinedOrNull(mapStateToProps)) {
            return connectDispatch(mapDispatchToProps)(Component);
        }

        if (isUndefinedOrNull(mapDispatchToProps)) {
            return connectState(mapStateToProps)(Component);
        }

        return connectState(mapStateToProps)(connectDispatch(mapDispatchToProps)(Component));
    };

export default connect;