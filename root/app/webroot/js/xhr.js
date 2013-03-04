var xhrDA = new function() {
  
  this.back = function() {
    // TODO: 
  }.bind(this);
  
  this.loadPage = function(tag, page) {
    $('div.content-page').hide();
    $('#' + page).show();
  }.bind(this);
  
};

$(function(){
  $(window).on('hashchange', function() {
    var h = location.hash;
    if (h === 'hash-start') {
      
    } else if ('hash-') {
      
    }
  });
});
