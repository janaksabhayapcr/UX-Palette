import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import { Col, Row } from 'react-bootstrap';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import LibrariesSidebar from '../partials/LibrariesSidebar';
import ThemeButton from '../../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import AddBatchModal from './partials/AddBatchModal';
import BatchFilesTable from './partials/BatchFilesTable';

const BatchFiles = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className='pt-2'>
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <div className='mb-2 d-flex justify-content-end'>
                        <ThemeButton size="sm" className="d-flex align-items-center text-capitalize global--add-btn border-0" onClick={() => setIsOpenModal(true)}>
                            <FontAwesome className="fa fa-plus me-2 d-block" />
                            add document
                        </ThemeButton>
                    </div>
                    <BatchFilesTable />
                </Col>
            </Row>
            <AddBatchModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} />
        </div>
    );
};

export default BatchFiles;
