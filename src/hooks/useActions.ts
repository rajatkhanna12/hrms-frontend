import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import authSlice from "../store/login/authSlice";


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        Object.assign(
            {
                authSlice
            },
           
        ),
        dispatch,
    );
};