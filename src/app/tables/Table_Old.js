import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useResizeColumns,
} from "react-table";
import Pagination from "@material-ui/lab/Pagination";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";
import SearchBar from "material-ui-search-bar";

import '../style.css';
import BootstrapTable from "react-bootstrap-table-next";
import e from "cors";

const Table = (props) => {
  //console.log(props.name)

  const history = useHistory();

  const [columns, setcolumns] = useState([]);
  const [data, setdata] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 20, 30, 40, 50];

  const [show, setShow] = useState(false);
  const [select_id, setselect_id] = useState();

  const [cellValue, setCellValue] = useState("");

  const [search, setSearch] = useState("");
  const [filterResult, setfilterResult] = React.useState([]);

  const [hoveredRow, setHoveredRow] = useState(null);


  const get_assetmaster_old = (site_ID) => {
    APIServices.get_assetmaster_old(site_ID, page, pageSize)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          console.log(responseJson.data.status);
          console.log(responseJson.data.header_count);
          console.log(responseJson.data.totalPages);
          setCount(responseJson.data.totalPages);
          setcolumns(responseJson.data.data.header);
          setdata(responseJson.data.data.result);
          setfilterResult(responseJson.data.result);
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
    //console.log(site_ID);
    console.log(props.name);
    get_assetmaster_old(site_ID);
  }, [page, pageSize]);


  //Checkbox
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const getCellValue = (cell) => {
    setCellValue(cell.value);

    console.log(cellValue);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    selectedFlatRows,
    resetResizing,
    state: { selectedRowIds },
  } = useTable(
    { columns, data },
    useSortBy,
    useRowSelect,
    useResizeColumns,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
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
      ]);
    }
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleRowClick = (data) => {
    console.log("data.col1 "+":"+JSON.stringify(data))
    setselect_id(data.col1);
    history.push("/AssetFrom-1", { select: data.col1 , RowID: data.col61, ast_mst_asset_no : data.col1 });

    // console.log("data.col1 "+":"+data.col1)
    // console.log("SAdasd"+":"+select_id)

    //    selectedFlatRows.map(d=> {

    //     if(d.original.col1 !== d.original.col1){

    //         console.log("not select")

    //         setShow(false)
    //     }else{
    //         console.log(" select")
    //         setShow(true)
    //        // setselect_id(selectedFlatRows.map(d=> d.original.col1))
    //         //console.log(selectedFlatRows.map(d=> d.original.col1))

    //         selectedFlatRows.map(d=> setselect_id(d.original.col1))
    //         //console.log("sdadasdasdasdasda"+":"+select_id)

    //         if(select_id !== select_id){

    //            // console.log("NOT"+":"+select_id)

    //         }else{
    //             //console.log("SELEC"+":"+select_id)
    //             history.push("/Asset/AssetFrom" , {select :select_id})

    //         }

    //     }
    //    })
  };

  const handleNewClick = () => {
    history.push("/AssetFrom-1", { select: "New_Asset" });
  };

  //Search
  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setdata(filterResult);
    } else {
      const a = filterResult.filter((item) =>
        item.result.toLowerCase().includes(e.toLowerCase())
      );
      setdata(a); //what data u want to be searched

    }
  };


  //Edit Button
  const handleEdit = (data) => {
    console.log(data)

    console.log('edit on clik: '+JSON.stringify(data))
    history.push("/AssetFrom-1", { select: data.col1 , RowID: data.col61, ast_mst_asset_no : data.col1 });
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
                    <i className="mdi mdi-mixcloud btn-icon-prepend"></i> quick
                    filter
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
              {...getTableProps()}
              on
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{
                          borderBottom: "solid 3px red",
                          color: "black",
                        }}
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      >
                        {column.render("Header")}

                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "🔽"
                              : "🔼"
                            : ""}
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
                                    onMouseEnter={() => setHoveredRow(row.original.col1)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{ backgroundColor: hoveredRow === row.original.col1 ? '#BCC9F5' : 'white' }}
                                    >
                                {row.cells.map((cell, index) => {
                                  if (index === row.cells.length - 60) {
                                    return (
                                      <td {...cell.getCellProps()} colSpan={1}>
                                        {cell.render('Cell')}
                                        
                                        {hoveredRow === row.original.col1 && (
                                          <div className="col-form-label" style={{ backgroundColor: "#BCC9F5", padding: "2px", borderRadius: "5px" , left: 85, transform: "translateY(30%)" }}>
                                            
                                            <button
                                              type="button"
                                              onClick={() => handleEdit(row.original)}
                                              className="btn btn-primary btn-icon-text"
                                              title="Edit"
                                              style={{marginRight: "5px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
                                            >
                                              <i className="mdi mdi-file-document btn-icon-prepend"></i>
                                            </button>
                                            
                                            <button
                                              type="button"
                                              onClick={() => handleDelete(row.original)}
                                              className="btn btn-warning btn-icon-text"
                                              title="Delete"
                                              style={{marginRight: "15px", width: "30px", height: "30px",padding: "7px", borderRadius: "50%"  }}
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
                                          {index === 5 && (
                                            <span style={{ backgroundColor: 
                                              cell.value === 'AWA'
                                            ? "#2196F3"
                                            : cell.value === "ACT"
                                            ? "#19D895"
                                            : cell.value === "DEA"
                                            ? "#FF6258"
                                            : cell.value === "DIS"
                                            ? "#FFE152"
                                            : null, color: "white", fontSize:'13px', padding: "5px", borderRadius: "5px", fontWeight: "bold" }}>
                                              { cell.value === 'AWA' ? 'Awaiting (AWA)' :
                                                cell.value === 'ACT' ? 'Active (ACT)' :
                                                cell.value === 'DEA' ? 'Deactivate (DEA)' :
                                                cell.value === 'DIS' ? 'Disposed (DIS)' :
                                                cell.render('Cell')}
                                            </span>
                                          )}
                                          {index !== 5 && cell.render('Cell')}
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
  );
};

export default Table;
