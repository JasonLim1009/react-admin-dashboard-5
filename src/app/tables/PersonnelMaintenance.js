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

import { format } from "date-fns";
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';


const PersonnelMaintenance = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState(Result.map(() => false));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, []);



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


    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        // console.log('select select',location.state.select);
        // console.log('select EMPID',location.state.RowID);
    
        get_employee_Status(site_ID, "All", location.state.select);       
       

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


        return (
        <tr key={result.site_cd}>
            <td>{ <IndeterminateCheckbox {...result} checked={isCheckedList[index]} onChange={() => handleCheckboxChange(index)} />}</td>
            
            <td>{result.emp_ls1_craft}</td>
            <td>{result.emp_ls1_supervisor_id}</td>
            <td>{result.emp_ls1_pay_rate}</td>
            <td>{result.emp_ls1_charge_rate}</td>
            
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

            {/******************** Personnel Maintenance ********************/}
            <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>Maintenance</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_Craft">
                                <label className="col-sm-4 col-form-label">Craft:</label>
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_SupervisorID">
                                <label className="col-sm-4 col-form-label">Supervisor ID:</label>
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_PayRate">
                                <label className="col-sm-4 col-form-label">Pay Rate:</label>
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

                        <div className="col-md-12" style={{ marginTop: "-20px" }}>
                            <Form.Group className="row" controlId="validation_ChargeRate">
                                <label className="col-sm-4 col-form-label">Charge Rate:</label>
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
                        <Button variant="primary" onClick={() => {
                            // Close modal
                            handleClose();
                        }}>
                        {/* {Button_save} */}
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

export default PersonnelMaintenance;
