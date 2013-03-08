var selectedYear;
var selectedMake;
var selectedModel;
var selectedBody;
var selectedOption;

$(function() {
    $(window).resize(resizeFindButtons);
    loadYears();
});

function loadYears() {loadButtons(
    $("#year-container"),
    "/data/getYears",
    {},
    function (yearObj) {
        // selected year
        if (selectedYear != yearObj.Value) {
            selectedYear = yearObj.Value;
            $("#year-selected-value").html(selectedYear);
            $("#make-selected-value").html("");
            $("#model-selected-value").html("");
            $("#body-selected-value").html("");
            $("#otpion-selected-value").html("");
            
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

function resizeStuff(container, stuff) {
    var totalWidth = container.width();
    var count = Math.floor(totalWidth / 275);
    var w = Math.floor(totalWidth / count) - 25;
    
    container.find(stuff).css('width', w);
}

function resizeFindButtons() {
    resizeStuff($("#year-container"), ".un-search-btn_grayH");
    resizeStuff($("#make-container"), ".un-search-btn_grayH");
}