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
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';
import logo from '../../assets/images/screw.png';



const WorkOrderMaterial = (props) => {
 

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

  const [StockLocation, setStockLocation] = useState([]);
  const [selected_StockLocation, setSelected_StockLocation] = useState([]);

  const [Description, setDescription] = useState("");

  const [ChargeCostCenter, setChargeCostCenter] = useState([]);
  const [selected_ChargeCostCenter, setSelected_ChargeCostCenter] = useState([]);

  const [ChargeAccount, setChargeAccount] = useState([]);
  const [selected_ChargeAccount, setSelected_ChargeAccount] = useState([]);

  const [QtyNeeded, setQtyNeeded] = useState("1.0000");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [AssetNo, setAssetNo] = useState("");
  const [UOM, setUOM] = useState("");
  const [ItemCost, setItemCost] = useState("");
  const [MaterialRequestNo, setMaterialRequestNo] = useState("");
  const [MrLineNo, setMrLineNo] = useState("");
  const [MrApprovalStatus, setMrApprovalStatus] = useState("");
  const [ActualQuantity, setActualQuantity] = useState("");
  const [ContractPoNo, setContractPoNo] = useState("");
  const [ContractPoLine, setContractPoLine] = useState("");



  const get_workordermaster_material = (site_ID, RowID) => {
    APIServices.get_workordermaster_material(site_ID, RowID)
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
    get_workordermaster_material(site_ID, props.data.RowID);

    get_workorder_status(site_ID, "All", location.state.select);   

  }, [location]);



  const get_workorder_status = (site_ID, RowID, selected_asset) => {


    Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
    Swal.showLoading()

    APIServices.get_dropdown(site_ID, RowID).then((responseJson)=>{

   
        if (responseJson.data.status === 'SUCCESS') {


           console.log('get_dropdown', responseJson.data)


              let StockNo = responseJson.data.data.MRStockno.map(item => ({
                label: item.itm_mst_stockno +" : "+ item.itm_mst_desc,
                value: item.itm_mst_stockno            
                }));
                setStockNo(StockNo);

              let StockLocation = responseJson.data.data.ITM_StockLocation.map(item => ({
                label: item.itm_loc_stk_loc +" : "+ item.itm_loc_oh_qty,
                value: item.itm_loc_stk_loc            
                }));
                setStockLocation(StockLocation);

              let ChargeCostCenter = responseJson.data.data.CostCenter.map(item => ({
                label: item.costcenter +" : "+ item.descs,
                value: item.costcenter            
                }));
                setChargeCostCenter(ChargeCostCenter);

              let ChargeAccount = responseJson.data.data.WKO_Labor_Account.map(item => ({
                label: item.account +" : "+ item.descs,
                value: item.account            
                }));
                setChargeAccount(ChargeAccount);


                //get_dropdown_ParentFlag(site_ID,selected_asset);    
                get_workordermaster_select(site_ID,selected_asset);              
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


            setSelected_StockNo( {label:responseJson.data.data[index].wko_ls2_stockno} )
            setSelected_StockLocation( {label:responseJson.data.data[index].wko_ls2_stk_locn} )
            setDescription( responseJson.data.data[index].wko_ls2_desc )
            setSelected_ChargeCostCenter( {label:responseJson.data.data[index].wko_ls2_chg_costcenter} )
            setSelected_ChargeAccount( {label:responseJson.data.data[index].wko_ls2_chg_account} )
            setQtyNeeded( responseJson.data.data[index].wko_ls2_qty_needed )


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

      return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>

          <td>{index + 1}</td>
          {/* <td>{result.wko_ls2_assetno}</td> */}
          <td>{result.wko_ls2_stockno}</td>
          <td>{result.wko_ls2_stk_locn}</td>
          <td>{result.wko_ls2_desc}</td>
          {/* <td>{result.wko_ls2_chg_costcenter}</td>
          <td>{result.wko_ls2_chg_account}</td> */}
          <td>{result.wko_ls2_qty_needed}</td>
          <td>{result.wko_ls2_mtl_uom}</td>
          <td>{result.wko_ls2_item_cost}</td>

          <td>{result.wko_ls2_mr_no}</td>
          {/* <td>{result.wko_ls2_mr_lineno}</td> */}
          <td>
            <span style={{ 
                  backgroundColor: 
                    result.mtr_mst_status === 'W' ? '#FF6258' : 
                    result.mtr_mst_status === 'A' ? '#19D895' :
                    result.mtr_mst_status === 'D' ? '#2196F3' :
                    null, 
                  color: 'white', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  fontSize:'13px',
                  fontWeight: 'bold'
                }}>
              { result.mtr_mst_status === 'W' ? 'Awaiting (W)' :
                result.mtr_mst_status === 'A' ? 'Approve (A)' :
                result.mtr_mst_status === 'D' ? 'Disapprove (D)' :
                result.mtr_mst_status}
            </span>
          </td>


          {/* <td>{result.mtr_ls1_rcv_qty}</td>
          <td>{result.wko_ls2_po_no}</td>
          <td>{result.wko_ls2_po_lineno}</td> */}

        </tr>
      );
    });
  };


  const handleRowClick = (data) => {
    console.log(data)

    setAssetNo( data.wko_ls2_assetno )
    setStockNo( data.wko_ls2_stockno )
    setStockLocation( data.wko_ls2_stk_locn )
    setDescription( data.wko_ls2_desc )
    setChargeCostCenter( data.wko_ls2_chg_costcenter )
    setChargeAccount( data.wko_ls2_chg_account )
    setQtyNeeded( data.wko_ls2_qty_needed )
    setUOM( data.wko_ls2_mtl_uom )
    setItemCost( data.wko_ls2_item_cost )
    setMaterialRequestNo( data.wko_ls2_mr_no )
    setMrLineNo( data.wko_ls2_mr_lineno )
    setMrApprovalStatus( data.mtr_mst_status )
    setActualQuantity( data.mtr_ls1_rcv_qty )
    setContractPoNo( data.wko_ls2_po_no )
    setContractPoLine( data.wko_ls2_po_lineno )

    setShowModal(true);
    };

  const resetData = () => {

    setSelected_StockNo(0);
    setSelected_StockLocation(0);
    setDescription('');
    setSelected_ChargeCostCenter(0);
    setSelected_ChargeAccount(0);
    setQtyNeeded('');
  
    };


  const handleAddButtonClick  = () => {

        let site_ID = localStorage.getItem("site_ID");
        
        //Select Description
        console.log("Description: ", Description)

        //Select Charge Account
        let ChargeAccount, setChargeAccount;
        if(selected_ChargeAccount == '' || selected_ChargeAccount == null){

            setChargeAccount=''
        }else{

            ChargeAccount = selected_ChargeAccount.label.split(":")
            setChargeAccount = ChargeAccount[0];
            console.log("ChargeAccount ", ChargeAccount[0])
        }

        //Select Charge Cost Center
        let Charge_Cost_Center, setCharge_Cost_Center;
        if(selected_ChargeCostCenter == '' || selected_ChargeCostCenter == null){

            setCharge_Cost_Center=''
        }else{

            Charge_Cost_Center = selected_ChargeCostCenter.label.split(":")
            setCharge_Cost_Center = Charge_Cost_Center[0];
            console.log("Charge_Cost_Center ", Charge_Cost_Center[0])
        }

        //Select Description
        console.log("QtyNeeded: ", QtyNeeded)

        //Select Stock Location
        let StockLocation, setStockLocation;
        if(selected_StockLocation.label == '' || selected_StockLocation.label == null){

            setStockLocation=''
        }else{

            StockLocation = selected_StockLocation.label.split(":")
            setStockLocation = StockLocation[0];
            console.log("StockLocation ", StockLocation[0])
        }

        //Select Stock No
        let StockNo, setStockNo;
        if(selected_StockNo.label == '' || selected_StockNo.label == null){

            setStockNo=''
        }else{

            StockNo = selected_StockNo.label.split(":")
            setStockNo = StockNo[0];
            console.log("StockNo ", StockNo[0])
        }


        const newPart = {
            
            mst_RowID: location.state.RowID,
            mtr_ls1_rcv_qty: ".0000",
            mtr_mst_status: "W",
            site_cd: site_ID,
            wko_ls2_assetno: "TEST123",
            wko_ls2_chg_account: setChargeAccount.trim(),
            wko_ls2_chg_costcenter: setCharge_Cost_Center.trim(),
            wko_ls2_desc: Description,
            wko_ls2_item_cost: "10.0000",
            wko_ls2_mr_lineno: "1",
            wko_ls2_mr_no: "MRE100001",
            wko_ls2_mtl_uom: "EACH",
            wko_ls2_po_lineno: null,
            wko_ls2_po_no: null,
            wko_ls2_qty_needed: QtyNeeded,
            wko_ls2_stk_locn: setStockLocation.trim(),
            wko_ls2_stockno: setStockNo.trim(),
            
          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
  };


  //Sum calculation
  const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls2_qty_needed) || 0), 0);

  //Multiply calculation
  const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls2_qty_needed) || 0) * (parseFloat(item.wko_ls2_item_cost) || 0), 0);





  return (
    <div>
        <div style={{ paddingBottom: '20px', backgroundColor: 'white' }}>
            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                <div style={{ marginRight: '10px' }}>
                    <img src={logo} style={{ width: '60px', height: '60px' }}/>
                </div>
                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Material</div>
                    <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                </div> 
            </div>
        </div>

        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Material</Modal.Title>
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
                        <Form.Group className="row" controlId="validation_StockLocation">
                            <label className="col-sm-4 col-form-label down left">Stock Location:</label>
                            <div className="col-sm-8">
                            <label className="col-sm-10 form-label">
                                <Select  
                                    isClearable={true}  
                                    options={StockLocation}
                                    value={selected_StockLocation}
                                    onChange={setSelected_StockLocation} // using id as it is unique
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
                        <Form.Group className="row" controlId="validation_Description">
                            <label className="col-sm-4 col-form-label down left">Description:</label>
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
                        <Form.Group className="row" controlId="validation_ChargeCostCenter">
                            <label className="col-sm-4 col-form-label down left">Charge Cost Center:</label>
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
                            <label className="col-sm-4 col-form-label down left">Charge Account:</label>
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
                        <Form.Group className="row" controlId="validation_QtyNeeded">
                            <label className="col-sm-4 col-form-label down left">Qty Needed:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder="1.0000" 
                                    value={QtyNeeded} 
                                    onChange={(e) => setQtyNeeded(e.target.value)}
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
                  <Modal.Title>Material</Modal.Title>
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
                      <Form.Group className="row" controlId="validation_StockNo">
                          <label className="col-sm-4 col-form-label down left">Stock No:</label>
                          <div className="col-sm-8 form-label">
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
                      <Form.Group className="row" controlId="validation_StockLocation">
                          <label className="col-sm-4 col-form-label down left">Stock Location:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={StockLocation} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_Description">
                          <label className="col-sm-4 col-form-label down left">Description:</label>
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
                      <Form.Group className="row" controlId="validation_ChargeCostCenter">
                          <label className="col-sm-4 col-form-label down left">Charge Cost Center:</label>
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
                          <label className="col-sm-4 col-form-label down left">Charge Account:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ChargeAccount} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_QtyNeeded">
                          <label className="col-sm-4 col-form-label down left">Qty Needed:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={QtyNeeded} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_UOM">
                          <label className="col-sm-4 col-form-label down left">UOM:</label>
                          <div className="col-sm-8 form-label">
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

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_ItemCost">
                          <label className="col-sm-4 col-form-label down left">Item Cost:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ItemCost} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_MaterialRequestNo">
                          <label className="col-sm-4 col-form-label down left">Material Request No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={MaterialRequestNo} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_MrLineNo">
                          <label className="col-sm-4 col-form-label down left">Mr Line No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={MrLineNo} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_MrApprovalStatus">
                          <label className="col-sm-4 col-form-label down left">Mr_Approval_Status:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value={ MrApprovalStatus === 'W' ? 'Awaiting (W)' :
                                    MrApprovalStatus === 'A' ? 'Approve (A)' :
                                    MrApprovalStatus === 'D' ? 'Disapprove (D)' :
                                    MrApprovalStatus}
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_ActualQuantity">
                          <label className="col-sm-4 col-form-label down left">Actual Quantity:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ActualQuantity} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_ContractPoNo">
                          <label className="col-sm-4 col-form-label down left">Contract Po No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ContractPoNo} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_ContractPoLine">
                          <label className="col-sm-4 col-form-label down left">Contract Po Line:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={ContractPoLine} 
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
                + Add Material
            </button>
        </div>
    </div>
  );
};

export default WorkOrderMaterial;
