import React from 'react';
import { Table } from 'react-bootstrap';
import getSymbolFromCurrency from 'currency-symbol-map';
import { FiDownload } from 'react-icons/fi';
import Moment from 'react-moment';

function CustomTableTwo({
    data,
    download,
}) {
    console.log(data)
  return (
    <Table
        // hover
        borderless={true} 
        responsive
    >
        <thead>
            <tr>
                <th>Date Paid</th>
                <th>Amount Paid</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((cur) => (
                    <tr 
                        key={cur.id}
                    >
                        <td> 
                            {<Moment date={cur.createdAt} format="DD/MM/YYYY" />} 
                        </td>
                        <td> 
                            {/* {getSymbolFromCurrency('NGN')} {cur.items[0]?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                            {getSymbolFromCurrency('NGN')} {cur?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td> 
                          <p 
                            style={{
                                fontWeight: '400',
                                // color: cur.status === 'Success' ? '#007737' : cur.status === 'Pending' ? '#333333' : '#910202',
                                // backgroundColor: cur.status === 'Success' ? 'rgba(230, 252, 239, 1)' : cur.status === 'Pending' ? 'rgba(230, 230, 230, 1)' : 'rgba(255, 236, 236, 1)',
                                color: cur.status !== 'NOT_PAID' ? '#007737' : '#910202',
                                background: cur.status !== 'NOT_PAID' ? 'rgba(230, 252, 239, 1)' : 'rgba(255, 236, 236, 1)',
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}
                          >
                            {`${cur.status.split('_')[0]} ${cur.status.split('_')[1]}`}  
                          </p>  
                        </td> 
                    </tr>
                ))
            }
        </tbody>
    </Table>
  )
}

export default CustomTableTwo;