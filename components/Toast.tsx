// components/Toast.tsx
import { useEffect, memo } from "react";

type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

const Toast = memo(({ message, show, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
        {message}
      </div>
    </div>
  );
});

export default Toast;
