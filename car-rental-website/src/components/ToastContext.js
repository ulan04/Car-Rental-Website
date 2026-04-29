import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

/**
 * ToastProvider wraps the app and provides a global toast notification system.
 * Toasts auto-dismiss after 3 seconds or can be clicked to dismiss early.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  // Provide convenient methods for different toast types
  const success = (message) => context.addToast(message, "success");
  const error = (message) => context.addToast(message, "error");
  const info = (message) => context.addToast(message, "info");
  const warning = (message) => context.addToast(message, "warning");

  return {
    ...context,
    success,
    error,
    info,
    warning,
  };
};

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => onRemove(toast.id)}
          role="alert"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

