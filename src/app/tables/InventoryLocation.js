import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useResizeColumns,
} from "react-table";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";

import '../style.css';
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';
import logo from '../../assets/images/location.png';


const InventoryLocation = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Master_Location, setMaster_Location] = useState([]);
  const [selected_Master_Location, setSelected_Master_Location] = useState([]);

  const [PrimaryLocation, setPrimaryLocation] = useState(false);
  const [CheckBox_PrimaryLocation, setCheckBox_PrimaryLocation] = useState('0');

  const [IncreaseTotalOH, setIncreaseTotalOH] = useState(false);
  const [CheckBox_IncreaseTotalOH, setCheckBox_IncreaseTotalOH] = useState('0');

  const [UpdateStockCosting, setUpdateStockCosting] = useState(false);
  const [CheckBox_UpdateStockCosting, setCheckBox_UpdateStockCosting] = useState('0');

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [LockoutForCount, setLockoutForCount] = useState("");
  const [OhQuantity, setOhQuantity] = useState("");
  const [OrderPoint, setOrderPoint] = useState("");
  const [Maximum, setMaximum] = useState("");
  const [PrOutstanding, setPrOutstanding] = useState("");
  const [PoOutstanding, setPoOutstanding] = useState("");
  const [HardReserve, setHardReserve] = useState("");
  const [ShortQty, setShortQty] = useState("");
  const [LastActivityDate, setLastActivityDate] = useState("");
  const [LastCountDate, setLastCountDate] = useState("");
  const [NextCountDate, setNextCountDate] = useState("");


  const get_inventorymaster_location = (site_ID, RowID) => {
    APIServices.get_inventorymaster_location(site_ID, RowID)
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
        get_inventorymaster_location(site_ID, props.data.RowID);

        get_inventory_status(site_ID, "All", location.state.select);       
       
    },[location]);


    const get_inventory_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {

               console.log('get_dropdown', responseJson.data)


               let Master_Location = responseJson.data.data.ITM_Master_Location.map(item => ({
                label: item.loc_mst_stk_loc +" : "+ item.loc_mst_desc,
                value: item.loc_mst_desc            
                }));
                setMaster_Location(Master_Location);

                             
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


                setPrimaryLocation( responseJson.data.data[index].itm_loc_prim_locn_flg )
                setSelected_Master_Location( {label:responseJson.data.data[index].itm_loc_stk_loc} )
                setIncreaseTotalOH( responseJson.data.data[index].itm_loc_inc_ttloh )
                setUpdateStockCosting( responseJson.data.data[index].itm_loc_stock_cost_flag )


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
    
            if (result.itm_loc_create_date == null) {
                var loc_create_date = ''
                } else {
        
                var loc_create_date = format(new Date(result.itm_loc_create_date.date), "dd/MM/yyyy HH:MM")
        
                }
    
                if (result.itm_loc_lastactdate == null) {
                var last_act_date = ''
                } else {
        
                var last_act_date = format(new Date(result.itm_loc_lastactdate.date), "dd/MM/yyyy HH:MM")
        
                }
    
                if (result.itm_loc_lastcntdate == null) {
                var last_cnt_date = ''
                } else {
        
                var last_cnt_date = format(new Date(result.itm_loc_lastcntdate.date), "dd/MM/yyyy HH:MM")
        
                }
    
                if (result.itm_loc_next_cnt_date == null) {
                var next_cnt_date = ''
                } else {
        
                var next_cnt_date = format(new Date(result.itm_loc_next_cnt_date.date), "dd/MM/yyyy HH:MM")
        
                }
    
            return (
            <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
                <td>{index + 1}</td>
                {/* <td>{result.itm_loc_order_pt}</td> */}
                <td>{result.itm_loc_lockout4count}</td>
                <td>{result.itm_loc_prim_locn_flg}</td>
                <td>{result.itm_loc_stk_loc}</td>
                <td>{result.itm_loc_inc_ttloh}</td>
                <td>{result.itm_loc_stock_cost_flag}</td>
                <td>{result.itm_loc_oh_qty}</td>
                <td>{result.itm_loc_order_pt}</td>
                <td>{result.itm_loc_maximum}</td>
    
                <td>{result.itm_loc_pr_due_in}</td>
                <td>{result.itm_loc_due_in}</td>
                <td>{result.itm_loc_hard_resrv}</td>
                <td>{result.itm_loc_short_qty}</td>
                <td>{loc_create_date}</td>
                <td>{last_act_date}</td>
                <td>{last_cnt_date}</td>
                <td>{next_cnt_date}</td>
    
                
            </tr>
            );
        });
    };

    
    const handleRowClick = (data) => {
        console.log(data);
        
        setLockoutForCount( data.itm_loc_lockout4count )
        setPrimaryLocation( data.itm_loc_prim_locn_flg )
        setMaster_Location( data.itm_loc_stk_loc )
        setIncreaseTotalOH( data.itm_loc_inc_ttloh )
        setUpdateStockCosting( data.itm_loc_stock_cost_flag )
        setOhQuantity( data.itm_loc_oh_qty )
        setOrderPoint( data.itm_loc_order_pt )
        setMaximum( data.itm_loc_maximum )
        setPrOutstanding( data.itm_loc_pr_due_in )
        setPoOutstanding( data.itm_loc_due_in )
        setHardReserve( data.itm_loc_hard_resrv )
        setShortQty( data.itm_loc_short_qty )
        setLastActivityDate( data.itm_loc_lastactdate )
        setLastCountDate( data.itm_loc_lastcntdate )
        setNextCountDate( data.itm_loc_next_cnt_date )

        setShowModal(true);
    };
    
    const resetData = () => {
    
        setPrimaryLocation('');
        setSelected_Master_Location(0);
        setIncreaseTotalOH('');
        setUpdateStockCosting('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Primary Location
        console.log("PrimaryLocation: ", PrimaryLocation)

        //Select Master Location
        let Master_Location, setMaster_Location;
        if(selected_Master_Location == '' || selected_Master_Location == null){

            setMaster_Location=''
        }else{

            Master_Location = selected_Master_Location.label.split(":")
            setMaster_Location = Master_Location[0];
            console.log("Master_Location ", Master_Location[0])
        }

        //Select Increase Total OH
        console.log("IncreaseTotalOH: ", IncreaseTotalOH)

        //Select Update Stock Costing
        console.log("UpdateStockCosting: ", UpdateStockCosting)

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            //itm_loc_create_date: ".0000",
            itm_loc_due_in: ".0000",
            itm_loc_hard_resrv: ".0000",
            itm_loc_inc_ttloh: IncreaseTotalOH,
            itm_loc_lastactdate: null,
            itm_loc_lastcntdate: null,
            itm_loc_lockout4count: "0",
            itm_loc_maximum: ".0000",
            itm_loc_next_cnt_date: null,
            itm_loc_oh_qty: ".0000",
            itm_loc_order_pt: ".0000",
            itm_loc_pr_due_in: ".0000",
            itm_loc_prim_locn_flg: PrimaryLocation,
            itm_loc_short_qty: ".0000",
            itm_loc_stock_cost_flag: UpdateStockCosting,
            itm_loc_stk_loc: setMaster_Location.trim(),
            itm_loc_stock_cost_flag: "1",
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };


    const handleOnChangePrimaryLocation = () => {
        setPrimaryLocation(!PrimaryLocation);
        
        if(!PrimaryLocation){
            console.log('1')
            setCheckBox_PrimaryLocation('1')
        }else{
            console.log('0')
            setCheckBox_PrimaryLocation('0')
        }
        }
    
    const handleOnChangeIncreaseTotalOH = () => {
        setIncreaseTotalOH(!IncreaseTotalOH);
        
        if(!IncreaseTotalOH){
            console.log('1')
            setCheckBox_IncreaseTotalOH('1')
        }else{
            console.log('0')
            setCheckBox_IncreaseTotalOH('0')
        }
        }
    
    const handleOnChangeUpdateStockCosting = () => {
        setUpdateStockCosting(!UpdateStockCosting);
        
        if(!UpdateStockCosting){
            console.log('1')
            setCheckBox_UpdateStockCosting('1')
        }else{
            console.log('0')
            setCheckBox_UpdateStockCosting('0')
        }
        }



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
                            <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Location</div>
                            {/* <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div> */}
                        </div> 
                        </div>
                    </div>


                    {/******************** Inventory Location ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Location</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_PrimaryLocation">
                                        <label className="col-sm-5 col-form-label down">Primary Location:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={PrimaryLocation}
                                            onChange={handleOnChangePrimaryLocation}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_StockLocation">
                                        <label className="col-sm-4 col-form-label labelTopAsset down">Stock Location:</label>
                                        <div className="col-sm-8 form-check">
                                        <label className="col-sm-10 form-label">
                                        <Select  
                                                isClearable={true}  
                                                options={Master_Location}
                                                value={selected_Master_Location}
                                                onChange={setSelected_Master_Location} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_IncreaseTotalOH">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Increase Total OH:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={IncreaseTotalOH}
                                            onChange={handleOnChangeIncreaseTotalOH}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_UpdateStockCosting">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Update Stock Costing:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={UpdateStockCosting}
                                            onChange={handleOnChangeUpdateStockCosting}
                                            />
                                            <i className="input-helper"></i>
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
                            <Modal.Title>Location</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_LockoutForCount">
                                    <label className="col-sm-5 col-form-label down">Lockout For Count:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={LockoutForCount} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_PrimaryLocation">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Primary Location:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={PrimaryLocation} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_StockLocation">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Stock Location:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={Master_Location} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_IncreaseTotalOH">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Increase Total OH:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={IncreaseTotalOH} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_UpdateStockCosting">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Update Stock Costing:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={UpdateStockCosting} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_OhQuantity">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Oh Quantity:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={OhQuantity} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_OrderPoint">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Order Point:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={OrderPoint} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_Maximum">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Maximum:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={Maximum} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_PrOutstanding">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Pr Outstanding:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={PrOutstanding} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_PoOutstanding">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Po Outstanding:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={PoOutstanding} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_HardReserve">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Hard Reserve:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={HardReserve} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>
                            
                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_ShortQty">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Short Qty:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={ShortQty} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_LastActivityDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Last Activity Date:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"  
                                        value ={LastActivityDate} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_LastCountDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Last Count Date:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"  
                                        value ={LastCountDate} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_NextCountDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Next Count Date:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"  
                                        value ={NextCountDate} 
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
                            + Add Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InventoryLocation;
