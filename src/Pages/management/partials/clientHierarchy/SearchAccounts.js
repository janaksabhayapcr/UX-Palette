import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import TextInput from '../../../../Components/UI/TextInput';
import ThemeButton from '../../../../Components/UI/Button';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../configs';
import NewAccountModal from './partials/NewAccountModal';
import { AuthContext } from '../../../../Components/ContainerBody/ContainerBody';
import SearchAccountsTable from './partials/SearchAccountsTable';

const SearchAccounts = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <PageHeader title="Search Accounts" />
      <Card>
        <Card.Body as="div">
          <div className="d-flex align-items-center justify-content-start gap-2 mb-3 border-bottom">
            <Link to={pageRoutes.client_hierarchy} className="d-block border-0 global--add-btn-link text-capitalize">
              Hierarchy
            </Link>
            <Link to={pageRoutes.contacts} className="d-block border-0 global--add-btn-link text-capitalize">
              Contacts
            </Link>
            <Link to={pageRoutes.partnerships} className="d-block border-0 global--add-btn-link text-capitalize">
              Partnerships
            </Link>
          </div>
          <Row className="row-gap-3">
            <Col xxl={3}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">Super House:</span>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">House:</span>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">Tax Entity:</span>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">Custodian:</span>
                <ReactSelect options={[{label:"All" , value:'All'}]} defaultValue={[{label:"All" , value:'All'}]} />
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">Account:</span>
                <TextInput type="text" />
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-block text-nowrap text-start text-capitalize search--title">Status:</span>
                <ReactSelect options={[{label:"All" , value:'All'}]} defaultValue={[{label:"All" , value:'All'}]}  />
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2">
                <ThemeButton size="sm" className="border-0 global--btn-css d-block text-capitalize">
                  search
                </ThemeButton>
                <ThemeButton
                  size="sm"
                  className="border-0 global--btn-css d-block text-capitalize"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  new account
                </ThemeButton>
              </div>
            </Col>
            <Col xxl={12}>
              <div className="text-start search--account-table">
                <SearchAccountsTable user={user} services={services} crmData={crmData} />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <NewAccountModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSave={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default SearchAccounts;
