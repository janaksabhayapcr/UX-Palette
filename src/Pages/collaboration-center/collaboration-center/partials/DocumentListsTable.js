import React, { useState } from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import useHandleNestedAccordion from '../../../../hooks/useHandleNestedAccordion';
import { useContextMenu } from '../../../../Components/UI/ContextMenus';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../configs';

const data = [
    {
        title: "calendar",
        link: pageRoutes.collabration_calendar,
        description: '',
        items: 1,
        last_modified: '3 weeks ago',
        type: 'fa-folder',
    },
    {
        title: "contacts",
        link: pageRoutes.collabration_contacts,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Content and Structure Reports	Content and Structure Reports ",
        link: pageRoutes.collabration_calendar,
        description: 'Use the reports list to customize the queries that appear in the Content and Structure Tool views ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Issues",
        link: pageRoutes.collabration_issues,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Reusable Content ",
        link: pageRoutes.collabration_calendar,
        description: 'Items in this list contain HTML or text content which can be inserted into web pages. If an item has automatic update selected, the content will be inserted into web pages as a read-only reference, and the content will update if the item is changed. If the item does not have automatic update selected, the content will be inserted as a copy in the web page, and the content will not update if the item is changed. ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Tasks",
        link: pageRoutes.collabration_tasks,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Workflow Tasks ",
        link: pageRoutes.workflow_tasks,
        description: 'This system library was created by the Publishing feature to store workflow tasks that are created in this site.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },

];

const DocumentListsTable = ({ parentState, parentChangeState }) => {
    const [selectedItem, setSelectedItem] = useState({});
    useHandleNestedAccordion(['main']);
    const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
        parentElementSelector: '.padded_modal_top',
        callback: (selIten) => {
            setSelectedItem(selIten);
        },
    });
    return (
        <>
            <div className="ReactTable document--libraries-table">
                <Table striped responsive borderless className="mb-0 text-start">
                    <thead>
                        <tr>
                            <th colSpan='3'> </th>
                            <th className='text-capitalize'> Items</th>
                            <th className='text-capitalize'> Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-capitalize" colspan="5">Document Libraries</td>
                        </tr>
                        {data.map((item) => {
                            return (
                                <tr>
                                    <td><FontAwesome className={item.type} /></td>
                                    <td className='text-capitalize'><Link to={item.link}>{item.title}</Link></td>
                                    <td className='description--td'>{item.description}</td>
                                    <td>{item.items}</td>
                                    <td>{item.last_modified}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default DocumentListsTable;
