/**
 * Deal with compare page
 *
 *
 */
var ct_compare = new function() {
    
};

$(function() {
  function fixLinks() {
    var re = /('|")(.*)(?:\1)/;
    
    var hrefs = $('a.un-url-label');
    $.each(hrefs, function(index, value) {
      var a = $(value);
      var onclick = a.attr('onclick');
      var href = re.exec(onclick)[0].replace(/'/g, '');
      
      a.unbind('click');
      
      var newHref = href.replace('/mt/', window.fromRoute + '?url=').replace('http://tires.canadiantire.ca', '');
      a.attr('href', newHref);
    });
    
    var hrefs = $('.productName a');
    $.each(hrefs, function(index, value) {
      var a = $(value);
      var onclick = a.attr('onclick');
      var href = re.exec(onclick)[0].replace(/'/g, '');
      
      a.unbind('click');
      
      var newHref = href.replace('/mt/', window.fromRoute + '?url=').replace('http://tires.canadiantire.ca', '');
      a.attr('href', newHref);
    });
  }

  $('.uRemoveFromCompareDiv').click(function() {
    var ix = $(this).children('.uRemoveFromCompare').data('ix');
    
    var uClone = $('.uAddFromCompareDiv').eq(0).clone();
    $(this).replaceWith(uClone);
    
    uClone.bind('click', function(){xhrDA.back()});
    for(var i=1; i <  $('.uCompareTainer').length; i++){
      $('.uCompareTainer').eq(i).children('div').eq(ix).html('').addClass('Blank');
    }
    
    $('div[data-rix='+ix+']').each(function(index){
      $(this).html('').addClass('Blank');
    });
    
    if($('.uRemoveFromCompareDiv').length == 0){
      xhrDA.back();
    }
  });
  
  $('.uAddFromCompareDiv').click(function() {
      xhrDA.back();
  });
  
  $('#un_scroller_up').click(function() {
    var button = $(this);
    
  });
  
  $('#un_scroller_down').click(function() {
    var button = $(this);
    
  });
  
  fixLinks();
});
