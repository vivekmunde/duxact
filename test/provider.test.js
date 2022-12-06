import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider, StoreContext } from '../lib/cjs';

describe('<Provider />', () => {
  test('Should throw exception if the store is not defined', () => {
    expect.hasAssertions();

    const expectedError = new Error('Store is undefined.');

    expect(() => shallow(<Provider />)).toThrow(expectedError);
    expect(() => shallow(<Provider store={null} />)).toThrow(expectedError);
  });

  test('Should set store in the context', () => {
    expect.hasAssertions();

    const store = { getState: () => ({ some: 'value' }) };

    class ChildComponent extends React.Component {
      static contextType = StoreContext;

      constructor(props, context) {
        super(props);
        const { duxactStore } = context;
        this.duxactStore = duxactStore;
      }

      render() {
        return (
          <React.Fragment>{this.duxactStore.getState().some}</React.Fragment>
        );
      }
    }

    const App = () => (
      <Provider store={store}>
        <ChildComponent />
      </Provider>
    );

    const wrapper = mount(<App />);
    expect(wrapper.find(ChildComponent).text()).toEqual('value');
  });
});
