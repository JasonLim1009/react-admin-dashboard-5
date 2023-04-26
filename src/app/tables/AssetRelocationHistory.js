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
import logoRelocationHistory from '../../assets/images/relocation.png';


const AssetRelocationHistory = (props) => {
 

  const [HeaderRelocationHistory, setHeaderRelocationHistory] = React.useState([]);
  const [ResultRelocationHistory, setResultRelocationHistory] = React.useState([]);

  const [showRelocationHistory, setShowRelocationHistory] = useState(false);
  const handleCloseRelocationHistory = () => {setShowRelocationHistory(false); resetData(); };
  const handleShowRelocationHistory = () => setShowRelocationHistory(true);

  const [showModalRelocationHistory, setShowModalRelocationHistory] = useState(false);
  const handleCloseModalRelocationHistory = () => setShowModalRelocationHistory(false);
  const handleShowModalRelocationHistory = () => setShowModalRelocationHistory(true);

  const [OldLocation, setOldLocation] = useState("");

  const [OldLocDesc, setOldLocDesc] = useState("");

  const [Status, setStatus] = useState("");

  const [NewLocation, setNewLocation] = useState("");

  const [NewLocDesc, setNewLocDesc] = useState("");

  const [Reason, setReason] = useState("");

  const [AuditUser, setAuditUser] = useState("");

  const [AuditDate, setAuditDate] = useState(new Date());

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetrelocationhistory = (site_ID, RowID) => {
    APIServices.get_assetrelocationhistory(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderRelocationHistory(responseJson.data.data.header);
            setResultRelocationHistory(responseJson.data.data.result);
        
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
    get_assetrelocationhistory(site_ID, props.data.RowID);

    get_asset_Status(site_ID, "All", location.state.select);       

},[location]);


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


                setNewLocation( responseJson.data.data[index].ast_loc_s_asset_olocn )
                setNewLocDesc( responseJson.data.data[index].ast_loc_s_asset_nlocn )
                setReason( responseJson.data.data[index].ast_loc_s_asset_reason )
                setAuditUser( responseJson.data.data[index].audit_user )

                if(responseJson.data.data[index].audit_date == null){
                    setAuditDate('')
                }else{

                    setAuditDate( Moment(responseJson.data.data[index].audit_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT O Date : '+ Moment(responseJson.data.data[index].audit_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }
                

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


    //Header
    const renderTableHeaderRelocationHistory = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderRelocationHistory).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
          
    //Body    
    const renderTableRowsRelocationHistory = () => {
    return ResultRelocationHistory.map((result, index) => {


        if (result.audit_date == null) {
            var a_date = ''
        } else {
    
            var a_date = format(new Date(result.audit_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickRelocationHistory(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_loc_s_asset_olocn}</td>
            <td>{result.ast_loc_s_asset_nlocn}</td>
            <td>{result.ast_loc_s_asset_reason}</td>
            <td>{result.audit_user}</td>
            <td>{a_date}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickRelocationHistory = (data) => {
        console.log(data);
    
        setNewLocation( data.ast_loc_s_asset_olocn )
        setNewLocDesc( data.ast_loc_s_asset_nlocn )
        setReason( data.ast_loc_s_asset_reason )
        setAuditUser( data.audit_user )
        setAuditDate( data.audit_date )

        setShowModalRelocationHistory(true);
    };
    
    const resetData = () => {
    
        setNewLocation('');
        setNewLocDesc('');
        setReason('');
        setAuditUser('');
        setAuditDate('');
      
    };
    
    
    const handleAddButtonClickRelocationHistory  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select New Location
        console.log("NewLocation: ", NewLocation)

        //Select New Loc Desc
        console.log("NewLocDesc: ", NewLocDesc)

        //Select Reason
        console.log("Reason: ", Reason)

        //Select Audit User
        console.log("AuditUser: ", AuditUser)

        //Select Audit Date
        let A_Date = ''
        if (AuditDate == '' || AuditDate == null) {

            A_Date = '';
        } else {

            A_Date = Moment(AuditDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("A Date ", AuditDate);
        }

        

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_loc_s_asset_olocn: NewLocation,
            ast_loc_s_asset_nlocn: NewLocDesc,
            ast_loc_s_asset_reason: Reason,
            audit_user: AuditUser,
            //audit_date: A_Date,

    
          };
          // Add new part to partsList
          setResultRelocationHistory([...ResultRelocationHistory, newPart]);
          console.log(ResultRelocationHistory);
          // Close modal
          handleCloseRelocationHistory();
    };


  //Sum calculation
  const totalQtyRelocationHistory = ResultRelocationHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCostRelocationHistory = ResultRelocationHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);






  return (
    <div>
        <Modal.Header closeButton>
            
            {/* <Modal.Title>PM Setup</Modal.Title> */}
            <div>
                <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                    <div style={{ marginRight: '10px' }}>
                        <img src={logoRelocationHistory} style={{ width: '60px', height: '60px' }}/>
                    </div>
                    <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Relocation History</div>
                        <div><span style={{color: "blue"}}>{(totalQtyRelocationHistory * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostRelocationHistory.toFixed(2)}</span></div>
                    </div> 
                </div>
            </div>
        </Modal.Header>

        <Modal.Body>
             {/******************** Relocation History ********************/}
             <div>
                <Modal show={showRelocationHistory} onHide={handleCloseRelocationHistory} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Relocation History</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_NewLocation">
                                <label className="col-sm-4 col-form-label down left">New Location:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={NewLocation} 
                                        onChange={(e) => setNewLocation(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_NewLocDesc">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">New Loc Desc:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={NewLocDesc} 
                                        onChange={(e) => setNewLocDesc(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_Reason">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Reason:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={Reason} 
                                        onChange={(e) => setReason(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_AuditUser">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Audit User:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={AuditUser} 
                                        onChange={(e) => setAuditUser(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_AuditDate">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Audit Date:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control        
                                        style={{ fontSize: "13px", height: "38px" }}                                    
                                        type="datetime-local"  
                                        value={AuditDate} 
                                        onChange={(e) => setAuditDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                        
                    </Modal.Body>
                    

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseRelocationHistory}>Close</Button>
                        <Button variant="primary" onClick={handleAddButtonClickRelocationHistory}>
                        {/* {Button_save} */}
                        Submit
                        </Button>
                    </Modal.Footer>

                </Modal>


                {showModalRelocationHistory && (
                <Modal show={showModalRelocationHistory} onHide={handleCloseModalRelocationHistory} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Relocation History</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_NewLocation">
                            <label className="col-sm-4 col-form-label down">New Location:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={NewLocation} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_NewLocDesc">
                            <label className="col-sm-4 col-form-label labelTopEmail down">New Loc Desc:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={NewLocDesc} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_Reason">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Reason:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={Reason} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_AuditUser">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Audit User:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={AuditUser} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_AuditDate">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Audit Date:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="datetime-local"  
                                value ={AuditDate} 
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
                    <tr>{renderTableHeaderRelocationHistory()}</tr>
                </thead>
                <tbody>{renderTableRowsRelocationHistory()}</tbody>
                </table>
            </div>

        </Modal.Body>
    </div>
  );
};

export default AssetRelocationHistory;
