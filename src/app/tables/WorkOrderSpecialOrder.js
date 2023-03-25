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


const WorkOrderSpecialOrder = () => {
 

  const [Columns, setColumns] = useState([]);
  const [Data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Supplier, setSupplier] = useState([]);
  const [selected_Supplier, setSelected_Supplier] = useState([]);

  const [Description, setDescription] = useState("");

  const [TaxCode, setTaxCode] = useState([]);
  const [selected_TaxCode, setSelected_TaxCode] = useState([]);

  const [UOM, setUOM] = useState([]);
  const [selected_UOM, setSelected_UOM] = useState([]);

  const [QtyNeeded, setQtyNeeded] = useState("0");

  const [ItemCost, setItemCost] = useState("0");

  const [CostCenter, setCostCenter] = useState([]);
  const [selected_CostCenter, setSelected_CostCenter] = useState([]);

  const [Account, setAccount] = useState([]);
  const [selected_Account, setSelected_Account] = useState([]);

  const location = useLocation();
  
  const [Button_save, setButton_save] = useState("");

  const [RowID, setRowID] = useState("");



  const get_workordermaster_specialorder = (site_ID) => {
    APIServices.get_workordermaster_specialorder(site_ID)
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
    get_workordermaster_specialorder(site_ID);
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


            setSelected_Supplier( {label:responseJson.data.data[index].wko_ls3_rec_supplier} )
            setDescription( responseJson.data.data[index].wko_ls3_descr )
            setSelected_TaxCode( {label:responseJson.data.data[index].wko_ls3_tax_cd} )
            setSelected_UOM( {label:responseJson.data.data[index].wko_ls3_mtl_uom} )
            setQtyNeeded( responseJson.data.data[index].wko_ls3_qty_needed )
            setItemCost( responseJson.data.data[index].wko_ls3_item_cost )
            setSelected_CostCenter( {label:responseJson.data.data[index].wko_ls3_chg_costcenter} )
            setSelected_Account( {label:responseJson.data.data[index].wko_ls3_chg_account} )


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

        <div>
            <Modal show={show} onHide={handleClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Special Order (PR)</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Supplier">
                            <label className="col-sm-4 col-form-label">Supplier:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={Supplier}
                                    value={selected_Supplier}
                                    onChange={setSelected_Supplier} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Description">
                            <label className="col-sm-4 col-form-label">Description:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="text"  
                                    value={Description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_TaxCode">
                            <label className="col-sm-4 col-form-label">Tax Code:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={TaxCode}
                                    value={selected_TaxCode}
                                    onChange={setSelected_TaxCode} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_UOM">
                            <label className="col-sm-4 col-form-label">UOM:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={UOM}
                                    value={selected_UOM}
                                    onChange={setSelected_UOM} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_QtyNeeded">
                            <label className="col-sm-4 col-form-label">Qty Needed:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                                <Form.Control  
                                    type="number"  
                                    placeholder=".00" 
                                    value={QtyNeeded} 
                                    onChange={(e) => setQtyNeeded(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ItemCost">
                            <label className="col-sm-4 col-form-label">Item Cost:</label>
                            <div className="col-sm-7 form-label">
                            <label className="col-sm-12 form-label">
                            <Form.Control  
                                    type="number"  
                                    placeholder=".00" 
                                    value={ItemCost} 
                                    onChange={(e) => setItemCost(e.target.value)}
                                    />
                            </label>
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_ItemCost">
                            <label className="col-sm-4 col-form-label">Cost Center:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={CostCenter}
                                    value={selected_CostCenter}
                                    onChange={setSelected_CostCenter} // using id as it is unique
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className="col-md-12">
                        <Form.Group className="row" controlId="validation_Account">
                            <label className="col-sm-4 col-form-label">Account:</label>
                            <div className="col-sm-7">
                                <Select  
                                    isClearable={true}  
                                    options={Account}
                                    value={selected_Account}
                                    onChange={setSelected_Account} // using id as it is unique
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
                    {/* {Button_save} */}
                    Submit
                    </Button>
                </Modal.Footer>

            </Modal>

        </div> 

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
                <tbody {...getTableBodyProps() } >
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                        {row.cells.map(cell => {
                            return (
                            <>
                            {/* Here added onClick function to get cell value */}
                            <td
                            // onClick={()=> getCellValue(cell)}
                            //     {...cell.getCellProps()}
                            //     style={{
                            //     padding: '10px',
                            //     border: 'solid 1px gray',
                            //     background: 'papayawhip',
                            //     }}
                            >
                                {cell.render('Cell')}
                            </td>
                            </>
                            )
                        })}
                        </tr>
                    )
                    })}                                
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default WorkOrderSpecialOrder;
