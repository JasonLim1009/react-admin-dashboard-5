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



const WorkOrderMaterial = () => {
 

  const [Columns, setColumns] = useState([]);
  const [Data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [StockNo, setStockNo] = useState([]);
  const [selected_StockNo, setSelected_StockNo] = useState([]);

  const [StockLocation, setStockLocation] = useState([]);
  const [selected_StockLocation, setSelected_StockLocation] = useState([]);

  const [Description, setDescription] = useState("");

  const [ChargeCostCenter, setChargeCostCenter] = useState([]);
  const [selected_ChargeCostCenter, setSelected_ChargeCostCenter] = useState([]);

  const [ChargeAccount, setChargeAccount] = useState([]);
  const [selected_ChargeAccount, setSelected_ChargeAccount] = useState([]);

  const [QtyNeeded, setQtyNeeded] = useState("1.0000");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_workordermaster_material = (site_ID) => {
    APIServices.get_workordermaster_material(site_ID)
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
    get_workordermaster_material(site_ID);
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

        console.log(data.col67);
    };



    const get_workorder_status = (site_ID, type, selected_asset) => {


      Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

     
          if (responseJson.data.status === 'SUCCESS') {


             console.log('get_dropdown', responseJson.data)


                let StockNo = responseJson.data.data.MRStockno.map(item => ({
                  label: item.itm_mst_stockno +" : "+ item.itm_mst_desc,
                  value: item.itm_mst_stockno            
                  }));
                  setStockNo(StockNo);

                let StockLocation = responseJson.data.data.ITM_StockLocation.map(item => ({
                  label: item.itm_loc_stk_loc +" : "+ item.itm_loc_oh_qty,
                  value: item.itm_loc_stk_loc            
                  }));
                  setStockLocation(StockLocation);

                let ChargeCostCenter = responseJson.data.data.CostCenter.map(item => ({
                  label: item.costcenter +" : "+ item.descs,
                  value: item.costcenter            
                  }));
                  setChargeCostCenter(ChargeCostCenter);

                let ChargeAccount = responseJson.data.data.WKO_Labor_Account.map(item => ({
                  label: item.account +" : "+ item.descs,
                  value: item.account            
                  }));
                  setChargeAccount(ChargeAccount);


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
                  get_workordermaster_select(site_ID,selected_asset);
                
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
            title: 'Oops get_WorkOrder_select...',
            text: e,          
          })
        });

  }


  const get_workordermaster_select = () => {

    
      console.log('SELECT ROWID: '+ location.state.RowID)

      APIServices.get_workordermaster_select(location.state.RowID).then((responseJson)=>{  
          
          console.log('SELECT response: '+ JSON.stringify(responseJson));

          if (responseJson.data.status === 'SUCCESS') {     
              

// **************************************** check read data ******************************************
              console.log('SELECT WKO: '+ JSON.stringify(responseJson.data.data))
             
             for (var index in responseJson.data.data) {
             
              
              setRowID( responseJson.data.data[index].RowID )


              setSelected_StockNo( {label:responseJson.data.data[index].wko_ls2_stockno} )
              setSelected_StockLocation( {label:responseJson.data.data[index].wko_ls2_stk_locn} )
              setDescription( responseJson.data.data[index].wko_ls2_desc )
              setSelected_ChargeCostCenter( {label:responseJson.data.data[index].wko_ls2_chg_costcenter} )
              setSelected_ChargeAccount( {label:responseJson.data.data[index].wko_ls2_chg_account} )
              setQtyNeeded( responseJson.data.data[index].wko_ls2_qty_needed )


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
            title: 'Oops get_WorkOrder_select...',
            text: e,          
          })
        });

  }
  

  useEffect(() => {

      let site_ID = localStorage.getItem("site_ID");

      console.log('select select',location.state.select);
      console.log('select WKOID',location.state.RowID);
  
      get_workorder_status(site_ID, "All", location.state.select);       
     

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

        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Maintenance</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_StockNo">
                            <label className="col-sm-4 col-form-label">Stock No:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={StockNo}
                                    value={selected_StockNo}
                                    onChange={setSelected_StockNo} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_StockLocation">
                            <label className="col-sm-4 col-form-label">Stock Location:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={StockLocation}
                                    value={selected_StockLocation}
                                    onChange={setSelected_StockLocation} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Description">
                            <label className="col-sm-4 col-form-label">Description:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="text"  
                                    value={Description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ChargeCostCenter">
                            <label className="col-sm-4 col-form-label">Charge Cost Center:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={ChargeCostCenter}
                                    value={selected_ChargeCostCenter}
                                    onChange={setSelected_ChargeCostCenter} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ChargeAccount">
                            <label className="col-sm-4 col-form-label">Charge Account:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={ChargeAccount}
                                    value={selected_ChargeAccount}
                                    onChange={setSelected_ChargeAccount} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_QtyNeeded">
                            <label className="col-sm-4 col-form-label">Qty Needed:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="number"  
                                    placeholder="1.0000" 
                                    value={QtyNeeded} 
                                    onChange={(e) => setQtyNeeded(e.target.value)}
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

export default WorkOrderMaterial;
