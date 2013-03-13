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
          $lang,
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
  
  public function compare() {
    $url = preg_replace('/^https:\/\//', 'http://', $this->getVar('url', ''));
    $params = array(
      'N' => '',
      'com' => 'comp',
      'currentURL' => '/view/content/search',
      'productCodes' => $this->getVar('productCodes', ''),
      'rimSearch' => 'TRUE',
      'savedVehicleValue' => '2013_Acura_ILX_4 Dr Sedan_Base_6.5x16#REGULAR#Both',
      'skuresults' => '1417213|1418829|1419304|1419012|1417236|1417235|1419734|1419736|1419739|1419735|1417914|1417915|1418700|0348166|1418719|1418720|0348826|0348827|1417148|0418388|1419765|1419755|1419824|1419781|1419761|1419809|1419302|1419303|0095908|0096279|0417774|1418770|1418766|1418769|0417825|0417975|0417988|0417989|1419358|1419359|0418098|0418100|0418124|0418126|1418684|1418678|0418142|0418141|0096018|0096252|0098949|0095989|0096138|0098928|0096273|0096278|0096330|0096332|0096333|0096312|0096343|0096344|0418394|1419417|1419418|1419387|1419386|1418594|1418595|',
      'un_form_encoding' => 'utf-8',
      'un_form_post_list' => ':productCodes :com :currentURL :skuresults :vehicle :savedVehicleValue :N :rimSearch',
      'vehicle' => '2013_Acura_ILX_4+Dr+Sedan_Base_6.5x16#REGULAR#Both'
    );
    
    $this->layout = 'compare';
    $postdata = http_build_query($params);
    
    // Create a stream
    $opts = array(
      'http'=>array(
        'method'=>"POST",
        'header'=>
          //"Content-type: application/x-www-form-urlencoded\r\n" .
          "Accept-language: en\r\n" .
          //"Cookie: foo=bar\r\n".
          //"User-Agent: Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1\r\n", // i.e. Firefox on Windows
          "Content-Type:application/x-www-form-urlencoded; charset=UTF-8\r\n".
          "Cookie:un_jtt_ssession=13d5ee27a81_c0a8608924a9ba77c58d422305fa6|84a50702fbfddb2571613b8; un_jtt_session=13d5ee27a81_c0a86089703b75bfea24aa570419d5|1d879e7a24f16cff14eac6df; ctStore_Name+.tires.canadiantire.ca+%252F=INVERMERE%252C%2520BC%2520; ctPOS_Name+.tires.canadiantire.ca+%252F=CTPOS-658; ctStore_Add1+.tires.canadiantire.ca+%252F=480%2520Sarah%2520Road%2520; ctStore_Add2+.tires.canadiantire.ca+%252F=; ctStore_cityname+.tires.canadiantire.ca+%252F=INVERMERE; ctStore_province+.tires.canadiantire.ca+%252F=%2520BC; ctStore_zip+.tires.canadiantire.ca+%252F=V0A%25201K3; ctStore_phone+.tires.canadiantire.ca+%252F=250-342-4433; ctStore_phone2+.tires.canadiantire.ca+%252F=250-342-4433%2520; ctStore_fax+.tires.canadiantire.ca+%252F=250-342-4453%2520; ctStore_dealerEmail+.tires.canadiantire.ca+%252F=knappholdings%40gmail.com; ctStore_provinceName+.tires.canadiantire.ca+%252F=British+Columbia; ctStore_ID+.tires.canadiantire.ca+%252F=658; vehicleInformation+.tires.canadiantire.ca+%252F=%222010_Aston+Martin_DB9_2+Dr+Convertible_Volante_8.5x19%23REGULAR%23Front%7C2010_Aston+Martin_DB9_2+Dr+Convertible_Volante_8.5x19%23REGULAR%23Rear%7C2013_Buick_Enclave_4+Dr+Sport+Utility_Base_7x17%23REGULAR%23Both%7C2013_Acura_ILX_4+Dr+Sedan_Base_6.5x16%23REGULAR%23Both%7C2013_BMW_328i_2+Dr+Convertible_Base_8x17%23REGULAR%23Both%22; X-Mapping-bfhceloa=AA6B986502874C341F8022A855613050; s_sess=%20s_cc%3Dtrue%3B%20s_fv%3Dflash%252011%3B%20s_sq%3D%3B%20c%3DundefinedDirect%2520LoadDirect%2520Load%3B%20SC_LINKS%3D%3B; JSESSIONID+.tires.canadiantire.ca+%252F=AEAFB3AAA7EE754AD6630D7D1FB0AFB3.hyapp02; NSC_xxx.ujsft.dbobejboujsf.db*80+.tires.canadiantire.ca+%252F=ffffffff09c9229245525d5f4f58455e445a4a423660\r\n".
          "Host:m.usablenet.com\r\n".
          "Pragma:no-cache\r\n".
          "Referer:https://m.usablenet.com/ma/tires.canadiantire.ca/index.html\r\n".
          "User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0\r\n".
          "X-Requested-With:XMLHttpRequest\r\n".
          "x-jtt-platform:xhr-kiosk\r\n".
          "xhr-referer:https://m.usablenet.com/mt/http://tires.canadiantire.ca/en/wheels/search/?vehicle=2013_Acura_ILX_4%2BDr%2BSedan_Base_6.5x16%23REGULAR%23Both&showSavedVehicle=true&un_form_encoding=utf-8\r\n",
        'content' => $postdata
      )
    );

    $context = stream_context_create($opts);
    $html = htmlspecialchars_decode(file_get_contents($url, false, $context));
    
    $html = str_replace('live(', 'on(', $html);
    
    $this->set('body', $html);
    $this->render();
  }
  
}
