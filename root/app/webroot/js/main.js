$(function() {
  ct.changePage('page-start');
  
  render_i18n_keys();
  unLog('Kiosk App Version ' + ctk.app.version);
  unLog('Kiosk url: ' + document.location);
  setEnvironment();
  
  $('#webappContent').removeClass('d_none');
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
    unClearSession(tM, cLs);
    KOlinkCode(this, 'Kiosk_Footer_Home');
  });
  
  $('#header-back').click(function() {
    xhrDA.back();
  });

  // What is this?
  $.ajax({
      url: '/mt/http://tires.canadiantire.ca/en/?un_jtt_v_only_ip=yes',
    success: function(data) {
      ctk.app.IP = data.split('{@}')[1];
    }
  });
  
  /**
   * Handle selecting correct page
   */
  $(window).on('hashchange', function() {
    xhrDA.init(location.hash);
  });
  
  xhrDA.init(location.hash);
});
