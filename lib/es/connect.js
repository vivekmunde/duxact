import connectDispatch from './connect-dispatch';
import connectState from './connect-state';
import isUndefinedOrNull from './is-undefined-or-null';
var connect = function (mapStateToProps, mapDispatchToProps, areEqual) {
    return function (Component) {
        if (isUndefinedOrNull(mapStateToProps)) {
            return connectDispatch(mapDispatchToProps)(Component);
        }
        if (isUndefinedOrNull(mapDispatchToProps)) {
            return connectState(mapStateToProps, areEqual)(Component);
        }
        return connectState(mapStateToProps, areEqual)(connectDispatch(mapDispatchToProps)(Component));
    };
};
export default connect;
//# sourceMappingURL=connect.js.map