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


const WorkRequestList2 = (props) => {


  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [UDFText_1, setUDFText_1] = useState("");
  const [UDFText_2, setUDFText_2] = useState("");
  const [UDFText_3, setUDFText_3] = useState("");

  const [UDFNumber_1, setUDFNumber_1] = useState("0");
  const [UDFNumber_2, setUDFNumber_2] = useState("0");

  const [UDFDate_1, setUDFDate_1] = useState(new Date());
  const [UDFDate_2, setUDFDate_2] = useState(new Date());
  const [UDFDate_3, setUDFDate_3] = useState(new Date());

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_workrequestmaster_list2 = (site_ID, RowID) => {
    APIServices.get_workrequestmaster_list2(site_ID, RowID)
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
    get_workrequestmaster_list2(site_ID, props.data.RowID);
    }, []);



    const get_workrequest_status = (site_ID, type, selected_asset) => {

    Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
    Swal.showLoading()
  
    APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
  
   
        if (responseJson.data.status === 'SUCCESS') {
  
           console.log('get_dropdown', responseJson.data)
  
                
            //get_dropdown_ParentFlag(site_ID,selected_asset);    
            get_workrequest_select(site_ID,selected_asset);
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
  
  
    const get_workrequest_select = () => {
  
        
    console.log('SELECT ROWID: '+ location.state.RowID)
  
    APIServices.get_workrequest_select(location.state.RowID).then((responseJson)=>{         
        
        console.log('SELECT response: '+ JSON.stringify(responseJson));
  
        if (responseJson.data.status === 'SUCCESS') {     
            
  
  // **************************************** check read data ******************************************
            console.log('SELECT WKR: '+ JSON.stringify(responseJson.data.data))
           
           for (var index in responseJson.data.data) {
           
            
            setRowID( responseJson.data.data[index].RowID )
  
            
            setUDFText_1( responseJson.data.data[index].wkr_ls2_varchar1 )
            setUDFText_2( responseJson.data.data[index].wkr_ls2_varchar2 )
            setUDFText_3( responseJson.data.data[index].wkr_ls2_varchar3 )

            setUDFNumber_1( responseJson.data.data[index].wkr_ls2_numeric1 )
            setUDFNumber_2( responseJson.data.data[index].wkr_ls2_numeric2 )
  
            if(responseJson.data.data[index].wkr_ls2_datetime1 == null){
                setUDFDate_1('')
            }else{

                setUDFDate_1( Moment(responseJson.data.data[index].wkr_ls2_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
            }

            if(responseJson.data.data[index].wkr_ls2_datetime2 == null){
                setUDFDate_2('')
            }else{

                setUDFDate_2( Moment(responseJson.data.data[index].wkr_ls2_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 2 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
            }

            if(responseJson.data.data[index].wkr_ls2_datetime3 == null){
                setUDFDate_3('')
            }else{

                setUDFDate_3( Moment(responseJson.data.data[index].wkr_ls2_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                console.log('SELECT Date 3 : '+ Moment(responseJson.data.data[index].wkr_ls2_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
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
          title: 'Oops get_WorkRequest_select...',
          text: e,          
        })
      });
  
    }
  
  
  useEffect(() => {
  
    let site_ID = localStorage.getItem("site_ID");
  
    // console.log('select select',location.state.select);
    // console.log('select WKRID',location.state.RowID);
  
    get_workrequest_status(site_ID, "All", location.state.select);       
   
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
    
            if (result.wkr_ls2_datetime1 == null) {
                var datetime1 = ''
              } else {
        
                var datetime1 = format(new Date(result.wkr_ls2_datetime1.date), "dd/MM/yyyy HH:MM")
        
              }
    
              if (result.wkr_ls2_datetime2 == null) {
                var datetime2 = ''
              } else {
        
                var datetime2 = format(new Date(result.wkr_ls2_datetime2.date), "dd/MM/yyyy HH:MM")
        
              }
    
              if (result.wkr_ls2_datetime3 == null) {
                var datetime3 = ''
              } else {
        
                var datetime3 = format(new Date(result.wkr_ls2_datetime3.date), "dd/MM/yyyy HH:MM")
        
              }
    
          return (
            <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
              <td>{index + 1}</td>
              <td>{result.wkr_ls2_varchar1}</td>
              <td>{result.wkr_ls2_varchar2}</td>
              <td>{result.wkr_ls2_varchar3}</td>
              <td>{datetime1}</td>
              <td>{datetime2}</td>
              <td>{datetime3}</td>
              <td>{result.wkr_ls2_numeric1}</td>
              <td>{result.wkr_ls2_numeric2}</td>
              
            </tr>
          );
        });
    };
    
   
    const handleRowClick = (data) => {
      console.log(data);
  
      setUDFText_1( data.wkr_ls2_varchar1 )
      setUDFText_2( data.wkr_ls2_varchar2 )
      setUDFText_3( data.wkr_ls2_varchar3 )
      setUDFDate_1( data.wkr_ls2_datetime1 )
      setUDFDate_2( data.wkr_ls2_datetime2 )
      setUDFDate_3( data.wkr_ls2_datetime3 )
      setUDFNumber_1( data.wkr_ls2_numeric1 )
      setUDFNumber_2( data.wkr_ls2_numeric2 )
   
      setShowModal(true);
  };
  
  const resetData = () => {
  
      setUDFDate_1('');
      setUDFDate_2('');
      setUDFNumber_1('');
      setUDFNumber_2('');
      setUDFText_1('');
      setUDFText_2('');
      setUDFText_3('');
    
  };
  
  
  const handleAddButtonClick  = () => {
  
      let site_ID = localStorage.getItem("site_ID");
     
     //Select Date 1
     let date_1 = ''
     if (UDFDate_1 == '' || UDFDate_1 == null) {

         date_1 = '';
     } else {

         date_1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
         console.log("Date1 ", date_1);
     }

     //Select Date 2
     let date_2 = ''
     if (UDFDate_2 == '' || UDFDate_2 == null) {

         date_2 = '';
     } else {

         date_2 = Moment(UDFDate_2).format('yyyy-MM-DD HH:mm:ss').trim();
         console.log("Date2 ", date_2);
     }

     //Select Date 3
     let date_3 = ''
     if (UDFDate_3 == '' || UDFDate_3 == null) {

         date_3 = '';
     } else {

         date_3 = Moment(UDFDate_3).format('yyyy-MM-DD HH:mm:ss').trim();
         console.log("Date1 ", date_3);
     }

      //Select UDFNumber_1
      console.log("UDFNumber_1: ", UDFNumber_1)

      //Select UDFNumber_2
      console.log("UDFNumber_2: ", UDFNumber_2)

      //Select UDFText_1
      console.log("UDFText_1: ", UDFText_1)

      //Select UDFText_2
      console.log("UDFText_2: ", UDFText_2)

      //Select UDFText_3
      console.log("UDFText_3: ", UDFText_3)

      const newPart = {
          
          mst_RowID: location.state.RowID,
          site_cd: site_ID,
          // wkr_ls1_datetime1: date_1,
          // wkr_ls1_datetime2: date_2,
          // wkr_ls1_datetime3: date_3,
          wkr_ls2_numeric1: UDFNumber_1,
          wkr_ls2_numeric2: UDFNumber_2,
          wkr_ls2_varchar1: UDFText_1,
          wkr_ls2_varchar2: UDFText_2,
          wkr_ls2_varchar3: UDFText_3,
  
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

      {/******************** Work Request List 2 ********************/}
        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Work Request List 2</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Varchar1">
                            <label className="col-sm-4 col-form-label">Varchar1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_1}
                                    onChange={(e) => setUDFText_1(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Varchar2">
                            <label className="col-sm-4 col-form-label">Varchar2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_2}
                                    onChange={(e) => setUDFText_2(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Varchar3">
                            <label className="col-sm-4 col-form-label">Varchar3:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_3}
                                    onChange={(e) => setUDFText_3(e.target.value)}
                                />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime1">
                            <label className="col-sm-4 col-form-label">Datetime1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control     
                                    style={{ fontSize: "13px", height: "38px" }}                                       
                                    type="datetime-local"  
                                    value={UDFDate_1} 
                                    onChange={(e) => setUDFDate_1(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime2">
                            <label className="col-sm-4 col-form-label">Datetime2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control         
                                    style={{ fontSize: "13px", height: "38px" }}                                   
                                    type="datetime-local"  
                                    value={UDFDate_2} 
                                    onChange={(e) => setUDFDate_2(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime3">
                            <label className="col-sm-4 col-form-label">Datetime3:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control    
                                    style={{ fontSize: "13px", height: "38px" }}                                        
                                    type="datetime-local"  
                                    value={UDFDate_3} 
                                    onChange={(e) => setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Numeric1">
                            <label className="col-sm-4 col-form-label">Numeric1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_1} 
                                    onChange={(e) => setUDFNumber_1(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Numeric2">
                            <label className="col-sm-4 col-form-label">Numeric2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_2} 
                                    onChange={(e) => setUDFNumber_2(e.target.value)}
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
                  <Modal.Title>Work Request List 2</Modal.Title>
              </Modal.Header>


              <Modal.Body>
              <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Varchar1">
                            <label className="col-sm-4 col-form-label">Varchar1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_1}
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Varchar2">
                            <label className="col-sm-4 col-form-label">Varchar2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_2}
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Varchar3">
                            <label className="col-sm-4 col-form-label">Varchar3:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={UDFText_3}
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime1">
                            <label className="col-sm-4 col-form-label">Datetime1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control     
                                    style={{ fontSize: "13px", height: "38px" }}                                       
                                    type="datetime-local"  
                                    value={UDFDate_1} 
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime2">
                            <label className="col-sm-4 col-form-label">Datetime2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control         
                                    style={{ fontSize: "13px", height: "38px" }}                                   
                                    type="datetime-local"  
                                    value={UDFDate_2} 
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Datetime3">
                            <label className="col-sm-4 col-form-label">Datetime3:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control    
                                    style={{ fontSize: "13px", height: "38px" }}                                        
                                    type="datetime-local"  
                                    value={UDFDate_3} 
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Numeric1">
                            <label className="col-sm-4 col-form-label">Numeric1:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_1} 
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                        <Form.Group className="row" controlId="validation_Numeric2">
                            <label className="col-sm-4 col-form-label">Numeric2:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".0000" 
                                    value={UDFNumber_2} 
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

export default WorkRequestList2;
