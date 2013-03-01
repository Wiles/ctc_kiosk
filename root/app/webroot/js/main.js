var ct = new function() {
  this.pages = new function() {
    
  };

  this.changePage = function(page) {
    $('div.content-page').hide();
    $('#' + page).show();
  }.bind(this);
  
  this.isHeaderVisible = function() {
    return $('header').css('display') != 'none';
  }.bind(this);

  this.showHeader = function(show) {
    if (show) {
      $('#header').show();
    } else {
      $('#header').hide();
    }
  }.bind(this);
};

$(function() {
  ct.changePage('page-start');
});
