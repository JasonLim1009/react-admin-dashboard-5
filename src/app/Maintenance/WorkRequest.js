import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import Swal from "sweetalert2";
import APIServices from "../services/APIServices";

import '../style.css';
import Select from 'react-select';
import { Form, Modal, Button } from 'react-bootstrap';
import  {useLocation}  from 'react-router-dom';
import Moment from 'moment';


function WorkRequest(props) {

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

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState(Result.map(() => false));

  const [showButton, setShowButton] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const [Status, setStatus] = useState([]);
  const [selected_Status, setSelected_Status] = useState([]);

  const [Originator, setOriginator] = useState([]);
  const [selected_Originator, setSelected_Originator] = useState([]);

  const [WorkGroup, setWorkGroup] = useState([]);
  const [selected_WorkGroup, setSelected_WorkGroup] = useState([]);

  const [showApprove, setShowApprove] = useState(false);
  const handleCloseApprove = () => setShowApprove(false);
  const handleShowApprove = (result) => {

    if (result.wkr_mst_wr_status === 'A' || result.wkr_mst_wr_status === "D" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The record update cannot be done because the record had been updated by another user. Kindly retrieve the Work Request again to continue.',
      });
      return; 
    }
      
    console.log(result);
    sethandlesresult(result)
    setShowApprove(true)

  };

  const [RejectBy, setRejectBy] = useState("");
  const [RejectBy_disabled, setRejectBy_disabled] = useState(false);

  const [RejectDate, setRejectDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

  const [RejectedDescription, setRejectedDescription] = useState("");

  const [handlesresult, sethandlesresult] = useState([]);

  const [showDisapprove, setShowDisapprove] = useState(false);
  const handleCloseDisapprove = () => setShowDisapprove(false);
  const handleShowDisapprove = (result) => {

    if (result.wkr_mst_wr_status === 'D' || result.wkr_mst_wr_status === "A" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The record update cannot be done because the record had been updated by another user. Kindly retrieve the Work Request again to continue.',
      });
      return; 
    }

    console.log(result)
    sethandlesresult(result);
    setShowDisapprove(true)

  };

  const location = useLocation();

  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");


  const get_WorkRequestmaster = (site_ID) => {

    APIServices.get_WorkRequestmaster(site_ID, page, pageSize)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          console.log("RESPONSE", responseJson.data.data.header);
          console.log(responseJson.data.totalPages);
          
          setCount(responseJson.data.totalPages);
          setHeader(responseJson.data.data.header);
          setResult(responseJson.data.data.result);
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

    let LOGINID = localStorage.getItem("emp_mst_login_id");
    setRejectBy(LOGINID);
    console.log('setRejectBy: ',LOGINID);

    console.log(props.name);
    get_WorkRequestmaster(site_ID);
  }, [page, pageSize]);


  //Header
  const renderTableHeader = () => {
    return (
      <>
        <th key="select">
          <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} />
        </th>
        {Object.keys(Header).map((attr) => (
          <th key={attr}> {attr.toUpperCase()}</th>
        ))}
      </>
    );
  };
  
  //Body
  const renderTableRows = () => {
      return Result.map((result, index) => {
        
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
  

        return (
  
          
        <tr key={result.site_cd}  onDoubleClick={(event) =>handleRowClick(result, event)}
              onMouseEnter={() => setHoveredRow(result)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{ backgroundColor: hoveredRow === result ? '#BCC9F5' : 'white' }}
            >
          <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
          <td>{result.wkr_mst_wr_no}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {hoveredRow === result && (
                  <div className="template-demo">
                      <button
                        type="button"
                        onClick={() => handleShowApprove(result)}
                        className="btn btn-success btn-icon-text"
                        title="Approve"
                        style={{width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                        // disabled={result.wkr_mst_wr_status === "A" || result.wkr_mst_wr_status === "D"}
                      >
                        <i className="mdi mdi-file-check btn-icon-prepend"></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShowDisapprove(result)}
                        className="btn btn-danger btn-icon-text"
                        title="Disapprove"
                        style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                        // disabled={result.wkr_mst_wr_status === "D" || result.wkr_mst_wr_status === "A"}
                      >
                        <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(result)}
                        className="btn btn-primary btn-icon-text"
                        title={result.wkr_mst_wr_status === 'W' ? 'Edit' : 'View'}
                        style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                      >
                        <i className={result.wkr_mst_wr_status === 'W' ? 'mdi mdi-file-document btn-icon-prepend' : 'mdi mdi-television-guide btn-icon-prepend'}></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(result)}
                        className="btn btn-warning btn-icon-text"
                        title="Delete"
                        style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%" }}
                      >
                        <i className="mdi mdi-delete-forever btn-icon-prepend"></i>
                      </button>
                  </div>
                )}
          </td>
          <td>{result.wkr_mst_wr_descs.length > 50 ? result.wkr_mst_wr_descs.slice(2, 50) + "..." : result.wkr_mst_wr_descs}
          </td>
          {/* <td>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre-wrap', maxHeight: '40px', lineHeight: '20px' }}>
              {result.wkr_mst_wr_descs}
            </div>
          </td> */}
          <td>
            <span style={{ 
                  backgroundColor: 
                    result.wkr_mst_wr_status === 'W' ? '#2196F3' : 
                    result.wkr_mst_wr_status === 'A' ? '#19D895' :
                    result.wkr_mst_wr_status === 'D' ? '#FF6258' :
                    null, 
                  color: 'white', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  fontSize:'13px',
                  fontWeight: 'bold'
                }}>
              { result.wkr_mst_wr_status === 'W' ? 'Awaiting (W)' :
                result.wkr_mst_wr_status === 'A' ? 'Approve (A)' :
                result.wkr_mst_wr_status === 'D' ? 'Disapprove (D)' :
                result.wkr_mst_wr_status}
            </span>
          </td>
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

          <td>{result.wkr_det_wo}</td>
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


  //Checkbox
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, onChange, ...rest }, ref) => {
      
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      const handleChange = (event) => {
        onChange(event);
        //setShowButton(event.target.checked);
      };
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} onChange={handleChange} {...rest} />
        </>
      )
    }
  )

  const handleHeaderCheckboxChange = () => {
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
    setIsCheckedList(Result.map(() => !isHeaderCheckboxChecked));
  };

  const handleCheckboxChange = (index) => {
    const newCheckedList = [...isCheckedList];
    newCheckedList[index] = !isCheckedList[index];
    setIsCheckedList(newCheckedList);
  };

  useEffect(() => {
    const isAtLeastOneChecked = isCheckedList.some((isChecked) => isChecked);
    setShowButton(isAtLeastOneChecked);
  }, [isCheckedList]);

// ******************************** RowID: check and read data ***********************************************
  const handleRowClick = (data) => {
    console.log(data.RowID)
    history.push("/WorkRequestForm-1", { RowID: data.RowID });
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

  //Search
  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e === "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.wkr_mst_wr_no.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_wr_descs.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_wr_status.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_assetno.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_chg_costcenter.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_work_area.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_assetlocn.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_location.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_temp_asset.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_email_notification.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_work_group.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_originator.toLowerCase().includes(e.toLowerCase()) ||
        item.wkr_mst_phone.toLowerCase().includes(e.toLowerCase()) 

      );
      setResult(a); //what data u want to be searched

    }
  };
  

  //Edit Button
  const handleEdit = (data) => {
    history.push("/WorkRequestForm-1", { RowID: data.RowID });
  };

  //Delete Button
  const handleDelete = (data) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to delete the record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // Delete function code goes here
        
      }
    });
  };


  const get_dropdown = (site_ID, type, selected_asset) => {

  Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
  Swal.showLoading()

  APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

 
      if (responseJson.data.status === 'SUCCESS') {

         console.log('get_dropdown', responseJson.data)

          let Status = responseJson.data.data.WKO_Status.map(item => ({
              label:  item.wrk_sts_desc,
              value: item.wrk_sts_status +" : "+item.wrk_sts_desc            
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
              
              
          Swal.close();
          setButton_save("Approve")


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

  useEffect(() => {

  let site_ID = localStorage.getItem("site_ID");

  get_dropdown(site_ID, "All");       
 
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

                if(Button_save ==  "Approve"){

                  handleCloseApprove();
                  WorkRequest_Approval();
                  console.log("Approve button clicked here!");
  
                }
                
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


  //Approval
  const WorkRequest_Approval = () => {

  let site_ID = localStorage.getItem("site_ID");

  let EmpID = localStorage.getItem("emp_mst_empl_id");
  console.log('get EmpID here...', EmpID);
  
  console.log(localStorage);

  let EmpName = localStorage.getItem("emp_mst_name");
  console.log("EMP_Name: ", EmpName);

  let LOGINID = localStorage.getItem("emp_mst_login_id");
  console.log('get LOGINID here...', LOGINID);

  //let hoveredRow = localStorage.getItem("RowID");
  console.log('get RowID here...', handlesresult.RowID);

    
console.log(selected_Status);

    let Status, setStatus;
    if(selected_Status == '' || selected_Status == null){

        setStatus=''
    }else{

        Status = selected_Status.split(":")
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

    "RowID": handlesresult.RowID,
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

  //Disapproval
  const WorkRequest_Disapproval = () => {

  let site_ID = localStorage.getItem("site_ID");

  let EmpID = localStorage.getItem("emp_mst_empl_id");
  console.log('get EmpID here...', EmpID);

  let EmpName = localStorage.getItem("emp_mst_name");
  let LOGINID = localStorage.getItem("emp_mst_login_id");
  console.log('get LOGINID here...', LOGINID);

  //let hoveredRow = localStorage.getItem("RowID");
  console.log('get RowID here...',handlesresult.RowID);
  

  //Select Reject By
  console.log("RejectBy: ", LOGINID);

  //Select Rejected Description
  console.log("RejectedDescription: ", RejectedDescription);
    
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
    "wkr_det_reject_by": LOGINID,
    "wkr_det_reject_desc": RejectedDescription.trim(),
    "wkr_det_reject_date": date_of_reject,

    "RowID": handlesresult.RowID,
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
      <div className="page-header" style={{ marginTop: "10px", marginBottom:"10px" }}>
        <h3 className="page-title">Work Request</h3>
      </div>
      <div>
        <div className="card" style={{marginLeft: "-3px", marginRight: "-3px"}}>
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

              <div className="col searchButton-md">
                <SearchBar
                  className="form-control"
                  onChange={(e) => setFiltereddata(e)}
                  value={search}
                />
              </div>

              <div className="col searchButton-md">
                <button type="button" className="btn btn-primary btn-rounded">
                  Search
                </button>
              </div>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <div className="template-demo moveUpFilterButton-md moveUpFilterButton-sm">
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
              <div className="template-demo moveUp3Button-md" isVisible={show}>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-icon-text"
                  onClick={handleNewClick}
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New
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
                  <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i> Disapprove
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
                <div className="row moveUpPaginationButton-md moveUpPaginationButton-sm">
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
                                          label={status.value}
                                          name="status"
                                          value={status.value}
                                          checked={selected_Status === status.value}
                                          onChange={(e) => setSelected_Status(e.target.value)}
                                          //onChange={(e) => console.log(e.target.value)}
                                          required
                                      />
                                  ))}
                                </div>
                            </Form.Group>

                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
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
                        <i className="mdi mdi-file-check btn-icon-prepend"></i>{Button_save}
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
                                <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={RejectBy} readOnly/>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
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


            <div className="table-responsive">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkRequest;
