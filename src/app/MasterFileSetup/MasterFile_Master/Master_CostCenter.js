import React,{useState,useEffect} from "react";
import MasterFileList from "../MasterFileList";


const Master_CostCenter = (props) => {

    useEffect(() => {
       
        console.log(props.location.state.data);

      },[]);


    return (

        <div>
            
            <MasterFileList name={props.location.state.data} />
        </div>
        
    );
}

export default Master_CostCenter;