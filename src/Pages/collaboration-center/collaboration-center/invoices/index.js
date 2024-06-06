import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import { AuthContext } from '../../../../Components/ContainerBody/ContainerBody';
import { pageRoutes } from '../../../../configs';
import AddDocumentModal from './partials/AddDocumentModal';
import ThemeButton from '../../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import InvoicesTable from './partials/InvoiceTable';
import LibrariesSidebar from '../partials/LibrariesSidebar';

const Invoices = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <PageHeader title="Invoices" />
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <div className='d-flex align-items-center justify-content-end mb-2 gap-2 '>
                        <div className='all-documents-select'>
                            <ReactSelect options={[{}]} className='w-100' />
                        </div>

                        <ThemeButton size="sm" className="d-flex align-items-center text-capitalize global--add-btn border-0" onClick={() => setIsOpenModal(true)}>
                            <FontAwesome className="fa fa-plus me-2 d-block" />
                            add document
                        </ThemeButton>
                    </div>

                    <div>
                        <InvoicesTable />
                    </div>
                </Col>
            </Row>
            <AddDocumentModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} />
        </>
    );
};

export default Invoices;
