# Duxact: React + Redux with Actions as the Reducers

Application state management for [React](https://reactjs.org/) inspired by the [Redux](https://redux.js.org) & [React-Redux](https://react-redux.js.org).

> [React-Redux](https://react-redux.js.org) is one of the great ways of managing application state, it has served thousands of application across the globe and has worked wonders in my projects as well. It all started as a personal experiment on thinking about, how can the boiler plate for be reduced or almost removed?  Can the switch cases in the reduers be removed? Can reducer definitions be made more simple or are they even needed? If the actions are responsible for state changes then why not the actions be responsible to do the work which reducers do? etc. I started experimenting on the implementation of these by looking at the [Redux](https://redux.js.org) & [React-Redux](https://react-redux.js.org) code. Finally I could come up with a solution, [duxact](https://github.com/vivekmunde/duxact).

`duxact` is built on its main conecpt **Action is the Reducer**. And with that, there is no need to define the Reducers separately and then combine them into one, which completely removes the need of Switch Cases in the Reducers.

**Size** Minified: 18.6kB | Minified+Gzipped: 3kB

## Installation

```
npm install --save duxact
```

## Compatibility
| React Version | Duxact Compatibility |
|--|--|
| React@16 | ^2.0.0 |
| React@15 | ^1.0.0 |

## Usage

### Defining the Store

Store holds & provides the application `state`. This `state` is the centralised application state. Use `createStore` to create the store which is to be supplied to the state provider.

In the example below the `createStore` method accepts the initial state and creates the `store`.

```
import { createStore, Provider } from 'duxact';

const store = createStore({ initial: 'state' });
```

### Providing the Store to the application

Provider makes the `store` available for all the child components inside the context. It's best to define the `<Provider/>` component at the top most level of the application hierarchy, so that the `store` is available for all of the application components responsible for managing the application `state`.

In the example below the `<Provider/>` is created at the top most level in the components hierarchy and supplied the `store`.

```
import { createStore, Provider } from 'duxact';

const store = createStore({ initial: 'state' });

const APP = () => (
  <Provider store={store}>
  ...
  </Provider>
);
```

### Consuming the State

The component has to subscribe for the state changes to consume the `state` and any changes to `state`. To subscribe to the state changes a combination of higher order component `connect` & state-to-props mapping is used. Let's name this mapping function as `mapStateToProps`. This mapping maps the `state` values as props to the consuming component so that the component can access them as component props and any changes to the `state` are reflected in the values of the props and hence the consuming component is rerendered to reflect the `state` changes. `mapStateToProps` is called every time there is a change in the `state`. The function `mapStateToProps` receives the latest state. This function then needs to return the `state` values which the consuming/subscribing component is expected to receive.

The higher order components `connect` or `connectState` are used to subscribe for the `state` changes, as props to the component by using the `mapStateToProps` mapping. `connect` or `connectState` accepts `mapStateToProps` as an argument.

In the example below the component `DarkThemeView` needs to know if the dark theme mode is ON/OFF. The `mapStateToProps` function gets the `darkTheme` value from the current state and returns it in the form of props to the `DarkThemeView`. The component `DarkThemeView` receives a prop named `darkTheme` holding the current value. `connect` accepts the `mapStateToProps` as an argument and returns a function which is expecting the component `DarkThemeView` as the argument.

```
import { connect } from 'duxact';
  
// Map the state as props to the component
// An object mapping the current value of darkTheme is returned
const mapStateToProps = (currentState) => ({
  darkTheme: currentState.darkTheme
});

// This object return from mapStateToProps is mapped as props & supplied to the component
// darkTheme is received as a porperty
const DarkThemeLabel = ({ darkTheme }) => (
  <label>
    Dark theme is {darkTheme? 'ON' : 'OFF'}
  </label>
);
  
// connect the state to component
const DarkThemeView = connect(mapStateToProps)(DarkThemeLabel);
```

#### Using `connectState` instead of `connect`

```
import { connectState } from 'duxact';
...
const DarkThemeView = connectState(mapStateToProps)(DarkThemeLabel);
```

### Dispatching Actions to update the State

`Actions` are responsible for changing the application `state`. Actions are nothing but functions supplied to the components as props, which can be called by the Components on user actions, like enable/disable dark theme by clicking on a toggle button.
The higher order component `connect` or `connectDispatch` is used along with the the actions-to-props mapping function to supply the `actions` as the props to the component. Let's name this mapping function as `mapDispatchToProps`. `mapDispatchToProps` receives an argument `dispatch`. This `dispatch` function, when called, instructs the `store` to update the `state`. The `dispatch` function expects a function as its only argument. Let's call this function as the `reducer`. The `reducer` is nothing but the state updater. The `reducer` receives the current `state` and must return the updated `state`. So when the `dispatch` is called with the `reducer` as an argument then the store executes the `reducer` function, by supplying the current state to the `reducer`, to get the updated `state`, then it stores the `state` in the `store` and publishes the updated `state` to all the components who have subscribed for the `state` changes, as explained in the **Consuming the State** section.

The higher order components `connect` or `connectDispatch` are used to supply the `actions` as props to the component by accepting the `mapDispatchToProps` mapping function as its argument.

In the example below, component `ToggleButton` expects a function named `toggleTheme` to be supplied as a property, which will be called to toggle the dark theme mode. The `state` holds the current value of `darkTheme`. `mapDispatchToProps` receives `dispatch` and returns an object defining the function `toggleTheme` which acts as the `action`. The action `toggleTheme` calls the `dispatch` function with a function as an argument, which receives the current `state` and returns the updated `state`. This updated `state` is supplied to the subscriber component `DarkThemeLabel` defined in the example above, in the **Consuming the State** section.

```
import { connect } from 'duxact';

// Map the actions as props to the component
const mapDispatchToProps = dispatch => ({
  toggleTheme: () => {
    // Reducer receives the current state and returns the updated state
    const reducer = (currentState) => ({
      darkTheme: !currentState.darkTheme
    });

    // The dispatch is called with a function which acts as the reducer
    dispatch(reducer);
  }
});

// Button receives the action toggleTheme
const ToggleButton = ({ toggleTheme }) => (
  <button
    onClick={() => {toggleTheme()}}
  >
    Toggle
  </button>
);
  
// connect the actions with store
const ThemeToggler = connect(null, mapDispatchToProps)(ToggleButton);
```

#### Using `connectDispatch` instead of `connect`

```
import { connectDispatch } from 'duxact';
...
const ThemeToggler = connectDispatch(mapDispatchToProps)(ToggleButton);
```

## Helpers

### arrayToMapStateToProps

`arrayToMapStateToProps` is a shorthand style for defining the state mapping. All the string values provided in an array to `arrayToMapStateToProps` are supplied to the component as props.
Best suitable when the state values are to be supplied to component with same names. i.e. in the example below the `darkTheme` from the `state` is supplied to the component as property with name `darkTheme`.

```
const mapStateToProps = arrayToMapStateToProps(['darkTheme']);
```
same as
```
const mapStateToProps = (currentState) => ({
  darkTheme: currentState.darkTheme
});
```

### injectDispatch

`injectDispatch` injects the `dispatch` function as a first argument in the actions.  This enables loose coupling of the actions with `mapDispatchToProps`. The actions can be defined in a separate file.

```
// toggle-theme-action.js
const toggleTheme = (dispatch, ...restArgs) => {
  const reducer = (currentState) => ({
    darkTheme: !currentState.darkTheme
  });
  dispatch(reducer);
};
export default toggleTheme;
```
```
// toggle-theme-button.js
import toggleTheme from './toggle-theme-action';

const mapDispatchToProps = injectDispatch({ toggleTheme });
export default connect(null, mapDispatchToProps)(ToggleButton);
```
same as 
```
const mapDispatchToProps = dispatch => ({
  toggleTheme: () => {
    const reducer = (currentState) => ({
      darkTheme: !currentState.darkTheme
    });
    dispatch(reducer);
  }
});

export default connect(null, mapDispatchToProps)(ToggleButton);
```

## async calls
After receiving the response from the async API, update the state using the reducer defined inside the action. No middlewares needed to handle the async actions.
In the example below, the after getting the data from API `/api/user`, `dispatch` is called with the `reducer` which updated the state. So no middleware is required here.
```
const mapDispatchToProps = dispatch => ({
  getUserDetails: (userId) => {
    fetch('/api/user',args)
    .then((resp) => resp.json())
    .then((data) => {
      const reducer = (currentState) => ({
        userDetails: data.userDetails
      });
      dispatch(reducer);
    })
    .catch((error) => {
      const errorReducer = (currentState) => ({
        userDetailsFetchError: error
      });
      dispatch(errorReducer);
    })
  }
});
```

## License

MIT