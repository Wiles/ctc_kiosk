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

      echo $this->Html->css('main.css');
      echo $this->Html->css('button.css');
      echo $this->Html->css('ct.css');
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
      <a class="back"     href="#"><div>Back</div></a>
    </div>
    
    <div class="content">
      <?php echo $this->Session->flash(); ?>
      <?php echo $this->fetch('content'); ?>
    </div>
    
    <div class="footer">
      <a class="home"     href="#"><?php echo $this->Html->image('home.png', array('alt' => 'Home')) ?><div>Home</div></a>
      <a class="ct-logo"  href="#"><div></div></a>
      <a class="help"     href="#"><div>Help</div></a>
    </div>
  </body>

</html>
