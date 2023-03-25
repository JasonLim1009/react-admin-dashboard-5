
import React,{useState,useEffect} from "react";
import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import Pagination from "@material-ui/lab/Pagination";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";
import SearchBar from "material-ui-search-bar";

const MasterFileList = (props) => { 

    const history = useHistory();

    const [title, settitle ]=useState("");
    const [columns,setcolumns]=useState([]);
    const [data,setdata]=useState([]);

    //Master
    const get_master_usergroup =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_usergroup(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_autonumber =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_autonumber(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_craftcode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_craftcode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_statuscategory =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_statuscategory(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_statustype =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_statustype(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_costcenter =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_costcenter(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_account =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_account(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_currencycode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_currencycode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_taxcode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_taxcode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_uomtype =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_uomtype(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_uommaster =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_uommaster(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_uomconfactor =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_uomconfactor(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_billto =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_billto(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_shipto =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_shipto(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_supplierstatus =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_supplierstatus(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_projectmaster =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_projectmaster(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_master_customerstatus =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_master_customerstatus(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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


    //Asset
    const get_asset_type =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_type(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_group_code =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_group_code(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_code =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_code(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_critical_factor =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_critical_factor(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_status =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_status(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_work_area =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_work_area(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_location =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_location(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_asset_level =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_asset_level(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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


    //Work
    const get_work_workstatus =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workstatus(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {

            
                setcolumns(responseJson.data.data.header);


                setdata(responseJson.data.data.result);

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
    const get_work_workpriority =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workpriority(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workgroup =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workgroup(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workclass =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workclass(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_worktype =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_worktype(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workfaultcode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workfaultcode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workcausecode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workcausecode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workactioncode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workactioncode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_work_workdelaycode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_work_workdelaycode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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

    //Material
    const get_material_locationcategory =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_material_locationcategory(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_material_location =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_material_location(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_material_status =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_material_status(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_material_commoditycode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_material_commoditycode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_material_groupcode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_material_groupcode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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

    //PM
    const get_pm_frequencycode =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_pm_frequencycode(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_pm_groupmaster =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_pm_groupmaster(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_pm_taskgroup =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_pm_taskgroup(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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

    //Purchasing
    const get_purchasing_prstatus =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_prstatus(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_purchasing_postatus =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_postatus(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_purchasing_contractstatus  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_contractstatus (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_purchasing_contractgroup  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_contractgroup (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_purchasing_type  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_type (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_purchasing_priority  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_purchasing_priority (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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


    const get_personnel_employeestatus  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_personnel_employeestatus (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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
    const get_invoice_paymentmethod  =(site_ID)=>{

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_invoice_paymentmethod (site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               
                setcolumns(responseJson.data.data.header);
                setdata(responseJson.data.data.result);

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

    
    useEffect(() => {
        let site_ID = localStorage.getItem("site_ID");
        //console.log(site_ID);
        //console.log(props.location.state.data);
        console.log(props.name);

        if(props.name == 'Asset_Type'){
            settitle('Asset Type')
            get_asset_type(site_ID);
        }else if(props.name == 'Asset_GroupCode'){
            settitle('Asset GroupCode')
            get_asset_group_code(site_ID);
        }else if(props.name == 'Asset_Code'){
            settitle('Asset Code')
            get_asset_code(site_ID);
        }else if(props.name == 'Asset_CriticalFactor'){
            settitle('Asset CriticalFactor')
            get_asset_critical_factor(site_ID);
        }else if(props.name == 'Asset_Status'){
            settitle('Asset Status')
            get_asset_status(site_ID);
        }else if(props.name == 'Asset_WorkArea'){
            settitle('Asset WorkArea')
            get_asset_work_area(site_ID);
        }else if(props.name == 'Asset_Location'){
            settitle('Asset Location')
            get_asset_location(site_ID);
        }else if(props.name == 'Asset_Level'){
            settitle('Asset Level')
            get_asset_level(site_ID);
        }else if(props.name == 'WorkStatus'){
            settitle('Work Status')
            get_work_workstatus(site_ID);
        }
        else if(props.name == 'WorkPriority'){
            settitle('Work Priority')
            get_work_workpriority(site_ID);
        }
        else if(props.name == 'WorkGroup'){
            settitle('Work Group')
            get_work_workgroup(site_ID);
        }
        else if(props.name == 'WorkClass'){
            settitle('Work Class')
            get_work_workclass(site_ID);
        }
        else if(props.name == 'WorkType'){
            settitle('Work Type')
            get_work_worktype(site_ID);
        }
        else if(props.name == 'WorkFaultCode'){
            settitle('Work Fault Code')
            get_work_workfaultcode(site_ID);
        }
        else if(props.name == 'WorkCauseCode'){
            settitle('Work Cause Code')
            get_work_workcausecode(site_ID);
        }
        else if(props.name == 'WorkActionCode'){
            settitle('Work Action Code')
            get_work_workactioncode(site_ID);
        }
        else if(props.name == 'WorkDelayCode'){
            settitle('Work Delay Code')
            get_work_workdelaycode(site_ID);
        }
        else if(props.name == 'Master_UserGroup'){
            settitle('Master User Group')
            get_master_usergroup(site_ID);
        }
        else if(props.name == 'Master_AutoNumber'){
            settitle('Master Auto Number')
            get_master_autonumber(site_ID);
        }
        else if(props.name == 'Master_CraftCode'){
            settitle('Master Craft Code')
            get_master_craftcode(site_ID);
        }
        else if(props.name == 'Master_statusCategory'){
            settitle('Master status Category')
            get_master_statuscategory(site_ID);
        }
        else if(props.name == 'Master_StatusType'){
            settitle('Master Status Type')
            get_master_statustype(site_ID);
        }
        else if(props.name == 'Master_CostCenter'){
            settitle('Master Cost Center')
            get_master_costcenter(site_ID);
        }
        else if(props.name == 'Master_Account'){
            settitle('Master Account')
            get_master_account(site_ID);
        }
        else if(props.name == 'Master_CurrencyCode'){
            settitle('Master Currency Code')
            get_master_currencycode(site_ID);
        }
        else if(props.name == 'Master_TaxCode'){
            settitle('Master Tax Code')
            get_master_taxcode(site_ID);
        }
        else if(props.name == 'Master_UOMType'){
            settitle('Master UOM Type')
            get_master_uomtype(site_ID);
        }
        else if(props.name == 'Master_UOMMaster'){
            settitle('Master UOM Master')
            get_master_uommaster(site_ID);
        }
        else if(props.name == 'Master_UOMConFactor'){
            settitle('Master UOM Con Factor')
            get_master_uomconfactor(site_ID);
        }

       else if(props.name == 'Master_BillTo'){
            settitle('Master Bill To')
            get_master_billto(site_ID);
        }
        else if(props.name == 'Master_ShipTo'){
            settitle('Master Ship To')
            get_master_shipto(site_ID);
        }
        else if(props.name == 'Master_SupplierStatus'){
            settitle('Master Supplier Status')
            get_master_supplierstatus(site_ID);
        }
        else if(props.name == 'Master_ProjectMaster'){
            settitle('Master Project Master')
            get_master_projectmaster(site_ID);
        }
        else if(props.name == 'Master_CustomerStatus'){
            settitle('Master Customer Status')
            get_master_customerstatus(site_ID);
        }
        else if(props.name == 'Material_LocationCategory'){
            settitle('Material Location Category')
            get_material_locationcategory(site_ID);
        }
        else if(props.name == 'Material_Location'){
            settitle('Material Location')
            get_material_location(site_ID);
        }
        else if(props.name == 'Material_Status'){
            settitle('Material Status')
            get_material_status(site_ID);
        }
        else if(props.name == 'Material_CommodityCode'){
            settitle('Material Commodity Code')
            get_material_commoditycode(site_ID);
        }
        else if(props.name == 'Material_GroupCode'){
            settitle('Material Group Code')
            get_material_groupcode(site_ID);
        }
        else if(props.name == 'PM_FrequencyCode'){
            settitle('PM Frequency Code')
            get_pm_frequencycode(site_ID);
        }
        else if(props.name == 'PM_GroupMaster'){
            settitle('PM Group Master')
            get_pm_groupmaster(site_ID);
        }
        else if(props.name == 'PM_TaskGroup'){
            settitle('PM Task Group')
            get_pm_taskgroup(site_ID);
        }
        else if(props.name == 'Purchasing_PRStatus'){
            settitle('Purchasing PR Status')
            get_purchasing_prstatus(site_ID);
        }
        else if(props.name == 'Purchasing_POStatus'){
            settitle('Purchasing PO Status')
            get_purchasing_postatus(site_ID);
        }
        else if(props.name == 'Purchasing_ConstractStatus'){
            settitle('Purchasing Constract Status')
            get_purchasing_contractstatus (site_ID);
        }
        else if(props.name == 'Purchasing_ConstractGroup'){
            settitle('Purchasing Constract Group')
            get_purchasing_contractgroup (site_ID);
        }
        else if(props.name == 'Purchasing_Type'){
            settitle('Purchasing Type')
            get_purchasing_type (site_ID);
        }
        else if(props.name == 'Purchasing_Priority'){
            settitle('Purchasing Priority')
            get_purchasing_priority (site_ID);
        }
        else if(props.name == 'Personnal_EmployeeStatus'){
            settitle('Personnal Employee Status')
            get_personnel_employeestatus (site_ID);
        }
        else if(props.name == 'Invoice_PaymentMethod'){
            settitle('Invoice Payment Method')
            get_invoice_paymentmethod (site_ID);
        }

      },[]);


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


      const IndeterminateCheckbox2 = React.forwardRef(
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
        
        
    } = useTable({ columns, data },useSortBy,useRowSelect,useResizeColumns,

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
            console.log(data)  
            console.log(props.name) 
            
            if(props.name == 'Asset_Type'){
                console.log(data.col4)  
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_Type"}})
    
            }else if(props.name == 'Asset_GroupCode'){
                console.log(data.col4)  
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_GroupCode"}})
            }else if(props.name == 'Asset_Code'){
                console.log(data.col4)  
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_Code"}})
            }else if(props.name == 'Asset_CriticalFactor'){
                console.log(data.col4) 
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_CriticalFactor"}}) 
            }else if(props.name == 'Asset_Status'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Asset_Status"}})  
            }else if(props.name == 'Asset_WorkArea'){
                console.log(data.col4)  
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_WorkArea"}})  
            }else if(props.name == 'Asset_Location'){
                console.log(data.col11)   
                history.push("/MasterFileSelect" , {select :{Rowid:data.col11,ScreenName:"Asset_Location"}})
            }else if(props.name == 'Asset_Level'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Asset_Level"}})  
            }else if(props.name == 'WorkStatus'){
                console.log(data.col8)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col8,ScreenName:"WorkStatus"}})
            }else if(props.name == 'WorkPriority'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"WorkPriority"}})  
            }else if(props.name == 'WorkGroup'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"WorkGroup"}})
            }else if(props.name == 'WorkClass'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkClass"}})
            }else if(props.name == 'WorkType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkType"}})
            }else if(props.name == 'WorkFaultCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkFaultCode"}})
            }else if(props.name == 'WorkCauseCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkCauseCode"}})
            }else if(props.name == 'WorkActionCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkActionCode"}})
            }else if(props.name == 'WorkDelayCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"WorkDelayCode"}})
            }else if(props.name == 'Material_LocationCategory'){
                console.log(data.col9)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col9,ScreenName:"Material_LocationCategory"}})
            }else if(props.name == 'Material_Location'){
                console.log(data.col14)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col14,ScreenName:"Material_Location"}})
            }else if(props.name == 'Material_Status'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Material_Status"}})
            }else if(props.name == 'Material_CommodityCode'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Material_CommodityCode"}})
            }else if(props.name == 'Material_GroupCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Material_GroupCode"}})
            }else if(props.name == 'PM_FrequencyCode'){
                console.log(data.col13)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col13,ScreenName:"PM_FrequencyCode"}})
            }else if(props.name == 'PM_GroupMaster'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"PM_GroupMaster"}})
            }else if(props.name == 'PM_TaskGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"PM_TaskGroup"}})
            }else if(props.name == 'Purchasing_PRStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Purchasing_PRStatus"}})
            }else if(props.name == 'Purchasing_POStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Purchasing_POStatus"}})
            }else if(props.name == 'Purchasing_ConstractStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Purchasing_ConstractStatus"}})
            }else if(props.name == 'Purchasing_ConstractGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Purchasing_ConstractGroup"}})
            }else if(props.name == 'Purchasing_Type'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Purchasing_Type"}})
            }else if(props.name == 'Purchasing_Priority'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Purchasing_Priority"}})
            }else if(props.name == 'Master_UserGroup'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Master_UserGroup"}})
            }else if(props.name == 'Master_AutoNumber'){
                console.log(data.col7)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col7,ScreenName:"Master_AutoNumber"}})
            }else if(props.name == 'Master_CraftCode'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Master_CraftCode"}})
            }else if(props.name == 'Master_statusCategory'){
                console.log(data.col3)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col3,ScreenName:"Master_statusCategory"}})
            }else if(props.name == 'Master_StatusType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Master_StatusType"}})
            }else if(props.name == 'Master_CostCenter'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Master_CostCenter"}})
            }else if(props.name == 'Master_Account'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Master_Account"}})
            }else if(props.name == 'Master_CurrencyCode'){
                console.log(data.col7)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col7,ScreenName:"Master_CurrencyCode"}})
            }else if(props.name == 'Master_TaxCode'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Master_TaxCode"}})
            }else if(props.name == 'Master_UOMType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Master_UOMType"}})
            }else if(props.name == 'Master_UOMMaster'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Master_UOMMaster"}})
            }else if(props.name == 'Master_UOMConFactor'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col4,ScreenName:"Master_UOMConFactor"}})
            }else if(props.name == 'Master_BillTo'){
                console.log(data.col10)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col10,ScreenName:"Master_BillTo"}})
            }else if(props.name == 'Master_ShipTo'){
                console.log(data.col10)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col10,ScreenName:"Master_ShipTo"}})
            }else if(props.name == 'Master_SupplierStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Master_SupplierStatus"}})
            }else if(props.name == 'Master_ProjectMaster'){
                console.log(data.col12)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col12,ScreenName:"Master_ProjectMaster"}})
            }else if(props.name == 'Master_CustomerStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Master_CustomerStatus"}})
            }else if(props.name == 'Personnal_EmployeeStatus'){
                console.log(data.col6)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col6,ScreenName:"Personnal_EmployeeStatus"}})
            }else if(props.name == 'Invoice_PaymentMethod'){
                console.log(data.col5)
                history.push("/MasterFileSelect" , {select :{Rowid:data.col5,ScreenName:"Invoice_PaymentMethod"}})
    
    
    
    
    
    
    
            }
            
            
               
    
        };
    
    
        const handleonClick_new = () => {      
            
            
            if(props.name == 'Asset_Type'){
                  
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_Type_New"}})
    
            }else if(props.name == 'Asset_GroupCode'){
    
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_GroupCode_New"}})
               
            }else if(props.name == 'Asset_Code'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_Code_New"}})
               
            }else if(props.name == 'Asset_CriticalFactor'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_CriticalFactor_New"}})
                 
            }else if(props.name == 'Asset_Status'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_Status_New"}})
               
            }else if(props.name == 'Asset_WorkArea'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_WorkArea_New"}})
                  
            }else if(props.name == 'Asset_Location'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_Location_New"}})
                 
            }else if(props.name == 'Asset_Level'){
                history.push("/MasterFileSelect" , {select :{ScreenName:"Asset_Level_New"}})
               
            }else if(props.name == 'WorkStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkStatus_New"}})  
            
            }else if(props.name == 'WorkPriority'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkPriority_New"}})
                
            }else if(props.name == 'WorkGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkGroup_New"}})
            }else if(props.name == 'WorkClass'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkClass_New"}})
            }else if(props.name == 'WorkType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkType_New"}}) 
            }else if(props.name == 'WorkFaultCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkFaultCode_New"}})
            }else if(props.name == 'WorkCauseCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkCauseCode_New"}})
            }else if(props.name == 'WorkActionCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkActionCode_New"}})
            }else if(props.name == 'WorkDelayCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"WorkDelayCode_New"}}) 
            }else if(props.name == 'Material_LocationCategory'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Material_LocationCategory_New"}})
            }else if(props.name == 'Material_Location'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Material_Location_New"}}) 
            }else if(props.name == 'Material_Status'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Material_Status_New"}})  
            }else if(props.name == 'Material_CommodityCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Material_CommodityCode_New"}}) 
            }else if(props.name == 'Material_GroupCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Material_GroupCode_New"}}) 
            }else if(props.name == 'PM_FrequencyCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"PM_FrequencyCode_New"}})   
            }else if(props.name == 'PM_GroupMaster'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"PM_GroupMaster_New"}})
            }else if(props.name == 'PM_TaskGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"PM_TaskGroup_New"}})
            }else if(props.name == 'Purchasing_PRStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_PRStatus_New"}}) 
            }else if(props.name == 'Purchasing_POStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_POStatus_New"}})
            }else if(props.name == 'Purchasing_ConstractStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_ConstractStatus_New"}})
            }else if(props.name == 'Purchasing_ConstractGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_ConstractGroup_New"}}) 
            }else if(props.name == 'Purchasing_Type'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_Type_New"}}) 
            }else if(props.name == 'Purchasing_Priority'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Purchasing_Priority_New"}})
            }else if(props.name == 'Master_UserGroup'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_UserGroup_New"}})
            }else if(props.name == 'Master_AutoNumber'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_AutoNumber_New"}})
            }else if(props.name == 'Master_CraftCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_CraftCode_New"}})  
            }else if(props.name == 'Master_statusCategory'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_statusCategory_New"}}) 
            }else if(props.name == 'Master_StatusType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_StatusType_New"}}) 
            }else if(props.name == 'Master_CostCenter'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_CostCenter_New"}})             
            }else if(props.name == 'Master_Account'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_Account_New"}}) 
            }else if(props.name == 'Master_CurrencyCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_CurrencyCode_New"}}) 
            }else if(props.name == 'Master_TaxCode'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_TaxCode_New"}}) 
            }else if(props.name == 'Master_UOMType'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_UOMType_New"}})
            }else if(props.name == 'Master_UOMMaster'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_UOMMaster_New"}})
            }else if(props.name == 'Master_UOMConFactor'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_UOMConFactor_New"}})
            }else if(props.name == 'Master_BillTo'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_BillTo_New"}})
            }else if(props.name == 'Master_ShipTo'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_ShipTo_New"}})
            }else if(props.name == 'Master_SupplierStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_SupplierStatus_New"}}) 
            }else if(props.name == 'Master_ProjectMaster'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_ProjectMaster_New"}}) 
            }else if(props.name == 'Master_CustomerStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Master_CustomerStatus_New"}})
            }else if(props.name == 'Personnal_EmployeeStatus'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Personnal_EmployeeStatus_New"}}) 
            }else if(props.name == 'Invoice_PaymentMethod'){
                console.log(data.col4)
                history.push("/MasterFileSelect" , {select :{ScreenName:"Invoice_PaymentMethod_New"}})     
                
           
            }
            
            
               
    
        };
    

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                   {title}
                </h3>                  
            </div> 
            <div className="card">           
                <div className="card-body">

                    
                    <div className="page-header">

                         <div className="col">                       

                            <SearchBar
                                className="form-control"                            
                            />                                                          
                        </div>

                        <div className="col">
                            <button type="button" className="btn btn-primary btn-rounded">Search</button>                                                               
                        </div>                        
                             
                    </div> 

                    <div className="page-header">
                        <div className="template-demo" >
                            <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={handleonClick_new}>
                                <i className="mdi mdi-file-check btn-icon-prepend"></i> New  
                            </button>
                        
                             <button type="button" className="btn btn-outline-danger btn-icon-text"  >
                                <i className="mdi mdi-delete-forever btn-icon-prepend"></i> Delete 
                            </button>
                        </div>                     
                     </div>   


                    <div className="table-responsive ">
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
            </div>
        </div>
    );
}

export default MasterFileList;