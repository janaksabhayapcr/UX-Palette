import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import AddDocumentModal from './partials/AddDocumentModal';
import ReactSelect from '../../../Components/UI/ReactSelect';
import AddNewItemModal from './partials/AddNewItemModal';
import AddTaskNewItemModal from './partials/AddTaskNewItemModal';
import AccountStatusTable from './partials/AccountStatusTable';
import UpdatesTable from './partials/UpdatesTable';
import OpenIssuesTable from './partials/OpenIssuesTable';
import ActiveTasksTable from './partials/ActiveTasksTable';
import LetterAuthorizationStatusTable from './partials/LetterAuthorizationStatusTable';
import useMainState from '../../../hooks/useMainState';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import { pageRoutes } from '../../../configs';
import LibrariesSidebar from './partials/LibrariesSidebar';

const CollaborationCenter = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isState, setIsState] = useState({
    isOpenDocument: false,
    isOpenNewItem: false,
    isOpenTaskNewItem: false,
  });
  const [state, changeState] = useMainState({
    isOpenFilter: false,
    addNewLineItem: false,
  });
  return (
    <>
      <PageHeader title="Collaboration Center" />
      <Row>
        <Col xxl={1}>
          <LibrariesSidebar />
        </Col>
        <Col xxl={11}>
          <Row>
            <Col xxl={6}>
              <Card className="mb-3 pb-0">
                <Card.Header as="h4" className="d-flex align-items-center text-start text-capitalize filter--title mb-0">
                  updates
                  <ThemeButton
                    size="sm"
                    className="border-0 global--add-btn ms-auto d-flex align-items-center gap-2"
                    onClick={() => {
                      setIsState({
                        isOpenDocument: true,
                      });
                    }}
                  >
                    <FontAwesome className="fa fa-plus  d-block" />
                    add document
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <UpdatesTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
              <Card className="mb-3 pb-0">
                <Card.Header as="div" className="d-flex align-items-center mb-0">
                  <Link to="#!" className="d-block text-decoration-none filter--title">
                    Open Issues
                  </Link>
                  <ThemeButton
                    size="sm"
                    className="d-flex align-items-center gap-2 text-start text-capitalize global--add-btn ms-auto border-0"
                    onClick={() => {
                      setIsState({
                        isOpenNewItem: true,
                      });
                    }}
                  >
                    <FontAwesome className="fa fa-plus d-block" />
                    add new item
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <OpenIssuesTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
              <Card className="mb-3 pb-0">
                <Card.Header as="div" className="d-flex align-items-center">
                  <Link to="#!" className="d-block text-decoration-none filter--title">
                    Active Tasks
                  </Link>
                  <ThemeButton
                    size="sm"
                    className="d-flex align-items-center gap-2 text-start text-capitalize global--add-btn ms-auto border-0"
                    onClick={() => {
                      setIsState({
                        isOpenTaskNewItem: true,
                      });
                    }}
                  >
                    <FontAwesome className="fa fa-plus  d-block" />
                    add new item
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <ActiveTasksTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card className="mb-3 pb-0">
                <Card.Body as="div">
                  <h4 className="d-flex align-items-center text-start text-capitalize filter--title mb-0">
                    Client Update Form
                    <ThemeButton size="sm" className="border-0 global--add-btn ms-auto text-capitalize">
                      download client update form
                    </ThemeButton>
                  </h4>
                </Card.Body>
              </Card>
              <Card className="mb-3 pb-0">
                <Card.Body as="div">
                  <h4 className="text-start text-capitalize filter--title mb-0">View us</h4>
                  <span className="d-block text-start text-capitalize my-2">Currently viewing OffitCap9238</span>
                  <label className="d-flex align-items-center gap-2 text-capitalize">
                    firm : <ReactSelect options={[{}]} className="w-50" />
                  </label>
                  <label className="d-flex align-items-center gap-2 text-capitalize mt-2">
                    user : <ReactSelect options={[{}]} className="w-25" />
                  </label>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <ThemeButton size="sm" className="d-block text-capitalize global--add-btn border-0">
                      ok
                    </ThemeButton>
                    <ThemeButton size="sm" className="d-block text-capitalize global--add-btn border-0">
                      reset
                    </ThemeButton>
                  </div>
                </Card.Body>
              </Card>
              <Card className="mb-3 pb-0">
                <Card.Header as="h4" className="d-flex align-items-center text-start text-capitalize filter--title mb-0">
                  Account Status
                  <ThemeButton size="sm" className="glodal--mini-btn border-0 ms-auto">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <AccountStatusTable parentState={state} parentChangeState={changeState} />
                </Card.Body>
              </Card>
              <Card>
                <Card.Header as="h4" className="d-flex align-items-center text-start text-capitalize filter--title mb-0">
                  Letter of Authorization Status
                  <ThemeButton size="sm" className="glodal--mini-btn border-0 ms-auto">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <LetterAuthorizationStatusTable parentState={state} parentChangeState={changeState} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <AddDocumentModal
        isOpen={isState.isOpenDocument}
        onClose={() => {
          setIsState({
            isOpenDocument: false,
          });
        }}
        onSave={() => {
          setIsState({
            isOpenDocument: false,
          });
        }}
      />

      <AddNewItemModal
        isOpen={isState.isOpenNewItem}
        onClose={() => {
          setIsState({
            isOpenNewItem: false,
          });
        }}
        onSave={() => {
          setIsState({
            isOpenNewItem: false,
          });
        }}
      />

      <AddTaskNewItemModal
        isOpen={isState.isOpenTaskNewItem}
        onClose={() => {
          setIsState({
            isOpenTaskNewItem: false,
          });
        }}
        onSave={() => {
          setIsState({
            isOpenTaskNewItem: false,
          });
        }}
      />
    </>
  );
};

export default CollaborationCenter;
