$(function() {
  unLog('Kiosk App Version ' + ctk.app.version);
  unLog('Kiosk url: ' + document.location);
  setEnvironment();
  
  initHome(); 
  unLog('Device ID: ' + ctk.id);
  if(document.location.href.indexOf('stagetires.canadiantire.ca') != -1){
    ctk.siteDomain = 'stagetires.canadiantire.ca';
  }
    
  // TODO: Add a load page animation
  //xhrDA.loadPageAnimation.init({'background':'#FEFEFE url("img/loading.gif") no-repeat 50% 50%'});
  
  ctk.homepageUrl = ctk.siteDomain;

  if ( ctk.store !== null && ctk.store.id !== null ) { 
    unLog('Store ID: ' + ctk.store.id);
  } else {
    //refreshStoreDetails();
  }
  
  $('#help_b').click(uOpenHelp);
  
  $('#uHelp').click(function(){
    $(this).hide();
  });
  
  $('#home').click(function(){
    window.location = window.homeRoute;
  });
  
  $('#header-back').click(function() {
    xhrDA.back();
  });
  
  $('.un-search-btn').click(function(elem) {
    if ($(this).hasClass("complete")) {
        if ($(this).find(".uSelectedVal").html().length) {
            $("#uNextStep").removeClass("disabled");
        }
        
        var ko = $(this).find('div .kk').attr('data-ko');
        xhrDA.setLocationHashParam('currentPage', 'find-' + ko);
        xhrDA.loadPage(xhrDA.locationHashValues);
    }
  });
  
  $('#welcome').click(function() {
    xhrDA.setLocationHashParam('currentPage', 'start');
    xhrDA.reloadPage();
  });
  
  /**
   * Handle selecting correct page
   */
  $(window).on('hashchange', function() {
    xhrDA.init(location.hash);
  });
  
  xhrDA.init(location.hash);
});
