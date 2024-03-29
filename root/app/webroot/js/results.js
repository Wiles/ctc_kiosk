/**
 * Deal with changing pages
 *
 *
 */
var ct_results = new function() {
  
};

$(function() {
  function initFilter() {
    try {
      var loc = window.location.toString();
      var filter = ct.getQueryParam(loc, 'filter');
      
      // Change the text of the sort link button`
      var sort_links = $('a.results-sort-option-link');
      $.each(sort_links, function(index, link) {
        if ($(link).attr('href') === filter) {
          var button = $(link).children('button')[0];
          var filter_text = $(button).text();

          var status = $('.uPlpSortStatus')[0];
          $(status).text(filter_text);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  $(window).resize(resizeResults);
  resizeResults();

  $("#byprice-option").colorbox({inline:true, width:"50%", href:'#byprice-options-page'});
  $("#bybrand-option").colorbox({inline:true, width:"50%", href:'#bybrand-options-page'});
  $("#bysubcategory-option").colorbox({inline:true, width:"50%", href:'#bysubcategory-options-page'});
  $("#byfinish-option").colorbox({inline:true, width:"50%", href:'#byfinish-options-page'});
  $("#bycolour-option").colorbox({inline:true, width:"50%", href:'#bycolour-options-page'});
  
  $('a.results-filter-option-link').click(function() {
    var href = $(this).attr('href');
    var n = ct.getQueryParam(href, 'N').replace(' ', '+');
      
    var url = ct.updateQueryStringParameter(window.location.toString(), 'narrow', n);
    window.location = url;
  });
  
  $('a.results-sort-option-link').click(function() {
    var key = $(this).attr('href');
    
    var url = ct.updateQueryStringParameter(window.location.toString(), 'filter', key);
    window.location = url;
  });
  
  $('#uPlpSortBtn').colorbox({inline:true, width:"50%", href:'#sort-option-page-contents'});
  
  $('div.options-page-title-close').click(function() {
    $.colorbox.close();
  });
  
  $('.uBtnCompare').click(function() {
    var selected = $('.uBtnCompare.btnCompareRed');
    if (selected.length < 4) {
      $(this).toggleClass('btnCompareRed');
    } else {
      // Show the no more items dialog
      $.colorbox({'href': '#uNoMoreItem'});
    }
    
    selected = $('.uBtnCompare.btnCompareRed');
    
    // Check compare button to see if we can enable it
    if (selected.length >= 2) {
      $($('#uPlpCompareBtn .uBtnOpenCompare')[0]).toggleClass('disabled');
    }
  });
  
  $($('#uPlpCompareBtn .uBtnOpenCompare')[0]).click(function() {
    var disabled = $(this).hasClass('disabled');
    if (!disabled) {
      var lang = ctk.app.lang;
      var comparePage = 'https://m.usablenet.com/mt/http://tires.canadiantire.ca/' + lang + '/wheels/compare/';
      var route = window.compareRoute;
      
      var productCodes = [];
      $.each($('.uBtnCompare.btnCompareRed'), function(index, link) {
        var result = $(link).parent().parent().parent();
        var productCode = $($(result[0]).find('.results-item-product-number')[0]).text();
        productCodes.push(productCode);
      });
      
      var codes = productCodes.join('|');
      var url = route + '?url=' + comparePage + '&productCodes=' + codes;
      window.location = url;
    } else {
      return false;
    }
  });
  
  initFilter();
});

function resizeResults() {
    var totalWidth = $('#results-items').width();
    
    var count = Math.floor(totalWidth / 450);
    var w = Math.floor(totalWidth / count) - 50;
    
    $(".results-item").width(w);
}
