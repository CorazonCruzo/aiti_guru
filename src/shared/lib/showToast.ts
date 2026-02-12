import toast from "react-hot-toast";

export const showToast = (type: "success" | "error", message: string): void => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
    }
};
