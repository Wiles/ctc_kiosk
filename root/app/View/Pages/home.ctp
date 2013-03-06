<?php
  $this->set('title_for_layout', 'Canadian Tire');
?>

<div class="header" style="display:none;">
  <?php echo $this->element('z-find-header', array('yearStatus' => 'selected')); ?>
</div>
<div id="content">
    <?php 
      echo $this->element('home');
      echo $this->element('start');
    ?>
    <?php
      echo $this->element('find-year');
      echo $this->element('find-make');
      echo $this->element('find-model');
      echo $this->element('find-body');
      echo $this->element('option-standard');
      echo $this->element('option-optional');
    ?>
</div>
