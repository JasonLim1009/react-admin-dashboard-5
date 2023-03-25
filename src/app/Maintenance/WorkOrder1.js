import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import APIServices from "../services/APIServices";

import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';

import Swal from "sweetalert2";

function WorkOrder() {
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



  const get_workordermaster = (site_ID) => {
    APIServices.get_workordermaster(site_ID, page, pageSize)
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
    get_workordermaster(site_ID);
  }, [page, pageSize]);


  const renderTableHeader = () => {
    return Object.keys(Header).map((attr) => (
      <th key={attr}> {attr.toUpperCase()} </th>
    ));
  };

  const renderTableRows = () => {
    return Result.map((result) => {


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
        <tr key={result.site_cd} onClick={() => handleRowClick(result)}>

          <td>{result.wko_mst_wo_no}</td>
          <td>{result.wko_mst_assetno}</td>
          <td>{result.wko_det_parent_wo}</td>
          <td>{result.wko_mst_pm_grp}</td>
          <td>{result.wko_mst_status}</td>
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



  // ******************************** RowID: check and read data ***********************************************
  const handleRowClick = (data) => {
      console.log(data.col67);
      history.push("/WorkOrderFrom-1", { RowID: data.col67 });
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


  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.wko_mst_wo_no.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_assetno.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_status.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_descs.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_chg_costcenter.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_originator.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_det_assign_to.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_flt_code.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_det_cause_code.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_det_act_code.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_det_corr_action.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_phone.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_work_area.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_asset_location.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_asset_level.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_asset_group_code.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_det_work_type.toLowerCase().includes(e.toLowerCase()) ||
        item.wko_mst_create_by.toLowerCase().includes(e.toLowerCase())

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


const [hoveredRow, setHoveredRow] = useState(null);
const handleEdit = (data) => {
  history.push("/WorkOrderFrom-1", { RowID: data.col67 });
};

const handleDelete = (data) => {
  // Delete
};



  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Work Order</h3>
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
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New Work Order
                </button>

                {showButton &&<button
                  type="button"
                  className="btn btn-outline-success btn-icon-text"
                  onClick={handleNewClick}
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> Complete WO
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



                                  if (index === row.cells.length - 66) {
                                    return (
                                      <td {...cell.getCellProps()} colSpan={1}>
                                        {cell.render('Cell')}

                                           {hoveredRow === row.id && (
                                          <div className="col-form-label" style={{ backgroundColor: "#F3F3F3", padding: "2px", borderRadius: "5px", position: 'absolute', left: 197, transform: "translateY(-69%)" }}>
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

export default WorkOrder;
