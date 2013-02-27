<?php
/**
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
 * @package       Cake.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
?>
<!DOCTYPE html>
<html>
  <head>
    <?php echo $this->Html->charset(); ?>
    <title>
      <?php echo $title_for_layout; ?>
    </title>
    
    <?php
      echo $this->Html->meta('icon');

      echo $this->Less->link('ct.less');
      echo $this->Html->script('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
      echo $this->Html->script('main.js');

      echo $this->fetch('meta');
      echo $this->fetch('css');
      echo $this->fetch('script');
    ?>
  </head>
  
  <body>
    <noscript><h1 style="margin:50px">Please enable Javascript</h1></noscript>
  
    <div class="header">
	<div id="header-back" class="header-button">Back</div>
    </div>
    
    <div class="content">
      <?php echo $this->Session->flash(); ?>
      <?php echo $this->fetch('content'); ?>
    </div>
    
    <div class="footer">
      <div id="home" class="big_gray">Home</div>
      <div id="ct-logo" class="big_gray"></div>
      <div id="help_b" class="big_gray">Help</div>
    </div>
  </body>

</html>
