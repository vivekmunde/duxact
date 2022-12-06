import { TStore } from './types';
declare const createStore: <TState>(preloadedState: TState) => TStore<TState>;
export default createStore;
