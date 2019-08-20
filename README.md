# Duxact: React + Redux with Actions as the Reducers

Application state management for [React]([https://reactjs.org](https://reactjs.org/)) inspired by the [Redux](https://redux.js.org) & [React-Redux](https://react-redux.js.org).

 - Action is the Reducer
 - No need to define the Reducers separately and then combine them into one
 - No more Switch Cases

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

#### Defining the Store

Store holds & provides the application `state`. This `state` is the centralised application state. Use `createStore` to create the store which is to be supplied to `<Provider/>`.

In the example below the `createStore` method accepts the initial state and creates the `store`.

```
import { createStore, Provider } from 'duxact';

const store = createStore({ initial: 'state' });
```

#### Providing the Store to the application

Provider makes the `store` available for all the components using `connect`,`connectState` & `conntectDispatch`.
It's best to define the `<Provider/>` component at the top most level of the application hierarchy, so that the `store` is available for all of the application components responsible for managing the application `state`.

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

#### Consuming the State

Use a state-to-props mapping i.e. `mapStateToProps` to subscribe to any changes in the `state`.  `mapStateToProps` is nothing but a function which receives the updated `state` object. `mapStateToProps` is called every time there is a change in the `state`. `mapStateToProps` should return a JSON object created from the `state`. This JSON object is then supplied as properties to the subscribing component.

Use `connect` or `connectState` to supply the `state` as properties to the component by using the `mapStateToProps` mapping.

In the example below the component `DarkThemeView` needs to know if the dark theme mode is ON/OFF. The `mapStateToProps` function gets the `darkTheme` value from the current state and returns it in the form of JSON object. The component `DarkThemeView` receives a prop named `darkTheme` holding the current value. `connect` accepts the `mapStateToProps` as an argument and returns a function which is expecting the component `DarkThemeView` as the argument.

```
import { connect } from 'duxact';
  
// Map the state as properties to the component
// An object mapping the current value of darkTheme is returned
const mapStateToProps = (currentState) => ({
  darkTheme: currentState.darkTheme
});

// This object return from mapStateToProps is mapped as properties & supplied to the component
// darkTheme is received as a porperty
const DarkThemeLabel = ({ darkTheme }) => (
  <label>
    Dark theme is {darkTheme? 'ON' : 'OFF'}
  </label>
);
  
// connect the state to component
const DarkThemeView = connect(mapStateToProps)(DarkThemeLabel);
```

##### Using `connectState` instead of `connect`

```
import { connectState } from 'duxact';
...
const DarkThemeView = connectState(mapStateToProps)(DarkThemeLabel);
```

#### Dispatching Actions to update the State

`Actions` are responsible for changing the application `state`. Actions are nothing but functions supplied to the components as props, which are called by the Components on user actions, like enable/disable dark theme by clicking on a toggle button.
Use the action-to-props mapping i.e. `mapDispatchToProps` function to supply the `actions` as the properties to the component. `mapDispatchToProps` receives an argument `dispatch`. This `dispatch` is a function which triggers the `store` to update the `state`. The `dispatch` function expects a function as its only argument, which is the `Reducer`. The `Reducer` is nothing but the state updater. The `Reducer` receives the current `state` and must return the updated `state`.

Use `connect` or `connectDispatch` to supply the `actions` as properties to the component by using the `mapDispatchToProps` mapping.

In the example below, component `ToggleButton` expects a function named `toggleTheme` to be supplied as a property, which will be called to toggle the dark theme mode. The `state` holds the current value of `darkTheme`. `mapDispatchToProps` receives `dispatch` and returns an object defining the function `toggleTheme` which acts as the `action`. The action `toggleTheme` calls the `dispatch` function with a function as an argument, which receives the current `state` and returns the updated `state`. This updated `state` is supplied to the subscriber component `DarkThemeLabel` defined in the example above, in the **Consuming the State** section.

```
import { connect } from 'duxact';

// Map the actions as properties to the component
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

##### Using `connectDispatch` instead of `connect`

```
import { connectDispatch } from 'duxact';
...
const ThemeToggler = connectDispatch(mapDispatchToProps)(ToggleButton);
```

## Helpers

### arrayToMapStateToProps

`arrayToMapStateToProps` is a shorthand style for defining the state mapping. All the string values provided in an array to `arrayToMapStateToProps` are supplied to the component as properties.
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

## License

MIT