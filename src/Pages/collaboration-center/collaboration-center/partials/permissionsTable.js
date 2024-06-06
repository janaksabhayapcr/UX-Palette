import React from 'react';
import { Table } from 'react-bootstrap';

export default function PermissionTables() {

    return (
        <div className="ReactTable document--libraries-table">
            <Table striped>
                <thead>
                    <tr>
                        <th className='text-start text-capitalize'>Name</th>
                        <th className='text-start text-capitalize'>Type</th>
                        <th className='text-start text-capitalize'>Permission Levels</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-start text-capitalize'>user</td>
                        <td className='text-start text-capitalize'>Aakash Sharma (i:0e.t|pcradfs|asharma@pcr.com)</td>
                        <td className='text-start text-capitalize'>Limited Access</td>
                    </tr>
                    <tr>
                        <td className='text-start text-capitalize'>SharePoint Group</td>
                        <td className='text-start text-capitalize'>Hierarchy Managers</td>
                        <td className='text-start text-capitalize'>Manage Hierarchy</td>
                    </tr>
                    <tr>
                        <td className='text-start text-capitalize'>user</td>
                        <td className='text-start text-capitalize'> Approvers</td>
                        <td className='text-start text-capitalize'>Limited Access</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}