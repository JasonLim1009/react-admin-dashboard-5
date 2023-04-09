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

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';


const InventoryLocation = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState(Result.map(() => false));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      }, []);


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
            <tr key={result.site_cd}>
                <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
                
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

            {/******************** Inventory Location ********************/}
            <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Location</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_PrimaryLocation">
                                <label className="col-sm-5 col-form-label">Primary Location:</label>
                                <div className="col-sm-6 form-check">
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_StockLocation">
                                <label className="col-sm-5 col-form-label">Stock Location:</label>
                                <div className="col-sm-7 form-check">
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_IncreaseTotalOH">
                                <label className="col-sm-5 col-form-label">Increase Total OH:</label>
                                <div className="col-sm-6 form-check">
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_UpdateStockCosting">
                                <label className="col-sm-5 col-form-label">Update Stock Costing:</label>
                                <div className="col-sm-6 form-check">
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
                        <Button variant="primary" onClick={() => {
                            // Close modal
                            handleClose();
                        }}>
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

export default InventoryLocation;
