import React from 'react';
import { useDispatch, useSelector } from "react-redux"


const PDFUploader = ({allData, headers}) => {
    const dispatch = useDispatch()
    

    for (let d in allData.allData){
        console.log("======", allData.allData[d])
    }

    console.log("*******",headers)

    return (
        <>
           <div className="">
                <table className="table">
                        <thead>
                            <tr>
                                {/* {headers.map((h) =>(<th>{h}</th>))} */}
                                <th>Bill ID</th>
                                <th>Bill To Name</th>
                                <th>Bill To Address</th>
                                <th>Bill To Tel. No.</th>

                                <th>Ship To Name</th>
                                <th>Ship To Address</th>
                                <th>Ship To Tel. No.</th>

                                <th>Comments</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>SalesTax</th>
                                <th>Shipping</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                <th>TotalDue</th>
                                <th>UnitPrice</th>


                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((d) => (
                                <tr>
                                    <td>{d.billId}</td>
                                    <td>{d.billTo.name}</td>
                                    <td>{d.billTo.address}</td>
                                    <td>{d.billTo.telephoneNo}</td>
                                    <td>{d.shipTo.name}</td>
                                    <td>{d.shipTo.address}</td>
                                    <td>{d.shipTo.telephoneNo}</td>
                                    <td>{d.comments}</td>
                                    <td>{d.description}</td>
                                    <td>{d.quantity}</td>
                                    <td>{d.salesTax}</td>
                                    <td>{d.shipping}</td>
                                    <td>{d.subtotal}</td>
                                    <td>{d.total}</td>
                                    <td>{d.totalDue}</td>
                                    <td>{d.unitPrice}</td>
                                </tr>
                                
                            ))}
                            
                                
                                
                            
                        </tbody>
                </table>
                
            </div>
            
        </>
    )
}

export default PDFUploader