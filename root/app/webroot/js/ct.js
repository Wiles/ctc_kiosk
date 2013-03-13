var ct = new function() {

  this.page_events = {};
  
  this.initValues = function(values) {
  }.bind(this);
  
  this.onPageChange = function(name, fun) {
    // TODO: add, rather than overwrite
    this.page_events[name] = fun;
  }.bind(this);
  
  this.vehiclePages = [
    "page-find-year",
    "page-find-make",
    "page-find-model",
    "page-find-body",
    "page-find-option"
  ];
  
  /*
  this.wheelPages = {
    "find-year",
    "find-make",
    "find-model",
    "find-body",
    "find-option"
  }.bind(this);
  */
  
  this.changePage = function(page) {
    $('div.content-page').hide();
    $('#' + page).show();
    
    // header highlighting magic
    $(".un-search-btn.un-search-btn_grayL.selected").removeClass("selected");
    $("#header-" + page).addClass("selected").removeClass("complete");
    $("#header-" + page).prevAll().addClass("complete");
    $("#header-" + page).nextAll().removeClass("complete").addClass("disabled");
    
    // Handle start/home/find pages
    if (page === 'page-start' || page === 'page-home') {
      $('div.header').hide();
      $("#findFooter").hide();
      
      $(".start_div").show().css("top", "0px");
    } else if (page === 'page-tire-sizes') {
        $('div.header.tireHeader').hide();
        $('div.header.vehicleHeader').hide();
        
        $("#findFooter").show();
        resizeFindPages();
    }else {
      var r = $.inArray(page, this.vehiclePages);
      if (r == -1) {
        $('div.header.tireHeader').show();
        $('div.header.vehicleHeader').hide();
      } else {
        $('div.header.vehicleHeader').show();
        $('div.header.tireHeader').hide();
      }
      
      $("#findFooter").show();
      resizeFindPages();
    }
    
    // Handle on page change event
    var event = this.page_events[page];
    if (event) {
      event();
    }
    
    if (page === 'page-home') {
        $("#appFooter").hide();
    } else {
        $("#appFooter").show();
    }
    
  }.bind(this);
  
  this.isHeaderVisible = function() {
    return $('div.header').css('display') != 'none';
  }.bind(this);

  this.getQueryParam = function(uri, name) {
    var query = uri.split('?', 2);
    
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(query);
    if(results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
  
  this.updateQueryStringParameter = function(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }.bind(this);
  
};
