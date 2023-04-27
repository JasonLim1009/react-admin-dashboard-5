import React,{useState,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import APIServices from "../services/APIServices";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import  {useLocation}  from 'react-router-dom';
import Moment from 'moment';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import { Card, Collapse } from 'react-bootstrap';


import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import '../style.css';
import AssetPmSetup from "../tables/AssetPmSetup";
import AssetWOHistory from "../tables/AssetWOHistory";
import AssetRelocationHistory from "../tables/AssetRelocationHistory";
import AssetCheckList from "../tables/AssetCheckList";

import AssetSpares from "../tables/AssetSpares";
import AssetUsage from "../tables/AssetUsage";
import AssetSpecification from "../tables/AssetSpecification";
import styled from 'styled-components';

import { format } from "date-fns";

import logoPmSetup from '../../assets/images/work-time.png';
import logoWOHistory from '../../assets/images/browser-tab.png';
import logoRelocationHistory from '../../assets/images/relocation.png';
import logoCheckList from '../../assets/images/moving.png';
import { List } from 'rsuite';


const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #4694d1;
    height: 90%;
    width: 2px;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
  }
  :after {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: ${({ width }) => width};
    width: 2px;
    top: 45%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 14px;
  }
`


const AssetFrom = (props) => {

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

    const [steps, setsteps] = useState([]);
    const [StatusShow, setStatusShow] = useState(false);
    const StatushandleClose = () => setStatusShow(false);
    const StatushandleShow = () => setStatusShow(true);

    const [PMSetupShow, setPMSetupShow] = useState(false);
    const PMSetuphandleClose = () => setPMSetupShow(false);
    const PMSetuphandleShow = () => setPMSetupShow(true);

    const [WOHistoryShow, setWOHistoryShow] = useState(false);
    const WOHistoryhandleClose = () => setWOHistoryShow(false);
    const WOHistoryhandleShow = () => setWOHistoryShow(true);

    const [RelocationHistoryShow, setRelocationHistoryShow] = useState(false);
    const RelocationHistoryhandleClose = () => setRelocationHistoryShow(false);
    const RelocationHistoryhandleShow = () => setRelocationHistoryShow(true);

    const [CheckListShow, setCheckListShow] = useState(false);
    const CheckListhandleClose = () => setCheckListShow(false);
    const CheckListhandleShow = () => setCheckListShow(true);

    const [AssetNo, setAssetNo] = useState("");
    const [AssetNo_disabled, setAssetNo_disabled] = useState(false);
   
    const [AssetStatus, setAssetStatus] = useState([]);
    const [selected_AssetStatus, setSelected_AssetStatus] = useState([]);

    const [ShortDesc, setShortDesc] = useState("");

    const [selected_CriticalFactor, setSelected_CriticalFactor] = useState([]);
    const [CriticalFactor, setCriticalFactor] = useState([]);

    const [LongDesc, setLongDesc] = useState("");

    const [PermanentID, setPermanentID] = useState("");

    const [selected_AssetType, setSelected_AssetType] = useState([]);
    const [AssetType, setAssetType] = useState([]);   

    const [selected_WorkArea, setSelected_WorkArea] = useState([]);
    const [WorkArea, setWorkArea] = useState([]);
    
    const [selected_Assetcode, setSelected_Assetcode] = useState([]);
    const [Assetcode, setAssetcode] = useState([]);

    const [selected_AssetLocation, setSelected_AssetLocation] = useState([]);
    const [AssetLocation, setAssetLocation] = useState([]);

    const [selected_AssetGroupCode, setselected_AssetGroupCode] = useState();
    const [AssetGroupCode, setAssetGroupCode] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = React.useState([]); 

    const [selected_AssetLevel, setSelected_AssetLevel] = useState([]);
    const [AssetLevel, setAssetLevel] = useState([]);

    const [selected_CostCenter, setSelected_CostCenter] = useState([]);
    const [CostCenter, setCostCenter] = useState([]);

    const [selected_WorkGroup, setSelected_WorkGroup] = useState([]);
    const [WorkGroup, setWorkGroup] = useState([]);

    const [ParentFlag, setParentFlag] = useState(false)    
    const [selected_ParentFlag, setselected_ParentFlag] = useState('') 
    const [columns,setcolumns]=useState([]);
    const [data,setdata]=useState([]);

    const [PerentID, setPerentID] = useState("");
    const [SafetyRequirement, setSafetyRequirement] = useState("");
    const [BarCode_Print_count, setBarCode_Print_count] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const [Asset_Model, setAsset_Model] = useState("");


    const [AssetCost, setAssetCost] = useState("");
    const [PurchaseDate, setPurchaseDate] = useState("");
    const [ResidualValue, setResidualValue] = useState("");
    const [WarrantyDate, setWarrantyDate] = useState("");
    const [ExpectedLifeDate, setExpectedLifeDate] = useState("");

    const [selected_CustomerCode, setSelected_CustomerCode] = useState([]);
    const [CustomerCode, setCustomerCode] = useState([]);

    const [selected_DepreciationMethod, setSelected_DepreciationMethod] = useState([]);
    const [DepreciationMethod, setDepreciationMethod] = useState([{label:"Straight-Line",value:""},{label:"Declining-Balance",value:""},{label:"Double-Declining",value:""}]);

    const [DepreciationDate, setDepreciationDate] = useState("");
    const [UpdateBy, setUpdateBy] = useState("");
    const [Acc_Depreciation, setAcc_Depreciation] = useState("");
    const [NetbookValue, setNetbookValue] = useState("");
    const [DisposalDate, setDisposalDate] = useState("");
    const [DisposalBy, setDisposalBy] = useState("");
    const [DisposalType, setDisposalType] = useState("");
    const [DisposalValue, setDisposalValue] = useState("");

    const [LabourCost, setLabourCost] = useState("");
    const [MaterialCost, setMaterialCost] = useState("");
    const [ContractCost, setContractCost] = useState("");
    const [Total, setTotal] = useState("");

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

    const [UDFText_11, setUDFText_11] = useState("");
    const [UDFText_12, setUDFText_12] = useState("");
    const [UDFText_13, setUDFText_13] = useState("");
    const [UDFText_14, setUDFText_14] = useState("");
    const [UDFText_15, setUDFText_15] = useState("");
    const [UDFText_16, setUDFText_16] = useState("");
    const [UDFText_17, setUDFText_17] = useState("");
    const [UDFText_18, setUDFText_18] = useState("");
    const [UDFText_19, setUDFText_19] = useState("");
    const [UDFText_20, setUDFText_20] = useState("");

    const [UDFText_21, setUDFText_21] = useState("");
    const [UDFText_22, setUDFText_22] = useState("");
    const [UDFText_23, setUDFText_23] = useState("");
    const [UDFText_24, setUDFText_24] = useState("");
    const [UDFText_25, setUDFText_25] = useState("");
    const [UDFText_26, setUDFText_26] = useState("");
    const [UDFText_27, setUDFText_27] = useState("");
    const [UDFText_28, setUDFText_28] = useState("");
    const [UDFText_29, setUDFText_29] = useState("");
    const [UDFText_30, setUDFText_30] = useState("");   

    const [UDFNumber_1, setUDFNumber_1] = useState("0");
    const [UDFNumber_2, setUDFNumber_2] = useState("0");
    const [UDFNumber_3, setUDFNumber_3] = useState("0");
    const [UDFNumber_4, setUDFNumber_4] = useState("0");
    const [UDFNumber_5, setUDFNumber_5] = useState("0");
    const [UDFNumber_6, setUDFNumber_6] = useState("0");
    const [UDFNumber_7, setUDFNumber_7] = useState("0");
    const [UDFNumber_8, setUDFNumber_8] = useState("0");
    const [UDFNumber_9, setUDFNumber_9] = useState("0");
    const [UDFNumber_10, setUDFNumber_10] = useState("0");

    const [UDFNumber_11, setUDFNumber_11] = useState("0");
    const [UDFNumber_12, setUDFNumber_12] = useState("0");
    const [UDFNumber_13, setUDFNumber_13] = useState("0");
    const [UDFNumber_14, setUDFNumber_14] = useState("0");
    const [UDFNumber_15, setUDFNumber_15] = useState("0");
    const [UDFNumber_16, setUDFNumber_16] = useState("0");
    const [UDFNumber_17, setUDFNumber_17] = useState("0");
    const [UDFNumber_18, setUDFNumber_18] = useState("0");
    const [UDFNumber_19, setUDFNumber_19] = useState("0");
    const [UDFNumber_20, setUDFNumber_20] = useState("0");

    const [UDFNumber_21, setUDFNumber_21] = useState("0");
    const [UDFNumber_22, setUDFNumber_22] = useState("0");
    const [UDFNumber_23, setUDFNumber_23] = useState("0");
    const [UDFNumber_24, setUDFNumber_24] = useState("0");
    const [UDFNumber_25, setUDFNumber_25] = useState("0");
    const [UDFNumber_26, setUDFNumber_26] = useState("0");
    const [UDFNumber_27, setUDFNumber_27] = useState("0");
    const [UDFNumber_28, setUDFNumber_28] = useState("0");
    const [UDFNumber_29, setUDFNumber_29] = useState("0");
    const [UDFNumber_30, setUDFNumber_30] = useState("0");   

    const [UDFDate_1, setUDFDate_1] = useState(new Date());
    const [UDFDate_2, setUDFDate_2] = useState(new Date());
    const [UDFDate_3, setUDFDate_3] = useState(new Date());
    const [UDFDate_4, setUDFDate_4] = useState(new Date());
    const [UDFDate_5, setUDFDate_5] = useState(new Date());
    const [UDFDate_6, setUDFDate_6] = useState(new Date());
    const [UDFDate_7, setUDFDate_7] = useState(new Date());
    const [UDFDate_8, setUDFDate_8] = useState(new Date());
    const [UDFDate_9, setUDFDate_9] = useState(new Date());
    const [UDFDate_10, setUDFDate_10] = useState(new Date());

    const [UDFDate_11, setUDFDate_11] = useState(new Date());
    const [UDFDate_12, setUDFDate_12] = useState(new Date());
    const [UDFDate_13, setUDFDate_13] = useState(new Date());
    const [UDFDate_14, setUDFDate_14] = useState(new Date());
    const [UDFDate_15, setUDFDate_15] = useState(new Date());
    const [UDFDate_16, setUDFDate_16] = useState(new Date());
    const [UDFDate_17, setUDFDate_17] = useState(new Date());
    const [UDFDate_18, setUDFDate_18] = useState(new Date());
    const [UDFDate_19, setUDFDate_19] = useState(new Date());
    const [UDFDate_20, setUDFDate_20] = useState(new Date());

    const [UDFDate_21, setUDFDate_21] = useState(new Date());
    const [UDFDate_22, setUDFDate_22] = useState(new Date());
    const [UDFDate_23, setUDFDate_23] = useState(new Date());
    const [UDFDate_24, setUDFDate_24] = useState(new Date());
    const [UDFDate_25, setUDFDate_25] = useState(new Date());
    const [UDFDate_26, setUDFDate_26] = useState(new Date());
    const [UDFDate_27, setUDFDate_27] = useState(new Date());
    const [UDFDate_28, setUDFDate_28] = useState(new Date());
    const [UDFDate_29, setUDFDate_29] = useState(new Date());
    const [UDFDate_30, setUDFDate_30] = useState(new Date());

    const [show, setShow] = useState(false);

    const [ParentFlag_show, setParentFlag_Show] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ParentFlag_handleClose = () => setParentFlag_Show(false);
    const  ParentFlag_handleShow = () => setParentFlag_Show(true);

    const [AutoNumring, setAutoNumring] = useState("");


    // Pm Setup
    const [HeaderPmSetup, setHeaderPmSetup] = React.useState([]);
    const [ResultPmSetup, setResultPmSetup] = React.useState([]);
  
    const [showPmSetup, setShowPmSetup] = useState(false);
    const handleClosePmSetup = () => {setShowPmSetup(false); resetData(); };
    const handleShowPmSetup = () => setShowPmSetup(true);
  
    const [showModalPmSetup, setShowModalPmSetup] = useState(false);
    const handleCloseModalPmSetup = () => setShowModalPmSetup(false);
    const handleShowModalPmSetup = () => setShowModalPmSetup(true);
  
    const [PMNo, setPMNo] = useState("");
  
    const [CurrentWorkOrder, setCurrentWorkOrder] = useState("");
  
    const [FrequencyCode, setFrequencyCode] = useState("");
  
    const [DescriptionPmSetup, setDescriptionPmSetup] = useState("");
  
    const [MeterID, setMeterID] = useState("");
  
    const [LPMUsage, setLPMUsage] = useState("");
  
    const [LPMUOM, setLPMUOM] = useState("");
  
    const [NextCreateDate, setNextCreateDate] = useState(new Date());


    // WO History
    const [HeaderWOHistory, setHeaderWOHistory] = React.useState([]);
    const [ResultWOHistory, setResultWOHistory] = React.useState([]);

    const [showWOHistory, setShowWOHistory] = useState(false);
    const handleCloseWOHistory = () => {setShowWOHistory(false); resetData(); };
    const handleShowWOHistory = () => setShowWOHistory(true);

    const [showModalWOHistory, setShowModalWOHistory] = useState(false);
    const handleCloseModalWOHistory = () => setShowModalWOHistory(false);
    const handleShowModalWOHistory = () => setShowModalWOHistory(true);

    const [WorkOrderNo, setWorkOrderNo] = useState("");

    const [OriginationDate, setOriginationDate] = useState(new Date());

    const [StatusWOHistory, setStatusWOHistory] = useState("");

    const [Originator, setOriginator] = useState("");

    const [Phone, setPhone] = useState("");

    const [DescriptionWOHistory, setDescriptionWOHistory] = useState("");


    // Relocation History
    const [HeaderRelocationHistory, setHeaderRelocationHistory] = React.useState([]);
    const [ResultRelocationHistory, setResultRelocationHistory] = React.useState([]);
  
    const [showRelocationHistory, setShowRelocationHistory] = useState(false);
    const handleCloseRelocationHistory = () => {setShowRelocationHistory(false); resetData(); };
    const handleShowRelocationHistory = () => setShowRelocationHistory(true);
  
    const [showModalRelocationHistory, setShowModalRelocationHistory] = useState(false);
    const handleCloseModalRelocationHistory = () => setShowModalRelocationHistory(false);
    const handleShowModalRelocationHistory = () => setShowModalRelocationHistory(true);
  
    const [OldLocation, setOldLocation] = useState("");
  
    const [OldLocDesc, setOldLocDesc] = useState("");
  
    const [StatusRelocationHistory, setStatusRelocationHistory] = useState("");
  
    const [NewLocation, setNewLocation] = useState("");
  
    const [NewLocDesc, setNewLocDesc] = useState("");
  
    const [Reason, setReason] = useState("");
  
    const [AuditUser, setAuditUser] = useState("");
  
    const [AuditDate, setAuditDate] = useState(new Date());


    // Check List Here
    const [HeaderCheckList, setHeaderCheckList] = React.useState([]);
    const [ResultCheckList, setResultCheckList] = React.useState([]);
  
    const [showCheckList, setShowCheckList] = useState(false);
    const handleCloseCheckList = () => {setShowCheckList(false); resetData(); };
    const handleShowCheckList = () => setShowCheckList(true);
  
    const [showModalCheckList, setShowModalCheckList] = useState(false);
    const handleCloseModalCheckList = () => setShowModalCheckList(false);
    const handleShowModalCheckList = () => setShowModalCheckList(true);
  
    const [CheckListCode, setCheckListCode] = useState("");
  
    const [CheckListDescription, setCheckListDescription] = useState("");
  
    const [CarryToWorkOrder, setCarryToWorkOrder] = useState(false)    
    const [selected_CarryToWorkOrder, setselected_CarryToWorkOrder] = useState('0') 
    const [CheckBox_CarryToWorkOrder, setCheckBox_CarryToWorkOrder] = useState('')  
  



    const get_asset_Status =(site_ID,type,selected_asset)=>{


        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {

               setParentFlag(responseJson.data.data.AssetType);     
               
               for (var index in responseJson.data.data.Auto_Numnering) {  

                    if(responseJson.data.data.Auto_Numnering[index].cnt_mst_numbering == "M" && responseJson.data.data.Auto_Numnering[index].cnt_mst_option == "M"){

                    // console.log('MM')
                        setAssetNo_disabled(false)
                    
                        setAutoNumring('MM')
                    }else if(responseJson.data.data.Auto_Numnering[index].cnt_mst_numbering == "M" && responseJson.data.data.Auto_Numnering[index].cnt_mst_option == "G"){
                        //console.log('MG')
                        setAssetNo_disabled(false)
                    
                        setAutoNumring('MG')
                    }else if(responseJson.data.data.Auto_Numnering[index].cnt_mst_numbering == "A" && responseJson.data.data.Auto_Numnering[index].cnt_mst_option == "M"){
                    // console.log('AM')
                        setAssetNo_disabled(true)
                    
                        setAutoNumring('AM')
                    }else if(responseJson.data.data.Auto_Numnering[index].cnt_mst_numbering == "A" && responseJson.data.data.Auto_Numnering[index].cnt_mst_option == "G"){
                        //console.log('AG')
                        setAssetNo_disabled(true)
                        setAutoNumring('AG')
                    }               
                }


                let AssetStatus =responseJson.data.data.AssetStatus.map(item => ({
                    label: item.ast_sts_status +" : "+ item.ast_sts_desc,
                    value: item.ast_sts_desc            
                    }));
                    setAssetStatus(AssetStatus);

                let CriticalFactor =responseJson.data.data.CriticalFactor.map(item => ({
                    label: item.ast_cri_cri_factor +" : "+ item.ast_cri_desc,
                    value: item.ast_cri_desc            
                    }));
                    setCriticalFactor(CriticalFactor);

                let AssetGroupCode =responseJson.data.data.AssetGroupCode.map(item => ({
                    label: item.ast_grp_grp_cd,
                    value: item.ast_grp_desc            
                    }));
                    setAssetGroupCode(AssetGroupCode);
                    setFilteredDataSource(AssetGroupCode)

                let AssetType =responseJson.data.data.AssetType.map(item => ({
                    label: item.ast_type_cd +" : "+ item.ast_type_descs,
                    value: item.ast_type_descs            
                    }));
                    setAssetType(AssetType);


                let Assetcode =responseJson.data.data.Assetcode.map(item => ({
                    label: item.ast_cod_ast_cd +" : "+ item.ast_cod_desc ,
                    value: item.ast_cod_desc            
                    }));
                    setAssetcode(Assetcode);


                let WorkArea =responseJson.data.data.WorkArea.map(item => ({
                    label: item.mst_war_work_area +" : "+ item.mst_war_desc ,
                    value: item.mst_war_desc            
                    }));
                    setWorkArea(WorkArea);


                let AssetLocation =responseJson.data.data.AssetLocation.map(item => ({
                    label: item.ast_loc_ast_loc +" : "+ item.ast_loc_desc ,
                    value: item.ast_loc_desc            
                    }));
                    setAssetLocation(AssetLocation);

                let AssetLevel =responseJson.data.data.AssetLevel.map(item => ({
                    label: item.ast_lvl_ast_lvl +" : "+ item.ast_lvl_desc ,
                    value: item.ast_lvl_desc            
                    }));                   
                    setAssetLevel(AssetLevel);


                let CostCenter =responseJson.data.data.CostCenter.map(item => ({
                    label: item.costcenter +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setCostCenter(CostCenter);


                let wrk_group =responseJson.data.data.wrk_group.map(item => ({
                    label: item.wrk_grp_grp_cd +" : "+ item.wrk_grp_desc ,
                    value: item.wrk_grp_desc            
                    }));                   
                    setWorkGroup(wrk_group);


                let CustomerCode =responseJson.data.data.Customer_code.map(item => ({
                    label: item.cus_mst_customer_cd +" : "+ item.cus_mst_desc ,
                    value: item.cus_mst_desc            
                    }));                   
                    setCustomerCode(CustomerCode);            
               

                get_dropdown_ParentFlag(site_ID,selected_asset);                  
              
                   
                
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
            setParentFlag(e);
            Swal.fire({
              icon: 'error',
              title: 'Oops get_sitecode...',
              text: e,          
            })
          });
    }


    const get_dropdown_ParentFlag = (site_ID,selected_asset)=>{  


        console.log('PARENT FLAG: '+ site_ID + " "+ selected_asset)
        
        APIServices.get_dropdown_ParentFlag(site_ID,selected_asset).then((responseJson)=>{


           console.log(responseJson.data.status);

            if (responseJson.data.status === 'SUCCESS') {  

                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

                if(selected_asset == 'New_Asset'){ 

                    Swal.close();

                    setButton_save("Save")

                }else{

                    setButton_save("Update")
                    get_assetmaster_select(site_ID,selected_asset);
                }


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

            if (responseJson.data.status === 'SUCCESS') {             
               
               for (var index in responseJson.data.data) {
               

                setRowID(responseJson.data.data[index].RowID)

               // console.log( responseJson.data.data[index].ast_det_warranty_date.date )

                setAssetNo(responseJson.data.data[index].ast_mst_asset_no )
                setSelected_AssetStatus({label:responseJson.data.data[index].ast_mst_asset_status } )
                setShortDesc( responseJson.data.data[index].ast_mst_asset_shortdesc)
                setSelected_CriticalFactor( {label:responseJson.data.data[index].ast_mst_cri_factor +" : "+ responseJson.data.data[index].ast_cri_desc} )
                setLongDesc( responseJson.data.data[index].ast_mst_asset_longdesc)
                setPermanentID( responseJson.data.data[index].ast_mst_perm_id)


                setSelected_AssetType( {label:responseJson.data.data[index].ast_mst_asset_type +" : "+ responseJson.data.data[index].ast_type_descs} )
                setSelected_WorkArea( {label:responseJson.data.data[index].ast_mst_work_area +" : "+ responseJson.data.data[index].mst_war_desc} )
                setSelected_Assetcode( {label:responseJson.data.data[index].ast_mst_asset_code +" : "+ responseJson.data.data[index].ast_cod_desc} )
                setSelected_AssetLocation( {label:responseJson.data.data[index].ast_mst_asset_locn +" : "+ responseJson.data.data[index].ast_loc_desc})
                setselected_AssetGroupCode( responseJson.data.data[index].ast_mst_asset_grpcode+" : "+ responseJson.data.data[index]. ast_grp_desc )
                setSelected_AssetLevel({ label:responseJson.data.data[index].ast_mst_ast_lvl +" : "+ responseJson.data.data[index].ast_lvl_desc})
                setSelected_CostCenter( {label:responseJson.data.data[index].ast_mst_cost_center +" : "+ responseJson.data.data[index].descs})
                setSelected_WorkGroup( {label:responseJson.data.data[index].ast_mst_wrk_grp+" : "+ responseJson.data.data[index].wrk_grp_desc })
                setParentFlag( responseJson.data.data[index].ast_mst_parent_flag )
                setPerentID( responseJson.data.data[index].ast_mst_parent_id )
                setSafetyRequirement( responseJson.data.data[index].ast_mst_safety_rqmts )
                setBarCode_Print_count( responseJson.data.data[index].ast_mst_print_count )
                setManufacturer( responseJson.data.data[index].ast_det_mfg_cd )
                setAsset_Model( responseJson.data.data[index].ast_det_modelno )

                setAssetCost( responseJson.data.data[index].ast_mst_asset_code )
                //setPurchaseDate( responseJson.data.data[index].ast_det_purchase_date.date )
                setResidualValue( responseJson.data.data[index].ast_det_repl_cost )
                
                //setWarrantyDate(responseJson.data.data[index].ast_det_warranty_date.date)
                //setExpectedLifeDate( responseJson.data.data[index].ast_det_depr_term )
                setSelected_CustomerCode( {label:responseJson.data.data[index].ast_det_cus_code +" : "+ responseJson.data.data[index].cus_mst_desc} )
                setSelected_DepreciationMethod( {label:responseJson.data.data[index].ast_det_depr_method} )

                //setDepreciationDate( responseJson.data.data[index].ast_det_depr_date )
                setUpdateBy( responseJson.data.data[index].ast_det_depr_by )
                setAcc_Depreciation( responseJson.data.data[index].ast_det_acc_depr_cost )
                setNetbookValue( responseJson.data.data[index].ast_det_net_book_value )
                //setDisposalDate( responseJson.data.data[index].ast_det_dispose_date )
                setDisposalBy( responseJson.data.data[index].ast_det_dispose_by )
                setDisposalType( responseJson.data.data[index].ast_det_dispose_type )
                setDisposalValue( responseJson.data.data[index].ast_det_dispose_value )
               

                setUDFText_1( responseJson.data.data[index].ast_det_varchar1 )
                setUDFText_2( responseJson.data.data[index].ast_det_varchar2 )
                setUDFText_3( responseJson.data.data[index].ast_det_varchar3 )
                setUDFText_4( responseJson.data.data[index].ast_det_varchar4 )
                setUDFText_5( responseJson.data.data[index].ast_det_varchar5 )
                setUDFText_6( responseJson.data.data[index].ast_det_varchar6 )
                setUDFText_7( responseJson.data.data[index].ast_det_varchar7 )
                setUDFText_8( responseJson.data.data[index].ast_det_varchar8 )
                setUDFText_9( responseJson.data.data[index].ast_det_varchar9 )
                setUDFText_10( responseJson.data.data[index].ast_det_varchar10 )


                setUDFText_11( responseJson.data.data[index].ast_det_varchar11 )
                setUDFText_12( responseJson.data.data[index].ast_det_varchar12 )
                setUDFText_13( responseJson.data.data[index].ast_det_varchar13 )
                setUDFText_14( responseJson.data.data[index].ast_det_varchar14 )
                setUDFText_15( responseJson.data.data[index].ast_det_varchar15 )
                setUDFText_16( responseJson.data.data[index].ast_det_varchar16 )
                setUDFText_17( responseJson.data.data[index].ast_det_varchar17 )
                setUDFText_18( responseJson.data.data[index].ast_det_varchar18 )
                setUDFText_19( responseJson.data.data[index].ast_det_varchar19 )
                setUDFText_20( responseJson.data.data[index].ast_det_varchar20 )
     
                setUDFText_21( responseJson.data.data[index].ast_det_varchar21 )
                setUDFText_22( responseJson.data.data[index].ast_det_varchar22 )
                setUDFText_23( responseJson.data.data[index].ast_det_varchar23 )
                setUDFText_24( responseJson.data.data[index].ast_det_varchar24 )
                setUDFText_25( responseJson.data.data[index].ast_det_varchar25 )
                setUDFText_26( responseJson.data.data[index].ast_det_varchar26 )
                setUDFText_27( responseJson.data.data[index].ast_det_varchar27 )
                setUDFText_28( responseJson.data.data[index].ast_det_varchar28 )
                setUDFText_29( responseJson.data.data[index].ast_det_varchar29 )
                setUDFText_30( responseJson.data.data[index].ast_det_varchar30 )


                setUDFNumber_1( responseJson.data.data[index].ast_det_numeric1 )
                setUDFNumber_2( responseJson.data.data[index].ast_det_numeric2 )
                setUDFNumber_3( responseJson.data.data[index].ast_det_numeric3 )
                setUDFNumber_4( responseJson.data.data[index].ast_det_numeric4 )
                setUDFNumber_5( responseJson.data.data[index].ast_det_numeric5 )
                setUDFNumber_6( responseJson.data.data[index].ast_det_numeric6 )
                setUDFNumber_7( responseJson.data.data[index].ast_det_numeric7 )
                setUDFNumber_8( responseJson.data.data[index].ast_det_numeric8 )
                setUDFNumber_9( responseJson.data.data[index].ast_det_numeric9 )
                setUDFNumber_10( responseJson.data.data[index].ast_det_numeric10 )
                

                setUDFNumber_11( responseJson.data.data[index].ast_det_numeric11 )
                setUDFNumber_12( responseJson.data.data[index].ast_det_numeric12 )
                setUDFNumber_13( responseJson.data.data[index].ast_det_numeric13 )
                setUDFNumber_14( responseJson.data.data[index].ast_det_numeric14 )
                setUDFNumber_15( responseJson.data.data[index].ast_det_numeric15 )
                setUDFNumber_16( responseJson.data.data[index].ast_det_numeric16 )
                setUDFNumber_17( responseJson.data.data[index].ast_det_numeric17 )
                setUDFNumber_18( responseJson.data.data[index].ast_det_numeric18 )
                setUDFNumber_19( responseJson.data.data[index].ast_det_numeric19 )
                setUDFNumber_20( responseJson.data.data[index].ast_det_numeric20 )

                setUDFNumber_21( responseJson.data.data[index].ast_det_numeric21 )
                setUDFNumber_22( responseJson.data.data[index].ast_det_numeric22 )
                setUDFNumber_23( responseJson.data.data[index].ast_det_numeric23 )
                setUDFNumber_24( responseJson.data.data[index].ast_det_numeric24 )
                setUDFNumber_25( responseJson.data.data[index].ast_det_numeric25 )
                setUDFNumber_26( responseJson.data.data[index].ast_det_numeric26 )
                setUDFNumber_27( responseJson.data.data[index].ast_det_numeric27 )
                setUDFNumber_28( responseJson.data.data[index].ast_det_numeric28 )
                setUDFNumber_29( responseJson.data.data[index].ast_det_numeric29 )
                setUDFNumber_30( responseJson.data.data[index].ast_det_numeric30 )

                if(responseJson.data.data[index].ast_det_datetime1 == null){
                    setUDFDate_1('')
                }else{

                    setUDFDate_1( Moment(responseJson.data.data[index].ast_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].ast_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
                }


                setPMNo( responseJson.data.data[index].prm_mst_pm_no )
                setCurrentWorkOrder( responseJson.data.data[index].prm_mst_curr_wo )
                setFrequencyCode( responseJson.data.data[index].prm_mst_freq_code )
                setDescriptionPmSetup( responseJson.data.data[index].prm_mst_desc )
                setMeterID( responseJson.data.data[index].prm_mst_meter_id )
                setLPMUsage( responseJson.data.data[index].prm_mst_lpm_usg )
                setLPMUOM( responseJson.data.data[index].prm_mst_lpm_uom )
               
                if(responseJson.data.data[index].prm_mst_next_create == null){
                    setNextCreateDate('')
                }else{

                    setNextCreateDate( Moment(responseJson.data.data[index].prm_mst_next_create.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT NC Date : '+ Moment(responseJson.data.data[index].prm_mst_next_create.date).format('YYYY-MM-DDTHH:mm:ss'))
                }


                setWorkOrderNo( responseJson.data.data[index].wko_mst_wo_no )

                if(responseJson.data.data[index].wko_mst_org_date == null){
                    setOriginationDate('')
                }else{

                    setOriginationDate( Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT O Date : '+ Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }
                
                setStatusWOHistory( responseJson.data.data[index].wko_mst_status )
                setOriginator( responseJson.data.data[index].wko_mst_originator )
                setPhone( responseJson.data.data[index].wko_mst_phone )
                setDescriptionWOHistory( responseJson.data.data[index].wko_mst_descs )


                setNewLocation( responseJson.data.data[index].ast_loc_s_asset_olocn )
                setNewLocDesc( responseJson.data.data[index].ast_loc_s_asset_nlocn )
                setReason( responseJson.data.data[index].ast_loc_s_asset_reason )
                setAuditUser( responseJson.data.data[index].audit_user )

                if(responseJson.data.data[index].audit_date == null){
                    setAuditDate('')
                }else{

                    setAuditDate( Moment(responseJson.data.data[index].audit_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT O Date : '+ Moment(responseJson.data.data[index].audit_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }


                setCheckListCode( responseJson.data.data[index].ast_job_job_cd )
                setCheckListDescription( responseJson.data.data[index].job_mst_desc )
                setCarryToWorkOrder( responseJson.data.data[index].ast_job_carry )

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
            setParentFlag(e);
            Swal.fire({
              icon: 'error',
              title: 'Oops get_assetmaster_select...',
              text: e,          
            })
          });

    }

    
    useEffect(() => {

        console.log('EDIT ASSEST NO :' + location.state.ast_mst_asset_no)

        let site_ID = localStorage.getItem("site_ID");
    
        setParentFlag("Select" +":"+ location.state.select)        
        get_asset_Status(site_ID,"All",location.state.select);       
       
        getsteps(site_ID, location.state.RowID, location.state.ast_mst_asset_no);
        console.log('getsteps here: ', getsteps(site_ID, location.state.RowID, location.state.ast_mst_asset_no));


        get_assetpmsetup(site_ID, location.state.RowID);

        get_assetwohistory(site_ID, location.state.RowID);

        get_assetrelocationhistory(site_ID, location.state.RowID);

        get_assetchecklist(site_ID, location.state.RowID);

      },[location]);

      const [name, setName] = useState("");

      const filter = (e) => {

        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = AssetGroupCode.filter((user) => {

            const itemData = `${user.label.toUpperCase()}, ,${user.value.toUpperCase()})`
            const textData = keyword.toUpperCase();

            return itemData.indexOf(textData) > -1;
           // return user.label.toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
          });
          setFilteredDataSource(results);
        } else {
            setFilteredDataSource(AssetGroupCode);
          // If the text field is empty, show all users
        }
    
        setName(keyword);
      };

      //console.log(""+":"+name)

    const handleOnChange = () => {
        setParentFlag(!ParentFlag);       
    }; 

    const handleSelect = ( e) => {


        setselected_AssetGroupCode(e)
        handleClose();
        //console.log("lkfklsdj"+":"+e);
        //setSelected({ key, value: event.target.value });
    };



    const onClickChange =()=>{


        console.log(selected_AssetStatus)
        if(selected_AssetStatus == 0 || selected_AssetStatus == null){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select the Asset Status',
                showConfirmButton: false,
                timer: 2000,
                
              })
        }else{

            if(ShortDesc == ''){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Enter the Short Desc',
                    showConfirmButton: false,
                    timer: 2000
                    
                  })
            }else{
    
                if(selected_CriticalFactor == 0 || selected_CriticalFactor == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select the Critical Factor',
                        showConfirmButton: false,
                        timer: 2000
                        
                      })
                }else{
        
                    if(selected_AssetType == 0 || selected_AssetType == null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Select the Asset Type',
                            showConfirmButton: false,
                            timer: 2000
                            
                          })
                    }else{
            
                        if(selected_WorkArea == 0 || selected_WorkArea == null){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Select the Work Area',
                                showConfirmButton: false,
                                timer: 2000
                                
                              })
                        }else{
                
                            if(selected_Assetcode == 0 || selected_Assetcode == null){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Please Select the Asset code',
                                    showConfirmButton: false,
                                    timer: 2000
                                    
                                  })
                            }else{

                                if(selected_AssetLocation == 0 || selected_AssetLocation == null){
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Please Select the Asset Location',
                                        showConfirmButton: false,
                                        timer: 2000
                                        
                                      })
                                }else{
                                    if(selected_AssetGroupCode == 0 || selected_AssetGroupCode == null){
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Select the Asset Group Code ',
                                            showConfirmButton: false,
                                            timer: 2000
                                            
                                          })
                                    }else{
                            
                                        if(selected_AssetLevel == 0 || selected_AssetLevel == null){
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Please Select the Asset Level ',
                                                showConfirmButton: false,
                                                timer: 2000
                                                
                                              })
                                        }else{
                                            if(selected_CostCenter == 0 || selected_CostCenter == null){
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'error',
                                                    title: 'Please Select the Cost Center',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                    
                                                  })
                                            }else{
                                    
                                                if(selected_WorkGroup == 0 || selected_WorkGroup == null){
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'error',
                                                        title: 'Please Select the Work Group',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                        
                                                      })
                                                }else{

                                                        if(Button_save ==  "Save"){

                                                            New_Asset();
                                                        }else if(Button_save == "Update"){

                                                            Update_Asset();
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
                    Update_Asset();
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


    const New_Asset =()=>{

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading()


         let site_ID = localStorage.getItem("site_ID");
         let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
         let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
     

        if(AssetNo_disabled){

            console.log(AssetNo_disabled)

        }else{ 
            
            if(AssetNo.length > 0){
                console.log(AssetNo)
            }else{
                Swal.close();
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Enter the Asset NO',
                    showConfirmButton: false,
                    
                  })
            }

        }

        let  AssetStatus = selected_AssetStatus.label.split(":")
         console.log(AssetStatus[0])

         console.log(ShortDesc)
         
         let  CriticalFactor = selected_CriticalFactor.label.split(":")
         console.log(CriticalFactor[0])

         console.log(LongDesc)

         console.log(PermanentID)


         //---------------------------------------------------------------------

         let  AssetType = selected_AssetType.label.split(":")
         console.log(AssetType[0])

         let  WorkArea = selected_WorkArea.label.split(":")
         console.log(WorkArea[0])

         let  Assetcode = selected_Assetcode.label.split(":")
         console.log(Assetcode[0])

         let  AssetLocation = selected_AssetLocation.label.split(":")
         console.log(AssetLocation[0])
         
         let  AssetGroupCode = selected_AssetGroupCode.split(":")
         console.log(AssetGroupCode[0])

         let  AssetLevel = selected_AssetLevel.label.split(":")
         console.log(AssetLevel[0])

         let  CostCenter = selected_CostCenter.label.split(":")
         console.log(CostCenter[0])

         let  WorkGroup = selected_WorkGroup.label.split(":")
         console.log(WorkGroup[0])

         
         console.log(SafetyRequirement)
         console.log(Manufacturer)
         console.log(Asset_Model)

         //------------------------------------------------------------------
         console.log(AssetCost)
        // console.log(PurchaseDate)
        // const formatDate = Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss')
       //  let pur =Moment(PurchaseDate).format("yyyy-MM-dd HH:mm:ss")
        
         console.log(ResidualValue)
         console.log(Moment(WarrantyDate).format('yyyy-MM-DD HH:mm:ss'))
         console.log(Moment(ExpectedLifeDate).format('yyyy'))

         let purdate,wardate,expdate,CustomerCode,setCustomerCode,DepreciationMethod,setDepreciationMethod;

         if(PurchaseDate == ''){
            purdate=''

         }else{
            purdate= Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss').trim;
            console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
         }

         if(WarrantyDate == ''){
            wardate=''

        }else{
           wardate= Moment(WarrantyDate).format('yyyy-MM-DD HH:mm:ss').trim;
           console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
        }

        if(ExpectedLifeDate == ''){

            expdate=''
        }else{
           expdate= Moment(ExpectedLifeDate).format('yyyy').trim;
           console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
        }

        if(selected_CustomerCode == '' || selected_CustomerCode == null){
            
            setCustomerCode=''
        }else{

            CustomerCode = selected_CustomerCode.label.split(":")
            setCustomerCode=CustomerCode[0];
            console.log(CustomerCode[0])
        }

        if(selected_DepreciationMethod == '' || selected_DepreciationMethod == null){

            setDepreciationMethod=''
        }else{

            DepreciationMethod = selected_DepreciationMethod.label.split(":")
            setDepreciationMethod=DepreciationMethod[0];
            console.log(DepreciationMethod[0])
        }

        //Select Date 1
        let date_1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_1 = '';
        } else {

            date_1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date1 ", date_1);
        }



        var json_asset ={

            "site_cd": site_ID,
           "ast_mst_asset_no": AssetNo.trim(),
            "ast_mst_asset_status":AssetStatus[0].trim(),
            "ast_mst_asset_shortdesc":ShortDesc.trim(),
            "ast_mst_cri_factor":CriticalFactor[0].trim(),
            "ast_mst_asset_longdesc":LongDesc.trim(),
            "ast_mst_perm_id":PermanentID.trim(),

            "ast_mst_asset_type":AssetType[0].trim(),
            "ast_mst_work_area":WorkArea[0].trim(),
            "ast_mst_asset_code":Assetcode[0].trim(),
            "ast_mst_asset_locn":AssetLocation[0].trim(),            
            "ast_mst_asset_grpcode":AssetGroupCode[0].trim(),
            "ast_mst_ast_lvl":AssetLevel[0].trim(),
            "ast_mst_cost_center":CostCenter[0].trim(),
            "ast_mst_wrk_grp":WorkGroup[0].trim(),
            "ast_mst_parent_flag":"0",
            "ast_mst_parent_id":PerentID.trim(),
            "ast_mst_safety_rqmts":SafetyRequirement.trim(),
            "ast_mst_print_count":"0",
            "ast_det_mfg_cd":Manufacturer.trim(),
            "ast_det_modelno":Asset_Model.trim(),

            "ast_det_purchase_date":purdate,
            "ast_det_repl_cost":ResidualValue.trim(),
            "ast_det_warranty_date":wardate,
            "ast_det_depr_term":expdate,            
            "ast_det_cus_code":setCustomerCode.trim(),
            "ast_det_depr_method":setDepreciationMethod.trim(),

            "ast_det_depr_date":"",
            "ast_det_depr_by":"",
            "ast_det_acc_depr_cost":"",
            "ast_det_net_book_value":"",
            "ast_det_dispose_date":"",
            "ast_det_dispose_by":"",
            "ast_det_dispose_type":"",
            "ast_det_dispose_value":"",

            "ast_det_varchar1":UDFText_1,
            "ast_det_varchar2":UDFText_2,
            "ast_det_varchar3":UDFText_3,
            "ast_det_varchar4":UDFText_4,
            "ast_det_varchar5":UDFText_5,
            "ast_det_varchar6":UDFText_6,
            "ast_det_varchar7":UDFText_7,
            "ast_det_varchar8":UDFText_8,
            "ast_det_varchar9":UDFText_9,
            "ast_det_varchar10":UDFText_10,

            "ast_det_varchar11":UDFText_11,           
            "ast_det_varchar12":UDFText_12,
            "ast_det_varchar13":UDFText_13,
            "ast_det_varchar14":UDFText_14,
            "ast_det_varchar15":UDFText_15,
            "ast_det_varchar16":UDFText_16,
            "ast_det_varchar17":UDFText_17,
            "ast_det_varchar18":UDFText_18,
            "ast_det_varchar19":UDFText_19,
            "ast_det_varchar20":UDFText_20,

            "ast_det_varchar21":UDFText_21,
            "ast_det_varchar22":UDFText_22,
            "ast_det_varchar23":UDFText_23,
            "ast_det_varchar24":UDFText_24,
            "ast_det_varchar25":UDFText_25,
            "ast_det_varchar26":UDFText_26,
            "ast_det_varchar27":UDFText_27,
            "ast_det_varchar28":UDFText_28,
            "ast_det_varchar29":UDFText_29,
            "ast_det_varchar30":UDFText_30,


            "ast_det_numeric1":UDFNumber_1,
            "ast_det_numeric2":UDFNumber_2,
            "ast_det_numeric3":UDFNumber_3,
            "ast_det_numeric4":UDFNumber_4,
            "ast_det_numeric5":UDFNumber_5,
            "ast_det_numeric6":UDFNumber_6,
            "ast_det_numeric7":UDFNumber_7,
            "ast_det_numeric8":UDFNumber_8,
            "ast_det_numeric9":UDFNumber_9,
            "ast_det_numeric10":UDFNumber_10,

            "ast_det_numeric11":UDFNumber_11,
            "ast_det_numeric12":UDFNumber_12,
            "ast_det_numeric13":UDFNumber_13,
            "ast_det_numeric14":UDFNumber_14,
            "ast_det_numeric15":UDFNumber_15,
            "ast_det_numeric16":UDFNumber_16,
            "ast_det_numeric17":UDFNumber_17,
            "ast_det_numeric18":UDFNumber_18,
            "ast_det_numeric19":UDFNumber_19,
            "ast_det_numeric20":UDFNumber_20,

            "ast_det_numeric21":UDFNumber_21,
            "ast_det_numeric22":UDFNumber_22,
            "ast_det_numeric23":UDFNumber_23,
            "ast_det_numeric24":UDFNumber_24,
            "ast_det_numeric25":UDFNumber_25,
            "ast_det_numeric26":UDFNumber_26,
            "ast_det_numeric27":UDFNumber_27,
            "ast_det_numeric28":UDFNumber_28,
            "ast_det_numeric29":UDFNumber_29,
            "ast_det_numeric30":UDFNumber_30,
            
            "ast_det_datetime1":date_1,
            "ast_det_datetime2":"",
            "ast_det_datetime3":"",
            "ast_det_datetime4":"",
            "ast_det_datetime5":"",
            "ast_det_datetime6":"",
            "ast_det_datetime7":"",
            "ast_det_datetime8":"",
            "ast_det_datetime9":"",
            "ast_det_datetime10":"",

            "ast_det_datetime11":"",
            "ast_det_datetime12":"",
            "ast_det_datetime13":"",
            "ast_det_datetime14":"",
            "ast_det_datetime15":"",
            "ast_det_datetime16":"",
            "ast_det_datetime17":"",
            "ast_det_datetime18":"",
            "ast_det_datetime19":"",
            "ast_det_datetime20":"",


            "asset_type_ID":AutoNumring.trim(),
            
            "audit_user":emp_mst_login_id.trim(),
            "ast_mst_create_by":emp_mst_login_id.trim(),
            "ast_aud_originator":emp_mst_empl_id.trim(),
            

            
        }

        console.log(JSON.stringify(json_asset))

        APIServices.insert_new_asset(JSON.stringify(json_asset)).then((responseJson)=>{
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
            setParentFlag(e);
            Swal.fire({
              icon: 'error',
              title: 'Oops get_assetmaster_select...',
              text: e,          
            })
          });


    }


    const Update_Asset =()=>{

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading()


         let site_ID = localStorage.getItem("site_ID");
         let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
         let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
     

        if(AssetNo_disabled){

            console.log(AssetNo_disabled)

        }else{ 
            
            if(AssetNo.length > 0){
                console.log(AssetNo)
            }else{
                Swal.close();
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Enter the Asset NO',
                    showConfirmButton: false,
                    
                  })
            }

        }

        let  AssetStatus = selected_AssetStatus.label.split(":")
         console.log(AssetStatus[0])

         console.log(ShortDesc)
         
         let  CriticalFactor = selected_CriticalFactor.label.split(":")
         console.log(CriticalFactor[0])

         console.log(LongDesc)

         console.log(PermanentID)
        

         //---------------------------------------------------------------------

         let  AssetType = selected_AssetType.label.split(":")
         console.log(AssetType[0])

         let  WorkArea = selected_WorkArea.label.split(":")
         console.log(WorkArea[0])

         let  Assetcode = selected_Assetcode.label.split(":")
         console.log(Assetcode[0])

         let  AssetLocation = selected_AssetLocation.label.split(":")
         console.log(AssetLocation[0])
         
         let  AssetGroupCode = selected_AssetGroupCode.split(":")
         console.log(AssetGroupCode[0])

         let  AssetLevel = selected_AssetLevel.label.split(":")
         console.log(AssetLevel[0])

         let  CostCenter = selected_CostCenter.label.split(":")
         console.log(CostCenter[0])

         let  WorkGroup = selected_WorkGroup.label.split(":")
         console.log(WorkGroup[0])

         
         console.log(SafetyRequirement)
         console.log(Manufacturer)
         console.log(PurchaseDate)

         //------------------------------------------------------------------
         let purdate,wardate,expdate,CustomerCode,setCustomerCode,DepreciationMethod,setDepreciationMethod;

         if(PurchaseDate == ''){
            purdate=''

         }else{
            purdate= Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss').trim();

            console.log(purdate)

            console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
         }

         if(WarrantyDate == ''){
            wardate=''

        }else{
           wardate= Moment(WarrantyDate).format('yyyy-MM-DD HH:mm:ss').trim();
           console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
        }

        if(ExpectedLifeDate == ''){

            expdate=''
        }else{
           expdate= Moment(ExpectedLifeDate).format('yyyy').trim();
           console.log(Moment(PurchaseDate).format('yyyy-MM-DD HH:mm:ss'))
        }

        if(selected_CustomerCode == '' || selected_CustomerCode == null){
            
            setCustomerCode=''
        }else{

            CustomerCode = selected_CustomerCode.label.split(":")
            setCustomerCode=CustomerCode[0];
            console.log(CustomerCode[0])
        }

        if(selected_DepreciationMethod == '' || selected_DepreciationMethod == null){

            setDepreciationMethod=''
        }else{

            DepreciationMethod = selected_DepreciationMethod.label.split(":")
            setDepreciationMethod=DepreciationMethod[0];
            console.log(DepreciationMethod[0])
        }

        //Select Date 1
        let date_1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_1 = '';
        } else {

            date_1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date1 ", date_1);
        }
        

    
        var json_asset ={

            "site_cd": site_ID,
           "ast_mst_asset_no": AssetNo,
            "ast_mst_asset_status":AssetStatus[0].trim(),
            "ast_mst_asset_shortdesc":ShortDesc.trim(),
            "ast_mst_cri_factor":CriticalFactor[0].trim(),
            "ast_mst_asset_longdesc":LongDesc,
            "ast_mst_perm_id":PermanentID,

            "ast_mst_asset_type":AssetType[0].trim(),
            "ast_mst_work_area":WorkArea[0].trim(),
            "ast_mst_asset_code":Assetcode[0].trim(),
            "ast_mst_asset_locn":AssetLocation[0].trim(),            
            "ast_mst_asset_grpcode":AssetGroupCode[0].trim(),
            "ast_mst_ast_lvl":AssetLevel[0].trim(),
            "ast_mst_cost_center":CostCenter[0].trim(),
            "ast_mst_wrk_grp":WorkGroup[0].trim(),
            "ast_mst_parent_flag":"0",
            "ast_mst_parent_id":PerentID,
            "ast_mst_safety_rqmts":SafetyRequirement,
            "ast_mst_print_count":"0",
            "ast_det_mfg_cd":Manufacturer,
            "ast_det_modelno":Asset_Model,

            "ast_det_purchase_date":purdate,
            "ast_det_repl_cost":ResidualValue.trim(),
            "ast_det_warranty_date":wardate,
            "ast_det_depr_term":expdate,            
            "ast_det_cus_code":setCustomerCode,
            "ast_det_depr_method":setDepreciationMethod,

            "ast_det_depr_date":"",
            "ast_det_depr_by":"",
            "ast_det_acc_depr_cost":"",
            "ast_det_net_book_value":"",
            "ast_det_dispose_date":"",
            "ast_det_dispose_by":"",
            "ast_det_dispose_type":"",
            "ast_det_dispose_value":"",

            "ast_det_varchar1":UDFText_1,
            "ast_det_varchar2":UDFText_2,
            "ast_det_varchar3":UDFText_3,
            "ast_det_varchar4":UDFText_4,
            "ast_det_varchar5":UDFText_5,
            "ast_det_varchar6":UDFText_6,
            "ast_det_varchar7":UDFText_7,
            "ast_det_varchar8":UDFText_8,
            "ast_det_varchar9":UDFText_9,
            "ast_det_varchar10":UDFText_10,

            "ast_det_varchar11":UDFText_11,           
            "ast_det_varchar12":UDFText_12,
            "ast_det_varchar13":UDFText_13,
            "ast_det_varchar14":UDFText_14,
            "ast_det_varchar15":UDFText_15,
            "ast_det_varchar16":UDFText_16,
            "ast_det_varchar17":UDFText_17,
            "ast_det_varchar18":UDFText_18,
            "ast_det_varchar19":UDFText_19,
            "ast_det_varchar20":UDFText_20,

            "ast_det_varchar21":UDFText_21,
            "ast_det_varchar22":UDFText_22,
            "ast_det_varchar23":UDFText_23,
            "ast_det_varchar24":UDFText_24,
            "ast_det_varchar25":UDFText_25,
            "ast_det_varchar26":UDFText_26,
            "ast_det_varchar27":UDFText_27,
            "ast_det_varchar28":UDFText_28,
            "ast_det_varchar29":UDFText_29,
            "ast_det_varchar30":UDFText_30,


            "ast_det_numeric1":UDFNumber_1,
            "ast_det_numeric2":UDFNumber_2,
            "ast_det_numeric3":UDFNumber_3,
            "ast_det_numeric4":UDFNumber_4,
            "ast_det_numeric5":UDFNumber_5,
            "ast_det_numeric6":UDFNumber_6,
            "ast_det_numeric7":UDFNumber_7,
            "ast_det_numeric8":UDFNumber_8,
            "ast_det_numeric9":UDFNumber_9,
            "ast_det_numeric10":UDFNumber_10,

            "ast_det_numeric11":UDFNumber_11,
            "ast_det_numeric12":UDFNumber_12,
            "ast_det_numeric13":UDFNumber_13,
            "ast_det_numeric14":UDFNumber_14,
            "ast_det_numeric15":UDFNumber_15,
            "ast_det_numeric16":UDFNumber_16,
            "ast_det_numeric17":UDFNumber_17,
            "ast_det_numeric18":UDFNumber_18,
            "ast_det_numeric19":UDFNumber_19,
            "ast_det_numeric20":UDFNumber_20,
            
            "ast_det_numeric21":UDFNumber_21,
            "ast_det_numeric22":UDFNumber_22,
            "ast_det_numeric23":UDFNumber_23,
            "ast_det_numeric24":UDFNumber_24,
            "ast_det_numeric25":UDFNumber_25,
            "ast_det_numeric26":UDFNumber_26,
            "ast_det_numeric27":UDFNumber_27,
            "ast_det_numeric28":UDFNumber_28,
            "ast_det_numeric29":UDFNumber_29,
            "ast_det_numeric30":UDFNumber_30,
            
            "ast_det_datetime1":date_1,
            "ast_det_datetime2":"",
            "ast_det_datetime3":"",
            "ast_det_datetime4":"",
            "ast_det_datetime5":"",
            "ast_det_datetime6":"",
            "ast_det_datetime7":"",
            "ast_det_datetime8":"",
            "ast_det_datetime9":"",
            "ast_det_datetime10":"",

            "ast_det_datetime11":"",
            "ast_det_datetime12":"",
            "ast_det_datetime13":"",
            "ast_det_datetime14":"",
            "ast_det_datetime15":"",
            "ast_det_datetime16":"",
            "ast_det_datetime17":"",
            "ast_det_datetime18":"",
            "ast_det_datetime19":"",
            "ast_det_datetime20":"",


            "asset_type_ID":AutoNumring.trim(),
            
            "audit_user":emp_mst_login_id.trim(),
            "ast_mst_create_by":emp_mst_login_id.trim(),
            "ast_aud_originator":emp_mst_empl_id.trim(),
            
            "RowID":RowID.trim(),

            
        }

        console.log("Update : "+JSON.stringify(json_asset))

        APIServices.update_asset(JSON.stringify(json_asset)).then((responseJson)=>{
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
              title: 'Oops get_assetmaster_select...',
              text: e,          
            })
          });


    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        
        selectedFlatRows,
        resetResizing,        
        state: { selectedRowIds },        
        
    } = useTable({ columns, data },useSortBy,useRowSelect,useResizeColumns)


    const handleRowClick = (data) => {


        ParentFlag_handleClose();

        setselected_ParentFlag(data.col1)
        
        console.log(data.col1)

        

    };



    // Status Audit PopUp
    const formatDuration = (duration) => {
    // const seconds = Math.floor(duration % 60);
     const minutes = Math.floor((duration % 60));
     const hours = Math.floor((duration % 1440) / 60);
     const days = Math.floor(duration / 1440);
     
     if (days > 0) {
       return `${days}d: ${hours}h: ${minutes}m`;
     } else if (hours > 0) {
       return `${hours}h: ${minutes}m`;
     } else if (minutes > 0) {
       return `${minutes}m`;
     } else {
       return "";
     }
     // return `${days}d: ${hours}h: ${minutes}m`;
};

    const getsteps = (site_ID, RowID, ast_aud_asset_no) => {

    Swal.fire({ title: 'Please Wait !', allowOutsideClick: false });
    Swal.showLoading();

    console.log('--->RowID : ' + location.state.RowID);
    
    APIServices.get_assetmaster_statusaudit(site_ID, ast_aud_asset_no, RowID).then((responseJson) => {
      console.log('get_assetmaster_statusaudit', responseJson.data.data)

      if (responseJson.data.status === 'SUCCESS') {

        console.log('get_assetmaster_statusaudit', responseJson.data.data)

        let Status = responseJson.data.data.map((item, index) => ({
          label: item.ast_sts_desc,
          label1: item.ast_aud_status,
          label2: item.emp_mst_name,
          label3: item.audit_user,
          label4: `${new Date(item.ast_aud_start_date.date).toLocaleString("default", {
            weekday: "short",
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}`,
          label5: formatDuration(item.duration),
          step: index + 1
        
        }));
        setsteps(Status);
   
        Swal.close();

      } else {
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
};

  const [showList, setShowList] = useState(false);

  const handleToggleList = () => {
    setShowList(!showList);
  };



  
  const get_assetpmsetup = (site_ID, RowID) => {
    APIServices.get_assetpmsetup(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderPmSetup(responseJson.data.data.header);
            setResultPmSetup(responseJson.data.data.result);
        
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

    //Header
    const renderTableHeaderPmSetup = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderPmSetup).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
        
    //Body    
    const renderTableRowsPmSetup = () => {
    return ResultPmSetup.map((result, index) => {


        if (result.prm_mst_next_create == null) {
            var next_date = ''
        } else {

            var next_date = format(new Date(result.prm_mst_next_create.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickPmSetup(result, event)}>
        
            <td>{index + 1}</td>
            <td>{result.prm_mst_pm_no}</td>
            <td>{result.prm_mst_curr_wo}</td>
            <td>{result.prm_mst_freq_code}</td>
            <td>{result.prm_mst_desc}</td>
            <td>{result.prm_mst_meter_id}</td>
            <td>{result.prm_mst_lpm_usg}</td>
            <td>{result.prm_mst_lpm_uom}</td>
            <td>{next_date}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickPmSetup = (data) => {
        console.log(data);

        setPMNo( data.prm_mst_pm_no )
        setCurrentWorkOrder( data.prm_mst_curr_wo )
        setFrequencyCode( data.prm_mst_freq_code )
        setDescriptionPmSetup( data.prm_mst_desc )
        setMeterID( data.prm_mst_meter_id )
        setLPMUsage( data.prm_mst_lpm_usg )
        setLPMUOM( data.prm_mst_lpm_uom )
        setNextCreateDate( data.prm_mst_next_create )
        
        setShowModalPmSetup(true);
    };


    const resetData = () => {
    
        setPMNo('');
        setCurrentWorkOrder('');
        setFrequencyCode('');
        setDescriptionPmSetup('');
        setMeterID('');
        setLPMUsage('');
        setLPMUOM('');
        setNextCreateDate('');
        
        setWorkOrderNo('');
        setOriginationDate('');
        setStatusWOHistory('');
        setOriginator('');
        setPhone('');
        setDescriptionWOHistory('');

        setNewLocation('');
        setNewLocDesc('');
        setReason('');
        setAuditUser('');
        setAuditDate('');

        setCheckListCode('');
        setCheckListDescription('');
        setCarryToWorkOrder('');
      
    };
    

    const handleAddButtonClickPmSetup  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select PM No
        console.log("PMNo: ", PMNo)

        //Select Current Work Order
        console.log("CurrentWorkOrder: ", CurrentWorkOrder)

        //Select Frequency Code
        console.log("FrequencyCode: ", FrequencyCode)

        //Select Description
        console.log("Description: ", DescriptionPmSetup)

        //Select Meter ID
        console.log("MeterID: ", MeterID)

        //Select LPM Usage
        console.log("LPMUsage: ", LPMUsage)

        //Select LPM UOM
        console.log("LPMUOM: ", LPMUOM)


        //Select Next Create Date
        let NextCreate_Date = ''
        if (NextCreateDate == '' || NextCreateDate == null) {

            NextCreate_Date = '';
        } else {

            NextCreate_Date = Moment(NextCreateDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("NC Date ", NextCreateDate);
        }


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            prm_mst_pm_no: PMNo,
            prm_mst_curr_wo: CurrentWorkOrder,
            prm_mst_freq_code: FrequencyCode,
            prm_mst_desc: DescriptionPmSetup,
            prm_mst_meter_id: MeterID,
            prm_mst_lpm_usg: LPMUsage,
            prm_mst_lpm_uom: LPMUOM,
            //prm_mst_next_create: NextCreate_Date,

    
          };
          // Add new part to partsList
          setResultPmSetup([...ResultPmSetup, newPart]);
          console.log(ResultPmSetup);
          // Close modal
          handleClosePmSetup();
    };


  //Sum calculation
  const totalQtyPmSetup = ResultPmSetup.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCostPmSetup = ResultPmSetup.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);




  //WO History Here
  const get_assetwohistory = (site_ID, RowID) => {
    APIServices.get_assetwohistory(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderWOHistory(responseJson.data.data.header);
            setResultWOHistory(responseJson.data.data.result);
        
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

    //Header
    const renderTableHeaderWOHistory = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderWOHistory).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
            
    //Body    
    const renderTableRowsWOHistory = () => {
    return ResultWOHistory.map((result, index) => {


        if (result.wko_mst_org_date == null) {
            var org_date = ''
        } else {
    
            var org_date = format(new Date(result.wko_mst_org_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickWOHistory(result, event)}>
            
            <td>{index + 1}</td>
            <td>{result.wko_mst_wo_no}</td>
            <td>{org_date}</td>
            <td>{result.wko_mst_status}</td>
            <td>{result.wko_mst_originator}</td>
            <td>{result.wko_mst_phone}</td>
            <td>{result.wko_mst_descs}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickWOHistory = (data) => {
        console.log(data);
    
        setWorkOrderNo( data.wko_mst_wo_no )
        setOriginationDate( data.wko_mst_org_date )
        setStatusWOHistory( data.wko_mst_status )
        setOriginator( data.wko_mst_originator )
        setPhone( data.wko_mst_phone )
        setDescriptionWOHistory( data.wko_mst_descs )

        setShowModalWOHistory(true);
    };


    const handleAddButtonClickWOHistory  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Work Order No
        console.log("WorkOrderNo: ", WorkOrderNo)

        //Select Origination Date
        let Origination_Date = ''
        if (OriginationDate == '' || OriginationDate == null) {

            Origination_Date = '';
        } else {

            Origination_Date = Moment(OriginationDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("NC Date ", OriginationDate);
        }

        //Select Status
        console.log("Status: ", StatusWOHistory)

        //Select Originator
        console.log("Originator: ", Originator)

        //Select Phone
        console.log("Phone: ", Phone)

        //Select Description
        console.log("Description: ", DescriptionWOHistory)
       


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            wko_mst_wo_no: WorkOrderNo,
            //wko_mst_org_date: Origination_Date,
            wko_mst_status: StatusWOHistory,
            wko_mst_originator: Originator,
            wko_mst_phone: Phone,
            wko_mst_descs: DescriptionWOHistory,

    
          };
          // Add new part to partsList
          setResultWOHistory([...ResultWOHistory, newPart]);
          console.log(ResultWOHistory);
          // Close modal
          handleCloseWOHistory();
    };


  //Sum calculation
  const totalQtyWOHistory = ResultWOHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCostWOHistory = ResultWOHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);




    //Relocation History Here
    const get_assetrelocationhistory = (site_ID, RowID) => {
    APIServices.get_assetrelocationhistory(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderRelocationHistory(responseJson.data.data.header);
            setResultRelocationHistory(responseJson.data.data.result);
        
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

    //Header
    const renderTableHeaderRelocationHistory = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderRelocationHistory).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
        
    //Body    
    const renderTableRowsRelocationHistory = () => {
    return ResultRelocationHistory.map((result, index) => {


        if (result.audit_date == null) {
            var a_date = ''
        } else {

            var a_date = format(new Date(result.audit_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickRelocationHistory(result, event)}>
        
            <td>{index + 1}</td>
            <td>{result.ast_loc_s_asset_olocn}</td>
            <td>{result.ast_loc_s_asset_nlocn}</td>
            <td>{result.ast_loc_s_asset_reason}</td>
            <td>{result.audit_user}</td>
            <td>{a_date}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickRelocationHistory = (data) => {
        console.log(data);

        setNewLocation( data.ast_loc_s_asset_olocn )
        setNewLocDesc( data.ast_loc_s_asset_nlocn )
        setReason( data.ast_loc_s_asset_reason )
        setAuditUser( data.audit_user )
        setAuditDate( data.audit_date )

        setShowModalRelocationHistory(true);
    };


    const handleAddButtonClickRelocationHistory  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select New Location
        console.log("NewLocation: ", NewLocation)

        //Select New Loc Desc
        console.log("NewLocDesc: ", NewLocDesc)

        //Select Reason
        console.log("Reason: ", Reason)

        //Select Audit User
        console.log("AuditUser: ", AuditUser)

        //Select Audit Date
        let A_Date = ''
        if (AuditDate == '' || AuditDate == null) {

            A_Date = '';
        } else {

            A_Date = Moment(AuditDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("A Date ", AuditDate);
        }


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_loc_s_asset_olocn: NewLocation,
            ast_loc_s_asset_nlocn: NewLocDesc,
            ast_loc_s_asset_reason: Reason,
            audit_user: AuditUser,
            //audit_date: A_Date,

    
          };
          // Add new part to partsList
          setResultRelocationHistory([...ResultRelocationHistory, newPart]);
          console.log(ResultRelocationHistory);
          // Close modal
          handleCloseRelocationHistory();
    };


  //Sum calculation
  const totalQtyRelocationHistory = ResultRelocationHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation
  const totalCostRelocationHistory = ResultRelocationHistory.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);




    //Check List Here
    const get_assetchecklist = (site_ID, RowID) => {
    APIServices.get_assetchecklist(site_ID, RowID)
        .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {

            setHeaderCheckList(responseJson.data.data.header);
            setResultCheckList(responseJson.data.data.result);
        
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


    //Header CheckList
    const renderTableHeaderCheckList = () => {
        return (
            <>
            <th key="select">
                {/* <IndeterminateCheckbox {...Header} checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} /> */}
            </th>
            {Object.keys(HeaderCheckList).map((attr) => (
                <th key={attr}> {attr.toUpperCase()}</th>
            ))}
            </>
        );
    };
          
    //Body CheckList
    const renderTableRowsCheckList = () => {
    return ResultCheckList.map((result, index) => {


        if (result.audit_date == null) {
            var a_date = ''
        } else {
    
            var a_date = format(new Date(result.audit_date.date), "dd/MM/yyyy HH:MM")
            
        }

        
        return (
        <tr key={index} onClick={(event) =>handleRowClickCheckList(result, event)}>
          
            <td>{index + 1}</td>
            <td>{result.ast_job_job_cd}</td>
            <td>{result.job_mst_desc}</td>
            <td>{result.ast_job_carry}</td>
            
        </tr>
        );
    });
    };


    const handleRowClickCheckList = (data) => {
        console.log(data);
    
        setCheckListCode( data.ast_job_job_cd )
        setCheckListDescription( data.job_mst_desc )
        setCarryToWorkOrder( data.ast_job_carry )

        setShowModalCheckList(true);
    };
    
    
    const handleAddButtonClickCheckList  = () => {
    
        let site_ID = localStorage.getItem("site_ID");
       
        //Select Check List Code
        console.log("CheckListCode: ", CheckListCode)

        //Select Check List Description
        console.log("CheckListDescription: ", CheckListDescription)

        //Select Carry ToWork Order
        console.log("CarryToWorkOrder: ", CarryToWorkOrder)


        const newPart = {
            
            mst_RowID: location.state.RowID,
            site_cd: site_ID,
            ast_job_job_cd: CheckListCode,
            job_mst_desc: CheckListDescription,
            ast_job_carry: CarryToWorkOrder,
         
    
          };
          // Add new part to partsList
          setResultCheckList([...ResultCheckList, newPart]);
          console.log(ResultCheckList);
          // Close modal
          handleCloseCheckList();
    };

    
    const handleOnChangeCarryToWorkOrder = () => {
        setCarryToWorkOrder(!CarryToWorkOrder);
        
        if(!CarryToWorkOrder){
            console.log('1')
            setCheckBox_CarryToWorkOrder('1')
        }else{
            console.log('0')
            setCheckBox_CarryToWorkOrder('0')
        }
    }


  //Sum calculation CheckList
  const totalQtyCheckList = ResultCheckList.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0), 0);
  
  //Multiply calculation CheckList
  const totalCostCheckList = ResultCheckList.reduce((acc, item) => acc + (parseFloat(item.ast_ls2_max_avg_usage) || 0) * (parseFloat(item.ast_ls2_warranty_usage) || 0), 0);


  //Tooltip
  const renderTooltipAssetHistory = <span>Asset History</span>;
  const renderTooltipStatusAudit = <span>Status Audit</span>;





  return (   

    <div>
        <div className="page-header" style={{ marginTop: "-10px", marginBottom:"10px" }}>
            <h3 className="page-title">
                Asset Master
            </h3>     

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

                    <div>
                        {/* <Button variant="primary" onClick={handleShow}>
                            Launch Bootstrap Modal
                        </Button> */}

                        <Modal show={show} onHide={handleClose} centered >

                            <Modal.Header closeButton>
                                <Modal.Title>Asset Code</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form.Control type="search" className="form-control" placeholder="Search Here" value={name} onChange={(text) => filter(text)}/>

                                <div className="user-list" >

                                    {filteredDataSource && filteredDataSource.length > 0 ? (

                                    
                                    filteredDataSource.map((user) => (

                                            // setParentFlag(user),

                                            <li key={user.label } className="user" onClick={()=>{handleSelect(user.label +" : "+ user.value); handleInputChange();}}  >
                                            <span className="user-id">{user.label}</span>
                                            <span className="user-name">{user.value}</span> 

                                                                
                                            
                                            </li>                                        
                                        ))

                                    ) : (<h1>No results found!</h1>)}
                                </div>
                            
                            </Modal.Body>

                            {/* <Modal.Footer>

                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleClose}>Submit</Button>

                            </Modal.Footer> */}

                        </Modal>


                        <Modal show={ParentFlag_show} onHide={ParentFlag_handleClose} centered  size="xl">

                            <Modal.Header closeButton>
                                <Modal.Title>Asset Code</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Form.Control type="search" className="form-control" placeholder="Search Here" value={name} onChange={(text) => filter(text)}/>

                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered" {...getTableProps() } on >
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
                                                <tr {...row.getRowProps()} onClick={() => {handleRowClick(row.original); handleInputChange();}}>
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
                            
                            </Modal.Body>

                            {/* <Modal.Footer>

                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleClose}>Submit</Button>

                            </Modal.Footer> */}

                        </Modal>

                    </div> 

                    <div className="row">

                        <div className="col-md-10">

                            
                            {/******************** Asset Status ********************/}
                            <div>
                                <Modal show={StatusShow} onHide={StatushandleClose} centered size="xl">

                                    <Modal.Header closeButton>
                                         {/************* * {location.state.ast_mst_asset_no} * ************/}
                                        <Modal.Title>Status Audit</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                            <Form.Group className="row StatusAuditPopUp-sm" controlId="validation_StatusAudit">
                                                
                                            <div style={{ width: "100%", maxWidth: "600px" , marginLeft: "110px" , marginTop: "-30px" }}>
                                            <StepContainer>
                                            {steps.map(({ step, label, label1, label2, label3, label4, label5 }) => (
                                                <div key={step} style={{ position: "relative", zIndex: 1 }}>
                                                <div style={{ fontSize: "11px", color: "grey", position: 'absolute', left: '-81px', top: '45px', width: '80px', height: '20px', borderRadius: '5%', textAlign: 'right' }}>{label5}</div>
                                                  <div step={step} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#4694d1', border: `3px solid ${step === 'completed' ? '#0080FF' : '#F3E7F3'}`, transition: '0.4s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                      <div style={{ fontSize: "15px", color: "#f3e7f3" }}>{step}</div>
                                                  </div>
                      
                                                  <div style={{ position: 'relative', bottom: '30px', textAlign: 'left', left: '50px' }}>
                                                    <div key={step} style={{ fontSize: "15px", color: "#4a154b" }}>{label} ({label1})</div>
                                                  </div>
                      
                                                  <div style={{ position: 'relative', bottom: '30px', textAlign: 'left', left: '50px' }}>
                                                    <div key={step} style={{ fontSize: "11px", color: "grey" }}>Status Update By: {label2} ({label3})</div>
                                                  </div>
                      
                                                  <div style={{ position: 'relative', bottom: '30px', textAlign: 'left', left: '50px' }}>
                                                    <div key={step} style={{ fontSize: "11px", color: "grey" }}>On Start Date: {label4}</div>
                                                  </div>
                                                  
                                              </div>
                                            ))}
                                            </StepContainer>
                                            </div>
                                                     
                                            </Form.Group>
                                    </Modal.Body>
                                </Modal>

                            </div> 

                            {/******************** PM Setup ********************/}
                            <div>
                                <Modal show={PMSetupShow} onHide={PMSetuphandleClose} centered size="xl">

                                    <Modal.Header closeButton>
                
                                        {/* <Modal.Title>PM Setup</Modal.Title> */}
                                        <div>
                                            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                                                <div style={{ marginRight: '10px' }}>
                                                    <img src={logoPmSetup} style={{ width: '60px', height: '60px' }}/>
                                                </div>
                                                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>PM Setup</div>
                                                    <div><span style={{color: "blue"}}>{(totalQtyPmSetup * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostPmSetup.toFixed(2)}</span></div>
                                                </div> 
                                            </div>
                                        </div>
                                    </Modal.Header>

                                    <Modal.Body>
                                        
                                        <div>
                                            <Modal show={showPmSetup} onHide={handleClosePmSetup} centered >

                                                <Modal.Header closeButton>
                                                    <Modal.Title>PM Setup</Modal.Title>
                                                </Modal.Header>


                                                <Modal.Body>
                                                    <div className="col-md-12">
                                                        <Form.Group className="row" controlId="validation_PMNo">
                                                            <label className="col-sm-4 col-form-label down left">PM No:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={PMNo} 
                                                                    onChange={(e) => setPMNo(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_CurrentWorkOrder">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Current Work Order:</label>
                                                            <div className="col-sm-8">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={CurrentWorkOrder} 
                                                                    onChange={(e) => setCurrentWorkOrder(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_FrequencyCode">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Frequency Code:</label>
                                                            <div className="col-sm-8">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={FrequencyCode} 
                                                                    onChange={(e) => setFrequencyCode(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Description">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Description:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={DescriptionPmSetup} 
                                                                    onChange={(e) => setDescriptionPmSetup(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_MeterID">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Meter ID:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={MeterID} 
                                                                    onChange={(e) => setMeterID(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_LPMUsage">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">LPM Usage:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={LPMUsage} 
                                                                    onChange={(e) => setLPMUsage(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_LPMUOM">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">LPM UOM:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={LPMUOM} 
                                                                    onChange={(e) => setLPMUOM(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_NextCreateDate">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Next Create Date:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control        
                                                                    style={{ fontSize: "13px", height: "38px" }}                                    
                                                                    type="datetime-local"  
                                                                    value={NextCreateDate} 
                                                                    onChange={(e) => setNextCreateDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>
                                                </Modal.Body>
                                                

                                                <Modal.Footer>

                                                    <Button variant="secondary" onClick={handleClosePmSetup}>Close</Button>
                                                    <Button variant="primary" onClick={handleAddButtonClickPmSetup}>
                                                    {/* {Button_save} */}
                                                    Submit
                                                    </Button>
                                                </Modal.Footer>

                                            </Modal>


                                            {showModalPmSetup && (
                                            <Modal show={showModalPmSetup} onHide={handleCloseModalPmSetup} centered >

                                            <Modal.Header closeButton>
                                                <Modal.Title>PM Setup</Modal.Title>
                                            </Modal.Header>


                                            <Modal.Body>
                                                <div className="col-md-12">
                                                    <Form.Group className="row" controlId="validation_PMNo">
                                                        <label className="col-sm-4 col-form-label down">PM No:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={PMNo} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_CurrentWorkOrder">
                                                        <label className="col-sm-4 col-form-label  labelTopEmail down">Current Work Order:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={CurrentWorkOrder} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_FrequencyCode">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Frequency Code:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={FrequencyCode} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Description">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Description:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={DescriptionPmSetup} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_MeterID">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Meter ID:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={MeterID} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_LPMUsage">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">LPM Usage:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={LPMUsage} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_LPMUOM">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">LPM UOM:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={LPMUOM} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_NextCreateDate">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Next Create Date:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="datetime-local"  
                                                            value ={NextCreateDate} 
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
                                                <tr>{renderTableHeaderPmSetup()}</tr>
                                            </thead>
                                            <tbody>{renderTableRowsPmSetup()}</tbody>
                                            </table>
                                        </div>

                                    </Modal.Body>

                                </Modal>
                            </div> 

                            {/******************** WO History ********************/}
                            <div>
                                <Modal show={WOHistoryShow} onHide={WOHistoryhandleClose} centered size="xl">

                                    <Modal.Header closeButton>
            
                                        {/* <Modal.Title>PM Setup</Modal.Title> */}
                                        <div>
                                            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                                                <div style={{ marginRight: '10px' }}>
                                                    <img src={logoWOHistory} style={{ width: '60px', height: '60px' }}/>
                                                </div>
                                                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>WO History</div>
                                                    <div><span style={{color: "blue"}}>{(totalQtyWOHistory * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostWOHistory.toFixed(2)}</span></div>
                                                </div> 
                                            </div>
                                        </div>
                                    </Modal.Header>

                                    <Modal.Body>
                                            
                                        <div>
                                            <Modal show={showWOHistory} onHide={handleCloseWOHistory} centered >

                                                <Modal.Header closeButton>
                                                    <Modal.Title>WO History</Modal.Title>
                                                </Modal.Header>


                                                <Modal.Body>
                                                    <div className="col-md-12">
                                                        <Form.Group className="row" controlId="validation_WorkOrderNo">
                                                            <label className="col-sm-4 col-form-label down left">Work Order No:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={WorkOrderNo} 
                                                                    onChange={(e) => setWorkOrderNo(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_OriginationDate">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Origination Date:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control        
                                                                    style={{ fontSize: "13px", height: "38px" }}                                    
                                                                    type="datetime-local"  
                                                                    value={OriginationDate} 
                                                                    onChange={(e) => setOriginationDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Status">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Status:</label>
                                                            <div className="col-sm-8">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={StatusWOHistory} 
                                                                    onChange={(e) => setStatusWOHistory(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Originator">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Originator:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={Originator} 
                                                                    onChange={(e) => setOriginator(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Phone">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Phone:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={Phone} 
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Description">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Description:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={DescriptionWOHistory} 
                                                                    onChange={(e) => setDescriptionWOHistory(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                </Modal.Body>
                                                

                                                <Modal.Footer>

                                                    <Button variant="secondary" onClick={handleCloseWOHistory}>Close</Button>
                                                    <Button variant="primary" onClick={handleAddButtonClickWOHistory}>
                                                    {/* {Button_save} */}
                                                    Submit
                                                    </Button>
                                                </Modal.Footer>

                                            </Modal>

                                            {showModalWOHistory && (
                                            <Modal show={showModalWOHistory} onHide={handleCloseModalWOHistory} centered >

                                            <Modal.Header closeButton>
                                                <Modal.Title>WO History</Modal.Title>
                                            </Modal.Header>


                                            <Modal.Body>
                                                <div className="col-md-12">
                                                    <Form.Group className="row" controlId="validation_WorkOrderNo">
                                                        <label className="col-sm-4 col-form-label down">Work Order No:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={WorkOrderNo} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_OriginationDate">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Origination Date:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="datetime-local"  
                                                            value ={OriginationDate} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Status">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Status:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={StatusWOHistory} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Originator">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Originator:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={Originator} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Phone">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Phone:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={Phone} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Description">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Description:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={DescriptionWOHistory} 
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
                                                <tr>{renderTableHeaderWOHistory()}</tr>
                                            </thead>
                                            <tbody>{renderTableRowsWOHistory()}</tbody>
                                            </table>
                                        </div>

                                    </Modal.Body>

                                </Modal>
                            </div>

                            {/******************** Relocation History ********************/}
                            <div>
                                <Modal show={RelocationHistoryShow} onHide={RelocationHistoryhandleClose} centered size="xl">

                                    <Modal.Header closeButton>
                
                                        {/* <Modal.Title>PM Setup</Modal.Title> */}
                                        <div>
                                            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                                                <div style={{ marginRight: '10px' }}>
                                                    <img src={logoRelocationHistory} style={{ width: '60px', height: '60px' }}/>
                                                </div>
                                                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Relocation History</div>
                                                    <div><span style={{color: "blue"}}>{(totalQtyRelocationHistory * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostRelocationHistory.toFixed(2)}</span></div>
                                                </div> 
                                            </div>
                                        </div>
                                    </Modal.Header>

                                    <Modal.Body>
                                        
                                        <div>
                                            <Modal show={showRelocationHistory} onHide={handleCloseRelocationHistory} centered >

                                                <Modal.Header closeButton>
                                                    <Modal.Title>Relocation History</Modal.Title>
                                                </Modal.Header>


                                                <Modal.Body>
                                                    <div className="col-md-12">
                                                        <Form.Group className="row" controlId="validation_NewLocation">
                                                            <label className="col-sm-4 col-form-label down left">New Location:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={NewLocation} 
                                                                    onChange={(e) => setNewLocation(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_NewLocDesc">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">New Loc Desc:</label>
                                                            <div className="col-sm-8">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={NewLocDesc} 
                                                                    onChange={(e) => setNewLocDesc(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_Reason">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Reason:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={Reason} 
                                                                    onChange={(e) => setReason(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_AuditUser">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Audit User:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={AuditUser} 
                                                                    onChange={(e) => setAuditUser(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_AuditDate">
                                                            <label className="col-sm-4 col-form-label labelTopEmail down left">Audit Date:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control        
                                                                    style={{ fontSize: "13px", height: "38px" }}                                    
                                                                    type="datetime-local"  
                                                                    value={AuditDate} 
                                                                    onChange={(e) => setAuditDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>
                                                    
                                                </Modal.Body>
                                                

                                                <Modal.Footer>

                                                    <Button variant="secondary" onClick={handleCloseRelocationHistory}>Close</Button>
                                                    <Button variant="primary" onClick={handleAddButtonClickRelocationHistory}>
                                                    {/* {Button_save} */}
                                                    Submit
                                                    </Button>
                                                </Modal.Footer>

                                            </Modal>


                                            {showModalRelocationHistory && (
                                            <Modal show={showModalRelocationHistory} onHide={handleCloseModalRelocationHistory} centered >

                                            <Modal.Header closeButton>
                                                <Modal.Title>Relocation History</Modal.Title>
                                            </Modal.Header>


                                            <Modal.Body>
                                                <div className="col-md-12">
                                                    <Form.Group className="row" controlId="validation_NewLocation">
                                                        <label className="col-sm-4 col-form-label down">New Location:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={NewLocation} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_NewLocDesc">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">New Loc Desc:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={NewLocDesc} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_Reason">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Reason:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={Reason} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_AuditUser">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Audit User:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={AuditUser} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_AuditDate">
                                                        <label className="col-sm-4 col-form-label labelTopEmail down">Audit Date:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="datetime-local"  
                                                            value ={AuditDate} 
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
                                                <tr>{renderTableHeaderRelocationHistory()}</tr>
                                            </thead>
                                            <tbody>{renderTableRowsRelocationHistory()}</tbody>
                                            </table>
                                        </div>

                                    </Modal.Body>

                                </Modal>
                            </div>

                                {/******************** Check List ********************/}
                            <div>
                                <Modal show={CheckListShow} onHide={CheckListhandleClose} centered size="xl">

                                    <Modal.Header closeButton>
                
                                        {/* <Modal.Title>PM Setup</Modal.Title> */}
                                        <div>
                                            <div className="template-demo" style={{ display: 'flex', alignItems: 'center' }}>

                                                <div style={{ marginRight: '10px' }}>
                                                    <img src={logoCheckList} style={{ width: '60px', height: '60px' }}/>
                                                </div>
                                                <div className="template-demo" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ marginRight: '10px', fontWeight: 'bold'}}>Check List</div>
                                                    <div><span style={{color: "blue"}}>{(totalQtyCheckList * 1).toFixed(2)}</span> Total Parts Costing <span style={{color: "#19d895"}}>${totalCostCheckList.toFixed(2)}</span></div>
                                                </div> 
                                            </div>
                                        </div>
                                    </Modal.Header>

                                    <Modal.Body>
                                   
                                        <div>
                                            <Modal show={showCheckList} onHide={handleCloseCheckList} centered >

                                                <Modal.Header closeButton>
                                                    <Modal.Title>Check List</Modal.Title>
                                                </Modal.Header>


                                                <Modal.Body>
                                                    <div className="col-md-12">
                                                        <Form.Group className="row" controlId="validation_CheckListCode">
                                                            <label className="col-sm-4 col-form-label down left">Check List Code:</label>
                                                            <div className="col-sm-8 form-label">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={CheckListCode} 
                                                                    onChange={(e) => setCheckListCode(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_CheckListDescription">
                                                            <label className="col-sm-4 col-form-label labelTopAsset down left">Check List Description:</label>
                                                            <div className="col-sm-8">
                                                            <label className="col-sm-10 form-label">
                                                                <Form.Control  
                                                                    style={{ fontSize: "13px", height: "38px" }}
                                                                    type="text"  
                                                                    value={CheckListDescription} 
                                                                    onChange={(e) => setCheckListDescription(e.target.value)}
                                                                    />
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-12 moveUpPopUp">
                                                        <Form.Group className="row" controlId="validation_CarryToWorkOrder">
                                                            <label className="col-sm-5 col-form-label left down">Carry To Work Order:</label>
                                                            <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft-sm">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" 
                                                                className="form-check-input"
                                                                checked={CarryToWorkOrder}
                                                                onChange={handleOnChangeCarryToWorkOrder}
                                                                />
                                                                <i className="input-helper"></i>
                                                            </label>
                                                            </div>
                                                        </Form.Group>
                                                    </div>
                                                </Modal.Body>
                                                

                                                <Modal.Footer>

                                                    <Button variant="secondary" onClick={handleCloseCheckList}>Close</Button>
                                                    <Button variant="primary" onClick={handleAddButtonClickCheckList}>
                                                    {/* {Button_save} */}
                                                    Submit
                                                    </Button>
                                                </Modal.Footer>

                                            </Modal>


                                            {showModalCheckList && (
                                            <Modal show={showModalCheckList} onHide={handleCloseModalCheckList} centered >

                                            <Modal.Header closeButton>
                                                <Modal.Title>Check List</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <div className="col-md-12">
                                                    <Form.Group className="row" controlId="validation_CheckListCode">
                                                        <label className="col-sm-4 col-form-label down">Check List Code:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={CheckListCode} 
                                                            readOnly
                                                            />
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_CheckListDescription">
                                                        <label className="col-sm-4 col-form-label labelTopAsset down">Check List Description:</label>
                                                        <div className="col-sm-8 form-check">
                                                        <label className="col-sm-10 form-label">
                                                            <Form.Control
                                                            style={{ fontSize: "13px", height: "38px" }}
                                                            type="text"
                                                            value ={CheckListDescription} 
                                                            readOnly
                                                            />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                        </div>
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-12 moveUp">
                                                    <Form.Group className="row" controlId="validation_CarryToWorkOrder">
                                                        <label className="col-sm-5 col-form-label labelTopAsset down">Carry To Work Order:</label>
                                                        <div className="col-sm-6 form-check checkBoxLeft-md checkBoxLeft-sm">
                                                        <label className="form-check-label">
                                                            <input
                                                                style={{ fontSize: "13px", height: "38px" }}
                                                                type="checkbox" 
                                                                checked={CarryToWorkOrder} 
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
                                                <tr>{renderTableHeaderCheckList()}</tr>
                                            </thead>
                                            <tbody>{renderTableRowsCheckList()}</tbody>
                                            </table>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                            <button type="button" style={{ padding: '5px 10px', background: 'none', color: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            onClick={handleShowCheckList}>
                                                + Add Check List
                                            </button>
                                        </div>
                                    </Modal.Body>

                                </Modal>
                            </div>

                            <div className="row">

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_AssetNo">
                                        <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Asset No:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                        <div className="col-sm-7 StatusBox-md StatusBox-sm">
                                            <Form.Control className='formControl' type="text" value={AssetNo} onChange={(e) => {setAssetNo(e.target.value); handleInputChange();}}  disabled={AssetNo_disabled}/>
                                        </div>
                                        <Tooltip
                                            placement="bottom"
                                            overlay={renderTooltipAssetHistory}>
                                            <i type="button" 
                                            //title='Asset History'
                                            className="icon mdi mdi-dots-vertical StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm" 
                                            onClick={handleToggleList}
                                            ></i>
                                        </Tooltip>
                                    </Form.Group>
                                    <Collapse in={showList}>
                                        <Card className="float-left dotslist dotslist-md dotslist-sm">
                                        {/* <Card.Header className="p-1" style={{ fontSize: "14px" }}><i className='mdi mdi-settings'></i> Hide Block Settings</Card.Header> */}
                                        <Card.Body className="p-2">
                                            <div className='AstIcon'><label type="button" className='DotslistIconDown' onClick={PMSetuphandleShow}><i className='mdi mdi-clock'></i> PM Setup</label></div>
                                            <div className='AstIcon'><label type="button" className='DotslistIconDown' onClick={WOHistoryhandleShow}><i className='mdi mdi-checkbox-multiple-blank'></i> WO History</label></div>
                                            <div className='AstIcon'><label type="button" className='DotslistIconDown' onClick={RelocationHistoryhandleShow}><i className='mdi mdi-table'></i> Relocation History</label></div>
                                            <div className='AstIcon'><label type="button" className='DotslistIconDown' onClick={CheckListhandleShow}><i className='mdi mdi-format-list-bulleted'></i> Check list</label></div>
                                        </Card.Body>
                                        </Card>
                                    </Collapse>
                                </div>


                                <div className="col-md-6 moveUp-md moveUp-sm">
                                    <Form.Group className="row" controlId="validation_AssetStatus">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Asset Status:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                        <div className="col-sm-7 StatusBox-md StatusBox-sm">
                                            <Select  
                                                isClearable={true}  
                                                options={AssetStatus}
                                                //getOptionLabel={(option) => option.label}
                                                //getOptionValue={(option) => option.value}
                                                value={selected_AssetStatus}
                                                onChange={value => {
                                                    setSelected_AssetStatus(value);
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
                                        <Tooltip
                                            placement="bottom"
                                            overlay={renderTooltipStatusAudit}>
                                            <i type="button" 
                                            //title='Status Audit'
                                            className="icon mdi mdi-information-outline StatusAuditbuttonDown StatusAuditbuttonDown-md StatusAuditbuttonDown-sm" 
                                            onClick={StatushandleShow}
                                            ></i>
                                        </Tooltip>
                                    </Form.Group>                        
                                </div>

                            </div>

                            <div className="row moveUp moveUp-md">

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_ShortDesc">                                  
                                        <Form.Label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Short Description:<span style={{color: "red"}} class="required-asterisk">* </span></Form.Label>
                                        <div className="col-sm-8">
                                        <Form.Control as="textarea" rows={5} value={ShortDesc} onChange={(e) => {setShortDesc(e.target.value); handleInputChange();}}/>
                                        <Form.Control.Feedback type="invalid">Please provide Short Description </Form.Control.Feedback>
                                        </div>
                                        
                                    </Form.Group>
                                </div>

                                <div className='col'>
                                    <div className="col-md-13 moveUpNote-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_AssetNo">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Critical Factor:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_CriticalFactor}
                                                    onChange={value => {
                                                        setSelected_CriticalFactor(value);
                                                        handleInputChange();
                                                      }}
                                                    options={CriticalFactor}
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

                                    <div className="col-md-13 moveUp moveUp-sm">
                                        <Form.Group className="row" controlId="validation_PermanentID">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Permanent ID:</label>
                                            <div className="col-sm-8">
                                                <Form.Control type="text" className='formControl' value={PermanentID} onChange={(e) => {setPermanentID(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="row moveUpLongDesc moveUp-md">

                                <div className="col-md-12">                                
                                    <Form.Group className="row" controlId="validation_LongDesc">
                                        <Form.Label className="col-sm-2 col-form-label labelTop down" style={{ fontSize: "13px" }}>Long Description:</Form.Label>
                                        <div className="col-sm-10 EmpleftRemark-md Empleft-ms">
                                        <Form.Control className='formControlBox' as="textarea" rows={6} value={LongDesc} onChange={(e) => {setLongDesc(e.target.value); handleInputChange();}}/>
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

                            {/* ************************************* Details ******************************************* */}
                            
                            <Tab eventKey="Details" title={<><i className="mdi mdi-information"></i><span className="d-none d-md-inline"> Details</span></>} class="nav nav-tabs nav-item nav-link active">
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Asset Type:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select
                                                isClearable={true}       
                                                // isMulti                        
                                                value={selected_AssetType}
                                                onChange={value => {
                                                    setSelected_AssetType(value);
                                                    handleInputChange();
                                                  }}
                                                options={AssetType}
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
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Work Area:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select                                                
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_WorkArea}
                                                    onChange={value => {
                                                        setSelected_WorkArea(value);
                                                        handleInputChange();
                                                      }}
                                                    options={WorkArea}
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
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Asset Code:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select
                                                isClearable={true}       
                                                //isMulti                        
                                                value={selected_Assetcode}
                                                onChange={value => {
                                                    setSelected_Assetcode(value);
                                                    handleInputChange();
                                                  }}
                                                options={Assetcode}
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
                                        <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Asset Location:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                                <div className="col-sm-8">
                                                <Select
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_AssetLocation}
                                                    onChange={value => {
                                                        setSelected_AssetLocation(value);
                                                        handleInputChange();
                                                      }}
                                                    options={AssetLocation}
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
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Asset Group Code:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="select" placeholder="Search Here"  value={selected_AssetGroupCode} onClick={handleShow} />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Level:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_AssetLevel}
                                                    onChange={value => {
                                                        setSelected_AssetLevel(value);
                                                        handleInputChange();
                                                      }}
                                                    options={AssetLevel}
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
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Cost Center:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select
                                                    
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_CostCenter}
                                                    onChange={value => {
                                                        setSelected_CostCenter(value);
                                                        handleInputChange();
                                                      }}
                                                    options={CostCenter}
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
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Work Group:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Select
                                            isClearable={true}       
                                            //isMulti                        
                                            value={selected_WorkGroup}
                                            onChange={value => {
                                                setSelected_WorkGroup(value);
                                                handleInputChange();
                                              }}
                                            options={WorkGroup}
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

                                    <div className="col-md-1">
                                        <div className="form-check AssetParentFlagBox-sm">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={ParentFlag}
                                                onChange={value => {
                                                    handleOnChange(value);
                                                    handleInputChange();
                                                  }}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>              
                                    </div>

                                    <div className="col-md-5">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Parent Flage:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text"  value={selected_ParentFlag} disabled ={ParentFlag} onClick={ParentFlag_handleShow}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Parent ID:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={PerentID} onChange={(e) => {setPerentID(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Safety Requirement:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={SafetyRequirement} onChange={(e) => {setSafetyRequirement(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Barcode Print Count:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" placeholder="0" value={BarCode_Print_count} onChange={(e) => {setBarCode_Print_count(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Manufacturer:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={Manufacturer} onChange={(e) => {setManufacturer(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Model:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={Asset_Model} onChange={(e) => {setAsset_Model(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>


                                <div className="page-header">
                                    <h3 className="page-title">
                                        Financial
                                    </h3> 
                                </div> 

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Asset Cost:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" placeholder=".000"  value={AssetCost} onChange={(e) =>{ setAssetCost(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Purchase Date:</label>
                                            <div className="col-sm-8">
                                            <Form.Control       
                                                className='formControl'                                     
                                                type="datetime-local"
                                                value={PurchaseDate}                                          
                                                onChange={(e) => {setPurchaseDate(e.target.value); handleInputChange();}}  />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Residual Value:</label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="number" placeholder="1.0" step="0.01" min="0" max="10" value={ResidualValue} onChange={(e) => {setResidualValue(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Warranty End Date:</label>
                                            <div className="col-sm-8">
                                            <Form.Control           
                                                className='formControl'                                 
                                                type="datetime-local"  
                                                value={WarrantyDate} 
                                                onChange={(e) => {setWarrantyDate(e.target.value); handleInputChange();}}                                          
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Expected Life (Year):</label>
                                            <div className="col-sm-8">
                                            <DatePicker 
                                                className='formControlExpectedLifeDate'  
                                                selected={ExpectedLifeDate}
                                                onChange={date => {setExpectedLifeDate(date); handleInputChange();}} 
                                                showYearPicker
                                                dateFormat="yyyy"
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Customer Code:</label>
                                            <div className="col-sm-8">
                                                <Select
                                            
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_CustomerCode}
                                                    onChange={value => {
                                                        setSelected_CustomerCode(value);
                                                        handleInputChange();
                                                      }}
                                                    options={CustomerCode}
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
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Depreciation Method:</label>
                                            <div className="col-sm-8">
                                            <Select
                                            isClearable={true}  
                                            value={selected_DepreciationMethod}
                                            onChange={value => {
                                                setSelected_DepreciationMethod(value);
                                                handleInputChange();
                                              }}
                                            options={DepreciationMethod}
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


                                <div className="page-header">
                                    <h3 className="page-title">
                                        Depreciation and Disposal Details
                                    </h3> 
                                </div> 

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Depreciation Date:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={DepreciationDate} onChange={(e) => {setDepreciationDate(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Updated By:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UpdateBy} onChange={(e) => {setUpdateBy(e.target.value); handleInputChange();}}  readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Acc.Depreciation:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={Acc_Depreciation} onChange={(e) => {setAcc_Depreciation(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Netbook Value:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text"value={NetbookValue} onChange={(e) => {setNetbookValue(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp moveUp-md moveUp-sm">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Disposal Date:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={DisposalDate} onChange={(e) => {setDisposalDate(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Disposal By:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={DisposalBy} onChange={(e) => {setDisposalBy(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Disposal type:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={DisposalType} onChange={(e) => {setDisposalType(e.target.value); handleInputChange();}} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Disposal Value:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={DisposalValue} onChange={(e) => {setDisposalValue(e.target.value); handleInputChange();}} readOnly />
                                            </div>
                                        </Form.Group>
                                    </div>                             
                                </div>


                                <div className="page-header">
                                    <h3 className="page-title">
                                        Maintenance Cost
                                    </h3> 
                                </div> 

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Labour Cost:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Material Cost:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Contract Cost:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text"  readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Total:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                            </Tab>

                            {/* ************************************* UDF ******************************************* */}
                            <Tab eventKey="UDF" title={<><i className="mdi mdi-calendar-text"></i><span className="d-none d-md-inline"> UDF</span></>} class="nav-link active">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "12px" }}>UDF Text1:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text"  value={UDFText_1} onChange={(e) => {setUDFText_1(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric1:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={UDFNumber_1} onChange={(e) => {setUDFNumber_1(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date1:</label>
                                            <div className="col-sm-8">
                                            <Form.Control 
                                                className='formControl'   
                                                type="datetime-local"   
                                                selected={UDFDate_1} 
                                                onChange={date => {setUDFDate_1(date); handleInputChange();}} 
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text2:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_2} onChange={(e) => {setUDFText_2(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric2:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={UDFNumber_2} onChange={(e) => {setUDFNumber_2(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date2:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                        
                                                type="datetime-local"  
                                                selected={UDFDate_2} 
                                                onChange={date => {setUDFDate_2(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text3:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_3} onChange={(e) => {setUDFText_3(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric3:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_3} onChange={(e) => {setUDFNumber_3(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date3:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                        
                                                type="datetime-local"  
                                                selected={UDFDate_3} 
                                                onChange={date => {setUDFDate_3(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text4:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_4} onChange={(e) => {setUDFText_4(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric4:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_4} onChange={(e) => {setUDFNumber_4(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date4:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                        
                                                type="datetime-local"   
                                                selected={UDFDate_4} 
                                                onChange={date => {setUDFDate_4(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text5:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_5} onChange={(e) => {setUDFText_5(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric5:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_5} onChange={(e) => {setUDFNumber_5(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date5:</label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'                                           
                                                type="datetime-local"  
                                                selected={UDFDate_5} 
                                                onChange={date => {setUDFDate_5(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text6:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_6} onChange={(e) => {setUDFText_6(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric6:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_6} onChange={(e) => {setUDFNumber_6(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date6:</label>
                                            <div className="col-sm-8">
                                            <Form.Control 
                                                className='formControl'                                            
                                                type="datetime-local"  
                                                selected={UDFDate_6} 
                                                onChange={date => {setUDFDate_6(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text7:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_7} onChange={(e) => {setUDFText_7(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric7:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_7} onChange={(e) => {setUDFNumber_7(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date7:</label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'                                           
                                                type="datetime-local"   
                                                selected={UDFDate_7} 
                                                onChange={date => {setUDFDate_7(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text8:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_8} onChange={(e) => {setUDFText_8(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric8:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number" value={UDFNumber_8} onChange={(e) => {setUDFNumber_8(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date8:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                         
                                                type="datetime-local"  
                                                selected={UDFDate_8} 
                                                onChange={date => {setUDFDate_8(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text9:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_9} onChange={(e) => {setUDFText_9(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric9:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="number"  value={UDFNumber_9} onChange={(e) => {setUDFNumber_9(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date9:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                         
                                                type="datetime-local"   
                                                selected={UDFDate_9} 
                                                onChange={date => {setUDFDate_9(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text10:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl'  type="text" value={UDFText_10} onChange={(e) => {setUDFText_10(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric10:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_10} onChange={(e) => {setUDFNumber_10(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date10:</label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'                                          
                                                type="datetime-local"   
                                                selected={UDFDate_10} 
                                                onChange={date => {setUDFDate_10(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>   



                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text11:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_11} onChange={(e) => {setUDFText_11(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric11:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_11} onChange={(e) => {setUDFNumber_11(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date11:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                      
                                                type="datetime-local"   
                                                selected={UDFDate_11} 
                                                onChange={date => {setUDFDate_11(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text12:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_12} onChange={(e) => {setUDFText_12(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric12:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_12} onChange={(e) => {setUDFNumber_12(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date12:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"  
                                                selected={UDFDate_12} 
                                                onChange={date => {setUDFDate_12(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text13:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_13} onChange={(e) => {setUDFText_13(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric13:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_13} onChange={(e) => {setUDFNumber_13(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date13:</label>
                                            <div className="col-sm-8">
                                            <Form.Control 
                                                className='formControl'                                           
                                                type="datetime-local"  
                                                selected={UDFDate_13} 
                                                onChange={date => {setUDFDate_13(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text14:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_14} onChange={(e) => {setUDFText_14(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric14:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_14} onChange={(e) => {setUDFNumber_14(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date14:</label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                className='formControl'                                          
                                                type="datetime-local"   
                                                selected={UDFDate_14} 
                                                onChange={date => {setUDFDate_14(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text15:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_15} onChange={(e) => {setUDFText_15(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric15:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_15} onChange={(e) => {setUDFNumber_15(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date15:</label>
                                            <div className="col-sm-8">
                                            <Form.Control 
                                                className='formControl'                                           
                                                type="datetime-local"   
                                                selected={UDFDate_15} 
                                                onChange={date => {setUDFDate_15(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text16:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_16} onChange={(e) => {setUDFText_16(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric16:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_16} onChange={(e) => {setUDFNumber_16(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date16:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                        
                                                type="datetime-local"  
                                                selected={UDFDate_16} 
                                                onChange={date => {setUDFDate_16(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text17:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_17} onChange={(e) => {setUDFText_17(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric17:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_17} onChange={(e) => {setUDFNumber_17(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date17:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                        
                                                type="datetime-local"    
                                                selected={UDFDate_17} 
                                                onChange={date => {setUDFDate_17(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text18:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_18} onChange={(e) => {setUDFText_18(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric18:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_18} onChange={(e) => {setUDFNumber_18(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date18:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"    
                                                selected={UDFDate_18} 
                                                onChange={date => {setUDFDate_18(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text19:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_19} onChange={(e) => {setUDFText_19(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric19:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_19} onChange={(e) => {setUDFNumber_19(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date19:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"  
                                                selected={UDFDate_19} 
                                                onChange={date => {setUDFDate_19(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text20:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_20} onChange={(e) => {setUDFText_20(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric20:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_20} onChange={(e) => {setUDFNumber_20(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date20:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"  
                                                selected={UDFDate_20} 
                                                onChange={date => {setUDFDate_20(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>    




                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text21:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_21} onChange={(e) => {setUDFText_21(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric21:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_21} onChange={(e) => {setUDFNumber_21(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date21:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                        
                                                type="datetime-local"   
                                                selected={UDFDate_21} 
                                                onChange={date => {setUDFDate_21(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text22:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_22} onChange={(e) => {setUDFText_22(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric22:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_22} onChange={(e) => {setUDFNumber_22(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date22:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"   
                                                selected={UDFDate_22} 
                                                onChange={date => {setUDFDate_22(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text23:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_23} onChange={(e) => {setUDFText_23(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric23:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_23} onChange={(e) => {setUDFNumber_23(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date23:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"   
                                                selected={UDFDate_23} 
                                                onChange={date => {setUDFDate_23(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text24:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={UDFText_24} onChange={(e) => {setUDFText_24(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric24:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_24} onChange={(e) => {setUDFNumber_24(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date24:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                        
                                                type="datetime-local"   
                                                selected={UDFDate_24} 
                                                onChange={date => {setUDFDate_24(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text25:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_25} onChange={(e) => {setUDFText_25(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric25:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_25} onChange={(e) => {setUDFNumber_25(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date25:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"    
                                                selected={UDFDate_25} 
                                                onChange={date => {setUDFDate_25(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text26:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_26} onChange={(e) => {setUDFText_26(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric26:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_26} onChange={(e) => {setUDFNumber_26(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date26:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"   
                                                selected={UDFDate_26} 
                                                onChange={date => {setUDFDate_26(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>     

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text27:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_27} onChange={(e) => {setUDFText_27(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric27:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_27} onChange={(e) => {setUDFNumber_27(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date27:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"    
                                                selected={UDFDate_27} 
                                                onChange={date => {setUDFDate_27(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text28:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="Text"  value={UDFText_28} onChange={(e) => {setUDFText_28(e.target.value); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric28:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number"  value={UDFNumber_28} onChange={(e) => {setUDFNumber_28(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date28:</label>
                                            <div className="col-sm-8">
                                            <Form.Control   
                                                className='formControl'                                         
                                                type="datetime-local"   
                                                selected={UDFDate_28} 
                                                onChange={date => {setUDFDate_28(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text29:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_29} onChange={(e) => {setUDFText_29(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric29:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={UDFNumber_29} onChange={(e) => {setUDFNumber_29(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date29:</label>
                                            <div className="col-sm-8">
                                            <Form.Control     
                                                className='formControl'                                       
                                                type="datetime-local"    
                                                selected={UDFDate_29} 
                                                onChange={date => {setUDFDate_29(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "12px" }}>UDF Text30:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="text" value={UDFText_30} onChange={(e) => {setUDFText_30(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Numeric30:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={UDFNumber_30} onChange={(e) => {setUDFNumber_30(e.target.value); handleInputChange();}}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "12px" }}>UDF Date30:</label>
                                            <div className="col-sm-8">
                                            <Form.Control    
                                                className='formControl'                                        
                                                type="datetime-local"  
                                                selected={UDFDate_30} 
                                                onChange={date => {setUDFDate_30(date); handleInputChange();}} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                
                            </Tab>

                            {/* ************************************* Reference ******************************************* */}
                            <Tab eventKey="Reference" title={<><i className="mdi mdi-folder-upload"></i><span className="d-none d-md-inline"> Reference</span></>} class="nav-link active" >  

                                <Form.Group>
                                    <label>File upload</label>
                                    <div className="custom-file">
                                        <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                                        <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                    </div>
                                </Form.Group>                          
                            </Tab>

                            {/* ************************************* Spares ******************************************* */}
                            <Tab eventKey="Spares" title={<><i className="mdi mdi-view-carousel"></i><span className="d-none d-md-inline"> Spares</span></>} class="nav-link active" >                            
                            
                                <AssetSpares name={'AssetFrom'} data={{RowID: location.state.RowID }}/>

                            </Tab>
                            
                            {/* ************************************* Usage ******************************************* */}
                            <Tab eventKey="Usage" title={<><i className="mdi mdi-source-pull"></i><span className="d-none d-md-inline"> Usage</span></>} class="nav-link active">                            
                            
                                <AssetUsage name={'AssetFrom'} data={{RowID: location.state.RowID }}/>

                            </Tab>

                            {/* ************************************* Specification ******************************************* */}
                            <Tab eventKey="Specification" title={<><i className="mdi mdi-clipboard-text"></i><span className="d-none d-md-inline"> Specification</span></>} class="nav-link active" >                            
                            
                                <AssetSpecification name={'AssetFrom'} data={{RowID: location.state.RowID }}/>

                            </Tab>

                            {/* ************************************* Info ******************************************* */}
                            {/* <Tab eventKey="Info" title={<><i className="mdi mdi-chart-pie"></i><span className="d-none d-md-inline"> Info</span></>} class="nav-link active">                            
                            </Tab> */}

                        </Tabs>
                        
                        
                    </section>
                
                </form>

                <div className="page-header">
                    <h3 className="page-title">
                       
                    </h3>       
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <div className="template-demo">

                                <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                                    <i className="mdi mdi-file-check btn-icon-prepend"></i> {Button_save} 
                                </button>

                                <button type="button" className="btn btn-danger btn-icon-text" onClick={onClickCancel}>
                                    <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                                </button>
                            
                            </div>
                        </ol>
                    </nav>         
                </div>      
              </div>
            </div>
        </div>
    </div>
  )
}

export default AssetFrom


