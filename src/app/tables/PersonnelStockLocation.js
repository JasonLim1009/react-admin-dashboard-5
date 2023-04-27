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
import logo from '../../assets/images/stock.png';
import { Card, Collapse } from 'react-bootstrap';


const PersonnelStockLocation = (props) => {
 

  const [Header, setHeader] = React.useState([]);
  const [Result, setResult] = React.useState([]);

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState(Result.map(() => false));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [List, setList] = useState(false);
  const [CheckBox_List, setCheckBox_List] = useState('0');

  const [Change, setChange] = useState(false);
  const [CheckBox_Change, setCheckBox_Change] = useState('0');

  const [StockLocation, setStockLocation] = useState("");

  const [Description, setDescription] = useState("");

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_employeemaster_stock_location = (site_ID, RowID) => {
    APIServices.get_employeemaster_stock_location(site_ID, RowID)
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
    get_employeemaster_stock_location(site_ID, props.data.RowID);

    get_employee_Status(site_ID, "All", location.state.select);       
       
},[location]);


    const get_employee_Status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


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


                setList( responseJson.data.data[index].usg_itm_list )
                setChange( responseJson.data.data[index].usg_itm_change )
                setStockLocation( responseJson.data.data[index].loc_mst_stk_loc )
                setDescription( responseJson.data.data[index].loc_mst_desc )
               
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
            <tr key={index}>
            {showList || showChange ? (
                <i
                    type="button"
                    title="Closed"
                    className="icon mdi mdi-minus-box-outline StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm"
                    onClick={handleToggleList}
                ></i>
            ) : (
                <i
                    type="button"
                    title="Open"
                    className="icon mdi mdi-plus-box-outline StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm"
                    onClick={handleToggleList}
                ></i>
            )}
            {showList ? (
                <>
                    <i className="mdi mdi-format-list-checks StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm"></i>
                    &nbsp;&nbsp;&nbsp;
                    <label style={{ fontSize: "13px", color: "#a61414" }}>List Only</label>
                    <Collapse in={showList}>
                        <div style={{ paddingTop: "44px" }}>
                            <Card className="float-left StockLocationList StockLocationList-sm dotslist-md dotslist-sm">
                                <Card.Body className="p-2">
                                    <td>
                                        <i className="mdi mdi-dropbox"></i>&nbsp;{result.loc_mst_stk_loc}
                                    </td>
                                    <td>{result.loc_mst_desc}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={List}
                                            onChange={handleOnChangeList}
                                        />
                                    </td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={Change}
                                            onChange={handleOnChangeChange}
                                        />
                                    </td>
                                </Card.Body>
                            </Card>
                        </div>
                    </Collapse>
                </>
            ) : null}
            {showChange ? (
                <>
                    <i className="mdi mdi-format-list-checks StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm"></i>
                    &nbsp;&nbsp;&nbsp;
                    <label style={{ fontSize: "13px", color: "#a61414" }}>Change Only</label>
                    <Collapse in={showChange}>
                        <div style={{ paddingTop: "44px" }}>
                            <Card className="float-left StockLocationList dotslist-md dotslist-sm">
                                <Card.Body className="p-2">
                                    <td>
                                        <i className="mdi mdi-dropbox"></i>&nbsp;{result.loc_mst_stk_loc}
                                    </td>
                                    <td>{result.loc_mst_desc}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={List}
                                            onChange={handleOnChangeList}
                                        />
                                    </td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={Change}
                                            onChange={handleOnChangeChange}
                                        />
                                    </td>
                                </Card.Body>
                            </Card>
                        </div>
                    </Collapse>
                </>
            ) : null}
        </tr>
        );
    });
    };

    
    const handleRowClick = (data) => {
        console.log(data);
    
        setStockLocation( data.emp_ls3_costcenter );
        setDescription( data.emp_ls3_approval_limit );
     
        setShowModal(true);
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

    const [showChange, setShowChange] = useState(false);

    const handleToggleList = () => {
        setShowList(!showList);
    };
    
    //Checkbox List
    const handleOnChangeList = (List) => {
        setShowList(true);
        setShowChange(false);
        
        if(List){
            console.log('1')
            setCheckBox_List('1')
        }else{
            console.log('0')
            setCheckBox_List('0')
        }
    };
    
    //Checkbox Change
    const handleOnChangeChange = (Change) => {
        setShowChange(true);
        setShowList(false);
        
        if(Change){
            console.log('1')
            setCheckBox_Change('1')
        }else{
            console.log('0')
            setCheckBox_Change('0')
        }
    };

      
      

  //Sum calculation
  //const totalQty = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls3_qty_needed) || 0), 0);
  
  //Multiply calculation
  //const totalCost = Result.reduce((acc, item) => acc + (parseFloat(item.wko_ls3_qty_needed) || 0) * (parseFloat(item.wko_ls3_item_cost) || 0), 0);


  const [showList, setShowList] = useState(false);








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
                            <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Stock Location</div>
                            {/* <div><span style={{color: "blue"}}>{(totalQty * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCost.toFixed(2)}</span></div> */}
                        </div> 
                        </div>
                    </div>

                    {/******************** Personnel Stock Location ********************/}
                    <div>
                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Stock Location</Modal.Title>
                            </Modal.Header>


                            <Modal.Body>
                                <div className="col-md-12 checkBoxUsage-md">
                                    <Form.Group className="row" controlId="validation_List">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">List:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={List}
                                            onChange={handleOnChangeList}
                                            />
                                            <i className="input-helper"></i>
                                        </label>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-12 moveUpPopUp checkBoxUsage-md">
                                    <Form.Group className="row" controlId="validation_Change">
                                        <label className="col-sm-5 col-form-label labelTopAsset down">Change:</label>
                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                        <label className="form-check-label">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={Change}
                                            onChange={handleOnChangeChange}
                                            />
                                            <i className="input-helper"></i>
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

                        {showModal && (
                        <Modal show={showModal} onHide={handleCloseModal} centered >

                        <Modal.Header closeButton>
                            <Modal.Title>Stock Location</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_StockLocation">
                                    <label className="col-sm-4 col-form-label down left">Stock Location:</label>
                                    <div className="col-sm-8">
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
                                <Form.Group className="row" controlId="validation_List">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">List:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={List} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
                                    </label>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-12 moveUpPopUp">
                                <Form.Group className="row" controlId="validation_Change">
                                    <label className="col-sm-5 col-form-label labelTopAsset down">Change:</label>
                                    <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft">
                                    <label className="form-check-label">
                                        <input
                                            style={{ fontSize: "13px", height: "38px" }}
                                            type="checkbox" 
                                            checked={Change} 
                                            readOnly
                                        />
                                        <i className="input-helper"></i>
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
            </div>
        </div>
    </div>
  );
};

export default PersonnelStockLocation;
