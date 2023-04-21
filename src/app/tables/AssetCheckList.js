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
import logo from '../../assets/images/moving.png';


const AssetCheckList = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [CheckListCode, setCheckListCode] = useState("");

  const [CheckListDescription, setCheckListDescription] = useState("");

  const [CarryToWorkOrder, setCarryToWorkOrder] = useState(false)    
  const [selected_CarryToWorkOrder, setselected_CarryToWorkOrder] = useState('0') 
  const [CheckBox_CarryToWorkOrder, setCheckBox_CarryToWorkOrder] = useState('')  


  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetchecklist = (site_ID, RowID) => {
    APIServices.get_assetchecklist(site_ID, RowID)
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
    get_assetchecklist(site_ID, props.data.RowID);
  }, []);



    const get_asset_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)



                    //get_dropdown_ParentFlag(site_ID,selected_asset);  
                    get_assetmaster_select(site_ID, selected_asset);                
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


    const get_assetmaster_select = (site_ID,selected_asset)=>{
      
        var json ={

            "site_cd": site_ID,
            "ast_mst_asset_no": selected_asset,
            "asset_shortdesc":"",
            "cost_center":"",
            "asset_status":"",
            "asset_type":"",
            "asset_grpcode":"",
            "work_area":"",
            "asset_locn":"",
            "asset_code":"",
            "ast_lvl":"",
            "ast_sts_typ_cd":"",
            "createby":"",
            "service_type":"",
            "block":"",
            "floor":""
        }

       

        console.log('select Asset',JSON.stringify(json))
        
        APIServices.get_assetmaster_select(JSON.stringify(json)).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT AST: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                setCheckListCode( responseJson.data.data[index].ast_job_job_cd )
                setCheckListDescription( responseJson.data.data[index].job_mst_desc )
                setCarryToWorkOrder( responseJson.data.data[index].ast_job_carry )
                

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
              title: 'Oops get_assetmaster_select...',
              text: e,          
            })
          });

    }


    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        // console.log('select select',location.state.select);
        // console.log('select EMPID',location.state.RowID);
    
        get_asset_Status(site_ID, "All", location.state.select);       
       

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


        if (result.audit_date == null) {
            var a_date = ''
        } else {
    
            var a_date = format(new Date(result.audit_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_job_job_cd}</td>
            <td>{result.job_mst_desc}</td>
            <td>{result.ast_job_carry}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setCheckListCode( data.ast_job_job_cd )
        setCheckListDescription( data.job_mst_desc )
        setCarryToWorkOrder( data.ast_job_carry )

        setShowModal(true);
    };
    
    const resetData = () => {
    
        setCheckListCode('');
        setCheckListDescription('');
        setCarryToWorkOrder('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Check List Code
        console.log("CheckListCode: ", CheckListCode)

        //Select Check List Description
        console.log("CheckListDescription: ", CheckListDescription)

        //Select Carry ToWork Order
        console.log("CarryToWorkOrder: ", CarryToWorkOrder)


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_job_job_cd: CheckListCode,
            job_mst_desc: CheckListDescription,
            ast_job_carry: CarryToWorkOrder,
         
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };


    
    const handleOnChangeCarryToWorkOrder = () => {
        setCarryToWorkOrder(!CarryToWorkOrder);
        
        if(!CarryToWorkOrder){
            console.log('1')
            setCheckBox_CarryToWorkOrder('1')
        }else{
            console.log('0')
            setCheckBox_CarryToWorkOrder('0')
        }
    }



  //Sum calculation
  const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);






  return (
    <div>
        <Modal.Header closeButton>
            
            {/* <Modal.Title>PM Setup</Modal.Title> */}
            <div>
                <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                    <div style={{ marginRight: '10px' }}>
                        <img src={logo} style={{ width: '60px', height: '60px' }}/>
                    </div>
                    <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Check List</div>
                        <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                    </div> 
                </div>
            </div>
        </Modal.Header>

        <Modal.Body>
             {/******************** Check List ********************/}
             <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Check List</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_CheckListCode">
                                <label className="col-sm-4 col-form-label down left">Check List Code:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={CheckListCode} 
                                        onChange={(e) => setCheckListCode(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_CheckListDescription">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Check List Description:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={CheckListDescription} 
                                        onChange={(e) => setCheckListDescription(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_CarryToWorkOrder">
                                <label className="col-sm-5 col-form-label down">Carry To Work Order:</label>
                                <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft-sm">
                                <label className="form-check-label">
                                    <input type="checkbox" 
                                    className="form-check-input"
                                    checked={CarryToWorkOrder}
                                    onChange={handleOnChangeCarryToWorkOrder}
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
                    <Modal.Title>Check List</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_CheckListCode">
                            <label className="col-sm-4 col-form-label down">Check List Code:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={CheckListCode} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_CheckListDescription">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Check List Description:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={CheckListDescription} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_CarryToWorkOrder">
                            <label className="col-sm-5 col-form-label labelTopEmail down">Carry To Work Order:</label>
                            <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft-sm">
                            <label className="form-check-label">
                                <input
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="checkbox" 
                                    checked={CarryToWorkOrder} 
                                    readOnly
                                />
                                <i className="input-helper"></i>
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
                    + Add Check List
                </button>
            </div>
        </Modal.Body>
    </div>
  );
};

export default AssetCheckList;
