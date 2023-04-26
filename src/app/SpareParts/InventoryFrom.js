import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import APIServices from "../services/APIServices";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import  {useLocation}  from 'react-router-dom';
import Moment from 'moment';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import moment from 'moment';

import '../style.css';
import InventoryLocation from "../tables/InventoryLocation";
import InventorySupplier from "../tables/InventorySupplier";

const InventoryFrom = (props) => {

    const [validated, setValidated] = useState(false);


    const handleDragStart = (e) => e.preventDefault();

    const items = [
      <img src="../../assets/images/product_images_2/thumb_image1.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image2.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image3.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image4.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image5.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image6.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image7.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image8.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image9.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image10.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image11.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image12.jpg" onDragStart={handleDragStart} role="presentation" />,
    
    ];

    const location = useLocation();
  
    const [Button_save, setButton_save] = useState("");

    const [RowID, setRowID] = useState("");
    const [edited, setEdited] = useState(false);
    

    const [Type, setType] = useState([{label:"S : Stock",value:""},{label:"T : Tool",value:""},{label:"S : Serialize",value:""},{label:"S : Serialize with Asset",value:""}]);
    const [selected_Type, setSelected_Type] = useState([]);

    const [Commodity_Code, setCommodity_Code] = useState([]);
    const [selected_Commodity_Code, setSelected_Commodity_Code] = useState([]);

    const [StockNo, setStockNo] = useState("");
    const [StockNo_disabled, setStockNo_disabled] = useState(false);

    const [Stock_Group, setStock_Group] = useState([]);
    const [selected_Stock_Group, setSelected_Stock_Group] = useState([]);

    const [Master_Location, setMaster_Location] = useState([]);
    const [selected_Master_Location, setSelected_Master_Location] = useState([]);

    const [Part_No, setPart_No] = useState("");

    const [Order_Rule, setOrder_Rule] = useState([]);
    const [selected_Order_Rule, setSelected_Order_Rule] = useState([]);

    const [TotalOH, setTotalOH] = useState([]);
    const [TotalOH_disabled, setTotalOH_disabled] = useState(false);

    const [Cost_Center, setCost_Center] = useState([]);
    const [selected_Cost_Center, setSelected_Cost_Center] = useState([]);

    const [IssuePrice, setIssuePrice] = useState([]);
    const [IssuePrice_disabled, setIssuePrice_disabled] = useState(false);

    const [Account, setAccount] = useState([]);
    const [selected_Account, setSelected_Account] = useState([]);

    const [SerializeCounter, setSerializeCounter] = useState([]);
    const [SerializeCounter_disabled, setSerializeCounter_disabled] = useState(false);

    const [Description, setDescription] = useState("");

    const [ExtendedDescription, setExtendedDescription] = useState("");

    const [PartDeacStatus, setPartDeacStatus] = useState([]);
    const [selected_PartDeacStatus, setSelected_PartDeacStatus] = useState([]);

    const [AutoSpare, setAutoSpare] = useState(false);
    const [CheckBox_AutoSpare, setCheckBox_AutoSpare] = useState('0');

    const [IssueUOM, setIssueUOM] = useState([]);
    const [selected_IssueUOM, setSelected_IssueUOM] = useState([]);

    const [CriticalSpare, setCriticalSpare] = useState(false);
    const [CheckBox_CriticalSpare, setCheckBox_CriticalSpare] = useState('0');

    const [ReceiveUOM, setReceiveUOM] = useState([]);
    const [selected_ReceiveUOM, setSelected_ReceiveUOM] = useState([]);

    const [HazardousMaterial, setHazardousMaterial] = useState(false);
    const [CheckBox_HazardousMaterial, setCheckBox_HazardousMaterial] = useState('0');
    
    const [ConversionFactor, setConversionFactor] = useState("");

    const [ABCClass, setABCClass] = useState("");

    const [StorageType, setStorageType] = useState([]);
    const [selected_StorageType, setSelected_StorageType] = useState([]);

    const [OrderPoint, setOrderPoint] = useState("0");

    const [Cube, setCube] = useState("0");

    const [Maximum, setMaximum] = useState("0");

    const [ShelfLife, setShelfLife] = useState("0");

    const [LastActivityDate, setLastActivityDate] = useState("");

    const [EOQ, setEOQ] = useState("");

    const [LastCountDate, setLastCountDate] = useState("");

    const [NextCountDate, setNextCountDate] = useState("");

    const [UDFNote1, setUDFNote1] = useState("");
    const [UDFText_1, setUDFText_1] = useState("");
    const [UDFText_2, setUDFText_2] = useState("");
    const [UDFText_3, setUDFText_3] = useState("");
    const [UDFText_4, setUDFText_4] = useState("");
    const [UDFText_5, setUDFText_5] = useState("");
    const [UDFText_6, setUDFText_6] = useState("");
    const [UDFText_7, setUDFText_7] = useState("");
    const [UDFText_8, setUDFText_8] = useState("");
    const [UDFText_9, setUDFText_9] = useState("");
    const [UDFText_10, setUDFText_10] = useState("");

    const [UDFNumber_1, setUDFNumber_1] = useState("0");
    const [UDFNumber_2, setUDFNumber_2] = useState("0");
    const [UDFNumber_3, setUDFNumber_3] = useState("0");
    const [UDFNumber_4, setUDFNumber_4] = useState("0");
    const [UDFNumber_5, setUDFNumber_5] = useState("0");

    const [UDFDate_1, setUDFDate_1] = useState(new Date());
    const [UDFDate_2, setUDFDate_2] = useState(new Date());
    const [UDFDate_3, setUDFDate_3] = useState(new Date());
    const [UDFDate_4, setUDFDate_4] = useState(new Date());
    const [UDFDate_5, setUDFDate_5] = useState(new Date());

    const [AccountType, setAccountType] = useState([{label:"I : INVENTORY",value:""},{label:"E : EXPENSE",value:""}]);
    const [selected_AccountType, setSelected_AccountType] = useState([]);

    const [TaxCode, setTaxCode] = useState([]);
    const [selected_TaxCode, setSelected_TaxCode] = useState([]);

    const [YTDUsage, setYTDUsage] = useState("");

    const [LastYearUsage, setLastYearUsage] = useState("");

    const [YTDTurns, setYTDTurns] = useState("");

    const [LastYearTurns, setLastYearTurns] = useState("");

    const [YTDStockouts, setYTDStockouts] = useState("");

    const [LastYearStockouts, setLastYearStockouts] = useState("");
    

    const [CostingRule, setCostingRule] = useState(false);
    const [Radio_CostingRule, setRadio_CostingRule] = useState('');

    const [Average, setAverage] = useState("0.0000");

    const [Standard, setStandard] = useState("0.0000");

    const [Last, setLast] = useState("0.0000");


    const [AutoNumring, setAutoNumring] = useState("");

    const [radio, setRadio] = useState('');
      
    const [Columns, setColumns] = useState([]);
    const [Data, setData] = useState([]);



    const get_inventory_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


            for (var index in responseJson.data.data.Wko_Auto_numbering) {  

                if(responseJson.data.data.Wko_Auto_numbering[index].cnt_mst_numbering == "M" ){

                    setStockNo_disabled(false)
                    setAutoNumring('M')
                }else{
                    
                    setStockNo_disabled(true)
                    setAutoNumring('A')
                }              
            }



                let Commodity_Code = responseJson.data.data.ITM_Commodity_Code.map(item => ({
                    label: item.com_mst_com_code +" : "+ item.com_mst_desc,
                    value: item.com_mst_desc            
                    }));
                    setCommodity_Code(Commodity_Code);

                let Stock_Group = responseJson.data.data.ITM_Stock_Group.map(item => ({
                    label: item.itm_grp_cd +" : "+ item.itm_grp_desc,
                    value: item.itm_grp_desc            
                    }));
                    setStock_Group(Stock_Group);

                let Master_Location = responseJson.data.data.ITM_Master_Location.map(item => ({
                    label: item.loc_mst_stk_loc +" : "+ item.loc_mst_desc,
                    value: item.loc_mst_desc            
                    }));
                    setMaster_Location(Master_Location);

                let Order_Rule = responseJson.data.data.ITM_Order_Rule.map(item => ({
                    label: item.odr_mst_odr +" : "+ item.odr_mst_desc,
                    value: item.odr_mst_desc            
                    }));
                    setOrder_Rule(Order_Rule);

                let Cost_Center = responseJson.data.data.CostCenter.map(item => ({
                    label: item.costcenter +" : "+ item.descs,
                    value: item.descs            
                    }));
                    setCost_Center(Cost_Center);

                let Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs,
                    value: item.descs            
                    }));
                    setAccount(Account);

                let PartDeacStatus = responseJson.data.data.ITM_Part_Deac_Status.map(item => ({
                    label: item.itm_sts_status +" : "+ item.itm_sts_typ_cd,
                    value: item.itm_sts_typ_cd            
                    }));
                    setPartDeacStatus(PartDeacStatus);

                let IssueUOM = responseJson.data.data.ITM_Issue_UOM.map(item => ({
                    label: item.uom_mst_uom +" : "+ item.uom_mst_desc,
                    value: item.uom_mst_desc            
                    }));
                    setIssueUOM(IssueUOM);

                let ReceiveUOM = responseJson.data.data.ITM_Issue_UOM.map(item => ({
                    label: item.uom_mst_uom +" : "+ item.uom_mst_desc,
                    value: item.uom_mst_desc            
                    }));
                    setReceiveUOM(ReceiveUOM);

                let StorageType = responseJson.data.data.ITM_Storage_Type.map(item => ({
                    label: item.stt_mst_stt +" : "+ item.stt_mst_desc,
                    value: item.stt_mst_desc            
                    }));
                    setStorageType(StorageType);

                let TaxCode = responseJson.data.data.ITM_Tax_Code.map(item => ({
                    label: item.tax_mst_tax_cd +" : "+ item.tax_mst_desc,
                    value: item.tax_mst_desc            
                    }));
                    setTaxCode(TaxCode);


                    if(selected_asset == 'New_Inventory'){ 

                        Swal.close();
                        setButton_save("Save")
    
                    }else{
    
                        setButton_save("Update")
                        get_inventorymaster_select(site_ID, selected_asset);
                    }     
                             
                    
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
  

    const get_inventorymaster_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_inventorymaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT ITM: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                
                setSelected_Type( {label:responseJson.data.data[index].itm_mst_type} )
                setSelected_Commodity_Code( {label:responseJson.data.data[index].itm_mst_com_code} )
                setStockNo(responseJson.data.data[index].itm_mst_stockno )
                setSelected_Stock_Group( {label:responseJson.data.data[index].itm_mst_itm_grp} )
                setSelected_Master_Location( {label:responseJson.data.data[index].itm_mst_mstr_locn} )
                setPart_No( responseJson.data.data[index].itm_mst_partno )
                setSelected_Order_Rule( {label:responseJson.data.data[index].itm_mst_order_rule} )
                setSelected_Cost_Center( {label:responseJson.data.data[index].itm_mst_costcenter} )
                setSelected_Account( {label:responseJson.data.data[index].itm_mst_account} )
                setDescription( responseJson.data.data[index].itm_mst_desc )
                setExtendedDescription( responseJson.data.data[index].itm_mst_ext_desc )

                setSelected_PartDeacStatus( {label:responseJson.data.data[index].itm_det_part_deac_status} )
                setAutoSpare( responseJson.data.data[index].itm_det_auto_spare )
                setSelected_IssueUOM( {label:responseJson.data.data[index].itm_det_issue_uom} )
                setCriticalSpare( responseJson.data.data[index].itm_det_critical_spare )
                setSelected_ReceiveUOM( {label:responseJson.data.data[index].itm_det_rcv_uom} )
                setHazardousMaterial( responseJson.data.data[index].itm_det_hzd_mtl )
                setABCClass( responseJson.data.data[index].itm_det_abc_class )
                setSelected_StorageType( {label:responseJson.data.data[index].itm_det_storage_type} )
                setOrderPoint( responseJson.data.data[index].itm_det_order_pt )
                setCube( responseJson.data.data[index].itm_det_cube )
                setMaximum( responseJson.data.data[index].itm_det_maximum )
                setShelfLife( responseJson.data.data[index].itm_det_shelf_life )

                if(responseJson.data.data[index].itm_det_lastactdate == null){
                    setLastActivityDate('')
                }else{

                    setLastActivityDate( Moment(responseJson.data.data[index].itm_det_lastactdate.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT LADate : '+ Moment(responseJson.data.data[index].itm_det_lastactdate.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_lastcntdate == null){
                    setLastCountDate('')
                }else{

                    setLastCountDate( Moment(responseJson.data.data[index].itm_det_lastcntdate.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT LCDate : '+ Moment(responseJson.data.data[index].itm_det_lastcntdate.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_next_cnt_date == null){
                    setNextCountDate('')
                }else{

                    setNextCountDate( Moment(responseJson.data.data[index].itm_det_next_cnt_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT NCDate : '+ Moment(responseJson.data.data[index].itm_det_next_cnt_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setUDFNote1( responseJson.data.data[index].itm_det_note1 )
                setUDFText_1( responseJson.data.data[index].itm_det_varchar1 )
                setUDFText_2( responseJson.data.data[index].itm_det_varchar2 )
                setUDFText_3( responseJson.data.data[index].itm_det_varchar3 )
                setUDFText_4( responseJson.data.data[index].itm_det_varchar4 )
                setUDFText_5( responseJson.data.data[index].itm_det_varchar5 )
                setUDFText_6( responseJson.data.data[index].itm_det_varchar6 )
                setUDFText_7( responseJson.data.data[index].itm_det_varchar7 )
                setUDFText_8( responseJson.data.data[index].itm_det_varchar8 )
                setUDFText_9( responseJson.data.data[index].itm_det_varchar9 )
                setUDFText_10( responseJson.data.data[index].itm_det_varchar10 )

                setUDFNumber_1( responseJson.data.data[index].itm_det_numeric1 )
                setUDFNumber_2( responseJson.data.data[index].itm_det_numeric2 )
                setUDFNumber_3( responseJson.data.data[index].itm_det_numeric3 )
                setUDFNumber_4( responseJson.data.data[index].itm_det_numeric4 )
                setUDFNumber_5( responseJson.data.data[index].itm_det_numeric5 )
               
                if(responseJson.data.data[index].itm_det_datetime1 == null){
                    setUDFDate_1('')
                }else{

                    setUDFDate_1( Moment(responseJson.data.data[index].itm_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].itm_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_datetime2 == null){
                    setUDFDate_2('')
                }else{

                    setUDFDate_2( Moment(responseJson.data.data[index].itm_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 2 : '+ Moment(responseJson.data.data[index].itm_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_datetime3 == null){
                    setUDFDate_3('')
                }else{

                    setUDFDate_3( Moment(responseJson.data.data[index].itm_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 3 : '+ Moment(responseJson.data.data[index].itm_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_datetime4 == null){
                    setUDFDate_4('')
                }else{

                    setUDFDate_4( Moment(responseJson.data.data[index].itm_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 4 : '+ Moment(responseJson.data.data[index].itm_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].itm_det_datetime5 == null){
                    setUDFDate_5('')
                }else{

                    setUDFDate_5( Moment(responseJson.data.data[index].itm_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 5 : '+ Moment(responseJson.data.data[index].itm_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_AccountType( {label:responseJson.data.data[index].itm_det_acct_type} )
                setSelected_TaxCode( {label:responseJson.data.data[index].itm_det_tax_cd} )
                setCostingRule( responseJson.data.data[index].itm_det_cr_code )
                setAverage( responseJson.data.data[index].itm_det_avg_cost )
                setStandard( responseJson.data.data[index].itm_det_std_cost )
                setLast( responseJson.data.data[index].itm_det_last_cost )


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
              title: 'Oops get_Inventory_select...',
              text: e,          
            })
          });

    }


    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        console.log('select select',location.state.select);
        console.log('select ITMID',location.state.RowID);
    
        get_inventory_status(site_ID, "All", location.state.select);       
       

    },[location]);


    const onClickChange = () => {

        
        if(selected_Type == 0 || selected_Type == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select the Type',
                        showConfirmButton: false,
                        timer: 2000
                        
                    })
                } else {
                
                    if(selected_Master_Location == 0 || selected_Master_Location == null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Select the Master Location',
                            showConfirmButton: false,
                            timer: 2000,
                            
                        })
                    }else{

                        if(selected_Order_Rule == 0 || selected_Order_Rule == null){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Select the Order Rule',
                                showConfirmButton: false,
                                timer: 2000
                                
                            })
                        }else{
                        
                            if(selected_Cost_Center == 0 || selected_Cost_Center == null){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Please Select the Cost Center',
                                    showConfirmButton: false,
                                    timer: 2000
                                    
                                })
                            }else{
                    
                                if(selected_Account == 0 || selected_Account == null){
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Please Select the Account',
                                        showConfirmButton: false,
                                        timer: 2000
                                        
                                        })
                                }else{
                        
                                    if(Description == ''){
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Enter the Description',
                                            showConfirmButton: false,
                                            timer: 2000
                                            
                                            })
                                    }else{

                                        if(selected_PartDeacStatus == 0 || selected_PartDeacStatus == null){
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Please Select the Part Deac Status',
                                                showConfirmButton: false,
                                                timer: 2000
                                                
                                            })
                                        } else {
                
                                            if(selected_IssueUOM == 0 || selected_IssueUOM == null){
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'error',
                                                    title: 'Please Select the Issue UOM',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                    
                                                    })
                                            }else{

                                                if(selected_ReceiveUOM == 0 || selected_ReceiveUOM == null){
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'error',
                                                        title: 'Please Select the Receive UOM',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                        
                                                        })
                                                }else{
                                        
                                                    if(Button_save ==  "Save"){
                
                                                        New_Inventory();
                                                        console.log("Create button clicked!");
                                                        resetData();

                                                    }else if(Button_save == "Update"){
                
                                                        Update_Inventory();
                                                        console.log("Update button clicked here!");
                                                    }
                                                }
                                            
                                
                                            }
                        
                            
                                        }
                                    
                        
                                    }
                                
                    
                                }
                            
                
                            }
                        }

                    }
            }
   
    }

    const onClickCancel = () => {
        if (edited) {
            Swal.fire({
                title: 'Warning',
                text: 'You have made some changes. Do you want to update these changes?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
                }).then((result) => {
                
                if (result.isConfirmed) {
                    Update_Inventory();
                }
    
                window.history.back();
                });
    
            } else {
                window.history.back();
            }
    };
    
    const handleInputChange = () => {
        setEdited(true);
    };


    const New_Inventory = () => {

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading();


        let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');
        console.log(get_date)

        let site_ID = localStorage.getItem("site_ID");
        let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
        let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");


        
        //Select Type
        let setType = '';
        if(selected_Type.label == '' || selected_Type.label == null){
           
           setType = ''
        }else{

            let Type = selected_Type.label.split(":")
            setType = Type[0];
            console.log("Type: ", Type[0])
        }

        //Select Commodity_Code
        let Commodity_Code, setCommodity_Code;
        if(selected_Commodity_Code == '' || selected_Commodity_Code == null){

            setCommodity_Code =''
        }else{

            Commodity_Code = selected_Commodity_Code.label.split(":")
            setCommodity_Code = Commodity_Code[0];
            console.log("Commodity_Code ", Commodity_Code[0])
        }

        //Select StockNo
        console.log("StockNo: ", StockNo)

        //Select Stock Group
        let Stock_Group, setStock_Group;
        if(selected_Stock_Group == '' || selected_Stock_Group == null){

            setStock_Group =''
        }else{

            Stock_Group = selected_Stock_Group.label.split(":")
            setStock_Group = Stock_Group[0];
            console.log("Stock_Group ", Stock_Group[0])
        }

        //Select Master Location
        let Master_Location, setMaster_Location;
        if(selected_Master_Location == '' || selected_Master_Location == null){

            setMaster_Location =''
        }else{

            Master_Location = selected_Master_Location.label.split(":")
            setMaster_Location = Master_Location[0];
            console.log("Master_Location ", Master_Location[0])
        }

        //Select Part No
        console.log("Part_No: ", Part_No)

        //Select Order Rule
        let Order_Rule, setOrder_Rule;
        if(selected_Order_Rule == '' || selected_Order_Rule == null){

            setOrder_Rule =''
        }else{

            Order_Rule = selected_Order_Rule.label.split(":")
            setOrder_Rule = Order_Rule[0];
            console.log("Order_Rule ", Order_Rule[0])
        }

        //Select Cost Center
        let Cost_Center, setCost_Center;
        if(selected_Cost_Center == '' || selected_Cost_Center == null){

            setCost_Center =''
        }else{

            Cost_Center = selected_Cost_Center.label.split(":")
            setCost_Center = Cost_Center[0];
            console.log("Cost_Center ", Cost_Center[0])
        }

        //Select Account
        let Account, setAccount;
        if(selected_Account == '' || selected_Account == null){

            setAccount =''
        }else{

            Account = selected_Account.label.split(":")
            setAccount = Account[0];
            console.log("Account ", Account[0])
        }

        //Select Description
        console.log("Description: ", Description)

        //Select ExtendedDescription
        console.log("ExtendedDescription: ", ExtendedDescription)

        //Select Part Deac Status
        let PartDeacStatus, setPartDeacStatus;
        if(selected_PartDeacStatus == '' || selected_PartDeacStatus == null){

            setPartDeacStatus =''
        }else{

            PartDeacStatus = selected_PartDeacStatus.label.split(":")
            setPartDeacStatus = PartDeacStatus[0];
            console.log("PartDeacStatus ", PartDeacStatus[0])
        }

        //Select Issue UOM
        let IssueUOM, setIssueUOM;
        if(selected_IssueUOM == '' || selected_IssueUOM == null){

            setIssueUOM =''
        }else{

            IssueUOM = selected_IssueUOM.label.split(":")
            setIssueUOM = IssueUOM[0];
            console.log("IssueUOM ", IssueUOM[0])
        }

        //Select Receive UOM
        let ReceiveUOM, setReceiveUOM;
        if(selected_ReceiveUOM == '' || selected_ReceiveUOM == null){

            setReceiveUOM =''
        }else{

            ReceiveUOM = selected_ReceiveUOM.label.split(":")
            setReceiveUOM = ReceiveUOM[0];
            console.log("ReceiveUOM ", ReceiveUOM[0])
        }

        //Select ABC Class
        console.log("ABCClass: ", ABCClass)

        //Select Storage Type
        let StorageType, setStorageType;
        if(selected_StorageType.label == '' || selected_StorageType.label == null){

            setStorageType =''
        }else{

            StorageType = selected_StorageType.label.split(":")
            setStorageType = StorageType[0];
            console.log("StorageType ", StorageType[0])
        }

        //Select Order Point
        console.log("OrderPoint: ", OrderPoint)

        //Select Cube
        console.log("Cube: ", Cube)

        //Select Maximum
        console.log("Maximum: ", Maximum)

        //Select ShelfLife
        console.log("ShelfLife: ", ShelfLife)

        //Select Last Activity Date
        let date_of_LastActivity = ''
        if (LastActivityDate == '' || LastActivityDate == null) {

            date_of_LastActivity = '';
        } else {

            date_of_LastActivity = Moment(LastActivityDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LAD ", date_of_LastActivity);
        }

        //Select Last Count Date
        let date_of_LastCount = ''
        if (LastCountDate == '' || LastCountDate == null) {

            date_of_LastCount = '';
        } else {

            date_of_LastCount = Moment(LastCountDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LCD ", date_of_LastCount);
        }

        //Select Next Count Date
        let date_of_NextCount = ''
        if (NextCountDate == '' || NextCountDate == null) {

            date_of_NextCount = '';
        } else {

            date_of_NextCount = Moment(NextCountDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SD ", date_of_NextCount);
        }

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
            console.log("Date3 ", date_3);
        }

        //Select Date 4
        let date_4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_4 = '';
        } else {

            date_4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date4 ", date_4);
        }

        //Select Date 5
        let date_5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_5 = '';
        } else {

            date_5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date5 ", date_5);
        }

        //Select Account Type
        let setAccountType = '';
         if(selected_AccountType.label == '' || selected_AccountType.label == null){
            
            setAccountType = ''
        }else{

            let AccountType = selected_AccountType.label.split(":")
            setAccountType = AccountType[0];
            console.log("AccountType: ", AccountType[0])
        }

        //Select Tax Code
        let setTaxCode = '';
         if(selected_TaxCode.label == '' || selected_TaxCode.label == null){
            
            setTaxCode = ''
        }else{

            let TaxCode = selected_TaxCode.label.split(":")
            setTaxCode = TaxCode[0];
            console.log("TaxCode: ", TaxCode[0])
        }



    var json_inventory ={


        "site_cd": site_ID,

        "itm_mst_type":setType.trim(),
        "itm_mst_com_code":setCommodity_Code.trim(),
        "itm_mst_stockno": StockNo.trim(),
        "itm_mst_itm_grp":setStock_Group.trim(),
        "itm_mst_mstr_locn":setMaster_Location.trim(),
        "itm_mst_partno":Part_No.trim(),
        "itm_mst_order_rule":setOrder_Rule.trim(),
        "itm_mst_costcenter":setCost_Center.trim(),
        "itm_mst_account":setAccount.trim(),
        "itm_mst_desc":Description.trim(),
        "itm_mst_ext_desc":ExtendedDescription.trim(),

        "itm_det_part_deac_status":setPartDeacStatus.trim(),
        "itm_det_auto_spare":CheckBox_AutoSpare,
        "itm_det_issue_uom":setIssueUOM.trim(),
        "itm_det_critical_spare":CheckBox_CriticalSpare,
        "itm_det_rcv_uom":setReceiveUOM.trim(),
        "itm_det_hzd_mtl":CheckBox_HazardousMaterial,
        "itm_det_abc_class":ABCClass.trim(),
        "itm_det_storage_type":setStorageType.trim(),
        "itm_det_order_pt":OrderPoint.trim(),
        "itm_det_cube":Cube.trim(),
        "itm_det_maximum":Maximum.trim(),
        "itm_det_shelf_life":ShelfLife.trim(),
        "itm_det_lastactdate":date_of_LastActivity,
        "itm_det_lastcntdate":date_of_NextCount,
        "itm_det_next_cnt_date":date_of_LastCount,

        "itm_det_note1":UDFNote1,
        "itm_det_varchar1":UDFText_1,
        "itm_det_varchar2":UDFText_2,
        "itm_det_varchar3":UDFText_3,
        "itm_det_varchar4":UDFText_4,
        "itm_det_varchar5":UDFText_5,
        "itm_det_varchar6":UDFText_6,
        "itm_det_varchar7":UDFText_7,
        "itm_det_varchar8":UDFText_8,
        "itm_det_varchar9":UDFText_9,
        "itm_det_varchar10":UDFText_10,

        "itm_det_numeric1":UDFNumber_1.trim(),
        "itm_det_numeric2":UDFNumber_2.trim(),
        "itm_det_numeric3":UDFNumber_3.trim(),
        "itm_det_numeric4":UDFNumber_4.trim(),
        "itm_det_numeric5":UDFNumber_5.trim(),
       
        "itm_det_datetime1":date_1,
        "itm_det_datetime2":date_2,
        "itm_det_datetime3":date_3,
        "itm_det_datetime4":date_4,
        "itm_det_datetime5":date_5,

        "itm_det_acct_type":setAccountType.trim(),
        "itm_det_tax_cd":setTaxCode.trim(),
        "itm_det_cr_code":Radio_CostingRule,
        "itm_det_std_cost":Standard.trim(),
        "itm_det_avg_cost":Average.trim(),
        "itm_det_last_cost":Last.trim(),

        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "itm_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "itm_mst_create_date":get_date,
        "cnt_mst_numbering":AutoNumring,
        
    }

    console.log(JSON.stringify(json_inventory))

    APIServices.insert_new_inventory(JSON.stringify(json_inventory)).then((responseJson)=>{
        if (responseJson.data.status === 'SUCCESS') { 
            
            Swal.close();

            Swal.fire({
                icon: 'success',
                title: responseJson.data.status,
                text: responseJson.data.message,
                
              })

        }else{
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.data,
                
              })

        }
        
    }).catch((e) => {
        Swal.close();
      
        Swal.fire({
          icon: 'error',
          title: 'Oops get_Inventory_select...',
          text: e,          
        })
      });

    }


    const Update_Inventory = () => {

    //Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
    //Swal.showLoading();


    let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');

    let site_ID = localStorage.getItem("site_ID");
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
    
    let RowID = localStorage.getItem("RowID");
    console.log('get RowID here...',location.state.RowID);



        //Select Type
        let setType = '';
         if(selected_Type.label == '' || selected_Type.label == null){
            
            setType = ''
        }else{

            let Type = selected_Type.label.split(":")
            setType = Type[0];
            console.log("Type: ", Type[0])
        }

        //Select Commodity Code
        let Commodity_Code, setCommodity_Code;
        if(selected_Commodity_Code == '' || selected_Commodity_Code == null){

            setCommodity_Code =''
        }else{

            Commodity_Code = selected_Commodity_Code.label.split(":")
            setCommodity_Code = Commodity_Code[0];
            console.log("Commodity_Code ", Commodity_Code[0])
        }

        //Select StockNo
        console.log("StockNo: ", StockNo)

        //Select Stock Group
        let Stock_Group, setStock_Group;
        if(selected_Stock_Group == '' || selected_Stock_Group == null){

            setStock_Group =''
        }else{

            Stock_Group = selected_Stock_Group.label.split(":")
            setStock_Group = Stock_Group[0];
            console.log("Stock_Group ", Stock_Group[0])
        }

        //Select Master Location
        let Master_Location, setMaster_Location;
        if(selected_Master_Location == '' || selected_Master_Location == null){

            setMaster_Location =''
        }else{

            Master_Location = selected_Master_Location.label.split(":")
            setMaster_Location = Master_Location[0];
            console.log("Master_Location ", Master_Location[0])
        }

        //Select Part No
        console.log("Part_No: ", Part_No)

        //Select Order Rule
        let Order_Rule, setOrder_Rule;
        if(selected_Order_Rule == '' || selected_Order_Rule == null){

            setOrder_Rule =''
        }else{

            Order_Rule = selected_Order_Rule.label.split(":")
            setOrder_Rule = Order_Rule[0];
            console.log("Order_Rule ", Order_Rule[0])
        }

        //Select Cost Center
        let Cost_Center, setCost_Center;
        if(selected_Cost_Center == '' || selected_Cost_Center == null){

            setCost_Center =''
        }else{

            Cost_Center = selected_Cost_Center.label.split(":")
            setCost_Center = Cost_Center[0];
            console.log("Cost_Center ", Cost_Center[0])
        }

        //Select Account
        let Account, setAccount;
        if(selected_Account == '' || selected_Account == null){

            setAccount =''
        }else{

            Account = selected_Account.label.split(":")
            setAccount = Account[0];
            console.log("Account ", Account[0])
        }

        //Select Description
        console.log("Description: ", Description)

        //Select ExtendedDescription
        console.log("ExtendedDescription: ", ExtendedDescription)

        //Select Part Deac Status
        let PartDeacStatus, setPartDeacStatus;
        if(selected_PartDeacStatus == '' || selected_PartDeacStatus == null){

            setPartDeacStatus =''
        }else{

            PartDeacStatus = selected_PartDeacStatus.label.split(":")
            setPartDeacStatus = PartDeacStatus[0];
            console.log("PartDeacStatus ", PartDeacStatus[0])
        }

        //Select Issue UOM
        let IssueUOM, setIssueUOM;
        if(selected_IssueUOM == '' || selected_IssueUOM == null){

            setIssueUOM =''
        }else{

            IssueUOM = selected_IssueUOM.label.split(":")
            setIssueUOM = IssueUOM[0];
            console.log("IssueUOM ", IssueUOM[0])
        }

        //Select Receive UOM
        let ReceiveUOM, setReceiveUOM;
        if(selected_ReceiveUOM == '' || selected_ReceiveUOM == null){

            setReceiveUOM =''
        }else{

            ReceiveUOM = selected_ReceiveUOM.label.split(":")
            setReceiveUOM = ReceiveUOM[0];
            console.log("ReceiveUOM ", ReceiveUOM[0])
        }

        //Select ABC Class
        console.log("ABCClass: ", ABCClass)

        //Select Storage Type
        let StorageType, setStorageType;
        if(selected_StorageType.label == '' || selected_StorageType.label == null){

            setStorageType =''
        }else{

            StorageType = selected_StorageType.label.split(":")
            setStorageType = StorageType[0];
            console.log("StorageType ", StorageType[0])
        }

        //Select Order Point
        console.log("OrderPoint: ", OrderPoint)

        //Select Cube
        console.log("Cube: ", Cube)

        //Select Maximum
        console.log("Maximum: ", Maximum)

        //Select ShelfLife
        console.log("ShelfLife: ", ShelfLife)

        //Select Last Activity Date
        let date_of_LastActivity = ''
        if (LastActivityDate == '' || LastActivityDate == null) {

            date_of_LastActivity = '';
        } else {

            date_of_LastActivity = Moment(LastActivityDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LAD ", date_of_LastActivity);
        }

        //Select Last Count Date
        let date_of_LastCount = ''
        if (LastCountDate == '' || LastCountDate == null) {

            date_of_LastCount = '';
        } else {

            date_of_LastCount = Moment(LastCountDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("LCD ", date_of_LastCount);
        }

        //Select Next Count Date
        let date_of_NextCount = ''
        if (NextCountDate == '' || NextCountDate == null) {

            date_of_NextCount = '';
        } else {

            date_of_NextCount = Moment(NextCountDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SD ", date_of_NextCount);
        }

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
            console.log("Date3 ", date_3);
        }

        //Select Date 4
        let date_4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_4 = '';
        } else {

            date_4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date4 ", date_4);
        }

        //Select Date 5
        let date_5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_5 = '';
        } else {

            date_5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date5 ", date_5);
        }

        //Select Account Type
        let setAccountType = '';
         if(selected_AccountType.label == '' || selected_AccountType.label == null){
            
            setAccountType = ''
        }else{

            let AccountType = selected_AccountType.label.split(":")
            setAccountType = AccountType[0];
            console.log("AccountType: ", AccountType[0])
        }

        //Select Tax Code
        let setTaxCode = '';
         if(selected_TaxCode.label == '' || selected_TaxCode.label == null){
            
            setTaxCode = ''
        }else{

            let TaxCode = selected_TaxCode.label.split(":")
            setTaxCode = TaxCode[0];
            console.log("TaxCode: ", TaxCode[0])
        }



    var json_inventory ={


        "site_cd": site_ID,

        "itm_mst_type":setType.trim(),
        "itm_mst_com_code":setCommodity_Code.trim(),
        "itm_mst_stockno": StockNo.trim(),
        "itm_mst_itm_grp":setStock_Group.trim(),
        "itm_mst_mstr_locn":setMaster_Location.trim(),
        "itm_mst_partno":Part_No,
        "itm_mst_order_rule":setOrder_Rule.trim(),
        "itm_mst_costcenter":setCost_Center.trim(),
        "itm_mst_account":setAccount.trim(),
        "itm_mst_desc":Description.trim(),
        "itm_mst_ext_desc":ExtendedDescription,

        "itm_det_part_deac_status":setPartDeacStatus.trim(),
        "itm_det_auto_spare":CheckBox_AutoSpare,
        "itm_det_issue_uom":setIssueUOM.trim(),
        "itm_det_critical_spare":CheckBox_CriticalSpare,
        "itm_det_rcv_uom":setReceiveUOM.trim(),
        "itm_det_hzd_mtl":CheckBox_HazardousMaterial,
        "itm_det_abc_class":ABCClass,
        "itm_det_storage_type":setStorageType.trim(),
        "itm_det_order_pt":OrderPoint.trim(),
        "itm_det_cube":Cube,
        "itm_det_maximum":Maximum.trim(),
        "itm_det_shelf_life":ShelfLife,
        "itm_det_lastactdate":date_of_LastActivity,
        "itm_det_lastcntdate":date_of_NextCount,
        "itm_det_next_cnt_date":date_of_LastCount,

        "itm_det_note1":UDFNote1,
        "itm_det_varchar1":UDFText_1,
        "itm_det_varchar2":UDFText_2,
        "itm_det_varchar3":UDFText_3,
        "itm_det_varchar4":UDFText_4,
        "itm_det_varchar5":UDFText_5,
        "itm_det_varchar6":UDFText_6,
        "itm_det_varchar7":UDFText_7,
        "itm_det_varchar8":UDFText_8,
        "itm_det_varchar9":UDFText_9,
        "itm_det_varchar10":UDFText_10,

        "itm_det_numeric1":UDFNumber_1,
        "itm_det_numeric2":UDFNumber_2,
        "itm_det_numeric3":UDFNumber_3,
        "itm_det_numeric4":UDFNumber_4,
        "itm_det_numeric5":UDFNumber_5,
       
        "itm_det_datetime1":date_1,
        "itm_det_datetime2":date_2,
        "itm_det_datetime3":date_3,
        "itm_det_datetime4":date_4,
        "itm_det_datetime5":date_5,

        "itm_det_acct_type":setAccountType.trim(),
        "itm_det_tax_cd":setTaxCode.trim(),
        "itm_det_cr_code":Radio_CostingRule,
        "itm_det_std_cost":Standard.trim(),
        "itm_det_avg_cost":Average.trim(),
        "itm_det_last_cost":Last.trim(),


        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "itm_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "itm_mst_create_date":get_date,
        
        "RowID":location.state.RowID,

    }

    console.log("Update : "+JSON.stringify(json_inventory))

    APIServices.update_inventory(JSON.stringify(json_inventory)).then((responseJson)=>{
        if (responseJson.data.status === 'SUCCESS') { 
            Swal.close();

            Swal.fire({
                icon: 'success',
                title: responseJson.data.status,
                text: responseJson.data.message,
                
              })

        }else{
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.data,
                
              })

        }
    }).catch((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Oops get_Inventory_select...',
          text: e,          
        })
      });


    }

  
    const resetData = () => {

        setSelected_Type(0);
        setSelected_Commodity_Code(0);
        setSelected_Stock_Group(0);
        setSelected_Master_Location(0);
        setPart_No('');
        setSelected_Order_Rule(0);
        setSelected_Cost_Center(0);
        setSelected_Account(0);
        setDescription('');
        setExtendedDescription('');
        setSelected_PartDeacStatus(0);
        setAutoSpare('');
        setSelected_IssueUOM(0);
        setCriticalSpare('');
        setSelected_ReceiveUOM(0);
        setHazardousMaterial('');
        setABCClass('');
        setSelected_StorageType(0);
        setOrderPoint('');
        setCube('');
        setMaximum('');
        setShelfLife('');
        setLastActivityDate('');
        setLastCountDate('');
        setNextCountDate('');

        setUDFNote1('');
        setUDFText_1('');
        setUDFText_2('');
        setUDFText_3('');
        setUDFText_4('');
        setUDFText_5('');
        setUDFText_6('');
        setUDFText_7('');
        setUDFText_8('');
        setUDFText_9('');
        setUDFText_10('');
        setUDFNumber_1('');
        setUDFNumber_2('');
        setUDFNumber_3('');
        setUDFNumber_4('');
        setUDFNumber_5('');
        setUDFDate_1('');
        setUDFDate_2('');
        setUDFDate_3('');
        setUDFDate_4('');
        setUDFDate_5('');

        setSelected_AccountType(0);
        setSelected_TaxCode(0);

        setButton_save('Save');
    }


    const handleOnChangeAutoSpare = () => {
    setAutoSpare(!AutoSpare);
    
    if(!AutoSpare){
        console.log('1')
        setCheckBox_AutoSpare('1')
    }else{
        console.log('0')
        setCheckBox_AutoSpare('0')
    }
    }

    const handleOnChangeCriticalSpare = () => {
    setCriticalSpare(!CriticalSpare);

    if(!CriticalSpare){
        console.log('1')
        setCheckBox_CriticalSpare('1')
    }else{
        console.log('0')
        setCheckBox_CriticalSpare('0')
    }
    }

    const handleOnChangeHazardousMaterial = () => {
    setHazardousMaterial(!HazardousMaterial);

    if(!HazardousMaterial){
        console.log('1')
        setCheckBox_HazardousMaterial('1')
    }else{
        console.log('0')
        setCheckBox_HazardousMaterial('0')
    }
    }


    const handleRadioChange = (e) => {
    setRadio(e.target.value);
    console.log('1')

    if(e.target.value === 'Average') {
        setCostingRule(true);
        setRadio_CostingRule('Average');

        } else if (e.target.value === 'Standard') {
        setCostingRule(false);
        setRadio_CostingRule('Standard');

        } else if (e.target.value === 'Last') {
        setCostingRule(false);
        setRadio_CostingRule('Last');

        } else if (e.target.value === 'FIFO') {
        setCostingRule(false);
        setRadio_CostingRule('FIFO');
        
        }
        
    }

    const handleAverageChange = (e) => {

    console.log(e.target.value)
    setAverage(e.target.value);
    }

    const handleStandardChange = (e) => {
    setStandard(e.target.value);
    }

    const handleLastChange = (e) => {
    setLast(e.target.value);
    }


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





      
      
  return (   
        <div>
            <div className="page-header" style={{ marginTop: "-10px", marginBottom:"10px" }}>
            <h3 className="page-title">Inventory Master</h3>   

            <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb"></ol> */}
                    <div className="template-demo">

                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>

                        <button type="button" className="btn btn-danger btn-icon-text" onClick={onClickCancel}>
                            <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                        </button>
                    
                    </div>
                
            </nav>       
        
            </div> 

            <div className="col-12 grid-margin">
                <div className="card" style={{marginLeft: "-15px", marginRight: "-15px"}}>
                    <div className="card-body"> 
                    <form className="form-sample" validated={validated}>  

                        <div className="row">

                            <div className="col-md-10">

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Type">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Type:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isClearable={true}  
                                                value={selected_Type}
                                                onChange={value => {
                                                    setSelected_Type(value);
                                                    handleInputChange();
                                                  }}
                                                options={Type}
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
                                        <Form.Group className="row" controlId="validation_Commodity_Code">
                                            <Form.Label className="col-sm-4 col-form-label top-sm down" style={{ fontSize: "13px" }}>Commodity Code:</Form.Label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Commodity_Code}
                                                    value={selected_Commodity_Code}
                                                    onChange={value => {
                                                        setSelected_Commodity_Code(value);
                                                        handleInputChange();
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

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_StockNo">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Stock No:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={StockNo} onChange={(e) => {setStockNo(e.target.value); handleInputChange();}}  disabled={StockNo_disabled}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    
                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_Stock_Group">
                                            <Form.Label className="col-sm-4 col-form-label top-sm down" style={{ fontSize: "13px" }}>Stock Group:</Form.Label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Stock_Group}
                                                    value={selected_Stock_Group}
                                                    onChange={value => {
                                                        setSelected_Stock_Group(value);
                                                        handleInputChange();
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

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Master_Location">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Master Location:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isClearable={true}  
                                                options={Master_Location}
                                                value={selected_Master_Location}
                                                onChange={value => {
                                                    setSelected_Master_Location(value);
                                                    handleInputChange();
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

                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_Part_No">
                                            <Form.Label className="col-sm-4 col-form-label top-sm down" style={{ fontSize: "13px" }}>Part No:</Form.Label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="text" value={Part_No} onChange={(e) => {setPart_No(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Order_Rule">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Order Rule:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isClearable={true}  
                                                options={Order_Rule}
                                                value={selected_Order_Rule}
                                                onChange={value => {
                                                    setSelected_Order_Rule(value);
                                                    handleInputChange();
                                                  }}  // using id as it is unique
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

                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_TotalOH">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Total OH:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" placeholder="0.0000" value={TotalOH} onChange={(e) => {setTotalOH(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Cost_Center">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Cost Center:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isClearable={true}  
                                                options={Cost_Center}
                                                value={selected_Cost_Center}
                                                onChange={value => {
                                                    setSelected_Cost_Center(value);
                                                    handleInputChange();
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

                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_IssuePrice">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Issue Price:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" placeholder="0.00" value={IssuePrice} onChange={(e) => {setIssuePrice(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Account">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Account:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isClearable={true}  
                                                options={Account}
                                                value={selected_Account}
                                                onChange={value => {
                                                    setSelected_Account(value);
                                                    handleInputChange();
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

                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_SerializeCounter">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Serialize Counter:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" placeholder="100001" value={SerializeCounter} onChange={(e) => {setSerializeCounter(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_Description">
                                            <label className="col-sm-2 col-form-label labelTop down" style={{ fontSize: "13px" }}>Description:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-10 descLeft-md descLeft-sm">
                                            <Form.Control 
                                                className='formControlBox'
                                                as="textarea" 
                                                rows={6} 
                                                value={Description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                    handleInputChange();
                                                }}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> 

                                <div className="row emailMoveUp moveUpNote-md moveUpDesc-sm">
                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_ExtendedDescription">
                                            <label className="col-sm-2 col-form-label top down" style={{ fontSize: "13px" }}>Extended Description:</label>
                                            <div className="col-sm-10 descLeft-md descLeft-sm">
                                            <Form.Control 
                                                className='formControlBox'
                                                as="textarea" 
                                                rows={6} 
                                                value={ExtendedDescription}
                                                onChange={(e) => {
                                                    setExtendedDescription(e.target.value);
                                                    handleInputChange();
                                                }}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> 

                            </div>

                        {/* ************************************* img ******************************************* */}

                            <div className="col-md-2">

                                <div className="row">

                                    <AliceCarousel 
                                        autoPlay 
                                        autoPlayInterval="3000"  
                                        animationDuration={1000}
                                        animationType="fadeout"
                                        infinite
                                        touchTracking={false}
                                        disableDotsControls
                                        >
                                        <img src={require("../../assets/images/product_images_2/thumb_image1.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image2.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image3.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image4.jpg")} className="sliderimg" alt=""/>
                                        {/* <img src={require("../../assets/images/product_images_2/thumb_image5.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image6.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image7.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image8.jpg")} className="sliderimg" alt=""/>                                    
                                        <img src={require("../../assets/images/product_images_2/thumb_image9.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image10.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image11.jpg")} className="sliderimg" alt=""/>
                                        <img src={require("../../assets/images/product_images_2/thumb_image12.jpg")} className="sliderimg" alt=""/> */}
                                        
                                    </AliceCarousel>
                                        
                                </div>

                            </div>
                            
                        </div>  

                        <section id="tab-menus">
                            <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-4">


                                {/* ************************************* Details **************************************** */}

                                <Tab eventKey="Details" title={<><i className="mdi mdi-information"></i><span className="d-none d-md-inline"> Details</span></>} class="nav-link active">
                                    

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_PartDeacStatus">
                                                        <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Part Deac Status:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                                        <div className="col-sm-8">
                                                        <Select  
                                                            isClearable={true}  
                                                            options={PartDeacStatus}
                                                            value={selected_PartDeacStatus}
                                                            onChange={value => {
                                                                setSelected_PartDeacStatus(value);
                                                                handleInputChange();
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

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_AutoSpare">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Auto Spare:</label>
                                                        <div className="col-sm-4 form-check checkBoxLeft checkBoxLeft-md checkBoxLeft-ls">
                                                        <label className="form-check-label">
                                                            <input type="checkbox" 
                                                            className="form-check-input"
                                                            checked={AutoSpare}
                                                            onChange={value => {
                                                                handleOnChangeAutoSpare(value);
                                                                handleInputChange();
                                                              }}
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div>  

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_IssueUOM">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>Issue UOM:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                                        <div className="col-sm-8">
                                                        <Select  
                                                            isClearable={true}  
                                                            options={IssueUOM}
                                                            value={selected_IssueUOM}
                                                            onChange={value => {
                                                                setSelected_IssueUOM(value);
                                                                handleInputChange();
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

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_CriticalSpare">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Critical Spare:</label>
                                                        <div className="col-sm-4 form-check checkBoxLeft checkBoxLeft-md checkBoxLeft-ls">
                                                        <label className="form-check-label">
                                                            <input type="checkbox" 
                                                            className="form-check-input"
                                                            checked={CriticalSpare}
                                                            onChange={value => {
                                                                handleOnChangeCriticalSpare(value);
                                                                handleInputChange();
                                                              }}
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div>  

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_ReceiveUOM">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>Receive UOM:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                                        <div className="col-sm-8">
                                                        <Select  
                                                            isClearable={true}  
                                                            options={ReceiveUOM}
                                                            value={selected_ReceiveUOM}
                                                            onChange={value => {
                                                                setSelected_ReceiveUOM(value);
                                                                handleInputChange();
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

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_HazardousMaterial">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Hazardous Material:</label>
                                                        <div className="col-sm-4 form-check checkBoxLeft checkBoxLeft-md checkBoxLeft-ls">
                                                        <label className="form-check-label">
                                                            <input type="checkbox" 
                                                            className="form-check-input"
                                                            checked={HazardousMaterial}
                                                            onChange={value => {
                                                                handleOnChangeHazardousMaterial(value);
                                                                handleInputChange();
                                                              }}
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div>  

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_ConversionFactor">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>Conversion Factor:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control className='formControl' type="number" placeholder='1.0000' value={ConversionFactor} onChange={(e) => {setConversionFactor(e.target.value); handleInputChange();}} readOnly/>
                                                    </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_ABCClass">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>ABC Class:</label>
                                                        <div className="col-sm-4">
                                                        <Form.Control className='formControl' type="text" value={ABCClass} onChange={(e) => {setABCClass(e.target.value); handleInputChange();}}/>
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div>  

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_StorageType">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Storage Type:</label>
                                                        <div className="col-sm-8">
                                                        <Select  
                                                            isClearable={true}  
                                                            options={StorageType}
                                                            value={selected_StorageType}
                                                            onChange={value => {
                                                                setSelected_StorageType(value);
                                                                handleInputChange();
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

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_OrderPoint">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Order Point:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control
                                                            className='formControl'
                                                            type="number"  
                                                            placeholder=".0000" 
                                                            value={OrderPoint} 
                                                            onChange={(e) => {setOrderPoint(e.target.value); handleInputChange();}}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div> 

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_Cube">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Cube:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control  
                                                            className='formControl'
                                                            type="number"  
                                                            placeholder=".0000" 
                                                            value={Cube} 
                                                            onChange={(e) => {setCube(e.target.value); handleInputChange();}}
                                                        />
                                                    </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_Maximum">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Maximum:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control  
                                                            className='formControl'
                                                            type="number"  
                                                            placeholder=".0000" 
                                                            value={Maximum} 
                                                            onChange={(e) => {setMaximum(e.target.value); handleInputChange();}}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div> 

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_ShelfLife">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Shelf Life:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control  
                                                            className='formControl'
                                                            type="number"  
                                                            value={ShelfLife} 
                                                            onChange={(e) => {setShelfLife(e.target.value); handleInputChange();}}
                                                        />
                                                    </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_LastActivityDate">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Last Activity Date:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control   
                                                            className='formControl'                                         
                                                            type="datetime-local"  
                                                            value={LastActivityDate} 
                                                            onChange={(e) => {setLastActivityDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                            /> 
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div> 

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_EOQ">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>EOQ:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control className='formControl' type="number" placeholder='0' value={EOQ} onChange={(e) => {setEOQ(e.target.value); handleInputChange();}} readOnly/>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_LastCountDate">
                                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Last Count Date:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control  
                                                            className='formControl'                                          
                                                            type="datetime-local"  
                                                            value={LastCountDate} 
                                                            onChange={(e) => {setLastCountDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                            /> 
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div> 

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_CountFrequency">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Count Frequency:</label>
                                                        <div className="col-sm-8">
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-6 moveUp-md moveUp-sm">
                                                    <Form.Group className="row" controlId="validation_NextCountDate">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>Next Count Date:</label>
                                                        <div className="col-sm-8">
                                                        <Form.Control  
                                                            className='formControl'                                          
                                                            type="datetime-local"  
                                                            value={NextCountDate} 
                                                            onChange={(e) => {setNextCountDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                            /> 
                                                        </div>
                                                    </Form.Group>
                                                </div> 
                                            </div> 

                                            <div className="row moveUp">
                                                <div className="col-md-6">
                                                    <Form.Group className="row" controlId="validation_AverageLeadTime">
                                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Average Lead Time:</label>
                                                        <div className="col-sm-8">
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </div> 

                                </Tab>


                                {/* ************************************* UDF ******************************************* */}

                                <Tab eventKey="UDF" title={<><i className="mdi mdi-calendar-text"></i><span className="d-none d-md-inline"> UDF</span></>} class="nav-link active">


                                    <div className="row">
                                        <div className='col'>
                                            <div className="col-md-13">
                                                <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>
                                                    UDF Text1:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control
                                                        className='formControl'
                                                        type="text"
                                                        value={UDFText_1}
                                                        onChange={(e) => {setUDFText_1(e.target.value); handleInputChange();}}
                                                        />
                                                </div>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-13 moveUp">
                                                <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                    UDF Text2:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control
                                                        className='formControl'
                                                        type="text"
                                                        value={UDFText_2}
                                                        onChange={(e) => {setUDFText_2(e.target.value); handleInputChange();}}
                                                        />
                                                </div>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-13 moveUp">
                                                <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                    UDF Text3:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control
                                                        className='formControl'
                                                        type="text"
                                                        value={UDFText_3}
                                                        onChange={(e) => {setUDFText_3(e.target.value); handleInputChange();}}
                                                        />
                                                </div>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-13 moveUp">
                                                <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                    UDF Text4:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control
                                                        className='formControl'
                                                        type="text"
                                                        value={UDFText_4}
                                                        onChange={(e) => {setUDFText_4(e.target.value); handleInputChange();}}
                                                        />
                                                </div>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-13 moveUp">
                                                <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                    UDF Text5:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control
                                                        className='formControl'
                                                        type="text"
                                                        value={UDFText_5}
                                                        onChange={(e) => {setUDFText_5(e.target.value); handleInputChange();}}
                                                        />
                                                </div>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="col-md-8 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-2 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Note1:
                                            </label>
                                            <div className="col-sm-10 descLeft-md descLeft-sm">
                                                <Form.Control
                                                    className='formControlBox'
                                                    as="textarea" 
                                                    rows={15} 
                                                    value={UDFNote1}
                                                    onChange={(e) => {setUDFNote1(e.target.value); handleInputChange();}}
                                                />
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp moveUpNote-md moveUpNote-sm">
                                        <div className="col-md-4">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                UDF Text6:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_6}
                                                    onChange={(e) => {setUDFText_6(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Numeric1:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control  
                                                    className='formControl'
                                                    type="number"  
                                                    placeholder=".0000" 
                                                    value={UDFNumber_1} 
                                                    onChange={(e) => {setUDFNumber_1(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Date1:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"  
                                                value={UDFDate_1} 
                                                onChange={(e) => {setUDFDate_1(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-4">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                UDF Text7:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_7}
                                                    onChange={(e) => {setUDFText_7(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Numeric2:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_2} 
                                                onChange={(e) => {setUDFNumber_2(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Date2:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"
                                                    value={UDFDate_2} 
                                                    onChange={(e) => {setUDFDate_2(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-4">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                UDF Text8:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_8}
                                                    onChange={(e) => {setUDFText_8(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Numeric3:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control
                                                className='formControl'  
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_3} 
                                                onChange={(e) => {setUDFNumber_3(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Date3:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"
                                                    value={UDFDate_3} 
                                                    onChange={(e) =>{ setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-4">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                UDF Text9:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_9}
                                                    onChange={(e) => {setUDFText_9(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Numeric4:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control 
                                                className='formControl' 
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_4} 
                                                onChange={(e) => {setUDFNumber_4(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Date4:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"
                                                    value={UDFDate_4} 
                                                    onChange={(e) => {setUDFDate_4(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-4">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                UDF Text10:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_10}
                                                    onChange={(e) => {setUDFText_10(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Numeric5:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_5} 
                                                onChange={(e) => {setUDFNumber_5(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                UDF Date5:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"
                                                    value={UDFDate_5} 
                                                    onChange={(e) => {setUDFDate_5(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Tab>


                                {/* ************************************* Financial ******************************************* */}

                                <Tab eventKey="Financial" title={<><i className="mdi mdi-currency-usd"></i><span className="d-none d-md-inline"> Financial</span></>} class="nav nav-tabs nav-item nav-link active">
                                    

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>
                                                Account Type:
                                            </label>
                                            <div className="col-sm-8">
                                                    <Select  
                                                        isClearable={true}  
                                                        value={selected_AccountType}
                                                        onChange={value => {
                                                            setSelected_AccountType(value);
                                                            handleInputChange();
                                                          }}
                                                        options={AccountType}
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
                                                Tax Code:
                                            </label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={TaxCode}
                                                    value={selected_TaxCode}
                                                    onChange={value => {
                                                        setSelected_TaxCode(value);
                                                        handleInputChange();
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

                                    <div className="row moveUp">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                YTD Usage:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={YTDUsage} onChange={(e) => {setYTDUsage(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Last Year Usage:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={LastYearUsage} onChange={(e) => {setLastYearUsage(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                YTD Turns:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={YTDTurns} onChange={(e) => {setYTDTurns(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Last Year Turns:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={LastYearTurns} onChange={(e) => {setLastYearTurns(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row moveUp">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>
                                                YTD Stockouts:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={YTDStockouts} onChange={(e) => {setYTDStockouts(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6 moveUp-md moveUp-sm">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Last Year Stockouts:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="0.0000" value={LastYearStockouts} onChange={(e) => {setLastYearStockouts(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                {/* ************************************* Radio box *************************************** */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row col-form-label">
                                                <div className="col-md-2">
                                                    <Form.Group className="row" controlId="validation_Type">
                                                    <th className="col-sm-8">Costing Rule</th>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-5">
                                                    <Form.Group className="row" controlId="validation_Type">
                                                    <th className="col-sm-4 moveUpRadioTitle-sm">Item Cost (A)</th>
                                                    <th className="col-sm-4 moveUpRadioTitle2-sm">Total On-Hand (B)</th>
                                                    <th className="col-sm-4 moveUpRadioTitle2-sm">Total Repair Location (C)</th>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-5">
                                                    <Form.Group className="row" controlId="validation_Type">
                                                    <th className="col-sm-4 moveUpRadioTitle-sm">Value A * (B-C)</th>
                                                    <th className="col-sm-4 moveUpRadioTitle2-sm">Surcharge</th>
                                                    <th className="col-sm-4 moveUpRadioTitle2-sm">Surcharge Value</th>
                                                    </Form.Group>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <hr className="mt-0"></hr>

                                    <div className="status-container">
                                        <div className="status-box">
                                            <Form.Group className="row">
                                            <fieldset className="p-3 w-100">

                                                <div className="row">
                                                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                                                        <div className="row">

                                                            <div className="col-md-2">
                                                                <Form.Group className="row" controlId="validation_Average">
                                                                    <div className="col-sm-2 form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" 
                                                                                name='Average'
                                                                                value='Average'
                                                                                checked={radio === 'Average'}
                                                                                onChange={value => {
                                                                                    handleRadioChange(value);
                                                                                    handleInputChange();
                                                                                  }}
                                                                            />
                                                                            <i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <label className="col-sm-7 col-form-label moveLeftRadioLabel-md moveLeftRadioLabel-sm" style={{ fontSize: "13px", height: "33px" }}>Average</label>
                                                                </Form.Group>
                                                            </div> 


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Average1">
                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} 
                                                                        type="number" placeholder="0.0000"
                                                                         value={Average} onChange={value => {
                                                                                    handleAverageChange(value);
                                                                                    handleInputChange();
                                                                                  }} />
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Average2">
                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio3-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Average' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                                                        <div className="row">

                                                            <div className="col-md-2">
                                                                <Form.Group className="row" controlId="validation_Standard">
                                                                    <div className="col-sm-2 form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" 
                                                                                name='Standard'
                                                                                value='Standard'
                                                                                checked={radio === 'Standard'}
                                                                                onChange={value => {
                                                                                    handleRadioChange(value);
                                                                                    handleInputChange();
                                                                                  }}
                                                                            />
                                                                            <i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <label className="col-sm-7 col-form-label moveLeftRadioLabel-md moveLeftRadioLabel-sm" style={{ fontSize: "13px", height: "33px" }}>Standard</label>
                                                                </Form.Group>
                                                            </div> 


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Standard1">
                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" placeholder="0.0000" 
                                                                        value={Standard} onChange={value => {
                                                                            handleStandardChange(value);
                                                                            handleInputChange();
                                                                          }} />
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Standard2">
                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio3-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Standard' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                                                        <div className="row">

                                                            <div className="col-md-2">
                                                                <Form.Group className="row" controlId="validation_Last">
                                                                    <div className="col-sm-2 form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" 
                                                                                name='Last'
                                                                                value='Last'
                                                                                checked={radio === 'Last'}
                                                                                onChange={value => {
                                                                                    handleRadioChange(value);
                                                                                    handleInputChange();
                                                                                  }}
                                                                            />
                                                                            <i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <label className="col-sm-7 col-form-label moveLeftRadioLabel-md moveLeftRadioLabel-sm" style={{ fontSize: "13px", height: "33px" }}>Last</label>
                                                                </Form.Group>
                                                            </div> 


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Last1">
                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" placeholder="0.0000" 
                                                                        value={Last} onChange={value => {
                                                                            handleLastChange(value);
                                                                            handleInputChange();
                                                                          }} />
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_Last2">
                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio3-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'Last' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="row">
                                                    <div className="col-md-12" style={{ marginTop: "-20px" }}>
                                                        <div className="row">

                                                            <div className="col-md-2">
                                                                <Form.Group className="row" controlId="validation_FIFO">
                                                                    <div className="col-sm-2 form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" 
                                                                                name='FIFO'
                                                                                value='FIFO'
                                                                                checked={radio === 'FIFO'}
                                                                                onChange={value => {
                                                                                    handleRadioChange(value);
                                                                                    handleInputChange();
                                                                                  }}
                                                                            />
                                                                            <i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <label className="col-sm-7 col-form-label moveLeftRadioLabel-md moveLeftRadioLabel-sm" style={{ fontSize: "13px", height: "33px" }}>FIFO</label>
                                                                </Form.Group>
                                                            </div> 


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_FIFO1">
                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio-md moveUpRadio2-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.0000' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>


                                                            <div className="col-md-5">
                                                                <Form.Group className="row" controlId="validation_FIFO2">
                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio3-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0' readOnly/>
                                                                    </div>
                                                                    )}

                                                                    {radio === 'FIFO' && (
                                                                    <div className="col-sm-4 moveUpRadio2-md moveUpRadio4-sm">
                                                                        <Form.Control style={{ fontSize: "13px", height: "33px" }} type="number" value='0.00' readOnly/>
                                                                    </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </fieldset>
                                            </Form.Group>

                                        </div>
                                    </div>

                                </Tab>


                                {/* ************************************* Location ************************************ */}

                                <Tab eventKey="Location" title={<><i className="mdi mdi-map-marker-radius"></i><span className="d-none d-md-inline"> Location</span></>} class="nav-link active">
                                    
                                    <InventoryLocation name={'InventoryFrom'}  data={{RowID: location.state.RowID }}/>

                                </Tab>


                                {/* ************************************* Supplier ************************************ */}

                                <Tab eventKey="Supplier" title={<><i className="mdi mdi-truck-fast"></i><span className="d-none d-md-inline"> Supplier</span></>} class="nav-link active">

                                    <InventorySupplier name={'InventoryFrom'}  data={{RowID: location.state.RowID }}/>

                                </Tab>


                                {/* ************************************* Reference ************************************ */}

                                <Tab eventKey="Reference" title={<><i className="mdi mdi-folder-upload"></i><span className="d-none d-md-inline"> Reference</span></>} class="nav-link active">
                                    
                                    <Form.Group>
                                        <label>File upload</label>
                                        <div className="custom-file">
                                            <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                                            <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                        </div>
                                    </Form.Group> 

                                </Tab>


                            </Tabs>
                        </section>
                    </form>


                            {/* ************************************* button ***************************************** */}

                        <div className="page-header">
                        <h3 className="page-title"></h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                            <div className="template-demo">
                                <button
                                type="button"
                                className="btn btn-success btn-icon-text"
                                onClick={onClickChange}
                                >
                                <i className="mdi mdi-file-check btn-icon-prepend"></i>{" "}
                                {Button_save}
                                </button>

                                <button
                                type="button"
                                className="btn btn-danger btn-icon-text"
                                onClick={onClickCancel}
                                >
                                <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i>{" "}
                                Cancel
                                </button>
                            </div>
                            </ol>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryFrom;
