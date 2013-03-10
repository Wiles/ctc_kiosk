<?php

App::uses('AppController', 'Controller');
App::uses('CtService', 'Model/Datasource');
App::uses('CtProductService', 'Model/Datasource');


class ResultsController extends AppController {

  /**
   * Reads a variable from the request
   */
  private function getVar($var, $default) {
    if (isset($_REQUEST[$var])) {
        return $_REQUEST[$var];
    } else {
        return $default;
    }
  }


  /**
   *
   * @var type   [string] - 'tires-vehicle', 'tires-size', 'wheels'
   * @var lang   [string] - 'en'/'fr'
   * @var year   [number] - 
   * @var make   [string] -
   * @var model  [string] -
   * @var body   [string] -
   * @var option [string] -  
   * @var size   [string] -   
   */
  public function results() {
    $type   = $this->getVar('type', '');
    $lang   = $this->getVar('lang', 'en');
    $year   = $this->getVar('year', '');
    $make   = $this->getVar('make', '');
    $model  = $this->getVar('model', '');
    $body   = $this->getVar('body', '');
    $option = $this->getVar('option', '');
    $size   = $this->getVar('size', '');
    
    $filter = $this->getVar('filter', '');
    $narrow = $this->getVar('narrow', '');
    
    $sort = array();

    if (!empty($filter)) {
      $sort['by'] = $filter;
    }
    
    if (!empty($narrow)) {
      $sort['narrow'] = $narrow;
    }
  
    $type = 'tires-vehicle';
    switch ($type) {
      case 'tires-vehicle':
        $results = CtService::getTiresByVehicle(
          'en',
          '2007',
          'Honda',
          'Ridgeline',
          '4 Dr Crew Cab Pickup, 5 Ft Bed',
          'RTL',
          '7.5x17',
          $sort
        );
        //$results = CtService::getTiresByVehicle(
        //  $lang,
        //  $year,
        //  $make,
        //  $model,
        //  $body,
        //  $option,
        //  $size,
        //  $sort
        //);
        break;
      case 'tires-size':
        
        break;
      case 'wheels':
        
        break;
      default:
        // Error
        break;
    }
  
    $this->set('sort', $sort);
    $this->set('titles', $results['titles']);
    $this->set('filters', $results['filter']);
    $this->set('results', $results['products']);
    $this->render();
  }
  
  public function from() {
    
    $url = $this->getVar('url', '');
    if (strstr($url, '/product/')) {
      $this->layout = 'product';
    } else {
      $this->layout = 'empty';
    }
    
    $usablenet = 'http://m.usablenet.com/mt/';
    $ctservice = 'http://tires.canadiantire.ca';
    
    // Create a stream
    $opts = array(
      'http'=>array(
        'method'=>"GET",
        'header'=>"Accept-language: en\r\n" .
                  "Cookie: foo=bar\r\n".
                  "User-Agent: Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1\r\n" // i.e. Firefox on Windows

      )
    );

    $context = stream_context_create($opts);

    $full_url = $usablenet.$ctservice.$url;
    $html = htmlspecialchars_decode(file_get_contents($full_url, false, $context));
    
    $matches = array();
    preg_match('/\<HEAD\>.*?\<\/HEAD\>/', 
      $html, $matches);
    $head = $matches[0];
    
    $matches = array();
    preg_match('/<BODY.*?>.*?<\/BODY>/s', 
      $html, $matches);
    $body = $matches[0];
    
    $head = preg_replace('/<HEAD>/', '', $head);
    $head = preg_replace('/<\/HEAD>/', '', $head);
    
    $body = preg_replace('/<BODY.*?>/', '', $body);
    $body = preg_replace('/<\/BODY>/', '', $body);
    
    
    $this->set('head', $head);
    $this->set('body', $body);
    $this->render();
  }
  
}
