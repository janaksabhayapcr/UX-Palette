import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import LoasTable from './partials/LoasTable';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import AddDocumentModal from '../partials/AddDocumentModal';

const Loas = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <PageHeader title="LoAs" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              LoAs
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
                  <LoasTable user={user} services={services} crmData={crmData} />
                </Col>
                <Col xxl={6}></Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <AddDocumentModal
        title="LoAs - Upload Document"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        onSave={() => {
          setIsOpenModal(false);
        }}
      >
        <Table bordered className="modal--table">
          <tbody>
            <tr>
              <td>
                <>
                  <span className="d-block mb-1 text-capitalize">Upload Document</span>
                  <p className="mb-0 text-capitalize">Browse to the document you intend to upload. </p>
                </>
              </td>
              <td>
                <span className="d-block mb-1 text-capitalize">name :</span>
                <div className="px-2">
                  <input type="file" className="mb-2" />
                  <label className="d-flex align-items-center gap-2">
                    <input type="checkbox" checked/>
                    Overwrite existing files
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </AddDocumentModal>
    </>
  );
};

export default Loas;
