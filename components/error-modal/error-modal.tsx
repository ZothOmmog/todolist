import { Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux";
import { errorModalActions, errorModalSelectors } from "./error-modal-slice";

export const ErrorModal: React.FC = () => {
    const { title, message } = useSelector(errorModalSelectors.error);
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (title && message) {
            Modal.error({
                title,
                content: message,
                onCancel() {
                    dispatch(errorModalActions.closeError());
                },
                onOk() {
                    dispatch(errorModalActions.closeError());
                }
            })
        }
    }, [title, message]);

    return null;
}