import React from "react";
import styles from "./ButtonMicrophone.module.css";

export default function ButtonMicrophone({ onClick, isRecording }) {
  return (
    <div>
      <button
        type="button"
        className={`${styles.mic} ${isRecording ? styles.listening : ""} lg:hover:bg-foundation-3`}
        onClick={onClick}
      >
        <img src="img/icons/microphone.svg" className="p-2 lg:p-3" />
      </button>
    </div>
  );
}
