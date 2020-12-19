import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { InitialValues } from "./daly-table-types";

export const useNormalizeInitValues = (
    initialValues: InitialValues,
    isEdit: boolean,
    resetInitValues: () => void,
    visible: boolean
) => {
    const [initValuesNormalized, setInitValuesNormalized] = useState<InitialValues>(initialValues);

    useEffect(() => {
        if (!isEdit) {
            const { timeStart, ...other } = initialValues;
            setInitValuesNormalized({
                ...other,
                timeStart: 
                    startOfDay(new Date(initialValues.timeStart)) === startOfDay(new Date())
                    ? timeStart
                    : new Date().toUTCString()
            });
        }
        else setInitValuesNormalized(initialValues);
    }, [initialValues]);

    useEffect(() => {
        if (visible) resetInitValues();
    }, [initValuesNormalized]);

    return initValuesNormalized;
}