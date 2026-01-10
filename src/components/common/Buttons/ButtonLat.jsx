import React from "react";

export default function ButtonLat({ action, imgURL, imgAlt }) {
  return (
    <div>
      <button
        onClick={action}
        className="bg-black lg:hover:bg-foundation-3 rounded-full bg-opacity-50 lg:w-10 lg:h-10 w-8 h-8 rounded-full flex items-center"
      >
        <img src={imgURL} alt={imgAlt} className="p-2 lg:p-3" />
      </button>
    </div>
  );
}