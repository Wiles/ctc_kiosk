var ct = new function() {  
  this.initValues = function(values) {
    
  }.bind(this);

  this.changePage = function(page) {
    $('div.content-page').hide();
    $('#' + page).show();
    
    // header highlighting magic
    $(".un-search-btn.un-search-btn_grayL.selected").removeClass("selected");
    $("#header-" + page).addClass("selected").removeClass("complete");
    $("#header-" + page).prevAll().addClass("complete");
    $("#header-" + page).nextAll().removeClass("complete").addClass("disabled");
    
    if (page === 'page-start' || page === 'page-home') {
      this.showHeader(false);
    } else {
      this.showHeader(true);
      resizeFindPages();
    }
    
  }.bind(this);
  
  this.isHeaderVisible = function() {
    return $('div.header').css('display') != 'none';
  }.bind(this);

  this.showHeader = function(show) {
    if (show) {
      $('div.header').show();
      $("#findFooter").show();
    } else {
      $('div.header').hide();
      $("#findFooter").hide();
    }
  }.bind(this);
  
};
