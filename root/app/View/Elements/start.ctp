<div id="page-start" class="content-page">
  <div id="homepageCntnt">
    <div id="ct_title" data-i18n="title_wheel_selector">
      <!-- Tire and Wheel Selector -->
      <?php echo $this->Html->image('title_selector_en.png', array('id' => 'ct_title_img', 'alt' => 'Tire and Wheel Selector')); ?>
    </div>
    <div id="unSelector">
      <div class="gr_cont">
      <div class="lucid" style="overflow:hidden;height:393px;">
        <div id="tires_sel" style="position:relative">
          <div class="start_div" style="position:relative;z-index:5;">
            <?php echo $this->Html->image('select_tire_en.png', array('id' => 'start-select-tire-img', 'alt' => 'Select Tire')); ?>
            <!--<div class="start_by">START BY CHOOSING</div>
            <div class="start_tw">WHEELS</div>-->
          </div>
        </div>
        <div id="search_by" style="position:relative;top:0px;z-index:1;">
            <div class="vec_div" tab="0">
                <div class="search_tit" data-i18n="search_t_by">Search tires by</div>
                <div class="grey_big" data-i18n="vehicle">vehicle</div>
            </div>
            <div class="size_div" tab="1">
                <div class="search_tit" data-i18n="search_t_by">Search tires by</div>
                <div class="grey_big" data-i18n="size">Size</div>
            </div>
        </div>
      </div>
    </div>

    <div class="gr_cont">
      <div class="lucid">
        <div id="wheel_sel">
          <div class="start_div">
            <?php echo $this->Html->image('select_wheel_en.png', array('id' => 'start-select-wheel-img', 'alt' => 'Select Wheel')); ?>
            <!--<div class="start_by">START BY CHOOSING</div>
            <div class="start_tw">WHEELS</div>-->
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
