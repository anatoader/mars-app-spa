import {Dispatch, SetStateAction} from "react";

export interface ContextProps {
    state: any;
    dispatch: Dispatch<SetStateAction<any>>;
}