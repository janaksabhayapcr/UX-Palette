import React, { useState } from 'react';
import ChangeCurrencyModal from './partials/ChangeCurrencyModal';
import { Col, Container, Row } from 'react-bootstrap';
import SearchInput from '../SearchInput';

export default function PageHeader({ title = '' }) {
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  return (
    <div className='my-3 pb-3 border-bottom'>
      <Row className="align-items-center">
        <Col xxl={6}>
          <div className="title-blocks">
            <h1 className="mb-1 text-start">{title}</h1>
            <p className="mb-0 d-flex align-items-center ">
              AGGREGATED DATA AS OF APRIL 07, 2024
              <span onClick={() => setIsCurrencyModalOpen(true)} className="d-block ms-1">
                DISPLAYED IN EUR
              </span>
            </p>
          </div>
        </Col>
        <Col xxl={6}>
          <SearchInput />
        </Col>
      </Row>

      <ChangeCurrencyModal isOpen={isCurrencyModalOpen} onClose={() => setIsCurrencyModalOpen(false)} onSave={() => {}} />
    </div>
  );
}
