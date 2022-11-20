import React from 'react';
import { Table } from 'react-bootstrap';
import getSymbolFromCurrency from 'currency-symbol-map';

function CustomTableTwo({
    data,
    setShow,
}) {
  return (
    <Table
        hover
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
                        onClick={() => {
                            setShow(true);
                        }}
                        style={{cursor: 'pointer'}}
                    >
                        <td> {cur.title} </td>
                        <td> 
                            {getSymbolFromCurrency('NGN')} {cur.items[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td> 
                          <p 
                            style={{
                                fontWeight: '400',
                                // color: cur.status === 'Success' ? '#007737' : cur.status === 'Pending' ? '#333333' : '#910202',
                                // backgroundColor: cur.status === 'Success' ? 'rgba(230, 252, 239, 1)' : cur.status === 'Pending' ? 'rgba(230, 230, 230, 1)' : 'rgba(255, 236, 236, 1)',
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}
                          >
                            {cur.status}  
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