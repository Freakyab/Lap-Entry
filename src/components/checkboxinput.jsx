import React from "react";
import PropTypes from "prop-types";

function CheckBoxInput({
  label,
  value,
  setValue,
  actionType,
}) {
  return (
    <div className="flex mx-1">
      <input
        type="checkbox"
        value={value}
        onChange={(e) => {
          setValue({
            type: actionType,
            payload: e.target.checked,
          });
        }}
      />
      <span className="ml-2 font-semibold ">{label}</span>
    </div>
  );
}

export default CheckBoxInput;

CheckBoxInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
};
