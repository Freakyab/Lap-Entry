import React from "react";
import PropTypes from "prop-types";

function InputBox({
  placeholder, type, value, setValue, actionType, isDisabled,
}) {
  return (
    <div className="w-full my-2">
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => {
          // eslint-disable-next-line no-unused-expressions
          actionType !== undefined
            ? setValue({
              type: actionType,
              payload: e.target.value,
            }) : setValue(e.target.value);
        }}
        className="text-base p-2 rounded-md w-full  focus:ring-2 focus:ring-tertiary focus:outline-none placeholder-black placeholder:text-base placeholder:font-bold disabled:cursor-not-allowed"
        placeholder={placeholder}
        disabled={isDisabled || false}
      />
    </div>
  );
}

export default InputBox;

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
