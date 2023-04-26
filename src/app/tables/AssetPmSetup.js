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
import logoPmSetup from '../../assets/images/work-time.png';


const AssetPmSetup = (props) => {
 

  const [HeaderPmSetup, setHeaderPmSetup] = React.useState([]);
  const [ResultPmSetup, setResultPmSetup] = React.useState([]);

  const [showPmSetup, setShowPmSetup] = useState(false);
  const handleClosePmSetup = () => {setShowPmSetup(false); resetData(); };
  const handleShowPmSetup = () => setShowPmSetup(true);

  const [showModalPmSetup, setShowModalPmSetup] = useState(false);
  const handleCloseModalPmSetup = () => setShowModalPmSetup(false);
  const handleShowModalPmSetup = () => setShowModalPmSetup(true);

  const [PMNo, setPMNo] = useState("");

  const [CurrentWorkOrder, setCurrentWorkOrder] = useState("");

  const [FrequencyCode, setFrequencyCode] = useState("");

  const [DescriptionPmSetup, setDescriptionPmSetup] = useState("");

  const [MeterID, setMeterID] = useState("");

  const [LPMUsage, setLPMUsage] = useState("");

  const [LPMUOM, setLPMUOM] = useState("");

  const [NextCreateDate, setNextCreateDate] = useState(new Date());

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetpmsetup = (site_ID, RowID) => {
    APIServices.get_assetpmsetup(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderPmSetup(responseJson.data.data.header);
            setResultPmSetup(responseJson.data.data.result);
        
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
    get_assetpmsetup(site_ID, props.data.RowID);

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


                setPMNo( responseJson.data.data[index].prm_mst_pm_no )
                setCurrentWorkOrder( responseJson.data.data[index].prm_mst_curr_wo )
                setFrequencyCode( responseJson.data.data[index].prm_mst_freq_code )
                setDescriptionPmSetup( responseJson.data.data[index].prm_mst_desc )
                setMeterID( responseJson.data.data[index].prm_mst_meter_id )
                setLPMUsage( responseJson.data.data[index].prm_mst_lpm_usg )
                setLPMUOM( responseJson.data.data[index].prm_mst_lpm_uom )
               
                if(responseJson.data.data[index].prm_mst_next_create == null){
                    setNextCreateDate('')
                }else{

                    setNextCreateDate( Moment(responseJson.data.data[index].prm_mst_next_create.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT NC Date : '+ Moment(responseJson.data.data[index].prm_mst_next_create.date).format('YYYY-MM-DDTHH:mm:ss'))
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
    const renderTableHeaderPmSetup = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderPmSetup).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
          
    //Body    
    const renderTableRowsPmSetup = () => {
    return ResultPmSetup.map((result, index) => {


        if (result.prm_mst_next_create == null) {
            var next_date = ''
        } else {
    
            var next_date = format(new Date(result.prm_mst_next_create.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickPmSetup(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.prm_mst_pm_no}</td>
            <td>{result.prm_mst_curr_wo}</td>
            <td>{result.prm_mst_freq_code}</td>
            <td>{result.prm_mst_desc}</td>
            <td>{result.prm_mst_meter_id}</td>
            <td>{result.prm_mst_lpm_usg}</td>
            <td>{result.prm_mst_lpm_uom}</td>
            <td>{next_date}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickPmSetup = (data) => {
        console.log(data);
    
        setPMNo( data.prm_mst_pm_no )
        setCurrentWorkOrder( data.prm_mst_curr_wo )
        setFrequencyCode( data.prm_mst_freq_code )
        setDescriptionPmSetup( data.prm_mst_desc )
        setMeterID( data.prm_mst_meter_id )
        setLPMUsage( data.prm_mst_lpm_usg )
        setLPMUOM( data.prm_mst_lpm_uom )
        setNextCreateDate( data.prm_mst_next_create )
        
        setShowModalPmSetup(true);
    };
    
    const resetData = () => {
    
        setPMNo('');
        setCurrentWorkOrder('');
        setFrequencyCode('');
        setDescriptionPmSetup('');
        setMeterID('');
        setLPMUsage('');
        setLPMUOM('');
        setNextCreateDate('');
      
    };
    
    
    const handleAddButtonClickPmSetup  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select PM No
        console.log("PMNo: ", PMNo)

        //Select Current Work Order
        console.log("CurrentWorkOrder: ", CurrentWorkOrder)

        //Select Frequency Code
        console.log("FrequencyCode: ", FrequencyCode)

        //Select Description
        console.log("Description: ", DescriptionPmSetup)

        //Select Meter ID
        console.log("MeterID: ", MeterID)

        //Select LPM Usage
        console.log("LPMUsage: ", LPMUsage)

        //Select LPM UOM
        console.log("LPMUOM: ", LPMUOM)


        //Select Next Create Date
        let NextCreate_Date = ''
        if (NextCreateDate == '' || NextCreateDate == null) {

            NextCreate_Date = '';
        } else {

            NextCreate_Date = Moment(NextCreateDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("NC Date ", NextCreateDate);
        }


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            prm_mst_pm_no: PMNo,
            prm_mst_curr_wo: CurrentWorkOrder,
            prm_mst_freq_code: FrequencyCode,
            prm_mst_desc: DescriptionPmSetup,
            prm_mst_meter_id: MeterID,
            prm_mst_lpm_usg: LPMUsage,
            prm_mst_lpm_uom: LPMUOM,
            //prm_mst_next_create: NextCreate_Date,

    
          };
          // Add new part to partsList
          setResultPmSetup([...ResultPmSetup, newPart]);
          console.log(ResultPmSetup);
          // Close modal
          handleClosePmSetup();
    };


  //Sum calculation
  const totalQtyPmSetup = ResultPmSetup.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCostPmSetup = ResultPmSetup.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);






  return (
    <div>
        <Modal.Header closeButton>
            
            {/* <Modal.Title>PM Setup</Modal.Title> */}
            <div>
                <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                    <div style={{ marginRight: '10px' }}>
                        <img src={logoPmSetup} style={{ width: '60px', height: '60px' }}/>
                    </div>
                    <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginRight: '10px', fontWeight: 'bold'}}>PM Setup</div>
                        <div><span style={{color: "blue"}}>{(totalQtyPmSetup * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostPmSetup.toFixed(2)}</span></div>
                    </div> 
                </div>
            </div>
        </Modal.Header>

        <Modal.Body>
             {/******************** PM Setup ********************/}
             <div>
                <Modal show={showPmSetup} onHide={handleClosePmSetup} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>PM Setup</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_PMNo">
                                <label className="col-sm-4 col-form-label down left">PM No:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={PMNo} 
                                        onChange={(e) => setPMNo(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_CurrentWorkOrder">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Current Work Order:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={CurrentWorkOrder} 
                                        onChange={(e) => setCurrentWorkOrder(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_FrequencyCode">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Frequency Code:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={FrequencyCode} 
                                        onChange={(e) => setFrequencyCode(e.target.value)}
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
                                        value={DescriptionPmSetup} 
                                        onChange={(e) => setDescriptionPmSetup(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_MeterID">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Meter ID:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={MeterID} 
                                        onChange={(e) => setMeterID(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_LPMUsage">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">LPM Usage:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={LPMUsage} 
                                        onChange={(e) => setLPMUsage(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_LPMUOM">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">LPM UOM:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"  
                                        value={LPMUOM} 
                                        onChange={(e) => setLPMUOM(e.target.value)}
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 moveUpPopUp">
                            <Form.Group className="row" controlId="validation_NextCreateDate">
                                <label className="col-sm-4 col-form-label labelTopEmail down left">Next Create Date:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control        
                                        style={{ fontSize: "13px", height: "38px" }}                                    
                                        type="datetime-local"  
                                        value={NextCreateDate} 
                                        onChange={(e) => setNextCreateDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                        </div>
                    </Modal.Body>
                    

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleClosePmSetup}>Close</Button>
                        <Button variant="primary" onClick={handleAddButtonClickPmSetup}>
                        {/* {Button_save} */}
                        Submit
                        </Button>
                    </Modal.Footer>

                </Modal>


                {showModalPmSetup && (
                <Modal show={showModalPmSetup} onHide={handleCloseModalPmSetup} centered >

                <Modal.Header closeButton>
                    <Modal.Title>PM Setup</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_PMNo">
                            <label className="col-sm-4 col-form-label down">PM No:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={PMNo} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_CurrentWorkOrder">
                            <label className="col-sm-4 col-form-label  labelTopEmail down">Current Work Order:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={CurrentWorkOrder} 
                                readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_FrequencyCode">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Frequency Code:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={FrequencyCode} 
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
                                value ={DescriptionPmSetup} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_MeterID">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Meter ID:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={MeterID} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_LPMUsage">
                            <label className="col-sm-4 col-form-label labelTopEmail down">LPM Usage:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={LPMUsage} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_LPMUOM">
                            <label className="col-sm-4 col-form-label labelTopEmail down">LPM UOM:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="text"
                                value ={LPMUOM} 
                                readOnly
                                />
                                <i className="input-helper"></i>
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUp">
                        <Form.Group className="row" controlId="validation_NextCreateDate">
                            <label className="col-sm-4 col-form-label labelTopEmail down">Next Create Date:</label>
                            <div className="col-sm-8 form-check">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                style={{ fontSize: "13px", height: "38px" }}
                                type="datetime-local"  
                                value ={NextCreateDate} 
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
                    <tr>{renderTableHeaderPmSetup()}</tr>
                </thead>
                <tbody>{renderTableRowsPmSetup()}</tbody>
                </table>
            </div>

        </Modal.Body>
    </div>
  );
};

export default AssetPmSetup;
