<?php
  $this->set('title_for_layout', 'Canadian Tire');
?>

<div class="header" style="display:none;">
  <?php echo $this->element('z-find-header', array('yearStatus' => 'selected')); ?>
</div>
<div id="content">
    <?php 
      echo $this->element('config');
      echo $this->element('home');
      echo $this->element('start');
    ?>
    <?php
      echo $this->element('find-year');
      echo $this->element('find-make');
      echo $this->element('find-model');
      echo $this->element('find-body');
      echo $this->element('find-option');
    ?>
    
    <div id ="findFooter">
        <table>
            <tr>
                <td>
                    <div id="uFitmentData" class="big_gray" data-i18n="use_of_data" style="display:inline-block;margin:-1px -5px;">Use of Fitment Data in Tire/Wheel Selector </div>
                </td>
                <td style="background-color:#C7C7C7;padding:10px;border:1px solid #A7A7A7">
                    <div class="uuWarrantyFoot" data-i18n="warranty_foot" style="display:inline-block;">Thank you for using our Tire and Wheel Selector.  Before making a purchase, please consult one of our Automotive Service Representatives to ensure the product you have selected is the best for your driving needs.</div>
                </td>
                <td>
                    <div id="uNextStep" class="big_red disabled" data-i18n="continue" style="margin:-1px -5px;">continue</div>
                </td>
            </tr>
        </table>
    </div>
</div>
