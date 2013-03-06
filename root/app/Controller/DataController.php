<?php
/**
 * Static content controller.
 *
 * This file will render views from views/pages/
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

App::uses('AppController', 'Controller');
App::uses('CarProService', 'Model/Datasource');
App::uses('CtService', 'Model/Datasource');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       data.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class DataController extends AppController {

    /**
     * Controller name
     *
     * @var string
     */
    public $name = 'Data';
    
    /**
     * Reads a variable from the request
     */
    private function getVar($var, $default) {
        if (isset($_REQUEST[$var])) {
            return $_REQUEST[$var];
        }
        else {
            return $default;
        }
    }
    
    /**
     * Gets years
     *
     * @var year
     * @var isVehicleCrossOver
     */
    public function getYears() {
        $year = $this->getVar('year', '0');
        $crossover = $this->getVar('isVehicleCrossOver', 'false');
        
        $response = CarProService::getYears($year, $crossover);
        
        return new CakeResponse(array('body' => json_encode($response)));
    }
    
    /**
     * Gets car makes by year
     *
     * @var year
     * @var make
     * @var isVehicleCrossOver
     */
    public function getMakes() {
        $year = $this->getVar('year', '0');
        $make = $this->getVar('make', '""');
        $crossover = $this->getVar('isVehicleCrossOver', 'false');
        
        $response = CarProService::getMakes($year, $make, $crossover);
        
        return new CakeResponse(array('body' => json_encode($response)));
    }
    
    /**
     * Gets car models by year and make
     *
     * @var year
     * @var make
     * @var model
     */
    public function getModels() {
        $year = $this->getVar('year', '0');
        $make = $this->getVar('make', '""');
        $model = $this->getVar('model', '""');
        
        $response = CarProService::getModels($year, $make, $model);
        
        return new CakeResponse(array('body' => json_encode($response)));
    }
    
    /**
     * Gets car bodies and year, make, and model
     *
     * @var year
     * @var make
     * @var model
     */
    public function getBodies() {
        $year = $this->getVar('year', '0');
        $make = $this->getVar('make', '""');
        $model = $this->getVar('model', '""');
        
        $response = CarProService::getBodies($year, $make, $model);
        
        return new CakeResponse(array('body' => json_encode($response)));
    }
    
    /**
     * Gets car options and year, make, model, and body
     *
     * @var year
     * @var make
     * @var model
     * @var body
     */
     public function getOptions() {
        $year = $this->getVar('year', '0');
        $make = $this->getVar('make', '""');
        $model = $this->getVar('model', '""');
        $body = $this->getVar('body', '""');
        
        $response = CarProService::getOptions($year, $make, $model, $body);
        
        return new CakeResponse(array('body' => json_encode($response)));
     }
     
     /**
      * Get tire results by vehicle
      *
      * $lang   [string] - 'en'/'fr'
      * $year   [number] - 
      * $make   [string] -
      * $model  [string] -
      * $body   [string] -
      * $option [string] -
      * $size   [string] -
      *
      * Example: getTiresByVehicle('en', '2013', 'Acura', 'ILX', '4 Dr Sedan', 'Base', '205/55R16')
      */
     public function getTiresByVehicle() {
        $lang   = $this->getVar('lang', 'en');
        $year   = $this->getVar('year', '0');
        $make   = $this->getVar('make', '""');
        $model  = $this->getVar('model', '""');
        $body   = $this->getVar('body', '""');
        $option = $this->getVar('option', '""');
        $size   = $this->getVar('size', '""');
        
        $response = CtService::getTiresByVehicle($lang, $year, $make, $model, $body, $option, $size);
        return new CakeResponse(array('body' => json_encode($response)));
     }
     
     /**
      * Get tires by size
      *
      * $width         [number] - 
      * $aspect_ratio  [number] - 
      * $diameter      [number] -
      * $load_index    [number] - [optional]
      * $speed         [number] - [optional]
      */
     public function getTiresBySize() {
        $width         = $this->getVar('width', '');
        $aspect_ratio  = $this->getVar('aspect_ratio', '');
        $diameter      = $this->getVar('diameter', '');
        $load_index    = $this->getVar('load_index', '');
        $speed         = $this->getVar('speed', '');
        
        $response = CtService::getTiresBySize($width, $aspect_ratio, $diameter, $load_index, $speed);
        return new CakeResponse(array('body' => json_encode($response)));
     }
     
     /**
      * Get wheel results by vehicle
      *
      * $lang   [string] - 'en'/'fr'
      * $year   [number] - 
      * $make   [string] -
      * $model  [string] -
      * $body   [string] -
      * $option [string] -
      * $size   [string] -
      *
      * Example: getTiresByVehicle('en', '2013', 'Acura', 'ILX', '4 Dr Sedan', 'Base', '205/55R16')
      */
     public function getWheelsByVehicle() {
        $lang   = $this->getVar('lang', 'en');
        $year   = $this->getVar('year', '0');
        $make   = $this->getVar('make', '""');
        $model  = $this->getVar('model', '""');
        $body   = $this->getVar('body', '""');
        $option = $this->getVar('option', '""');
        $size   = $this->getVar('size', '""');
        
        $response = CtService::getWheelsByVehicle($lang, $year, $make, $model, $body, $option, $size);
        return new CakeResponse(array('body' => json_encode($response)));
     }
}
