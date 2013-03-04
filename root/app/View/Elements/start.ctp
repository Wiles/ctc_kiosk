<div id="page-start" class="content-page">
  <div id="button-francais" onclick="switchLang(this)" data-i18n="touch_here"><?php echo __('Francais'); ?></div>
  <div id="homepageCntnt">
    <div id="ct_title">
      <?php echo $this->Html->image(__('title_selector_en.png'), array('id' => 'ct_title_img', 'alt' => 'Tire and Wheel Selector')); ?>
    </div>
    <div id="unSelector">
      <div class="gr_cont left">
        <div class="lucid">
          <div style="transition: margin 0.5s ease 0s; margin-top: 0px;" id="tires_sel"><div class="inset">
          <div class="start_div">
            <!--<div class="start_by">START BY CHOOSING</div>
            <div class="start_tw">WHEELS</div>-->
          </div>
        </div></div>
        <div style="transition: margin 0.7s ease 0s; margin-top: 500px;" id="search_by">
          <div style="box-shadow: 0px 0px 0px transparent;" class="vec_div" tab="0">
            <div class="search_tit" data-i18n="search_t_by"><?php echo __('Search tires by') ?></div>
            <div class="grey_big" data-i18n="vehicle"><?php echo __('vehicle') ?></div>
          </div>
          <div style="box-shadow: 0px 0px 0px transparent;" class="size_div" tab="1">
            <div class="search_tit" data-i18n="search_t_by"><?php echo __('Search tires by') ?></div>
            <div class="grey_big" data-i18n="size"><?php echo __('Size') ?></div>
          </div>
        </div>
        </div>
      </div>

      <div class="gr_cont right">
        <div class="lucid">
          <div id="wheel_sel"><div class="inset">
            <div class="start_div">
              <!--<div class="start_by">START BY CHOOSING</div>
              <div class="start_tw">WHEELS</div>-->
            </div>
          </div></div>
        </div>
      </div>
    </div>
  </div>
</div>
