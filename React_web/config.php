<?php

//CMMS_local
//$_serverName = "ESSB01-DESKTOP\SQLEXP2019";
//$_database = "cmms_bdcm_prod";

//Sunway_local
$_serverName = "Jason-Lim-PC\MSSQLSERVER01";
$_database = "cmms_cpi";



/* $_serverName = "192.168.0.5\sql2019dev";
$_database = "sunway";  */


$connectionInfo = array( "Database"=>$_database, "UID"=>"sa", "PWD"=>"mgr","CharacterSet" => "UTF-8");
$conn = sqlsrv_connect($_serverName, $connectionInfo);
$syn_conn = sqlsrv_connect($_serverName, $connectionInfo);

if( $conn ) {
     //echo "Connection established.<br />";
}else{
     //echo "Connection could not be established.<br />";
     //die( print_r( sqlsrv_errors(), true));
}

//$myIp = getHostByName(getHostName());

//$IP = get_client_ip();
$IP = "192.168.0.52:8080";
$URL = "http:\\\\".$IP."\\CMMS_Standard\\temp\\";
$URLtn = "http:\\\\".$IP."\\CMMS_Standard\\temp\\thumbnail\\";
$api_ver = '1.15';
function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}



// $sql = 'SELECT * FROM itm_mst';
// $stmt = sqlsrv_query( $conn, $sql);

// if( !$stmt ) {
     // echo "Error executing query.</br>";
     // die( print_r( sqlsrv_errors(), true));
// }

// $json = array();

// do {
     // while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     // $json[] = $row;
     // }
// } while ( sqlsrv_next_result($stmt) );

// echo json_encode($json);

// sqlsrv_free_stmt( $stmt);
// sqlsrv_close( $conn);


?>