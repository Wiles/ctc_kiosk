<div id="page-results">
    <div>
      <div class="results-top-bar" id="results-nav-bar">
        <div class="results-back-button">
          <svg class="uTopNavBarBackSvg" height="80" width="170" data-i18n="BACK" id="svgelem">
            <linearGradient y2="100%" x2="0%" y1="0%" x1="0%" id="grad6">
              <stop style="stop-color:#797979;stop-opacity:1" offset="0%"></stop>
              <stop style="stop-color:#343434;stop-opacity:1" offset="100%"></stop>
            </linearGradient>
            <polygon style="stroke:#050505;stroke-width:1" fill="url(#grad6)" points="0 40, 50 0, 170 0, 170 80, 50 80"></polygon>
            <polyline style="fill:none;stroke:#fff;stroke-width:1" points="1 40,50 1, 169 1"></polyline>
            <text y="57.5%" x="39.5%" font-family="Helvetica" font-size="19" fill="#000000">BACK</text>
            <text y="58%" x="40%" font-family="Helvetica" font-size="19" fill="#ffffff">BACK</text>
          </svg>
        </div>
        <div class="results-top-title">
          <div class="results-vehicle-title">
            <div>My Vehicle: <span class="uTxt666"><?php echo $titles['title'] ?></span></div>
          </div>
          <div class="uTxtX" style="color: #999;">Showing: <span class="k" style="color:#333"><?php echo $titles['filters'] ?></span></div>
        </div>
      </div>

      <div id="results-content">
        <div id="results-menu">
          <div class="results-filter-option" id="byprice-option">
            <div class="results-filter-title uTxtXLL">
              <?php $title = __('Narrow by').'&nbsp;'.__('price') ?>
              <span><?php echo $title ?></span>
            </div>
            <?php echo $this->element('resultsFilterOptionPage', array('title' => $title, 'tag' => 'byprice-options-page', 'index' => 1)); ?>
          </div>

          <div class="results-filter-option" id="bybrand-option">
            <div class="results-filter-title uTxtXLL">
              <?php $title = __('Narrow by').'&nbsp;'.__('brand') ?>
              <span><?php echo $title ?></span>
            </div>
            <?php echo $this->element('resultsFilterOptionPage', array('title' => $title, 'tag' => 'bybrand-options-page', 'index' => 2)); ?>
          </div>
          
          <div class="results-filter-option" id="bysubcategory-option">
            <div class="results-filter-title uTxtXLL">
              <?php $title = __('Narrow by').'&nbsp;'.__('sub category') ?>
              <span><?php echo $title ?></span>
            </div>
            <?php echo $this->element('resultsFilterOptionPage', array('title' => $title, 'tag' => 'bysubcategory-options-page', 'index' => 3)); ?>
          </div>

          <div class="results-filter-option" id="byfinish-option">
            <div class="results-filter-title uTxtXLL">
              <?php $title = __('Narrow by').'&nbsp;'.__('finish') ?>
              <span><?php echo $title ?></span>
            </div>
            <?php echo $this->element('resultsFilterOptionPage', array('title' => $title, 'tag' => 'byfinish-options-page', 'index' => 6)); ?>
          </div>

          <div class="results-filter-option" id="bycolour-option">
            <div class="results-filter-title uTxtXLL">
              <?php $title = __('Narrow by').'&nbsp;'.__('colour') ?>
              <span><?php echo $title ?></span>
            </div>
          <?php echo $this->element('resultsFilterOptionPage', array('title' => $title, 'tag' => 'bycolour-options-page', 'index' => 7)); ?>
          </div>
        </div>

        <div id="results-items">
            <?php if(empty($results)): ?>
              <div>
                No results found
              </div>
            <?php else: ?>
            <?php foreach ($results as $result): ?>
              <div class="results-item">
                <div class="results-item-col-l">
                  <a href="/results/from/?url=<?php echo $result['title_href'] ?>">
                  <img src="<?php echo $result['img_url'] ?>" class="results-item-image"></a>
                  <div class="uPlpItemRate"><img src="<?php echo $result['rating_img']; ?>"></div>
                  <div class="uPlpItemCompareItem" data-sku="1419763"><button class="uBtn uBtnCompare " type="button"><?php echo __('Compare') ?></button></div>
                </div>
                <div class="results-item-col-r">
                  <div class="uPlpItemName">
                    <div><?php echo $result['title_name']; ?></div>
                  </div>
                  <div class="price">
                    <?php echo $result['product_price'] ?>
                    <span class="eachElement eachRegElement">(each)</span>
                  </div>
                  <div class="uPlpItemCategory"><span class="uBold">Category</span>:
                    <?php echo $result['category_name'] ?>
                  </div>
                  <ul class="results-item-features">
                    <?php echo $result['product_features'] ?>
                  </ul>
                </div>
              </div>
            <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <div id="results-toolbar">
          <form method="POST" action="">
            <div>
              <button style="margin: 0px;" class="uBtn uBtnGray disabled" id="uPlpHelpMeChoose" type="button">
                <span data-i18n="help_me_choose" class="k">Help Me Choose</span>&nbsp;<br>
                <span style="font-size:0.7em" data-i18n="guided_tire_selection_tool" class="k">Guided tire selection tool</span>
              </button>
              <input name="un_form_encoding" value="utf-8" type="hidden"><input name="un_form_post_list" value="" type="hidden">
            </div>
          </form>

              
          <div class="options-page-enclosure">
            <div class="options-page" id="sort-option-page-contents">
              <div class="options-page-title">
                <span class="options-page-title-text">
                <?php echo $title ?></span>
                <div class="options-page-title-close">
                  <?php echo $this->Html->image('overlayClose.png', array('class' => 'options-page-title-close-image')) ?>
                  <span class="options-page-title-close-text" data-i18n="CLOSE" class="kk">CLOSE</span>
                </div>
              </div>
              <div class="options-page-content">
              <?php
                $values = array(
                  'Price_up' => 'Price (Low-High)',
                  'Price_down' => 'Price (High-Low)',
                  'Brand_up' => 'Brand Name (A-Z)',
                  'Brand_down' => 'Brand Name (Z-A)',
                  'customerRating_down' => 'Customer Rating (High-Low)',
                  'custom' => 'Custom Sort'
                );
              ?>
              
              <?php foreach($values as $key => $value): ?>
                <div class="result-filter-option-selection">
                  <div class="uPlpFilterOption">
                    <a class="results-sort-option-link" onclick="return false;" href="<?php echo $key ?>">
                      <button class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button"><?php echo $value ?></button>
                    </a>
                  </div>
                </div>
              <?php endforeach; ?>
              </div>
            </div>
          </div>
          
          <button class="uBtn uBtnGray" id="uPlpSortBtn" type="button">
            <?php echo $this->Html->Image('dropdownArrow.png', array('style' => 'margin-right: 10px;')) ?>
            <span data-i18n="sort_results" class="k">Sort Results</span>
            <span class="uPlpSortStatus uTxtBBB">Custom Sort</span>
          </button>
          
          <form id="uCompareProds" name="uCompareProds" method="post" action="https://m.usablenet.com/mt/http://tires.canadiantire.ca/en/wheels/compare/">
            <div>
              <input name="productCodes" type="hidden"><input name="com" value="comp" type="hidden"><input name="currentURL" value="/view/content/search" type="hidden"><input name="skuresults" value="1417223|1417222|1419722|1419742|1418464|1419763|0417990|0417991|1418778|0418414|0418535|0418582|0418581|1417108|1417109|1419429|1419430|1417132|" type="hidden"><input name="vehicle" value="2012_Audi_A4_4+Dr+Sedan_Base_7.5x17#REGULAR#Both" type="hidden"><input name="savedVehicleValue" value="2012_Audi_A4_4 Dr Sedan_Base_7.5x17#REGULAR#Both" type="hidden"><input name="N" value="" type="hidden"><input name="rimSearch" value="true" type="hidden">
              <button class="uBtn uBtnLightGray" id="uPlpCompareBtn" type="button">
                <div class="uBtn uBtnOpenCompare disabled" data-i18n="Compare">Compare </div>
                <span data-i18n="Compare_Items" class="uBold">Compare Items</span>
                <br>
                <span style="font-size:0.6em" class="k"><span data-i18n="Compare" class="k">Compare </span> 2 <span data-i18n="compare_a" class="k"> - </span>4 <span data-i18n="Compare_Items_Txt" class="k">items by tapping compare icon</span></span>
              </button>
              <input name="un_form_encoding" value="utf-8" type="hidden">
              <input name="un_form_post_list" value=":productCodes :com :currentURL :skuresults :vehicle :savedVehicleValue :N :rimSearch" type="hidden">
            </div>
          </form>
        </div>
        <div class="uPlpFilterOptions notum" id="uPlpSortByOptions">
          <div class="uPlpFilterOptionsTitle uTxtXLL">
            <span data-i18n="narrow" class="k">Narrow by</span><span class="close_notum uBtn uBtnGray"><span class="xIcn"></span><span data-i18n="CLOSE" class="kk">CLOSE</span></span>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="Price_up" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Price (Low-High)</button>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="Price_down" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Price (High-Low)</button>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="Brand_up" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Brand Name (A-Z)</button>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="Brand_down" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Brand Name (Z-A)</button>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="customerRating_down" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Customer Rating (High-Low)</button>
          </div>
          <div class="uPlpFilterOption">
            <button data-i18n="custom" class="uBtn uBtnLightGray uPlpApplyFilterBtn uTxtX" type="button">Custom Sort</button>
          </div>
        </div>
      </div>

      <div id="uNoMoreItem">
        <div class="red_title" data-i18n="no_more_4">You can only add 4 items for comparison.</div>
        <div class="big_red" onclick="uHideCompareAlert()" data-i18n="Continue">Continue</div>
      </div>

    </div>
</div>
