

import React,{useState,useEffect} from "react";
import Table from "../tables/Table";



const AssetRegister = (props) => {    
    useEffect(() => {
       
        console.log(props.location.state.data);

      },[]);
   
    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    Asset Register
                </h3>       
                {/* <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <div className="template-demo">
                            <button type="button" className="btn btn-outline-secondary btn-rounded btn-icon">
                                <i className="mdi mdi-dots-vertical"></i>
                            </button>

                        <button type="button" className="btn btn-outline-primary btn-icon-text">
                            <i className="mdi mdi-file-check btn-icon-prepend"></i> New Asset 
                            </button>
                        
                        </div>
                    </ol>
                </nav>          */}
            </div> 
            <Table name={'AssetRegister'} />
        </div>
       
    );
}

export default AssetRegister;