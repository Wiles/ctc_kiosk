/**
 * Deal with products page
 *
 *
 */
var ct_product = new function() {
    /**
     * Handle any of the button clicks on the action menu on the right
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
    
    /**
     * Handle email button clicked
     * @this -> bound to the jquery element use $(this) to get element
     */
    this.emailClick = function() {
      $('#pdpMailContent').show();
      $('#pdpDesc > div, #pdpActionArrow').hide();
      $('#svgelem').show();
      $('#pdpContent, .uTopNavBarBackSvg_toPdp').hide();
      KOtrackPDPemail();
      help_src = 'email';
      $('#help_b').removeClass('disabled');
    };
    
    /**
     * Handle back button clicked while writing email
     * @this -> bound to the jquery element use $(this) to get element
     */
    this.backMailClick = function() {
      $('#pdpMailContent').hide();
      $('#pdpDesc > div').show();
      $('#svgelem').hide();
      $('#pdpContent, .uTopNavBarBackSvg_toPdp').show();
    };
    
    /**
     * Handle privacy policy clicked
     * @this -> bound to the jquery element use $(this) to get element
     */
    this.privacyPolicyClick = function() {
      
    };
    
    /**
     * Handle send email button clicked
     * @this -> bound to the jquery element use $(this) to get element
     */
    this.sendEmailClick = function() {
      if ( submitBtn.hasClass('uBtnRed') ) { // valid
          var date = new Date();
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1;
          var yyyy = today.getFullYear();
          if (dd<10) {
              dd='0'+dd
          }
          if (mm<10) {
              mm='0'+mm
          }
          today = mm+'/'+dd+'/'+yyyy;
   
          $('#helloRecipient').val( $('#helloRecipient').val().replace('{0}', $('#recipientName').val() ) + today );
          $('#pdpURL').val(ctk.req.url);
          $('#textMsg').val( $('#helloRecipient').val() + '\n\n' + $('#textMsg').val() );
          emailMsg.text( $('#textMsg').val() );
          xhrDA.sendForm(form.find('input[type="text"]')[0]);
           
          KOtrackPDPemailSend(this);
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
  $('#pdpSpecifications').click(ct_product.selectionClick);
  $('#pdpReviews').click(ct_product.selectionClick);
  $('#pdpWarranty').click(ct_product.selectionClick);
  $('#pdpFinancing').click(ct_product.selectionClick);
  
  $('#pdpEmail').click(ct_product.emailClick);
  $('#backMail').click(ct_product.backMailClick);
  
  $('#uPrivacy_policy').click(ct_product.privacyPolicyClick);
  $('#uConfirmEmailForm').click(ct_product.sendEmailClick);
  
  $('<img id="warranty-image" src="' + window.webroot + 'img/warranty.jpg" />').appendTo($('.searchLabel'));
});


function uOpenModal(url) {
  $.colorbox({
    href: url
  });
};
