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
import logo from '../../assets/images/setup.png';



const WorkOrderOutsourceContract = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Supplier, setSupplier] = useState([]);
  const [selected_Supplier, setSelected_Supplier] = useState([]);

  const [Description, setDescription] = useState("");

  const [TaxCode, setTaxCode] = useState([]);
  const [selected_TaxCode, setSelected_TaxCode] = useState([]);

  const [UOM, setUOM] = useState([]);
  const [selected_UOM, setSelected_UOM] = useState([]);

  const [QtyNeeded, setQtyNeeded] = useState("0");

  const [EstimateCost, setEstimateCost] = useState("0");

  const [CostCenter, setCostCenter] = useState([]);
  const [selected_CostCenter, setSelected_CostCenter] = useState([]);

  const [Account, setAccount] = useState([]);
  const [selected_Account, setSelected_Account] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [StockNo, setStockNo] = useState("");
  const [MaterialRequestNo, setMaterialRequestNo] = useState("");
  const [PrNo, setPrNo] = useState("");
  const [PrLineNo, setPrLineNo] = useState("");
  const [ApprovalStatus, setApprovalStatus] = useState("");
  const [PoNo, setPoNo] = useState("");
  const [PoLine, setPoLine] = useState("");
  const [ContractPoNo, setContractPoNo] = useState("");
  const [ContractPoLine, setContractPoLine] = useState("");
 
  

  const get_workordermaster_outsourcecontract = (site_ID, RowID) => {
    APIServices.get_workordermaster_outsourcecontract(site_ID, RowID)
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
    get_workordermaster_outsourcecontract(site_ID, props.data.RowID);

    get_workorder_status(site_ID, "All", location.state.select);       


  }, [location]);



    const get_workorder_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()
    
        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
    
        
            if (responseJson.data.status === 'SUCCESS') {
    
    
                console.log('get_dropdown', responseJson.data)
    
    
                    let Supplier = responseJson.data.data.supplier.map(item => ({
                        label: item.sup_mst_supplier_cd +" : "+ item.sup_mst_desc,
                        value: item.sup_mst_supplier_cd            
                        }));
                        setSupplier(Supplier);
    
                    let TaxCode = responseJson.data.data.ITM_Tax_Code.map(item => ({
                        label: item.tax_mst_tax_cd +" : "+ item.tax_mst_desc,
                        value: item.tax_mst_tax_cd            
                        }));
                        setTaxCode(TaxCode);
    
                    let UOM = responseJson.data.data.ITM_Issue_UOM.map(item => ({
                        label: item.uom_mst_uom +" : "+ item.uom_mst_desc,
                        value: item.uom_mst_uom            
                        }));
                        setUOM(UOM);
    
                    let CostCenter = responseJson.data.data.CostCenter.map(item => ({
                        label: item.costcenter +" : "+ item.descs,
                        value: item.costcenter            
                        }));
                        setCostCenter(CostCenter);
    
                    let Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                        label: item.account +" : "+ item.descs,
                        value: item.account            
                        }));
                        setAccount(Account);
    
    
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
    
    
                setSelected_Supplier( {label:responseJson.data.data[index].wko_ls4_supplier} )
                setDescription( responseJson.data.data[index].wko_ls4_descr )
                setSelected_TaxCode( {label:responseJson.data.data[index].wko_ls4_tax_cd} )
                setSelected_UOM( {label:responseJson.data.data[index].wko_ls4_svc_uom} )
                setQtyNeeded( responseJson.data.data[index].wko_ls4_qty_needed )
                setEstimateCost( responseJson.data.data[index].wko_ls4_est_cost )
                setSelected_CostCenter( {label:responseJson.data.data[index].wko_ls4_chg_costcenter} )
                setSelected_Account( {label:responseJson.data.data[index].wko_ls4_chg_account} )
    
    
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
            <td>{result.wko_ls4_assetno}</td>
            <td>{result.wko_ls4_supplier}</td>

            <td>{result.wko_ls4_descr}</td>
            <td>{result.wko_ls4_tax_cd}</td>
            <td>{result.wko_ls4_svc_uom}</td>
            <td>{result.wko_ls4_qty_needed}</td>
            <td>{result.wko_ls4_est_cost}</td>
            <td>{result.wko_ls4_chg_costcenter}</td>
            <td>{result.wko_ls4_chg_account}</td>
            <td>{result.wko_ls4_pr_no}</td>
            <td>{result.wko_ls4_pr_lineno}</td>
            <td>
                <span style={{ 
                    backgroundColor: 
                        result.pur_mst_purq_approve === 'W' ? '#FF6258' : 
                        result.pur_mst_purq_approve === 'A' ? '#19D895' :
                        result.pur_mst_purq_approve === 'D' ? '#2196F3' :
                        null, 
                    color: 'white', 
                    padding: '5px', 
                    borderRadius: '5px', 
                    fontSize:'13px',
                    fontWeight: 'bold'
                    }}>
                { result.pur_mst_purq_approve === 'W' ? 'Awaiting (W)' :
                    result.pur_mst_purq_approve === 'A' ? 'Approve (A)' :
                    result.pur_mst_purq_approve === 'D' ? 'Disapprove (D)' :
                    result.pur_mst_purq_approve}
                </span>
            </td>
            <td>{result.pur_ls1_po_no}</td>
            <td>{result.pur_ls1_po_lineno}</td>
            <td>{result.wko_ls4_po_no}</td>
            <td>{result.wko_ls4_po_lineno}</td>
            
            </tr>
        );
        });
    };


    const handleRowClick = (data) => {
        console.log(data);
    
        setStockNo( data.wko_ls4_assetno )
        setSupplier( data.wko_ls4_supplier )
        setDescription( data.wko_ls4_descr )
        setTaxCode( data.wko_ls4_tax_cd )
        setUOM( data.wko_ls4_svc_uom )
        setQtyNeeded( data.wko_ls4_qty_needed )
        setEstimateCost( data.wko_ls4_est_cost )
        setCostCenter( data.wko_ls4_chg_costcenter )
        setAccount( data.wko_ls4_chg_account )
        setPrNo( data.wko_ls4_pr_no )
        setPrLineNo( data.wko_ls4_pr_lineno )
        setApprovalStatus( data.pur_mst_purq_approve )
        setPoLine( data.pur_ls1_po_no )
        setPoLine( data.pur_ls1_po_lineno )
        setContractPoNo( data.wko_ls4_po_no )
        setContractPoLine( data.wko_ls4_po_lineno )
   
        setShowModal(true);
    };
    
    const resetData = () => {
    
     setSelected_Supplier(0);
     setDescription('');
     setSelected_TaxCode(0);
     setSelected_UOM(0);
     setQtyNeeded('');
     setEstimateCost('');
     setSelected_CostCenter(0);
     setSelected_Account(0);
      
    };


    const handleAddButtonClick  = () => {

        let site_ID = localStorage.getItem("site_ID");
       
        //Select Account
        let Account, setAccount;
        if(selected_Account == '' || selected_Account == null){

            setAccount=''
        }else{

            Account = selected_Account.label.split(":")
            setAccount = Account[0];
            console.log("Account ", Account[0])
        }

        //Select Cost Center
        let CostCenter, setCostCenter;
        if(selected_CostCenter == '' || selected_CostCenter == null){

            setCostCenter=''
        }else{

            CostCenter = selected_CostCenter.label.split(":")
            setCostCenter = CostCenter[0];
            console.log("CostCenter ", CostCenter[0])
        }
         
        //Select Description
        console.log("Description: ", Description)
 
        //Select EstimateCost
        console.log("EstimateCost: ", EstimateCost)

        //Select QtyNeeded
        console.log("QtyNeeded: ", QtyNeeded)

        //Select Supplier
        let Supplier, setSupplier;
        if(selected_Supplier == '' || selected_Supplier == null){

            setSupplier=''
        }else{

            Supplier = selected_Supplier.label.split(":")
            setSupplier = Supplier[0];
            console.log("Supplier ", Supplier[0])
        }

          //Select UOM
        let UOM, setUOM;
        if(selected_UOM == '' || selected_UOM == null){

            setUOM=''
        }else{

            UOM = selected_UOM.label.split(":")
            setUOM = UOM[0];
            console.log("UOM ", UOM[0])
        }

        //Select Tax Code
        let TaxCode, setTaxCode;
        if(selected_TaxCode == '' || selected_TaxCode == null){

            setTaxCode=''
        }else{

            TaxCode = selected_TaxCode.label.split(":")
            setTaxCode = TaxCode[0];
            console.log("TaxCode ", TaxCode[0])
        }

        const newPart = {
            
            mst_RowID: location.state.RowID,
            pur_ls1_po_lineno: null,
            pur_ls1_po_no: null,
            pur_mst_purq_approve: "W",
            site_cd: site_ID,
            wko_ls4_assetno: "E0804-001",
            wko_ls4_chg_account: setAccount.trim(),
            wko_ls4_chg_costcenter: setCostCenter.trim(),
            wko_ls4_descr: Description,
            wko_ls4_est_cost: EstimateCost,
            wko_ls4_po_lineno: null,
            wko_ls4_po_no: null,
            wko_ls4_pr_lineno: "1",
            wko_ls4_pr_no: "PR100004",
            wko_ls4_qty_needed: QtyNeeded,
            wko_ls4_supplier: setSupplier.trim(),
            wko_ls4_svc_uom: setUOM.trim(),
            wko_ls4_tax_cd: setTaxCode.trim(),

          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
  };


    //Sum calculation
    const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls4_qty_needed) || 0), 0);

    //Multiply calculation
    const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls4_qty_needed) || 0) * (parseFloat(item.wko_ls4_est_cost) || 0), 0);





  return (
    <div>
        <div style={{ paddingBottom: '20px', backgroundColor: 'white' }}>
            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                <div style={{ marginRight: '10px' }}>
                    <img src={logo} style={{ width: '60px', height: '60px' }}/>
                </div>
                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Outsource Contract (PR)</div>
                    <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                </div> 
            </div>
        </div>

        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Outsource Contract (PR)</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Supplier">
                            <label className="col-sm-4 col-form-label down left">Supplier:</label>
                            <div className="col-sm-8">
                            <label className="col-sm-10 form-label">
                                <Select  
                                    isClearable={true}  
                                    options={Supplier}
                                    value={selected_Supplier}
                                    onChange={setSelected_Supplier} // using id as it is unique
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
                        <Form.Group className="row" controlId="validation_TaxCode">
                            <label className="col-sm-4 col-form-label down left">Tax Code:</label>
                            <div className="col-sm-8">
                            <label className="col-sm-10 form-label">
                                <Select  
                                    isClearable={true}  
                                    options={TaxCode}
                                    value={selected_TaxCode}
                                    onChange={setSelected_TaxCode} // using id as it is unique
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

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_QtyNeeded">
                            <label className="col-sm-4 col-form-label down left">Qty Needed:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".00" 
                                    value={QtyNeeded} 
                                    onChange={(e) => setQtyNeeded(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_EstimateCost">
                            <label className="col-sm-4 col-form-label down left">Estimate Cost:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                            <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".00" 
                                    value={EstimateCost} 
                                    onChange={(e) => setEstimateCost(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_ItemCost">
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

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_Account">
                            <label className="col-sm-4 col-form-label down left">Account:</label>
                            <div className="col-sm-8">
                            <label className="col-sm-10 form-label">
                                <Select  
                                    isClearable={true}  
                                    options={Account}
                                    value={selected_Account}
                                    onChange={setSelected_Account} // using id as it is unique
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
                  <Modal.Title>Outsource Contract (PR)</Modal.Title>
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
                      <Form.Group className="row" controlId="validation_Supplier">
                          <label className="col-sm-4 col-form-label down left">Supplier:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={Supplier} 
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
                      <Form.Group className="row" controlId="validation_TaxCode">
                          <label className="col-sm-4 col-form-label down left">Tax Code:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={TaxCode} 
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
                      <Form.Group className="row" controlId="validation_EstimateCost">
                          <label className="col-sm-4 col-form-label down left">Estimate Cost:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={EstimateCost} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_CostCenter">
                          <label className="col-sm-4 col-form-label down left">Cost Center:</label>
                          <div className="col-sm-8 form-label">
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

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_Account">
                          <label className="col-sm-4 col-form-label down left">Account:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={Account} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_PrNo">
                          <label className="col-sm-4 col-form-label down left">Pr No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value={PrNo}
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_PrLineNo">
                          <label className="col-sm-4 col-form-label down left">Pr Line No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={PrLineNo} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_ApprovalStatus">
                            <label className="col-sm-4 col-form-label down left">Approval Status:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="text"
                                    value={ ApprovalStatus === 'W' ? 'Awaiting (W)' :
                                        ApprovalStatus === 'A' ? 'Approve (A)' :
                                        ApprovalStatus === 'D' ? 'Disapprove (D)' :
                                        ApprovalStatus}
                                    readOnly
                                    />
                            </label>
                            </div>
                        </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_PoNo">
                          <label className="col-sm-4 col-form-label down left">Po No:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={PoNo} 
                                  readOnly
                                />
                          </label>
                          </div>
                      </Form.Group>
                  </div>

                  <div className="col-md-12 moveUpPopUp">
                      <Form.Group className="row" controlId="validation_PoLine">
                          <label className="col-sm-4 col-form-label down left">Po Line:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={PoLine} 
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
                + Add Outsource Contract (PR)
            </button>
        </div>
    </div>
  );
};

export default WorkOrderOutsourceContract;
