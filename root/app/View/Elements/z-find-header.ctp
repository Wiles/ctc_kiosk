<div id="unSearchWrap">
  <div id="searchTopBar">
    <!-- <div class="un-search-btn un-search-btn_grayL">
      <div><span data-ko="back" class="kk">Back</span>
      </div>
    </div> -->
    <div id="header-button-year" class="un-search-btn un-search-btn_grayL first <?php if (isset($yearStatus)) echo $yearStatus ?>">
      <div>1. <span data-ko="year" class="kk">Year</span>
      </div>
      <div class="uSelectedVal"><div>2013</div></div>
    </div>
    <div id="header-button-make" class="un-search-btn un-search-btn_grayL <?php if (isset($makeStatus)) echo $makeStatus ?>">
      <div>2. <span data-ko="make" class="kk">Make</span>
      </div>
      <div class="uSelectedVal"><div>Acura</div></div>
    </div>
    <div id="header-button-model" class="un-search-btn un-search-btn_grayL <?php if (isset($modelStatus)) echo $modelStatus ?>">
      <div>3. <span data-ko="model" class="kk">Model</span>
      </div>
      <div class="uSelectedVal"><div>ILX</div></div>
    </div>
    <div id="header-button-body" class="un-search-btn un-search-btn_grayL <?php if (isset($bodyStatus)) echo $bodyStatus ?>">
      <div>4. <span data-ko="body" class="kk">Body</span>
      </div>
      <div class="uSelectedVal"><div>4 Dr Sedan</div></div>
    </div>
    <div id="header-button-option" class="un-search-btn un-search-btn_grayL last <?php if (isset($optionsStatus)) echo $optionsStatus ?>">
      <div>5. <span data-ko="option" class="kk">Options</span>
      </div>
      <div class="uSelectedVal"></div>
    </div>
  </div>
</div>