import React from 'react';
import Tooltip from '../Tooltips/Tooltip';

function Label(props) {
  return (
    <React.Fragment>
      {props.label}
      {props.tooltip && (
        <Tooltip
          {...props}
          placement={props.tooltipPlacement}
          size={props.tooltipSize}
          color={props.tooltipColor}
          localPermissions={props.localPermissions}
          services={props.services}
          user={props.user}
        />
      )}
    </React.Fragment>
  );
}

export default Label;
