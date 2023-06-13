import React from "react";
import PropTypes from "prop-types";

function CheckBoxInput({ label }) {
  return (
    <div className="flex mx-1">
      <input type="checkbox" />
      <span className="ml-2 font-semibold ">{label}</span>
    </div>
  );
}

export default CheckBoxInput;

CheckBoxInput.propTypes = {
  label: PropTypes.string.isRequired,
};
