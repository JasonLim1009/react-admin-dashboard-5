import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import Swal from "sweetalert2";
import APIServices from "../services/APIServices";
import '../style.css';

function Employee(props) {
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



  const get_employeemaster = (site_ID) => {
    APIServices.get_employeemaster(site_ID, page, pageSize)
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
    get_employeemaster(site_ID);
  }, [page, pageSize]);


  //Header
  const renderTableHeader = () => {
    return (
      <>
        <th key="select">
          <IndeterminateCheckbox checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} />
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


      if (result.emp_mst_dateofhire == null) {
        var dateofhire = ''
      } else {

        var dateofhire = format(new Date(result.emp_mst_dateofhire.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_mst_date_of_birth == null) {
        var dateofbirth = ''
      } else {

        var dateofbirth = format(new Date(result.emp_mst_date_of_birth.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_mst_create_date == null) {
        var dateofcreate = ''
      } else {

        var dateofcreate = format(new Date(result.emp_mst_create_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime1 == null) {
        var emp_date1 = ''
      } else {

        var emp_date1 = format(new Date(result.emp_det_datetime1.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime2 == null) {
        var emp_date2 = ''
      } else {

        var emp_date2 = format(new Date(result.emp_det_datetime2.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime3 == null) {
        var emp_date3 = ''
      } else {

        var emp_date3 = format(new Date(result.emp_det_datetime3.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime4 == null) {
        var emp_date4 = ''
      } else {

        var emp_date4 = format(new Date(result.emp_det_datetime4.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime5 == null) {
        var emp_date5 = ''
      } else {

        var emp_date5 = format(new Date(result.emp_det_datetime5.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime6 == null) {
        var emp_date6 = ''
      } else {

        var emp_date6 = format(new Date(result.emp_det_datetime6.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime7 == null) {
        var emp_date7 = ''
      } else {

        var emp_date7 = format(new Date(result.emp_det_datetime7.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime8 == null) {
        var emp_date8 = ''
      } else {

        var emp_date8 = format(new Date(result.emp_det_datetime8.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime9 == null) {
        var emp_date9 = ''
      } else {

        var emp_date9 = format(new Date(result.emp_det_datetime9.date), "dd/MM/yyyy HH:MM")

      }

      if (result.emp_det_datetime10 == null) {
        var emp_date10 = ''
      } else {

        var emp_date10 = format(new Date(result.emp_det_datetime10.date), "dd/MM/yyyy HH:MM")

      }

      return (
        <tr key={result.site_cd}  onDoubleClick={(event) =>handleRowClick(result, event)}
          onMouseEnter={() => setHoveredRow(result)}
          onMouseLeave={() => setHoveredRow(null)}
          style={{ backgroundColor: hoveredRow === result ? '#BCC9F5' : 'white' }}
        >
          <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
          <td>{result.emp_mst_empl_id}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {hoveredRow === result && (
                      <div className="template-demo">
                          <button
                            type="button"
                            onClick={() => handleEdit(result)}
                            className="btn btn-primary btn-icon-text"
                            title="Edit"
                            style={{width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                          >
                            <i className="mdi mdi-file-document btn-icon-prepend"></i>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(result)}
                            className="btn btn-warning btn-icon-text"
                            title="Delete"
                            style={{marginLeft: "-12px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                          >
                            <i className="mdi mdi-delete-forever btn-icon-prepend"></i>
                          </button>
                      </div>
                  )}
          </td>
          <td>{result.emp_mst_login_id}</td>
          <td>{result.emp_mst_usr_grp}</td>
          <td>{result.emp_mst_privilege_template}</td>
          <td>{result.emp_mst_name}</td>
          <td>{result.emp_mst_title}</td>
          <td>{result.emp_mst_status}</td>
          <td>{result.emp_det_supervisor_id}</td>
          <td>{result.emp_supervisor_name}</td>
          <td>{result.emp_mst_homephone}</td>

          <td>{result.emp_mst_emg_name}</td>
          <td>{result.emp_mst_emg_phone}</td>
          <td>{dateofhire}</td>
          <td>{result.emp_mst_sex}</td>
          <td>{dateofbirth}</td>
          <td>{result.emp_mst_marital_status}</td>
          <td>{result.emp_mst_payrate}</td>
          <td>{result.emp_mst_pay_period}</td>
          <td>{result.emp_mst_remarks}</td>
          <td>{result.emp_mst_create_by}</td>

          <td>{dateofcreate}</td>
          <td>{result.emp_det_mr_approver}</td>
          <td>{result.emp_det_mr_limit}</td>
          <td>{result.emp_det_wo_budget_approver}</td>
          <td>{result.emp_det_wo_approval_limit}</td>
          <td>{result.emp_det_pr_approver}</td>
          <td>{result.emp_det_pr_approval_limit}</td>
          <td>{result.emp_det_wr_approver}</td>
          <td>{result.emp_det_planner}</td>
          <td>{result.emp_det_wo_gen_mr_pr}</td>

          <td>{result.emp_det_pm_generator}</td>
          <td>{result.emp_det_time_card_enter}</td>
          <td>{result.emp_det_time_card_void}</td>
          <td>{result.emp_det_wo_sched}</td>
          <td>{result.emp_det_po_buyer}</td>
          <td>{result.emp_det_supervisor}</td>
          <td>{result.emp_det_foreman}</td>
          <td>{result.emp_det_asset_tag_flag}</td>
          {/* <td>{result.emp_det_msetup_mobile_user}</td> */}
          <td>{result.emp_det_checklist}</td>
          <td>{result.emp_det_mobile}</td>
          <td>{result.emp_det_core}</td>
          <td>{result.emp_det_webwork}</td>
          <td>{result.emp_det_email_id}</td>

          <td>{result.emp_det_craft}</td>
          <td>{result.emp_det_work_area}</td>
          <td>{result.emp_det_work_grp}</td>
          <td>{result.emp_det_shift}</td>
          <td>{result.emp_det_varchar1}</td>
          <td>{result.emp_det_varchar2}</td>
          <td>{result.emp_det_varchar3}</td>
          <td>{result.emp_det_varchar4}</td>
          <td>{result.emp_det_varchar5}</td>
          <td>{result.emp_det_varchar6}</td>

          <td>{result.emp_det_varchar7}</td>
          <td>{result.emp_det_varchar8}</td>
          <td>{result.emp_det_varchar9}</td>
          <td>{result.emp_det_varchar10}</td>
          <td>{result.emp_det_varchar11}</td>
          <td>{result.emp_det_varchar12}</td>
          <td>{result.emp_det_varchar13}</td>
          <td>{result.emp_det_varchar14}</td>
          <td>{result.emp_det_varchar15}</td>
          <td>{result.emp_det_varchar16}</td>

          <td>{result.emp_det_varchar17}</td>
          <td>{result.emp_det_varchar18}</td>
          <td>{result.emp_det_varchar19}</td>
          <td>{result.emp_det_varchar20}</td>
          <td>{result.emp_det_numeric1}</td>
          <td>{result.emp_det_numeric2}</td>
          <td>{result.emp_det_numeric3}</td>
          <td>{result.emp_det_numeric4}</td>
          <td>{result.emp_det_numeric5}</td>
          <td>{result.emp_det_numeric6}</td>

          <td>{result.emp_det_numeric7}</td>
          <td>{result.emp_det_numeric8}</td>
          <td>{result.emp_det_numeric9}</td>
          <td>{result.emp_det_numeric10}</td>
          <td>{emp_date1}</td>
          <td>{emp_date2}</td>
          <td>{emp_date3}</td>
          <td>{emp_date4}</td>
          <td>{emp_date5}</td>
          <td>{emp_date6}</td>

          <td>{emp_date7}</td>
          <td>{emp_date8}</td>
          <td>{emp_date9}</td>
          <td>{emp_date10}</td>
          <td>{result.emp_det_note1}</td>
          <td>{result.emp_det_note2}</td>
          {/* <td>{result.RowID}</td> */}
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
    console.log(data)
    history.push("/PersonnelFrom-1", { RowID: data.RowID });
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleNewClick = () => {
    history.push("/PersonnelFrom-1", { select: "New_Employee" });
  };

  //Search
  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.emp_mst_empl_id.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_usr_grp.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_name.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_title.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_status.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_sex.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_marital_status.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_create_by.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_det_shift.toLowerCase().includes(e.toLowerCase())
      
        );
      setResult(a); //what data u want to be searched

    }
  };
  

  //Edit Button
  const handleEdit = (data) => {
    history.push("/PersonnelFrom-1", { RowID: data.RowID });
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
        <h3 className="page-title">Personnel</h3>
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
                  onClick={handleNewClick}
                >
                  <i className="mdi mdi-file-document btn-icon-prepend"></i> Edit
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

export default Employee;
