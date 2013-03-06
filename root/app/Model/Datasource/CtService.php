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
    public static function getTiresByVehicle($lang, $year, $make, $model, $body, $option, $size) {
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
        
        echo($url."\n");
        $contents = file_get_contents($url);
        
        return self::extractContents($contents);
    }
    
    private static function extractContents($contents) {
        $DOM = new DOMDocument;
        @$DOM->loadHTML($contents);
        
        $item = $DOM->getElementById('productList');
        
        if ($item == null) {
          // No search results found
          return array();
        } else {
          // Find all the children of the product list
          $children = $item->childNodes;
          for ($i = 0; $i < $children->length; $i++) {
            $cur = $children->item($i);
            if (!self::isDomElement($cur)) {
              continue;
            }
            
            $category = self::extractCategory($cur);
            $img = self::extractImage($cur);
            $desc = self::extractDescription($cur);
            $price = self::extractPrice($cur);
            
            $data = array_merge($category, $img, $desc, $price);
            print_r($data);
            echo "<br/>";
          }
          
          return $ret;
        }
    }
        
    private static function extractCategory($element) {
      $children = $element->getElementsByTagName('li');
      
      for ($i = 0; $i < $children->length; $i++) {
        $cur = $children->item($i);
        
        if (self::hasClass($cur, 'category')) {
          for ($j = 0; $j < $cur->childNodes->length; $j++) {
            $c = $cur->childNodes->item($j);
            if (self::hasClass($c, 'metaValue')) {
              // Get the URL for the category
              $category = $c->childNodes->item(1);
              
              $data = array(
                'category_href' => $category->getAttribute('href'),
                'category_name' => $category->nodeValue
              );
              
              return $data;
            }
          }
        }
      }
      
      // Couldn't find a category
      return array();
    }
    
    private static function extractImage($element) {
        // Find all the elements of an item on the product list
        // This will allow the extraction of the product description, ratings, image, etc...
        $liChildren = $element->childNodes;
        for ($j = 0; $j < $liChildren->length; $j++) {
          $liCur = $liChildren->item($j);
          
          if (self::isDomElement($liCur) && $liCur->getAttribute('class') === 'productImage') {
            // Get the product image and id
            $imgChildren = $liCur->getElementsByTagName('img');
            $img = $imgChildren->item(0);
            
            // Get the compare id (the id for the tire, so it can be used in a comparison)
            $labelChildren = $liCur->getElementsByTagName('label');
            $label = $labelChildren->item(0);
            
            $data = array(
              'img_url' =>      $img->getAttribute('src'),
              'tire_id' => $label->getAttribute('for')
            );
            
            return $data;
          }
        }

        // Couldn't find image
        return array();
    }
    
    private static function extractDescription($element) {
      $liChildren = $element->getElementsByTagName('ul');
      for ($j = 0; $j < $liChildren->length; $j++) {
        $liCur = $liChildren->item($j);
      
        if (self::hasClass($liCur, 'productFeatures listStyleType2')) {
          $detailChildren = $liCur->childNodes;
          
          // Get the product details
          $data = array(
            'product_features' => $liCur->nodeValue
          );
          
          return $data;
        }
      }
      
      // Couldn't find description
      return array();
    }
    
    private static function extractPrice($element) {
      $liChildren = $element->getElementsByTagName('div');
      for ($j = 0; $j < $liChildren->length; $j++) {
        $liCur = $liChildren->item($j);
      
        if (self::hasClass($liCur, 'price')) {
          $detailChildren = $liCur->childNodes;
          
          // Get the product price
          $data = array(
            'product_price' => trim($liCur->nodeValue)
          );
          
          return $data;
        }
      }
      
      // Couldn't find price
      return array();
    }

    
    private static function hasClass($element, $classname) {
      return self::isDomElement($element) && $element->getAttribute('class') === $classname;
    }
    
    private static function isDomElement($element) {
      return is_a($element, 'DOMElement');
    }
}