<?php
/**
 * Service for scrapping search results from the Canadian Tire website
 *
 * This only deals with search results and nothing more. It does not extract the specifications for each product or item.
 *
 */
class CtService {

    /**
     * Web Service Url
     */
    private static $ctServiceUrl = 'http://tires.canadiantire.ca';

    /**
     * Gets Tires by vehicle
     *
     * @var lang   [string] -
     * @var year   [number] -
     * @var make   [string] -
     * @var model  [string] -
     * @var body   [string] -
     * @var option [string] -
     * @var size   [string] -
     * @var sort   [array] - Sorting information
     *      array(
     *          'by' => 'Price_up'
     *          // This contains the ids of the items that we're narrowing by. Separated by '+'
     *          'narrow' => '3234+4234234+4324234'
     *
     *
     *      )
     */
    public static function getTiresByVehicle($lang, $year, $make, $model, $body, $option, $size, $sort) {
        return self::getByVehicle('tires', $lang, $year, $make, $model, $body, $option, $size, $sort);
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
          $query .= '&load='.urlencode($load);
        }

        if (!empty($speed)) {
          $query .= '&speed='.urlencode($speed);
        }

        $query .= '&sizeSelection=true&tab=1';

        $url = $base_url . $query;
        
        $contents = file_get_contents($url);

        $dom = new DOMDocument;
        @$dom->loadHTML($contents);

        return self::extractContents($dom);
    }

    /**
     * Gets wheels by vehicle
     *
     * @var lang   [string] -
     * @var year   [number] -
     * @var make   [string] -
     * @var model  [string] -
     * @var body   [string] -
     * @var option [string] -
     * @var size   [string] -
     * @var sort   [array] - Sorting information
     *      array(
     *          'by' => 'Price_up'
     *          // This contains the ids of the items that we're narrowing by. Separated by '+'
     *          'narrow' => '3234+4234234+4324234'
     *
     *
     *      )
     */
    public static function getWheelsByVehicle($lang, $year, $make, $model, $body, $option, $size, $sort) {
        return self::getByVehicle('wheels', $lang, $year, $make, $model, $body, $option, $size, $sort);
    }

    /**
     * Gets Tires or wheels by vehicle
     *
     * @var type   [string] - 'tires' or 'wheels'
     * @var lang   [string] -
     * @var year   [number] -
     * @var make   [string] -
     * @var model  [string] -
     * @var body   [string] -
     * @var option [string] -
     * @var size   [string] -
     * @var sort   [array] - Sorting information
     *      array(
     *          'by' => 'Price_up'
     *          // This contains the ids of the items that we're narrowing by. Separated by '+'
     *          'narrow' => '3234+4234234+4324234'
     *
     *
     *      )
     */
    private static function getByVehicle($type, $lang, $year, $make, $model, $body, $option, $size, $sort) {
        $params = array(
          urlencode($year),
          urlencode($make),
          urlencode($model),
          urlencode($body),
          urlencode($option),
          urlencode($size)
        );

        $base_url = self::$ctServiceUrl . '/' . $lang . '/' . $type . '/search/';

        $query = '?vehicle='.implode('_', $params).'&showSavedVehicle=true&un_form_encoding=utf-8';

        if (!empty($sort)) {
          $count = 50;

          if (!empty($sort['by'])) {
            $by = $sort['by'];
            $query .= '&pn_ps='.$count.'&pn_ok='.$by.'&pn_p=1';
          }

          if (!empty($sort['narrow'])) {
            $narrow = $sort['narrow'];
            $query .= '&N='.$narrow;
          }
        }

        $cleaned_query = str_replace(array(' ', '/', '#', ','), array('%2B', '%25252F', '%23', '%2C'), $query);

        $url = $base_url . $cleaned_query;

        $contents = file_get_contents($url);

        $dom = new DOMDocument;
        @$dom->loadHTML($contents);

        return self::extractContents($dom);
    }

    /**
     * Extract the contents from the products list into array
     *
     * This converts the HTML into a DOM tree and scraps out the elements
     *
     * The return value will not contain elements that could not be located.
     *
     * @var dom [DOMDocument] - DOMDocument based on HTML Source code
     *
     *
     * @return
     *    Array
     *    (
     *        [title_href] => /en/tires/light-truck-tires/product/0052465P/goodyear-wrangler-sr-a/0072465/
     *        [title_name] => Goodyear Wrangler SR-A
     *        [product_number] => Product Number:1417221
     *        [manufacturer_number] => Manufacturer Part #:470-7712S
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
    private static function extractContents($dom) {
        $item = $dom->getElementById('productList');

        if ($item == null) {
          // No search results found
          return array();
        } else {
          $titles = self::extractPageInformation($dom);
          $filters = self::extractFilterInformation($dom);
          $products = array();

          // Find all the children of the product list
          $children = $item->childNodes;
          for ($i = 0; $i < $children->length; $i++) {
            $cur = $children->item($i);
            if (!self::isDomElement($cur)) {
              continue;
            }

            $title = self::extractTitle($cur);
            $productNo = self::extractProductNumber($cur);
            $rating = self::extractRating($cur);
            $category = self::extractCategory($cur);
            $img = self::extractImage($cur);
            $desc = self::extractDescription($cur);
            $price = self::extractPrice($cur);

            $data = array_merge($title, $productNo, $rating, $category, $img, $desc, $price);
            $products[] = $data;
          }

          return array(
            'titles' => $titles,
            'filter' => $filters,
            'products' => $products
          );
        }
    }
    
    /**
     * Extract the title of the vehicle that was searched and the search information
     */
    private static function extractPageInformation($dom) {
      $titles = $dom->getElementById('byVehicleMyVehicle');
      if (empty($titles)) {
        $titles = $dom->getElementById('bySizeMySize');
      }
    
      $vehicleTitles = $titles->getElementsByTagName('h5');
      $ex = explode(':', $vehicleTitles->item(0)->nodeValue, 2);
      $vehicleTitle = strip_tags($ex[1]);
      
      $searchFilterTitles = $dom->getElementById('productListing')->getElementsByTagName('h2');
      $ex = explode(':', $searchFilterTitles->item(0)->nodeValue, 2);
      $searchFilterTitle = strip_tags($ex[1]);
      
      return array('title' => $vehicleTitle, 'filters' => $searchFilterTitle);
    }

    /**
     * Extract the ids for the narrowing filters (ie. narrow by price, season, brand, etc.)
     *
     *
     *
     */
    private static function extractFilterInformation($dom) {
      $sidemenu = $dom->getElementById('sideMenu');

      $subNarrows = $sidemenu->getElementsByTagName('li');

      $narrowData = array();

      for ($i = 0; $i < $subNarrows->length; $i++) {
        // Extract the contents of a specific narrow category. Such as 'Narrow by Price'.
        $ndata = array();
        $ndata['values'] = array();

        $titles = $subNarrows->item($i)->getElementsByTagName('h4');
        $title = $titles->item(0);

        if (empty($title)) {
          continue;
        }

        $ndata['narrow_title'] = $title->nodeValue;

        $sub = $subNarrows->item($i)->getElementsByTagName('ul');

        for ($k = 0; $k < $sub->length; $k++) {
          $cur = $sub->item($k);
          $links = $cur->getElementsByTagName('a');
          $link = $links->item(0);

          if (self::isDomElement($link)) {
            $ndata['values'][] = array(
              'link_href' => $link->getAttribute('href'),
              'link_value' => $link->nodeValue
            );
          }
        }

        $narrowData[] = $ndata;
      }

      return $narrowData;
    }

    private static function extractProductNumber($element) {
      $children = $element->getElementsByTagName('ul');

      for ($i = 0; $i < $children->length; $i++) {
        $cur = $children->item($i);

        if (self::hasClass($cur, 'productMeta')) {
          $cc = $cur->childNodes;
          $prodNo = $cc->item(0);
          $manufacturerNo = $cc->item(2);
          $data = array(
            'product_number' => trim(strip_tags($prodNo->nodeValue)),
            'manufacturer_number' => trim(strip_tags($manufacturerNo->nodeValue))
          );

          return $data;
        }
      }

      // No product number found
      return array();
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

          $clean = function($a) {
            return $a !== '<li></li>';
          };
          
          $htmlify = function($a) {
            $str = trim($a);
            if (strlen($str) >= 59) {
              $str = substr($str, 0, 59).'...';
            }
            return '<li>'.$str.'</li>';
          };
          
          $features = explode("\n", $liCur->nodeValue);
          $features = array_map($htmlify, $features);
          $features = array_filter($features, $clean);
          
          $feature_text = implode('', $features);
          
          // Get the product details
          $data = array(
            'product_features' => $feature_text
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