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

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import Moment from 'moment';
import  {useLocation}  from 'react-router-dom';


const WorkOrderTimeCard = () => {
 

  const [Columns, setColumns] = useState([]);
  const [Data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [EmployeeID, setEmployeeID] = useState([]);
  const [selected_EmployeeID, setSelected_EmployeeID] = useState([]);

  const [Craft, setCraft] = useState([]);
  const [selected_Craft, setSelected_Craft] = useState([]);

  const [TimeCardDate, setTimeCardDate] = useState(new Date());

  const [HourType, setHourType] = useState([]);
  const [selected_HourType, setSelected_HourType] = useState([]);

  const [ActualHour, setActualHour] = useState("0");

  const [ChargeCostCenter, setChargeCostCenter] = useState([]);
  const [selected_ChargeCostCenter, setSelected_ChargeCostCenter] = useState([]);

  const [ChargeAccount, setChargeAccount] = useState([]);
  const [selected_ChargeAccount, setSelected_ChargeAccount] = useState([]);

  const [CreditCostCenter, setCreditCostCenter] = useState([]);
  const [selected_CreditCostCenter, setSelected_CreditCostCenter] = useState([]);

  const [CreditAccount, setCreditAccount] = useState([]);
  const [selected_CreditAccount, setSelected_CreditAccount] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_workordermaster_timecard = (site_ID) => {
    APIServices.get_workordermaster_timecard(site_ID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setColumns(responseJson.data.data.header);
            setData(responseJson.data.data.result);
        
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
    get_workordermaster_timecard(site_ID);
  }, []);



    const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef
    
        React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
    
        return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
        )
    }
    )
   

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        
        selectedFlatRows,
        resetResizing,        
        state: { selectedRowIds },
        
    } = useTable({ columns: Columns, data: Data },useSortBy, useRowSelect, useResizeColumns,

        hooks => {
            hooks.visibleColumns.push(columns => [
              // Let's make a column for selection
              {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (

                  <div>                      
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  </div>

                ),
                
              },
              ...columns,
            ])
          }
        )


        const handleRowClick = (data) => {
     
            console.log(data.col56)
        };



    const get_workorder_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()
    
        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{
    
        
            if (responseJson.data.status === 'SUCCESS') {
    
    
                console.log('get_dropdown', responseJson.data)
    
    
                    let EmployeeID = responseJson.data.data.Employee_Supervisor_Id.map(item => ({
                        label: item.emp_mst_empl_id +" : "+ item.emp_mst_name,
                        value: item.emp_mst_empl_id            
                        }));
                        setEmployeeID(EmployeeID);
    
                    let HourType = responseJson.data.data.HoursType.map(item => ({
                        label: item.hours_type_cd,
                        value: item.hours_type_cd            
                        }));
                        setHourType(HourType);
    
                    let ChargeCostCenter = responseJson.data.data.CostCenter.map(item => ({
                        label: item.costcenter +" : "+ item.descs,
                        value: item.costcenter            
                        }));
                        setChargeCostCenter(ChargeCostCenter);
    
                    let ChargeAccount = responseJson.data.data.account.map(item => ({
                        label: item.account +" : "+ item.descs,
                        value: item.account            
                        }));
                        setChargeAccount(ChargeAccount);
    
                    let CreditCostCenter = responseJson.data.data.CostCenter.map(item => ({
                        label: item.costcenter +" : "+ item.descs,
                        value: item.costcenter            
                        }));
                        setCreditCostCenter(CreditCostCenter);

                    let CreditAccount = responseJson.data.data.account.map(item => ({
                        label: item.account +" : "+ item.descs,
                        value: item.account            
                        }));
                        setCreditAccount(CreditAccount);


                    //get_dropdown_ParentFlag(site_ID,selected_asset);                  
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
    
    
    const get_dropdown_ParentFlag = (site_ID,selected_asset) => {  
    
    
        console.log('PARENT FLAG: '+ site_ID + selected_asset)
        
        APIServices.get_dropdown_ParentFlag(site_ID,selected_asset).then((responseJson)=>{
    
    
            console.log(responseJson.data.status);
    
            if (responseJson.data.status === 'SUCCESS') {  
    
                    Swal.close();
                    setButton_save("Submit")
                    get_workordermaster_select(site_ID,selected_asset);
                    
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
    
    
    const get_workordermaster_select = () => {
    
        
        console.log('SELECT ROWID: '+ location.state.RowID)
    
        APIServices.get_workordermaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));
    
            if (responseJson.data.status === 'SUCCESS') {     
                
    
    // **************************************** check read data ******************************************
                console.log('SELECT WKO: '+ JSON.stringify(responseJson.data.data))
                
                for (var index in responseJson.data.data) {
                
                
                setRowID( responseJson.data.data[index].RowID )
    
    
                setSelected_EmployeeID( {label:responseJson.data.data[index].wko_ls8_empl_id} )
                setSelected_Craft( {label:responseJson.data.data[index].wko_ls8_craft} )

                setTimeCardDate( responseJson.data.data[index].wko_ls8_datetime1 )
                if(responseJson.data.data[index].wko_ls8_datetime1 == null){
                    setTimeCardDate('')
                }else{

                    setTimeCardDate( Moment(responseJson.data.data[index].wko_ls8_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT TC Date : '+ Moment(responseJson.data.data[index].itm_sup_last_rcvd_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_HourType( {label:responseJson.data.data[index].wko_ls8_hours_type} )
                setActualHour( responseJson.data.data[index].wko_ls8_hrs )
                setSelected_ChargeCostCenter( {label:responseJson.data.data[index].wko_ls8_chg_costcenter} )
                setSelected_ChargeAccount( {label:responseJson.data.data[index].wko_ls8_chg_account} )
                setSelected_CreditCostCenter( {label:responseJson.data.data[index].wko_ls8_crd_costcenter} )
                setSelected_CreditAccount( {label:responseJson.data.data[index].wko_ls8_crd_account} )
    
    
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
    
    
    useEffect(() => {
    
        let site_ID = localStorage.getItem("site_ID");
    
        console.log('select select',location.state.select);
        console.log('select WKOID',location.state.RowID);
    
        get_workorder_status(site_ID, "All", location.state.select);       
        
    
    },[location]);



    const [list, setList] = useState([]);
    const handleAdd = () => {
        const newItem = { id: list.length + 1, text: "", text1: ".00", text2: "" };
        setList([...list, newItem]);
      };
    
    const handleVoid = (id) => {
        setList(list.filter((item) => item.id !== id));
      };




  return (
    <div>
        <div className="page-header">
            <div className="template-demo" >
                <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={handleAdd}>
                    <i className="mdi mdi-file-check btn-icon-prepend"></i> New  
                </button>
            
                <button type="button" className="btn btn-outline-danger btn-icon-text"  >
                    <i className="mdi mdi-delete-forever btn-icon-prepend" onClick={() => handleVoid()}></i> Void 
                </button>
            </div>                     
        </div> 

        {/* <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Time Card</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_EmployeeID">
                            <label className="col-sm-4 col-form-label">Employee ID:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={EmployeeID}
                                    value={selected_EmployeeID}
                                    onChange={setSelected_EmployeeID} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Craft">
                            <label className="col-sm-4 col-form-label">Craft:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={Craft}
                                    value={selected_Craft}
                                    onChange={setSelected_Craft} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                            <Form.Group className="row" controlId="validation_TimeCardDate">
                                <label className="col-sm-4 col-form-label">Time Card Date:</label>
                                <div className="col-sm-7 form-label">
                                <label className="col-sm-12 form-label">
                                    <Form.Control                                            
                                        type="datetime-local"  
                                        value={TimeCardDate} 
                                        onChange={(e) => setTimeCardDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                </label>
                                </div>
                            </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_HourType">
                            <label className="col-sm-4 col-form-label">Hour Type:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={HourType}
                                    value={selected_HourType}
                                    onChange={setSelected_HourType} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ActualHour">
                            <label className="col-sm-4 col-form-label">Actual Hour:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="number"  
                                    placeholder="1.00" 
                                    value={ActualHour} 
                                    onChange={(e) => setActualHour(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ChargeCostCenter">
                            <label className="col-sm-4 col-form-label">Charge Cost Center:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={ChargeCostCenter}
                                    value={selected_ChargeCostCenter}
                                    onChange={setSelected_ChargeCostCenter} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ChargeAccount">
                            <label className="col-sm-4 col-form-label">Charge Account:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={ChargeAccount}
                                    value={selected_ChargeAccount}
                                    onChange={setSelected_ChargeAccount} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_CreditCostCenter">
                            <label className="col-sm-4 col-form-label">Credit Cost Center:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={CreditCostCenter}
                                    value={selected_CreditCostCenter}
                                    onChange={setSelected_CreditCostCenter} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_CreditAccount">
                            <label className="col-sm-4 col-form-label">Credit Account:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={CreditAccount}
                                    value={selected_CreditAccount}
                                    onChange={setSelected_CreditAccount} // using id as it is unique
                                    required
                                />
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
                    Submit
                    </Button>
                </Modal.Footer>

            </Modal>

        </div> */}

        <div className="table-responsive">
            <table className="table table-hover table-bordered " {...getTableProps() } on >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                        
                            {headerGroup.headers.map(column => (                                    
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        color: 'black',
                                    }}

                                    {...column.getResizerProps()}
                                        className={`resizer ${
                                            column.isResizing ? 'isResizing' : ''
                                        }`}
                                >                            
                                    {column.render('Header')}

                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? '🔽'
                                                : '🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                        
                </thead>
                <tbody>
                    {list.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.text}</td>
                        <td>
                            <Select
                                isClearable={true}
                                options={EmployeeID}
                                value={item.selected}
                                onChange={setSelected_EmployeeID}
                                required
                            />
                        </td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={Craft}
                                value={item.selected}
                                onChange={setSelected_Craft} // using id as it is unique
                                required
                            />
                        </td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={HourType}
                                value={item.selected}
                                onChange={setSelected_HourType} // using id as it is unique
                                required
                            />
                        </td>
                        <td>
                            <Form.Control  
                                type="number"  
                                placeholder="1.00" 
                                value={item.selected} 
                                onChange={(e) => setActualHour(e.target.value)}
                                />
                        </td>
                        <td>{item.text1}</td>
                        <td>{item.text1}</td>
                        <td>{item.text1}</td>
                        <td>{item.text1}</td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={ChargeCostCenter}
                                value={item.selected}
                                onChange={setSelected_ChargeCostCenter} // using id as it is unique
                                required
                            />
                        </td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={ChargeAccount}
                                value={item.selected}
                                onChange={setSelected_ChargeAccount} // using id as it is unique
                                required
                            />
                        </td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={CreditCostCenter}
                                value={item.selected}
                                onChange={setSelected_CreditCostCenter} // using id as it is unique
                                required
                            />
                        </td>
                        <td>
                            <Select  
                                isClearable={true}  
                                options={CreditAccount}
                                value={item.selected}
                                onChange={setSelected_CreditAccount} // using id as it is unique
                                required
                            />
                        </td>
                        <td>{item.text2}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default WorkOrderTimeCard;
