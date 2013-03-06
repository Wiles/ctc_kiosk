<?php
/**
 * Canadian Tire website scraper
 */
class CtService {

    /**
     * Web Service Url
     */
    private static $ctServiceUrl = 'http://tires.canadiantire.ca';
    
    /**
     * Gets Tires
     *
     * 
     * @param $year   - 
     * @param $make   - 
     * @param $model  - 
     * @param $body   - 
     * @param $option - 
     * @param $size   -
     */
    public static function getTires($lang, $year, $make, $model, $body, $option, $size) {
        $params = array(
          $year,
          $make,
          $model,
          $body,
          $option,
          $size
        );
        
        $query = '?vehicle='.implode('_', $params).'#REGULAR#Both&showSavedVehicle=true&un_form_encoding=utf-8';
        $base_url = self::$ctServiceUrl . '/' . $lang . '/tires' . '/search/';
        
        $cleaned_query = str_replace(array(' ', '/', '#'), array('%2520', '%25252F', '%252523'), $query);
        
        $url = $base_url . $cleaned_query;
        
        $opts = array('http' => array('header'=> 'Cookie: ' . $_SERVER['HTTP_COOKIE']."\r\n"));
        $context = stream_context_create($opts);
        
        $contents = file_get_contents($url);
        
        $DOM = new DOMDocument;
        $DOM->loadHTML($contents);

        echo($url);
        //get all H1
        $items = $DOM->getElementsByTagName('h1');

        //display all H1 text
        for ($i = 0; $i < $items->length; $i++) {
          echo $items->item($i)->nodeValue . "<br/>";
        }
        
        return $ret;
    }
}