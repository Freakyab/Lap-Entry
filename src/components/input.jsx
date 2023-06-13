import React from "react";
import PropTypes from "prop-types";

function InputBox({ placeholder, type }) {
  return (
    <div className="w-full my-2">
      <input
        type={type || "text"}
        className="text-base p-2 rounded-md w-full  focus:ring-2 focus:ring-tertiary focus:outline-none placeholder-black placeholder:text-base placeholder:font-bold"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputBox;

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
