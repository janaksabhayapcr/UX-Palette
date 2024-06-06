import React, { useContext } from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../configs';
import ReactSelect from '../../../Components/UI/ReactSelect';
import DocumentLibrariesTable from './partials/DocumentLibrariesTable';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import LibrariesSidebar from './partials/LibrariesSidebar';

const Libraries = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="All Site Content" />
      <div className="text-start mb-3">
        <h2 className="mb-0 title--wrap text-capitalize">Displays all sites, lists, and libraries in this site.</h2>
      </div>
      <Row>
        <Col xxl={1}>
          <LibrariesSidebar />
        </Col>
        <Col xxl={11}>
          <div className="tab--box d-flex align-items-center justify-content-between">
            <div className='d-flex align-items-center gap-2'>
              <Link to={pageRoutes.collabration_create} className="d-block text-capitalize text-decoration-none">
                Create
              </Link>
              <Link to={pageRoutes.collabration_workflows} className="d-block text-capitalize text-decoration-none">
                Site workflows
              </Link>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <span className="d-block">view:</span>
              <ReactSelect options={[{}]} />
            </div>
          </div>
          <div>
            <DocumentLibrariesTable />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Libraries;
