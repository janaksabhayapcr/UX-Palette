import React from 'react'
import PageHeader from '../../../Components/Common/PageHeader'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Workflow = () => {
    return (
        <>
            <PageHeader title="Workflows: Palette Platform" />
            <div className="text-start mb-3">
                <h2 className="mb-0 title--wrap text-capitalize">Use this page to start a new workflow on the current site or to view the status of a running or completed workflow.</h2>
                <div className='col-md-10 mx-auto mt-4'>
                    <Table borderless className='workflow-table'>
                        <tbody>
                            <tr>
                                <td className='bg-gray'>Start a New Workflow </td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td>
                                    There are no workflows currently available to start on this site.
                                </td>
                            </tr>
                            <tr></tr>
                            <tr> <td className='bg-gray'>Workflows</td></tr>
                            <tr>
                                <td>Select a workflow for more details on the current status or history.   <Link to="#" className="text-decoration-none text-black ms-3">Show all workflows.</Link></td>
                            </tr>
                            <tr>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>Started</td>
                                            <td>Ended</td>
                                            <td>Status</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </tr>
                            <tr className='border-bottom'>
                                <td className='fw-bold'>My Running Workflows</td>
                            </tr>
                            <tr><td>There are no currently running workflows on this site.</td></tr>
                            <tr className='border-bottom'>
                                <td className='fw-bold'>My Completed Workflows</td>
                            </tr>
                            <tr><td>There are no completed workflows on this site.</td></tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Workflow
