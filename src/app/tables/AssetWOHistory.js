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
import logo from '../../assets/images/browser-tab.png';


const AssetWOHistory = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [WorkOrderNo, setWorkOrderNo] = useState("");

  const [OriginationDate, setOriginationDate] = useState(new Date());

  const [Status, setStatus] = useState("");

  const [Originator, setOriginator] = useState("");

  const [Phone, setPhone] = useState("");

  const [Description, setDescription] = useState("");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetwohistory = (site_ID, RowID) => {
    APIServices.get_assetwohistory(site_ID, RowID)
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
    get_assetwohistory(site_ID, props.data.RowID);
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


                setWorkOrderNo( responseJson.data.data[index].wko_mst_wo_no )

                if(responseJson.data.data[index].wko_mst_org_date == null){
                    setOriginationDate('')
                }else{

                    setOriginationDate( Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT O Date : '+ Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }
                
                setStatus( responseJson.data.data[index].wko_mst_status )
                setOriginator( responseJson.data.data[index].wko_mst_originator )
                setPhone( responseJson.data.data[index].wko_mst_phone )
                setDescription( responseJson.data.data[index].wko_mst_descs )
               
                

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


        if (result.wko_mst_org_date == null) {
            var org_date = ''
        } else {
    
            var org_date = format(new Date(result.wko_mst_org_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.wko_mst_wo_no}</td>
            <td>{org_date}</td>
            <td>{result.wko_mst_status}</td>
            <td>{result.wko_mst_originator}</td>
            <td>{result.wko_mst_phone}</td>
            <td>{result.wko_mst_descs}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setWorkOrderNo( data.wko_mst_wo_no )
        setOriginationDate( data.wko_mst_org_date )
        setStatus( data.wko_mst_status )
        setOriginator( data.wko_mst_originator )
        setPhone( data.wko_mst_phone )
        setDescription( data.wko_mst_descs )

        setShowModal(true);
    };
    
    const resetData = () => {
    
        setWorkOrderNo('');
        setOriginationDate('');
        setStatus('');
        setOriginator('');
        setPhone('');
        setDescription('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Work Order No
        console.log("WorkOrderNo: ", WorkOrderNo)

        //Select Origination Date
        let Origination_Date = ''
        if (OriginationDate == '' || OriginationDate == null) {

            Origination_Date = '';
        } else {

            Origination_Date = Moment(OriginationDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("NC Date ", OriginationDate);
        }

        //Select Status
        console.log("Status: ", Status)

        //Select Originator
        console.log("Originator: ", Originator)

        //Select Phone
        console.log("Phone: ", Phone)

        //Select Description
        console.log("Description: ", Description)
       


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            wko_mst_wo_no: WorkOrderNo,
            //wko_mst_org_date: Origination_Date,
            wko_mst_status: Status,
            wko_mst_originator: Originator,
            wko_mst_phone: Phone,
            wko_mst_descs: Description,

    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };



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
                        <div style={{ marginRight: '10px', fontWeight: 'bold'}}>WO History</div>
                        <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                    </div> 
                </div>
            </div>
        </Modal.Header>

        <Modal.Body>
             {/******************** WO History ********************/}
             <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>WO History</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_WorkOrderNo">
                                <label className="col-sm-4 col-form-label down left">Work Order No:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={WorkOrderNo} 
                                        onChange={(e) => setWorkOrderNo(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_OriginationDate">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Origination Date:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control        
                                        style={{ fontSize: "13px", height: "38px" }}                                    
                                        type="datetime-local"  
                                        value={OriginationDate} 
                                        onChange={(e) => setOriginationDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Status">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Status:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={Status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Originator">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Originator:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={Originator} 
                                        onChange={(e) => setOriginator(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Phone">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Phone:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={Phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Description">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Description:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={Description} 
                                        onChange={(e) => setDescription(e.target.value)}
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
                    <Modal.Title>WO History</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_WorkOrderNo">
                            <label className="col-sm-4 col-form-label down">Work Order No:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={WorkOrderNo} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_OriginationDate">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Origination Date:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="datetime-local"  
                                value ={OriginationDate} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_Status">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Status:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={Status} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_Originator">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Originator:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={Originator} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_Phone">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Phone:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={Phone} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_Description">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Description:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={Description} 
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

        </Modal.Body>
    </div>
  );
};

export default AssetWOHistory;
