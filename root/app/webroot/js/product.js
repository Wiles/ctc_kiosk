/**
 * Deal with products page
 *
 *
 */
var ct_product = new function() {
    /**
     * @this -> bound to the jquery element use $(this) to get element
     */
    this.selectionClick = function() {
      if(!$(this).hasClass('disabled')){
        $('#pdpDesc > div, #svgelem').hide();
        $('.'+$(this).attr('data-show')+' , #backToPdp').show();
        $('#pdpActionArrow').show().css('top', ($(this).index() * 90)+'px');
        if($(this).attr('id')=='pdpReviews')
            new VScroll($('#uReviewOuter')[0], 220, $('#uReviewPaginator')[0]);
         
        KOtrackPDPtabs(this);
      }
    };
};

$(function() {
  $('div.pdpdescription').prependTo($('#pdpDesc'));
  
  $('.uFloatR').removeClass('uFloatR');
  $('.uFloatL').removeClass('uFloatL');
  
  $('.uFloatTop').addClass('action-menu-top');
  $('.uFloatTop').removeClass('uFloatTop');
  $('.uFloatBottom').addClass('action-menu-bottom');
  $('.uFloatBottom').removeClass('uFloatBottom');
  
  // Setup action menu on right
  $('pdpSpecifications').click(ct_product.selectionClick);
  $('pdpReviews').click(ct_product.selectionClick);
  $('pdpWarranty').click(ct_product.selectionClick);
  $('pdpFinancing').click(ct_product.selectionClick);
});

