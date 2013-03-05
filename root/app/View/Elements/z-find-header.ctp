<div id="unSearchWrap">
    <div id="header-button-year" class="un-search-btn un-search-btn_grayL first <?php if (isset($yearStatus)) echo $yearStatus ?>">
      <div>1.&nbsp;<span data-ko="year" class="kk">Year</span>
      </div>
      <div id="year-selected-value" class="uSelectedVal"></div>
    </div>
    <div id="header-button-make" class="un-search-btn un-search-btn_grayL <?php if (isset($makeStatus)) echo $makeStatus ?>">
      <div>2.&nbsp;<span data-ko="make" class="kk">Make</span>
      </div>
      <div id="make-selected-value" class="uSelectedVal"></div>
    </div>
    <div id="header-button-model" class="un-search-btn un-search-btn_grayL <?php if (isset($modelStatus)) echo $modelStatus ?>">
      <div>3.&nbsp;<span data-ko="model" class="kk">Model</span>
      </div>
      <div id="model-selected-value" class="uSelectedVal"></div>
    </div>
    <div id="header-button-body" class="un-search-btn un-search-btn_grayL <?php if (isset($bodyStatus)) echo $bodyStatus ?>">
      <div>4.&nbsp;<span data-ko="body" class="kk">Body</span>
      </div>
      <div id="body-selected-value" class="uSelectedVal"></div>
    </div>
    <div id="header-button-option" class="un-search-btn un-search-btn_grayL last <?php if (isset($optionsStatus)) echo $optionsStatus ?>">
      <div>5.&nbsp;<span data-ko="option" class="kk">Options</span>
      </div>
      <div id="options-selected-value" class="uSelectedVal"></div>
    </div>
</div>