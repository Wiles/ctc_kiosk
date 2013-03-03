$(document).ready( function () { 
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
    
  xhrDA.init({'platform':'xhr-kiosk', 'company':'Canadian Tire'});
  xhrDA.loadPageAnimation.init({'background':'#FEFEFE url("img/loading.gif") no-repeat 50% 50%'});
  ctk.homepageUrl = ctk.siteDomain;
  //xhrDA.loadPage('/mt/' + ctk.homepageUrl);

  if ( ctk.store !== null && ctk.store.id !== null ) { 
    unLog('Store ID: ' + ctk.store.id);
  } 
  else {
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

  $.ajax({
      url: '/mt/http://tires.canadiantire.ca/en/?un_jtt_v_only_ip=yes',
    success: function(data) {
      ctk.app.IP = data.split('{@}')[1];
    }
  });
});