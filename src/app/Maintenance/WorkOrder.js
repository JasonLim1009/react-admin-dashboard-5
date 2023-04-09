import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import Swal from "sweetalert2";
import APIServices from "../services/APIServices";

function WorkOrder(props) {
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

  const [showComplete, setShowComplete] = useState(false);
  const handleCloseComplete = () => setShowComplete(false);
  const handleShowComplete = (result) => {

    if (result.wko_mst_status === 'A' || result.wko_mst_status === "D" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The record update cannot be done because the record had been updated by another user. Kindly retrieve the Work Request again to continue.',
      });
      return; 
    }
      
    console.log(result);
    sethandlesresult(result)
    setShowComplete(true)

  };

  const [handlesresult, sethandlesresult] = useState([]);

  const [showClose, setShowClose] = useState(false);
  const handleCloseClose = () => setShowClose(false);
  const handleShowClose = (result) => {

    if (result.wko_mst_status === 'D' || result.wko_mst_status === "A" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The record update cannot be done because the record had been updated by another user. Kindly retrieve the Work Request again to continue.',
      });
      return; 
    }

    console.log(result)
    sethandlesresult(result);
    setShowClose(true)

  };


  const get_workordermaster = (site_ID) => {
    APIServices.get_workordermaster(site_ID, page, pageSize)
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
    console.log(props.name);
    get_workordermaster(site_ID);
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


      if (result.wko_mst_org_date == null) {
        var wkom_org_date = ''
      } else {

        var wkom_org_date = format(new Date(result.wko_mst_org_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_mst_due_date == null) {
        var wkom_due_date = ''
      } else {

        var wkom_due_date = format(new Date(result.wko_mst_due_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_cmpl_date == null) {
        var wkod_cmpl_date = ''
      } else {

        var wkod_cmpl_date = format(new Date(result.wko_det_cmpl_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_clo_date == null) {
        var wkod_clo_date = ''
      } else {

        var wkod_clo_date = format(new Date(result.wko_det_clo_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_sched_date == null) {
        var wkod_sched_date = ''
      } else {

        var wkod_sched_date = format(new Date(result.wko_det_sched_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_exc_date == null) {
        var wkod_exc_date = ''
      } else {

        var wkod_exc_date = format(new Date(result.wko_det_exc_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_datetime1 == null) {
        var wkod_date1 = ''
      } else {

        var wkod_date1 = format(new Date(result.wko_det_datetime1.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_datetime2 == null) {
        var wkod_date2 = ''
      } else {

        var wkod_date2 = format(new Date(result.wko_det_datetime2.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_datetime3 == null) {
        var wkod_date3 = ''
      } else {

        var wkod_date3 = format(new Date(result.wko_det_datetime3.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_datetime4 == null) {
        var wkod_date4 = ''
      } else {

        var wkod_date4 = format(new Date(result.wko_det_datetime4.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_det_datetime5 == null) {
        var wkod_date5 = ''
      } else {

        var wkod_date5 = format(new Date(result.wko_det_datetime5.date), "dd/MM/yyyy HH:MM")

      }

      if (result.wko_mst_create_date == null) {
        var wkom_create_date = ''
      } else {

        var wkom_create_date = format(new Date(result.wko_mst_create_date.date), "dd/MM/yyyy HH:MM")

      }

      return (
        <tr key={result.site_cd}  onDoubleClick={(event) =>handleRowClick(result, event)}
              onMouseEnter={() => setHoveredRow(result)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{ backgroundColor: hoveredRow === result ? '#BCC9F5' : 'white' }}
            >
          <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
          <td>{result.wko_mst_wo_no}  
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {hoveredRow === result && (
                  <div className="template-demo">
                      <button
                          type="button"
                          onClick={() => handleShowComplete(result)}
                          className="btn btn-success btn-icon-text"
                          title="Complete"
                          style={{width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                          // disabled={result.wko_mst_status === "A" || result.wko_mst_status === "D"}
                        >
                          <i className="mdi mdi-file-check btn-icon-prepend"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShowClose(result)}
                          className="btn btn-danger btn-icon-text"
                          title="Close"
                          style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                          // disabled={result.wko_mst_status === "D" || result.wko_mst_status === "A"}
                        >
                          <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(result)}
                          className="btn btn-primary btn-icon-text"
                          title={result.wko_mst_status === 'OPE' || result.wko_mst_status === 'WIP' || result.wko_mst_status === 'AWC'  ? 'Edit' : 'View'}
                          style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                        >
                          <i className={result.wko_mst_status === 'OPE' || result.wko_mst_status === 'WIP' || result.wko_mst_status === 'AWC'  ? 'mdi mdi-file-document btn-icon-prepend' : 'mdi mdi-television-guide btn-icon-prepend'}></i>
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
          <td>{result.wko_mst_assetno}</td>
          <td>{result.wko_det_parent_wo}</td>
          <td>{result.wko_mst_pm_grp}</td>
          <td>
            <span style={{ 
                  backgroundColor: 
                    result.wko_mst_status === 'CMP' ? '#2196F3' : 
                    result.wko_mst_status === 'OPE' || result.wko_mst_status === 'WIP' || result.wko_mst_status === 'AWC' ? '#19D895' :
                    result.wko_mst_status === 'CLO' ? '#FF6258' :
                    result.wko_mst_status === 'CNX' ? '#FFE152' :
                    null, 
                  color: 'white', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  fontSize:'13px',
                  fontWeight: 'bold'
                }}>
              { result.wko_mst_status === 'CMP' ? 'Completed (CMP)' :
                result.wko_mst_status === 'OPE' || result.wko_mst_status === 'WIP' || result.wko_mst_status === 'AWC' ? 'Open (OPEN)' :
                result.wko_mst_status === 'CLO' ? 'Closed (CLO)' :
                result.wko_mst_status === 'CNX' ? 'Cancel (CNX)' :
                result.wko_mst_status}
            </span>
          </td>
          <td>{result.wko_mst_descs}</td>
          <td>{result.wko_mst_chg_costcenter}</td>
          <td>{wkom_org_date}</td>
          <td>{wkom_due_date}</td>
          <td>{wkod_cmpl_date}</td>

          <td>{wkod_clo_date}</td>
          <td>{result.wko_mst_originator}</td>
          {/* <td>{result.originator_name}</td> */}
          <td>{result.wko_det_assign_to}</td>
          {/* <td>{result.assign_to_name}</td> */}
          <td>{result.wko_det_planner}</td>
          <td>{result.wko_mst_flt_code}</td>
          <td>{result.wko_det_cause_code}</td>
          <td>{result.wko_det_act_code}</td>
          <td>{result.wko_det_corr_action}</td>

          <td>{result.wko_mst_phone}</td>
          <td>{result.wko_mst_project_id}</td>
          <td>{result.wko_mst_work_area}</td>
          <td>{result.wko_mst_asset_location}</td>
          <td>{result.wko_mst_asset_level}</td>
          <td>{result.wko_mst_asset_group_code}</td>
          <td>{result.wko_mst_orig_priority}</td>
          <td>{result.wko_mst_plan_priority}</td>
          <td>{result.wko_det_temp_asset}</td>
          <td>{result.wko_det_wr_no}</td>

          <td>{result.wko_det_perm_id}</td>
          <td>{result.wko_det_work_type}</td>
          <td>{result.wko_det_work_class}</td>
          <td>{result.wko_det_work_grp}</td>
          <td>{wkod_sched_date}</td>
          <td>{wkod_exc_date}</td>
          <td>{result.wko_det_contract_no}</td>
          <td>{result.wko_det_delay_cd}</td>
          <td>{result.wko_det_customer_cd}</td>
          <td>{result.wko_det_supv_id}</td>

          <td>{result.wko_det_est_con_cost}</td>
          <td>{result.wko_det_con_cost}</td>
          <td>{result.wko_det_est_mtl_cost}</td>
          <td>{result.wko_det_mtl_cost}</td>
          <td>{result.wko_det_est_lab_cost}</td>
          <td>{result.wko_det_varchar1}</td>
          <td>{result.wko_det_varchar2}</td>
          <td>{result.wko_det_varchar3}</td>
          <td>{result.wko_det_varchar4}</td>
          <td>{result.wko_det_varchar5}</td>

          <td>{result.wko_det_varchar6}</td>
          <td>{result.wko_det_varchar7}</td>
          <td>{result.wko_det_varchar8}</td>
          <td>{result.wko_det_varchar9}</td>
          <td>{result.wko_det_varchar10}</td>
          <td>{result.wko_det_numeric1}</td>
          <td>{result.wko_det_numeric2}</td>
          <td>{result.wko_det_numeric3}</td>
          <td>{result.wko_det_numeric4}</td>
          <td>{result.wko_det_numeric5}</td>

          <td>{wkod_date1}</td>
          <td>{wkod_date2}</td>
          <td>{wkod_date3}</td>
          <td>{wkod_date4}</td>
          <td>{wkod_date5}</td>

          <td>{result.wko_mst_create_by}</td>
          <td>{wkom_create_date}</td>

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
    history.push("/WorkOrderFrom-1", { RowID: data.RowID , Workorderno : data.wko_mst_wo_no });
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleNewClick = () => {
    history.push("/WorkOrderFrom-1", { select: "New_WorkOrder" });
  };

  //Search
  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.wko_mst_wo_no.toLowerCase().includes(e.toLowerCase())
        // item.wko_mst_assetno.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_status.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_descs.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_chg_costcenter.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_originator.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_det_assign_to.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_flt_code.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_det_cause_code.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_det_act_code.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_det_corr_action.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_phone.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_work_area.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_asset_location.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_asset_level.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_asset_group_code.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_det_work_type.toLowerCase().includes(e.toLowerCase()) ||
        // item.wko_mst_create_by.toLowerCase().includes(e.toLowerCase())

      );
      setResult(a); //what data u want to be searched

    }
  };
  

  //Edit Button
  const handleEdit = (data) => {
    //console.log(data)
    history.push("/WorkOrderFrom-1", { RowID: data.RowID , Workorderno : data.wko_mst_wo_no});
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



  

  return (
    <div>
      <div className="page-header" style={{ marginTop: "10px", marginBottom:"10px" }}>
        <h3 className="page-title">Work Order</h3>
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
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New
                </button>

                {showButton &&<button
                  type="button"
                  className="btn btn-outline-success btn-icon-text"
                  //onClick={handleNewClick}
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> Complete WO
                </button>}

                {showButton &&<button
                  type="button"
                  className="btn btn-outline-danger btn-icon-text"
                  //onClick={handleNewClick}
                >
                  <i className="mdi mdi-do-not-disturb btn-icon-prepend"></i> Close WO
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

export default WorkOrder;
