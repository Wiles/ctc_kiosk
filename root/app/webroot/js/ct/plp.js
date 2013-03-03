function uMemory() {
	var props = {
		'blocksLimit' : 5
	};
	var queue = [];
	var blocks = {};

	this.init = function (options) {
		props = $.extend(props, options);
		//console.dir(props);
	};

	this.save = function (page, data) {
		queue.unshift(page);
		blocks['p' + page] = data;
		return checkSizeLimit(page);
	}
	this.get = function (page) {
		var p = blocks['p' + page];
		return p ? p : false;
	}
	this.status = function() {
		/*console.log('Mem Queue ', queue);
		console.log('Mem Blocks ', blocks);*/
	}
	this.clear = function() { 
		queue = [];
		blocks = {};
	}
	var checkSizeLimit = function (page) {
		/*console.log('q length: ' + queue.length + ', limit: ' + props.blocksLimit);*/
		if ( queue.length > props.blocksLimit ) {
			var oldest = queue.pop();
			blocks['p' + oldest] = null;
			return true;
		}
		return false;
	}
}

function uPlpController() {
	var parent = this, 
		updatingPage = true, 
		paginatorContainer, 
		props = {
			url: '', 
			totalItems: 0, 
			itemsPerPage: 6, // default 6
			totalPages: 0, // calculated based on totalItems and itemsPerPage
			activePage: 1, 
			pagesMemoryLimit: 0, 
			sortBy: '', 
			additionalData: ''
		}, 
		mem = new uMemory(), 
		itemsToCompare = [], 
		paginatorContainer, 
		pageStatusContainer, 
		prefetchingPageNum = null; 

	$('body').on('click', '#uPlpItemsOuter .uPlpItemCompareItem', function(ev) { 
		console.log('toggleItemToCompare: ', ev);
	});

	this.initialize = function(options) { 
		//console.log('options to update', options);
		this.updateProps(options);
		mem.init({'blocksLimit' : props.pagesMemoryLimit});
		uPlp.itemsToCompare = [];
		$('#uPlpCompareBtn').on('click', function(){
			if(!$('.uBtnOpenCompare').hasClass('disabled')){
				document.uCompareProds.productCodes.value = "";
				for(var i=0; i< uPlp.getItemsToCompare().length; i++){
					document.uCompareProds.productCodes.value += uPlp.getItemsToCompare()[i]+'|';
				}
				xhrDA.sendForm(document.getElementById('uCompareProds')[0]);
				KOtrackCompare(this);
			}
		});
		//console.log('init plp content');
	};

	this.initPaginator = function() { 
		paginatorContainer = $('#uPlpPaginator');
		pageStatusContainer = $('#uPlpPageStatus'); 

		if ( props.totalPages == 1 ) { 
			paginatorContainer.hide();
			return false;
		} else {
			//paginatorContainer.find('.uPlpPageLoadingMsg').append('<img width="12" src="images/loading.gif" style="margin-left:5px;visibility: visible;">'); 
			paginatorContainer.show();
		}

		var next = paginatorContainer.find('#uPlpNext'), 
			prev = paginatorContainer.find('#uPlpPrev'); 

		$('#uPlpTotalPages').text(props.totalPages);

		prev.bind('click', function (ev) { 
			if ( $(this).hasClass('disabled') || updatingPage )
				return;
			touchFeedback(ev);
			parent.loadPrevPage(); 
			checkPagesBoundaris(); 
		});
		
		next.bind('click', function (ev) { 
			if ( $(this).hasClass('disabled') || updatingPage )
				return;
			touchFeedback(ev);
			parent.loadNextPage(); 
			checkPagesBoundaris(); 
		});

		function checkPagesBoundaris() { 
			if ( props.activePage == 1 ) 
				prev.addClass('disabled');
			else 
				prev.removeClass('disabled');


			if ( props.activePage == props.totalPages ) 
				next.addClass('disabled');
			else 
				next.removeClass('disabled');

			updateActivePageTxt();
		}

		function touchFeedback(ev) {
			$(ev.target).addClass('pressed');
			setTimeout( function () { 
				$(ev.target).removeClass('pressed');
			}, 300);
		}
		checkPagesBoundaris();
	}
	
	this.initSort = function() { 
		var sortOptsOverlay = $('#uPlpSortByOptions');
		$('#uPlpSortBtn').click( function (ev) { 
			sortOptsOverlay.notum({'modalBg_class':'uPlpFilterNotumBg'});
			KOtrackPLPnarrowBy(this);
		});
		sortOptsOverlay.delegate('button.uPlpApplyFilterBtn', 'click', function (ev) { 
			uPlp.removeAllItemToCompare();
			$('select[name="pn_ok"]').val( $(this).data('value') );
			$('#uPlpSortGo').click();
		});
	}
	function updateActivePageTxt() { 
		$('#uPlpActivePage').text(props.activePage);
	}

	this.updateProps = function(data) { 
		mem.clear();
		props = $.extend(props, data);
		//console.log(props);
		props.totalPages = Math.ceil( props.totalItems / props.itemsPerPage );
	}

	this.getStatus = function() {
		mem.status();
		//console.dir(props);
		return props;
	}

	var fetchItemsPage = function(page, callback) {
		var pws = ctk.newWs('getPlp', 'json');
			pws.addParam('source', props.url);
			pws.addParam('page', Math.ceil(page/2));
			pws.addParam('elPerPage', 12); 
			pws.addParam('sortBy', props.sortBy); 
			pws.addParam('additionalData', props.additionalData)
			pws.execute( function (res) {
				//console.log('status ok'); 
				var i = res.items;
				if ( ! i.length ) {
					//console.log('no results');
					return false;
				}

				var lim = props.itemsPerPage, 
					p1 = i.slice(0, lim), 
					p2 = i.slice(lim, (lim*2)), 
					m = page % 2;
				//console.log('m: ', m);
				if ( p1.length )
					mem.save(page-1+m, p1);
				if ( p2.length )
					mem.save(page+m, p2);
				
				callback( m ? p1 : p2, page );
			}, 
			function(e) { 
				unLog('Failed. ' + e); 
			}
		);
	}
	
	this.getPage = function (page, slideTarget) {
		//console.log('request to load page ', page);
		mem.status();
		var data = mem.get(page);
		if ( data ) { // is already in memory
			// prefetch next page results based on user move
			var direction = (page - 1) == props.activePage;
			var predictedPage = direction ? page+1 : page-1;
			//console.log('I might go to page ' + predictedPage);
			if (predictedPage > 0 && predictedPage <= props.totalPages) { // forward 
				//console.log('My direction is forward');
				
				setTimeout( function () { 
					if ( !mem.get(predictedPage) ) { // check that it's not already in memory 
						//console.log('in 0.5 sec prefetch page: ' + page);
						prefetchingPageNum = predictedPage;
						//console.log('in prefetch, prefetchingPageNum: ' + prefetchingPageNum); 

						fetchItemsPage(predictedPage, function(data, page) {
							//console.log('prefetched page: ' + prefetchingPageNum);
							prefetchingPageNum = null;
						});
					}
				}, 500);
				
			}

			this.injectItems( data, page );
			slideToNextPrevPage(slideTarget);
		}
		else { // fetch it with the AWS
			updatingPage = true; 
			pageStatusContainer.addClass('loading'); 

			//console.log('page ' + page + 'not in memory'); 
			//console.log('prefetchingPageNum: ' + prefetchingPageNum); 

			if ( prefetchingPageNum != page ) { // check that the prefetch program is not saving this page in the memory
				fetchItemsPage(page, function (data, page) { 
					//console.log('fetch page: ' + page);
					parent.injectItems(data, page);
					pageStatusContainer.removeClass('loading'); 
					slideToNextPrevPage(slideTarget);
				});
			} 
			else { // if in memory get data from there
				//console.log('wait page is in memory');
				prefetchingPageNum = null;
				var checkInMemory = setInterval( function () {
					// interrogate memory
					var newPageData = mem.get(page);
					if ( newPageData ) { 
						clearTimeout(intervalTimeout);
						clearInterval(checkInMemory);
						parent.injectItems(newPageData, page);
						pageStatusContainer.removeClass('loading'); 
						slideToNextPrevPage(slideTarget);
					}
				}, 100);
				var intervalTimeout = setTimeout( function () {
					clearInterval(checkInMemory);
				}, 10000);
			}
		}
	}
	this.loadNextPage = function () {
		//console.log('active page: ' + props.activePage);
		if ( props.activePage < props.totalPages ) {
			this.getPage(props.activePage+1, 'next');
		} else {
			//console.log('top limit reached');
			return false;
		}
	}
	this.loadPrevPage = function () {
		if ( props.activePage > 1 )
			this.getPage(props.activePage-1, 'prev');
		else { 
			//console.log('bottom limit reached');
			return false;
		}
	}

	this.injectItems = function (data, page) { 
		var itemsHtml = '', uCa = '';
		for ( var i=0; i < data.length; ++i, uCa = '') { 
			//console.log( plpTemplate( $.extend(data[i], {className: 'uPlpItem', compareActive: uCa}) ) ) ;
			if ( ! data[i].id ) // some items do not have compare, hide the icon for those with CSS rule: .uPlpItemCompareItem[data-sku="none"]
				data[i].id = 'none';
			if( uPlp.getItemsToCompare().indexOf(data[i].id) != -1){
				if(uPlp.getItemsToCompare().length > 1)
					$('.uBtnOpenCompare').addClass('uBtnRed').removeClass('disabled');
				$('.uPlpCompareNitems').text(uPlp.getItemsToCompare().length);
				uCa = 'uBtnRed';
			}
			itemsHtml += plpTemplate( $.extend(data[i], {className: 'uPlpItem', compareActive: uCa, compareTxt: u_i18n.Compare[ctk.app.lang]}) );
			//itemsHtml += '<div class="uPlpItem"><a href="' + data[i].url + '"><img src="' + data[i].image + '" />';
			//itemsHtml += '<h3>' + data[i].name + '</h3></a></div>';
		} 
		//console.log(itemsHtml);
		var injectIntoBox = ( props.activePage > page ) ? 'prev' : 'next';
		injectIntoBox = ( props.activePage == page ) ? 'active' : injectIntoBox;
		var destination = $('#uPlpItemsOuter').find('.' + injectIntoBox);
		destination.html(itemsHtml + '<div class="clearB"></div>');

		props.activePage = page;

		//console.log('set active page to: ' + page);
		//console.log('active page: ' + props.activePage);
		//console.log('Inject items: ', data); 
		updateActivePageTxt();
		xhrDA.bindContent({'target':destination});
		$('.uBtnCompare').click(function(){
			var uThisSku = $(this).parent().attr('data-sku');
			var uTotC = uPlp.getItemsToCompare().length;

			if($(this).hasClass('uBtnRed')){
				$(this).removeClass('uBtnRed');
				uPlp.removeItemToCompare(uThisSku);
				if(uPlp.getItemsToCompare().length <= 1){
					$('.uBtnOpenCompare').removeClass('uBtnRed').addClass('disabled');
				}
			}
			else if( uTotC < 4){
				$(this).addClass('uBtnRed');
				uPlp.addItemToCompare(uThisSku);
				if(uPlp.getItemsToCompare().length > 1)
					$('.uBtnOpenCompare').addClass('uBtnRed').removeClass('disabled');
			}
			else if( uPlp.getItemsToCompare().indexOf(uThisSku) == -1 ){
				$('#uNoMoreItem, .opacity_bg').show();
			}
			$('.uPlpCompareNitems').text(uPlp.getItemsToCompare().length);
		});
		destination.find('.uPlpItemName').ellipsis();
		destination.find('.uPlpItemFeatures li').ellipsis()
		//render_i18n_keys(destination);
	}
	
	var plpTemplate = tmpl(
		'<div class="<%=className%>">' +
			'<div class="<%=className%>LxCol">' +
				'<a href="/mt/http://' + ctk.siteDomain + '<%=url%>"><img src="<%=image%>" class="<%=className%>Img" /></a>' + 
				'<div class="<%=className%>Rate"><img src="<%=rateImage%>" /></div>' + 
				'<div class="<%=className%>CompareItem" data-sku="<%=id%>"><button class="uBtn uBtnCompare <%=compareActive%>" type="button"><%=compareTxt%></div>' + 
			'</div>' +
			'<div class="<%=className%>RxCol">' +
				'<a href="/mt/http://' + ctk.siteDomain + '<%=url%>">' + 
					'<div class="<%=className%>Name"><%=name%></div>' + 
					'<%=detailsHtml%>' + 
				'</a>' + 
			'</div>' + 
		'</div>'
	);

	function slideToNextPrevPage(action) {
		if (action == 'active') { 
			updatingPage = false;
			return false;
		} 

		var direction = (action == 'prev') ? 1 : -1, 
			inactiveSlide = ( action == 'prev' ) ? 'next' : 'prev';

		$('.slide.' + action).animate({ top : 0}, 600, function() { 
			$(this).attr('class', 'slide active').attr('style', '');
			//console.log('slide ' + action + ' end'); 
			updatingPage = false;
		}); 
		$('.slide.active').animate({ top : (direction * 500)}, 600, function() { 
			$('.slide.' + inactiveSlide).attr('class', 'slide ' + action);
			$(this).attr('class', 'slide ' + inactiveSlide).attr('style', '');
			//console.log('slide active end');
			updatingPage = false;
		}); 
	}

	this.initFilters = function() { 
		var cntr = $('#uNarrowByMenus'), 
			filters = cntr.children('.uPlpFilterBtn').not('#uPlpViewMoreFilters');
		//console.log('there are ' + filters.length + ' filters');
		

		if ( filters.length > 5 ) {
			var moreFiltersContainer = $('#uPlpMoreFiltersContainer'), 
				extraFilters = filters.filter(':gt(3)');
			extraFilters.hide();
			extraFilters.each( function () { 
				var t = $(this); 
				var id = t.attr('id') + '_options'; 
				var filter = $('#' + id);
				var filterHtml = '<div id="' + id + '_moreOptions" class="uPlpMoreFilterContainer">';
				filterHtml += '<div class="uPlpMoreFilterContainerName">' + filter.find('.uPlpFilterOptionsTitleName').html() + '</div>'; 
				filterHtml += '<div class="uPlpMoreFilterPrev disabled" id="un_scroller_up"></div><div class="uPlpMoreFilterOptions"><div class="uPlpMoreFilterOptionsInner"></div></div><div class="uPlpMoreFilterNext disabled" id="un_scroller_down"></div>';
				filterHtml += '<div class="clearB"></div></div>'; 
				filterHtml = $(filterHtml); 
				var filterOptions = filter.find('.uPlpFilterOption');
				filterHtml.find('.uPlpMoreFilterOptionsInner').append( filterOptions ).css('width', (filterOptions.length * 272) + 'px' );
				moreFiltersContainer.append(filterHtml);
				var target = $('#' + id + '_moreOptions');
				new VScroll(target.find('.uPlpMoreFilterOptions')[0], 272, target, 'horz');
			}); 

			$('#uPlpViewMoreFilters').click( function() { 
				moreFiltersContainer.notum({'modalBg_class':'uPlpFilterNotumBg'});
			}).show();
		} 
		else { 

		}
		cntr.find('> .uPlpFilterBtn').click( function () { 
			var t = $(this), 
				id =  t[0].id;
			/*console.log('open filter options for ' + id);*/ 
			$('#' + id + '_options').notum({'modalBg_class':'uPlpFilterNotumBg'});
			KOtrackPLPnarrowBy(this);
		}); 
	}
	this.getItemsToCompare = function() { 
		return itemsToCompare;
	}
	this.addItemToCompare = function(el) { 
		itemsToCompare.push(el);
	}
	this.removeItemToCompare = function(el) { 
		itemsToCompare.splice(itemsToCompare.indexOf(el), 1);
	}
	this.removeAllItemToCompare = function() { 
		itemsToCompare = [];
	}
	this.toggleItemToCompare = function(el) { 
		console.log('toggleItemToCompare');
	}
};

var uPlp = new uPlpController();
uPlp.initialize({pagesMemoryLimit: 6}); 

function initHelpMeChoose() { 
	var b = $("#frmHelpMeChoose");
	if(!$('#helpChooseStep2').length) KOtrackHMC();
	$('#help_b').removeClass('disabled');
	help_src = 'me_choose1';
	$('.uHelpMeButton').bind('click', function(){
		$('label[data-act='+$(this).data('act')+']').removeClass('active');
		$(this).addClass('active');
	});
	if (b.length) {
		var d = b.find("#btnHelpMeChooseSubmit"),
			e = b.find("#btnHelpMeChooseCancel"),
			f = b.find("#helpChooseStep1"),
			g = f.find('input[type="radio"]');

		d.addClass('uBtn uBtnRed uFloatR disabled uTxtXL').attr('disabled', 'disabled').css({'padding':'20px 40px', 'text-transform':'capitalize', 'width':'220px'});

		f.find('div.additional input[type="radio"]');
		var h = b.find("#helpChooseStep2"),
			i = h.find('input[type="checkbox"]'),
			j = h.find('input[type="radio"]');
		if(i.length){
			help_src = 'me_choose3';
		}
		e.bind("click", function (b) {
			b.preventDefault();
			// a.modal.close() TODO
		});
		g.bind("click", function () {
			var b = $(this),
				c = $("#" + b.attr("data-additionalfields")),
				e = !1;
			b.parent().parent().find("> div.additional").hide().find('input[type="radio"]').attr("checked", !1);
			b.parent().parent().find("> div.additional").hide().find('label').removeClass('active');
			c.length && c.show();
			g.filter(":checked").length && (e = !0, f.find("div.additional:visible").each(function () {
				$(this).find('input[type="radio"]:checked').length || (e = !1)
			}));
			e ? d.removeClass("disabled").addClass("enabled").removeAttr('disabled') : d.removeClass("enabled").addClass("disabled").attr('disabled', 'disabled');
			if($("#additionalWinterStuds").is(":visible")){
				$("#studsDisclaimer").show();
				help_src = 'me_choose2';
				 KOlinkCodeEvents('', 'Kiosk_Hel_Me_Choose', 'event42');
			}
			else{
				$("#studsDisclaimer").hide();
				help_src = 'me_choose1';
			}
		});

		i.bind("click", function () {
			var b = $(this);
			b.attr("checked") ? (i.filter('[data-group="' + b.attr("data-group") + '"]').not(b).attr({
				checked: !1,
				disabled: !0
			}).next('label').addClass('disabled') , i.filter('[data-subgroup="' + b.attr("data-subgroup") + '"]:checked').not(b).each(function () {
				var b = $(this);
				b.next('label').removeClass('active');
				i.filter('[data-group="' + b.attr("data-group") + '"]').attr({
					checked: !1,
					disabled: !1
				}).next('label').removeClass('disabled')
			})) : i.filter('[data-group="' + b.attr("data-group") + '"]').not(b).attr("disabled", !1).next('label').removeClass('disabled');

			i.filter(":checked").length == 3 ? d.removeClass("disabled").addClass("enabled").removeAttr('disabled') : d.removeClass("enabled").addClass("disabled").attr('disabled');
		}).bind('change', function(){
			var b = $(this);
			if(b.is(':checked')){
				b.next('label').addClass('active').removeClass('disabled');
			}else{
				b.next('label').removeClass('active');
			}
		});
		j.bind("click", function () {
			j.filter(":checked").length ? d.removeClass("disabled").addClass("enabled").removeAttr('disabled') : d.removeClass("enabled").addClass("disabled").attr('disabled', 'disabled')
		});
		
		d.click( function(event) { 
			if ( ! $(this).hasClass('disabled') ) { 
				console.log('submit valid');
				var helpTypeSeason;
				if($('#radTruckWinterNo').length ){
					helpTypeSeason = $('#radTruckWinterUseAllSeasons:checked').length ? 'All-Season' : $('#radTruckWinterNo:checked').length ? 'Summer' : 'Dedicated Winter';
				}
				else{
					helpTypeSeason = $('#radTireTypeAllSeason:checked').length ? 'All-Season' : $('#radTireTypeSummer:checked').length ? 'Summer' : 'Dedicated Winter';
				}
				KOload(KOmap.helpme + helpType + ': ' + helpTypeSeason + ' Tires');
			} 
			else { 
				console.log('submit not valid ' + $(this).hasClass('disabled'));
				event.preventDefault();
				event.stopPropagation();
				return false;
			}
		});
		//c.renderButtons();
		//c.setupTooltips()
	}

}

function goToHelpMeChoosePage() { 
	$("#uPlpHelpMeChoose").bind("click", function (ev) {
		xhrDA.sendForm($('#uPlpHelpMeChooseSubmit')[0]);
	})
}

