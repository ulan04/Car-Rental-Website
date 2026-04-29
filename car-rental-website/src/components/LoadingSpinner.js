import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable loading spinner component.
 * Supports three sizes: small, medium (default), large.
 */
export default function LoadingSpinner({ size = "medium", message = "" }) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className={`spinner spinner-${size}`} aria-label="Loading" />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  message: PropTypes.string,
};

