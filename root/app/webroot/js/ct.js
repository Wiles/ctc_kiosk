var ct = new function() {

  this.initValues = function(values) {
    
  }.bind(this);

  this.changePage = function(page) {
    $('div.content-page').hide();
    $('#' + page).show();
    
    if (page === 'page-start') {
      this.showHeader(false);
    } else {
      this.showHeader(true);
    }
    
  }.bind(this);
  
  this.isHeaderVisible = function() {
    return $('div.header').css('display') != 'none';
  }.bind(this);

  this.showHeader = function(show) {
    if (show) {
      $('div.header').show();
    } else {
      $('div.header').hide();
    }
  }.bind(this);
  
};
