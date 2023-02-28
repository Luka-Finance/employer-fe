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
                <th>Title</th>
                <th>Created at</th>
                <th>Due date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((cur) => (
                    <tr 
                        key={cur.id}
                    >
                        <td> {cur.title} </td>
                        <td> 
                            {<Moment date={cur.createdAt} format="DD/MM/YYYY" />} 
                        </td>
                        <td> 
                            {<Moment date={cur.dueDate} format="DD/MM/YYYY" />} 
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
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}
                          >
                            {`${cur.status.split('_')[0]} ${cur.status.split('_')[1]}`}  
                          </p>  
                        </td>
                        <td>
                            {
                                cur.file !== null ? (
                                    <div style={{alignItems: 'center', cursor: 'pointer'}} onClick={() => download(cur.id)}>
                                        <FiDownload 
                                            style={{color: '#007737'}} 
                                        />

                                        <span style={{color: '#007737', marginLeft: 10}}>download</span>
                                    </div>
                                ) : (
                                    <p></p>
                                )
                            }
                        </td>  
                    </tr>
                ))
            }
        </tbody>
    </Table>
  )
}

export default CustomTableTwo;