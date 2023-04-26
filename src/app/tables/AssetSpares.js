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
import logo from '../../assets/images/tool-box.png';


const AssetSpares = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [StockNo, setStockNo] = useState([]);
  const [selected_StockNo, setSelected_StockNo] = useState([]);

  const [PartNumber, setPartNumber] = useState("");

  const [Description, setDescription] = useState("");

  const [QuantityNeeded, setQuantityNeeded] = useState("0");

  const [TotalOh, setTotalOh] = useState("0");

  const [ManufacturerCode, setManufacturerCode] = useState([]);
  const [selected_ManufacturerCode, setSelected_ManufacturerCode] = useState([]);

  const [ModelNumber, setModelNumber] = useState([]);
  const [selected_ModelNumber, setSelected_ModelNumber] = useState([]);


  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_assetspares = (site_ID, RowID) => {
    APIServices.get_assetspares(site_ID, RowID)
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
    get_assetspares(site_ID, props.data.RowID);

    get_asset_Status(site_ID, "All", location.state.select);       
       
},[location]);


    const get_asset_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


            let StockNo = responseJson.data.data.MRStockno.map(item => ({
                label: item.itm_mst_stockno +" : "+ item.itm_mst_desc,
                value: item.itm_mst_stockno            
                }));
                setStockNo(StockNo);

            let ManufacturerCode = responseJson.data.data.ITM_Manufacturer.map(item => ({
                label: item.mfg_mst_mfg_cd +" : "+ item.mfg_mst_company,
                value: item.mfg_mst_mfg_cd            
                }));
                setManufacturerCode(ManufacturerCode);

            let ModelNumber = responseJson.data.data.Ast_ModelNumber.map(item => ({
                label: item.mfg_mdl_modelno +" : "+ item.mfg_mdl_desc,
                value: item.mfg_mdl_modelno            
                }));
                setModelNumber(ModelNumber);


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


                setSelected_StockNo( {label:responseJson.data.data[index].ast_ls1_stock_no} )
                setPartNumber( responseJson.data.data[index].ast_ls1_varchar1 )
                setDescription( responseJson.data.data[index].ast_ls1_desc )
                setQuantityNeeded( responseJson.data.data[index].ast_ls1_qty_needed )
                setTotalOh( responseJson.data.data[index].itm_mst_ttl_oh )

                setSelected_ManufacturerCode( {label:responseJson.data.data[index].ast_det_mfg_cd} )
                setSelected_ModelNumber( {label:responseJson.data.data[index].ast_det_modelno} )

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


        return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_ls1_stock_no}</td>
            <td>{result.ast_ls1_varchar1}</td>
            <td>{result.ast_ls1_desc}</td>
            <td>{result.ast_ls1_qty_needed}</td>
            <td>{result.itm_mst_ttl_oh}</td>
            
        </tr>
        );
    });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setStockNo( data.ast_ls1_stock_no )
        setPartNumber( data.ast_ls1_varchar1 )
        setDescription( data.ast_ls1_desc )
        setQuantityNeeded( data.ast_ls1_qty_needed )
        setTotalOh( data.itm_mst_ttl_oh )
     
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setManufacturerCode(0);
        setModelNumber(0);
        setStockNo(0);
        setPartNumber('');
        setDescription('');
        setQuantityNeeded('');
        setTotalOh('');
      
    };
    
    
    const handleAddButtonClick  = () => {
    
        let site_ID = localStorage.getItem("site_ID");

        //Select Stock No
        let StockNo, setStockNo;
        if(selected_StockNo == '' || selected_StockNo == null){

            setStockNo=''
        }else{

            StockNo = selected_StockNo.label.split(":")
            setStockNo = StockNo[0];
            console.log("StockNo ", StockNo[0])
        }
       
        //Select Part Number
        console.log("PartNumber: ", PartNumber)

        //Select Description
        console.log("Description: ", Description)

        //Select Quantity Needed
        console.log("QuantityNeeded: ", QuantityNeeded)

        //Select Total Oh
        console.log("TotalOh: ", TotalOh)

        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_ls1_stock_no: setStockNo.trim(),
            ast_ls1_varchar1: PartNumber,
            ast_ls1_desc: Description,
            ast_ls1_qty_needed: QuantityNeeded,
            itm_mst_ttl_oh: '.0000',
    
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
    };


  //Sum calculation
  const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls1_qty_needed) || 0), 0);
  
  //Multiply calculation
  const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.ast_ls1_qty_needed) || 0) * (parseFloat(item.ast_ls1_qty_needed) || 0), 0);





  return (
    <div>
        <div className="row">
            <div className="col-md-6">
                <Form.Group className="row">
                <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>
                    Manufacturer Code:
                </label>
                <div className="col-sm-8">
                        <Select  
                            isClearable={true}  
                            value={selected_ManufacturerCode}
                            onChange={value => {
                                setSelected_ManufacturerCode(value);
                                //handleInputChange();
                                }}
                            options={ManufacturerCode}
                            styles={{
                                control: (styles, { isDisabled }) => ({
                                ...styles,
                                backgroundColor: isDisabled ? '#E9ECEF' : 'white',
                                color: isDisabled ? 'black' : 'inherit',
                                fontSize: '12px', minHeight:'30px',height: "34px"
                                }),
                                singleValue: (styles, { isDisabled }) => ({
                                ...styles,
                                color: isDisabled ? '#495057' : 'inherit',
                                fontSize: '12px', paddingLeft:'2px'
                                }),
                                menuList: (styles) => ({ ...styles, fontSize: '12px' }),
                                dropdownIndicator: (styles) => ({ ...styles, height: '32px' }),
                                noOptionsMessage: (styles) => ({ ...styles, fontSize: "12px",marginTop: '-5px' }),
                            }}
                        />
                </div>
                </Form.Group>
            </div>

            <div className="col-md-6 moveUp-md moveUp-sm">
                <Form.Group className="row">
                <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                    Model Number:
                </label>
                <div className="col-sm-8">
                    <Select  
                        isClearable={true}  
                        options={ModelNumber}
                        value={selected_ModelNumber}
                        onChange={value => {
                            setSelected_ModelNumber(value);
                           // handleInputChange();
                            }} // using id as it is unique
                        required
                        styles={{
                            control: (styles, { isDisabled }) => ({
                            ...styles,
                            backgroundColor: isDisabled ? '#E9ECEF' : 'white',
                            color: isDisabled ? 'black' : 'inherit',
                            fontSize: '12px', minHeight:'30px',height: "34px"
                            }),
                            singleValue: (styles, { isDisabled }) => ({
                            ...styles,
                            color: isDisabled ? '#495057' : 'inherit',
                            fontSize: '12px', paddingLeft:'2px'
                            }),
                            menuList: (styles) => ({ ...styles, fontSize: '12px' }),
                            dropdownIndicator: (styles) => ({ ...styles, height: '32px' }),
                            noOptionsMessage: (styles) => ({ ...styles, fontSize: "12px",marginTop: '-5px' }),
                        }}
                    />
                </div>
                </Form.Group>
            </div>
        </div>

        <div className="card">
            <div className="card-body" style={{ borderRadius: '4px', boxShadow: '2px 2px 15px 2px #f0f0f0'}}>
                <div>
                    <div style={{ paddingBottom: '20px', backgroundColor: 'white' }}>
                        <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                            <div style={{ marginRight: '10px' }}>
                                <img src={logo} style={{ width: '60px', height: '60px' }}/>
                            </div>
                            <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Spares</div>
                                <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                            </div> 
                        </div>
                    </div>

                    {/******************** Spares ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Spares</Modal.Title>
                            </Modal.Header>


                            <Modal.Body>
                                <div className="col-md-12">
                                    <Form.Group className="row" controlId="validation_StockNo">
                                        <label className="col-sm-4 col-form-label down left">Stock No:</label>
                                        <div className="col-sm-8">
                                        <label className="col-sm-10 form-label">
                                            <Select  
                                            isClearable={true}  
                                            options={StockNo}
                                            value={selected_StockNo}
                                            onChange={setSelected_StockNo} // using id as it is unique
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
                                    <Form.Group className="row" controlId="validation_PartNumber">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Part Number:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"  
                                                value={PartNumber} 
                                                onChange={(e) => setPartNumber(e.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp">
                                    <Form.Group className="row" controlId="validation_QuantityNeeded">
                                        <label className="col-sm-4 col-form-label labelTopAsset down left">Quantity Needed:</label>
                                        <div className="col-sm-8 form-label">
                                        <label className="col-sm-10 form-label">
                                            <Form.Control  
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="number"  
                                                placeholder=".00" 
                                                value={QuantityNeeded} 
                                                onChange={(e) => setQuantityNeeded(e.target.value)}
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
                            <Modal.Title>Spares</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_StockNo">
                                    <label className="col-sm-4 col-form-label down left">Stock No:</label>
                                    <div className="col-sm-8">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={StockNo} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_PartNumber">
                                    <label className="col-sm-4 col-form-label down left">Part Number:</label>
                                    <div className="col-sm-8">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={PartNumber} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Description">
                                    <label className="col-sm-4 col-form-label  labelTopAsset down left">Description:</label>
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
                                <Form.Group className="row" controlId="validation_QuantityNeeded">
                                    <label className="col-sm-4 col-form-label  labelTopAsset down left">Quantity Needed:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value ={QuantityNeeded} 
                                        readOnly
                                        />
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_TotalOh">
                                    <label className="col-sm-4 col-form-label  labelTopAsset down left">Total Oh:</label>
                                    <div className="col-sm-8 form-label">
                                    <label className="col-sm-10 form-label">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        placeholder=".0000"
                                        value ={TotalOh} 
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
                            + Add Spares
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AssetSpares;
