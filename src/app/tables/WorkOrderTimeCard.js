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

import { format, setHours } from "date-fns";
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';
import logo from '../../assets/images/credit-card.png';


const WorkOrderTimeCard = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);
  
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [EmployeeID, setEmployeeID] = useState([]);
  const [selected_EmployeeID, setSelected_EmployeeID] = useState([]);

  const [Craft, setCraft] = useState([]);
  const [selected_Craft, setSelected_Craft] = useState([]);

  const [TimeCardDate, setTimeCardDate] = useState(new Date());

  const [HourType, setHourType] = useState([]);
  const [selected_HourType, setSelected_HourType] = useState([]);

  const [ActualHour, setActualHour] = useState("0");

  const [ChargeCostCenter, setChargeCostCenter] = useState([]);
  const [selected_ChargeCostCenter, setSelected_ChargeCostCenter] = useState([]);

  const [ChargeAccount, setChargeAccount] = useState([]);
  const [selected_ChargeAccount, setSelected_ChargeAccount] = useState([]);

  const [CreditCostCenter, setCreditCostCenter] = useState([]);
  const [selected_CreditCostCenter, setSelected_CreditCostCenter] = useState([]);

  const [CreditAccount, setCreditAccount] = useState([]);
  const [selected_CreditAccount, setSelected_CreditAccount] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [AssetNo, setAssetNo] = useState("");
  const [Rate, setRate] = useState("");
  const [Multiplier, setMultiplier] = useState("");
  const [Adder, setAdder] = useState("");
  const [ActualCost, setActualCost] = useState("");
  const [TimeCardNo, setTimeCardNo] = useState("");

  

  const get_workordermaster_timecard = (site_ID, RowID) => {
    APIServices.get_workordermaster_timecard(site_ID, RowID)
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
    get_workordermaster_timecard(site_ID, props.data.RowID);

    get_workorder_status(site_ID, "All", location.state.select);       
        
},[location]);


    const get_workorder_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()
    
        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
    
        
            if (responseJson.data.status === 'SUCCESS') {
    
    
                console.log('get_dropdown', responseJson.data)
    
    
                    let EmployeeID = responseJson.data.data.Employee_Supervisor_Id.map(item => ({
                        label: item.emp_mst_empl_id +" : "+ item.emp_mst_name,
                        value: item.emp_mst_empl_id            
                        }));
                        setEmployeeID(EmployeeID);

                    let Craft = responseJson.data.data.Employee_Primary_Craft.map(item => ({
                        label: item.crf_mst_crf_cd +" : "+ item.crf_mst_desc,
                        value: item.crf_mst_crf_cd            
                        }));
                        setCraft(Craft);    
    
                    let HourType = responseJson.data.data.HoursType.map(item => ({
                        label: item.hours_type_cd,
                        value: item.hours_type_cd            
                        }));
                        setHourType(HourType);
    
                    let ChargeCostCenter = responseJson.data.data.CostCenter.map(item => ({
                        label: item.costcenter +" : "+ item.descs,
                        value: item.costcenter            
                        }));
                        setChargeCostCenter(ChargeCostCenter);
    
                    let ChargeAccount = responseJson.data.data.account.map(item => ({
                        label: item.account +" : "+ item.descs,
                        value: item.account            
                        }));
                        setChargeAccount(ChargeAccount);
    
                    let CreditCostCenter = responseJson.data.data.CostCenter.map(item => ({
                        label: item.costcenter +" : "+ item.descs,
                        value: item.costcenter            
                        }));
                        setCreditCostCenter(CreditCostCenter);

                    let CreditAccount = responseJson.data.data.account.map(item => ({
                        label: item.account +" : "+ item.descs,
                        value: item.account            
                        }));
                        setCreditAccount(CreditAccount);


                    //get_dropdown_ParentFlag(site_ID,selected_asset);    
                    get_workordermaster_select(site_ID,selected_asset);    
                    // New_WorkOrderTimeCard();          
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
    

    const get_workordermaster_select = () => {
    
        
        console.log('SELECT ROWID: '+ location.state.RowID)
    
        APIServices.get_workordermaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));
    
            if (responseJson.data.status === 'SUCCESS') {     
                
    
    // **************************************** check read data ******************************************
                console.log('SELECT WKO: '+ JSON.stringify(responseJson.data.data))
                
                for (var index in responseJson.data.data) {
                
                
                setRowID( responseJson.data.data[index].RowID )
    
    
                setSelected_EmployeeID( {label:responseJson.data.data[index].wko_ls8_empl_id} )
                setSelected_Craft( {label:responseJson.data.data[index].wko_ls8_craft} )

                setTimeCardDate( responseJson.data.data[index].wko_ls8_datetime1 )
                if(responseJson.data.data[index].wko_ls8_datetime1 == null){
                    setTimeCardDate('')
                }else{

                    setTimeCardDate( Moment(responseJson.data.data[index].wko_ls8_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT TC Date : '+ Moment(responseJson.data.data[index].itm_sup_last_rcvd_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_HourType( {label:responseJson.data.data[index].wko_ls8_hours_type} )
                setActualHour( responseJson.data.data[index].wko_ls8_hrs )
                setSelected_ChargeCostCenter( {label:responseJson.data.data[index].wko_ls8_chg_costcenter} )
                setSelected_ChargeAccount( {label:responseJson.data.data[index].wko_ls8_chg_account} )
                setSelected_CreditCostCenter( {label:responseJson.data.data[index].wko_ls8_crd_costcenter} )
                setSelected_CreditAccount( {label:responseJson.data.data[index].wko_ls8_crd_account} )
    
    
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
                title: 'Oops get_WorkOrder_select...',
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

        if (result.wko_ls8_datetime1 == null) {
            var wkols8_date = ''
          } else {
    
            var wkols8_date = format(new Date(result.wko_ls8_datetime1.date), "dd/MM/yyyy HH:MM")
    
          }

      return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
          <td>{index + 1}</td>
          <td>{result.wko_ls8_assetno}</td>
          <td>{result.wko_ls8_empl_id}</td>

          <td>{result.wko_ls8_craft}</td>
          <td>{wkols8_date}</td>
          <td>{result.wko_ls8_hours_type}</td>
          <td>{result.wko_ls8_hrs}</td>
          <td>{result.wko_ls8_rate}</td>
          <td>{result.wko_ls8_multiplier}</td>
          <td>{result.wko_ls8_adder}</td>
          <td>{result.wko_ls8_act_cost}</td>
          <td>{result.wko_ls8_chg_costcenter}</td>
          <td>{result.wko_ls8_chg_account}</td>
          <td>{result.wko_ls8_crd_costcenter}</td>
          <td>{result.wko_ls8_crd_account}</td>
          <td>{result.wko_ls8_time_card_no}</td>

        </tr>
      );
    });
    };


    const handleRowClick = (data) => {
    console.log(data);

    setAssetNo( data.wko_ls8_assetno )
    setEmployeeID( data.wko_ls8_empl_id )
    setCraft( data.wko_ls8_craft )
    //setTimeCardDate( wkols8_date )
    setHourType( data.wko_ls8_hours_type )
    setActualHour( data.wko_ls8_hrs )
    setRate( data.wko_ls8_rate )
    setMultiplier( data.wko_ls8_multiplier )
    setAdder( data.wko_ls8_adder )
    setActualCost( data.wko_ls8_act_cost )
    setChargeCostCenter( data.wko_ls8_chg_costcenter )
    setChargeAccount( data.wko_ls8_chg_account )
    setCreditCostCenter( data.wko_ls8_crd_costcenter )
    setCreditAccount( data.wko_ls8_crd_account )
    setTimeCardNo( data.wko_ls8_time_card_no )
 
    setShowModal(true);
    };

    const resetData = () => {

    setSelected_ChargeAccount(0);
    setSelected_ChargeCostCenter(0);
    setSelected_Craft(0);
    setSelected_CreditAccount(0);
    setSelected_CreditCostCenter(0);
    setSelected_EmployeeID(0);
    setSelected_HourType(0);
    setActualHour('');
  
    };


    const handleAddButtonClick  = () => {

    let site_ID = localStorage.getItem("site_ID");
   
    //Select Account
    let EmployeeID, setEmployeeID;
    if(selected_EmployeeID == '' || selected_EmployeeID == null){

        setEmployeeID=''
    }else{

        EmployeeID = selected_EmployeeID.label.split(":")
        setEmployeeID = EmployeeID[0];
        console.log("EmployeeID ", EmployeeID[0])
    }

    //Select Actual Hour
    console.log("ActualHour: ", ActualHour)

    //Select Craft
    let Craft, setCraft;
    if(selected_Craft == '' || selected_Craft == null){

        setCraft=''
    }else{

        Craft = selected_Craft.label.split(":")
        setCraft = Craft[0];
        console.log("Craft ", Craft[0])
    }

    //Select Craft
    let HourType, setHourType;
    if(selected_HourType == '' || selected_HourType == null){

    setHourType=''
    }else{

    HourType = selected_HourType.label.split(":")
    setHourType = HourType[0];
    console.log("HourType ", HourType[0])
    }

    //Select Time Card Date
    let Time_Card_Date = ''
    if (TimeCardDate == '' || TimeCardDate == null) {

        Time_Card_Date = '';
    } else {

        Time_Card_Date = Moment(TimeCardDate).format('yyyy-MM-DD HH:mm:ss').trim();
        console.log("TC Date ", TimeCardDate);
    }

    //Select Charge Cost Center
    let ChargeCostCenter, setChargeCostCenter;
    if(selected_ChargeCostCenter == '' || selected_ChargeCostCenter == null){

    setChargeCostCenter=''
    }else{

    ChargeCostCenter = selected_ChargeCostCenter.label.split(":")
    setChargeCostCenter = ChargeCostCenter[0];
    console.log("ChargeCostCenter ", ChargeCostCenter[0])
    }

    //Select Charge Account
    let ChargeAccount, setChargeAccount;
    if(selected_ChargeAccount == '' || selected_ChargeAccount == null){

    setChargeAccount=''
    }else{

    ChargeAccount = selected_ChargeAccount.label.split(":")
    setChargeAccount = ChargeAccount[0];
    console.log("ChargeAccount ", ChargeAccount[0])
    }

    //Select Credit Cost Center
    let CreditCostCenter, setCreditCostCenter;
    if(selected_CreditCostCenter == '' || selected_CreditCostCenter == null){

    setCreditCostCenter=''
    }else{

    CreditCostCenter = selected_CreditCostCenter.label.split(":")
    setCreditCostCenter = CreditCostCenter[0];
    console.log("CreditCostCenter ", CreditCostCenter[0])
    }

    //Select Credit Account
    let CreditAccount, setCreditAccount;
    if(selected_CreditAccount == '' || selected_CreditAccount == null){

        setCreditAccount=''
    }else{

    CreditAccount = selected_CreditAccount.label.split(":")
    setCreditAccount = CreditAccount[0];
    console.log("CreditAccount ", CreditAccount[0])
    }

    const newPart = {
        
        mst_RowID: location.state.RowID,
        site_cd: site_ID,
        wko_ls8_act_cost: ".0000",
        wko_ls8_adder: ".0000",
        wko_ls8_assetno: "TEST123",
        wko_ls8_chg_account: setChargeAccount.trim(),
        wko_ls8_chg_costcenter: setChargeCostCenter.trim(),
        wko_ls8_craft: setCraft.trim(),
        wko_ls8_crd_account: setCreditAccount.trim(),
        wko_ls8_crd_costcenter: setCreditCostCenter.trim(),
        //wko_ls8_datetime1: Time_Card_Date,
        wko_ls8_empl_id: setEmployeeID.trim(),
        wko_ls8_hours_type: setHourType.trim(),
        wko_ls8_hrs: ActualHour,
        wko_ls8_multiplier: "1.0000",
        wko_ls8_rate: ".0000",
        wko_ls8_time_card_no: "TM100003",

      };
      // Add new part to partsList
      setResult([...Result, newPart]);
      console.log(Result);
      // Close modal
      handleClose();
    };



// const New_WorkOrderTimeCard = () => {
//     APIServices.insert_new_workorder_timecard().then((responseJson)=>{
//         if (responseJson.data.status === 'SUCCESS') { 
            
//             Swal.close();

//             Swal.fire({
//                 icon: 'success',
//                 title: responseJson.data.status,
//                 text: responseJson.data.message,
                
//             })

//         }else{
//             Swal.close();
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: responseJson.data,
                
//             })

//         }
        
// }).catch((e) => {
//     Swal.close();
  
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops get_WorkOrder_select...',
//       text: e,          
//     })
//   });

// };



  //Sum calculation
  const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls8_hrs) || 0), 0);
  
  //Multiply calculation
  const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls8_hrs) || 0) * (parseFloat(item.wko_ls8_act_cost) || 0), 0);






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
                            <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Time Card</div>
                            <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                        </div> 
                        </div>
                    </div>

                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Time Card</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_EmployeeID">
                                        <label className="col-sm-4 col-form-label down left">Employee ID:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={EmployeeID}
                                                value={selected_EmployeeID}
                                                onChange={setSelected_EmployeeID} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_Craft">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Craft:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={Craft}
                                                value={selected_Craft}
                                                onChange={setSelected_Craft} // using id as it is unique
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
                                        <Form.Group className="row" controlId="validation_TimeCardDate">
                                            <label className="col-sm-4 col-form-label labelTopAsset down left">Time Card Date:</label>
                                            <div className="col-sm-8 form-label">
                                            <label className="col-sm-10 form-label">
                                                <Form.Control    
                                                    style={{ fontSize: "13px", height: "38px" }}                                        
                                                    type="datetime-local"  
                                                    value={TimeCardDate} 
                                                    onChange={(e) => setTimeCardDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    />
                                            </label>
                                            </div>
                                        </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_HourType">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Hour Type:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={HourType}
                                                value={selected_HourType}
                                                onChange={setSelected_HourType} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_ActualHour">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Actual Hour:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder="1.00" 
                                                value={ActualHour} 
                                                onChange={(e) => setActualHour(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_ChargeCostCenter">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Cost Center:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={ChargeCostCenter}
                                                value={selected_ChargeCostCenter}
                                                onChange={setSelected_ChargeCostCenter} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_ChargeAccount">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Account:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={ChargeAccount}
                                                value={selected_ChargeAccount}
                                                onChange={setSelected_ChargeAccount} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_CreditCostCenter">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Credit Cost Center:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={CreditCostCenter}
                                                value={selected_CreditCostCenter}
                                                onChange={setSelected_CreditCostCenter} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_CreditAccount">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Credit Account:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                                isClearable={true}  
                                                options={CreditAccount}
                                                value={selected_CreditAccount}
                                                onChange={setSelected_CreditAccount} // using id as it is unique
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
                            <Modal.Title>Time Card</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_AssetNo">
                                    <label className="col-sm-4 col-form-label down left">Asset No:</label>
                                    <div className="col-sm-8">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={AssetNo} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_EmployeeID">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Employee ID:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={EmployeeID} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Craft">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Craft:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={Craft} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_TimeCardDate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Time Card Date:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="datetime-local"  
                                            value ={TimeCardDate} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_HourType">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Hour Type:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={HourType} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_ActualHour">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Actual Hour:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={ActualHour} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Rate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Rate:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={Rate} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Multiplier">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Multiplier:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={Multiplier} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Adder">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Adder:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={Adder} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_ActualCost">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Actual Cost:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value={ActualCost}
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_ChargeCostCenter">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Cost Center:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={ChargeCostCenter} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_ChargeAccount">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Account:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={ChargeAccount}
                                                readOnly
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_CreditCostCenter">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Credit Cost Center:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={CreditCostCenter} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_CreditAccount">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Credit Account:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={CreditAccount} 
                                            readOnly
                                            />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_TimeCardNo">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Time Card No:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="text"
                                            value ={TimeCardNo} 
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
                            + Add Time Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WorkOrderTimeCard;
