import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react"

type Props = {
    visible: boolean;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ visible, children }) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (visible)
            dialogRef.current?.showModal();
        else
            dialogRef.current?.close();
    }, [visible]);

    const close = () => {
        dialogRef.current?.close();
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-3xl p-5 dark:bg-gray-900 dark:text-white ring-2 ring-violet-500"
        >
            <div className="w-full flex justify-end">
                <FontAwesomeIcon
                    className="p-2 cursor-pointer text-4xl"
                    onClick={close}
                    icon={faClose}
                />
            </div>
            { children }
        </dialog>
    )
};

export default Modal