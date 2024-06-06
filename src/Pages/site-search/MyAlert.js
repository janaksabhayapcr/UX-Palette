import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import LibrariesSidebar from '../collaboration-center/collaboration-center/partials/LibrariesSidebar'
import FontAwesome from 'react-fontawesome'
import PageHeader from '../../Components/Common/PageHeader'
import ThemeButton from '../../Components/UI/Button'
import { Link } from 'react-router-dom'
import AlertTable from './partials/AlertTable'
import { pageRoutes } from '../../configs'

const MyAlert = () => {
    return (
        <>
            <PageHeader title='My Alerts on this Site' />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">Manage the settings of all your alerts for lists, libraries, and files on this site. Note that some alerts, such as system generated task alerts, do not appear on this page.</h2>
            </div>
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <div className='d-flex align-items-center gap-2 tab--box'>
                        <Link to={pageRoutes.add_new_alert} className="d-flex align-items-center gap-2 text-start text-capitalize border-0 text-decoration-none"  >
                            <FontAwesome className="fa fa-plus d-block" /> new alert
                        </Link>
                        <ThemeButton size="sm" variant="transparent" className="d-flex align-items-center gap-2 text-start text-capitalize  border-0" >
                            <FontAwesome className="fa fa-solid fa-trash d-block" />
                            Delete Selected alerts
                        </ThemeButton>
                    </div>
                    <span className='text-start d-block my-2'>Alert Title</span>
                    <AlertTable />
                </Col>
            </Row>
        </>
    )
}

export default MyAlert