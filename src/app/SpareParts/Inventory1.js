import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import APIServices from "../services/APIServices";

import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';

import Swal from "sweetalert2";

function Inventory() {
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



  const get_inventorymaster = (site_ID) => {
    APIServices.get_inventorymaster(site_ID, page, pageSize)
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
    get_inventorymaster(site_ID);
  }, [page, pageSize]);


  const renderTableHeader = () => {
    return Object.keys(Header).map((attr) => (
      <th key={attr}> {attr.toUpperCase()} </th>
    ));
  };

  const renderTableRows = () => {
    return Result.map((result) => {

        if (result.itm_det_datetime1 == null) {
            var itm_date1 = ''
          } else {
    
            var itm_date1 = format(new Date(result.itm_det_datetime1.date), "dd/MM/yyyy HH:MM")
    
          }

          if (result.itm_det_datetime2 == null) {
            var itm_date2 = ''
          } else {
    
            var itm_date2 = format(new Date(result.itm_det_datetime2.date), "dd/MM/yyyy HH:MM")
    
          }

          if (result.itm_det_datetime3 == null) {
            var itm_date3 = ''
          } else {
    
            var itm_date3 = format(new Date(result.itm_det_datetime3.date), "dd/MM/yyyy HH:MM")
    
          }

          if (result.itm_det_datetime4 == null) {
            var itm_date4 = ''
          } else {
    
            var itm_date4 = format(new Date(result.itm_det_datetime4.date), "dd/MM/yyyy HH:MM")
    
          }

        if (result.itm_det_datetime5 == null) {
            var itm_date5 = ''
          } else {
    
            var itm_date5 = format(new Date(result.itm_det_datetime5.date), "dd/MM/yyyy HH:MM")
    
          }
    
          if (result.itm_mst_create_date == null) {
            var itm_create_date = ''
          } else {
    
            var itm_create_date = format(new Date(result.itm_mst_create_date.date), "dd/MM/yyyy HH:MM")
    
          }

      return (
        <tr key={result.site_cd} onClick={() => handleRowClick(result)}>

          <td>{result.itm_mst_type}</td>
          <td>{result.itm_mst_stockno}</td>
          <td>{result.itm_mst_mstr_locn}</td>
          <td>{result.itm_mst_costcenter}</td>
          <td>{result.itm_mst_itm_grp}</td>
          <td>{result.itm_mst_itm_use}</td>
          <td>{result.itm_mst_com_code}</td>
          <td>{result.itm_mst_account}</td>
          <td>{result.itm_mst_ttl_oh}</td>
          <td>{result.itm_mst_desc}</td>
          <td>{result.itm_mst_ext_desc}</td>
          <td>{result.itm_mst_issue_price}</td>
          <td>{result.itm_mst_order_rule}</td>
          <td>{result.itm_mst_partno}</td>

          <td>{result.itm_det_issue_uom}</td>
          <td>{result.itm_det_rcv_uom}</td>
          <td>{result.itm_det_auto_spare}</td>
          <td>{result.itm_det_critical_spare}</td>
          <td>{result.itm_det_abc_class}</td>
          <td>{result.itm_det_storage_type}</td>
          
          <td>{result.itm_det_tax_cd}</td>
          <td>{result.itm_det_part_deac_status}</td>
          <td>{result.itm_det_order_pt}</td>
          <td>{result.itm_det_maximum}</td>
          <td>{result.itm_det_ytd_stockouts}</td>
          <td>{result.itm_det_std_cost}</td>
          <td>{result.itm_det_avg_cost}</td>
          <td>{result.itm_det_last_cost}</td>
          <td>{result.itm_det_ttl_hard_resrv}</td>
          <td>{result.itm_det_ttl_short}</td>
          <td>{result.itm_det_ttl_repair}</td>

          <td>{result.itm_det_varchar1}</td>
          <td>{result.itm_det_varchar2}</td>
          <td>{result.itm_det_varchar3}</td>
          <td>{result.itm_det_varchar4}</td>
          <td>{result.itm_det_varchar5}</td>
          <td>{result.itm_det_varchar6}</td>
          <td>{result.itm_det_varchar7}</td>
          <td>{result.itm_det_varchar8}</td>
          <td>{result.itm_det_varchar9}</td>
          <td>{result.itm_det_varchar10}</td>

          <td>{result.itm_det_numeric1}</td>
          <td>{result.itm_det_numeric2}</td>
          <td>{result.itm_det_numeric3}</td>
          <td>{result.itm_det_numeric4}</td>
          <td>{result.itm_det_numeric5}</td>

          <td>{itm_date1}</td>
          <td>{itm_date2}</td>
          <td>{itm_date3}</td>
          <td>{itm_date4}</td>
          <td>{itm_date5}</td>

          <td>{result.itm_mst_create_by}</td>
          <td>{itm_create_date}</td>

        </tr>
      );
    });
  };



  // ******************************** RowID: check and read data ***********************************************
  const handleRowClick = (data) => {
    console.log(data.col56);
     history.push("/InventoryFrom-1", { RowID: data.col56 });
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  const handleNewClick = () => {
    history.push("/InventoryFrom-1", { select: "New_Inventory" });
  };


  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.itm_mst_type.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_mstr_locn.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_costcenter.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_itm_grp.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_itm_use.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_com_code.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_account.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_ttl_oh.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_desc.toLowerCase().includes(e.toLowerCase()) ||
        item.itm_mst_ext_desc.toLowerCase().includes(e.toLowerCase())

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
  history.push("/InventoryFrom-1", { RowID: data.col56 });
};

const handleDelete = (data) => {
  // Delete
};



  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Inventory</h3>
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
                  <i className="mdi mdi-file-check btn-icon-prepend"></i> New Inventory
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



                                  if (index === row.cells.length - 54) {
                                    return (
                                      <td {...cell.getCellProps()} colSpan={1}>
                                        {cell.render('Cell')}

                                           {hoveredRow === row.id && (
                                          <div className="col-form-label" style={{ backgroundColor: "#F3F3F3", padding: "2px", borderRadius: "5px", position: 'absolute', left: 222, transform: "translateY(-68%)" }}>
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

export default Inventory;
