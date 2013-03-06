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
     * Gets Tires by vehicle
     * 
     * @var lang   -
     * @var year   - 
     * @var make   - 
     * @var model  - 
     * @var body   - 
     * @var option - 
     * @var size   -
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
        
        $base_url = self::$ctServiceUrl . '/' . $lang . '/tires' . '/search/';
        
        $query = '?vehicle='.implode('_', $params).'#REGULAR#Both&showSavedVehicle=true&un_form_encoding=utf-8';
        
        $cleaned_query = str_replace(array(' ', '/', '#', ','), array('%2B', '%25252F', '%23', '%2C'), $query);
        
        $url = $base_url . $cleaned_query;
        
        $contents = file_get_contents($url);
        
        return self::extractContents($contents);
    }
    
    /**
     * Gets Tires by size
     * 
     * @var lang          [string] - 'en'/'fr'
     * @var width         [number] -  
     * @var aspect_ratio  [number] -  
     * @var diameter      [number] - 
     * @var load_index    [number] - [optional] 
     * @var speed         [number] - [optional] 
     */
    public static function getTiresBySize($lang, $width, $aspect_ratio, $diameter, $load_index, $speed) {
        $params = array(
          urlencode($width),
          urlencode($aspect_ratio),
          urlencode($diameter)
        );
        
        $base_url = self::$ctServiceUrl . '/' . $lang . '/tires' . '/search/';
        
        // Create the query string
        $query = '?SecRatioDia='.implode('_', $params);
        
        if (!empty($load)) {
          $query .= '&load='.$load;
        }
        
        if (!empty($speed)) {
          $query .= '&speed='.$speed;
        }
        
        $query .= '&sizeSelection=true&tab=1';
        
        $url = $base_url . $query;
        
        $contents = file_get_contents($url);
        
        return self::extractContents($contents);
    }
    
    /**
     * Gets Wheels by vehicle
     * 
     * @var lang   -
     * @var year   - 
     * @var make   - 
     * @var model  - 
     * @var body   - 
     * @var option - 
     * @var size   -
     */
    public static function getWheelsByVehicle($lang, $year, $make, $model, $body, $option, $size) {
        $params = array(
          urlencode($year),
          urlencode($make),
          urlencode($model),
          urlencode($body),
          urlencode($option),
          urlencode($size)
        );
        
        $base_url = self::$ctServiceUrl . '/' . $lang . '/wheels/search/';
        
        $query = '?vehicle='.implode('_', $params).'#REGULAR#Both&showSavedVehicle=true&un_form_encoding=utf-8';
        
        $cleaned_query = str_replace(array(' ', '/', '#', ','), array('%2B', '%25252F', '%23', '%2C'), $query);
        
        $url = $base_url . $cleaned_query;
        
        $contents = file_get_contents($url);
        
        return self::extractContents($contents);
    }
    
    
    /**
     * Extract the contents from the products list into array
     *
     * This converts the HTML into a DOM tree and scraps out the elements
     *
     * The return value will not contain elements that could not be located.
     *
     * @var contents [string] - HTML Source code
     *
     *
     * @return
     *    Array
     *    (
     *        [title_href] => /en/tires/light-truck-tires/product/0052465P/goodyear-wrangler-sr-a/0072465/
     *        [title_name] => Goodyear Wrangler SR-A
     *        [rating_img] => http://tiresinc.canadiantire.ca/assets/images/rating-3_7.gif
     *        [category_href] => /en/tires/light-truck-tires/
     *        [category_name] => Light Truck Tires
     *        [img_url] => http://s7d5.scene7.com/is/image/CanadianTire/0052465_1?wid=160&hei=160&qlt=70&resMode=sharp2
     *        [tire_id] => 0072465
     *        [product_features] => For on- or off-highway driving
     *    
     *    
     *    
     *                                                                            Aggressive tread pattern for excellent on/off-road traction
     *    
     *    
     *    
     *        [product_price] => $249.99
     *    
     *                                                                            *
     *    
     *                                                                            (each)
     *    )
     */
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
            
            $title = self::extractTitle($cur);
            $rating = self::extractRating($cur);
            $category = self::extractCategory($cur);
            $img = self::extractImage($cur);
            $desc = self::extractDescription($cur);
            $price = self::extractPrice($cur);
            
            $data = array_merge($title, $rating, $category, $img, $desc, $price);
            return $data;
          }
        }
    }
    
    private static function extractTitle($element) {
      $children = $element->getElementsByTagName('div');
      
      for ($i = 0; $i < $children->length; $i++) {
        $cur = $children->item($i);
        
        if (self::hasClass($cur, 'productDetails')) {
          $pdChildren = $cur->getElementsByTagName('h3');
          // Get the first H3 in the Product Details list item
          $h3 = $pdChildren->item(0);
          for ($j = 0; $j < $h3->childNodes->length; $j++) {
            $title = $h3->childNodes->item($j);
            if (self::isDomElement($title) && $title->tagName === 'a') {
              // Get the URL for the title
              $data = array(
                'title_href' => $title->getAttribute('href'),
                'title_name' => trim($title->nodeValue)
              );
              
              return $data;
            }
          }
        }
      }
      
      // Couldn't find the title of the product item
      return array();
    }
    
    private static function extractRating($element) {
      $children = $element->getElementsByTagName('div');
      
      for ($i = 0; $i < $children->length; $i++) {
        $cur = $children->item($i);
        
        if (self::hasClass($cur, 'reviews')) {
          $imgs = $cur->getElementsByTagName('img');
          // Get the first H3 in the Product Details list item
          $img = $imgs->item(0);
          
          // Get the URL for the rating image
          $data = array(
            'rating_img' => $img->getAttribute('src')
          );
          
          return $data;
        }
      }
      
      // Couldn't find the ratings image
      return array();
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