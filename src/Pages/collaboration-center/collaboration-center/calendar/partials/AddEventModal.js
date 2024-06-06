import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import { Link } from 'react-router-dom';
import ThemeTimePicker from '../../../../../Components/UI/ThemeTimePicker';
import FontAwesome from 'react-fontawesome';
import { pageRoutes } from '../../../../../configs';
import AlertMe from './AlertMe';
import moment from 'moment';

const modalStyle = {
  content: {
    width: '45%',
  },
};

const AddEventModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit , date }) => {
  const [activeTab, setActiveTab] = useState('view')
  const [showSection, setShowSection] = useState('daily')
  const [isAlert, setIsAlert] = useState(false);
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Modal
        title="Calendar - New Item"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-end gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
              save
            </ThemeButton>
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onClose}>
              cancel
            </ThemeButton>
          </div>
        }
      >
        {!isEdit &&
          <>
            <div className="modal--tab--box d-flex justify-content-between">
              <div className='d-flex align-items-center gap-2'>
                <div className={`d-block text-capitalize text-decoration-none modal--tab--item ${activeTab == 'view' && 'active--box'}`} onClick={() => setActiveTab('view')}>
                  View
                </div>
                <div className={`d-block text-capitalize text-decoration-none modal--tab--item ${activeTab == 'commands' && 'active--box'}`} onClick={() => setActiveTab('commands')}>
                  Custom Commands
                </div>
              </div>
            </div>
            <div className='modal--tab--box-table'>
              <Table borderless className="mb-0">
                <tbody>
                  {
                    activeTab == 'view' ? <tr>
                      <td className='col-6'>
                        <div className='d-flex align-items-end'>
                          <div className='px-2 text-center cursor-pointer edit-action' onClick={() => setIsEdit(true)}>
                            <FontAwesome className="fa-solid fa fs-4 fa-pencil "></FontAwesome>
                            <div>
                              <span className="d-block mb-1 text-capitalize">Edit Item</span>
                            </div>
                          </div>
                          <div className='px-2'>
                            <ul className='action-ul list-unstyled mb-0'>
                              <li className='d-flex align-items-center disabled-link'> <FontAwesome className="fa-solid fa me-2 fa-eye"></FontAwesome>  <span className="d-block mb-1 text-capitalize">  version history</span></li>
                              <li className='d-flex align-items-center'> <Link to={pageRoutes.manage_permissions} className="text-decoration-none text-black d-flex align-items-center"><FontAwesome className="fa-solid fa me-2 fa-users"></FontAwesome> <span className="d-block mb-1 text-capitalize"> manage permission </span></Link></li>
                              <li className='d-flex align-items-center'> <FontAwesome className="fa-solid fa me-2 fa-trash"></FontAwesome> <span className="d-block mb-1 text-capitalize"> delete item </span></li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td className='cursor-pointer text-capitalize' onClick={() => { setIsAlert(true); onClose() }}>
                        <FontAwesome className="fa-solid text-warning fa fa-bell"></FontAwesome> alert me
                      </td>
                    </tr>
                      :
                      <tr>
                        <td className='col-3'>
                          <div className='text-center cursor-pointer edit-action'>
                            <FontAwesome className="fa-solid fa-square fs-2"></FontAwesome>
                            <div>
                              <i class=""></i>
                              <span className="d-block mb-1 text-capitalize">export contact</span>
                            </div>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                  }
                </tbody>
              </Table>
            </div>
          </>
        }
        <Table bordered className="modal--table mb-0">
          <tbody>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Title {isEdit && <span className='text-danger'>*</span>}  </span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span> Ut eos dolorem ducimus sit et sit Nam sed cu</span>
                    :
                    <input type="text" name="" id="" className='w-100' />
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Location</span>
              </td>
              <td>
                <td>
                  {
                    !isEdit ?
                      <span> Ut eos dolorem ducimus sit et sit Nam sed cu</span>
                      :
                      <input type="text" name="" id="" className='w-100' />
                  }
                </td>
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Start time {isEdit && <span className='text-danger'>*</span>}  </span>
              </td>
              <td>
                <td>
                  {
                    !isEdit ?
                      <span> 5/2/2024 6:00 AM</span>
                      :
                      <div className='d-flex'>
                        <div className='me-1 w-50'>
                          <ThemeDatePicker value={moment(date)} />
                        </div>
                        <div className='ms-1 w-50'>
                          <ThemeTimePicker value="02:00" /></div>
                      </div>
                  }
                </td>

              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">End time </span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span> 5/2/2024 8:00 AM</span>
                    :
                    <div className='d-flex'>
                      <div className='me-1 w-50'>
                        <ThemeDatePicker value={moment(date)} />
                      </div>
                      <div className='ms-1 w-50'>
                        <ThemeTimePicker value="03:00" /></div>
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Description</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span> at dolorem ducimus sit et </span>
                    :
                    <textarea name="" id="" className='w-100 mb-1'></textarea>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Category</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span> at sit et </span>
                    :
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <input type="radio" name="category" id="" checked/>
                        <ReactSelect className="w-50" />
                      </div>
                      <div>
                        <div><input type="radio" name="category" id="own" className='me-2' /><label htmlFor="own"> Specify your own value:</label></div>
                        <div><input type="text" className="mb-2" /></div>
                      </div>
                    </div>
                }


              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">All Day Event</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span> </span>
                    :
                    <div className="px-2">
                      <label className="d-flex align-items-baseline gap-2">
                        <input type="checkbox" />
                        Make this an all-day activity that doesn't start or end at a specific hour.
                      </label>
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Recurrence</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <span>  </span>
                    :
                    <div className="px-2">
                      <label className="d-flex align-items-baseline gap-2">
                        <input type="checkbox" onChange={() => setChecked(!checked)} />
                        Make this a repeating event.
                      </label>
                    </div>
                }

                {
                  checked &&
                  <div className='px-2 d-flex'>
                    <div className='col-2'>
                      <div>
                        <input type="radio" name="recurrence" id="daily" className='me-2 text-capitalize' onChange={() => setShowSection('daily')} checked={showSection == 'daily'} /><label htmlFor="daily"> daily</label>
                      </div>
                      <div>
                        <input type="radio" name="recurrence" id="weekly" className='me-2 text-capitalize' onChange={() => setShowSection('weekly')} /><label htmlFor="weekly"> weekly</label>
                      </div>
                      <div>
                        <input type="radio" name="recurrence" id="monthly" className='me-2 text-capitalize' onChange={() => setShowSection('monthly')} /><label htmlFor="monthly"> monthly</label>
                      </div>
                      <div>
                        <input type="radio" name="recurrence" id="yearly" className='me-2 text-capitalize' onChange={() => setShowSection('yearly')} /><label htmlFor="yearly"> yearly</label>
                      </div>
                    </div>
                    <div className='col-10'>
                      <span>Pattern</span>
                      {showSection == 'daily' &&
                        <div>
                          <div><input type="radio" name="dai" id="Every" className='me-2 text-capitalize' /><label htmlFor="Every"> Every  <input type="text" className='modal--small--input' /> Day(s)</label></div>
                          <div><input type="radio" name="dai" id="weekday" className='me-2 text-capitalize' /><label htmlFor="weekday "> Every weekday</label></div>
                        </div>
                      }

                      {showSection == 'weekly' &&
                        <div>
                          <div>
                            <label> Recur every  <input type="text" className='modal--small--input' /> week(s) on:</label>
                          </div>
                          <div className='d-flex flex-wrap'>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              sunday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              monday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              Tuesday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              Wednesday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              Thursday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              Friday
                            </label>
                            <label className="d-flex align-items-baseline gap-2 text-capitalize me-2">
                              <input type="checkbox" />
                              Saturday
                            </label>
                          </div>
                        </div>
                      }

                      {showSection == 'monthly' &&
                        <div>
                          <div className='d-flex'><input type="radio" name="month" id="dayMonth" className='me-2' /><label htmlFor="dayMonth" className='d-flex'> Day  <input type="text" className='modal--small--input' /> of every <input type="text" className='modal--small--input' /> month(s)</label></div>
                          <div className='d-flex'><input type="radio" name="month" id="dayEvery" className='me-2' /><label htmlFor="dayEvery" className='d-flex'> The <ReactSelect className="modal--small--select" />  <ReactSelect className="modal--small--select" /> of every  <input type="text" className='modal--small--input' /> month(s)</label></div>
                        </div>
                      }

                      {showSection == 'yearly' &&
                        <div>
                          <div className='d-flex'><input type="radio" name="year" id="dayyear" className='me-2' /><label htmlFor="dayyear" className='d-flex'> Every <ReactSelect className="modal--small--select" /> <input type="text" className='modal--small--input' /> </label></div>
                          <div className='d-flex'><input type="radio" name="year" id="theYear" className='me-2' /><label htmlFor="theYear" className='d-flex'> The <ReactSelect className="modal--small--select" />  <ReactSelect className="modal--small--select" /> of  <ReactSelect className="modal--small--select" /></label></div>
                        </div>
                      }
                      <div className='mt-2'>
                        <span className='text-capitalize'>date range</span>
                        <div className='d-flex'>
                          <div className='col-6'>
                            <span>start date </span>
                            <ThemeDatePicker />
                          </div>
                          <div className='col-6 ms-2'>
                            <div><input type="radio" name="endDate" id="noEnd" className='me-2' /><label htmlFor="noEnd">No end date </label></div>
                            <div><input type="radio" name="endDate" id="endAfter" className='me-2' /><label htmlFor="endAfter"> end after:  <input type="text" className='modal--small--input' /> occurrence(s)</label></div>
                            <div><input type="radio" name="endDate" id="endBy" className='me-2' /><label htmlFor="endBy "> End by:</label>
                              <ThemeDatePicker />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </td>
            </tr>

          </tbody>
        </Table>

        {!isEdit &&
          <div className='modal--footer--content'>
            <div className='mt-2'><span>Content Type: Event</span></div>
            <div><span>Created at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
            <div><span>Last modified at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
          </div>
        }
      </Modal>
      <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
    </>
  );
};

export default AddEventModal;
