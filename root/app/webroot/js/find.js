var selectedType = 'tires-vehicle'; // 'tires-vehicle', 'tires-size', 'wheels'
var selectedYear;
var selectedMake;
var selectedModel;
var selectedBody;
var selectedOption;

$(function() {
    $(window).resize(resizeFindPages);
    
    $(".uPrev").click(scrollUpFind);
    $(".uNext").click(scrollDownFind);
    
    $('#uNextStep').click(function(){
        if(!( $(this).hasClass('disabled'))){
            var sel = $(".un-search-btn.un-search-btn_grayL.selected");
            var next = sel.next();
            if (next.length) {
                sel.removeClass("selected").addClass("complete");
                next.addClass("selected");
                
                if (!next.find(".uSelectedVal").html().length) {
                    $(this).addClass('disabled');
                }
                
                var ko = next.find('div .kk').attr('data-ko');
                xhrDA.setLocationHashParam('currentPage', 'find-' + ko);
                xhrDA.loadPage(xhrDA.locationHashValues);
            } else {
                // TODO: add in type of search
                var params = {
                  'type' : selectedType,
                  'year' : selectedYear,
                  'make' : selectedMake,
                  'model' : selectedModel,
                  'body' : selectedBody,
                  'option' : selectedOption
                };
                
                var querystring = $.param(params);
                var url = window.resultsRoute + '?' + querystring;
                window.location = url;
            }
        }
    });
    
    loadYears();
});

function loadYears() {
    loadButtons(
        $("#year-container"),
        "/data/getYears",
        {},
        function (yearObj) {
            // selected year
            if (selectedYear != yearObj.Value) {
                selectedYear = yearObj.Value;
                $("#year-selected-value").html(selectedYear);
                $("#make-selected-value").html("");
                selectedMake = null;
                $("#model-selected-value").html("");
                selectedModel = null;
                $("#body-selected-value").html("");
                selectedBody = null;
                $("#option-selected-value").html("");
                selectedOption = null;
                
                loadMakes();
            }
        });
}

function loadMakes() {
    loadButtons(
        $("#make-container"),
        "/data/getMakes",
        { year: selectedYear },
        function (makeObj) {
            // selectedMake
            selectedMake = makeObj.Value;
            $("#make-selected-value").html(selectedMake);
            $("#model-selected-value").html("");
            selectedModel = null;
            $("#body-selected-value").html("");
            selectedBody = null;
            $("#option-selected-value").html("");
            selectedOption = null;
            
            loadModels();
        });
}

function loadModels() {
loadButtons(
    $("#model-container"),
    "/data/getModels",
    {
        year: selectedYear,
        make: selectedMake,
    },
    function (modelObj) {
        // selected model
        selectedModel = modelObj.Value;
        $("#model-selected-value").html(selectedModel);
            $("#body-selected-value").html("");
            selectedBody = null;
            $("#option-selected-value").html("");
            selectedOption = null;
        
        loadBodies();
    });
}

function loadBodies() {
    loadButtons(
        $("#body-container"),
        "/data/getBodies",
        {
            year: selectedYear,
            make: selectedMake,
            model: selectedModel
        },
        function (bodyObj) {
            // selected body
            selectedBody = bodyObj.Value;
            $("#body-selected-value").html(selectedBody);
            $("#option-selected-value").html("");
            selectedOption = null;
            
            loadOptions();
        });
}

function loadOptions() {
    loadButtons(
        $("#option-container"),
        "/data/getOptions",
        {
            year: selectedYear,
            make: selectedMake,
            model: selectedModel,
            body: selectedBody
        },
        function (optionObj) {
            // selected option
            selectedOption = optionObj.Value;
            $("#option-selected-value").html(selectedOption);
        });
}

function loadButtons(container, url, args, onClick) {
    $.ajax({
        url: url,
        type: "GET",
        data: args
    }).done(function (json) {
        container.html("");
        var obj = JSON.parse(json);
    
        $.each(obj, function(index, value) {
            var div = $("<div />");
            div.addClass("un-search-btn_grayH");
            div.html(value.Value);
            div.attr("title", value.Value);
            
            if (value.Selected == 'True') {
                div.addClass("selected");
            }
            
            div.click(function() {
                $("#uNextStep").removeClass("disabled");
                container.find(".un-search-btn_grayH.selected").removeClass("selected");
                $(this).addClass("selected");
                onClick(value);
            });
            
            container.append(div);
        });
        
        resizeStuff(container, ".un-search-btn_grayH");
    });
}

function scrollDownFind() {
    var div = $(this).parent().prev();
    var curr = div.scrollTop();
    div.animate({ scrollTop: curr + 110 }, 100);
}

function scrollUpFind() {
    var div = $(this).parent().prev();
    var curr = div.scrollTop();
    div.animate({ scrollTop: curr - 110 }, 100);
}

function clearFindPages() {
    $(".find-page .selected").removeClass("selected");
    $(".uSelectedVal").html("");
    $("#uNextStep").addClass("disabled");
    selectedYear = null;
    selectedMake = null;
    selectedModel = null;
    selectedBody = null;
    selectedOption = null;
}

function resizeStuff(container, stuff) {
    var totalWidth = container.width();
    var count = Math.floor(totalWidth / 275);
    var w = Math.floor(totalWidth / count) - 25;
    
    container.find(stuff).css('width', w);
}

function resizeFindPages() {
    var totalHeight = $(window).height();
    var footerHeight = $("#appFooter").height() + $("findFooter").height();
    var headerHeight = $(".header").height();
    var margin = 260;
    var h = totalHeight - (footerHeight + headerHeight + margin);
    
    $(".find-page").height(h);
    
    var totalWidth = $("#content").width();
    var w = totalWidth - 110;
    
    $(".find-page").width(w);
    
    resizeStuff($("#year-container"), ".un-search-btn_grayH");
    resizeStuff($("#make-container"), ".un-search-btn_grayH");
    resizeStuff($("#model-container"), ".un-search-btn_grayH");
    resizeStuff($("#body-container"), ".un-search-btn_grayH");
    resizeStuff($("#option-container"), ".un-search-btn_grayH");
}