var ct = (function() {
  this.pages = {
    
  };
  
  this.changePage = function(page) {
    
  }.bind(this);

  this.isHeaderVisible = function() {
    return $('header').visible();
  }.bind(this);

  this.showHeader = function(show) {
    $('header').visible((show) ? '' : '');
  }.bind(this);
  
})();

$(function() {
  this.changePage('page-home');
});
