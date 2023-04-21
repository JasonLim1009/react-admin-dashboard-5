import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import Swal from "sweetalert2";
import APIServices from "../services/APIServices";
import '../style.css';

function Table(props) {
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



  const get_assetmaster = (site_ID) => {
    APIServices.get_assetmaster(site_ID, page, pageSize)
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
    get_assetmaster(site_ID);
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


      if (result.ast_det_warranty_date == null) {
        var warranty_date = ''
      } else {

        var warranty_date = format(new Date(result.ast_det_warranty_date.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_det_datetime1 == null) {
        var date1 = ''
      } else {

        var date1 = format(new Date(result.ast_det_datetime1.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_det_datetime2 == null) {
        var date2 = ''
      } else {

        var date2 = format(new Date(result.ast_det_datetime2.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_det_datetime3 == null) {
        var date3 = ''
      } else {

        var date3 = format(new Date(result.ast_det_datetime3.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_det_datetime4 == null) {
        var date4 = ''
      } else {

        var date4 = format(new Date(result.ast_det_datetime4.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_det_datetime5 == null) {
        var date5 = ''
      } else {

        var date5 = format(new Date(result.ast_det_datetime5.date), "dd/MM/yyyy HH:MM")

      }

      if (result.ast_mst_create_date == null) {
        var create_date = ''
      } else {

        var create_date = format(new Date(result.ast_mst_create_date.date), "dd/MM/yyyy HH:MM")

      }


      return (
        <tr key={result.site_cd}  onDoubleClick={(event) =>handleRowClick(result, event)}
          onMouseEnter={() => setHoveredRow(result)}
          onMouseLeave={() => setHoveredRow(null)}
          style={{ backgroundColor: hoveredRow === result ? '#BCC9F5' : 'white' }}
        >
          <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
          <td>{result.ast_mst_asset_no}
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
          <td>{result.ast_mst_asset_grpcode}</td>
          <td>{result.ast_mst_asset_type}</td>
          <td>{result.ast_mst_asset_code}</td>
          <td>
            <span style={{ 
                  backgroundColor: 
                    result.ast_mst_asset_status === 'AWA' ? '#2196F3' : 
                    result.ast_mst_asset_status === 'ACT' ? '#19D895' :
                    result.ast_mst_asset_status === 'DEA' ? '#FF6258' :
                    null, 
                  color: 'white', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  fontSize:'13px',
                  fontWeight: 'bold'
                }}>
              { result.ast_mst_asset_status === 'AWA' ? 'Awaiting (AWA)' :
                result.ast_mst_asset_status === 'ACT' ? 'Active (ACT)' :
                result.ast_mst_asset_status === 'DEA' ? 'Deactivate (DEA)' :
                result.ast_mst_asset_status}
            </span>
          </td>
          <td>{result.ast_mst_cri_factor}</td>
          <td>{result.ast_mst_cost_center}</td>
          <td>{result.ast_mst_wrk_grp}</td>
          <td>{result.ast_mst_asset_shortdesc}</td>
          <td>{result.ast_mst_asset_longdesc}</td>

          <td>{result.ast_mst_work_area}</td>
          <td>{result.ast_mst_asset_locn}</td>
          <td>{result.ast_mst_ast_lvl}</td>
          <td>{result.ast_mst_perm_id}</td>

          <td>{result.ast_mst_parent_flag}</td>
          <td>{result.ast_mst_parent_id}</td>
          <td>{result.ast_mst_print_count}</td>
          <td>{result.ast_mst_safety_rqmts}</td>
          <td>{result.ast_det_asset_cost}</td>
          <td>{result.ast_det_mtdlabcost}</td>
          <td>{result.ast_det_mtdmtlcost}</td>
          <td>{result.ast_det_mtdconcost}</td>
          <td>{result.ast_det_ytdlabcost}</td>
          <td>{result.ast_det_ytdmtlcost}</td>
          <td>{result.ast_det_ytdconcost}</td>
          <td>{result.ast_det_ltdlabcost}</td>
          <td>{result.ast_det_ltdmtlcost}</td>
          <td>{result.ast_det_ltdconcost}</td>
          <td>{result.ast_det_repl_cost}</td>
          <td>{warranty_date}</td>
          <td>{result.ast_det_depr_term}</td>
          <td>{result.ast_det_l_account}</td>
          <td>{result.ast_det_m_account}</td>
          <td>{result.ast_det_c_account}</td>
          <td>{result.ast_mst_fda_code}</td>

          <td>{result.ast_det_varchar1}</td>
          <td>{result.ast_det_varchar2}</td>
          <td>{result.ast_det_varchar3}</td>
          <td>{result.ast_det_varchar4}</td>
          <td>{result.ast_det_varchar5}</td>
          <td>{result.ast_det_varchar6}</td>
          <td>{result.ast_det_varchar7}</td>
          <td>{result.ast_det_varchar8}</td>
          <td>{result.ast_det_varchar9}</td>
          <td>{result.ast_det_varchar10}</td>
          <td>{result.ast_det_numeric1}</td>
          <td>{result.ast_det_numeric2}</td>
          <td>{result.ast_det_numeric3}</td>
          <td>{result.ast_det_numeric4}</td>
          <td>{result.ast_det_numeric5}</td>
          <td>{date1}</td>
          <td>{date2}</td>
          <td>{date3}</td>
          <td>{date4}</td>
          <td>{date5}</td>
          <td>{result.ast_det_note1}</td>
          <td>{result.ast_det_note2}</td>
          <td>{result.ast_mst_create_by}</td>
          <td>{create_date}</td>
          <td>{result.ast_mst_assigned_to}</td>
        
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
    history.push("/AssetFrom-1", { RowID: data.RowID, ast_mst_asset_no: data.ast_mst_asset_no});
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleNewClick = () => {
    history.push("/AssetFrom-1", { select: "New_Asset" });
  };

  //Search
  const setFiltereddata = (e) => {
    console.log(e);
    setSearch(e);

    if (e == "") {
      setResult(filterResult);
    } else {
      const a = filterResult.filter((item) =>

        item.ast_mst_asset_no.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_asset_grpcode.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_asset_type.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_asset_code.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_asset_status.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_cri_factor.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_cost_center.toLowerCase().includes(e.toLowerCase())  ||
        //item.ast_mst_wrk_grp.toLowerCase().includes(e.toLowerCase())  ||
        item.ast_mst_asset_shortdesc.toLowerCase().includes(e.toLowerCase())  ||
        //item.ast_mst_asset_longdesc.toLowerCase().includes(e.toLowerCase())  ||
        item.ast_mst_work_area.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_asset_locn.toLowerCase().includes(e.toLowerCase()) ||
        item.ast_mst_ast_lvl.toLowerCase().includes(e.toLowerCase()) 
        //item.ast_mst_perm_id.toLowerCase().includes(e.toLowerCase()) ||
        //item.ast_mst_parent_id.toLowerCase().includes(e.toLowerCase()) ||
        //item.ast_mst_safety_rqmts.toLowerCase().includes(e.toLowerCase()) ||
        //item.ast_det_l_account.toLowerCase().includes(e.toLowerCase()) 
        
        );
      setResult(a); //what data u want to be searched

    }
  };
  

  //Edit Button
  const handleEdit = (data) => {

    console.log('edit on clik: '+JSON.stringify(data))
    history.push("/AssetFrom-1", { RowID: data.RowID, ast_mst_asset_no: data.ast_mst_asset_no});
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
  );
}

export default Table;
