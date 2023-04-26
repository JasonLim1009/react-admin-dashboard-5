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
import { format, setDate } from "date-fns";
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';
import logo from '../../assets/images/toolkit.png';



const WorkOrderMisc = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); resetData(); };
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [Description, setDescription] = useState("");

  const [MiscDate, setMiscDate] = useState(new Date());

  const [UOM, setUOM] = useState([]);
  const [selected_UOM, setSelected_UOM] = useState([]);

  const [Quantity, setQuantity] = useState("0");

  const [ItemCost, setItemCost] = useState("0");

  const [CostCenter, setCostCenter] = useState([]);
  const [selected_CostCenter, setSelected_CostCenter] = useState([]);

  const [Account, setAccount] = useState([]);
  const [selected_Account, setSelected_Account] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");

  const [AssetNumber, setAssetNumber] = useState("");
  const [EstimateCost, setEstimateCost] = useState("");



  const get_workordermaster_misc = (site_ID, RowID) => {
    APIServices.get_workordermaster_misc(site_ID, RowID)
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
    get_workordermaster_misc(site_ID, props.data.RowID);

    get_workorder_status(site_ID, "All", location.state.select);    

  }, [location]);



    const get_workorder_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()
    
        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
    
        
            if (responseJson.data.status === 'SUCCESS') {
    
    
                console.log('get_dropdown', responseJson.data)
    
    
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
    
                    let Account = responseJson.data.data.account.map(item => ({
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
    
    
                setDescription( responseJson.data.data[index].wko_ls5_desc )
             
                setMiscDate( responseJson.data.data[index].wko_ls5_date )
                if(responseJson.data.data[index].wko_ls5_date == null){
                    setMiscDate('')
                }else{

                    setMiscDate( Moment(responseJson.data.data[index].wko_ls5_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date : '+ Moment(responseJson.data.data[index].wko_ls5_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_UOM( {label:responseJson.data.data[index].wko_ls5_uom} )
                setQuantity( responseJson.data.data[index].wko_ls5_qty )
                setItemCost( responseJson.data.data[index].wko_ls5_item_cost )
                setSelected_CostCenter( {label:responseJson.data.data[index].wko_ls5_costcenter} )
                setSelected_Account( {label:responseJson.data.data[index].wko_ls5_account} )
          
    
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

        if (result.wko_ls5_date == null) {
            var wkols5_date = ''
          } else {
    
            var wkols5_date = format(new Date(result.wko_ls5_date.date), "dd/MM/yyyy HH:MM")
    
          }

      return (
        <tr key={index} onClick={(event) =>handleRowClick(result, event)}>

          <td>{index + 1}</td>
          <td>{result.wko_ls5_assetno}</td>
          <td>{result.wko_ls5_desc}</td>
          <td>{wkols5_date}</td>
          <td>{result.wko_ls5_uom}</td>
          <td>{result.wko_ls5_qty}</td>
          <td>{result.wko_ls5_item_cost}</td>
          <td>{result.wko_ls5_est_amt}</td>
          <td>{result.wko_ls5_costcenter}</td>
          <td>{result.wko_ls5_account}</td>
         
        </tr>
      );
    });
    };


    const handleRowClick = (data) => {
        console.log(data)
    
        setAssetNumber( data.wko_ls5_assetno )
        setDescription( data.wko_ls5_desc )
        //setDate( data.wko_ls5_date.date )
        setUOM( data.wko_ls5_uom )
        setQuantity( data.wko_ls5_qty )
        setItemCost( data.wko_ls5_item_cost )
        setEstimateCost( data.wko_ls5_est_amt )
        setCostCenter( data.wko_ls5_costcenter )
        setAccount( data.wko_ls5_account )
    
        setShowModal(true);
    };
    
    const resetData = () => {
    
        setDescription('');
        setMiscDate('');
        setSelected_UOM(0);
        setQuantity('');
        setItemCost('');
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

        //Select Misc Date
        let Misc_Date = ''
        if (MiscDate == '' || MiscDate == null) {

            Misc_Date = '';
        } else {

            Misc_Date = Moment(MiscDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date1 ", Misc_Date);
        }

        //Select Description
        console.log("Description: ", Description)

        //Select Item Cost
        console.log("ItemCost: ", ItemCost)

        //Select Quantity
        console.log("Quantity: ", Quantity)

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
            wko_ls5_account: setAccount.trim(),
            wko_ls5_assetno: "E0804-001",
            wko_ls5_costcenter: setCostCenter.trim(),
            //wko_ls5_date: Misc_Date,
            wko_ls5_desc: Description,
            wko_ls5_est_amt: "0.0000",
            wko_ls5_item_cost: ItemCost,
            wko_ls5_qty: Quantity,
            wko_ls5_uom: setUOM.trim(),

          };
          // Add new part to partsList
          setResult([...Result, newPart]);
          console.log(Result);
          // Close modal
          handleClose();
  };


    //Sum calculation
    const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls5_qty) || 0), 0);

    //Multiply calculation
    const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls5_qty) || 0) * (parseFloat(item.wko_ls5_item_cost) || 0), 0);




  return (
    <div>
        <div style={{ paddingBottom: '20px', backgroundColor: 'white' }}>
            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                <div style={{ marginRight: '10px' }}>
                    <img src={logo} style={{ width: '60px', height: '60px' }}/>
                </div>
                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Misc</div>
                    <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div>
                </div> 
            </div>
        </div>

        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Misc</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
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
                            <Form.Group className="row" controlId="validation_Date">
                                <label className="col-sm-4 col-form-label down left">Date:</label>
                                <div className="col-sm-8 form-label">
                                <label className="col-sm-10 form-label">
                                    <Form.Control   
                                        style={{ fontSize: "13px", height: "38px" }}                                         
                                        type="datetime-local"  
                                        value={MiscDate} 
                                        onChange={(e) => setMiscDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                    </div>

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_UOM">
                            <label className="col-sm-4 col-form-label down left">UO down leftM:</label>
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
                        <Form.Group className="row" controlId="validation_Quantity">
                            <label className="col-sm-4 col-form-label down left">Qu down leftantity:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".00" 
                                    value={Quantity} 
                                    onChange={(e) => setQuantity(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_ItemCost">
                            <label className="col-sm-4 col-form-label down left">It down leftem Cost:</label>
                            <div className="col-sm-8 form-label">
                            <label className="col-sm-10 form-label">
                                <Form.Control  
                                    style={{ fontSize: "13px", height: "38px" }}
                                    type="number"  
                                    placeholder=".00" 
                                    value={ItemCost} 
                                    onChange={(e) => setItemCost(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12 moveUpPopUp">
                        <Form.Group className="row" controlId="validation_CostCenter">
                            <label className="col-sm-4 col-form-label down left">Co down leftst Center:</label>
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
                            <label className="col-sm-4 col-form-label down left">Ac down leftcount:</label>
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
                  <Modal.Title>Misc</Modal.Title>
              </Modal.Header>


              <Modal.Body>
                  
                  <div className="col-md-12">
                      <Form.Group className="row" controlId="validation_AssetNumber">
                          <label className="col-sm-4 col-form-label down left">Asset Number:</label>
                          <div className="col-sm-8">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={AssetNumber} 
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
                      <Form.Group className="row" controlId="validation_Date">
                          <label className="col-sm-4 col-form-label down left">Date:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="datetime-local"  
                                  value ={MiscDate} 
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
                      <Form.Group className="row" controlId="validation_Quantity">
                          <label className="col-sm-4 col-form-label down left">Quantity:</label>
                          <div className="col-sm-8 form-label">
                          <label className="col-sm-10 form-label">
                              <Form.Control
                                  style={{ fontSize: "13px", height: "38px" }}
                                  type="text"
                                  value ={Quantity} 
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
                + Add Misc
            </button>
        </div>
    </div>
  );
};

export default WorkOrderMisc;
