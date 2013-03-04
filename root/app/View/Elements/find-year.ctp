<script type="text/javascript">
    $(function() {
        $(window).resize(function () {
            resizeStuff($("#page-find-year"), ".un-search-btn_grayH")
        });
        
        loadButtons(
            $("#page-find-year"),
            "/data/getYears",
            {},
            function (obj) {
            });
    });
    
    function loadButtons(container, url, args, onClick) {
        $.ajax({
            url: url,
            type: "GET",
            data: {}
        }).done(function (json) {
            var obj = JSON.parse(json);
        
            $.each(obj, function(index, value) {
                var div = $("<div />");
                div.addClass("un-search-btn_grayH");
                div.html(value.Value);
                
                if (value.Selected == 'True') {
                    div.addClass("selected");
                }
                
                div.click(function() {
                    container.find(".un-search-btn_grayH.selected").removeClass("selected");
                    $(this).addClass("selected");
                    onClick(value);
                });
                
                container.append(div);
            });
            
            resizeStuff(container, ".un-search-btn_grayH");
        });
    }
    
    function resizeStuff(container, stuff) {
        var totalWidth = container.width();
        var count = Math.floor(totalWidth / 275);
        var w = Math.floor(totalWidth / count) - 25;
        
        container.find(stuff).css('width', w);
    }
</script>

<div id="page-find-year" class="content-page">
  <?php echo $this->element('z-find-header', array('yearStatus' => 'selected')) ?>
  <div class="search-step-title">Search tires by vehicle<span data-i18n="step" class="kk"> - Step </span>
    <span class="searchStepNumb">1<span data-i18n="of_de" class="kk"> of </span>5</span>
  </div>
  <div class="search-label">
    <span data-i18n="select_your_vec" class="kk">SELECT YOUR VEHICLE </span>YEAR
  </div>
  <div id="button-container"></div>
</div>
