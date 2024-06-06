import React, { useState } from 'react'
import PageHeader from '../../../Components/Common/PageHeader'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Create = () => {
    const [hoverData, setHoverData] = useState({});
    const [onHover, setOnHover] = useState(false);

    const data = [
        {
            name: "Libraries",
            sub_items: [{
                title: 'Document Library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Form Library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Wiki page library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Picture  library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Asset  library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Data connection library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'side library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Report library',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            ]
        },
        {
            name: "Communications",
            sub_items: [{
                title: 'Announcements',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Contacts',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'Discussion board',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            ]
        },
        {
            name: "Traking",
            sub_items: [{
                title: 'links',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'calendar',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'taskes',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'project taskes',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'issues tracking',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'survey',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            ]
        },
        {
            name: "custom lists",
            sub_items: [{
                title: 'custom list',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'custom list in datasheet view',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'external list',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'status list',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'import spreadsheet',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            ]
        },
        {
            name: "pages and sites",
            sub_items: [{
                title: 'page',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'web part page',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'blog',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'term sites',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'sites and workspaces',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            {
                title: 'publishing',
                icon: 'https://www.pcrpalette.com/_layouts/images/ltfl.png',
                description: 'A place to share, browse and manage rich media assets, like image, audio and video files.'
            },
            ]
        }
    ]

    const handleHover = (description) => {
        setHoverData(description);
        setOnHover(true)
    };

    return (
        <>
            <PageHeader title="Create" />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">Add new sites, pages, libraries, or lists to this site.</h2>
            </div>
            <Table borderless className='collaboration-create-table'>
                <tbody>
                    <tr >
                        <td className='p-0'>
                            <Table borderless className={`create-info mb-0 ${onHover == true && 'create-on'}`}>
                                <tbody>
                                    <tr>
                                        <td className='create-content'>
                                            <div className={onHover != false && 'd-none'}>
                                                <div className='create-title-h2'>
                                                    Select an item to create a new list, library, discussion board, survey, page or site.
                                                </div>
                                                <div className='create-title-h2'>Hover over an item to view details.</div>
                                            </div>
                                            <div className={onHover != true && 'd-none'}>
                                                <Table borderless className='mb-0'>
                                                    <tr>
                                                        <td className="create-infoIcon">
                                                            <img src={hoverData.icon} className='w-100 h-100' />
                                                        </td>
                                                        <td className="create-infoText">
                                                            <div className="create-title p-0 text-capitalize">{hoverData.title}</div>
                                                            <div className="create-title-h3 p-0">{hoverData.description}</div>
                                                        </td>
                                                    </tr>
                                                </Table>

                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='create-arrow w-100'></td>
                                    </tr>


                                </tbody>
                            </Table>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-0'>
                            <Table borderless className={`create-header ${onHover != true && 'create-on'}`} >
                                <tbody>
                                    <tr>
                                        <td className='create-arrow w-100'></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Table borderless>
                                                <tbody>
                                                    <tr>
                                                        {
                                                            data && data.map((item, i) => {
                                                                const sub_items = item.sub_items
                                                                return (
                                                                    <td key={i}>
                                                                        <div>
                                                                            <div className='create-name px-2'>
                                                                                {item.name}
                                                                            </div>
                                                                            <div>
                                                                                <ul className='list-unstyled create-list'>
                                                                                    {sub_items && sub_items.map((subItem, index) => {
                                                                                        return (
                                                                                            <li key={index} onMouseEnter={() => handleHover(subItem)} onMouseLeave={() => { setOnHover(false); setHoverData({}) }}>
                                                                                                <Link to="#" className="text-capitalize">{subItem.title}</Link>
                                                                                            </li>
                                                                                        );
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </td>

                                    </tr>
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table >
        </>
    )
}

export default Create
