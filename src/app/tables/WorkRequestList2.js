import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useResizeColumns,
} from "react-table";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';


const WorkRequestList2 = () => {


  const [Columns, setColumns] = useState([]);
  const [Data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [UDFText_1, setUDFText_1] = useState("");
  const [UDFText_2, setUDFText_2] = useState("");
  const [UDFText_3, setUDFText_3] = useState("");

  const [UDFNumber_1, setUDFNumber_1] = useState("0");
  const [UDFNumber_2, setUDFNumber_2] = useState("0");

  const [UDFDate_1, setUDFDate_1] = useState(new Date());
  const [UDFDate_2, setUDFDate_2] = useState(new Date());
  const [UDFDate_3, setUDFDate_3] = useState(new Date());

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_workrequestmaster_list1 = (site_ID) => {
    APIServices.get_workrequestmaster_list1(site_ID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setColumns(responseJson.data.data.header);
            setData(responseJson.data.data.result);
        
        } else {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
            });
        }
        })
        .catch((e) => {
        console.log(e);
        Swal.fire({
            icon: "error",
            title: "Oops get_sitecode...",
            text: e,
        });
        });
    };


useEffect(() => {
let site_ID = localStorage.getItem("site_ID");
get_workrequestmaster_list1(site_ID);
}, []);


const IndeterminateCheckbox = React.forwardRef(
({ indeterminate, ...rest }, ref) => {
const defaultRef = React.useRef()
const resolvedRef = ref || defaultRef

React.useEffect(() => {
resolvedRef.current.indeterminate = indeterminate
}, [resolvedRef, indeterminate])

return (
<>
    <input type="checkbox" ref={resolvedRef} {...rest} />
</>
)
}
)


const {
getTableProps,
getTableBodyProps,
headerGroups,
rows,
prepareRow,

selectedFlatRows,
resetResizing,        
state: { selectedRowIds },

} = useTable({ columns: Columns, data: Data },useSortBy, useRowSelect, useResizeColumns,

hooks => {
hooks.visibleColumns.push(columns => [
    // Let's make a column for selection
    {
    id: 'selection',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    Header: ({ getToggleAllRowsSelectedProps }) => (
        <div>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
    ),
    // The cell can use the individual row's getToggleRowSelectedProps method
    // to the render a checkbox
    Cell: ({ row }) => (

        <div>                      
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>

    ),
    
    },
    ...columns,
])
}
)


const handleRowClick = (data) => {

console.log(data.col56)
};


const get_workrequest_status = (site_ID, type, selected_asset) => {

    Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
    Swal.showLoading()
  
    APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
  
   
        if (responseJson.data.status === 'SUCCESS') {
  
           console.log('get_dropdown', responseJson.data)
  
                
            //get_dropdown_ParentFlag(site_ID,selected_asset);    
            Swal.close();              
          
        }else{
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.data.message,
                
              })
        }
  
    }).catch((e) => {
        Swal.close();
       
        Swal.fire({
          icon: 'error',
          title: 'Oops get_sitecode...',
          text: e,          
        })
      });
  }
  
  
  const get_dropdown_ParentFlag = (site_ID,selected_asset) => {  
  
    console.log('PARENT FLAG: '+ site_ID + selected_asset)
    APIServices.get_dropdown_ParentFlag(site_ID,selected_asset).then((responseJson)=>{
  
       console.log(responseJson.data.status);
  
        if (responseJson.data.status === 'SUCCESS') {  
  
                Swal.close();
                setButton_save("Submit")
                get_workrequest_select(site_ID,selected_asset);
  
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.data,
                
              })
        }
  
    }).catch((e) => {           
        Swal.fire({
          icon: 'error',
          title: 'Oops get_WorkRequest_select...',
          text: e,          
        })
      });
  
  }
  
  
  const get_workrequest_select = () => {
  
        
    console.log('SELECT ROWID: '+ location.state.RowID)
  
    APIServices.get_workrequest_select(location.state.RowID).then((responseJson)=>{         
        
        console.log('SELECT response: '+ JSON.stringify(responseJson));
  
        if (responseJson.data.status === 'SUCCESS') {     
            
  
  // **************************************** check read data ******************************************
            console.log('SELECT WKR: '+ JSON.stringify(responseJson.data.data))
           
           for (var index in responseJson.data.data) {
           
            
            setRowID( responseJson.data.data[index].RowID )
  
            
            setUDFText_1( responseJson.data.data[index].wkr_ls2_varchar1 )
            setUDFText_2( responseJson.data.data[index].wkr_ls2_varchar2 )
            setUDFText_3( responseJson.data.data[index].wkr_ls2_varchar3 )

            setUDFNumber_1( responseJson.data.data[index].wkr_ls2_numeric1 )
            setUDFNumber_2( responseJson.data.data[index].wkr_ls12numeric2 )
  
            if(responseJson.data.data[index].wkr_ls2_datetime1 == null){
                setUDFDate_1('')
            }else{

                setUDFDate_1( Moment(responseJson.data.data[index].wkr_ls2_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
            }

            if(responseJson.data.data[index].wkr_ls2_datetime2 == null){
                setUDFDate_2('')
            }else{

                setUDFDate_2( Moment(responseJson.data.data[index].wkr_ls2_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 2 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
            }

            if(responseJson.data.data[index].wkr_ls2_datetime3 == null){
                setUDFDate_3('')
            }else{

                setUDFDate_3( Moment(responseJson.data.data[index].wkr_ls2_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 3 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
            }

  
          }
  
          Swal.close();
  
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.data,
                
              })
        }
  
    }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops get_WorkRequest_select...',
          text: e,          
        })
      });
  
  }
  
  
  useEffect(() => {
  
    let site_ID = localStorage.getItem("site_ID");
  
    console.log('select select',location.state.select);
    console.log('select WKRID',location.state.RowID);
  
    get_workrequest_status(site_ID, "All", location.state.select);       
   
  },[location]);





  return (
    <div>
      <div className="page-header">
          <div className="template-demo" >
              <button type="button" className="btn btn-outline-primary btn-icon-text"  onClick={handleShow}>
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New  
              </button>
          
              <button type="button" className="btn btn-outline-danger btn-icon-text"  >
                  <i className="mdi mdi-delete-forever btn-icon-prepend"></i> Delete 
              </button>
          </div>                     
      </div> 

      {/******************** Work Request List 2 ********************/}
        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Work Request List 2</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Varchar1">
                            <label className="col-sm-4 col-form-label">Varchar1:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control
                                    type="text"
                                    value={UDFText_1}
                                    onChange={(e) => setUDFText_1(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Varchar2">
                            <label className="col-sm-4 col-form-label">Varchar2:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control
                                    type="text"
                                    value={UDFText_2}
                                    onChange={(e) => setUDFText_2(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Varchar3">
                            <label className="col-sm-4 col-form-label">Varchar3:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control
                                    type="text"
                                    value={UDFText_3}
                                    onChange={(e) => setUDFText_3(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Datetime1">
                            <label className="col-sm-4 col-form-label">Datetime1:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control                                            
                                    type="datetime-local"  
                                    value={UDFDate_1} 
                                    onChange={(e) => setUDFDate_1(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Datetime2">
                            <label className="col-sm-4 col-form-label">Datetime2:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control                                            
                                    type="datetime-local"  
                                    value={UDFDate_2} 
                                    onChange={(e) => setUDFDate_2(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Datetime3">
                            <label className="col-sm-4 col-form-label">Datetime3:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control                                            
                                    type="datetime-local"  
                                    value={UDFDate_3} 
                                    onChange={(e) => setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Numeric1">
                            <label className="col-sm-4 col-form-label">Numeric1:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_1} 
                                    onChange={(e) => setUDFNumber_1(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="row" controlId="validation_Numeric2">
                            <label className="col-sm-4 col-form-label">Numeric2:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_2} 
                                    onChange={(e) => setUDFNumber_2(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>

                    </div>
                        
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        // Close modal
                        handleClose();
                    }}>
                    {/* {Button_save} */}
                    Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div> 

      <div className="table-responsive">
          <table className="table table-hover table-bordered " {...getTableProps() } on >
              <thead>
                  {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                      
                          {headerGroup.headers.map(column => (                                    
                              <th
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                  
                                  style={{
                                      borderBottom: 'solid 3px red',
                                      color: 'black',
                                  }}

                                  {...column.getResizerProps()}
                                      className={`resizer ${
                                          column.isResizing ? 'isResizing' : ''
                                      }`}
                              >                            
                                  {column.render('Header')}

                                  <span>
                                      {column.isSorted
                                          ? column.isSortedDesc
                                              ? '🔽'
                                              : '🔼'
                                          : ''}
                                  </span>
                              </th>
                          ))}
                      </tr>
                  ))}
                      
              </thead>
              <tbody {...getTableBodyProps() } >
                  {rows.map(row => {
                  prepareRow(row)
                  return (
                      <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                      {row.cells.map(cell => {
                          return (
                          <>
                          {/* Here added onClick function to get cell value */}
                          <td
                          // onClick={()=> getCellValue(cell)}
                          //     {...cell.getCellProps()}
                          //     style={{
                          //     padding: '10px',
                          //     border: 'solid 1px gray',
                          //     background: 'papayawhip',
                          //     }}
                          >
                              {cell.render('Cell')}
                          </td>
                          </>
                          )
                      })}
                      </tr>
                  )
                  })}                                
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default WorkRequestList2;
