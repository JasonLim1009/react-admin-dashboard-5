import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import APIServices from "../services/APIServices";

import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import Select from 'react-select';
import { Form, Modal, Button } from 'react-bootstrap';
import  {useLocation}  from 'react-router-dom';
import Moment from 'moment';

import Swal from "sweetalert2";

function WorkRequest() {

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);
  const [filterResult, setfilterResult] = React.useState([]);

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [select_id, setselect_id] = useState();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 20, 30, 40, 50];

  const [search, setSearch] = useState("");

  const [columns, setcolumns] = useState([]);
  const [data, setdata] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);



  // get_WorkRequestmaster
  const get_WorkRequestmaster = (site_ID) => {
    APIServices.get_WorkRequestmaster(site_ID, page, pageSize)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          console.log(responseJson.data.status);
          console.log(responseJson.data.header_count);
          console.log(responseJson.data.totalPages);
          setCount(responseJson.data.totalPages);
          // setHeader(responseJson.data.data.header);
          // setResult(responseJson.data.data.result);
          setcolumns(responseJson.data.data.header);
          setdata(responseJson.data.data.result);
          setfilterResult(responseJson.data.data.result);
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
    get_WorkRequestmaster(site_ID);
  }, [page, pageSize]);


  const renderTableHeader = () => {
    return Object.keys(Header).map((attr) => (
      <th key={attr}> {attr.toUpperCase()} </th>
    ));
  };

  const renderTableRows = () => {
    return Result.map((result) => {


      if (result.wkr_det_appr_date == null) {
        var wkr_appr_date = ''
      } else {

        var wkr_appr_date = format(new Date(result.wkr_det_appr_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wkr_det_reject_date == null) {
        var wkr_reject_date = ''
      } else {

        var wkr_reject_date = format(new Date(result.wkr_det_reject_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wkr_mst_due_date == null) {
        var wkr_due_date = ''
      } else {

        var wkr_due_date = format(new Date(result.wkr_mst_due_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wkr_mst_create_date == null) {
        var wkr_create_date = ''
      } else {

        var wkr_create_date = format(new Date(result.wkr_mst_create_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wkr_mst_create_date == null) {
        var wkr_create_date = ''
      } else {

        var wkr_create_date = format(new Date(result.wkr_mst_create_date.date), "dd/MM/yyyy HH:MM")

      }


      return (
        <tr key={result.site_cd} onClick={() => handleRowClick(result)}>

          <td>{result.wkr_mst_wr_no}</td>
          <td>{result.wkr_mst_wr_descs}</td>
          <td>{result.wkr_mst_wr_status}</td>
          <td>{result.wkr_mst_assetno}</td>
          <td>{result.wkr_mst_chg_costcenter}</td>
          <td>{result.wkr_mst_work_area}</td>
          <td>{result.wkr_mst_assetlocn}</td>
          <td>{result.wkr_mst_location}</td>
          <td>{result.wkr_mst_temp_asset}</td>
          <td>{result.wkr_mst_email_notification}</td>
          <td>{result.wkr_mst_work_type}</td>
          <td>{result.wkr_mst_work_class}</td>
          <td>{result.wkr_mst_work_group}</td>
          <td>{result.wkr_mst_wo_status}</td>
          <td>{result.wkr_mst_projectid}</td>
          <td>{result.wkr_mst_originator}</td>
          <td>{result.wkr_mst_phone}</td>

          <td>{result.wkr_det_approver}</td>
          <td>{wkr_appr_date}</td>
          <td>{result.wkr_det_reject_desc}</td>
          <td>{result.wkr_det_reject_by}</td>
          <td>{wkr_reject_date}</td>
          <td>{result.wkr_mst_orig_priority}</td>

          <td>{wkr_due_date}</td>
          <td>{result.wkr_mst_fault_code}</td>
          
          <td>{result.wkr_mst_create_by}</td>
          <td>{wkr_create_date}</td>

        </tr>
      );
    });
  };



  // ******************************** RowID: check and read data ***********************************************
  const handleRowClick = (data) => {
       console.log(data.col29);
       //history.push("/WorkRequestForm-1", { RowID: data.col29 });
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  const handleNewClick = () => {
    history.push("/WorkRequestForm-1", { select: "New_WorkRequest" });
  };


  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.wkr_mst_wr_no.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_wr_descs.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_assetno.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_chg_costcenter.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_work_area.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_assetlocn.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_work_type.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_work_group.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_originator.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_phone.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_create_by.toLowerCase().includes(e.toLowerCase())

      );
      setResult(a); //what data u want to be searched

    }
  };


  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, onChange, ...rest }, ref) => {
      
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      const handleChange = (event) => {
        onChange(event);
        setShowButton(event.target.checked);
      };
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} onChange={handleChange} {...rest} />
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
    
} = useTable({ columns, data },useSortBy, useRowSelect, useResizeColumns,

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


  const handleEdit = (data) => {

  console.log(data)
  history.push("/WorkRequestForm-1", { RowID: data.col29 });
};


  const handleDelete = (data) => {
  // Delete
};



const [Status, setStatus] = useState([]);
const [selected_Status, setSelected_Status] = useState([]);

const [Originator, setOriginator] = useState([]);
const [selected_Originator, setSelected_Originator] = useState([]);

const [WorkGroup, setWorkGroup] = useState([]);
const [selected_WorkGroup, setSelected_WorkGroup] = useState([]);

const [showApprove, setShowApprove] = useState(false);
const handleCloseApprove = () => setShowApprove(false);
const handleShowApprove = () => setShowApprove(true);

const location = useLocation();

const [Button_save, setButton_save] = useState("");

const [RowID, setRowID] = useState("");

const [RejectBy, setRejectBy] = useState("");
const [RejectBy_disabled, setRejectBy_disabled] = useState(false);

const [RejectDate, setRejectDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

const [RejectedDescription, setRejectedDescription] = useState("");

const [showDisapprove, setShowDisapprove] = useState(false);
const handleCloseDisapprove = () => setShowDisapprove(false);
const handleShowDisapprove = () => setShowDisapprove(true);


const get_workrequest_status = (site_ID, type, selected_asset) => {

  Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
  Swal.showLoading()

  APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

 
      if (responseJson.data.status === 'SUCCESS') {

         console.log('get_dropdown', responseJson.data)

          let Status = responseJson.data.data.WKO_Status.map(item => ({
              label: item.wrk_sts_status +" : "+ item.wrk_sts_desc,
              value: item.wrk_sts_desc            
              }));
              setStatus(Status);

          let Originator = responseJson.data.data.WKO_Originator.map(item => ({
            label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
            value: item.emp_mst_empl_id            
            }));                   
            setOriginator(Originator);  
            
          let WorkGroup = responseJson.data.data.WKO_Work_Group.map(item => ({
            label: item.wrk_grp_grp_cd +" : "+ item.wrk_grp_desc ,
            value: item.wrk_grp_grp_cd            
            }));                   
            setWorkGroup(WorkGroup);  
              
              
             // get_dropdown_ParentFlag(site_ID,selected_asset);                  
        
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
              setButton_save("Save")
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

          
          setSelected_Status( {label:responseJson.data.data[index].wko_mst_status} )
          setSelected_Originator( {label:responseJson.data.data[index].wkr_mst_originator} )
          setSelected_WorkGroup( {label:responseJson.data.data[index].wkr_mst_work_group} )

          setRejectBy(responseJson.data.data[index].wkr_det_reject_by )
          setRejectedDescription( responseJson.data.data[index].wkr_det_reject_desc )

          if(responseJson.data.data[index].wkr_det_reject_date == null){
              setRejectDate('')
          }else{

              setRejectDate( Moment(responseJson.data.data[index].wkr_det_reject_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
              console.log('SELECT RD: '+ Moment(responseJson.data.data[index].wkr_det_reject_date.date).format('YYYY-MM-DDTHH:mm:ss'))
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




const onClickApprove = () => {
  if(selected_Status == 0 || selected_Status == null){
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Select the Status',
          showConfirmButton: false,
          timer: 2000
          })
  }else{
      
    if(selected_Originator == 0 || selected_Originator == null){
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Select the Originator',
          showConfirmButton: false,
          timer: 2000
          })

          }else{

            if(selected_WorkGroup == 0 || selected_WorkGroup == null){
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select the Work Group',
                showConfirmButton: false,
                timer: 2000
                })

              }else{

                handleCloseApprove();
                WorkRequest_Approval();
                console.log("Approve button clicked here!");

            }
        }
      }
  }


const onClickDisapprove = () => {
  if(RejectedDescription == ''){
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Enter the Rejected Description',
        showConfirmButton: false,
        timer: 2000
    })

      }else{

          handleCloseDisapprove();
          WorkRequest_Disapproval();
          console.log("Disapprove button clicked here!");
            
      }
  }


const WorkRequest_Approval = () => {

  let site_ID = localStorage.getItem("site_ID");

  let EmpID = localStorage.getItem("EmpID");
  let EmpName = localStorage.getItem("EmpName");
  let LOGINID = localStorage.getItem("LOGINID");

  let hoveredRow = localStorage.getItem("RowID");
  console.log('get RowID here...', hoveredRow);

    
console.log(selected_Status);

    let Status, setStatus;
    if(selected_Status.label == '' || selected_Status.label == null){

        setStatus=''
    }else{

        Status = selected_Status.label.split(":")
        setStatus = Status[0];
        console.log("Status ", Status[0])
    }
    
    //Select Assign To
    let Originator, setOriginator;
    if(selected_Originator == '' || selected_Originator == null){

        setOriginator=''
    }else{

        Originator = selected_Originator.label.split(":")
        setOriginator = Originator[0];
        console.log("Originator ", Originator[0])
    }

    //Select Work Group
    let WorkGroup, setWorkGroup;
    if(selected_WorkGroup == '' || selected_WorkGroup == null){

        setWorkGroup=''
    }else{

        WorkGroup = selected_WorkGroup.label.split(":")
        setWorkGroup = WorkGroup[0];
        console.log("WorkGroup ", WorkGroup[0])
    }

    

  var json_workrequest ={

    "site_cd": site_ID,
    "wko_mst_status": setStatus.trim(),
    "wkr_mst_originator": setOriginator.trim(),
    "wkr_mst_work_group":setWorkGroup.trim(),

    "RowID": hoveredRow,
    "EmpID": EmpID,
    "EmpName": EmpName,
    "LOGINID": LOGINID,

  }

  console.log(JSON.stringify(json_workrequest))

APIServices.insert_work_request_approval(JSON.stringify(json_workrequest)).then((responseJson)=>{
  
  console.log(responseJson);
    if (responseJson.data.status === 'SUCCESS') { 
        
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: "Oops....",
            text: responseJson.data,
            
          })

    }else{
        Swal.close();
        Swal.fire({
            icon: 'success',
            title: responseJson.data.status,
            text: responseJson.data.message,
            
          })

    }

  }).catch((e) => {
      Swal.close();

    Swal.fire({
      icon: 'error',
      title: 'Oops get_WorkRequest_select...',
      text: e,          
    })
  });

  }


const WorkRequest_Disapproval = () => {

  let site_ID = localStorage.getItem("site_ID");

  let EmpID = localStorage.getItem("EmpID");
  let EmpName = localStorage.getItem("EmpName");
  let LOGINID = localStorage.getItem("LOGINID");

  let hoveredRow = localStorage.getItem("RowID");
  console.log('get RowID here...',hoveredRow);
  

  //Select Reject By
  console.log("RejectBy: ", RejectBy)

  //Select Rejected Description
  console.log("RejectedDescription: ", RejectedDescription)
    
  //Select Reject Date
  let date_of_reject = ''
  if (RejectDate == '' || RejectDate == null) {

    date_of_reject = '';
  } else {

    date_of_reject = Moment(RejectDate).format('yyyy-MM-DD HH:mm:ss').trim();
      console.log("RD :", date_of_reject);
  }

var json_workrequest ={

    "site_cd": site_ID,
    "wkr_det_reject_by": RejectBy.trim(),
    "wkr_det_reject_desc": RejectedDescription.trim(),
    "wkr_det_reject_date": date_of_reject,

    "RowID": hoveredRow,
    "EmpID": EmpID,
    "EmpName": EmpName,
    "LOGINID": LOGINID,
    
}

console.log(JSON.stringify(json_workrequest))

APIServices.insert_work_request_disapproval(JSON.stringify(json_workrequest)).then((responseJson)=>{
    if (responseJson.data.status === 'SUCCESS') { 
        
        Swal.close();

        Swal.fire({
            icon: 'success',
            title: responseJson.data.status,
            text: responseJson.data.message,
            
          })

    }else{
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: responseJson.data,
            
          })

    }
    
}).catch((e) => {
    Swal.close();
  
    Swal.fire({
      icon: 'error',
      title: 'Oops get_WorkRequest_select...',
      text: e,          
    })
  });

  }






  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Work Request</h3>
      </div>
      <div>
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <div className="template-demo">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="mdi mdi mdi-code-equal"></i>
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="mdi mdi mdi-credit-card"></i>
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="mdi mdi-calendar"></i>
                  </button>
                </div>
              </div>

              <div className="col">
                <SearchBar
                  className="form-control"
                  onChange={(e) => setFiltereddata(e)}
                  value={search}
                />
              </div>

              <div className="col">
                <button type="button" className="btn btn-primary btn-rounded">
                  Search
                </button>
              </div>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <div className="template-demo">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-rounded btn-icon"
                    >
                      <i className="mdi mdi-filter"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-icon-text"
                    >
                      <i className="mdi mdi-mixcloud btn-icon-prepend"></i>{" "}
                      quick filter
                    </button>
                  </div>
                </ol>
              </nav>
            </div>

            <div className="page-header">
              <div className="template-demo" isVisible={show}>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-icon-text"
                  onClick={handleNewClick}
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New Work Request
                </button>


                {showButton &&<button
                  type="button"
                  className="btn btn-outline-success btn-icon-text"
                  onClick={handleShowApprove}
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> Approve
                </button>}

                {showButton &&<button
                  type="button"
                  className="btn btn-outline-danger btn-icon-text"
                  onClick={handleShowDisapprove}
                >
                  <i className="mdi mdi-delete-forever btn-icon-prepend"></i> Disapprove
                </button>}


                {show && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-icon-text"
                  >
                    <i className="mdi mdi-delete-forever btn-icon-prepend"></i>{" "}
                    Delete
                  </button>
                )}
              </div>
              <nav aria-label="breadcrumb">
                <div className="row">
                  <Pagination
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />

                  {/* {"  Items per Page: "} */}
                  <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </nav>
            </div>


            {/******************** Approve Work Request ********************/}
            <div>
                <Modal show={showApprove} onHide={handleCloseApprove} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Approve Work Request</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Status:</label>
                                <div className="col-sm-6 form-check">
                                {Status.map((status) => (
                                      <Form.Check 
                                          key={status.value}
                                          type="radio"
                                          label={status.label}
                                          name="status"
                                          value={status.value}
                                          checked={selected_Status === status.value}
                                          onChange={(e) => setSelected_Status(e.target.value)}
                                          required
                                      />
                                  ))}
                                </div>
                            </Form.Group>

                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Assign to:</label>
                                <div className="col-sm-6 form-check">
                                    <Select  
                                       isClearable={true}  
                                       options={Originator}
                                       value={selected_Originator}
                                       onChange={setSelected_Originator} // using id as it is unique
                                       required
                                    />
                                </div>
                            </Form.Group>

                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Work Group:</label>
                                <div className="col-sm-6 form-check">
                                    <Select  
                                        isClearable={true}  
                                        options={WorkGroup}
                                        value={selected_WorkGroup}
                                        onChange={setSelected_WorkGroup} // using id as it is unique
                                        required
                                    />
                                </div>
                            </Form.Group>

                        </div>
                    </Modal.Body>
                    

                    <Modal.Footer>

                      <Button variant="secondary" onClick={handleCloseApprove}>
                        <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i>Close
                      </Button>
                      
                      <Button variant="primary" onClick={onClickApprove}>
                        <i className="mdi mdi-file-check btn-icon-prepend"></i>Approve
                      </Button>
                    </Modal.Footer>

                </Modal>

            </div> 

            {/******************** Disapprove Work Request ********************/}
            <div>
                <Modal show={showDisapprove} onHide={handleCloseDisapprove} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Disapprove Work Request</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Reject By:</label>
                                <div className="col-sm-7 form-check">
                                <Form.Control  type="text" placeholder="Username" value={RejectBy} onChange={(e) => setRejectBy(e.target.value)} disabled={RejectBy_disabled} readOnly/>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Reject Date:</label>
                                <div className="col-sm-7 form-check">
                                <Form.Control
                                    type="datetime-local"
                                    value={RejectDate} 
                                    onChange={(date) => setRejectDate(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'))}
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Rejected Description:</label>
                                <div className="col-sm-7 form-check">
                                    <Form.Control 
                                        as="textarea" 
                                        rows={12} 
                                        value={RejectedDescription}
                                        onChange={(e) => {
                                            
                                            setRejectedDescription(e.target.value);
                                          }}
                                    />
                                    </div>
                            </Form.Group>

                        </div>
                    </Modal.Body>
                    

                    <Modal.Footer>

                      <Button variant="secondary" onClick={handleCloseDisapprove}>
                        <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i>Close
                      </Button>
                      
                      <Button variant="primary" onClick={onClickDisapprove}>
                        <i className="mdi mdi-file-check btn-icon-prepend"></i>Disapprove
                      </Button>
                    </Modal.Footer>

                </Modal>

            </div> 



            {/* <div className="table-responsive">
              <table
                className="table table-hover table-bordered"
                style={{ color: "#000", border: 1 }}
              >
                <thead
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                    margin: "5px",
                  }}
                >
                  <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div> */}



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

{/******************************** floating button ********************************************** */}
                          {/* <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                              console.log(row.cells.length);

                              prepareRow(row)
                              return (
                                <tr {...row.getRowProps()} 
                                    onDoubleClick={(event) => handleRowClick(row.original, event)}
                                    onMouseEnter={() => setHoveredRow(row.original.col29)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{ backgroundColor: hoveredRow === row.original.col29 ? '#BCC9F5' : 'white' }}
                                    >
                                {row.cells.map((cell, index) => {



                                  if (index === row.cells.length - 27) {
                                    return (
                                      <td {...cell.getCellProps()} colSpan={1}>
                                        {cell.render('Cell')}
                                        
                                        {hoveredRow === row.original.col29 && (
                                          <div className="col-form-label" style={{ backgroundColor: "#BCC9F5", padding: "2px", borderRadius: "5px", position: 'absolute', left: 73, transform: "translateY(30%)" }}>
                                            <button
                                              type="button"
                                              onClick={() => handleShowApprove(row.original)}
                                              className="btn btn-light btn-icon-text"
                                              title="Approve"
                                              style={{padding: "10px", marginRight: "20px" }}
                                            >
                                              <i className="mdi mdi-file-check btn-icon-prepend"></i>
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() => handleShowDisapprove(row.original)}
                                              className="btn btn-light btn-icon-text"
                                              title="Disapprove"
                                              style={{padding: "10px", marginRight: "20px" }}
                                            >
                                              <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i>
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() => handleEdit(row.original)}
                                              className="btn btn-light btn-icon-text"
                                              title="Edit"
                                              style={{padding: "10px", marginRight: "20px" }}
                                            >
                                              <i className="mdi mdi-file-document btn-icon-prepend"></i>
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() => handleDelete(row.original)}
                                              className="btn btn-light btn-icon-text"
                                              title="Delete"
                                              style={{padding: "10px", marginRight: "10px" }}
                                            >
                                              <i className="mdi mdi-delete-forever btn-icon-prepend"></i>
                                            </button>
                                          </div>
                                        )}

                                      </td>
                                    );
                                  } else {
                                      return (
                                        <td {...cell.getCellProps()} colSpan={1}>
                                          {index === 3 && (
                                            <span style={{ backgroundColor: 
                                              cell.value === "W"
                                            ? "#2196F3"
                                            : cell.value === "A"
                                            ? "#19D895"
                                            : cell.value === "D"
                                            ? "#FF6258"
                                            : null, color: "white", padding: "5px", borderRadius: "5px", fontWeight: "bold" }}>
                                              {cell.render('Cell')}
                                            </span>
                                          )}
                                          {index !== 3 && cell.render('Cell')}
                                        </td>


                                      );
                                    }
                                  })}
                                </tr>
                              );
                            })}
                          </tbody> */}

{/******************************** fixed button ********************************************** */}
                          <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()}
                                  onDoubleClick={(event) => handleRowClick(row.original, event)}
                                  onMouseEnter={() => setHoveredRow(row.original.col29)}
                                  onMouseLeave={() => setHoveredRow(null)}
                                  style={{ backgroundColor: hoveredRow === row.original.col29 ? '#BCC9F5' : 'white' }}
                                >
                                  {row.cells.map((cell, index) => {
                                    if (index === row.cells.length - 26) {
                                      return (
                                        <td {...cell.getCellProps()} colSpan={1}>
                                          {cell.render('Cell')}
                                          {hoveredRow === row.original.col29 && (
                                            <div className="template-demo">
                                              <button
                                                type="button"
                                                onClick={() => handleShowApprove(row.original)}
                                                className="btn btn-light btn-icon-text"
                                                title="Approve"
                                                style={{padding: "10px" }}
                                              >
                                                <i className="mdi mdi-file-check btn-icon-prepend"></i>
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() => handleShowDisapprove(row.original)}
                                                className="btn btn-light btn-icon-text"
                                                title="Disapprove"
                                                style={{padding: "10px" }}
                                              >
                                                <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i>
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() => handleEdit(row.original)}
                                                className="btn btn-light btn-icon-text"
                                                title="Edit"
                                                style={{padding: "10px" }}
                                              >
                                                <i className="mdi mdi-file-document btn-icon-prepend"></i>
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() => handleDelete(row.original)}
                                                className="btn btn-light btn-icon-text"
                                                title="Delete"
                                                style={{padding: "10px" }}
                                              >
                                                <i className="mdi mdi-delete-forever btn-icon-prepend"></i>
                                              </button>
                                            </div>
                                          )}
                                        </td>
                                      );
                                    } else {
                                      return (
                                        <td {...cell.getCellProps()} colSpan={1}>
                                        {index === 3 && (
                                          <span style={{ backgroundColor: 
                                            cell.value === "W"
                                          ? "#2196F3"
                                          : cell.value === "A"
                                          ? "#19D895"
                                          : cell.value === "D"
                                          ? "#FF6258"
                                          : null, color: "white", padding: "5px", borderRadius: "5px", fontWeight: "bold" }}>
                                            {cell.value === "W"
                                              ? "Awaiting (W)"
                                              : cell.value === "A"
                                              ? "Approvel (A)"
                                              : cell.value === "D"
                                              ? "Disapprovel (D)"
                                              : cell.render('Cell')}
                                          </span>
                                        )}
                                        {index !== 3 && cell.render('Cell')}
                                        </td>
                                      );
                                    }
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>

                      </table>
                  </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkRequest;
