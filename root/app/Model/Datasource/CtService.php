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
          urlencode($year),
          urlencode($make),
          urlencode($model),
          urlencode($body),
          urlencode($option),
          urlencode($size)
        );
        
        $query = '?vehicle='.implode('_', $params).'#REGULAR#Both&showSavedVehicle=true&un_form_encoding=utf-8';
        $base_url = self::$ctServiceUrl . '/' . $lang . '/tires' . '/search/';
        
        $cleaned_query = str_replace(array(' ', '/', '#', ','), array('%2B', '%25252F', '%23', '%2C'), $query);
        
        $url = $base_url . $cleaned_query;
        
        $opts = array('http' => array('header'=> 'Cookie: ' . $_SERVER['HTTP_COOKIE']."\r\n"));
        $context = stream_context_create($opts);
        
        $contents = file_get_contents($url);
        
        $DOM = new DOMDocument;
        @$DOM->loadHTML($contents);
        
        echo($url."\n");
        //get all H1
        $item = $DOM->getElementById('productList');
        
        if ($item == null) {
          // No search results found
          return array();
        } else {
          $children = $item->childNodes;
          for ($i = 0; $i < $children->length; $i++) {
            echo $children->item($i)->nodeValue . "<br/>";
          }
          
          return $ret;
        }
    }
}