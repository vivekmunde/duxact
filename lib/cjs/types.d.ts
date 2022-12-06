export type TAction<TState> = (state: TState) => Partial<TState>;
export type TOnDispatch<TState> = (action: TAction<TState>) => void;
export type TListener<TState> = (state: TState) => void;
export type TOnSubscribe<TState> = (listener: TListener<TState>) => () => void;
export type TReducer<TState> = (action: TAction<TState>) => TState;
export type TStore<TState> = {
    dispatch: TOnDispatch<TState>;
    getState: () => TState;
    subscribe: TOnSubscribe<TState>;
};
export type TStoreContext<TState> = {
    duxactStore: TStore<TState>;
};
