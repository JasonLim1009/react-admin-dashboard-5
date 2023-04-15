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
import  { useLocation, useHistory }  from 'react-router-dom';
import Moment from 'moment';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import moment from 'moment';

import '../style.css';
import WorkRequestList1 from "../tables/WorkRequestList1";
import WorkRequestList2 from "../tables/WorkRequestList2";

const WorkRequestForm = (props) => {

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
    const history = useHistory();
    const [edited, setEdited] = useState(false);


    const [WorkRequestNo, setWorkRequestNo] = useState("");
    const [WorkRequestNo_disabled, setWorkRequestNo_disabled] = useState(false);

    const [ApprovalStatus, setApprovalStatus] = useState("");
    const [ApprovalStatus_disabled, setApprovalStatus_disabled] = useState(false);

    const [Charge_Cost_Center, setCharge_Cost_Center] = useState([]);
    const [selected_Charge_Cost_Center, setSelected_Charge_Cost_Center] = useState([]);

    const [Asset_No, setAsset_No] = useState([]);
    const [selected_Asset_No, setSelected_Asset_No] = useState([]);

    const [Asset_Location, setAsset_Location] = useState([]);
    const [selected_Asset_Location, setSelected_Asset_Location] = useState([]);

    const [OriginalPriority, setOriginalPriority] = useState([]);
    const [selected_OriginalPriority, setSelected_OriginalPriority] = useState([]);

    const [Level, setLevel] = useState([]);
    const [selected_Level, setSelected_Level] = useState([]);

    const [OriginationDate, setOriginationDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));
   
    const [WorkType, setWorkType] = useState([]);
    const [selected_WorkType, setSelected_WorkType] = useState([]);

    const [DueDate, setDueDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

    const [WorkClass, setWorkClass] = useState([]);
    const [selected_WorkClass, setSelected_WorkClass] = useState([]);

    const [Work_Group, setWork_Group] = useState([]);
    const [selected_Work_Group, setSelected_Work_Group] = useState([]);

    const [Work_Area, setWork_Area] = useState([]);
    const [selected_Work_Area, setSelected_Work_Area] = useState([]);

    const [ProjectID, setProjectID] = useState([]);
    const [selected_ProjectID, setSelected_ProjectID] = useState([]);

    const [Phone, setPhone] = useState("");

    const [Originator, setOriginator] = useState([]);
    const [selected_Originator, setSelected_Originator] = useState([]);

    const [FaultCode, setFaultCode] = useState([]);
    const [selected_FaultCode, setSelected_FaultCode] = useState([]);

    const [Description, setDescription] = useState("");

    const [UDFNote1, setUDFNote1] = useState("");
    const [UDFNote2, setUDFNote2] = useState("");
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

    const [ApprovedBy, setApprovedBy] = useState("");
    const [ApprovedDate, setApprovedDate] = useState(new Date());
    const [WorkOrderNo, setWorkOrderNo] = useState("");
    const [WorkStatus, setWorkStatus] = useState("");

    const [RejectedBy, setRejectedBy] = useState("");
    const [RejectedDate, setRejectedDate] = useState(new Date());
    const [RejectedDescription, setRejectedDescription] = useState("");

    const [ParentFlag, setParentFlag] = useState(false)    
    const [selected_ParentFlag, setselected_ParentFlag] = useState('') 
    const [columns, setcolumns]=useState([]);
    const [data, setdata]=useState([]);

    const [filteredDataSource, setFilteredDataSource] = React.useState([]); 
    const [name, setName] = useState("");
    const [ParentFlag_show, setParentFlag_Show] = useState(false);

    const [ApproveShow, setApproveShow] = useState(false);
    const ApprovehandleClose = () => setApproveShow(false);
    const ApprovehandleShow = () => setApproveShow(true);

    const [DisapproveShow, setDisapproveShow] = useState(false);
    const DisapprovehandleClose = () => setDisapproveShow(false);
    const DisapprovehandleShow = () => setDisapproveShow(true);

    const ParentFlag_handleClose = () => setParentFlag_Show(false);
    const ParentFlag_handleShow = () => setParentFlag_Show(true);

    const [AutoNumring, setAutoNumring] = useState("");

    const [Status, setStatus] = useState([]);
    const [selected_Status, setSelected_Status] = useState([]);

    const [showApproveButton, setShowApproveButton] = useState(false);
    const handleCloseApproveButton = () => setShowApproveButton(false);
    const handleShowApproveButton = () => setShowApproveButton(true);
    const [Button_submit, setButton_submit] = useState("");

   

    const get_workrequest_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


            for (var index in responseJson.data.data.Wko_Auto_numbering) {  

                if(responseJson.data.data.Wko_Auto_numbering[index].cnt_mst_numbering == "M" ){

                    setWorkRequestNo_disabled(false)
                    setAutoNumring('M')
                }else{
                    
                    setWorkRequestNo_disabled(true)
                    setAutoNumring('A')
                }              
            }

            
                let Asset_No = responseJson.data.data.WKO_Asset_No.map(item => ({
                    label: item.ast_mst_asset_no +" : "+ item.ast_mst_asset_status,
                    value: item.ast_mst_asset_no            
                    }));
                    setAsset_No(Asset_No);
                    //setFilteredDataSource(Asset_No)

                let Charge_Cost_Center = responseJson.data.data.CostCenter.map(item => ({
                    label: item.costcenter +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setCharge_Cost_Center(Charge_Cost_Center);

                let Asset_Location = responseJson.data.data.AssetLocation.map(item => ({
                    label: item.ast_loc_ast_loc +" : "+ item.ast_loc_desc,
                    value: item.ast_loc_ast_loc            
                    }));
                    setAsset_Location(Asset_Location);

                let OriginalPriority = responseJson.data.data.WKO_Original_Periority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc ,
                    value: item.wrk_pri_pri_cd            
                    }));                   
                    setOriginalPriority(OriginalPriority);

                let Level = responseJson.data.data.AssetLevel.map(item => ({
                    label: item.ast_lvl_ast_lvl +" : "+ item.ast_lvl_desc ,
                    value: item.ast_lvl_ast_lvl            
                    }));
                    setLevel(Level);

                let WorkType = responseJson.data.data.WKO_Work_Type.map(item => ({
                    label: item.wrk_typ_typ_cd +" : "+ item.wrk_typ_desc ,
                    value: item.wrk_typ_typ_cd            
                    }));                   
                    setWorkType(WorkType);

                let WorkClass = responseJson.data.data.WKO_Work_Class.map(item => ({
                    label: item.wrk_cls_cls_cd +" : "+ item.wrk_cls_desc ,
                    value: item.wrk_cls_cls_cd            
                    }));                   
                    setWorkClass(WorkClass);

                let Work_Group = responseJson.data.data.WKO_Work_Group.map(item => ({
                    label: item.wrk_grp_grp_cd +" : "+ item.wrk_grp_desc ,
                    value: item.wrk_grp_desc            
                    }));                   
                    setWork_Group(Work_Group);  

                let Work_Area = responseJson.data.data.WKO_Work_Area.map(item => ({
                    label: item.mst_war_work_area +" : "+ item.mst_war_desc ,
                    value: item.mst_war_desc            
                    }));
                    setWork_Area(Work_Area);

                let ProjectID = responseJson.data.data.WKO_ProjectID.map(item => ({
                    label: item.prj_mst_prj_cd +" : "+ item.prj_mst_desc ,
                    value: item.prj_mst_prj_cd            
                    }));                   
                    setProjectID(ProjectID);   

                let Originator = responseJson.data.data.WKO_Originator.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_empl_id            
                    }));                   
                    setOriginator(Originator);    

                let FaultCode = responseJson.data.data.FaultCode.map(item => ({
                    label: item.wrk_flt_fault_cd +" : "+ item.wrk_flt_desc ,
                    value: item.wrk_flt_desc            
                    }));                   
                    setFaultCode(FaultCode);  

                let Status = responseJson.data.data.WKO_Status.map(item => ({
                    label: item.wrk_sts_status +" : "+ item.wrk_sts_desc,
                    value: item.wrk_sts_desc            
                    }));
                    setStatus(Status);

                        
                        if(selected_asset == 'New_WorkRequest'){ 

                            Swal.close();
                            setButton_save("Save")
        
                        }else{
        
                            setButton_save("Update")
                            get_workrequest_select(site_ID,selected_asset);
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


    const get_workrequest_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_workrequest_select(location.state.RowID).then((responseJson)=>{         
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT WKR: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                setWorkRequestNo(responseJson.data.data[index].wkr_mst_wr_no )
                setApprovalStatus(responseJson.data.data[index].wkr_mst_wr_status )
                setSelected_OriginalPriority( {label:responseJson.data.data[index].wkr_mst_orig_priority} )
                setSelected_Originator( {label:responseJson.data.data[index].wkr_mst_originator} )
                setPhone( responseJson.data.data[index].wkr_mst_phone )

                if(responseJson.data.data[index].wkr_mst_org_date == null){
                    setOriginationDate('')
                }else{

                    setOriginationDate( Moment(responseJson.data.data[index].wkr_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT OD: '+ Moment(responseJson.data.data[index].wkr_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_FaultCode( {label:responseJson.data.data[index].wkr_mst_fault_code} )

                if(responseJson.data.data[index].wkr_mst_due_date == null){
                    setDueDate('')
                }else{

                    setDueDate( Moment(responseJson.data.data[index].wkr_mst_due_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DD: '+ Moment(responseJson.data.data[index].wkr_mst_due_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setDescription( responseJson.data.data[index].wkr_mst_wr_descs )

                setSelected_Asset_No( {label:responseJson.data.data[index].wkr_mst_assetno} )
                setSelected_Charge_Cost_Center( {label:responseJson.data.data[index].wkr_mst_chg_costcenter} )
                setSelected_Work_Area( {label:responseJson.data.data[index].wkr_mst_work_area} )
                setSelected_Work_Group( {label:responseJson.data.data[index].wkr_mst_work_group} )
                setSelected_Asset_Location( {label:responseJson.data.data[index].wkr_mst_assetlocn} )
                setSelected_WorkType( {label:responseJson.data.data[index].wkr_mst_work_type} )
                setSelected_Level( {label:responseJson.data.data[index].wkr_mst_location} )
                setSelected_WorkClass( {label:responseJson.data.data[index].wkr_mst_work_class} )
                setSelected_ProjectID( {label:responseJson.data.data[index].wkr_mst_projectid} )
                
                setUDFNote1( responseJson.data.data[index].wkr_det_note1 )
                setUDFNote2( responseJson.data.data[index].wkr_det_note2 )
                setUDFText_1( responseJson.data.data[index].wkr_det_varchar1 )
                setUDFText_2( responseJson.data.data[index].wkr_det_varchar2 )
                setUDFText_3( responseJson.data.data[index].wkr_det_varchar3 )
                setUDFText_4( responseJson.data.data[index].wkr_det_varchar4 )
                setUDFText_5( responseJson.data.data[index].wkr_det_varchar5 )
                setUDFText_6( responseJson.data.data[index].wkr_det_varchar6 )
                setUDFText_7( responseJson.data.data[index].wkr_det_varchar7 )
                setUDFText_8( responseJson.data.data[index].wkr_det_varchar8 )
                setUDFText_9( responseJson.data.data[index].wkr_det_varchar9 )
                setUDFText_10( responseJson.data.data[index].wkr_det_varchar10 )
                setUDFText_11( responseJson.data.data[index].wkr_det_varchar11 )
                setUDFText_12( responseJson.data.data[index].wkr_det_varchar12 )
                setUDFText_13( responseJson.data.data[index].wkr_det_varchar13 )
                setUDFText_14( responseJson.data.data[index].wkr_det_varchar14 )
                setUDFText_15( responseJson.data.data[index].wkr_det_varchar15 )
                setUDFText_16( responseJson.data.data[index].wkr_det_varchar16 )
                setUDFText_17( responseJson.data.data[index].wkr_det_varchar17 )
                setUDFText_18( responseJson.data.data[index].wkr_det_varchar18 )
                setUDFText_19( responseJson.data.data[index].wkr_det_varchar19 )
                setUDFText_20( responseJson.data.data[index].wkr_det_varchar20 )

                setUDFNumber_1( responseJson.data.data[index].wkr_det_numeric1 )
                setUDFNumber_2( responseJson.data.data[index].wkr_det_numeric2 )
                setUDFNumber_3( responseJson.data.data[index].wkr_det_numeric3 )
                setUDFNumber_4( responseJson.data.data[index].wkr_det_numeric4 )
                setUDFNumber_5( responseJson.data.data[index].wkr_det_numeric5 )
                setUDFNumber_6( responseJson.data.data[index].wkr_det_numeric6 )
                setUDFNumber_7( responseJson.data.data[index].wkr_det_numeric7 )
                setUDFNumber_8( responseJson.data.data[index].wkr_det_numeric8 )
                setUDFNumber_9( responseJson.data.data[index].wkr_det_numeric9 )
                setUDFNumber_10( responseJson.data.data[index].wkr_det_numeric10 )
               
                if(responseJson.data.data[index].wkr_det_datetime1 == null){
                    setUDFDate_1('')
                }else{

                    setUDFDate_1( Moment(responseJson.data.data[index].wkr_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].wkr_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime2 == null){
                    setUDFDate_2('')
                }else{

                    setUDFDate_2( Moment(responseJson.data.data[index].wkr_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 2 : '+ Moment(responseJson.data.data[index].wkr_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime3 == null){
                    setUDFDate_3('')
                }else{

                    setUDFDate_3( Moment(responseJson.data.data[index].wkr_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 3 : '+ Moment(responseJson.data.data[index].wkr_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime4 == null){
                    setUDFDate_4('')
                }else{

                    setUDFDate_4( Moment(responseJson.data.data[index].wkr_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 4 : '+ Moment(responseJson.data.data[index].wkr_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime5 == null){
                    setUDFDate_5('')
                }else{

                    setUDFDate_5( Moment(responseJson.data.data[index].wkr_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 5 : '+ Moment(responseJson.data.data[index].wkr_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime6 == null){
                    setUDFDate_6('')
                }else{

                    setUDFDate_6( Moment(responseJson.data.data[index].wkr_det_datetime6.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 6 : '+ Moment(responseJson.data.data[index].wkr_det_datetime6.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime7 == null){
                    setUDFDate_7('')
                }else{

                    setUDFDate_7( Moment(responseJson.data.data[index].wkr_det_datetime7.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 7 : '+ Moment(responseJson.data.data[index].wkr_det_datetime7.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime8 == null){
                    setUDFDate_8('')
                }else{

                    setUDFDate_8( Moment(responseJson.data.data[index].wkr_det_datetime8.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 8 : '+ Moment(responseJson.data.data[index].wkr_det_datetime8.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime9 == null){
                    setUDFDate_9('')
                }else{

                    setUDFDate_9( Moment(responseJson.data.data[index].wkr_det_datetime9.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 9 : '+ Moment(responseJson.data.data[index].wkr_det_datetime9.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wkr_det_datetime10 == null){
                    setUDFDate_10('')
                }else{

                    setUDFDate_10( Moment(responseJson.data.data[index].wkr_det_datetime10.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 10 : '+ Moment(responseJson.data.data[index].wkr_det_datetime10.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setApprovedBy( responseJson.data.data[index].wkr_det_approver )

                if(responseJson.data.data[index].wkr_det_appr_date == null){
                    setApprovedDate('')
                }else{

                    setApprovedDate( Moment(responseJson.data.data[index].wkr_det_appr_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT APPROVED DATE : '+ Moment(responseJson.data.data[index].wkr_det_appr_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setWorkOrderNo( responseJson.data.data[index].wkr_det_wo )
                setWorkStatus( responseJson.data.data[index].wko_mst_status )

                setRejectedBy( responseJson.data.data[index].wkr_det_reject_by )

                if(responseJson.data.data[index].wkr_det_reject_date == null){
                    setRejectedDate('')
                }else{

                    setRejectedDate( Moment(responseJson.data.data[index].wkr_det_reject_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT REJECTED DATE : '+ Moment(responseJson.data.data[index].wkr_det_reject_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setRejectedDescription( responseJson.data.data[index].wkr_det_reject_desc )

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
              title: 'Oops get_WorkRequest_select...',
              text: e,          
            })
          });

    }
    

    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        let ApprovalStatus = localStorage.getItem("wkr_mst_wr_status");
        setAsset_No(ApprovalStatus);
        console.log('asd1231ApprovalStatus',ApprovalStatus);

        console.log('select select',location.state.select);
        console.log('select WKRID',location.state.RowID);
    
        get_workrequest_status(site_ID, "All", location.state.select);       
       

    },[location]);


    const onClickChange = () => {

        
    if(selected_Asset_No == 0 || selected_Asset_No == null){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Select the Asset No',
                    showConfirmButton: false,
                    timer: 2000
                    
                })
            } else {
            
                if(selected_Charge_Cost_Center == 0 || selected_Charge_Cost_Center == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select the Charge Cost Center',
                        showConfirmButton: false,
                        timer: 2000,
                        
                    })
                }else{

                    if(selected_OriginalPriority == 0 || selected_OriginalPriority == null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Select the Original Priority',
                            showConfirmButton: false,
                            timer: 2000
                            
                        })
                    }else{
                    
                        if(selected_Work_Group == 0 || selected_Work_Group == null){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Select the Work Group',
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

                                        if(Button_save ==  "Save"){

                                            New_WorkRequest();
                                            console.log("Create button clicked!");
                                            resetData();

                                        }else if(Button_save == "Update"){

                                            Update_WorkRequest();
                                            console.log("Update button clicked here!");
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
                  Update_WorkRequest();
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


    const New_WorkRequest = () => {

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading();


        let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');
        console.log(get_date)

        let site_ID = localStorage.getItem("site_ID");
        let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
        let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");


        
        //Select WorkRequestNo
        console.log("WorkRequestNo: ", WorkRequestNo);

        //Select ApprovalStatus
        let ApprovalStatus = localStorage.getItem("wkr_mst_wr_status");
        console.log("ApprovalStatus: ", ApprovalStatus);

        //Select Originator
        let Originator, setOriginator;
        if(selected_Originator == '' || selected_Originator == null){

            setOriginator =''
        }else{

            Originator = selected_Originator.label.split(":")
            setOriginator = Originator[0];
            console.log("Originator ", Originator[0])
        }

        //Select Original Priority
        let OriginalPriority, setOriginalPriority;
        if(selected_OriginalPriority == '' || selected_OriginalPriority == null){

            setOriginalPriority=''
        }else{

            OriginalPriority = selected_OriginalPriority.label.split(":")
            setOriginalPriority = OriginalPriority[0];
            console.log("OriginalPriority ", OriginalPriority[0])
        }

        //Select Phone
        console.log("Phone: ", Phone)

        //Select Origination Date
        let date_of_origination = ''
        if (OriginationDate == '' || OriginationDate == null) {

            date_of_origination = '';
        } else {

            date_of_origination = Moment(OriginationDate).utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("OD ", date_of_origination);
        }

        //Select Fault Code
        let FaultCode, setFaultCode;
        if(selected_FaultCode == '' || selected_FaultCode == null){

            setFaultCode=''
        }else{

            FaultCode = selected_FaultCode.label.split(":")
            setFaultCode = FaultCode[0];
            console.log("FaultCode ", FaultCode[0])
        }

        //Select Due Date
        let date_of_due = ''
        if (DueDate == '' || DueDate == null) {

            date_of_due = '';
        } else {

            date_of_due = Moment(DueDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DD ", date_of_due);
        }

        //Select Description
        console.log("Description: ", Description)


        //Select Asset No
        let Asset_No, setAsset_No;
        if(selected_Asset_No == '' || selected_Asset_No == null){

            setAsset_No=''
        }else{

            Asset_No = selected_Asset_No.label.split(":")
            setAsset_No = Asset_No[0];
            console.log("Asset_No ", Asset_No[0])
        }

        //Select Charge Cost Center
        let Charge_Cost_Center = selected_Charge_Cost_Center.label.split(":")
        console.log("Charge_Cost_Center: ", Charge_Cost_Center[0])

        //Select Work Area
        let Work_Area, setWork_Area;
        if(selected_Work_Area == '' || selected_Work_Area == null){

            setWork_Area=''
        }else{

            Work_Area = selected_Work_Area.label.split(":")
            setWork_Area = Work_Area[0];
            console.log("Work_Area ", Work_Area[0])
        }
         
        //Select Work Group
        let Work_Group = selected_Work_Group.label.split(":")
        console.log("Work_Group: ", Work_Group[0])

        //Select Asset Location
        let Asset_Location, setAsset_Location;
        if(selected_Asset_Location == '' || selected_Asset_Location == null){

            setAsset_Location=''
        }else{

            Asset_Location = selected_Asset_Location.label.split(":")
            setAsset_Location = Asset_Location[0];
            console.log("Asset_Location ", Asset_Location[0])
        }
        
        //Select Work Type
        let WorkType, setWorkType;
        if(selected_WorkType == '' || selected_WorkType == null){

            setWorkType=''
        }else{

            WorkType = selected_WorkType.label.split(":")
            setWorkType = WorkType[0];
            console.log("WorkType ", WorkType[0])
        }

        //Select Level
        let Level, setLevel;
        if(selected_Level == '' || selected_Level == null){

            setLevel=''
        }else{

            Level = selected_Level.label.split(":")
            setLevel = Level[0];
            console.log("Level ", Level[0])
        }

        //Select Work Class
        let WorkClass, setWorkClass;
        if(selected_WorkClass == '' || selected_WorkClass == null){

            setWorkClass=''
        }else{

            WorkClass = selected_WorkClass.label.split(":")
            setWorkClass = WorkClass[0];
            console.log("WorkClass ", WorkClass[0])
        }

        //Select ProjectID
        let ProjectID, setProjectID;
        if(selected_ProjectID == '' || selected_ProjectID == null){

            setProjectID=''
        }else{

            ProjectID = selected_ProjectID.label.split(":")
            setProjectID = ProjectID[0];
            console.log("ProjectID ", ProjectID[0])
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

        //Select Date 6
        let date_6 = ''
        if (UDFDate_6 == '' || UDFDate_6 == null) {

            date_6 = '';
        } else {

            date_6 = Moment(UDFDate_6).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date6 ", date_6);
        }

        //Select Date 7
        let date_7 = ''
        if (UDFDate_7 == '' || UDFDate_7 == null) {

            date_7 = '';
        } else {

            date_7 = Moment(UDFDate_7).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date7 ", date_7);
        }

        //Select Date 8
        let date_8 = ''
        if (UDFDate_8 == '' || UDFDate_8 == null) {

            date_8 = '';
        } else {

            date_8 = Moment(UDFDate_8).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date8 ", date_8);
        }

        //Select Date 9
        let date_9 = ''
        if (UDFDate_9 == '' || UDFDate_9 == null) {

            date_9 = '';
        } else {

            date_9 = Moment(UDFDate_9).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date9 ", date_9);
        }

        //Select Date 10
        let date_10 = ''
        if (UDFDate_10 == '' || UDFDate_10 == null) {

            date_10 = '';
        } else {

            date_10 = Moment(UDFDate_10).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date10 ", date_10);
        }



    var json_workrequest ={


        "site_cd": site_ID,
      
        "wkr_mst_wr_no": WorkRequestNo.trim(),
        "wkr_mst_wr_status": ApprovalStatus.trim(),
        "wkr_mst_originator":setOriginator.trim(),
        "wkr_mst_orig_priority":setOriginalPriority.trim(),
        "wkr_mst_phone":Phone.trim(),
        "wkr_mst_org_date":date_of_origination,
        "wkr_mst_fault_code":setFaultCode.trim(),
        "wkr_mst_due_date":date_of_due,
        "wkr_mst_wr_descs":Description.trim(),

        "wkr_mst_assetno":setAsset_No.trim(),
        "wkr_mst_chg_costcenter":Charge_Cost_Center[0].trim(),
        "wkr_mst_work_area":setWork_Area.trim(),
        "wkr_mst_work_group":Work_Group[0].trim(),
        "wkr_mst_assetlocn":setAsset_Location.trim(),
        "wkr_mst_work_type":setWorkType.trim(),
        "wkr_mst_location":setLevel.trim(),
        "wkr_mst_work_class":setWorkClass.trim(),
        "wkr_mst_projectid":setProjectID.trim(),
 
        "wkr_det_note1":UDFNote1,
        "wkr_det_note2":UDFNote2,
        "wkr_det_varchar1":UDFText_1,
        "wkr_det_varchar2":UDFText_2,
        "wkr_det_varchar3":UDFText_3,
        "wkr_det_varchar4":UDFText_4,
        "wkr_det_varchar5":UDFText_5,
        "wkr_det_varchar6":UDFText_6,
        "wkr_det_varchar7":UDFText_7,
        "wkr_det_varchar8":UDFText_8,
        "wkr_det_varchar9":UDFText_9,
        "wkr_det_varchar10":UDFText_10,
        "wkr_det_varchar11":UDFText_11,
        "wkr_det_varchar12":UDFText_12,
        "wkr_det_varchar13":UDFText_13,
        "wkr_det_varchar14":UDFText_14,
        "wkr_det_varchar15":UDFText_15,
        "wkr_det_varchar16":UDFText_16,
        "wkr_det_varchar17":UDFText_17,
        "wkr_det_varchar18":UDFText_18,
        "wkr_det_varchar19":UDFText_19,
        "wkr_det_varchar20":UDFText_20,

        "wkr_det_numeric1":UDFNumber_1.trim(),
        "wkr_det_numeric2":UDFNumber_2.trim(),
        "wkr_det_numeric3":UDFNumber_3.trim(),
        "wkr_det_numeric4":UDFNumber_4.trim(),
        "wkr_det_numeric5":UDFNumber_5.trim(),
        "wkr_det_numeric6":UDFNumber_6.trim(),
        "wkr_det_numeric7":UDFNumber_7.trim(),
        "wkr_det_numeric8":UDFNumber_8.trim(),
        "wkr_det_numeric9":UDFNumber_9.trim(),
        "wkr_det_numeric10":UDFNumber_10.trim(),
       
        "wkr_det_datetime1":date_1,
        "wkr_det_datetime2":date_2,
        "wkr_det_datetime3":date_3,
        "wkr_det_datetime4":date_4,
        "wkr_det_datetime5":date_5,
        "wkr_det_datetime6":date_6,
        "wkr_det_datetime7":date_7,
        "wkr_det_datetime8":date_8,
        "wkr_det_datetime9":date_9,
        "wkr_det_datetime10":date_10,
       

        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "wkr_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "wkr_mst_create_date":get_date,
        "cnt_mst_numbering":AutoNumring,
        
    }

    console.log(JSON.stringify(json_workrequest))

    APIServices.insert_new_workrequest(JSON.stringify(json_workrequest)).then((responseJson)=>{
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
          title: 'Oops get_WorkRequest_select...',
          text: e,          
        })
      });

  }

  
    const Update_WorkRequest = () => {

    //Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
    //Swal.showLoading();


    let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');

    let site_ID = localStorage.getItem("site_ID");
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
    
    let RowID = localStorage.getItem("RowID");
    console.log('get RowID here...',location.state.RowID);



        //Select WorkRequestNo
        console.log("WorkRequestNo: ", WorkRequestNo);

        //Select ApprovalStatus
        let ApprovalStatus = localStorage.getItem("wkr_mst_wr_status");
        console.log("ApprovalStatus: ", ApprovalStatus);

        //Select Originator
        let Originator, setOriginator;
        if(selected_Originator == '' || selected_Originator == null){

            setOriginator =''
        }else{

            Originator = selected_Originator.label.split(":")
            setOriginator = Originator[0];
            console.log("Originator ", Originator[0])
        }

        //Select Original Priority
        let OriginalPriority, setOriginalPriority;
        if(selected_OriginalPriority == '' || selected_OriginalPriority == null){

            setOriginalPriority=''
        }else{

            OriginalPriority = selected_OriginalPriority.label.split(":")
            setOriginalPriority = OriginalPriority[0];
            console.log("OriginalPriority ", OriginalPriority[0])
        }

        //Select Phone
        console.log("Phone: ", Phone)

        //Select Origination Date
        let date_of_origination = ''
        if (OriginationDate == '' || OriginationDate == null) {

            date_of_origination = '';
        } else {

            date_of_origination = Moment(OriginationDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("OD ", date_of_origination);
        }

        //Select Fault Code
        let FaultCode, setFaultCode;
        if(selected_FaultCode == '' || selected_FaultCode == null){

            setFaultCode=''
        }else{

            FaultCode = selected_FaultCode.label.split(":")
            setFaultCode = FaultCode[0];
            console.log("FaultCode ", FaultCode[0])
        }

        //Select Due Date
        let date_of_due = ''
        if (DueDate == '' || DueDate == null) {

            date_of_due = '';
        } else {

            date_of_due = Moment(DueDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DD ", date_of_due);
        }

        //Select Description
        console.log("Description: ", Description)

        //Select Asset No
        let Asset_No, setAsset_No;
        if(selected_Asset_No == '' || selected_Asset_No == null){

            setAsset_No=''
        }else{

            Asset_No = selected_Asset_No.label.split(":")
            setAsset_No = Asset_No[0];
            console.log("Asset_No ", Asset_No[0])
        }

        //Select Charge Cost Center
        let Charge_Cost_Center = selected_Charge_Cost_Center.label.split(":")
        console.log("Charge_Cost_Center: ", Charge_Cost_Center[0])

        //Select Work Area
        let Work_Area, setWork_Area;
        if(selected_Work_Area == '' || selected_Work_Area == null){

            setWork_Area=''
        }else{

            Work_Area = selected_Work_Area.label.split(":")
            setWork_Area = Work_Area[0];
            console.log("Work_Area ", Work_Area[0])
        }

        //Select Work Group
        let Work_Group = selected_Work_Group.label.split(":")
        console.log("Work_Group: ", Work_Group[0])

        //Select Asset Location
        let Asset_Location, setAsset_Location;
        if(selected_Asset_Location == '' || selected_Asset_Location == null){

            setAsset_Location=''
        }else{

            Asset_Location = selected_Asset_Location.label.split(":")
            setAsset_Location = Asset_Location[0];
            console.log("Asset_Location ", Asset_Location[0])
        }

        //Select Work Type
        let WorkType, setWorkType;
        if(selected_WorkType.label == '' || selected_WorkType.label == null){

            setWorkType=''
        }else{

            WorkType = selected_WorkType.label.split(":")
            setWorkType = WorkType[0];
            console.log("WorkType ", WorkType[0])
        }

        //Select Level
        let Level, setLevel;
        if(selected_Level == '' || selected_Level == null){

            setLevel=''
        }else{

            Level = selected_Level.label.split(":")
            setLevel = Level[0];
            console.log("Level ", Level[0])
        }

        //Select Work Class
        let WorkClass, setWorkClass;
        if(selected_WorkClass.label == '' || selected_WorkClass.label == null){

            setWorkClass=''
        }else{

            WorkClass = selected_WorkClass.label.split(":")
            setWorkClass = WorkClass[0];
            console.log("WorkClass ", WorkClass[0])
        }

        //Select ProjectID
        let ProjectID, setProjectID;
        if(selected_ProjectID.label == '' || selected_ProjectID.label == null){

            setProjectID=''
        }else{

            ProjectID = selected_ProjectID.label.split(":")
            setProjectID = ProjectID[0];
            console.log("ProjectID ", ProjectID[0])
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

        //Select Date 6
        let date_6 = ''
        if (UDFDate_6 == '' || UDFDate_6 == null) {

            date_6 = '';
        } else {

            date_6 = Moment(UDFDate_6).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date6 ", date_6);
        }

        //Select Date 7
        let date_7 = ''
        if (UDFDate_7 == '' || UDFDate_7 == null) {

            date_7 = '';
        } else {

            date_7 = Moment(UDFDate_7).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date7 ", date_7);
        }

        //Select Date 8
        let date_8 = ''
        if (UDFDate_8 == '' || UDFDate_8 == null) {

            date_8 = '';
        } else {

            date_8 = Moment(UDFDate_8).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date8 ", date_8);
        }

        //Select Date 9
        let date_9 = ''
        if (UDFDate_9 == '' || UDFDate_9 == null) {

            date_9 = '';
        } else {

            date_9 = Moment(UDFDate_9).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date9 ", date_9);
        }

        //Select Date 10
        let date_10 = ''
        if (UDFDate_10 == '' || UDFDate_10 == null) {

            date_10 = '';
        } else {

            date_10 = Moment(UDFDate_10).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date10 ", date_10);
        }



    var json_workrequest ={


        "site_cd": site_ID,
      
        "wkr_mst_wr_no":WorkRequestNo.trim(),
        "wkr_mst_wr_status": ApprovalStatus.trim(),
        "wkr_mst_originator":setOriginator.trim(),
        "wkr_mst_orig_priority":setOriginalPriority.trim(),
        "wkr_mst_phone":Phone.trim(),
        "wkr_mst_org_date":date_of_origination,
        "wkr_mst_fault_code":setFaultCode.trim(),
        "wkr_mst_due_date":date_of_due,
        "wkr_mst_wr_descs":Description.trim(),          

        "wkr_mst_assetno":setAsset_No.trim(),
        "wkr_mst_chg_costcenter":Charge_Cost_Center[0].trim(),
        "wkr_mst_work_area":setWork_Area.trim(),
        "wkr_mst_work_group":Work_Group[0].trim(),
        "wkr_mst_assetlocn":setAsset_Location.trim(),
        "wkr_mst_work_type":setWorkType.trim(),
        "wkr_mst_location":setLevel.trim(),
        "wkr_mst_work_class":setWorkClass.trim(),
        "wkr_mst_projectid":setProjectID.trim(),

        "wkr_det_note1":UDFNote1,
        "wkr_det_note2":UDFNote2,
        "wkr_det_varchar1":UDFText_1,
        "wkr_det_varchar2":UDFText_2,
        "wkr_det_varchar3":UDFText_3,
        "wkr_det_varchar4":UDFText_4,
        "wkr_det_varchar5":UDFText_5,
        "wkr_det_varchar6":UDFText_6,
        "wkr_det_varchar7":UDFText_7,
        "wkr_det_varchar8":UDFText_8,
        "wkr_det_varchar9":UDFText_9,
        "wkr_det_varchar10":UDFText_10,
        "wkr_det_varchar11":UDFText_11,
        "wkr_det_varchar12":UDFText_12,
        "wkr_det_varchar13":UDFText_13,
        "wkr_det_varchar14":UDFText_14,
        "wkr_det_varchar15":UDFText_15,
        "wkr_det_varchar16":UDFText_16,
        "wkr_det_varchar17":UDFText_17,
        "wkr_det_varchar18":UDFText_18,
        "wkr_det_varchar19":UDFText_19,
        "wkr_det_varchar20":UDFText_20,

        "wkr_det_numeric1":UDFNumber_1,
        "wkr_det_numeric2":UDFNumber_2,
        "wkr_det_numeric3":UDFNumber_3,
        "wkr_det_numeric4":UDFNumber_4,
        "wkr_det_numeric5":UDFNumber_5,
        "wkr_det_numeric6":UDFNumber_6,
        "wkr_det_numeric7":UDFNumber_7,
        "wkr_det_numeric8":UDFNumber_8,
        "wkr_det_numeric9":UDFNumber_9,
        "wkr_det_numeric10":UDFNumber_10,
       
        "wkr_det_datetime1":date_1,
        "wkr_det_datetime2":date_2,
        "wkr_det_datetime3":date_3,
        "wkr_det_datetime4":date_4,
        "wkr_det_datetime5":date_5,
        "wkr_det_datetime6":date_6,
        "wkr_det_datetime7":date_7,
        "wkr_det_datetime8":date_8,
        "wkr_det_datetime9":date_9,
        "wkr_det_datetime10":date_10,
       

        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "wkr_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "wkr_mst_create_date":get_date,
        

        "RowID":location.state.RowID,

        
    }

    console.log("Update : "+JSON.stringify(json_workrequest))

    APIServices.update_workrequest(JSON.stringify(json_workrequest)).then((responseJson)=>{
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
          title: 'Oops get_WorkRequest_select...',
          text: e,          
        })
      });


  }

  
    const resetData = () => {

        setSelected_Asset_No(0);
        setSelected_Charge_Cost_Center(0);
        setSelected_Asset_Location(0);
        setSelected_OriginalPriority(0);
        setSelected_Level(0);
        setOriginationDate('');
        setSelected_WorkType(0);
        setDueDate('');
        setSelected_WorkClass(0);
        setSelected_Work_Group(0);
        setSelected_Work_Area(0);
        setSelected_ProjectID(0);
        setPhone('');  
        setSelected_Originator(0);
        setSelected_FaultCode(0);
        setDescription('');        

        setUDFNote1('');
        setUDFNote2('');
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
        setUDFText_11('');
        setUDFText_12('');
        setUDFText_13('');
        setUDFText_14('');
        setUDFText_15('');
        setUDFText_16('');
        setUDFText_17('');
        setUDFText_18('');
        setUDFText_19('');
        setUDFText_20('');

        setUDFNumber_1('');
        setUDFNumber_2('');
        setUDFNumber_3('');
        setUDFNumber_4('');
        setUDFNumber_5('');
        setUDFNumber_6('');
        setUDFNumber_7('');
        setUDFNumber_8('');
        setUDFNumber_9('');
        setUDFNumber_10('');

        setUDFDate_1('');
        setUDFDate_2('');
        setUDFDate_3('');
        setUDFDate_4('');
        setUDFDate_5('');
        setUDFDate_6('');
        setUDFDate_7('');
        setUDFDate_8('');
        setUDFDate_9('');
        setUDFDate_10('');

        setButton_save('Save');
    }

      
    const get_assetmaster_select = (selected_asset)=>{

        let site_ID = localStorage.getItem("site_ID");
        
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
            
            console.log('select Asset',responseJson)

            if (responseJson.data.status === 'SUCCESS') {             
               
               for (var index in responseJson.data.data) {

                setRowID(responseJson.data.data[index].RowID)
                console.log('select Asset',responseJson.data.data[index].ast_mst_asset_no )
                
                setSelected_Asset_No( {label:responseJson.data.data[index].ast_mst_asset_no} )
                setSelected_Charge_Cost_Center( {label:responseJson.data.data[index].ast_mst_cost_center +" : "+ responseJson.data.data[index].descs})
                setSelected_Work_Area( {label:responseJson.data.data[index].ast_mst_work_area +" : "+ responseJson.data.data[index].mst_war_desc} )
                setSelected_Asset_Location( {label:responseJson.data.data[index].ast_mst_asset_locn +" : "+ responseJson.data.data[index].ast_loc_desc})
                setSelected_Level({ label:responseJson.data.data[index].ast_mst_ast_lvl +" : "+ responseJson.data.data[index].ast_lvl_desc})
                setSelected_Work_Group( {label:responseJson.data.data[index].ast_mst_wrk_grp+" : "+ responseJson.data.data[index].wrk_grp_desc })

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


    const handleSelectedAssetNo = (selectedOption) => {
        console.log(selectedOption)

        get_assetmaster_select(selectedOption.value);

        setSelected_Asset_No(selectedOption);
        setSelected_Charge_Cost_Center(Charge_Cost_Center[0]);
        setSelected_Work_Area(Work_Area[0]);
        setSelected_Asset_Location(Asset_Location[0]);
        setSelected_Level(Level[0]);
        setSelected_Work_Group(Work_Group[0]);
       
    }
    
    const handleSelectedFaultCode = (selectedOption) => {
        setSelected_FaultCode(selectedOption);

        console.log(selectedOption.value);
        setDescription(selectedOption.value);
    }


    //Approval Status
    const approvalStatusMap = {
        "W": "Awaiting (W)",
        "A": "Approve (A)",
        "D": "Disapprove (D)",
      };

    const approvalStatusColor = {
        "W": "#2196F3", 
        "A": "#19D895", 
        "D": "#FF6258",
      };   

    const getApprovalStatusStyle = (status) => {
        if (status === "W") {
          return {
            backgroundColor: approvalStatusColor[status],
            fontSize: "12px",
            color: "white",
            padding: "3px",
            borderRadius: "5px",
            fontWeight: "bold",
          };
        } else if (status === "A") {
          return {
            backgroundColor: approvalStatusColor[status],
            fontSize: "12px",
            color: "white",
            padding: "3px",
            borderRadius: "5px",
            fontWeight: "bold",
          };
        } else if (status === "D") {
          return {
            backgroundColor: approvalStatusColor[status],
            fontSize: "12px",
            color: "white",
            padding: "3px",
            borderRadius: "5px",
            fontWeight: "bold",
          };
        } else {
          return {};
        }
      };




  return (   

    <div>
        <div className="page-header" style={{ marginTop: "-10px", marginBottom:"10px" }}>
            <h3 className="page-title">Work Request Master</h3>   

            <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb"></ol> */}
                    <div className="template-demo">

                        {/* <button type="button" className="btn btn-primary btn-icon-text" onClick={handleShowApproveButton}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  Approve
                        </button> */}

                        {ApprovalStatus === 'W' || !ApprovalStatus ? (
                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>
                        ) : null}

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

                        {/******************** Approve Work Request header button hide ********************/}
                        <div>
                            <Modal show={showApproveButton} onHide={handleCloseApproveButton} centered >

                                <Modal.Header closeButton>
                                    <Modal.Title>Approve Work Request</Modal.Title>
                                </Modal.Header>


                                <Modal.Body>
                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_StockLocation">
                                            <label className="col-sm-5 col-form-label">Status:</label>
                                            <div className="col-sm-6 form-check">
                                            {Status.map((status) => (
                                                <Form.Check 
                                                    key={status.value}
                                                    type="radio"
                                                    label={status.label}
                                                    name="status"
                                                    value={status.value}
                                                    checked={selected_Status === status.value}
                                                    onChange={(e) => setSelected_Status(e.target.value)}
                                                    required
                                                />
                                            ))}
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_StockLocation">
                                            <label className="col-sm-5 col-form-label">Asset to:</label>
                                            <div className="col-sm-6 form-check">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Originator}
                                                    value={selected_Originator}
                                                    onChange={setSelected_Originator} // using id as it is unique
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_StockLocation">
                                            <label className="col-sm-5 col-form-label">Work Group:</label>
                                            <div className="col-sm-6 form-check">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Work_Group}
                                                    value={selected_Work_Group}
                                                    onChange={setSelected_Work_Group} // using id as it is unique
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                    </div>
                                </Modal.Body>
                                

                                <Modal.Footer>

                                <Button variant="secondary" onClick={handleCloseApproveButton}>
                                <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i>Close
                                </Button>
                                <Button variant="primary" onClick={() => {
                                              
                                                // Close modal
                                                handleCloseApproveButton();
                                            }}>
                                            <i className="mdi mdi-file-check btn-icon-prepend"></i>Approve
                                            </Button>
                                </Modal.Footer>

                            </Modal>

                        </div> 


                        {/******************** Approve Details ********************/}
                        <div>
                            <Modal show={ApproveShow} onHide={ApprovehandleClose} centered >

                                <Modal.Header closeButton>
                                    <Modal.Title>Approve Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_ApprovedBy">
                                            <label className="col-sm-5 col-form-label down leftApprovalStatus">Approved By :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="text"
                                                    value ={ApprovedBy} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12 moveUpPopUp">
                                        <Form.Group className="row" controlId="validation_ApprovedDate">
                                            <label className="col-sm-5 col-form-label labelTopEmail down leftApprovalStatus">Approved Date :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="datetime-local"
                                                    value ={ApprovedDate} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12 moveUpPopUp">
                                        <Form.Group className="row" controlId="validation_WorkOrderNo">
                                            <label className="col-sm-5 col-form-label labelTopEmail down leftApprovalStatus">Work Order No :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="text"
                                                    value ={WorkOrderNo} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12 moveUpPopUp">
                                        <Form.Group className="row" controlId="validation_WorkStatus">
                                            <label className="col-sm-5 col-form-label labelTopEmail down leftApprovalStatus">Work Status :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="text"
                                                    value ={WorkStatus} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>
                                
                                </Modal.Body>
                            </Modal>

                        </div> 

                        {/******************** Disapprove Details ********************/}
                        <div>
                            <Modal show={DisapproveShow} onHide={DisapprovehandleClose} centered >

                                <Modal.Header closeButton>
                                    <Modal.Title>Disapprove Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div className="col-md-12">
                                        <Form.Group className="row" controlId="validation_RejectedBy">
                                            <label className="col-sm-5 col-form-label down leftApprovalStatus">Rejected By :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="text"
                                                    value ={RejectedBy} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12 moveUp">
                                        <Form.Group className="row" controlId="validation_RejectedDate">
                                            <label className="col-sm-5 col-form-label labelTopEmail down leftApprovalStatus">Rejected Date :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="datetime-local"
                                                    value ={RejectedDate} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                    <div className="col-md-12 moveUp">
                                        <Form.Group className="row" controlId="validation_RejectedDescription">
                                            <label className="col-sm-5 col-form-label labelTopEmail down leftApprovalStatus">Rejected Description :</label>
                                            <div className="col-sm-6 form-check">
                                                <Form.Control
                                                    style={{ fontSize: "13px", height: "38px" }}
                                                    type="text"
                                                    value ={RejectedDescription} 
                                                    readOnly
                                                    />
                                            </div>
                                        </Form.Group>

                                    </div>

                                </Modal.Body>
                            </Modal>

                        </div> 

                        <div className="row">

                            <div className="col-md-10">

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_WorkRequestNo">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Work Request No:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                            <Form.Control className='formControl' type="text" value={WorkRequestNo} onChange={(e) => setWorkRequestNo(e.target.value)}  disabled={WorkRequestNo_disabled}/>
                                            </div>
                                        </Form.Group>
                                    </div>


                                    <div className="col-md-6 moveUp-md moveUp-sm">                                
                                        <Form.Group className="row" controlId="validation_ApprovalStatus">
                                            <Form.Label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Approval Status:</Form.Label>
                                            <div className="col-sm-8  col-form-label top buttonDown buttonDown-ls">
                                            {/* <Form.Control style={{ fontSize: "13px", color: 'white', fontWeight: 'bold', backgroundColor: approvalStatusColor[ApprovalStatus] }} type="text"  value={approvalStatusMap[ApprovalStatus] || ApprovalStatus} onChange={(e) => setApprovalStatus(e.target.value)} disabled={ApprovalStatus_disabled} readOnly/> */}
                                            <button type="button" className="btn btn-icon-text" style={getApprovalStatusStyle(ApprovalStatus)} onClick={() => {
                                                if (ApprovalStatus === 'A') {
                                                    ApprovehandleShow();

                                                } else if (ApprovalStatus === 'D') {
                                                    DisapprovehandleShow();
                                                }
                                            }}>
                                                {approvalStatusMap[ApprovalStatus] || ApprovalStatus}
                                            </button>{' '}
                                            
                                                {ApprovalStatus === 'A' || ApprovalStatus === 'D' ? (
                                                <span style={{ backgroundColor: 'yellow' ,color: 'red', fontSize: "12px", padding: "3px", borderRadius: "5px" }}>Read Only</span>
                                            ) : null}
                                            
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_Originator">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Originator:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Originator}
                                                    value={selected_Originator}
                                                    onChange={value => {
                                                        setSelected_Originator(value);
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
                                        <Form.Group className="row" controlId="validation_OriginalPriority">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Original Priority:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={OriginalPriority}
                                                    value={selected_OriginalPriority}
                                                    onChange={value => {
                                                        setSelected_OriginalPriority(value);
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
                                        <Form.Group className="row" controlId="validation_Phone">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Phone:</label>
                                            <div className="col-sm-8">
                                                <Form.Control className='formControl' type="number" value={Phone} onChange={(e) => {setPhone(e.target.value); handleInputChange();}}
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_OriginationDate">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Origination Date:</label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"  
                                                    value={OriginationDate} 
                                                    onChange={(date) => {setOriginationDate(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                /> 
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_FaultCode">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Fault Code:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={FaultCode}
                                                    value={selected_FaultCode}
                                                    onChange={value => {
                                                        handleSelectedFaultCode(value);
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
                                        <Form.Group className="row" controlId="validation_DueDate">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Due Date:</label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    className='formControl'
                                                    type="datetime-local"
                                                    value ={DueDate} 
                                                    onChange={date => {setDueDate(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    />
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
                                                    console.log(e.target.value)
                                                    setDescription(e.target.value);
                                                    handleInputChange();
                                                }}
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
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
                                        <img src={require("../../assets/images/product_images_2/thumb_logo.png")} className="sliderimg" alt="" />
                                        <img src={require("../../assets/images/product_images_2/thumb_work1.png")} className="sliderimg" alt="" />
                                        
                                    </AliceCarousel>
                                        
                                </div>

                            </div>
                            
                        </div>  

                        <section id="tab-menus">

                        <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-4">


                            {/* ************************************* Details ******************************************* */}

                            <Tab eventKey="Details" title={<><i className="mdi mdi-information"></i><span className="d-none d-md-inline"> Details</span></>} class="nav-link active">

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_AssetNo">                                  
                                            <Form.Label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>Asset No:<span style={{color: "red"}} class="required-asterisk">* </span></Form.Label>
                                            <div className="col-sm-8">
                                                <Select
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Asset_No}
                                                    // type="select" 
                                                    // className="form-control" 
                                                    // placeholder="Search Here" 
                                                    // onClick={handleShow} 
                                                    value={selected_Asset_No} 
                                                    onChange={value => {
                                                        handleSelectedAssetNo(value);
                                                        handleInputChange();
                                                      }}
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
                                        <Form.Group className="row" controlId="validation_ChargeCostCenter"> 
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Charge Cost Center:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Charge_Cost_Center}
                                                    value={selected_Charge_Cost_Center}
                                                    onChange={value => {
                                                        setSelected_Charge_Cost_Center(value);
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
                                        <Form.Group className="row" controlId="validation_WorkArea">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Work Area:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Work_Area}
                                                    value={selected_Work_Area}
                                                    onChange={value => {
                                                        setSelected_Work_Area(value);
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
                                        <Form.Group className="row" controlId="validation_WorkGroup">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Work Group:<span style={{color: "red"}} class="required-asterisk">* </span></label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Work_Group}
                                                    value={selected_Work_Group}
                                                    onChange={value => {
                                                        setSelected_Work_Group(value);
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
                                        <Form.Group className="row" controlId="validation_AssetLocation">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Asset Location:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={Asset_Location}
                                                    value={selected_Asset_Location}
                                                    onChange={value => {
                                                        setSelected_Asset_Location(value);
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
                                        <Form.Group className="row" controlId="validation_WorkType">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Work Type:</label>
                                            <div className="col-sm-8">
                                                    <Select 
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'} 
                                                    isClearable={true}  
                                                    options={WorkType}
                                                    value={selected_WorkType}
                                                    onChange={value => {
                                                        setSelected_WorkType(value);
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
                                        <Form.Group className="row" controlId="validation_Level">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Level:</label>
                                            <div className="col-sm-8">
                                            <Select  
                                                isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                isClearable={true}  
                                                options={Level}
                                                value={selected_Level}
                                                onChange={value => {
                                                    setSelected_Level(value);
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
                                        <Form.Group className="row" controlId="validation_WorkClass">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>Work Class:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={WorkClass}
                                                    value={selected_WorkClass}
                                                    onChange={value => {
                                                        setSelected_WorkClass(value);
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
                                    <div className="col-md-6"></div>  

                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_ProjectID">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>Project ID:</label>
                                            <div className="col-sm-8">
                                                <Select  
                                                    isDisabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    isClearable={true}  
                                                    options={ProjectID}
                                                    value={selected_ProjectID}
                                                    onChange={value => {
                                                        setSelected_ProjectID(value);
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
                                    <div className="col-md-12">
                                        <Form.Group className="row">
                                            <label className="col-sm-2 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                    Note1:
                                            </label>
                                            <div className="col-sm-10 descLeft-md descLeft-sm">
                                                <Form.Control 
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControlBox'
                                                    as="textarea" 
                                                    rows={6} 
                                                    value={UDFNote1}
                                                    onChange={(e) => {setUDFNote1(e.target.value); handleInputChange();}}
                                                />
                                                </div>
                                        </Form.Group>
                                    </div>
                                </div>   

                                <div className="row emailMoveUp emailMoveUp-md emailMoveUp-sm">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTopEmail down" style={{ fontSize: "13px" }}>
                                                EmailID:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_1}
                                                    onChange={(e) => {setUDFText_1(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>  

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                    Numeric1:
                                                </label>
                                                <div className="col-sm-8">
                                                    <Form.Control  
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="number"  
                                                    placeholder=".0000" 
                                                    value={UDFNumber_1} 
                                                    onChange={(e) => {setUDFNumber_1(e.target.value); handleInputChange();}}
                                                    />
                                                </div>
                                        </Form.Group>
                                    </div>  
                                </div> 

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar2:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_2}
                                                    onChange={(e) => {setUDFText_2(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>  

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Numeric2:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_2} 
                                                onChange={(e) => {setUDFNumber_2(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>  
                                </div> 

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar3:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_3}
                                                    onChange={(e) => {setUDFText_3(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>  

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Numeric3:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_3} 
                                                onChange={(e) => {setUDFNumber_3(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>  
                                </div> 

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar4:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_4}
                                                    onChange={(e) => {setUDFText_4(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>  

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                    Numeric4:
                                                </label>
                                                <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}  
                                                    className='formControl'
                                                    type="number"  
                                                    placeholder=".0000" 
                                                    value={UDFNumber_4} 
                                                    onChange={(e) => {setUDFNumber_4(e.target.value); handleInputChange();}}
                                                    />
                                                </div>
                                            </Form.Group>
                                    </div>  
                                </div> 

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar5:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_5}
                                                    onChange={(e) => {setUDFText_5(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>  

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Numeric5:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="number"  
                                                placeholder=".0000" 
                                                value={UDFNumber_5} 
                                                onChange={(e) => {setUDFNumber_5(e.target.value); handleInputChange();}}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>  
                                </div> 

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar6:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="text"
                                                value={UDFText_6}
                                                onChange={(e) => {setUDFText_6(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Datetime1:
                                            </label>
                                            <div className="col-sm-8">
                                            <Form.Control  
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}    
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
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar7:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="text"
                                                value={UDFText_7}
                                                onChange={(e) => {setUDFText_7(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Datetime2:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
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
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar8:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="text"
                                                value={UDFText_8}
                                                onChange={(e) => {setUDFText_8(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Datetime3:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="datetime-local"
                                                value={UDFDate_3} 
                                                onChange={(e) => {setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar9:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="text"
                                                value={UDFText_9}
                                                onChange={(e) => {setUDFText_9(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Datetime4:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
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
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar10:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControl'
                                                type="text"
                                                value={UDFText_10}
                                                onChange={(e) => {setUDFText_10(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Datetime5:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
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


                            {/* ************************************* UDF 1 ******************************************* */}

                            <Tab eventKey="UDF1" title={<><i className="mdi mdi-calendar-text"></i><span className="d-none d-md-inline"> UDF1</span></>} class="nav-link active">

                                <div className="row">

                                    <div className='col'>
                                        <div className="col-md-13">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label down" style={{ fontSize: "13px" }}>
                                                Varchar11:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_11}
                                                    onChange={(e) => {setUDFText_11(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-13 moveUp">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar12:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_12}
                                                    onChange={(e) => {setUDFText_12(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-13 moveUp">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar13:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_13}
                                                    onChange={(e) => {setUDFText_13(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-13 moveUp">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar14:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_14}
                                                    onChange={(e) => {setUDFText_14(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-13 moveUp">
                                            <Form.Group className="row">
                                            <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                                Varchar15:
                                            </label>
                                            <div className="col-sm-8">
                                                <Form.Control
                                                    disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                    className='formControl'
                                                    type="text"
                                                    value={UDFText_15}
                                                    onChange={(e) => {setUDFText_15(e.target.value); handleInputChange();}}
                                                    />
                                            </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="col-md-8 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-2 col-form-label top down" style={{ fontSize: "13px" }}>
                                                Note2:
                                        </label>
                                        <div className="col-sm-10 descLeft-md descLeft-sm">
                                            <Form.Control 
                                                disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                                className='formControlBox'
                                                as="textarea" 
                                                rows={15} 
                                                value={UDFNote2}
                                                onChange={(e) => {setUDFNote2(e.target.value); handleInputChange();}}
                                            />
                                            </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUp moveUpNote-md moveUpNote-sm">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                            Varchar16:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="text"
                                            value={UDFText_16}
                                            onChange={(e) => {setUDFText_16(e.target.value); handleInputChange();}}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Numeric6:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'} 
                                            className='formControl'
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_6} 
                                            onChange={(e) => {setUDFNumber_6(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Datetime6:
                                        </label>
                                        <div className="col-sm-8">
                                        <Form.Control    
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}         
                                            className='formControl'                             
                                            type="datetime-local"  
                                            value={UDFDate_6} 
                                            onChange={(e) => {setUDFDate_6(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                            Varchar17:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="text"
                                            value={UDFText_17}
                                            onChange={(e) => {setUDFText_17(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Numeric7:
                                        </label>
                                        <div className="col-sm-8">
                                        <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_7} 
                                            onChange={(e) => {setUDFNumber_7(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Datetime7:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="datetime-local"
                                            value={UDFDate_7} 
                                            onChange={(e) => {setUDFDate_7(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                            Varchar18:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="text"
                                            value={UDFText_18}
                                            onChange={(e) => {setUDFText_18(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Numeric8:
                                        </label>
                                        <div className="col-sm-8">
                                        <Form.Control  
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_8} 
                                            onChange={(e) => {setUDFNumber_8(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Datetime8:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="datetime-local"
                                            value={UDFDate_8} 
                                            onChange={(e) => {setUDFDate_8(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                            Varchar19:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="text"
                                            value={UDFText_19}
                                            onChange={(e) => {setUDFText_19(e.target.value); handleInputChange();}}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Numeric9:
                                        </label>
                                        <div className="col-sm-8">
                                        <Form.Control  
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_9} 
                                            onChange={(e) => {setUDFNumber_9(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Datetime9:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="datetime-local"
                                            value={UDFDate_9} 
                                            onChange={(e) => {setUDFDate_9(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row moveUp">
                                    <div className="col-md-4">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label labelTop down" style={{ fontSize: "13px" }}>
                                            Varchar20:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="text"
                                            value={UDFText_20}
                                            onChange={(e) => {setUDFText_20(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Numeric10:
                                        </label>
                                        <div className="col-sm-8">
                                        <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}  
                                            className='formControl'
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_10} 
                                            onChange={(e) => {setUDFNumber_10(e.target.value); handleInputChange();}}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4 moveUp-md moveUp-sm">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label top down" style={{ fontSize: "13px" }}>
                                            Datetime10:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                            disabled={ApprovalStatus === 'A' || ApprovalStatus === 'D'}
                                            className='formControl'
                                            type="datetime-local"
                                            value={UDFDate_10} 
                                            onChange={(e) => {setUDFDate_10(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss')); handleInputChange();}} //insert and show date 
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                            </Tab>


                            {/* ************************************* Status ************************************ */}

                                {/* <Tab eventKey="Status" title="Status" class="nav-link active">
                                    
                                    <div className="status-container">
                                        <div className="status-box">
                                            <Form.Group className="row">
                                            <fieldset className="border p-3 w-100">
                                            <legend className="w-auto">
                                                <font size="4">Approve Details</font>
                                            </legend>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Approved By :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="text"
                                                                value ={ApprovedBy} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Approved Date :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="datetime-local"
                                                                value ={ApprovedDate} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Work Order No :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="text"
                                                                value ={WorkOrderNo} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Work Status :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="text"
                                                                value ={WorkStatus} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>
                                            </fieldset>
                                            </Form.Group>

                                            <Form.Group className="row">
                                            <fieldset className="border p-3 w-100">
                                            <legend className="w-auto">
                                                <font size="4">Disapprove Details</font>
                                            </legend>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Rejected By :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="text"
                                                                value ={RejectedBy} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Rejected Date :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="datetime-local"
                                                                value ={RejectedDate} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <label className="col-sm-6 col-form-label">Rejected Description :</label>
                                                            <label className="col-sm-6">
                                                            <Form.Control
                                                                style={{ fontSize: "13px" }}
                                                                type="text"
                                                                value ={RejectedDescription} 
                                                                readOnly
                                                                />
                                                            </label>
                                                        </div> 
                                                    </div>
                                            </fieldset>
                                            </Form.Group>
                                        </div>
                                    </div>

                                </Tab> */}


                            {/* ************************************* List 1 ********************************* */}

                            <Tab eventKey="List 1" title={<><i className="mdi mdi-format-float-left"></i><span className="d-none d-md-inline"> List 1</span></>} class="nav-link active">

                                {/* <WorkRequestList1 name={'WorkRequestFrom'} data={{RowID: location.state.RowID }}/> */}

                            </Tab>


                            {/* ************************************* List 2 ************************************** */}

                            <Tab eventKey="List 2" title={<><i className="mdi mdi-format-float-right"></i><span className="d-none d-md-inline"> List 2</span></>} class="nav-link active" >

                                {/* <WorkRequestList2 name={'WorkRequestFrom'} data={{RowID: location.state.RowID }}/> */}

                            </Tab>

                            {/* ************************************* Reference ************************************** */}

                            <Tab eventKey="Reference" title={<><i className="mdi mdi-folder-upload"></i><span className="d-none d-md-inline"> Reference</span></>} class="nav-link active" >
                                
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

                        {ApprovalStatus === 'W' || !ApprovalStatus ? (
                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>
                        ) : null}

                        <button type="button" className="btn btn-danger btn-icon-text" onClick={onClickCancel}>
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

export default WorkRequestForm;
