/**
 * Deal with changing pages
 *
 *
 */
var xhrDA = new function() {
  this.locationHashValues = {}

  this.getLocationHashValuesString = function() {
    var s = '';
    $.each(this.locationHashValues, function(key, value) {
      s += key + '=' + value + '&';
    }.bind(this));
    
    return s.replace(/&$/,'');
  }.bind(this);
  
  this.setLocationHashParam = function(param, value) {
    this.locationHashValues[param] = value;
    location.hash = this.getLocationHashValuesString();
    return location.hash === this.getLocationHashValuesString();
  }.bind(this);
  
  this.back = function() {
    history.go(-1);
  }.bind(this);
  
  /**
   * Load a new page and support the back button
   */
  this.loadPage = function(params) {
    $.each(params, function(key, val) {
      this.setLocationHashParam(key, val);
    }.bind(this));
  }.bind(this);
  
  /**
   * Initialize the location hash values from the location.hash
   * and change the page
   */
  this.init = function(hash) {
    var pages = hash.split('&');
    var pageValues = {};
    
    $.each(pages, function(index, page) {
      if (page !== '') {
        var kv = page.split('=');
        pageValues[kv[0].replace(/^#/, '')] = kv[1];
      }
    });
    
    $.each(pageValues, function(key, value) {
      // TODO: Fill global variables
      xhrDA.setLocationHashParam(key, value);
    });
    
    if ('currentPage' in pageValues) {
      ct.changePage('page-' + pageValues['currentPage'])
    }
  }.bind(this);
};
