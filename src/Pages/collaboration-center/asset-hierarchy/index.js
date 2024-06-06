import React from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import { Card } from 'react-bootstrap';
import useMainState from '../../../hooks/useMainState';
import AssetHierarchyTable from './partials/AssetHierarchyTable';

const AssetHirarchy = () => {
  const [state, changeState] = useMainState({
    isOpenFilter: false,
    addNewLineItem: false,
  });
  return (
    <>
      <PageHeader title="Asset Hierarchy" />
      <Card>
        <Card.Body as="div">
          <AssetHierarchyTable parentState={state} parentChangeState={changeState} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AssetHirarchy;
