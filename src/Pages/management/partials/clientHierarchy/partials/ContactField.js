import React from 'react';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../Components/UI/TextInput';

const ContactField = () => {
  return (
    <>
      <div className="content--wrapper">
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            Contact Role: <span className="requiered--star">*</span>
          </label>
          <ReactSelect className="w-50" options={[{label:"Super House" , value:'Super House'}]} defaultValue={[{label:"Super House" , value:'Super House'}]}  />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            Super Household Name: <span className="requiered--star">*</span>
          </label>
          <ReactSelect className="w-50" options={[{label:"ABLA" , value:'ABLA'}]} defaultValue={[{label:"ABLA" , value:'ABLA'}]}  />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Salutation:</label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            First Name: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            Last Name: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Suffix:</label>
          <ReactSelect className="w-50" options={[{}]} />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Job Title:</label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Foreign Address:</label>
          <input type="checkbox" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            Name of Employer: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-baseline gap-3 mb-2">
          <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">
            Address: <span className="required--dot"></span>
          </label>
          <div className="w-50">
            <TextInput type="text" className="w-100 d-block mb-2" />
            <TextInput type="text" className="w-100 d-block" />
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">
            City/Province/Region: <span className="required--dot"></span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">
            State: <span className="required--dot"></span>
          </label>
          <ReactSelect className="w-50" options={[{label:"Alabama" , value:'Alabama'}]} defaultValue={[{label:"Alabama" , value:'Alabama'}]}  />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">
            Postal Code: <span className="required--dot"></span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            Country/Territory: <span className="requiered--star">*</span>
          </label>
          <ReactSelect className="w-50" options={[{label:"United State of America" , value:'United State of America'}]} defaultValue={[{label:"United State of America" , value:'United State of America'}]}  />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-flex align-items-center justify-content-end w-50 text-capitalize">
            Primary Phone: <span className="required--dot"></span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Secondary Phone: </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">fax: </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">
            email: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">mobile phone: </label>
          <TextInput type="text" className="w-50" />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label className="d-block w-50 text-capitalize">Desired Contact Method: </label>
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" />
            <span className="d-block sub--content">Email</span>
          </div>
        </div>
        <div>
          <span className="d-block notes--content">Noted fields are required for Signers and Source Contacts to generate LOAs.</span>
        </div>
      </div>
    </>
  );
};

export default ContactField;
