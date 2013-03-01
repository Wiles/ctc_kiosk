<?php
  $this->set('title_for_layout', 'Canadian Tire');
?>
<div id="content">

<?php
    echo $this->element('start');
    echo $this->element('find-year');
    echo $this->element('find-make');
    echo $this->element('find-model');
    echo $this->element('find-body');
    echo $this->element('option-standard');
    echo $this->element('option-optional');
?>
</div>
