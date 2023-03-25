import React,{useState,useEffect} from "react";
import MasterFileList from "../MasterFileList";


const Material_Status = (props) => {

    useEffect(() => {
       
        console.log(props.location.state.data);

      },[]);


    return (

        <div>            
            <MasterFileList name={props.location.state.data} />
        </div>
        
    );
}

export default Material_Status;