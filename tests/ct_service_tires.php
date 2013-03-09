<?php
require('..\\root\\app\\Model\\Datasource\\CtService.php');

#$response = CtService::getTires('en', '2013', 'Acura', 'ILX', '4 Dr Sedan', 'Base', '205/55R16');

# 2007 Honda Ridgeline 4 Dr Crew Cab Pickup, 5 Ft Bed RTL: 7.5x17
$sort = false;
$response = CtService::getTiresByVehicle('en', '2007', 'Honda', 'Ridgeline', '4 Dr Crew Cab Pickup, 5 Ft Bed', 'RTL', '7.5x17', $sort);

print_r($response);