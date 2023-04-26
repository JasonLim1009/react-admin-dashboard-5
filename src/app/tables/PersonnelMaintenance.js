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
import logo from '../../assets/images/optimize.png';


const PersonnelMaintenance = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Craft, setCraft] = useState([]);
  const [selected_Craft, setSelected_Craft] = useState([]);

  const [SupervisorID, setSupervisorID] = useState([]);
  const [selected_SupervisorID, setSelected_SupervisorID] = useState([]);

  const [PayRate, setPayRate] = useState("0");

  const [ChargeRate, setChargeRate] = useState("0");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_employeemaster_maintenance = (site_ID, RowID) => {
    APIServices.get_employeemaster_maintenance(site_ID, RowID)
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
    get_employeemaster_maintenance(site_ID, props.data.RowID);

    get_employee_Status(site_ID, "All", location.state.select);       

},[location]);



    const get_employee_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


                let Craft = responseJson.data.data.Employee_Primary_Craft.map(item => ({
                    label: item.crf_mst_crf_cd +" : "+ item.crf_mst_desc,
                    value: item.crf_mst_crf_cd            
                    }));
                    setCraft(Craft);

                let SupervisorID = responseJson.data.data.Employee_Supervisor_Id.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name,
                    value: item.emp_mst_empl_id            
                    }));
                    setSupervisorID(SupervisorID);


                    //get_dropdown_ParentFlag(site_ID,selected_asset);  
                    get_employeemaster_select(site_ID, selected_asset);                
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


    const get_employeemaster_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_employeemaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT EMP: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                setSelected_Craft( {label:responseJson.data.data[index].emp_ls1_craft} )
                setSelected_SupervisorID( {label:responseJson.data.data[index].emp_ls1_supervisor_id} )
                setPayRate( responseJson.data.data[index].emp_ls1_pay_rate )
                setChargeRate( responseJson.data.data[index].emp_ls1_charge_rate )
               
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
              title: 'Oops get_employeemaster_select...',
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


        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.emp_ls1_craft}</td>
            <td>{result.emp_ls1_supervisor_id}</td>
            <td>{result.emp_ls1_pay_rate}</td>
            <td>{result.emp_ls1_charge_rate}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setCraft( data.emp_ls1_craft )
        setSupervisorID( data.emp_ls1_supervisor_id )
        setPayRate( data.emp_ls1_pay_rate )
        setChargeRate( data.emp_ls1_charge_rate )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setSelected_Craft(0);
        setSelected_SupervisorID(0);
        setPayRate('');
        setChargeRate('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Craft
        let Craft, setCraft;
        if(selected_Craft == '' || selected_Craft == null){

            setCraft=''
        }else{

            Craft = selected_Craft.label.split(":")
            setCraft = Craft[0];
            console.log("Craft ", Craft[0])
        }

        //Select Supervisor ID
        let SupervisorID, setSupervisorID;
        if(selected_SupervisorID == '' || selected_SupervisorID == null){

            setSupervisorID=''
        }else{

            SupervisorID = selected_SupervisorID.label.split(":")
            setSupervisorID = SupervisorID[0];
            console.log("SupervisorID ", SupervisorID[0])
        }

        //Select Pay Rate
        console.log("PayRate: ", PayRate)

        //Select Charge Rate
        console.log("ChargeRate: ", ChargeRate)

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            emp_ls1_craft: setCraft.trim(),
            emp_ls1_supervisor_id: setSupervisorID.trim(),
            emp_ls1_pay_rate: PayRate,
            emp_ls1_charge_rate: ChargeRate,
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
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
                            <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Maintenance</div>
                            {/* <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div> */}
                        </div> 
                        </div>
                    </div>

                    {/******************** Personnel Maintenance ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Maintenance</Modal.Title>
                            </Modal.Header>


                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_Craft">
                                        <label className="col-sm-4 col-form-label down left">Craft:</label>
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
                                    <Form.Group className="row" controlId="validation_SupervisorID">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Supervisor ID:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                            isClearable={true}  
                                            options={SupervisorID}
                                            value={selected_SupervisorID}
                                            onChange={setSelected_SupervisorID} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_PayRate">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Pay Rate:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={PayRate} 
                                                onChange={(e) => setPayRate(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_ChargeRate">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Rate:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={ChargeRate} 
                                                onChange={(e) => setChargeRate(e.target.value)}
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
                            <Modal.Title>Maintenance</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_Craft">
                                    <label className="col-sm-4 col-form-label down left">Craft:</label>
                                    <div className="col-sm-8">
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
                                <Form.Group className="row" controlId="validation_SupervisorID">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Supervisor ID:</label>
                                    <div className="col-sm-8">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={SupervisorID} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_PayRate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Pay Rate:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={PayRate} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_ChargeRate">
                                    <label className="col-sm-4 col-form-label labelTopAsset down left">Charge Rate:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={ChargeRate} 
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
                            + Add Maintenance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PersonnelMaintenance;
