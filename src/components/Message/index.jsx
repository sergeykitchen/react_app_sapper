import React from "react";
import "./styles.scss";

export const Message = ({ shown, status, text }) => {
  return (
    <div className={`message_container ${shown ? "shown" : ""}`}>
      <p className={`message ${status}`}>{text}</p>
    </div>
  );
};
