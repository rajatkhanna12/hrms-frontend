import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthState = () => {
  const { token, userName, userRole, loading, error } = useTypedSelector(
    (state) => state.auth
  );
  return { token, userName, userRole, loading, error };
};

