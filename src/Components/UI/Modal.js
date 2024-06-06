import React from 'react';
// import ReactModel from 'react-bootstrap/Modal';
import * as ReactModel from 'react-modal';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';

export default function Modal(props) {
  const { isOpen, title, onClose, children, footerContent, additionalStyle = {} } = props;

  const modalStyle = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '9999',
      background: 'rgba(0, 0, 0, 0.2)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'visible',
      background: 'none',
      width: '50%',
      ...(additionalStyle.hasOwnProperty('content') && additionalStyle.content)
    },
  };

  return (
    <ReactModel isOpen={isOpen} style={modalStyle}>
      <Draggable handle=".handle">
        <div className="draggable-wrapper">
          <div className="padded_modal_top">
            <div className="help-modal handle d-flex align-items-center justify-content-between">
              <h4 className="mb-0">{title}</h4>
              <Button size="sm" variant="transparent" className="border-0 rounded-0 p-0 text-light" onClick={onClose}>
                <FontAwesome name="xbutton" className="fa-times" />
              </Button>
            </div>
            <div className="dynamic-modal-ticket-window modal-edit-row">{children}</div>
            {footerContent && <div className="dynamic-modal-ticket-window modal-edit-row">{footerContent}</div>}
          </div>
        </div>
      </Draggable>
    </ReactModel>
  );
}
