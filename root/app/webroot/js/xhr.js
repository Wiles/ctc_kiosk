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
    history.back();
  }.bind(this);
  
  /**
   * Load a new page and support the back button
   */
  this.loadPage = function(params) {
    $.each(params, function(key, val) {
      this.setLocationHashParam(key, val);
    }.bind(this));
  }.bind(this);
  
  
  this.init = function(hash) {
    var pages = hash.split('&');
    var pageValues = new Array();
    
    var i = function(index, page) {
      var kv = page.split('=');
      this[kv[0]] = kv[1];
      debugger;
    };
    
    i.bind(pageValues);
    
    $.each(pages, i);
    
    $.each(pageValues, function(key, value) {
      // TODO: Fill global variables
      xhrDA.setLocationHashParam(key, value);
    });
    
    debugger;
    if ('currentPage' in pageValues) {
      ct.changePage('page' + pageValues['currentPage'])
    }
  }.bind(this);
};
