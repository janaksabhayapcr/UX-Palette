import React from 'react';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../Components/UI/TextInput';

const TaxEntityField = () => {
  return (
    <div className="content--wrapper">
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">
          House: <span className="requiered--star">*</span>
        </label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">
          taxable entity: <span className="requiered--star">*</span>
        </label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Tax Id::</label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">
          Type: <span className="requiered--star">*</span>
        </label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">
          Status: <span className="requiered--star">*</span>
        </label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Tax Rates:</label>
        <div className="d-flex align-items-center gap-2">
          <span className="d-block short--terms">(for 15% please enter .15) Short Term:</span>
          <input type="text" className="w-25" />
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Long Term:</label>
        <TextInput type="text" className="w-25" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Foreign Address:</label>
        <input type="checkbox" className="d-block" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Address :</label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-baseline gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">
          Address: <span className="requiered--star">*</span>
        </label>
        <div className="w-50">
          <TextInput type="text" className="w-100 d-block mb-2" />
          <TextInput type="text" className="w-100 d-block" />
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-flex align-items-center justify-content-end w-50 text-capitalize position-relative">
          City/Province/Region: <span className="required--dot"></span>
        </label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-flex align-items-center justify-content-end w-50 text-capitalize position-relative">
          State : <span className="required--dot"></span>
        </label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-flex align-items-center justify-content-end w-50 text-capitalize position-relative">
          Postal Code: <span className="required--dot"></span>
        </label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">Country/Territory :</label>
        <ReactSelect className="w-50" options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-flex align-items-center justify-content-end w-50 text-capitalize position-relative">
          Primary Phone: <span className="required--dot"></span>
        </label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Secondary Phone:</label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Fax:</label>
        <TextInput type="text" className="w-50" />
      </div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="d-block w-50 text-capitalize">Email:</label>
        <TextInput type="email" className="w-50" />
      </div>
      <div>
        <span className="d-block notes--content">Noted fields are required for Signers and Source Contacts to generate LOAs.</span>
      </div>

      
    </div>
  );
};

export default TaxEntityField;
