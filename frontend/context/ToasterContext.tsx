import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ToasterContextType = {
  showToast: (message: string, type: "success" | "error") => void;
};

export const ToasterContext = createContext<ToasterContextType | undefined>(
  undefined,
);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};

type ProviderProps = {
  children: ReactElement;
};

export const ToasterProvider: React.FC<ProviderProps> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setIsVisible(true);
  };

  const [progress, setProgress] = useState(100);
  const duration = 5000;

  const onClose = useCallback(() => {
    if (isVisible) {
      setIsVisible(false);
      setProgress(100);
    }
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, duration / 100);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      setProgress(100);
    };
  }, [duration, onClose]);

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {isVisible ? (
        <div
          className={`absolute left-auto z-20 ${toastType === "success" ? "bg-green-500" : "bg-red-500"} text-white rounded-lg shadow-lg overflow-hidden`}
          style={{ right: "8px", top: "8px" }}
        >
          <div className="flex items-center w-full p-4">
            <div className="text-white">{toastMessage}</div>
            <button onClick={onClose} className="ml-6 text-white">
              &times;
            </button>
          </div>
          <div
            className="bg-white transition-all"
            style={{ width: `${progress}%`, height: "2px" }}
          ></div>
        </div>
      ) : null}
      {children}
    </ToasterContext.Provider>
  );
};
