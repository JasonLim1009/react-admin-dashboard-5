import React,{useState,useEffect} from "react";
import MasterFileList from "../MasterFileList";


const Purchasing_Priority = (props) => {

    useEffect(() => {
       
        console.log(props.location.state.data);

      },[]);


    return (

        <div>            
            <MasterFileList name={props.location.state.data} />
        </div>
        
    );
}

export default Purchasing_Priority;