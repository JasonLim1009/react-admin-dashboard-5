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
import logo from '../../assets/images/specification.png';


const AssetSpecification = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Description, setDescription] = useState("");
  
  const [Rating, setRating] = useState("");

  const [UOM, setUOM] = useState([]);
  const [selected_UOM, setSelected_UOM] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetspecification = (site_ID, RowID) => {
    APIServices.get_assetspecification(site_ID, RowID)
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
    get_assetspecification(site_ID, props.data.RowID);
  }, []);



    const get_asset_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


               let UOM = responseJson.data.data.Ast_Specification.map(item => ({
                label: item.uom_mst_uom +" : "+ item.uom_mst_desc,
                value: item.uom_mst_uom            
                }));
                setUOM(UOM);


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

                
                setDescription( responseJson.data.data[index].ast_rat_desc )
                setRating( responseJson.data.data[index].ast_rat_rating )
                setSelected_UOM( {label:responseJson.data.data[index].ast_rat_uom} )
                
               
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


        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_rat_desc}</td>
            <td>{result.ast_rat_rating}</td>
            <td>{result.ast_rat_uom}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setDescription( data.ast_rat_desc )
        setRating( data.ast_rat_rating )
        setUOM( data.ast_rat_uom )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setDescription('');
        setRating('');
        setSelected_UOM(0);
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");

        //Select Description
        console.log("Description: ", Description)

        //Select Rating
        console.log("Rating: ", Rating)
        
        //Select UOM
        let UOM, setUOM;
        if(selected_UOM == '' || selected_UOM == null){

            setUOM=''
        }else{

            UOM = selected_UOM.label.split(":")
            setUOM = UOM[0];
            console.log("UOM ", UOM[0])
        }
       
   
   

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_rat_desc: Description,
            ast_rat_rating: Rating,
            ast_rat_uom: setUOM.trim(),

    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };


  //Sum calculation
  //const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  //const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);





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
                                <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Specification</div>
                                {/* <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div> */}
                            </div> 
                        </div>
                    </div>

                    {/******************** Specification ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Specification</Modal.Title>
                            </Modal.Header>


                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_Description">
                                        <label className="col-sm-4 col-form-label top down left">Description:</label>
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
                                    <Form.Group className="row" controlId="validation_Rating">
                                        <label className="col-sm-4 col-form-label top down left">Rating:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"  
                                                value={Rating} 
                                                onChange={(e) => setRating(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_UOM">
                                        <label className="col-sm-4 col-form-label down left">UOM:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                            isClearable={true}  
                                            options={UOM}
                                            value={selected_UOM}
                                            onChange={setSelected_UOM} // using id as it is unique
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
                            <Modal.Title>Specification</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                        <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_Description">
                                    <label className="col-sm-4 col-form-label  top down left">Description:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={Description} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Rating">
                                    <label className="col-sm-4 col-form-label  top down left">Rating:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={Rating} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_UOM">
                                    <label className="col-sm-4 col-form-label down left">UOM:</label>
                                    <div className="col-sm-8">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={UOM} 
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
                            + Add Specification
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AssetSpecification;
