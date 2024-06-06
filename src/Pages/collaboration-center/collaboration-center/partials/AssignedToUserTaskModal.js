import React, { useCallback, useMemo, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';
import SearchInput from '../../../../Components/Common/SearchInput';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import ThemeTreeView from '../../../../Components/UI/ThemeTreeView';
import { Col, Container, Row } from 'react-bootstrap';

const modalStyle = {
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    background: 'none',
    top: '25%',
    left: '33%',
    height: '5%',
    width: '50%',
  },
};

const usersList = [
  {
    name: 'All Authenticated Users',
  },
  {
    name: 'All Users (windows)',
  },
];

const AssignedToUserTaskModal = (props) => {
  const { isOpen, onClose, onSave } = props;
  const [state, setState] = useState({
    selectedDepartment: '',
  });

  const changeState = useCallback((obj) => {
    setState((prev) => ({
      ...prev,
      ...obj,
    }));
  }, []);
  const treeViewData = useMemo(() => {
    let items = [
      {
        metadata: { value: 'organizations' },
        name: 'Organizations',
      },
      {
        metadata: { value: 'all-users' },
        name: 'All Users',
      },
      {
        metadata: { value: 'pcr-user-directory' },
        name: 'PCR User Directory',
      },
      {
        metadata: { value: 'secureauth' },
        name: 'SecureAuth',
        children: [
          {
            metadata: { value: 'account-id' },
            name: 'Account ID',
          },
          {
            metadata: { value: 'role' },
            name: 'Role',
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
                {isBranch ? isExpanded ? <FontAwesome className="fa fa-caret-down" /> : <FontAwesome className="fa fa-caret-up" /> : ''}
                {false == isBranch && <FontAwesome className="fa fa-file-text" sx={{ fontSize: '18px' }} />}
                <span
                  className={`d-block text-capitalize ${state.selectedDepartment == element.metadata.value ? 'fw-bold' : ''}`}
                  onClick={() => {
                    if (false == isBranch) {
                      changeState({
                        selectedDepartment: element.metadata.value,
                      });
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
  }, [state.selectedDepartment]);
  return (
    <Modal
      title="Assigned to user"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end">
          <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0">
            Ok
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            Cancel
          </ThemeButton>
        </div>
      }
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col xxl={4}>
            <div className="d-flex align-items-center gap-2">
              <label className="fw-bold">Find</label>
              <SearchInput placeholder="Search" />{' '}
            </div>
          </Col>
          <Col xxl={3}>
            <ReactSelect
              value={'Detailed View'}
              options={[
                { label: 'List View', value: 'List View' },
                { label: 'Detailed View', value: 'Detailed View' },
              ]}
              onChange={() => {}}
            />
          </Col>
        </Row>

        <div className="tasks--tree-view mt-4">
          <Row>
            <Col xxl={4}>
              <div className="task--treeview-blocks">
                <ThemeTreeView items={treeViewData} />
              </div>
            </Col>
            <Col xxl={8}>
              {state.selectedDepartment == 'all-users' ? (
                <div className="list-users--block w-100">
                  <div className="header">
                    <span>Security Group: All Users</span>
                  </div>
                  <div className="users-list">
                    {usersList.map((user) => (
                      <div className="user-info d-flex align-items-center">
                        <PersonIcon sx={{ fontSize: '14px' }} />
                        <span className="d-block">{user.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">Type into the search box above then press "Enter" to start your search.</div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </Modal>
  );
};

export default AssignedToUserTaskModal;
