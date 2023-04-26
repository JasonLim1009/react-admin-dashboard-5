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
import logo from '../../assets/images/analytics.png';


const AssetUsage = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [UsageUOM, setUsageUOM] = useState([]);
  const [selected_UsageUOM, setSelected_UsageUOM] = useState([]);

  const [TotalRunningMeter, setTotalRunningMeter] = useState(false);
  const [CheckBox_TotalRunningMeter, setCheckBox_TotalRunningMeter] = useState('0');

  const [MeterPoint, setMeterPoint] = useState("");

  const [Description, setDescription] = useState("");

  const [MeterInstallDate, setMeterInstallDate] = useState(new Date());

  const [MaxAverageUsage, setMaxAverageUsage] = useState("");

  const [WarrantyUsage, setWarrantyUsage] = useState("");

  const [MeterMaximum, setMeterMaximum] = useState("");

  const [AlertMAFlag, setAlertMAFlag] = useState(false);
  const [CheckBox_AlertMAFlag, setCheckBox_AlertMAFlag] = useState('0');

  const [AlertROFlag, setAlertROFlag] = useState(false);
  const [CheckBox_AlertROFlag, setCheckBox_AlertROFlag] = useState('0');

  const [MeterInstallWO, setMeterInstallWO] = useState("");

  const [MeterID, setMeterID] = useState("");
  const [UsageDate, setUsageDate] = useState(new Date());
  const [UsageReading, setUsageReading] = useState("");
  const [AverageUsage, setAverageUsage] = useState("");
  const [OldLTDUsage, setOldLTDUsage] = useState("");
  const [LTDUsage, setLTDUsage] = useState("");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetusage = (site_ID, RowID) => {
    APIServices.get_assetusage(site_ID, RowID)
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
    get_assetusage(site_ID, props.data.RowID);

    get_asset_Status(site_ID, "All", location.state.select);       

},[location]);



    const get_asset_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


               let UsageUOM = responseJson.data.data.Ast_Usage.map(item => ({
                label: item.uom_mst_uom +" : "+ item.uom_mst_desc,
                value: item.uom_mst_uom            
                }));
                setUsageUOM(UsageUOM);


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


                setMeterID( responseJson.data.data[index].ast_ls2_meter_id )
                setSelected_UsageUOM( {label:responseJson.data.data[index].ast_ls2_usage_uom} )
                setTotalRunningMeter( responseJson.data.data[index].ast_ls2_incr_usage_flag )
                setMeterPoint( responseJson.data.data[index].ast_ls2_meter_point )
                setDescription( responseJson.data.data[index].ast_ls2_meter_desc )
               
                if(responseJson.data.data[index].ast_ls2_meter_install_date == null){
                    setMeterInstallDate('')
                }else{

                    setMeterInstallDate( Moment(responseJson.data.data[index].ast_ls2_meter_install_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT MI Date : '+ Moment(responseJson.data.data[index].ast_ls2_meter_install_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setMaxAverageUsage( responseJson.data.data[index].ast_ls2_max_avg_usage )
                setWarrantyUsage( responseJson.data.data[index].ast_ls2_warranty_usage )
                setMeterMaximum( responseJson.data.data[index].ast_ls2_meter_maximum )
                setAlertMAFlag( responseJson.data.data[index].ast_ls2_alert_ma_flag )
                setAlertROFlag( responseJson.data.data[index].ast_ls2_alert_ro_flag )
                setMeterInstallWO( responseJson.data.data[index].ast_ls2_meter_install_wo )
               

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


        if (result.ast_ls2_meter_install_date == null) {
            var install_date = ''
        } else {
    
            var install_date = format(new Date(result.ast_ls2_meter_install_date.date), "dd/MM/yyyy HH:MM")
            
        }

        if (result.ast_ls2_usage_date == null) {
        var usage_date = ''
        } else {

        var usage_date = format(new Date(result.ast_ls2_usage_date.date), "dd/MM/yyyy HH:MM")

        }


        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_ls2_meter_id}</td>
            <td>{result.ast_ls2_usage_uom}</td>
            <td>{result.ast_ls2_incr_usage_flag}</td>
            <td>{result.ast_ls2_meter_point}</td>
            <td>{result.ast_ls2_meter_desc}</td>
            <td>{install_date}</td>
            <td>{usage_date}</td>
            <td>{result.ast_ls2_usage_reading}</td>
            <td>{result.ast_ls2_avg_usage}</td>
            <td>{result.ast_ls2_old_ltd_usage}</td>
            <td>{result.ast_ls2_ltd_usage}</td>
            <td>{result.ast_ls2_max_avg_usage}</td>
            <td>{result.ast_ls2_warranty_usage}</td>
            <td>{result.ast_ls2_meter_maximum}</td>
            <td>{result.ast_ls2_alert_ma_flag}</td>
            <td>{result.ast_ls2_alert_ro_flag}</td>
            <td>{result.ast_ls2_meter_install_wo}</td>

            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setMeterID( data.ast_ls2_meter_id )
        setUsageUOM( data.ast_ls2_usage_uom )
        setTotalRunningMeter( data.ast_ls2_incr_usage_flag )
        setMeterPoint( data.ast_ls2_meter_point )
        setDescription( data.ast_ls2_meter_desc )
        setMeterInstallDate( data.ast_ls2_meter_install_date )
        setUsageDate( data.ast_ls2_usage_date )
        setUsageReading( data.ast_ls2_usage_reading )
        setAverageUsage( data.ast_ls2_avg_usage )
        setOldLTDUsage( data.ast_ls2_old_ltd_usage )
        setLTDUsage( data.ast_ls2_ltd_usage )
        setMaxAverageUsage( data.ast_ls2_max_avg_usage )
        setWarrantyUsage( data.ast_ls2_meter_maximum )
        setMeterMaximum( data.ast_ls2_warranty_usage )
        setAlertMAFlag( data.ast_ls2_alert_ma_flag )
        setAlertROFlag( data.ast_ls2_alert_ro_flag )
        setMeterInstallWO( data.ast_ls2_meter_install_wo )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setMeterID('');
        setSelected_UsageUOM(0);
        setTotalRunningMeter('');
        setMeterPoint('');
        setDescription('');
        setMeterInstallDate('');
        setMaxAverageUsage('');
        setWarrantyUsage('');
        setMeterMaximum('');
        setAlertMAFlag('');
        setAlertROFlag('');
        setMeterInstallWO('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Meter ID
        console.log("MeterID: ", MeterID)

        //Select Usage UOM
        let UsageUOM, setUsageUOM;
        if(selected_UsageUOM == '' || selected_UsageUOM == null){

            setUsageUOM=''
        }else{

            UsageUOM = selected_UsageUOM.label.split(":")
            setUsageUOM = UsageUOM[0];
            console.log("UsageUOM ", UsageUOM[0])
        }

        //Select Total Running Meter
        console.log("TotalRunningMeter: ", TotalRunningMeter)

        //Select Meter Point
        console.log("MeterPoint: ", MeterPoint)

        //Select Description
        console.log("Description: ", Description)

        //Select Last Receive Date
        let Meter_Install_Date = ''
        if (MeterInstallDate == '' || MeterInstallDate == null) {

            Meter_Install_Date = '';
        } else {

            Meter_Install_Date = Moment(MeterInstallDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LR Date ", MeterInstallDate);
        }

        //Select Usage Date
        let Usage_Date = ''
        if (UsageDate == '' || UsageDate == null) {

            Usage_Date = '';
        } else {

            Usage_Date = Moment(UsageDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("U Date ", UsageDate);
        }

        //Select Max Average Usage
        console.log("MaxAverageUsage: ", MaxAverageUsage)


        //Select Warranty Usage
        console.log("WarrantyUsage: ", WarrantyUsage)


        //Select Meter Maximum
        console.log("MeterMaximum: ", MeterMaximum)


        //Select Alert MA Flag
        console.log("AlertMAFlag: ", AlertMAFlag)


        //Select Alert RO Flag
        console.log("AlertROFlag: ", AlertROFlag)


        //Select Meter Install WO
        console.log("MeterInstallWO: ", MeterInstallWO)


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_ls2_meter_id: MeterID,
            ast_ls2_usage_uom: setUsageUOM.trim(),
            ast_ls2_meter_point: MeterPoint,
            ast_ls2_meter_desc: Description,
            //ast_ls2_meter_install_date: Meter_Install_Date,
            //ast_ls2_usage_date: UsageDate,
            ast_ls2_usage_reading: '.00',
            ast_ls2_avg_usage: '.00',
            ast_ls2_old_ltd_usage: '.00',
            ast_ls2_ltd_usage: '.00',
            ast_ls2_max_avg_usage: MaxAverageUsage,
            ast_ls2_meter_maximum: MeterMaximum,
            ast_ls2_warranty_usage: WarrantyUsage,
            ast_ls2_alert_ma_flag: AlertMAFlag,
            ast_ls2_alert_ro_flag: AlertROFlag,
            ast_ls2_meter_install_wo: MeterInstallWO,

    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };


    const handleOnChangeTotalRunningMeter = () => {
        setTotalRunningMeter(!TotalRunningMeter);
        
        if(!TotalRunningMeter){
            console.log('1')
            setCheckBox_TotalRunningMeter('1')
        }else{
            console.log('0')
            setCheckBox_TotalRunningMeter('0')
        }
    }

    const handleOnChangeAlertMAFlag = () => {
        setAlertMAFlag(!AlertMAFlag);
        
        if(!AlertMAFlag){
            console.log('1')
            setCheckBox_AlertMAFlag('1')
        }else{
            console.log('0')
            setCheckBox_AlertMAFlag('0')
        }
    }

    const handleOnChangeAlertROFlag = () => {
        setAlertROFlag(!AlertROFlag);
        
        if(!AlertROFlag){
            console.log('1')
            setCheckBox_AlertROFlag('1')
        }else{
            console.log('0')
            setCheckBox_AlertROFlag('0')
        }
    }


  //Sum calculation
  const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);






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
                                <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Usage</div>
                                <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                            </div> 
                        </div>
                    </div>

                    {/******************** Usage ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Usage</Modal.Title>
                            </Modal.Header>


                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_MeterID">
                                        <label className="col-sm-4 col-form-label down left">Meter ID:</label>
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
                                    <Form.Group className="row" controlId="validation_UsageUOM">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Usage UOM:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                            isClearable={true}  
                                            options={UsageUOM}
                                            value={selected_UsageUOM}
                                            onChange={setSelected_UsageUOM} // using id as it is unique
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

                                <div className="col-md-12 moveUpPopUp checkBoxUsage-md">
                                    <Form.Group className="row" controlId="validation_TotalRunningMeter">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Total Running Meter:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={TotalRunningMeter}
                                            onChange={handleOnChangeTotalRunningMeter}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_MeterPoint">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Meter Point:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"  
                                                value={MeterPoint} 
                                                onChange={(e) => setMeterPoint(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_Description">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Description:</label>
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

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_MeterInstallDate">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Meter Install Date:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control        
                                                style={{ fontSize: "13px", height: "38px" }}                                    
                                                type="datetime-local"  
                                                value={MeterInstallDate} 
                                                onChange={(e) => setMeterInstallDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_MaxAverageUsage">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Max Average Usage:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={MaxAverageUsage} 
                                                onChange={(e) => setMaxAverageUsage(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_WarrantyUsage">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Warranty Usage:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={WarrantyUsage} 
                                                onChange={(e) => setWarrantyUsage(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_MeterMaximum">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Meter Maximum:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={MeterMaximum} 
                                                onChange={(e) => setMeterMaximum(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp checkBoxUsage-md">
                                    <Form.Group className="row" controlId="validation_AlertMAFlag">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Alert MA Flag:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={AlertMAFlag}
                                            onChange={handleOnChangeAlertMAFlag}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp checkBoxUsage-md">
                                    <Form.Group className="row" controlId="validation_AlertROFlag">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Alert RO Flag:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={AlertROFlag}
                                            onChange={handleOnChangeAlertROFlag}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_MeterInstallWO">
                                        <label className="col-sm-4 col-form-label top down left">Meter Install WO:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"  
                                                value={MeterInstallWO} 
                                                onChange={(e) => setMeterInstallWO(e.target.value)}
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
                            <Modal.Title>Usage</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_MeterID">
                                    <label className="col-sm-4 col-form-label down">Meter ID:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={MeterID} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_UsageUOM">
                                    <label className="col-sm-4 col-form-label  labelTopAsset down">Usage UOM:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={UsageUOM} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_TotalRunningMeter">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Total Running Meter:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={TotalRunningMeter} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_MeterPoint">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Meter Point:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={MeterPoint} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_Description">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Description:</label>
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

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_MeterInstallDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Meter Install Date:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"  
                                        value ={MeterInstallDate} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_UsageDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Usage Date:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"  
                                        value ={UsageDate} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_UsageReading">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Usage Reading:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={UsageReading} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_AverageUsage">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Average Usage:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={AverageUsage} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_OldLTDUsage">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Old LTD Usage:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={OldLTDUsage} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_LTDUsage">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">LTD Usage:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={LTDUsage} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_MaxAverageUsage">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Max Average Usage:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={MaxAverageUsage} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_WarrantyUsage">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Warranty Usage:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={WarrantyUsage} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_MeterMaximum">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Meter Maximum:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={MeterMaximum} 
                                        readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_AlertMAFlag">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Alert MA Flag:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={AlertMAFlag} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_AlertROFlag">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Alert RO Flag:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={AlertROFlag} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUp">
                                <Form.Group className="row" controlId="validation_MeterInstallWO">
                                    <label className="col-sm-4 col-form-label labelTopAsset down">Meter Install WO:</label>
                                    <div className="col-sm-8 form-check">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={MeterInstallWO} 
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
                            + Add Usage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AssetUsage;
