var uDB = new uLocalStorage();

var ctk = {
	'app' : {
		'version' : '0.1', 
		'status' : 'live', // live, maintenance 
		'cache' : {}, 
		'lang' : uDB.get('lang'),
		'IP' : '0.0.0.0' 
	},  
	'id' : uDB.get('deviceID'), 	
	'projectName' : 'tires.canadiantire.ca', // use this for AWS 
	'siteDomain' : 'tires.canadiantire.ca', // use this for eg with cookies 
	'req' : {
		'url' : '', 
		'ref' : ''
	}, 
	'store' : uDB.get('store'), 
	'homepageUrl' : '', 
	'deferTime' : 5000,
	'welcome' : true,
	'plp' : {},
	'newWs' : function (a, b, c) { 
		if (typeof c == 'undefined') 
			c = 'kiosk';
		var w = new xhrDA.newWebService('canadiantire.ca', c, a, b);
		w.addParam('domain', ctk.siteDomain); // used to determine the domain where webservices will fetch the content
		return w;
	},
	'vehicle' : {
		'summary' : '',
		'year' : '',
		'make' : '',
		'model' : '',
		'submodel' : '',
		'option' : ''
	},
	'tire' : {
		'summary' : '',
		'width' : '',
		'radio' : '',
		'diameter' : '',
		'loadIndex' : '',
		'speedRating' : '',
		'name' : '',
		'sku' : '',
		'size' : '',
		'vendor' : ''
	}
};

function openConfigPage() {
	window.location = document.location.href.replace(/index./g, 'config.');
}

function setDeviceID(val) { 
	if ( $.trim(val) == '') { 
		unLog('invalid device ID');
		return false;
	}
	ctk.id = val;
	uDB.set('deviceID', val);
	unLog('Device ID: ' + ctk.id + ';');
}
function setDeviceLang(val) {
	ctk.app.lang = val;
	uDB.set('lang', val);
	render_i18n_keys();
	$('#ct_title_img').attr('src', 'images/title_selector_'+ln+'.png');
	unLog('Device Lang: ' + ctk.app.lang);
}
function setSessionLang(val) {
	ctk.app.lang = val;
	$('body').attr('lang', val);
	render_i18n_keys();
	unLog('Session Lang: ' + ctk.app.lang);
}

function initHome() {
	if(ctk.welcome){
		$('#welcome').show()
	}
	uPlp.removeAllItemToCompare();
	$('#welcome').click(function(){
		$(this).hide();
		$('#ct_title_img').attr('src', 'images/title_selector_'+ctk.app.lang+'.png');
		KOload(KOmap.selectorPage, function(){s.eVar58 = ctk.store.id; s.eVar59 = ctk.app.IP;});
		v48.init();
	});
	$('#xhr-content').hide();
	if(!uDB.get('lang')){
		uDB.set('lang', 'en');
		setSessionLang(uDB.get('lang'));
		render_i18n_keys();
	}
	$('#tires_sel').bind('click', function(){
		$(this).css('-moz-transition','margin 0.7s').css('margin-top','500px');
		//$('#search_by').css('-moz-transition','margin 0.9s').css('margin-top','0px')
		function anim1(){$('#search_by').css('-moz-transition','margin 0.5s').css('margin-top','0px')};
		setTimeout(anim1,300);
	});
	$('#wheel_sel').bind('click', function(){
        
        v48.setProp('TR1', 'Rims');
        v48.setProp('TR2', 'Vehicle');
        uSType = 'Wheels'; 
        omniSType = ':Wheel';

		$('#homepageCntnt, #welcome').hide();
		xhrDA.loadPage('/mt/http://'+ctk.siteDomain+'/'+ctk.app.lang+'/wheels/?tab=0&un_search=searchByVehicle');
	});

	$('.vec_div').bind('click', function(){
        
        v48.setProp('TR1', 'Tires');
        v48.setProp('TR2', 'Vehicle');
        uSType = 'Tires';
        omniSType = ':Tire';
		$(this).css('box-shadow','inset 0px 10px 25px #b5b5b5');
		function anim2(){
			$('#homepageCntnt, #welcome').hide();
			xhrDA.loadPage('/mt/http://'+ctk.siteDomain+'/'+ctk.app.lang+'/tires/?tab=0&un_search=searchByVehicle');
		};
		setTimeout(anim2,300);
	});
	$('.size_div').bind('click', function(){
        
        v48.setProp('TR1', 'Tires');
        v48.setProp('TR2', 'TireSize');
        uSType = 'Tires';
        omniSType = ':Tire';
		$(this).css('box-shadow','inset 0px 10px 25px #b5b5b5');
		function anim2(){
			$('#homepageCntnt, #welcome').hide();
			xhrDA.loadPage('/mt/http://'+ctk.siteDomain+'/'+ctk.app.lang+'/tires/?tab=1&un_search=searchByType');
		};
		setTimeout(anim2,300);
	});
	$('.uTopNavBarBackSvg').on('click', function(){
		xhrDA.back();
		KOback(this);
	});
	$('#uFitmentData').on('click', function(){
		uOpenModal("/mt/https://"+ctk.siteDomain+"/"+ctk.app.lang+"/info-centre/fitment-data/");
	});
	KOsetProp1();
	KOload(KOmap.home);
}
/*function initPlp(){
    KOload(KOmap.plp);
}*/

function initPdp(){
	var s = true;
	$('#pdpSize .pdpStyle').html($('#selStyleSize option:selected').text());
	if($('.uAnyReview').length == 0){
	 	$('#pdpReviews').css('padding', '15px 0 0 6px');
	}
	$('.selected_veh').html(ctk[uOmniSTypePLP].summary);
	$('#uStyleSize .uSizePdpValue').eq($('#selStyleSize option:selected').index()).addClass('selected');
	$('#pdpPrint').on('click', function(){
		if(!$(this).hasClass('disabled')){
			$('#pdpPrint').addClass('disabled');
			printPdp(true);
			setInterval(function(){$('#pdpPrint').removeClass('disabled')}, 9000);
			KOtrackPDPprint(this);
		}
	});
	$('#pdpEmail').bind('click', function(){
       $('#pdpMailContent').show();
       $('#pdpDesc > div, #pdpActionArrow').hide();
       $('#svgelem').show();
       $('#pdpContent, .uTopNavBarBackSvg_toPdp').hide();
       KOtrackPDPemail();
       help_src = 'email';
       $('#help_b').removeClass('disabled');
    });
	$('.uTopNavBarBackSvg_toPdp').on('click', function(){
		$(this).hide();
		$('#pdpDesc > div, #pdpActionArrow').hide();
		$('.uGeneral, #svgelem').show();
		KOback(this);
	});

	/*$('#pdpSize').on('click', function(){
		$('#pdpDesc > div, #svgelem').hide();
		$('.'+$(this).attr('data-show')+' , #backToPdp').show();
		if(s){
			new VScroll($('#uStyleSize')[0], 220, $('#uStyleSizePaginator')[0]);
			s = false;
		}
	});*/

	$('#pdpAction .big_red').bind('click', function(){
		if(!$(this).hasClass('disabled')){
			$('#pdpDesc > div, #svgelem').hide();
			$('.'+$(this).attr('data-show')+' , #backToPdp').show();
			$('#pdpActionArrow').show().css('top', ($(this).index() * 90)+'px');
			if($(this).attr('id')=='pdpReviews')
				new VScroll($('#uReviewOuter')[0], 220, $('#uReviewPaginator')[0]);
			
			KOtrackPDPtabs(this);
		}
	});

	$('.uSizePdpValue').on('click', function(){
		document.getElementById('selStyleSize').selectedIndex = $(this).attr('data-index');
		$('#pdpSize .pdpStyle').html($('#selStyleSize option:selected').text());
		$('#pdpDesc > div, #pdpActionArrow, #backToPdp').hide();
		$('.uGeneral, #svgelem').show();
		$('#uStyleSize .uSizePdpValue.selected').removeClass('selected');
		$(this).addClass('selected');
	});
	$('#pdpMailContent').hide();
	render_i18n_keys();
	
	KOtrackPDP();
}

function initSearch(id){
	var iTvr, counter = 0;
	isVar48 = false;
	uPlp.removeAllItemToCompare();
	function checkCont(){
		var id_div = id+'_div';
		if(document.getElementById(id_div).children.length < 1 && counter < 10)
			setCont()
		else if(counter >= 10)
			clearTimeout(iTvr);
		++counter;
	}
	function setCont(){
		var elm = document.getElementById(id);
		for(var i=0; i<elm.children.length; i++){
			if( !(elm.children[i].hasAttribute("disabled")) ){
				var val = elm.children[i].value!='' ? elm.children[i].value : elm.children[i].text;
				var btn = '<div class="un-search-btn_grayH" u-ix="'+i+'">'+val+'</div>';
				$('#'+id+'_div').append(btn);
			}
		}
		$('select').on('change', function(){
			//unLoadSelect($(this).attr('id'));
		});
		iTvr = setTimeout(checkCont,1000);
	};
	setTimeout(setCont,600);
	$('.vec_div, .size_div').css('box-shadow', '0px 0px 0px transparent');
	$('#search_by').css('-moz-transition','margin 0.7s').css('margin-top','500px');
	function anim1(){$('#tires_sel').css('-moz-transition','margin 0.5s').css('margin-top','0px')};
	setTimeout(anim1,300);
	 var d = $("#selector");
	 var g = {
	    selVehicleYear: {
	        selectID: "selVehicleYear",
	        apiURL: "getMakes?Year=#selVehicleYear#&Make=%22%22&isVehicleCrossOver=false",
	        nextSelect: "selVehicleMake"
	    },
	    selVehicleMake: {
	        selectID: "selVehicleMake",
	        apiURL: "getModels?Year=#selVehicleYear#&Make=%22#selVehicleMake#%22&Model=%22%22&isVehicleCrossOver=false",
	        nextSelect: "selVehicleModel"
	    },
	    selVehicleModel: {
	        selectID: "selVehicleModel",
	        apiURL: "getChassis?Year=#selVehicleYear#&Make=%22#selVehicleMake#%22&Model=%22#selVehicleModel#%22",
	        nextSelect: "selVehicleBody"
	    },
	    selVehicleBody: {
	        selectID: "selVehicleBody",
	        apiURL: "getOptions?Year=#selVehicleYear#&Make=%22#selVehicleMake#%22&Model=%22#selVehicleModel#%22&Chassis=%22#selVehicleBody#%22",
	        nextSelect: "selVehicleOption"
	    }
	};
	d.find("select").on("change", function () {
	 var b = $(this),
	     c = b.attr("id"),
	     d = b.parents("form");
	 if (g[c]) {
	     var e = "http://ctcjs.carpronetwork.com/tools.asmx/" + g[c].apiURL + "&Username=%22ctc%22&Password=%22w3bs3rvic3s%22&format=json";
	     $.each(g, function () {
	         e.indexOf("#" + this.selectID + "#") > -1 && (e = e.replace("#" + this.selectID + "#", escape($("#" + this.selectID).val())))
	     });
	         $.ajax({
	             url: e,
	             method: "get",
	             dataType: "jsonp",
	             success: function (e) {
	                 var f = $("#" + g[c].nextSelect),
	                     h = d.find("select:gt(" + d.find("select").index(b) + ")");
	                 h.length && (h.each(function () {
	                     var b = $(this).val("");
	                     b.find("option:not(:eq(0))").remove();
	                     b.find("option:eq(0)").text("")
	                 }), d.find(".buttonAlternate").addClass("buttonDisabled").removeClass("buttonAlternate"));
	                 f.find("option:first-child").text(f.attr("data-defaulttext"));
	                 for (var h = 0, i = e.d.length; h < i; h++) $('<option value="' + e.d[h].Attribute.replace('"', "&quot;") + '">' + e.d[h].Attribute + "</option>").appendTo(f)
	             }
	         })
	     }
	 });
	 
	 KOtrackSearch(isVar48);
}
function unLoadSelect(id, x){
	unLog('Load Select: '+id+' length '+document.getElementById(id).children.length);
	if( !($('#'+id+'_div').parents('.searchContDiv').hasClass('d_yes')) || x ){
		var elm = document.getElementById(id);
		for(var i=0; i<elm.children.length; i++){
			if( !(elm.children[i].hasAttribute("disabled")) ){
				//unLog(id+' -> '+elm.children[i].value);

				var c = '';
				var val = elm.children[i].value!='' ? elm.children[i].value : elm.children[i].text;
				if(val.length > 14){
					c = 'long';
					var uCP = val.split(' '), 
						zx = uCP[0].length < 2 ? 2 : 1;
					val = '<div>';
					if(zx == 2)
						val += uCP[0]+' '+uCP[1];
					else
						val += uCP[0];
					val += '<div>';
					for(var wd=zx; wd<uCP.length; wd++){
						val += ' '+uCP[wd];
					}
				}
				var btn = '<div class="un-search-btn_grayH '+c+'" u-ix="'+i+'">'+val+'</div>';
				$('#'+id+'_div').append(btn);
			}
		}
		function setScroll(){
			var ix = $('.searchContDiv.d_yes').index() + 1;
	        new VScroll(document.getElementById('uSearchOuter_'+ix), 220, $('#uSearchPaginator_'+ix));
    	}
		setTimeout(setScroll,500);
	}
};
function unSetSelect(ix, id){
	unLog(id+' Set Select '+ ix);
	$('#'+id+' option').removeAttr('selected');
	$('#'+id+' option').eq(ix).attr('selected', 'selected').trigger('click');
	$('#'+id).trigger('change');
};
function setHomeScreen(ln){
	setSessionLang(ln);
	ctk.home = false;
	$('#welcome').hide();
	$('#ct_title_img').attr('src', 'images/title_selector_'+ln+'.png');
	unResetSession();
}

function switchLang(link){
	if(ctk.app.lang=='fr'){
		setHomeScreen('en');
		KOsetProp1();
		KOlinkCode(link, 'Kiosk_Footer_SwitchToEnglish');
	}
	else{
		setHomeScreen('fr');
		KOsetProp1();
		KOlinkCode(link, 'Kiosk_Footer_SwitchToFrench');
	}
}		
function unResetSession(x, y, z){
	if ( ! $('#welcome').is(':visible') ) {
		unLog('unResetSession');
		if(z){
			$('#uthere, .opacity_bg').hide();
		}
		clearTimeout(x);
		clearTimeout(y);
		if (uDB.get('environment') == 'prod') 
			tM = setTimeout(areYouThere, 120000);
	}
	else{
		clearTimeout(tM);
	}
}
function areYouThere(){
	unLog('areYouThere');
	$('#uthere, .opacity_bg').show();
	$('#uNoMoreItem,  #uSearchDisclaimer, #uPopUp').hide();
	cLs = setTimeout(unClearSession, 10000);
	$('.vec_div, .size_div').css('box-shadow', '0px 0px 0px transparent');
	$('#search_by').css('-moz-transition','margin 0.7s').css('margin-top','500px');
	function anim1(){$('#tires_sel').css('-moz-transition','margin 0.5s').css('margin-top','0px')};
	setTimeout(anim1,300);
}
/*function unClearSession(x, y){
	$('#welcome, #homepageCntnt, #appFooter').show();
	$('#uthere,.opacity_bg, #xhr-content').hide();
	$('.vec_div, .size_div').css('box-shadow', '0px 0px 0px transparent');
	$('#search_by').css('-moz-transition','margin 0.7s').css('margin-top','500px');
	function anim1(){$('#tires_sel').css('-moz-transition','margin 0.5s').css('margin-top','0px')};
	setTimeout(anim1,300);
	clearTimeout(x);
	clearTimeout(y);
	ctk.home = true;
	uDB.set('home', true);
	ctk.app.lang = uDB.get('lang');
	$('#ct_title_img').attr('src', 'images/title_selector_en.png');
	$('body').attr('lang', ctk.app.lang);
	render_i18n_keys();
	uHideVkb();
	KOsetProp1();
}*/
function unClearSession() { // new implementation, app reloads if session timeouts
	document.location.reload();
}

var handleError = {
	generic : function (type) {}, 
	expired : function () {}, 
	noCode : function () {}, 
	show : function (msg) {}
}

function setCookie(c_name,value,path,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	var ck = c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	if (typeof path != 'undefined')
		ck += ';path=' + path;
	document.cookie=ck;
}

function uHideCompareAlert(){
	$('#uNoMoreItem, .opacity_bg').hide();
}

function refreshStoreDetails(forced) {
	if ( forced || new Date().getTime() > ctk.store.ttl )
		getAndSaveStoreDetails(ctk.store.id); // refresh store cookies session
}
function getAndSaveStoreDetails(storeID) { 
	unLog('Get Store ID..');
	var mws = ctk.newWs('makeThisMyStore', 'json');
	mws.addParam('storeID', storeID); // 'CTPOS-604'
	mws.execute( function (res) {
 			//unLog('res: ' + JSON.stringify(res)); 
 			if ( res.store ) {
	 			ctk.store = res.store;
    			ctk.store.ttl = new Date().getTime() + 86400000; // 1day, refresh every day
	 			uDB.set('store', ctk.store);
				unLog('Store ID: ' + ctk.store.id + ' ' + ctk.store.name + ';');
	 		}
 		}, 
 		function(e) { 
 			unLog('Set up Store Details Failed. ' + e); 
 		}
 	);
	// setCookie('GRANDVIEW & BENTALL','CTPOS-604','2830 BENTALL STREET','','VANCOUVER',' BC','V5M4H4','604-431-3570','604-431-3572','','e-commerce604@gvasl.com','604');
};

function initOfflineCache() {
	window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        	console.log('found new cache manifest');
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new hotness.
            window.applicationCache.swapCache();
            console.log('cache manifest swaped');
            if (confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);

    $(window).bind("online", function() {
	    unLog('App is online');
	    $('#appOffline').hide();
	}).bind("offline", function() {
		unLog('App is offline');
		$('#appOffline').show();
	});
}

function uLocalStorage() {
	
	this.get = function(name) {
		try {
			return JSON.parse(localStorage.getItem(name))
		}
		catch(e) {
			return localStorage.getItem(name);
		}
	};

	this.set = function(key, value) { // key[String], value[Object or String] 
		//console.log('val is type: ' + typeof value);
		if (typeof value === 'function') 
			throw new TypeError('Functions can not be saved');
		localStorage[key] = typeof value === 'object' ? JSON.stringify(value) : value;
	};

	this.delete = function(key) {
		localStorage.removeItem(key);
	};
}

function unLog(e) {
	console.log(e);
	var el = $('#unLog');
	if (el.length)
		el.append(e + '</br>');
}

function setEnvironment() {
	var env = uDB.get('environment');
	
	if (env == 'dev') {
		// do something
	} else if (env == null) { // default
		uDB.set('environment', 'prod');
	}
	$('body, html').attr('environment', uDB.get('environment'));
	$('body').attr('lang', ctk.app.lang);
	unLog(uDB.get('environment') + ' Environment');
	uDB.set('appBaseUrl', document.location.href);
}

function uDevOpenPdp(){
	var uSType = 'vehicle';
	xhrDA.loadPage('/mt/http://'+ctk.siteDomain+'/en/tires/winter-tires/product/0087914P/pirelli-winter-carving-/');
}

function uOpenHelp(){
	if(help_src){
		$('#uHelp').css('background-image', 'url("images/'+ctk.app.lang+'/help/help-'+help_src+'.png")').show();
	}
}

function uOpenModal(url){
	$('#uDismissPopup').hide();
	$('#uPopUp').css({'height':'600px'});
	$('#uPopUp .uPopContent').css({'background':'url("images/loading.gif") no-repeat scroll 50% 75% #fff', 'height':'350px'}).html('');
	$('.opacity_bg, #uPopUp').show();
	$.ajax({
		url: url,
		success: function(data) {
			$('#uDismissPopup').show();
			$('#uPopUp .uPopContent').html(data).css({'background':'none', 'height':'auto'});
			$('#uPopUp').css({'height':'auto','margin-top' : '0px' ,'left':'47%', 'font-size':'0.9em' });
			$('#uPopUp').css({'top' : ( (($(window).height() - $('#uPopUp').height()) / 2) - 20 )+'px'});

			//$('.opacity_bg, #uPopUp').show();
			setTimeout(function(){
				$('#uPopUp, .opacity_bg').hide();
				$('#uPopUp').css({'top' : '40%', 'margin-top' : '-200px'});
			}, 60000);

			$('#uDismissPopup').unbind('click').bind('click', function(){
				$('#uPopUp, .opacity_bg').hide();
				$('#uPopUp').css({'top' : '40%', 'margin-top' : '-200px'});
			});
		}
	});
}


function printCompare(){
	var cont = '';
	var temp = $('#printReceiptContainer').html();
	$('#p_tire').html('');
	$('.uCompareSimpleDiv.productName').not('.Blank').each(function(index){
		if(typeof($('.uCompareSimpleDiv.Logos img').eq(index).attr('src')) != 'undefined'){
			cont += '<h4 class=uPrintProductName uTxtXS">'+u_i18n.Your_Tire[ctk.app.lang]+' # '+(index+1)+'</h4>';
			cont += '<div class="dot"><span data-i18n="Product_Name">Product Name</span><br><span id="p_tire_name">'+$(this).text()+'</span></div>';
			cont += '<div class="dot"><span data-i18n="Product_#">Product #</span><br><span id="p_tire_sku">'+$('.uSkuComp').eq(index).text()+'</span></div>';
			cont += '<div class="dot"><span data-i18n="Tire_Size">Tire Size</span><br><span id="p_tire_size">'+$('.uSizeSpan').eq(index).text()+'</span></div>';
			cont += '<div class="dot"><span data-i18n="Vendor_#">Vendor #</span><br><span id="p_tire_vendor">'+$('.uCompareSimpleDiv.Logos img').eq(index).attr('src').replace('http://tiresinc.canadiantire.ca/assets/images/Logos/', '').replace('.gif', '')+'</span></div>';
			cont += '<div class="dot"><span data-i18n="Price">Price</span><br><span id="p_tire_price">'+$('.bigPrice').eq(index).html()+'</span></div>';
		}
	});
	$('#p_tire').html(cont);
	$('#printReceiptContainer').addClass('Compare');
	render_i18n_keys();
	printPdp(false);
	$('#printReceiptContainer').removeClass('Compare');
	$('#printReceiptContainer').html(temp);
}

function printPdp(v){
	$('#p_store #store_id').html(ctk.store.num);
	$('#p_store #store_address').html(ctk.store.address1.toLowerCase());
	$('#p_store #store_phone').html(ctk.store.phone);
	var d = new Date(), curr_min = d.getMinutes() + "", curr_hr = d.getHours() + "";

	function toHHMM(time){
		if (time.length == 1) {
        	time = "0" + time;
    	}	
    	return time;
	}

	curr_min = toHHMM(curr_min);
	curr_hr = toHHMM(curr_hr);

	$('#p_store #store_date').html((d.getMonth() + 1) +"/"+d.getDate()+"/"+d.getFullYear()+" "+curr_hr+':'+ curr_min);

	$('#p_vehicle #p_vehicle_year').html(ctk.vehicle.year);
	$('#p_vehicle #p_vehicle_make').html(ctk.vehicle.make);
	$('#p_vehicle #p_vehicle_model').html(ctk.vehicle.model);
	$('#p_vehicle #p_vehicle_submodel').html(ctk.vehicle.submodel);
	$('#p_vehicle #p_vehicle_option').html(ctk.vehicle.option);

	if(v){
		$('#p_tire #p_tire_name').html($('#productName').text());
		$('#p_tire #p_tire_sku').html($('#metaProductID').text());
		$('#p_tire #p_tire_size').html($('.pdpStyle').text());
		$('#p_tire #p_tire_vendor').html($('.pdpMaker img').attr('src').replace('http://tiresinc.canadiantire.ca/assets/images/Logos/', '').replace('.gif', ''));
		$('#p_tire #p_tire_price').html($('.pdpPrice').html());
	}

	if(uSType == 'tire'){
		$('#p_vehicle').addClass('d_none');
	}else{
		$('#p_vehicle').removeClass('d_none');
	}

	window.print();
}
