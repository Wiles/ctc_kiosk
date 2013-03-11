<div class="options-page-enclosure">
<div class="options-page" id="<?php echo $tag ?>">
  <div class="options-page-title">
    <span class="options-page-title-text"><?php echo $title ?></span>
    <div class="options-page-title-close">
      <?php echo $this->Html->image('overlayClose.png', array('class' => 'options-page-title-close-image')) ?>
      <span class="options-page-title-close-text" data-i18n="CLOSE" class="kk">CLOSE</span>
    </div>
  </div>
  <div class="options-page-content">
  <?php foreach($filters[$index]['values'] as $filter): ?>
    <div class="result-filter-option-selection">
      <div class="uPlpFilterOption">
        <a class="results-filter-option-link" onclick="return false;" href="<?php echo $filter['link_href'] ?>"><button 
          class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button"><?php echo $filter['link_value'] ?></button></a>
      </div>
    </div>
  <?php endforeach; ?>
  </div>
</div>
</div>
