<?php
class CarProService {

    /**
     * CarProNetwork Web Service Url
     */
    private static $carproServiceUrl = 'http://ctcjs.carpronetwork.com/tools.asmx';
    
    /**
     * CarProNetwork Credentials
     */
    private static $username = '"ctc"';
    private static $password = '"w3bs3rvic3s"';
    
    /**
     * CarProNetwork format parameter
     */
    private static $format = 'json';
    
    /**
     * Gets years
     *
     * @var year
     * @var isCrossOver
     */
    public static function getYears($year, $isCrossOver) {
        // get response
        $response = self::callWebService(
            self::$carproServiceUrl,
            'getYears', 
            array(
                'Year' => $year,
                'isVehicleCrossOver' => $isCrossOver,
                'format' => self::$format,
                'Username' => self::$username,
                'Password' => self::$password
                ));
                
        // clean up response
        $ret = self::sanitizeJson($response);
        
        return $ret;
    }

    /**
     * Gets car makes by year
     *
     * @var year
     * @var make
     * @var isCrossOver
     */
    public static function getMakes($year, $make, $isCrossOver) {
        // get response
        $response = self::callWebService(
            self::$carproServiceUrl,
            'getMakes', 
            array(
                'Year' => $year,
                'Make' => $make,
                'isVehicleCrossOver' => $isCrossOver,
                'format' => self::$format,
                'Username' => self::$username,
                'Password' => self::$password
                ));
                
        // clean up response
        $ret = self::sanitizeJson($response);
        
        return $ret;
    }
    
    /**
     * Gets car models and year and make
     *
     * @var year
     * @var make
     * @var model
     * @var isCrossOver
     */
    public static function getModels($year, $make, $model, $isCrossOver) {
        // get response
        $response = self::callWebService(
            self::$carproServiceUrl,
            'getModels', 
            array(
                'Year' => $year,
                'Make' => $make,
                'Model' => $model,
                'isVehicleCrossOver' => $isCrossOver,
                'format' => self::$format,
                'Username' => self::$username,
                'Password' => self::$password
                ));
                
        // clean up response
        $ret = self::sanitizeJson($response);
        
        return $ret;
    }
    
    /**
     * Gets car bodies and year, make, and model
     *
     * @var year
     * @var make
     * @var model
     */
    public static function getBodies($year, $make, $model) {
        // get response
        $response = self::callWebService(
            self::$carproServiceUrl,
            'getChassis', 
            array(
                'Year' => $year,
                'Make' => $make,
                'Model' => $model,
                'format' => self::$format,
                'Username' => self::$username,
                'Password' => self::$password
                ));
                
        // clean up response
        $ret = self::sanitizeJson($response);
        
        return $ret;
    }
    
    /**
     * Gets car options and year, make, model, and body
     *
     * @var year
     * @var make
     * @var model
     * @var body
     */
    public static function getOptions($year, $make, $model, $body) {
        // get response
        $response = self::callWebService(
            self::$carproServiceUrl,
            'getOptions', 
            array(
                'Year' => $year,
                'Make' => $make,
                'Model' => $model,
                'Chassis' => $body,
                'format' => self::$format,
                'Username' => self::$username,
                'Password' => self::$password
                ));
                
        // clean up response
        $ret = self::sanitizeJson($response);
        
        return $ret;
    }
    
    /**
     * CarPro web service wrapper/caller.
     */
    private static function callWebService($serviceUrl, $method, $arguments) {
        $args = '?';
        $bool = false;
        
        // build query string
        foreach($arguments as $key => $value) {
            if ($bool) {
                $args .= '&';
            }
            
            $bool = true;
            
            $args .= $key . '=' . str_replace(' ', '%20', $value) .'';
        }
        
        // get the response
        $url = $serviceUrl . '/' . $method . $args;
        $response = file_get_contents((string)$url);
        
        // remove brackets
        $response = substr($response, 1, -2);
        
        return $response;
    }
    
    /**
     * Cleans up CarPro's JSON.
     */
    private static function sanitizeJson($json) {
        $j = json_decode($json, true);
        $ret = array();
        
        foreach($j["d"] as $d) {
            array_push(
                $ret,
                array(
                    'Value' => $d["Attribute"],
                    'Selected' => $d["Selected"]));
        }
        
        return $ret;
    }
}
?>