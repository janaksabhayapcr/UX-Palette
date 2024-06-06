import React from 'react'
import PageHeader from '../../Components/Common/PageHeader'
import { Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import ThemeButton from '../../Components/UI/Button'
import { Link } from 'react-router-dom'
import ReactSelect from '../../Components/UI/ReactSelect'
import { pageRoutes } from '../../configs'

const SiteSearch = () => {
    return (
        <>
            <PageHeader title="Site Search Results" />

            <Row>
                <Col xxl={1}>
                    <ul className="ps-0 mb-0 text-start list-inline site--search--sidebar">
                        <li className="mb-3">
                            <Link to="#" className="d-block mb-2 text-capitalize active-link">
                                No refinements available
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col xxl={11}>
                    <div className='d-flex gap-2 justify-content-end align-items-end'>
                        <div className='all-documents-select'>
                            <ReactSelect options={[{ label: 'This Site: Palette Platform', value: 'This Site: Palette Platform' }]} />
                        </div>
                        <Link to={pageRoutes.new_alert} className="p-0 d-flex align-items-center text-decoration-none rounded justify-content-center new-alert-icon ">
                            <FontAwesome className="fa-solid fa fa-bell" />
                        </Link>
                        <Link to={pageRoutes.new_alert} className="p-0 d-flex align-items-center  text-decoration-none rounded justify-content-center new-alert-icon ">
                            <FontAwesome className="fa-solid fa fa-rss" />
                        </Link>
                    </div>
                    <div className='mt-3 text-start site--search'>
                        <p className='mb-2'>We did not find any results for <span className='fw-bold'>account</span>.</p>
                        <h4>Suggestions:</h4>
                        <ul>
                            <li>Ensure words are spelled correctly.</li>
                            <li>Try using synonyms or related searches.</li>
                            <li>Try broadening your search by searching from a different site.</li>
                            <li>Try removing search refinements or using more general keywords.</li>
                        </ul>
                        <h4>Additional resources:</h4>
                        <ul>
                            <li>Get additional search tips by visiting Search Help</li>
                            <li>If you cannot find a page that you know exists, contact your administrator.</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default SiteSearch

