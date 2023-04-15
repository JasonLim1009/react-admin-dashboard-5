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


const PersonnelMRApproval = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [CostCenter, setCostCenter] = useState([]);
  const [selected_CostCenter, setSelected_CostCenter] = useState([]);

  const [ApprovalLimit, setApprovalLimit] = useState("0");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_employeemaster_mr_approval = (site_ID, RowID) => {
    APIServices.get_employeemaster_mr_approval(site_ID, RowID)
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
    get_employeemaster_mr_approval(site_ID, props.data.RowID);
  }, []);



    const get_employee_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


               let CostCenter = responseJson.data.data.CostCenter.map(item => ({
                label: item.costcenter +" : "+ item.descs,
                value: item.costcenter            
                }));
                setCostCenter(CostCenter);


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


                setSelected_CostCenter( {label:responseJson.data.data[index].emp_ls3_costcenter} )
                setApprovalLimit( responseJson.data.data[index].emp_ls3_approval_limit )
               
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
            <td>{result.emp_ls3_costcenter}</td>
            <td>{result.emp_ls3_approval_limit}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setCostCenter( data.emp_ls3_costcenter )
        setApprovalLimit( data.emp_ls3_approval_limit )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setSelected_CostCenter(0);
        setApprovalLimit('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Cost Center
        let CostCenter, setCostCenter;
        if(selected_CostCenter == '' || selected_CostCenter == null){

            setCostCenter=''
        }else{

            CostCenter = selected_CostCenter.label.split(":")
            setCostCenter = CostCenter[0];
            console.log("CostCenter ", CostCenter[0])
        }

        //Select Approval Limit
        console.log("ApprovalLimit: ", ApprovalLimit)

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            emp_ls3_costcenter: setCostCenter.trim(),
            emp_ls3_approval_limit: ApprovalLimit,
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
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

            {/******************** Personnel MR Approval ********************/}
            <div>
                <Modal show={show} onHide={handleClose} centered >

                    <Modal.Header closeButton>
                        <Modal.Title>MR Approval</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_CostCenter">
                                <label className="col-sm-4 col-form-label down left">Cost Center:</label>
                                <div className="col-sm-8">
                                <label className="col-sm-10 form-label">
                                    <Select  
                                       isClearable={true}  
                                       options={CostCenter}
                                       value={selected_CostCenter}
                                       onChange={setSelected_CostCenter} // using id as it is unique
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

                        <div className="col-md-12 moveUoPopUp">
                            <Form.Group className="row" controlId="validation_ApprovalLimit">
                                <label className="col-sm-4 col-form-label top down left">Approval Limit:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".00" 
                                        value={ApprovalLimit} 
                                        onChange={(e) => setApprovalLimit(e.target.value)}
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
                    <Modal.Title>MR Approval</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_CostCenter">
                            <label className="col-sm-4 col-form-label down left">Cost Center:</label>
                            <div className="col-sm-8">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={CostCenter} 
                                  readOnly
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUoPopUp">
                        <Form.Group className="row" controlId="validation_ApprovalLimit">
                            <label className="col-sm-4 col-form-label  top down left">Approval Limit:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ApprovalLimit} 
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
    </div>
  );
};

export default PersonnelMRApproval;
