import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import APIServices from "../services/APIServices";
import Moment from 'moment';
import styled from 'styled-components';


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
    left: 14px;
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

const WorkOrderStatusAudit = (props) => {


  const [steps, setsteps] = useState([]);
  
  const [handlesresult, sethandlesresult] = useState([]);

  const [WorkOrderNo, setWorkOrderNo] = useState("");

  const [Status, setStatus] = useState([]);

  const [StartDate, setStartDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

  const [EndDate, setEndDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));



  const getsteps = (site_ID, RowID, wko_sts_wo_no) => {

   
    Swal.fire({ title: 'Please Wait !', allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_workordermaster_statusaudit(site_ID, wko_sts_wo_no, RowID).then((responseJson) => {
      console.log('get_workordermaster_statusaudit', responseJson.data.data)

      if (responseJson.data.status === 'SUCCESS') {


        console.log('get_workordermaster_statusaudit', responseJson.data.data)

        // var stepsvalue =[];

        // for (var index in responseJson.data.data.WorkorderStatus) { 

        //   stepsvalue.push(responseJson.data.data.WorkorderStatus.item[index])

        // }


        let Status = responseJson.data.data.map((item, index) => ({
          label: item.wko_sts_status,
          label1: item.wko_sts_status,
          label2: item.wko_sts_originator,
          label3: item.wko_sts_originator,
          label4: `${new Date(item.wko_sts_start_date.date).toLocaleString("default", {
            weekday: "short",
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}`,
          label5: item.wko_sts_duration,
          step: index + 1
        // step: item.length+1
        // {console.log(item.length)}
        // step: +1
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
  }

 // console.log(JSON.stringify(Status));


  useEffect(() => {
    let site_ID = localStorage.getItem("site_ID");
    //get_workordermaster_statusaudit(site_ID);
    console.log('select WKO_RowID',props.data.RowID);
    console.log('select WKO_Workorderno', props.data.Workorderno);

    getsteps(site_ID, props.data.RowID, props.data.Workorderno);
    console.log('getsteps here: ', getsteps(site_ID, props.data.RowID, props.data.Workorderno));
  }, []);





  return (
    <div>
      <div className="table-responsive">
          <table className="table table-hover table-bordered ">
              
                <div class="p-4 text-center text-lg rounded-top">
                {/************* * {props.data.Workorderno} * ************/}
                  <h3 className="page-title">Work Order Status Audit</h3>
                </div>
                  <div style={{ width: "100%", maxWidth: "600px", padding: "0 160px", marginTop: "-60px", marginLeft: "-20px"  }}>

                    <StepContainer>
                      {steps.map(({ step, label, label1, label2, label3, label4, label5 }) => (
                        <div key={step} style={{ position: "relative", zIndex: 1 }}>
                          <div style={{ fontSize: "11px", color: "grey", position: 'absolute', left: '-100px', top: '45px', width: '100px', height: '20px', borderRadius: '5%', backgroundColor: '#f3f3f3' }}>{label5}</div>
                            <div step={step} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#4694d1', border: `3px solid ${step === 'completed' ? '#0080FF' : '#F3E7F3'}`, transition: '0.4s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ fontSize: "15px", color: "#f3e7f3" }}>{step}</div>
                            </div>

                            <div style={{ position: 'relative', bottom: '30px', textAlign: 'left', left: '50px' }}>
                              <div key={step} style={{ fontSize: "15px", color: "#4a154b" }}>{label}({label1})</div>
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
          </table>
      </div>
    </div>
  )
}

export default WorkOrderStatusAudit;
