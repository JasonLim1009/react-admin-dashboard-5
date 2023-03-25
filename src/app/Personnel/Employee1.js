import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import APIServices from "../services/APIServices";

import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';

import Swal from "sweetalert2";

function Employee() {
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



  const get_employeemaster = (site_ID) => {
    APIServices.get_employeemaster(site_ID, page, pageSize)
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
    get_employeemaster(site_ID);
  }, [page, pageSize]);


  const renderTableHeader = () => {
    return Object.keys(Header).map((attr) => (
      <th key={attr}> {attr.toUpperCase()} </th>
    ));
  };

  const renderTableRows = () => {
    return Result.map((result) => {
     // console.log(result.emp_mst_create_date.date);

      if (result.emp_mst_dateofhire == null) {
        var empbd_hire =''
      } else {

        var empbd_hire = format(new Date(result.emp_mst_dateofhire.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_mst_date_of_birth == null) {
        var empbd =''
      } else {

        var empbd = format(new Date(result.emp_mst_date_of_birth.date),"dd/MM/yyyy")
        
      }

      if (result.emp_mst_create_date == null) {
        var cr =''
      } else {

        var cr = format(new Date(result.emp_mst_create_date.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_mst_create_date == null) {
        var cr =''
      } else {

        var cr = format(new Date(result.emp_mst_create_date.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime1 == null) {
        var emp_1 =''
      } else {

        var emp_1 = format(new Date(result.emp_det_datetime1.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime2 == null) {
        var emp_2 =''
      } else {

        var emp_2 = format(new Date(result.emp_det_datetime2.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime3 == null) {
        var emp_3 =''
      } else {

        var emp_3 = format(new Date(result.emp_det_datetime3.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime4 == null) {
        var emp_4 =''
      } else {

        var emp_4 = format(new Date(result.emp_det_datetime4.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime5 == null) {
        var emp_5 =''
      } else {

        var emp_5 = format(new Date(result.emp_det_datetime5.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime6 == null) {
        var emp_6 =''
      } else {

        var emp_6 = format(new Date(result.emp_det_datetime6.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime7 == null) {
        var emp_7 =''
      } else {

        var emp_7 = format(new Date(result.emp_det_datetime7.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime8 == null) {
        var emp_8 =''
      } else {

        var emp_8 = format(new Date(result.emp_det_datetime8.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime9 == null) {
        var emp_9 =''
      } else {

        var emp_9 = format(new Date(result.emp_det_datetime9.date),"dd/MM/yyyy HH:MM")
        
      }

      if (result.emp_det_datetime10 == null) {
        var emp_10 =''
      } else {

        var emp_10 = format(new Date(result.emp_det_datetime10.date),"dd/MM/yyyy HH:MM")
        
      }

      return (
        <tr key={result.site_cd} onClick={() => handleRowClick(result)}>
        
          <td>{result.emp_mst_empl_id}</td>
          <td>{result.emp_mst_login_id}</td>
          <td>{result.emp_mst_usr_grp}</td>
          <td>{result.emp_mst_privilege_template}</td>
          <td>{result.emp_mst_name}</td>
          <td>{result.emp_mst_title}</td>
          <td>{result.emp_mst_status}</td>
          <td>{result.emp_det_supervisor_id}</td>
          <td>{result.emp_mst_homephone}</td>
          <td>{result.emp_mst_emg_name}</td>
          <td>{result.emp_mst_emg_phone}</td>
          <td>
            {empbd_hire}
          </td>
          <td>{result.emp_mst_sex}</td>

          <td>
            {empbd}
          </td>
          <td>{result.emp_mst_marital_status}</td>
          <td>{result.emp_mst_payrate}</td>
          <td>{result.emp_mst_pay_period}</td>
          <td>{result.emp_mst_remarks}</td>

          <td>{result.emp_mst_create_by}</td>
          <td>
         { cr}
          </td>
          <td>{result.emp_det_mr_approver}</td>
          <td>{result.emp_det_mr_limit}</td>
          <td>{result.emp_det_wo_budget_approver}</td>
          <td>{result.emp_det_wo_approval_limit}</td>
          <td>{result.emp_det_pr_approver}</td>
          <td>{result.emp_det_pr_approval_limit}</td>

          <td>{result.emp_det_wr_approver}</td>
          <td>{result.emp_det_planner}</td>
          <td>{result.emp_det_wo_gen_mr_pr}</td>
          <td>{result.emp_det_time_card_enter}</td>
          <td>{result.emp_det_time_card_void}</td>
          <td>{result.emp_det_wo_sched}</td>
          <td>{result.emp_det_po_buyer}</td>
          <td>{result.emp_det_supervisor}</td>
          <td>{result.emp_det_foreman}</td>
          <td>{result.emp_det_asset_tag_flag}</td>
          {/* <td>{result.emp_det_msetup_mobile_user}</td> */}
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

          <td>{emp_1}</td>
          <td>{emp_2}</td>
          <td>{emp_3}</td>
          <td>{emp_4}</td>
          <td>{emp_5}</td>
          <td>{emp_6}</td>
          <td>{emp_7}</td>
          <td>{emp_8}</td>
          <td>{emp_9}</td>
          <td>{emp_10}</td>

          <td>{result.emp_det_pm_generator}</td>
          
        </tr>
      );
    });
  };


  
  // ******************************** RowID: check and read data ***********************************************
  const handleRowClick = (data) => {
    console.log(data.col88);
    history.push("/PersonnelFrom-1", { RowID: data.col88 });
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


  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.emp_mst_empl_id.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_login_id.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_usr_grp.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_name.toLowerCase().includes(e.toLowerCase()) ||
        item.emp_mst_title.toLowerCase().includes(e.toLowerCase()) 
        
      );
      setResult(a); //what data u want to be searched

    }
  };



  const [columns, setcolumns] = useState([]);
  const [data, setdata] = useState([]);
  const [showButton, setShowButton] = useState(false);
  
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, onChange, ...rest }, ref) => {
      
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
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


const [hoveredRow, setHoveredRow] = useState(null);
const handleEdit = (data) => {
  history.push("/PersonnelFrom-1", { RowID: data.col88 });
};

const handleDelete = (data) => {
  // Delete
};



  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Personnel</h3>
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
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New
                  Personnel
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
                          <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                              console.log(row.cells.length);
                              
                              prepareRow(row)
                              return (
                                <tr {...row.getRowProps()} 
                                    onDoubleClick={(event) => handleRowClick(row.original, event)}
                                    onMouseEnter={() => setHoveredRow(row.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                {row.cells.map((cell, index) => {



                                  if (index === row.cells.length - 85) {
                                    return (
                                      <td {...cell.getCellProps()} colSpan={1}>
                                        {cell.render('Cell')}

                                           {hoveredRow === row.id && (
                                          <div className="col-form-label" style={{ backgroundColor: "#F3F3F3", padding: "2px", borderRadius: "5px", position: 'absolute', left: 184, transform: "translateY(-69%)" }}>
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
                                        <td {...cell.getCellProps()}>
                                          {cell.render('Cell')}
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

export default Employee;
