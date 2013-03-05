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
    
    <script type="text/javascript">
      <?php
      echo "window.webroot = '" . $this->webroot . "/'" ?>
    </script>
    
    <?php
      echo $this->Html->meta('icon');

      echo $this->Less->link('ct.less');
      echo $this->Html->script('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
      
      // Commented out some source files we don't want to use
      echo $this->Html->script('ct/jquery.js');
      echo $this->Html->script('ct/jquery-transit.js');
      echo $this->Html->script('ct.js');
      echo $this->Html->script('xhr.js');
      //echo $this->Html->script('ct/xhr-da-1.js');
      echo $this->Html->script('ct/vPaginator.js');
      echo $this->Html->script('ct/vScroll.js');
      echo $this->Html->script('ct/tmpl.js');
      echo $this->Html->script('ct/CTKi_18n.js');
      echo $this->Html->script('ct/CTKioskCore.js');
      echo $this->Html->script('ct/ctw_base.js');
      echo $this->Html->script('ct/plp.js');
      echo $this->Html->script('ct/vkb_layout.js');
      echo $this->Html->script('ct/vKeyboard.js');
      echo $this->Html->script('ct/fieldsController.js');
      echo $this->Html->script('ct/s_code_prd.js');
      echo $this->Html->script('main.js');
      
      echo $this->fetch('meta');
      echo $this->fetch('css');
      echo $this->fetch('script');
    ?>
  </head>
  
  <body>
    <noscript><h1 style="margin:50px">Please enable Javascript</h1></noscript>
      
    <div class="content">
      <?php echo $this->Session->flash(); ?>
      <?php echo $this->fetch('content'); ?>
    </div>

    <div id="appFooter">
      <div class="big_gray" id="home" data-i18n="home">home</div>
      <div class="big_light_gray" id="ct-logo">
        
      </div>
      <div class="big_gray" id="help_b" data-i18n="help">help</div>
    </div>
  </body>

</html>
