const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;