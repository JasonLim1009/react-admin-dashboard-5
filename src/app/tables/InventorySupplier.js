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

import { format } from "date-fns";
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';


const InventorySupplier = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState(Result.map(() => false));

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



  const get_inventorymaster_supplier = (site_ID, RowID) => {
    APIServices.get_inventorymaster_supplier(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeader(responseJson.data.data.header);
            setResult(responseJson.data.data.result);
        
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
    get_inventorymaster_supplier(site_ID, props.data.RowID);
  }, []);



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
                    get_inventorymaster_select(site_ID, selected_asset);                 
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

        // console.log('select select',location.state.select);
        // console.log('select ITMID',location.state.RowID);
    
        get_inventory_status(site_ID, "All", location.state.select);       
       

    },[location]);


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

            if (result.itm_sup_last_rcvd_date == null) {
            var last_rcvd_date = ''
            } else {
    
            var last_rcvd_date = format(new Date(result.itm_sup_last_rcvd_date.date), "dd/MM/yyyy HH:MM")
    
            }

        return (
        <tr key={result.site_cd}>
            <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
            
            <td>{result.itm_sup_mfgrank}</td>
            <td>{result.itm_sup_supplier}</td>
            <td>{result.itm_sup_tax_cd}</td>
            <td>{result.itm_sup_supplier_partno}</td>
            <td>{result.itm_sup_partmfg}</td>
            <td>{result.itm_sup_file_name}</td>
            <td>{result.itm_sup_last_itemcost}</td>
            <td>{result.itm_sup_retail_price}</td>
            <td>{last_rcvd_date}</td>
            <td>{result.itm_sup_order_uom}</td>
            <td>{result.itm_sup_min_orderqty}</td>
            <td>{result.itm_sup_rcpts_ctr}</td>
            <td>{result.itm_sup_discount_pct}</td>
            <td>{result.itm_sup_ord_qty}</td>
            <td>{result.itm_sup_rcv_qty}</td>
            <td>{result.itm_sup_late_qty}</td>
            <td>{result.itm_sup_high_qty}</td>
            <td>{result.itm_sup_di}</td>
            <td>{result.itm_sup_ci}</td>
            
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
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Select  
                                       isClearable={true}  
                                       options={Supplier}
                                       value={selected_Supplier}
                                       onChange={setSelected_Supplier} // using id as it is unique
                                       required
                                       styles={{ 
                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                    }}
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_TaxCode">
                                <label className="col-sm-4 col-form-label">Tax Code:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Select  
                                       isClearable={true}  
                                       options={TaxCode}
                                       value={selected_TaxCode}
                                       onChange={setSelected_TaxCode} // using id as it is unique
                                       required
                                       styles={{ 
                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                    }}
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_SupplierPartNo">
                                <label className="col-sm-4 col-form-label">Supplier Part No:</label>
                                <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value={SupplierPartNo}
                                            onChange={(e) => setSupplierPartNo(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_Manufacturer">
                                <label className="col-sm-4 col-form-label">Manufacturer:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Select  
                                       isClearable={true}  
                                       options={Manufacturer}
                                       value={selected_Manufacturer}
                                       onChange={setSelected_Manufacturer} // using id as it is unique
                                       required
                                       styles={{ 
                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                    }}
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_LastItemCost">
                                <label className="col-sm-4 col-form-label">Last Item Cost:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={LastItemCost} 
                                        onChange={(e) => setLastItemCost(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_RetailItemCost">
                                <label className="col-sm-4 col-form-label">Retail Item Cost:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".00" 
                                        value={RetailItemCost} 
                                        onChange={(e) => setRetailItemCost(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_LastReceiveDate">
                                <label className="col-sm-4 col-form-label">Last Receive Date:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control        
                                        style={{ fontSize: "13px", height: "38px" }}                                    
                                        type="datetime-local"  
                                        value={LastReceiveDate} 
                                        onChange={(e) => setLastReceiveDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_MinimumOrderQty">
                                <label className="col-sm-4 col-form-label">Minimum Order Qty:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".00" 
                                        value={MinimumOrderQty} 
                                        onChange={(e) => setMinimumOrderQty(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_MultiplierQuantity">
                                <label className="col-sm-4 col-form-label">Multiplier Quantity:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder="0" 
                                        value={MultiplierQuantity} 
                                        onChange={(e) => setMultiplierQuantity(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                        
                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_Discount">
                                <label className="col-sm-4 col-form-label">Discount %:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
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
  );
};

export default InventorySupplier;
