import React from 'react';
import ThemeButton from '../../UI/Button';
import FontAwesome from 'react-fontawesome';

const MultiSelectTransferList = () => {
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="card--wrapper">
        <span className="text-capitalize d-block mb-2">Available Reports</span>
      </div>
      <div>
        <ThemeButton size="sm" className="d-block mb-2">
          <FontAwesome className="fa-solid fa-arrow-left p-0" />
        </ThemeButton>
        <ThemeButton size="sm" className="d-block">
          <FontAwesome className="fa-solid fa-arrow-right p-0" />
        </ThemeButton>
      </div>
      <div className="card--wrapper">
        <span className="text-capitalize d-block mb-2">Selected Reports</span>
      </div>
      <div>
        <ThemeButton size="sm" className="d-block mb-2">
          <FontAwesome className="fa-solid fa-arrow-up" />
        </ThemeButton>
        <ThemeButton size="sm" className="d-block">
          <FontAwesome className="fa-solid fa-arrow-down" />
        </ThemeButton>
      </div>
    </div>
  );
};

export default MultiSelectTransferList;
