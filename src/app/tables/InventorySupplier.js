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


const InventorySupplier = () => {
 

  const [Columns, setColumns] = useState([]);
  const [Data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Supplier, setSupplier] = useState([]);
  const [selected_Supplier, setSelected_Supplier] = useState([]);

  const [TaxCode, setTaxCode] = useState([]);
  const [selected_TaxCode, setSelected_TaxCode] = useState([]);

  const [SupplierPartNo, setSupplierPartNo] = useState("");

  const [Manufacturer, setManufacturer] = useState([]);
  const [selected_Manufacturer, setSelected_Manufacturer] = useState([]);

  const [LastItemCost, setLastItemCost] = useState("0");

  const [RetailItemCost, setRetailItemCost] = useState("0");

  const [MinimumOrderQty, setMinimumOrderQty] = useState("0");

  const [MultiplierQuantity, setMultiplierQuantity] = useState("0");

  const [Discount, setDiscount] = useState("0");

  const [LastReceiveDate, setLastReceiveDate] = useState(new Date());
  
  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_inventorymaster_supplier = (site_ID) => {
    APIServices.get_inventorymaster_supplier(site_ID)
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
    get_inventorymaster_supplier(site_ID);
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
    
        console.log(data.col56)
    };


    const get_inventory_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


                let Supplier = responseJson.data.data.supplier.map(item => ({
                    label: item.sup_mst_supplier_cd +" : "+ item.sup_mst_desc,
                    value: item.sup_mst_supplier_cd            
                    }));
                    setSupplier(Supplier);

                let TaxCode = responseJson.data.data.ITM_Tax_Code.map(item => ({
                    label: item.tax_mst_tax_cd +" : "+ item.tax_mst_desc,
                    value: item.tax_mst_tax_cd            
                    }));
                    setTaxCode(TaxCode);

                let Manufacturer = responseJson.data.data.ITM_Manufacturer.map(item => ({
                    label: item.mfg_mst_mfg_cd +" : "+ item.mfg_mst_company,
                    value: item.mfg_mst_mfg_cd            
                    }));
                    setManufacturer(Manufacturer);



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


    const get_dropdown_ParentFlag = (site_ID, selected_asset) => {  


        console.log('PARENT FLAG: '+ site_ID + selected_asset)
        
        APIServices.get_dropdown_ParentFlag(site_ID, selected_asset).then((responseJson)=>{


           console.log(responseJson.data.status);

            if (responseJson.data.status === 'SUCCESS') {  

                    Swal.close();
                    setButton_save("Submit")
                    get_inventorymaster_select(site_ID, selected_asset);
              
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
              title: 'Oops get_Inventory_select...',
              text: e,          
            })
          });

    }
  

    const get_inventorymaster_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_inventorymaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT ITM: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                setSelected_Supplier( {label:responseJson.data.data[index].itm_sup_supplier} )
                setSelected_TaxCode( {label:responseJson.data.data[index].itm_sup_tax_cd} )
                setSupplierPartNo( responseJson.data.data[index].itm_sup_supplier_partno )
                setManufacturer( responseJson.data.data[index].itm_sup_partmfg )
                setLastItemCost( responseJson.data.data[index].itm_sup_last_itemcost )
                setRetailItemCost( responseJson.data.data[index].itm_sup_retail_price )
               
                if(responseJson.data.data[index].itm_sup_last_rcvd_date == null){
                    setLastReceiveDate('')
                }else{

                    setLastReceiveDate( Moment(responseJson.data.data[index].itm_sup_last_rcvd_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT LR Date : '+ Moment(responseJson.data.data[index].itm_sup_last_rcvd_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setMinimumOrderQty( responseJson.data.data[index].itm_sup_min_orderqty )
                setMultiplierQuantity( responseJson.data.data[index].itm_sup_rcpts_ctr )
                setDiscount( responseJson.data.data[index].itm_sup_discount_pct )


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
              title: 'Oops get_Inventory_select...',
              text: e,          
            })
          });

    }


    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        console.log('select select',location.state.select);
        console.log('select ITMID',location.state.RowID);
    
        get_inventory_status(site_ID, "All", location.state.select);       
       

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

            {/******************** Inventory Supplier ********************/}
            <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Supplier</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_Supplier">
                                <label className="col-sm-4 col-form-label">Supplier:</label>
                                <div className="col-sm-7">
                                    <Select  
                                       isClearable={true}  
                                       options={Supplier}
                                       value={selected_Supplier}
                                       onChange={setSelected_Supplier} // using id as it is unique
                                       required
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_TaxCode">
                                <label className="col-sm-4 col-form-label">Tax Code:</label>
                                <div className="col-sm-7">
                                    <Select  
                                       isClearable={true}  
                                       options={TaxCode}
                                       value={selected_TaxCode}
                                       onChange={setSelected_TaxCode} // using id as it is unique
                                       required
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_SupplierPartNo">
                                <label className="col-sm-4 col-form-label">Supplier Part No:</label>
                                <div className="col-sm-7 form-label">
                                    <label className="col-sm-12 form-label">
                                        <Form.Control
                                            type="text"
                                            value={SupplierPartNo}
                                            onChange={(e) => setSupplierPartNo(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_Manufacturer">
                                <label className="col-sm-4 col-form-label">Manufacturer:</label>
                                <div className="col-sm-7">
                                    <Select  
                                       isClearable={true}  
                                       options={Manufacturer}
                                       value={selected_Manufacturer}
                                       onChange={setSelected_Manufacturer} // using id as it is unique
                                       required
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_LastItemCost">
                                <label className="col-sm-4 col-form-label">Last Item Cost:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control  
                                        type="number"  
                                        placeholder=".0000" 
                                        value={LastItemCost} 
                                        onChange={(e) => setLastItemCost(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_RetailItemCost">
                                <label className="col-sm-4 col-form-label">Retail Item Cost:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control  
                                        type="number"  
                                        placeholder=".00" 
                                        value={RetailItemCost} 
                                        onChange={(e) => setRetailItemCost(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_LastReceiveDate">
                                <label className="col-sm-4 col-form-label">Last Receive Date:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control                                            
                                        type="datetime-local"  
                                        value={LastReceiveDate} 
                                        onChange={(e) => setLastReceiveDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_MinimumOrderQty">
                                <label className="col-sm-4 col-form-label">Minimum Order Qty:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control  
                                        type="number"  
                                        placeholder=".00" 
                                        value={MinimumOrderQty} 
                                        onChange={(e) => setMinimumOrderQty(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_MultiplierQuantity">
                                <label className="col-sm-4 col-form-label">Multiplier Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control  
                                        type="number"  
                                        placeholder="0" 
                                        value={MultiplierQuantity} 
                                        onChange={(e) => setMultiplierQuantity(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                        
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_Discount">
                                <label className="col-sm-4 col-form-label">Discount %:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control  
                                        type="number"  
                                        placeholder="0.00" 
                                        value={Discount} 
                                        onChange={(e) => setDiscount(e.target.value)}
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

export default InventorySupplier;
