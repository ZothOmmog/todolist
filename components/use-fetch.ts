import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux";
import { errorModalActions } from "./error-modal";

export function useFetch<T> (fetch: (dispatch: AppDispatch) => Promise<void>, dataSelector: (state: RootState) => T[]) {
    const [isLoading, setIsLoading] = useState(true);
    const data = useSelector(dataSelector);

    
    const dispatch = useAppDispatch();
    const fetchMemo = useCallback((dispatch: AppDispatch) => fetch(dispatch), [dispatch]);

    useEffect(() => {
        const f = async () => {
            try {
                await fetchMemo(dispatch);
            }
            catch(e) {
                dispatch(errorModalActions.showError({ 
                    title: 'Ошибка при запросе агрегированной информации по таскам',
                    message: e.message
                }));
            }
            setIsLoading(false);
        }
        f();
    }, [dispatch, fetchMemo]);

    return { data, isLoading };
}