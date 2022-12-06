declare const useSelector: <TState, TSelectedState>(selector: (state: TState) => TSelectedState, areEqual?: ((a: TSelectedState | null | undefined, b: TSelectedState | null | undefined) => boolean) | undefined) => TSelectedState;
export default useSelector;
