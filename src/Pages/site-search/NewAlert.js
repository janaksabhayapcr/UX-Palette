import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import LibrariesSidebar from '../collaboration-center/collaboration-center/partials/LibrariesSidebar'
import FontAwesome from 'react-fontawesome'
import PageHeader from '../../Components/Common/PageHeader'
import ThemeButton from '../../Components/UI/Button'
import { Link } from 'react-router-dom'
import { pageRoutes } from '../../configs'

const NewAlert = () => {
    return (
        <>
            <PageHeader title='New Alert' />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">Use this page to create an alert notifying you when there are changes to the specified item, document, list, or library.</h2>
                <Link to={pageRoutes.my_alert} className="text-decoration-none"> <h2 className="mb-0 title--wrap text-capitalize mt-4">View my existing alerts on this site.</h2></Link>
            </div>
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <Table className='modal--table text-start mb-0'>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">Alert Title</span>
                                    <p className='mb-0 text-capitalize'>Enter the title for this alert. This is included in the subject of the notification sent for this alert.	</p>
                                </td>
                                <td>
                                    <input type="text" name="" id="" className='w-100' value="Site search: Ann Berman TaxEntity.pdf" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">Send Alerts To</span>
                                    <p className='mb-0 text-capitalize'>You can enter user names or e-mail addresses. Separate them with semicolons.</p>
                                </td>
                                <td>
                                    <span className="d-block mb-1 text-capitalize"> Users:</span>
                                    <textarea name="" id="" className='w-100' rows={3} value="Palette PCR Test"></textarea>
                                    <div className='d-flex justify-content-end'>
                                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                                            <FontAwesome className="fa fa-check d-block" />
                                        </ThemeButton>
                                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                                            <FontAwesome className="fa fa-book d-block" />
                                        </ThemeButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">Delivery Method</span>
                                    <p className='mb-0 text-capitalize'>Specify how you want the alerts delivered.</p>
                                </td>
                                <td>
                                    <span className="d-block mb-1 text-capitalize"> Send me alerts by: </span>
                                    <div>
                                        <div>
                                            <label className='me-2' htmlFor='email'>
                                                <input type="radio" name="send" id="email" className='me-2' checked /> Email
                                            </label>
                                            <span>	ithelpdesk@pcrinsights.com</span>
                                        </div>
                                        <div>
                                            <label className='me-2' htmlFor='sms'>
                                                <input type="radio" name="send" id="sms" className='me-2' />Text Message (SMS)
                                            </label>
                                            <input type="text" name="" id="" />
                                        </div>
                                        <div>
                                            <label className='me-2'>
                                                <input type="checkbox" className='me-2' /> Send URL in text message (SMS)
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">Change Type</span>
                                    <p className='mb-0 text-capitalize'>Specify the type of changes that you want to be alerted to.</p>
                                </td>
                                <td>
                                    <div>
                                        <div>
                                            <label className='me-2' htmlFor='newItem'>
                                                <input type="radio" name="changeType" id="newItem" className='me-2' checked />New items in search result
                                            </label>
                                        </div>
                                        <div>
                                            <label className='me-2' htmlFor='ExistingItems'>
                                                <input type="radio" name="changeType" id="ExistingItems" className='me-2' />Existing items are changed
                                            </label>
                                        </div>
                                        <div>
                                            <label className='me-2' htmlFor='AllChanges'>
                                                <input type="radio" name="changeType" id="AllChanges" className='me-2' />All changes
                                            </label>
                                        </div>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">When to Send Alerts </span>
                                    <p className='mb-0 text-capitalize'>Specify how frequently you want to be alerted. (mobile alert is only available for immediately send)</p>
                                </td>
                                <td>
                                    <span className="d-block mb-1 text-capitalize"> Only send me alerts when: </span>
                                    <div>
                                        <div>
                                            <label className='me-2' htmlFor='daily'>
                                                <input type="radio" name="sendMe" id="daily" className='me-2' checked />Send a daily summary

                                            </label>
                                        </div>
                                        <div>
                                            <label className='me-2' htmlFor='weekly'>
                                                <input type="radio" name="sendMe" id="weekly" className='me-2' />Send a weekly summary
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex align-items-center justify-content-end gap-2 mt-3">
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize">
                            Ok
                        </ThemeButton>
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize">
                            cancel
                        </ThemeButton>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default NewAlert
