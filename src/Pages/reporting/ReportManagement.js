import React, { useMemo, useState } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeTreeView from '../../Components/UI/ThemeTreeView';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ReportManagement = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const treeViewData = useMemo(() => {
    let items = [
      {
        metadata: { value: 'Shared Composites' },
        name: 'Shared Composites',
        children: [
          {
            metadata: { value: 'test' },
            name: 'test',
          },
        ],
      },
    ];

    const addDynamicContent = (items) => {
      return items.map((item) => {
        let children = null;
        if (item.children) {
          children = addDynamicContent(item.children);
        }
        return {
          ...item,
          ...(children && {
            children: children,
          }),
          metadata: {
            ...item.metadata,
            render: ({ element, isBranch, isExpanded }) => (
              <>
                {isBranch ? isExpanded ? <RemoveCircleOutlineIcon sx={{ fontSize: '18px' }} /> : <AddCircleOutlineIcon sx={{ fontSize: '18px' }} /> : ''}
                {isBranch && <FolderIcon sx={{ fontSize: '18px' }} />}
                <span
                  className={`d-block text-capitalize ${selectedItem == element.metadata.value ? 'fw-bold' : ''}`}
                  onClick={() => {
                    if (false == isBranch) {
                      setSelectedItem(element.metadata.value);
                    }
                  }}
                >
                  {element.name}
                </span>
              </>
            ),
          },
        };
      });
    };

    return addDynamicContent(items);
  }, [selectedItem]);
  return (
    <>
      <PageHeader title="Report Management" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Report Management
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xxl={6}>
                  <ThemeTreeView items={treeViewData} onClickItem={(item) => {}} />
                </Col>
                <Col xxl={6}>
                  <ThemeTreeView items={treeViewData} onClickItem={(item) => {}} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ReportManagement;
