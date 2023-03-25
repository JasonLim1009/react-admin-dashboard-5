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


    const [UDFNumber_1, setUDFNumber_1] = useState("");
    const [UDFNumber_2, setUDFNumber_2] = useState("");
    const [UDFNumber_3, setUDFNumber_3] = useState("");
    const [UDFNumber_4, setUDFNumber_4] = useState("");
    const [UDFNumber_5, setUDFNumber_5] = useState("");
    const [UDFNumber_6, setUDFNumber_6] = useState("");
    const [UDFNumber_7, setUDFNumber_7] = useState("");
    const [UDFNumber_8, setUDFNumber_8] = useState("");
    const [UDFNumber_9, setUDFNumber_9] = useState("");
    const [UDFNumber_10, setUDFNumber_10] = useState("");

    const [UDFNumber_11, setUDFNumber_11] = useState("");
    const [UDFNumber_12, setUDFNumber_12] = useState("");
    const [UDFNumber_13, setUDFNumber_13] = useState("");
    const [UDFNumber_14, setUDFNumber_14] = useState("");
    const [UDFNumber_15, setUDFNumber_15] = useState("");
    const [UDFNumber_16, setUDFNumber_16] = useState("");
    const [UDFNumber_17, setUDFNumber_17] = useState("");
    const [UDFNumber_18, setUDFNumber_18] = useState("");
    const [UDFNumber_19, setUDFNumber_19] = useState("");
    const [UDFNumber_20, setUDFNumber_20] = useState("");

    const [UDFNumber_21, setUDFNumber_21] = useState("");
    const [UDFNumber_22, setUDFNumber_22] = useState("");
    const [UDFNumber_23, setUDFNumber_23] = useState("");
    const [UDFNumber_24, setUDFNumber_24] = useState("");
    const [UDFNumber_25, setUDFNumber_25] = useState("");
    const [UDFNumber_26, setUDFNumber_26] = useState("");
    const [UDFNumber_27, setUDFNumber_27] = useState("");
    const [UDFNumber_28, setUDFNumber_28] = useState("");
    const [UDFNumber_29, setUDFNumber_29] = useState("");
    const [UDFNumber_30, setUDFNumber_30] = useState("");   


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


        console.log('PARENT FLAG'+ site_ID + selected_asset)
        
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

       

        console.log('select Asset',json)
        
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
                setPurchaseDate( responseJson.data.data[index].ast_det_purchase_date.date )
                setResidualValue( responseJson.data.data[index].ast_det_repl_cost )
                
                setWarrantyDate(responseJson.data.data[index].ast_det_warranty_date.date)
                setExpectedLifeDate( responseJson.data.data[index].ast_det_depr_term )
                setSelected_CustomerCode( {label:responseJson.data.data[index].ast_det_cus_code +" : "+ responseJson.data.data[index].cus_mst_desc} )
                setSelected_DepreciationMethod( {label:responseJson.data.data[index].ast_det_depr_method} )

                setDepreciationDate( responseJson.data.data[index].ast_det_depr_date )
                setUpdateBy( responseJson.data.data[index].ast_det_depr_by )
                setAcc_Depreciation( responseJson.data.data[index].ast_det_acc_depr_cost )
                setNetbookValue( responseJson.data.data[index].ast_det_net_book_value )
                setDisposalDate( responseJson.data.data[index].ast_det_dispose_date )
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

        let site_ID = localStorage.getItem("site_ID");
    
        setParentFlag("Select" +":"+ location.state.select)        
        get_asset_Status(site_ID,"All",location.state.select);       
       

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
            
            "ast_det_datetime1":UDFDate_1,
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

    

  return (   

    <div>
        <div className="page-header">

            <h3 className="page-title">
                Asset Master
            </h3>     

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <div className="template-demo">

                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>

                        <button type="button" className="btn btn-danger btn-icon-text">
                            <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                        </button>
                    
                    </div>
                </ol>
            </nav>       
            
        </div> 

        <div className="col-12 grid-margin">
            <div className="card">
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

                                            <li key={user.label } className="user" onClick={()=>handleSelect(user.label +" : "+ user.value)}  >
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
                            
                            </Modal.Body>

                            {/* <Modal.Footer>

                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleClose}>Submit</Button>

                            </Modal.Footer> */}

                        </Modal>


                    </div> 

                    <div className="row">

                        <div className="col-md-10">

                            <div className="row">

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_AssetNo">
                                        <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset No:</label>
                                        <div className="col-sm-9">
                                            <Form.Control  type="text" value={AssetNo} onChange={(e) => setAssetNo(e.target.value)}  disabled={AssetNo_disabled}/>
                                        </div>

                                      
                                    </Form.Group>
                                </div>


                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_AssetStatus">
                                        <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Status:</label>
                                        <div className="col-sm-9">
                                            <Select  
                                                isClearable={true}  
                                                options={AssetStatus}
                                                //getOptionLabel={(option) => option.label}
                                                //getOptionValue={(option) => option.value}
                                                value={selected_AssetStatus}
                                                onChange={setSelected_AssetStatus} // using id as it is unique
                                                required
                                            />
                                        </div>
                                    </Form.Group>                        
                                </div>

                                
                            </div>

                            <div className="row">

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_ShortDesc">                                  
                                        <Form.Label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Short Description:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" rows={5} value={ShortDesc} onChange={(e) => setShortDesc(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">Please provide Short Description </Form.Control.Feedback>
                                        </div>
                                        
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_AssetNo">
                                        <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Critical Factor :</label>
                                        <div className="col-sm-9">
                                            <Select
                                            
                                                isClearable={true}       
                                                //isMulti                        
                                                value={selected_CriticalFactor}
                                                onChange={setSelected_CriticalFactor}
                                                options={CriticalFactor}
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                
                            

                                
                            </div>

                            <div className="row">

                                <div className="col-md-6">                                
                                    <Form.Group className="row" controlId="validation_LongDesc">
                                        <Form.Label className="col-sm-3 col-form-label">Long Description:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" rows={5} value={LongDesc} onChange={(e) => setLongDesc(e.target.value)}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="row" controlId="validation_PermanentID">
                                        <label className="col-sm-3 col-form-label">Permanent ID</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text"  value={PermanentID} onChange={(e) => setPermanentID(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>
                                
                            </div>

                        

                        </div>

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
                                    <img src={require("../../assets/images/product_images_2/thumb_image5.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image6.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image7.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image8.jpg")} className="sliderimg" alt=""/>                                    
                                    <img src={require("../../assets/images/product_images_2/thumb_image9.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image10.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image11.jpg")} className="sliderimg" alt=""/>
                                    <img src={require("../../assets/images/product_images_2/thumb_image12.jpg")} className="sliderimg" alt=""/>
                                    
                                    </AliceCarousel>
                                    
                            </div>

                        
                            
                        </div>
                    

                        
                    </div>  

                    <section id="tab-menus">

                        <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-4">

                            <Tab eventKey="Details" title="Details" class="nav nav-tabs nav-item nav-link active">
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Type:</label>
                                            <div className="col-sm-9">
                                            <Select
                                            
                                                isClearable={true}       
                                                // isMulti                        
                                                value={selected_AssetType}
                                                onChange={setSelected_AssetType}
                                                options={AssetType}
                                            />
                                                
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Area:</label>
                                            <div className="col-sm-9">
                                                <Select                                                
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_WorkArea}
                                                    onChange={setSelected_WorkArea}
                                                    options={WorkArea}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Code:</label>
                                        <div className="col-sm-9">
                                        <Select
                                        
                                            isClearable={true}       
                                            //isMulti                        
                                            value={selected_Assetcode}
                                            onChange={setSelected_Assetcode}
                                            options={Assetcode}
                                        />
                                        </div>
                                    </Form.Group>
                                </div>      
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Location:</label>
                                            <div className="col-sm-9">
                                            <Select
                                            
                                                isClearable={true}       
                                                //isMulti                        
                                                value={selected_AssetLocation}
                                                onChange={setSelected_AssetLocation}
                                                options={AssetLocation}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Group Code:</label>
                                            <div className="col-sm-9">
                                            <Form.Control  type="select" className="form-control" placeholder="Search Here"  value={selected_AssetGroupCode} onClick={handleShow} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Level:</label>
                                            <div className="col-sm-9">
                                                <Select
                                            
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_AssetLevel}
                                                    onChange={setSelected_AssetLevel}
                                                    options={AssetLevel}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Cost Center:</label>
                                            <div className="col-sm-9">
                                                <Select
                                                    
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_CostCenter}
                                                    onChange={setSelected_CostCenter}
                                                    options={CostCenter}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Group:</label>
                                            <div className="col-sm-9">
                                            <Select
                                            
                                            isClearable={true}       
                                            //isMulti                        
                                            value={selected_WorkGroup}
                                            onChange={setSelected_WorkGroup}
                                            options={WorkGroup}
                                        />
                                            </div>
                                        </Form.Group>
                                    </div>  
                                    
                                </div>

                                <div className="row">

                                    <div className="col-md-1">
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={ParentFlag}
                                                onChange={handleOnChange}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>              
                                    </div>

                                    <div className="col-md-5">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Parent Flage:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text"  value={selected_ParentFlag} disabled ={ParentFlag} onClick={ParentFlag_handleShow}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Parent ID:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={PerentID} onChange={(e) => setPerentID(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Safety Requirement:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={SafetyRequirement} onChange={(e) => setSafetyRequirement(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Barcode Print Count:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" placeholder="0" value={BarCode_Print_count} onChange={(e) => setBarCode_Print_count(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Manufacturer:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={Manufacturer} onChange={(e) => setManufacturer(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Model:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={Asset_Model} onChange={(e) => setAsset_Model(e.target.value)} />
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
                                            <label className="col-sm-3 col-form-label">Asset Cost:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" placeholder=".000"  value={AssetCost} onChange={(e) => setAssetCost(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Purchase Date:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"
                                                value={PurchaseDate}                                          
                                                onChange={(e) => setPurchaseDate(e.target.value)}  />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Residual Value:</label>
                                            <div className="col-sm-9">
                                            <Form.Control  type="number" placeholder="1.0" step="0.01" min="0" max="10" value={ResidualValue} onChange={(e) => setResidualValue(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Warranty End Date:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                value={WarrantyDate} 
                                                onChange={(e) => setWarrantyDate(e.target.value)}                                          
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Expected Life (Year):</label>
                                            <div className="col-sm-9">
                                            <DatePicker 
                                                selected={ExpectedLifeDate}
                                                onChange={date => setExpectedLifeDate(date)} 
                                                showYearPicker
                                                dateFormat="yyyy"
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Customer Code:</label>
                                            <div className="col-sm-9">
                                                <Select
                                            
                                                    isClearable={true}       
                                                    //isMulti                        
                                                    value={selected_CustomerCode}
                                                    onChange={setSelected_CustomerCode}
                                                    options={CustomerCode}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Depreciation Method:</label>
                                            <div className="col-sm-9">
                                            <Select
                                            
                                            isClearable={true}  
                                            value={selected_DepreciationMethod}
                                            onChange={setSelected_DepreciationMethod}
                                            options={DepreciationMethod}
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
                                            <label className="col-sm-3 col-form-label">Depreciation Date:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={DepreciationDate} onChange={(e) => setDepreciationDate(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Updated By:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={UpdateBy} onChange={(e) => setUpdateBy(e.target.value)}  readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Acc.Depreciation:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={Acc_Depreciation} onChange={(e) => setAcc_Depreciation(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Netbook Value:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text"value={NetbookValue} onChange={(e) => setNetbookValue(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Disposal Date:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={DisposalDate} onChange={(e) => setDisposalDate(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Disposal By:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={DisposalBy} onChange={(e) => setDisposalBy(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Disposal type:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={DisposalType} onChange={(e) => setDisposalType(e.target.value)} readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                        <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Disposal Value:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={DisposalValue} onChange={(e) => setDisposalValue(e.target.value)} readOnly />
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
                                            <label className="col-sm-3 col-form-label">Labour Cost:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text"  readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Material Cost:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text"   readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Contract Cost:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text"  readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Total:</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" readOnly/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    
                                </div>

                                


                                
                            </Tab>

                            <Tab eventKey="UDF" title="UDF" class="nav-link active">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text1:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text"  value={UDFText_1} onChange={(e) => setUDFText_1(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric1:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_1} onChange={(e) => setUDFNumber_1(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date1:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_1} 
                                                onChange={date => setUDFDate_1(date)} 
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text2:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_2} onChange={(e) => setUDFText_2(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric2:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_2} onChange={(e) => setUDFNumber_2(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date2:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_2} 
                                                onChange={date => setUDFDate_2(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text3:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_3} onChange={(e) => setUDFText_3(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric3:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_3} onChange={(e) => setUDFNumber_3(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date3:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_3} 
                                                onChange={date => setUDFDate_3(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text4:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_4} onChange={(e) => setUDFText_4(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric4:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_4} onChange={(e) => setUDFNumber_4(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date4:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_4} 
                                                onChange={date => setUDFDate_4(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text5:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_5} onChange={(e) => setUDFText_5(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric5:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_5} onChange={(e) => setUDFNumber_5(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date5:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_5} 
                                                onChange={date => setUDFDate_5(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text6:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_6} onChange={(e) => setUDFText_6(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric6:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_6} onChange={(e) => setUDFNumber_6(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date6:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_6} 
                                                onChange={date => setUDFDate_6(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text7:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_7} onChange={(e) => setUDFText_7(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric7:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_7} onChange={(e) => setUDFNumber_7(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date7:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_7} 
                                                onChange={date => setUDFDate_7(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text8:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_8} onChange={(e) => setUDFText_8(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric8:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_8} onChange={(e) => setUDFNumber_8(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date8:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_8} 
                                                onChange={date => setUDFDate_8(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text9:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_9} onChange={(e) => setUDFText_9(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric9:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_9} onChange={(e) => setUDFNumber_9(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date9:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_9} 
                                                onChange={date => setUDFDate_9(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text10:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_10} onChange={(e) => setUDFText_10(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric10:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_10} onChange={(e) => setUDFNumber_10(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date10:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_10} 
                                                onChange={date => setUDFDate_10(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>   



                                    <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text11:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_11} onChange={(e) => setUDFText_11(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric11:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_11} onChange={(e) => setUDFNumber_11(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date11:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_11} 
                                                onChange={date => setUDFDate_11(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text12:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_12} onChange={(e) => setUDFText_12(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric12:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_12} onChange={(e) => setUDFNumber_12(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date12:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_12} 
                                                onChange={date => setUDFDate_12(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text13:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_13} onChange={(e) => setUDFText_13(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric13:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_13} onChange={(e) => setUDFNumber_13(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date13:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_13} 
                                                onChange={date => setUDFDate_13(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text14:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_14} onChange={(e) => setUDFText_14(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric14:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_14} onChange={(e) => setUDFNumber_14(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date14:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_14} 
                                                onChange={date => setUDFDate_14(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text15:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_15} onChange={(e) => setUDFText_15(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric15:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_15} onChange={(e) => setUDFNumber_15(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date15:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_15} 
                                                onChange={date => setUDFDate_15(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text16:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_16} onChange={(e) => setUDFText_16(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric16:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_16} onChange={(e) => setUDFNumber_16(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date16:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_16} 
                                                onChange={date => setUDFDate_16(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text17:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_17} onChange={(e) => setUDFText_17(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric17:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_17} onChange={(e) => setUDFNumber_17(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date17:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"    
                                                selected={UDFDate_17} 
                                                onChange={date => setUDFDate_17(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text18:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_18} onChange={(e) => setUDFText_18(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric18:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_18} onChange={(e) => setUDFNumber_18(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date18:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"    
                                                selected={UDFDate_18} 
                                                onChange={date => setUDFDate_18(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text19:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_19} onChange={(e) => setUDFText_19(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric19:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_19} onChange={(e) => setUDFNumber_19(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date19:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_19} 
                                                onChange={date => setUDFDate_19(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text20:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_20} onChange={(e) => setUDFText_20(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric20:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_20} onChange={(e) => setUDFNumber_20(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date20:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_20} 
                                                onChange={date => setUDFDate_20(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>    




                                    <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text21:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_21} onChange={(e) => setUDFText_21(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric21:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_21} onChange={(e) => setUDFNumber_21(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date21:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_21} 
                                                onChange={date => setUDFDate_21(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text22:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_22} onChange={(e) => setUDFText_22(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric22:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_22} onChange={(e) => setUDFNumber_22(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date22:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_22} 
                                                onChange={date => setUDFDate_22(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text23:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_23} onChange={(e) => setUDFText_23(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric23:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_23} onChange={(e) => setUDFNumber_23(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date23:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_23} 
                                                onChange={date => setUDFDate_23(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text24:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFText_24} onChange={(e) => setUDFText_24(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric24:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_24} onChange={(e) => setUDFNumber_24(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date24:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_24} 
                                                onChange={date => setUDFDate_24(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text25:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_25} onChange={(e) => setUDFText_25(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeri25:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_25} onChange={(e) => setUDFNumber_25(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date25:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"    
                                                selected={UDFDate_25} 
                                                onChange={date => setUDFDate_25(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text26:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_26} onChange={(e) => setUDFText_26(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric26:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_26} onChange={(e) => setUDFNumber_26(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date26:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_26} 
                                                onChange={date => setUDFDate_26(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>     

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text27:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_27} onChange={(e) => setUDFText_27(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric27:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_27} onChange={(e) => setUDFNumber_27(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date27:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"    
                                                selected={UDFDate_27} 
                                                onChange={date => setUDFDate_27(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text28:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="Text"  value={UDFText_28} onChange={(e) => setUDFText_28(e.target.value)} />
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric28:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number"  value={UDFNumber_28} onChange={(e) => setUDFNumber_28(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date28:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"   
                                                selected={UDFDate_28} 
                                                onChange={date => setUDFDate_28(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text29:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_29} onChange={(e) => setUDFText_29(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric29:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_29} onChange={(e) => setUDFNumber_29(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date29:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"    
                                                selected={UDFDate_29} 
                                                onChange={date => setUDFDate_29(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Text30:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="text" value={UDFText_30} onChange={(e) => setUDFText_30(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>   

                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Numeric30:</label>
                                            <div className="col-sm-9">
                                                <Form.Control  type="number" value={UDFNumber_30} onChange={(e) => setUDFNumber_30(e.target.value)}/>
                                            </div>
                                        </Form.Group>
                                    </div>    


                                        <div className="col-md-4">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">UDF Date30:</label>
                                            <div className="col-sm-9">
                                            <Form.Control                                            
                                                type="datetime-local"  
                                                selected={UDFDate_30} 
                                                onChange={date => setUDFDate_30(date)} />
                                            </div>
                                        </Form.Group>
                                    </div>    

                                </div>  

                                
                            </Tab>

                            <Tab eventKey="Reference" title="Reference" class="nav-link active" >  

                                <Form.Group>
                                    <label>File upload</label>
                                    <div className="custom-file">
                                        <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                                        <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                    </div>
                                </Form.Group>                          
                            </Tab>

                            <Tab eventKey="Spares" title="Spares" class="nav-link active" >                            
                            </Tab>

                            <Tab eventKey="Usage" title="Usage" class="nav-link active">                            
                            </Tab>

                            <Tab eventKey="Specification" title="Specification" class="nav-link active" >                            
                            </Tab>

                            <Tab eventKey="Info" title="Info" class="nav-link active">                            
                            </Tab>

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

                                <button type="button" className="btn btn-danger btn-icon-text">
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


