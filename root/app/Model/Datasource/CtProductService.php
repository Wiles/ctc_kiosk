<?php
/**
 * Service for scrapping product from Canadian Tire website
 */
class CtService {

    public static function getProductInformation($url) {
      $contents = file_get_contents($url);
      
      $dom = new DOMDocument;
      @$dom->loadHTML($contents);
      
      return self::extractContents($dom);
    }
    
    private static function extractContents($dom) {
      $prodNumber = self::extractProductNumber($dom);
      $specs =      self::extractSpecifications($dom);
      $warranty =   self::extractWarranty($dom);
      $financing =  self::extractNoInterestFinancing($dom);
      
      $data = array_merge($prodNumber, $specs, $warranty, $financing);
      return $data;
    }
    
    private static function extractProductNumber($dom) {
      $prodNo = $dom->getElementById('prodNo');
      if (empty($prodNo)) {
        return array();
      } else {
        return array(
          'product_number' => strip_tags($prodNo->nodeValue)
        );
      }
    }
    
    private static function extractSpecifications($dom) {
      $specs = $dom->getElementById('specifications');
      if (empty($specs)) {
        return array();
      } else {
        return array(
          'product_specifications' => $specs->nodeValue
        );
      }
    }
    
    private static function extractWarranty($dom) {
      
    }
    
    private static function extractNoInterestFinancing($dom) {
    
    }
    
    private static function hasClass($element, $classname) {
      return self::isDomElement($element) && $element->getAttribute('class') === $classname;
    }
    
    private static function isDomElement($element) {
      return is_a($element, 'DOMElement');
    }
    
}