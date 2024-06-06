import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import OtherDocumentsTable from './partials/OtherDocumentsTable';
import AddDocumentModal from '../partials/AddDocumentModal';

const OtherDocuments = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <PageHeader title="Other Documents" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              Other Documents
              <ThemeButton
                size="sm"
                className="d-flex align-items-center text-capitalize global--add-btn border-0"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                <FontAwesome className="fa fa-plus me-2 d-block" />
                add document
              </ThemeButton>
            </Card.Header>
            <Card.Body as="div">
              <Row>
                <Col xxl={6}>
                  <OtherDocumentsTable user={user} services={services} crmData={crmData} />
                </Col>
                <Col xxl={6}></Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <AddDocumentModal
        title="Documents - Upload Document"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        onSave={() => {
          setIsOpenModal(false);
        }}
      >
        <Table bordered className="modal--table ">
          <tbody>
            <tr>
              <td>
                <div>
                  <span className="d-block mb-1 text-capitalize">Upload Document</span>
                  <p className="mb-0 text-capitalize">Browse to the document you intend to upload. </p>
                </div>
              </td>
              <td>
                <span className="d-block mb-1 text-capitalize">name :</span>
                <div className="px-2">
                  <input type="file" className="mb-2" />
                  <label className="d-flex align-items-center gap-2">
                    <input type="checkbox" checked/>
                    Add as a new version to existing files
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span className="d-block mb-1 text-capitalize">Version Comments :</span>
                  <p className="mb-0 text-capitalize">Type comments describing what has changed in this version.</p>
                </div>
              </td>
              <td>
                <span className="d-block mb-1 text-capitalize">Version Comments:</span>
                <div className="px-2">
                  <textarea className="w-100" />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </AddDocumentModal>
    </>
  );
};

export default OtherDocuments;
