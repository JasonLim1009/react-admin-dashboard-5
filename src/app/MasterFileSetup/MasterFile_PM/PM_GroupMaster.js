import React,{useState,useEffect} from "react";
import MasterFileList from "../MasterFileList";


const PM_GroupMaster = (props) => {

    useEffect(() => {
       
        console.log(props.location.state.data);

      },[]);


    return (

        <div>            
            <MasterFileList name={props.location.state.data} />
        </div>
        
    );
}

export default PM_GroupMaster;