import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<CombinedState> = useSelector;

export default useTypedSelector;
