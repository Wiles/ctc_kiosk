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

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
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
    
    /*
     * JSON FORMAT:
     * array of:
     *  {
     *      text: "",
     *      value: "",
     *      checked: true/false
     *  }
     *
     */
     
     
    public function jsonFunction() {
        $year = $this->getVar('year', null);
        return new CakeResponse(array('body' => json_encode($year)));
    }
}
