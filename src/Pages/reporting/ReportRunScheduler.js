import React, { useContext, useMemo, useState } from 'react';
import ContextMenus, { useContextMenu } from '../../Components/UI/ContextMenus';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import useMainState from '../../hooks/useMainState';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FolderIcon from '@mui/icons-material/Folder';
import ThemeTreeView from '../../Components/UI/ThemeTreeView';
import ReportRunSchedulerTable from './partials/ReportRunSchedulerTable';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

const ReportRunScheduler = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState('');
  const [state, changeState] = useMainState({
    isOpenSplitAccount: false,
    reportItems: [
      {
        metadata: { value: 'My Reports' },
        name: 'My Reports',
        children: [
          {
            metadata: { value: 'New Report', key: 'newReport' },
            name: 'New Report',
          },
          {
            metadata: { value: 'Test', key: 'test' },
            name: 'Test',
          },
        ],
      },
    ],
  });

  const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
    callback: (selItem) => {
      setSelectedItem(selItem);
    },
  });

  const contextMenus = useMemo(() => {
    const menus = {
      newReport: [
        {
          label: 'Run Report',
          children: [
            {
              label: 'PDF',
              onClick: () => {},
            },
            {
              label: 'Excel',
              onClick: () => {},
            },
          ],
        },
      ],
      test: [
        {
          label: 'Run Report',
          children: [
            {
              label: 'PDF',
              onClick: () => {},
            },
            {
              label: 'Excel',
              onClick: () => {},
            },
          ],
        },
      ],
    };
    if (selectedItem) {
      return menus[selectedItem.metadata.key];
    } else {
      return [];
    }
  }, [selectedItem]);

  const treeViewData = useMemo(() => {
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
                {isBranch ? isExpanded ? <RemoveCircleOutlineIcon sx={{ fontSize: '16px' }} /> : <AddCircleOutlineIcon sx={{ fontSize: '16px' }} /> : ''}
                {isBranch && <FolderIcon sx={{ fontSize: '16px' }} />}
                {element.metadata.isFolder && <FolderIcon sx={{ fontSize: '16px' }} />}
                <div
                  className={`d-block inner-dropdown-item text-capitalize ${selectedItem == element.metadata.value ? '' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (false == isBranch) {
                      setSelectedItem(element.metadata.value);
                    }
                  }}
                  onContextMenu={(e) => {
                    handleContextMenu(e, element);
                  }}
                >
                  {element.name}
                </div>
              </>
            ),
          },
        };
      });
    };
    return addDynamicContent(state.reportItems);
  }, [selectedItem, state.reportItems]);

  return (
    <>
      <PageHeader title="Report Run Scheduler" />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col xxl={6}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize filter--title">
                  Report Scheduler
                </Card.Header>
                <Card.Body as="div">
                  <ThemeTreeView items={treeViewData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
                  Report Status
                  <ThemeButton size="sm" className="global--add-btn text-capitalize border-0">
                    refresh
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <div>
                    <ReportRunSchedulerTable user={user} services={services} crmData={crmData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      
      <ContextMenus menus={contextMenus} isOpnePopup={isOpenContextPopup} setIsOpenContextPopup={setIsOpenContextPopup} popupPosition={contextPopupPosition} />
    </>
  );
};

export default ReportRunScheduler;
