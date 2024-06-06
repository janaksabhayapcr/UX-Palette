import React, { useMemo } from 'react'
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../../../Components/UI/Button';
import ThemeTable from '../../../Components/UI/ThemeTable';
import { Row, Col, Card } from 'react-bootstrap';
import { singleHeaderExcelFile } from '../../../Components/Utils/ExcelService';

export default function UniversalTable({
    title, isExportCsv, exportFileName, exportConfig, data, columns
}) {

    const newExportConfig = useMemo(() => {
        if (!exportConfig) {
            return columns.map((column) => {
                let value = null;
                if (column.hasOwnProperty('renderExport')) {
                    if (typeof column.renderExport == 'string') {
                        value = column.renderExport;
                    }
                }
                return {
                    label: column.Header,
                    value: column.accessor,
                }
            })
        }
    }, [exportConfig, data, columns])

    const downloadCSV = () => {
        singleHeaderExcelFile(data, exportFileName, exportConfig);
    };

    return (
        <>
            <Card className="client--view-card">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                    {title}
                    {isExportCsv && (
                        <ThemeButton
                            size="sm"
                            className="ms-auto d-block border-0 global--download-btn"
                            onClick={() => {
                                downloadCSV();
                            }}
                        >
                            <FontAwesome className="fa fa-download d-block" />
                        </ThemeButton>
                    )}
                </Card.Header>
                <Card.Body as="div" className="aumby--client-table">
                    <Row>
                        <Col xxl={12}>
                            <div className="client-inner">
                                <ThemeTable data={data} columns={columns} />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
