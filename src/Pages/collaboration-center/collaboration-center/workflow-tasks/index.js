import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import { Col, Row } from 'react-bootstrap';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import LibrariesSidebar from '../partials/LibrariesSidebar';
import WorkflowTasksTable from './partials/WorkflowTasksTable';
import ThemeButton from '../../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import AddBatchModal from './partials/AddWorkflowTasksModal';

const WorkflowTasks = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <PageHeader title="Workflow Tasks " />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">This system library was created by the Publishing feature to store workflow tasks that are created in this site.</h2>
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
                            add new item
                        </ThemeButton>
                    </div>
                    <div>
                        <WorkflowTasksTable />
                    </div>
                </Col>
            </Row>
            <AddBatchModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={true} />

        </>
    );
};

export default WorkflowTasks;
