import { useCallback, useState } from "react";
import { AppThunk, useAppDispatch } from "../redux";
import { errorModalActions } from "../components/error-modal";

interface IOptions<T> {
    thunkCreator: (args: T) => AppThunk,
    titleError?: string
}

export enum ResultsThunkExecute {
    success,
    error
}

export function useThunk<T> (options: IOptions<T>): [(args: T) => Promise<ResultsThunkExecute>, boolean] {
    const [isLoading, setIsLoading] = useState(true);
    
    const dispatch = useAppDispatch();

    const asyncHandlerMemo = useCallback(async (args: T) => {
        setIsLoading(true);
        try {
            await dispatch(options.thunkCreator(args));
            return ResultsThunkExecute.success;
        }
        catch(e) {
            dispatch(errorModalActions.showError({ 
                title: options.titleError ?? '',
                message: e.message
            }));
            return ResultsThunkExecute.error;
        }
        finally {
            setIsLoading(false);
        }
    }, [options.thunkCreator, dispatch]);

    return [asyncHandlerMemo, isLoading];
}