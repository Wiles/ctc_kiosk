<div id="page-home" class="content-page">
  <div id="welcome">
    <div id="ct_title">
      <?php echo $this->Html->image('logo.png', array('alt' => 'CANADIAN TIRE')); ?>
      <div id="def_lang">
        <div id="big_tire">
          <?php echo $this->Html->image('big_tire.png', array('alt' => 'CANADIAN TIRE')); ?>
        </div>
        <div class="message">
          <div class="red_title" data-i18n="start_txt" ></div>
          <div class="grey_txt" data-i18n="touch_screen" ></div>
          <div class="red_arr"></div>
        </div>
      </div>
      <div class="big_red" onclick="switchLang(this)" id="uStartLang" data-i18n="touch_here" ></div>
    </div>
  </div>
</div>
