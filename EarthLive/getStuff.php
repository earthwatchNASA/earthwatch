<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, 'http://eonet.sci.gsfc.nasa.gov/api/v2.1/categories');
$result = curl_exec($ch);
curl_close($ch);

$obj = json_decode($result);
//echo $result;

$arr = json_decode($result->{'categories'}, true);

foreach ($arr as $key => $value) {
	echo $key;
}

?>