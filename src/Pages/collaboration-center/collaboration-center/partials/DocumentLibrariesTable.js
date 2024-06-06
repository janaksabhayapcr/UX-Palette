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
        title: "Custodian Forms",
        link: pageRoutes.collabration_custodian_forms,
        description: '',
        items: 1,
        last_modified: '3 weeks ago',
        type: 'fa-folder',
    },
    {
        title: "Customized Reports",
        link: pageRoutes.collabration_customized_reports,
        description: 'This Document library has the templates to create Web Analytics custom reports for this site collection ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Documents",
        link: pageRoutes.collabration_documents,
        description: '',
        items: 1,
        last_modified: '3 weeks ago',
        type: 'fa-image',
    },
    {
        title: "Form Templates",
        link: pageRoutes.collabration_form_templates,
        description: 'This library contains administrator-approved form templates that were activated to this site collection.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Images",
        link: '#',
        description: 'This system library was created by the Publishing feature to store images that are used on pages in this site.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Invoices",
        link: pageRoutes.collabration_invoices,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "LoAs",
        link: pageRoutes.collabration_loas,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Pages ",
        link: pageRoutes.collabration_pages,
        description: 'This system library was created by the Publishing feature to store pages that are created in this site.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Silverman Batch Reports",
        link: pageRoutes.collabration_batch_reports,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Site Assets",
        link: '#',
        description: 'Use this library to store files which are included on pages within this site, such as images on Wiki pages.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Site Collection Documents",
        link: '#',
        description: 'This system library was created by the Publishing Resources feature to store documents that are used throughout the site collection.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Site Collection Images",
        link: '#',
        description: 'This system library was created by the Publishing Resources feature to store images that are used throughout the site collection. ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Site Customized Reports",
        link: '#',
        description: '	This Document library has the templates to create Web Analytics custom reports for this site ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Site Pages",
        link: pageRoutes.collabration_site_pages,
        description: 'se this library to create and store pages on this site.',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Statements",
        link: pageRoutes.collabration_statements,
        description: '',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Style Library",
        link: '#',
        description: 'Use the style library to store style sheets, such as CSS or XSL files. The style sheets in this gallery can be used by this site or any of its subsites.  ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
    {
        title: "Updates",
        link: pageRoutes.collabration_statements,
        description: ' ',
        items: 0,
        last_modified: '13 years ago',
        type: 'fa-folder',
    },
];

const DocumentLibrariesTable = ({ parentState, parentChangeState }) => {
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

export default DocumentLibrariesTable;
