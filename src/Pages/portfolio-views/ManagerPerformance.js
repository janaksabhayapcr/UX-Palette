import React from 'react'
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import { Row, Col, Card } from 'react-bootstrap';

export default function ManagerPerformance() {
    return (
        <div>
            <PageHeader title="Manager Performance" />
            <SuperHouseFilterSelection />
            <div className="text-start mt-3">
                <Row>
                    <Col xxl={6}>
                        <Card className="client--view-card">
                            <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                                Manager Performance - Trailing 3 Months
                            </Card.Header>
                            <Card.Body as="div">
                                <Row>
                                    <Col xxl={12}>
                                        <div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card className="client--view-card">
                            <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                                Select a Manager and Style
                            </Card.Header>
                            <Card.Body as="div">
                                <Row>
                                    <Col xxl={12}>
                                        <div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
