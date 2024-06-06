import React, { useState } from 'react';
const FontAwesome = require('react-fontawesome');

function Tooltip(props) {
  const [isShown, setIsShown] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleMouseEnter = () => {
    clearTimeout(delayHandler);
    setIsShown(true);
  };

  const handleMouseLeave = (event) => {
    setDelayHandler(
      setTimeout(() => {
        setIsShown(false);
      }, 1000)
    );
  };
  return (
    <div className="std-tooltip-question-wrapper">
      <FontAwesome
        name="tooltip-question-icon"
        id="std-tooltip"
        style={{ cursor: 'pointer' }}
        className={`std-tooltip-question-icon ${props.className ? props.className : props.size ? props.size : 'small'} ${props.color ? props.color : 'contrast'} fa fas ${
          props.icon ? props.icon : 'fa-question-circle'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default Tooltip;
