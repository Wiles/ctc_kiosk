var selectedType = 'tires-vehicle'; // 'tires-vehicle', 'tires-size', 'wheels'

var selectedYear;
var selectedMake;
var selectedModel;
var selectedBody;
var selectedOption;

var selectedWidth;
var selectedRatio;
var selectedDiameter;
var selectedIndex;
var selectedRating;

var selectedSize;

$(function() {
    $(window).resize(resizeFindPages);
    
    $(".uPrev").click(scrollUpFind);
    $(".uNext").click(scrollDownFind);
    
    $('#uNextStep').click(function(){
        if(!( $(this).hasClass('disabled'))){
        
            if ($("#page-tire-sizes").is(":visible")) {
                /* submit using 
                    var selectedYear;
                    var selectedMake;
                    var selectedModel;
                    var selectedBody;
                    var selectedOption;
                and
                    var selectedSize;
                    
                some how... i dont really know....
                */
            } else {
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
                    if (selectedType == 'wheels' || selectedType == 'tires-vehicle') {
                        var params = {
                            'selVehicleBody' : selectedBody,
                            'selVehicleMake' : selectedMake,
                            'selVehicleModel' : selectedModel,
                            'selVehicleOption' : selectedOption,
                            'selVehicleYear' : selectedYear
                        };
                        
                        $.ajax({
                            url: '/data/getWheelSizes',
                            type: "GET",
                            data: params
                        }).done(function (json) {
                            $('#uNextStep').addClass('disabled');
                            $("#tire-sizes-standard").html("");
                            $("#tire-sizes-optional").html("");
                            
                            ct.changePage('page-tire-sizes');
                            $("#vehicleInfo").html(selectedYear + ' ' + selectedMake + ' ' + selectedModel + ' ' + selectedBody + ' ' + selectedOption);
                            
                            var obj = JSON.parse(json);
                        
                            $.each(obj, function(index, value) {
                                var div = $("<div />");
                                var txt = value.replace("#REGULAR#", " ").replace("#PLUS#", " ").replace("#MINUS#", " ").replace("Both", "");
                                div.addClass("un-search-btn_grayH");
                                div.html(txt);
                                div.attr("title", txt);
                                div.attr("data-value", value);
                                div.click(function() {
                                    $("#tires-content").find(".un-search-btn_grayH.selected").removeClass("selected");
                                    $(this).addClass("selected");
                                    
                                    $('#uNextStep').removeClass('disabled');
                                    selectedSize = $(this).attr("data-value");
                                });
                                
                                if (value.indexOf("#REGULAR") !== -1) {
                                    $("#tire-sizes-standard").append(div);
                                } else {
                                    $("#tire-sizes-optional").append(div);
                                }
                            });
                            
                            resizeStuff($("#tire-sizes-standard"), ".un-search-btn_grayH");
                            resizeStuff($("#tire-sizes-optional"), ".un-search-btn_grayH");
                        });
                    } else {
                        /* submit by tire size using
                            var selectedWidth;
                            var selectedRatio;
                            var selectedDiameter;
                            var selectedIndex;
                            var selectedRating;
                        */
                    }
                }
            }
        }
    });
    
    $("#tires-standard").click(function () {
        $(this).addClass("selected");
        $("#tires-optional").removeClass("selected");
        $("#tire-sizes-standard").show();
        $("#tire-sizes-optional").hide();
    });
    
    $("#tires-optional").click(function () {
        $(this).addClass("selected");
        $("#tires-standard").removeClass("selected");
        $("#tire-sizes-optional").show();
        $("#tire-sizes-standard").hide();
    });
    
    loadYears();
    loadWidths();
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
                $("#year-selected-value").html(yearObj.Text);
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
            $("#make-selected-value").html(makeObj.Text);
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
        $("#model-selected-value").html(modelObj.Text);
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
            $("#body-selected-value").html(bodyObj.Text);
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
            $("#option-selected-value").html(optionObj.Text);
        });
}

function loadWidths() {
    loadButtons(
        $("#width-container"),
        "/data/getTireData",
        { attributeType : "sw" },
        function (widthObj) {
            // selected width
            selectedWidth = widthObj.Value;
            $("#width-selected-value").html(widthObj.Text);
            
            loadRatios();
        });
}

function loadRatios() {
    loadButtons(
        $("#ratio-container"),
        "/data/getTireData",
        { attributeType : "ar" },
        function (ratioObj) {
            // selected ratio
            selectedRatio = ratioObj.Value;
            $("#ratio-selected-value").html(ratioObj.Text);
            
            loadDiameters();
        });
}

function loadDiameters() {
    loadButtons(
        $("#diameter-container"),
        "/data/getTireData",
        { attributeType : "rd" },
        function (diameterObj) {
            // selected diameter
            selectedDiameter = diameterObj.Value;
            $("#diameter-selected-value").html(diameterObj.Text);
            
            loadIndexes();
        });
}

function loadIndexes() {
    loadButtons(
        $("#index-container"),
        "/data/getTireData",
        { attributeType : "li" },
        function (indexObj) {
            // selected index
            selectedIndex = indexObj.Value;
            $("#index-selected-value").html(indexObj.Text);
            
            loadRatings();
        });
}

function loadRatings() {
    loadButtons(
        $("#rating-container"),
        "/data/getTireData",
        { attributeType : "sr" },
        function (ratingObj) {
            // selected rating
            selectedIndex = ratingObj.Value;
            $("#rating-selected-value").html(ratingObj.Text);
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
            div.html(value.Text);
            div.attr("title", value.Text);
            
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
    $("#tires-content").height(h - 30);
    
    var totalWidth = $("#content").width();
    var w = totalWidth - 110;
    
    $(".find-page").width(w);
    
    resizeStuff($("#year-container"), ".un-search-btn_grayH");
    resizeStuff($("#make-container"), ".un-search-btn_grayH");
    resizeStuff($("#model-container"), ".un-search-btn_grayH");
    resizeStuff($("#body-container"), ".un-search-btn_grayH");
    resizeStuff($("#option-container"), ".un-search-btn_grayH");
    
    resizeStuff($("#width-container"), ".un-search-btn_grayH");
    resizeStuff($("#ratio-container"), ".un-search-btn_grayH");
    resizeStuff($("#diameter-container"), ".un-search-btn_grayH");
    resizeStuff($("#index-container"), ".un-search-btn_grayH");
    resizeStuff($("#rating-container"), ".un-search-btn_grayH");
    
    resizeStuff($("#tire-sizes-standard"), ".un-search-btn_grayH");
    resizeStuff($("#tire-sizes-optional"), ".un-search-btn_grayH");
}