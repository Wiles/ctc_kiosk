<?php
  $this->set('title_for_layout', 'Canadian Tire');
  
  $this->set('styles', array(
    $this->Html->css('colorbox.css')
  ));
  
  $this->set('scripts', array(
    $this->Html->script('results.js'),
    $this->Html->script('jquery.colorbox.js')
  ));
?>

<div id="content">
    <?php 
      echo $this->element('results',  array('filters' => $filters, 'results' => $results));
    ?>
</div>
