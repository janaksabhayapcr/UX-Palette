import React from 'react'
import { Link } from 'react-router-dom'
import { pageRoutes } from '../../../configs'
import { Table } from 'react-bootstrap'

const AlertTable = () => {
    return (
        <div className="ReactTable document--libraries-table">
            <Table striped>
                <thead>
                    <tr>
                        <th className='text-start text-capitalize' colSpan="2"> Frequency: Immediate</th>
                        <th className='text-start text-capitalize'>Delivery Method(s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-start text-capitalize'> <input type="checkbox" name="" id="" /></td>
                        <td className='text-start text-capitalize'>	<Link to={pageRoutes.new_alert}>Documents: AKS Trust.pdf</Link></td>
                        <td className='text-start text-capitalize'>	E-mail</td>
                    </tr>
                    <tr>
                        <td className='text-start text-capitalize'> <input type="checkbox" name="" id="" /></td>
                        <td className='text-start text-capitalize'>	<Link to={pageRoutes.new_alert}>Documents: AKS Trust.pdf</Link></td>
                        <td className='text-start text-capitalize'>	E-mail</td>
                    </tr>
                    <tr>
                        <td className='text-start text-capitalize'> <input type="checkbox" name="" id="" /></td>
                        <td className='text-start text-capitalize'>	<Link to={pageRoutes.new_alert}>Documents: AKS Trust.pdf</Link></td>
                        <td className='text-start text-capitalize'>	E-mail</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default AlertTable
