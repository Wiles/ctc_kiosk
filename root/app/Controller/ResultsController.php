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
    $this->layout = 'empty';
    $url = $this->getVar('url', '');
    
    $usablenet = 'http://m.usablenet.com/mt/';
    $ctservice = 'http://tires.canadiantire.ca';
    
    // Create a stream
    $opts = array(
      'http'=>array(
        'method'=>"GET",
        'header'=>"Accept-language: en\r\n" .
                  "Cookie: foo=bar\r\n".
                  "User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10\r\n" // i.e. An iPad 

      )
    );

    $context = stream_context_create($opts);

    $full_url = $usablenet.$ctservice.$url;
    $html = file_get_contents($full_url, false, $context);
    
    $this->set('contents', $html);
    $this->render();
  }
  
}
