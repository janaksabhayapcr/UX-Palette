import React from 'react';
import ReactSelect from '../../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../../Components/UI/TextInput';

export default function AddLineItemContainer() {
  return (
    <>
      <div className="d-flex align-items-center gap-2 addline--items mb-2">
        <label className="d-block text-nowrap text-capitalize">Line Item Name:</label>
        <ReactSelect placeholder="Select Line Item Name" defaultValue="(2) normal" options={[]} onChange={() => {}} />
      </div>
      <div className="d-flex align-items-center gap-2 addline--items mb-2">
        <label className="d-block text-nowrap text-capitalize">Asset Style:</label>
        <ReactSelect
          placeholder="Select status"
          options={[
            { label: 'Alternative Investments > Absolute Return', value: 'Alternative Investments > Absolute Return' },
            { label: 'Alternative Investments > Absolute Return - Exclude From Performance', value: 'Alternative Investments > Absolute Return - Exclude From Performance' },
            { label: 'Alternative Investments > Alternative Funds Of Funds', value: 'Alternative Investments > Alternative Funds Of Funds' },
            { label: 'Alternative Investments > Alternative Funds Of Funds - Exclude From Perf', value: 'Alternative Investments > Alternative Funds Of Funds - Exclude From Perf' },
            { label: 'Alternative Investments > Alternative Investments', value: 'Alternative Investments > Alternative Investments' },
          ]}
          onChange={() => {}}
        />
      </div>
      <div className="d-flex align-items-center gap-2 addline--items mb-2">
        <label className="d-block text-nowrap text-capitalize">Primary Index:</label>
        <TextInput type="text" className="w-100" placeholder="Primary Index" />
      </div>
      <div className="d-flex align-items-center gap-2 addline--items">
        <label className="d-block text-nowrap text-capitalize">Secondary Index:</label>
        <ReactSelect placeholder="Select Secondary Index" options={[]} onChange={() => {}} />
      </div>
    </>
  );
}
