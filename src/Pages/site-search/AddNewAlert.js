import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import LibrariesSidebar from '../collaboration-center/collaboration-center/partials/LibrariesSidebar'
import FontAwesome from 'react-fontawesome'
import PageHeader from '../../Components/Common/PageHeader'
import ThemeButton from '../../Components/UI/Button'
import { Link } from 'react-router-dom'
import { pageRoutes } from '../../configs'

const AddNewAlert = () => {
    return (
        <>
            <PageHeader title='New Alert' />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">Use this page to select a list or library to be alerted about. Alerts are a great way to stay updated as items are added, changed, or removed.
                    <Link to={pageRoutes.my_alert} className="text-decoration-none title--wrap"> View my existing alerts on this site.</Link> </h2>
            </div >
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <Table className='modal--table text-start mb-0 alert--modal'>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="d-block mb-1 text-capitalize">Choose a List or Document Library</span>
                                    <p className='mb-0 text-capitalize'>Select a list or document library that you want to keep track of. You may also view the contents of a list and then track one of the individual items. After creating an alert, you'll receive notification of changes.</p>
                                </td>
                                <td>
                                    <div className='d-flex align-items-start gap-2 mb-2'>
                                        <input type="radio" name="alert" id="custodian" />
                                        <label className='d-flex align-items-start gap-2 cursor-pointer' htmlFor='custodian'>
                                            <FontAwesome className="fa-solid fa fa-folder-open" />
                                            <div>
                                                <p className='mb-1 text-capitalize'> Custodian Forms </p>
                                                <Link to="#" className="text-decoration-none text-black mb-1 text-capitalize">This Document library has the templates to create Web Analytics custom reports for this site collection View this list..</Link>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='d-flex align-items-start gap-2 mb-2'>
                                        <input type="radio" name="alert" id="documents" />
                                        <label className='d-flex align-items-start gap-2 cursor-pointer' htmlFor='documents'>
                                            <FontAwesome className="fa-solid fa fa-folder-open" />
                                            <div>
                                                <p className='mb-1 text-capitalize'> Documents  </p>
                                                <Link to="#" className="text-decoration-none text-black mb-1 text-capitalize">This Document library has the templates to create Web Analytics custom reports for this site collection View this list..</Link>
                                            </div>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex align-items-center justify-content-end gap-2 mt-3">
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize">
                            Next
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

export default AddNewAlert
