import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import { Col, Row } from 'react-bootstrap';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import FormTemplatesTable from './partials/FormTemplatesTable';
import ThemeButton from '../../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import LibrariesSidebar from '../partials/LibrariesSidebar';
import AddDocumentModal from './partials/AddDocumentModal';

const FormTemplates = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <>
            <PageHeader title="Customized Reports" />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">This Document library has the templates to create Web Analytics custom reports for this site collection</h2>
            </div>
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
                        <FormTemplatesTable />
                    </div>
                </Col>
            </Row>
            <AddDocumentModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} />
        </>
    );
};

export default FormTemplates;
