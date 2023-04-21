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

import '../style.css';
import { format } from "date-fns";
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';
import logo from '../../assets/images/supplier.png';


const InventorySupplier = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Supplier, setSupplier] = useState([]);
  const [selected_Supplier, setSelected_Supplier] = useState([]);

  const [TaxCode, setTaxCode] = useState([]);
  const [selected_TaxCode, setSelected_TaxCode] = useState([]);

  const [SupplierPartNo, setSupplierPartNo] = useState("");

  const [Manufacturer, setManufacturer] = useState([]);
  const [selected_Manufacturer, setSelected_Manufacturer] = useState([]);

  const [LastItemCost, setLastItemCost] = useState("0");

  const [RetailPrice, setRetailPrice] = useState("0");

  const [MinimumOrderQty, setMinimumOrderQty] = useState("0");

  const [MultiplierQuantity, setMultiplierQuantity] = useState("0");

  const [Discount, setDiscount] = useState("0");

  const [LastReceiveDate, setLastReceiveDate] = useState(new Date());
  
  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [Rank, setRank] = useState(1);
  const [OrderUOM, setOrderUOM] = useState("");
  const [LastQuotation, setLastQuotation] = useState("");
  const [TotalOrderedQuantity, setTotalOrderedQuantity] = useState("");
  const [TotalReceivedQuantity, setTotalReceivedQuantity] = useState("");
  const [TotalLateQuantity, setTotalLateQuantity] = useState("");
  const [TotalHighQuantity, setTotalHighQuantity] = useState("");
  const [DeliveryIndex, setDeliveryIndex] = useState("");
  const [CostIndex, setCostIndex] = useState("");


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
                setRetailPrice( responseJson.data.data[index].itm_sup_retail_price )
               
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
            {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
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
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
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


    const handleRowClick = (data) => {
        console.log(data);
    
        setRank( data.itm_sup_mfgrank )
        setSupplier( data.itm_sup_supplier )
        setTaxCode( data.itm_sup_tax_cd )
        setSupplierPartNo( data.itm_sup_supplier_partno )
        setManufacturer( data.itm_sup_partmfg )
        setLastQuotation( data.itm_sup_file_name )
        setLastItemCost( data.itm_sup_last_itemcost )
        setRetailPrice( data.itm_sup_retail_price )
        //setLastReceiveDate( data.itm_sup_last_rcvd_date )
        setOrderUOM( data.itm_sup_order_uom )
        setMinimumOrderQty( data.itm_sup_min_orderqty )
        setMultiplierQuantity( data.itm_sup_rcpts_ctr )
        setDiscount( data.itm_sup_discount_pct )
        setTotalOrderedQuantity( data.itm_sup_ord_qty )
        setTotalReceivedQuantity( data.itm_sup_rcv_qty )
        setTotalLateQuantity( data.itm_sup_late_qty )
        setTotalHighQuantity( data.itm_sup_high_qty )
        setDeliveryIndex( data.itm_sup_di )
        setCostIndex( data.itm_sup_ci )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setSelected_Supplier(0);
        setSelected_TaxCode(0);
        setSupplierPartNo('');
        setSelected_Manufacturer(0);
        setLastItemCost('');
        setRetailPrice('');
        setLastReceiveDate('');
        setMinimumOrderQty('');
        setMultiplierQuantity('');
        setDiscount('');
      
    };
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Discount
        console.log("Discount: ", Discount)

        //Select Manufacturer
        let Manufacturer, setManufacturer;
        if(selected_Manufacturer == '' || selected_Manufacturer == null){

            setManufacturer=''
        }else{

            Manufacturer = selected_Manufacturer.label.split(":")
            setManufacturer = Manufacturer[0];
            console.log("Manufacturer ", Manufacturer[0])
        }

        //Select Last Item Cost
        console.log("LastItemCost: ", LastItemCost)

        //Select Retail Price
        console.log("RetailPrice: ", RetailPrice)

        //Select Last Receive Date
        let Last_Receive_Date = ''
        if (LastReceiveDate == '' || LastReceiveDate == null) {

            Last_Receive_Date = '';
        } else {

            Last_Receive_Date = Moment(LastReceiveDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LR Date ", LastReceiveDate);
        }

        //Select Minimum Order Qty
        console.log("MinimumOrderQty: ", MinimumOrderQty)

        //Select Multiplier Quantity
        console.log("MultiplierQuantity: ", MultiplierQuantity)

        //Select Supplier
        let Supplier, setSupplier;
        if(selected_Supplier == '' || selected_Supplier == null){

            setSupplier=''
        }else{

            Supplier = selected_Supplier.label.split(":")
            setSupplier = Supplier[0];
            console.log("Supplier ", Supplier[0])
        }

        //Select Tax Code
        let TaxCode, setTaxCode;
        if(selected_TaxCode == '' || selected_TaxCode == null){

            setTaxCode=''
        }else{

            TaxCode = selected_TaxCode.label.split(":")
            setTaxCode = TaxCode[0];
            console.log("TaxCode ", TaxCode[0])
        }

        //Select Supplier Part No
        console.log("SupplierPartNo: ", SupplierPartNo)

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            itm_sup_ci: ".0000",
            itm_sup_di: ".0000",
            itm_sup_discount_pct: Discount,
            itm_sup_file_name: null,
            itm_sup_high_qty: ".0000",
            itm_sup_last_itemcost: LastItemCost,
            //itm_sup_last_rcvd_date: Last_Receive_Date,
            itm_sup_late_qty: ".0000",
            itm_sup_mfgrank: Rank,
            itm_sup_min_orderqty: MinimumOrderQty,
            itm_sup_ord_qty: ".0000",
            itm_sup_order_uom: "PIECES",
            itm_sup_partmfg: setManufacturer.trim(),
            itm_sup_rcpts_ctr: MultiplierQuantity,
            itm_sup_rcv_qty: ".0000",
            itm_sup_retail_price: RetailPrice,
            itm_sup_supplier: setSupplier.trim(),
            itm_sup_supplier_partno: SupplierPartNo,
            itm_sup_tax_cd: setTaxCode.trim(),
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
          setRank(Rank + 1);
    };



  //Sum calculation
  //const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls3_qty_needed) || 0), 0);
  
  //Multiply calculation
  //const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls3_qty_needed) || 0) * (parseFloat(item.wko_ls3_item_cost) || 0), 0);





  return (
    <div>
        <div className="card">
            <div className="card-body" style={{ borderRadius: '4px', boxShadow: '2px 2px 15px 2px #f0f0f0'}}>
                <div>
                    <div style={{ paddingBottom: '20px', backgroundColor: 'white' }}>
                        <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                        <div style={{ marginRight: '10px' }}>
                            <img src={logo} style={{ width: '60px', height: '60px' }}/>
                        </div>
                        <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Supplier</div>
                            {/* <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div> */}
                        </div> 
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
                                    <label className="col-sm-4 col-form-label down left">Supplier:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_TaxCode">
                                    <label className="col-sm-4 col-form-label top down left">Tax Code:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_SupplierPartNo">
                                    <label className="col-sm-4 col-form-label top down left">Supplier Part No:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Manufacturer">
                                    <label className="col-sm-4 col-form-label top down left">Manufacturer:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_LastItemCost">
                                    <label className="col-sm-4 col-form-label top down left">Last Item Cost:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_RetailPrice">
                                    <label className="col-sm-4 col-form-label top down left">Retail Price:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control  
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="number"  
                                            placeholder=".00" 
                                            value={RetailPrice} 
                                            onChange={(e) => setRetailPrice(e.target.value)}
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_LastReceiveDate">
                                    <label className="col-sm-4 col-form-label top down left">Last Receive Date:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_MinimumOrderQty">
                                    <label className="col-sm-4 col-form-label top down left">Minimum Order Qty:</label>
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

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_MultiplierQuantity">
                                    <label className="col-sm-4 col-form-label top down left">Multiplier Quantity:</label>
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
                            
                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Discount">
                                    <label className="col-sm-4 col-form-label top down left">Discount %:</label>
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
                            <Button variant="primary" onClick={handleAddButtonClick}>
                            {/* {Button_save} */}
                            Submit
                            </Button>
                        </Modal.Footer>

                    </Modal>


                    {showModal && (
                    <Modal show={showModal} onHide={handleCloseModal} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Supplier</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_Rank">
                                <label className="col-sm-5 col-form-label down left" style={{ fontSize: "13px" }}>Rank:</label>
                                <div className="col-sm-7">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={Rank} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Supplier">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Supplier:</label>
                                <div className="col-sm-7">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={Supplier} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_TaxCode">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Tax Code:</label>
                                <div className="col-sm-7">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={TaxCode} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_SupplierPartNo">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Supplier Part No:</label>
                                <div className="col-sm-7 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={SupplierPartNo} 
                                        readOnly
                                        />
                                    </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Manufacturer">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Manufacturer:</label>
                                <div className="col-sm-7">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={Manufacturer} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_LastQuotation">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Last Quotation:</label>
                                <div className="col-sm-7">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={LastQuotation} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_LastItemCost">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Last Item Cost:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={LastItemCost} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_RetailPrice">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Retail Price:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={RetailPrice} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_LastReceiveDate">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Last Receive Date:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="datetime-local" 
                                    value ={LastReceiveDate} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_OrderUOM">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Order UOM:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={OrderUOM} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_MinimumOrderQty">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Minimum Order Qty:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={MinimumOrderQty} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_MultiplierQuantity">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Multiplier Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={MultiplierQuantity} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                        
                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Discount">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Discount %:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={Discount} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_TotalOrderedQuantity">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Total Ordered Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={TotalOrderedQuantity} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_TotalReceivedQuantity">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Total Received Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={TotalReceivedQuantity} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_TotalLateQuantityt">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Total Late Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={TotalLateQuantity} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_TotalHighQuantity">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Total High Quantity:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={TotalHighQuantity} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_DeliveryIndex">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Delivery Index:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={DeliveryIndex} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_CostIndex">
                                <label className="col-sm-5 col-form-label labelTopEmail down left" style={{ fontSize: "13px" }}>Cost Index:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value ={CostIndex} 
                                    readOnly
                                    />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                        
                    </Modal.Body>
                    
                    </Modal>
                    )}
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

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button type="button" style={{ padding: '5px 10px', background: 'none', color: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={handleShow}>
                            + Add Supplier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InventorySupplier;
