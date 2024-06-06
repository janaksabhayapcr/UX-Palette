import React from 'react'
import { Col, Row } from 'react-bootstrap';
import LibrariesSidebar from './partials/LibrariesSidebar';
import PermissionTables from './partials/permissionsTable';

const Permissions = () => {

    return (
        <div className='pt-3'>
            {/* <h4 className='text-start'>This list item inherits permissions from its parent. (contacts)  </h4> */}
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <PermissionTables />
                </Col>
            </Row>
        </div>
    );
}

export default Permissions
