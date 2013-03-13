/**
 * Deal with configuration page
 *
 *
 */
var config_page = new function() {

};
 
 $(function() {
  ct.onPageChange('page-config', function() {
    $('#findFooter').hide();
    $('.header').hide();
    $('#appFooter').hide();
  });
  
  $('#config-store-id').val(uDB.get('store'));
  $('#config-device-id').val(uDB.get('deviceID'));
  
  $('#config-submit').click(function() {
    function isWhitespace(str) {
      return str == '' || str.match(/\s/);
    }
  
    var submit = $(this);
    var store = $('#config-store-id').val();
    var device = $('#config-device-id').val();
    
    if (isWhitespace(store)) {
      alert('Please enter Store ID');
      return false;
    }
    
    if (isWhitespace(device)) {
      alert('Please enter Dealevice ID');
      return false;
    }
    
    uDB.set('store', store);
    //getAndSaveStoreDetails(store);
    setDeviceID(device);
    
    ctk['store'] = store;
    ctk['id'] = device;
    xhrDA.setLocationHashParam('currentPage', 'home');
    xhrDA.reloadPage();
    
    return false;
  });
 });
 