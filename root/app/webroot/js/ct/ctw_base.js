var CTW = {
    isVehicleSelected: function () {
        return !1
    },
    checkVehicleSelectorSize: function () {
        var a = $("#selector"),
            c = a.width(),
            b = a.find("ul.tabNav").width(),
            c = c - b - 10,
            a = a.find("a.toggle:visible");
        a.length && (a.css({
            width: "",
            "white-space": ""
        }), a.width() > c ? a.css({
            "margin-top": 0,
            width: c,
            "white-space": "normal"
        }) : a.css({
            "margin-top": "",
            width: "",
            "white-space": ""
        }));
        $("#selector").find("#byVehicleMyVehicle, #savedVehicleSearch, #bySizeMySize").each(function () {
            var a = $(this),
                b = a.find("h5"),
                c = a.find("#selSavedVehicles"),
                d = a.find('button[type="submit"]'),
                h = a.width(),
                s = !$("#content").length;
            c.length ? (a = h - a.find("label").outerWidth(!0) - d.outerWidth() - parseInt(c.css("margin-right")), a -= s ? 15 : 20, c.width() > a && c.width(a)) : (a = h - d.outerWidth() - parseInt(a.find("div.buttons").css("padding-right")) - 14, b.width() > a && b.width(a))
        })
    },
    renderButtons: function () {
        $(".buttonPrimary, .buttonSecondary, .buttonAlternate, .buttonDisabled").not(".rendered, .buttonNoIcon").each(function () {
            $("<span></span>").appendTo($(this).addClass("rendered"))
        })
    },
    setupLeftNav: function () {
        $("#selections span.remove").each(function () {
            var a = $(this).parent();
            a.html(a.html().replace(/\s([^\s]+\s?)[ |\t|\n|\r]*<span\s/i, ' <span style="white-space: nowrap;">$1<span '))
        })
    },
    selectDropDownIEbehavior: function () {
        if ($.browser.msie && $.browser.version <= 7) {
            var a, c, b = function () {
                var a = $(this),
                    b = a.parent();
                if (a.val() == "") return !1;
                a.val() == "" && a.hasClass("open") && (a.removeClass("open").width(c), b.is("shim") && a.unwrap(), a.parent().find("shim").remove())
            };
            $("select").bind({
                mousedown: function () {
                    var b = $(this);
                    c = b.width();
                    if (b.val() == "") return !1;
                    c == "auto" || b.is(".open") || (a = $("<shim />").css({
                        display: "inline-block",
                        width: b.outerWidth(!0),
                        height: b.outerHeight(!0),
                        "float": b.css("float"),
                        overflow: "hidden"
                    }), b.wrap(a).addClass("open").width("auto"), b.width() <= c && (b.width(c).unwrap(), a.remove(), a = void 0))
                },
                blur: b,
                change: b
            })
        }
    }
};
(function (a, c, b, f, g) {
    $('#uNextStep').on('click', function(){
        if(!( $(this).hasClass('disabled'))){
            
            v48.populate();
            
            if($('.searchContDiv.d_yes').next().hasClass('searchContDiv')){
                unLoadSelect($('.searchContDiv.d_yes').next().find('div[un-select]').attr('un-select'), true);
                var selVal = $('#searchTopBar .un-search-btn_grayL.selected').find('.uSelectedVal');
                selVal.html($('.searchContDiv.d_yes').find('.un-search-btn_grayH.selected').text());
                selVal.ellipsis(); // CTK-96
                $('#searchTopBar .un-search-btn_grayL.selected').removeClass('selected').addClass('complete').next().addClass('selected');
                $('.searchContDiv.d_yes').removeClass('d_yes').addClass('d_none').next().addClass('d_yes').removeClass('d_none');
                $(this).addClass('disabled');
                
            }
            if(!($('.searchContDiv.d_yes').next().hasClass('searchContDiv'))){
                $('#uSubmitSearch, #uSubmitSearchDisc').show();
                $(this).hide();
            }
            
            KOtrackSearch(isVar48);
        }
    });
    $('#uSubmitSearch').on('click', function(){
        if(!( $(this).hasClass('disabled'))){
            isVar48 = true;
            v48.populate();
            
            var action = $("#bySizeSearch").attr('action');
            var sectionWidth = $("#selSectionWidth").find(":selected").val();
            var aspectRatio = $("#selAspectRatio").find(":selected").val();
            var diameter = $("#selDiameter").find(":selected").val();
            var loadindex = $("#selLoadRating").find(":selected").val();
            var speedrating = $("#selSpeedRating").find(":selected").val();
            var vehicleName = sectionWidth +"_"+ aspectRatio + "_" + diameter;
            vehicleName = encodeURIComponent(vehicleName);
            action = action + "?SecRatioDia=" + vehicleName + "&load=" + loadindex + "&speed=" + speedrating + "&sizeSelection=true&tab=1";
            action = encodeURI(action);     
            $("#bySizeSearch").attr('action',action);

            xhrDA.sendForm( $('#vehicleSearch_submit')[0] );
        }
        //$('#vehicleSearch').submit();
    });
    $('#uSubmitSearchDisc').on('click', function(){
        if(!( $(this).hasClass('disabled'))){
            
            v48.populate();
            
            var uDontKow =  $('#selLoadRating option:selected').not(':disabled').val() == '' ||  $('#selSpeedRating option:selected').not(':disabled').val() == '';
            if(uDontKow){
                $('#uSearchDisclaimer, .opacity_bg').show();
            }
            else{
                $('#uSubmitOptionSearch').click();
            }
        }
    });
    $('#uSubmitOptionSearch').on('click', function(){
        if(!$(this).hasClass('disabled')){
            isVar48 = true;
            v48.populate();
            
            $('#uSearchDisclaimer, .opacity_bg').hide();
            if($('#vehicleSearch_submit').length > 0){
                var action = $("#bySizeSearch").attr('action');
                var sectionWidth = $("#selSectionWidth").find(":selected").val();
                var aspectRatio = $("#selAspectRatio").find(":selected").val();
                var diameter = $("#selDiameter").find(":selected").val();
                var loadindex = $("#selLoadRating").find(":selected").val();
                var speedrating = $("#selSpeedRating").find(":selected").val();
                var vehicleName = sectionWidth +"_"+ aspectRatio + "_" + diameter;
                vehicleName = encodeURIComponent(vehicleName);
                action = action + "?SecRatioDia=" + vehicleName + "&load=" + loadindex + "&speed=" + speedrating + "&sizeSelection=true&tab=1";
                action = encodeURI(action);     
                $("#bySizeSearch").attr('action',action);

                xhrDA.sendForm( $('#vehicleSearch_submit')[0] );
            }
            else
                xhrDA.sendForm( $('#submitButton')[0] );
        }
    });
    $('#uDismissSearch').on('click', function(){
        $('#uSearchDisclaimer, .opacity_bg').hide();
    });
    $('#uNextStepDis').on('click', function(){
        if(!$(this).hasClass('disabled')){
            $('#uSearchDisclaimer, .opacity_bg').show();
            $('#uSubmitOptionSearch').removeClass('disabled');
        }
    })
    $('.un-search-btn_grayH').on('click', function(){
        if($(this).parents('#searchCont').hasClass('options')){
            $('input[data-val="'+$(this).attr('un-radio')+'"]').click();
            $('.un-search-btn_grayH').removeClass('selected');
            $('#uSubmitOptionSearch').removeClass('disabled');
        }else{
            unSetSelect($(this).attr('u-ix'), $(this).parents('div[un-select]').attr('un-select'));
            $(this).parents('div[un-select]').find('.un-search-btn_grayH').removeClass('selected');
        }
        if($('#uSubmitSearch').is(':visible') | $('#uSubmitSearchDisc').is(':visible')){
            $('#uSubmitSearch, #uSubmitSearchDisc').removeClass('disabled');
        }
        $('#uNextStep').removeClass('disabled');
        $(this).addClass('selected');
     });
    $('.un-search-btn_grayL').on('click', function(){
        var a = $(this);
        if(a.hasClass('complete')){
            $('#searchTopBar .un-search-btn_grayL').removeClass('selected');
            a.addClass('selected').removeClass('complete').nextAll().removeClass('complete');
            a.find('.uSelectedVal').html('');
            a.nextAll().find('.uSelectedVal').html('');
            $('.searchContDiv.d_yes').removeClass('d_yes').addClass('d_none');
            $('.searchContDiv').eq(a.index()).addClass('d_yes').removeClass('d_none').nextAll().find('div[un-select]').html('');
            $('#uNextStep').show().removeClass('disabled');
            $('#uSubmitSearch, #uSubmitSearchDisc').hide().addClass('disabled');
        }else if(a.hasClass('options')){
            $('#searchTopBar .un-search-btn_grayL').removeClass('selected');
            a.addClass('selected').removeClass('complete').nextAll().removeClass('complete');
            $('.searchContDiv.d_yes').removeClass('d_yes').addClass('d_none');
            $('.searchContDiv').eq(a.index()).addClass('d_yes').removeClass('d_none').nextAll().find('div[un-select]').html('');
        }
    });

     a(function () {
        var d = a("#selector");
        if (d.length) {
            e = a("#content").length ? !1 : !0;
            unLog('yes');
            d.find("form").bind("submit", function (b) {
                var d = a(this);
                a.ajax({
                    url: d.attr("action"),
                    data: d.serialize(),
                    success: function (b) {
                    },
                    error: function () {
                    }
                });
            });
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
            d.find("select").bind("change", function () {
                var b = a(this),
                    c = b.attr("id"),
                    d = b.parents("form");
                if (g[c]) {
                    var e = "https://ctcjs.carpronetwork.com/tools.asmx/" + g[c].apiURL + "&Username=%22ctc%22&Password=%22w3bs3rvic3s%22&format=json";
                    a.each(g, function () {
                        e.indexOf("#" + this.selectID + "#") > -1 && (e = e.replace("#" + this.selectID + "#", escape(a("#" + this.selectID).val())))
                    });
                    a.ajax({
                        url: e,
                        method: "get",
                        dataType: "jsonp",
                        success: function (e) {
                            var f = a("#" + g[c].nextSelect),
                                h = d.find("select:gt(" + d.find("select").index(b) + ")");
                            h.length && (h.each(function () {
                                var b = a(this).val("");
                                b.find("option:not(:eq(0))").remove();
                                b.find("option:eq(0)").text("")
                            }), d.find(".buttonAlternate").addClass("buttonDisabled").removeClass("buttonAlternate"));
                            f.find("option:first-child").text(f.attr("data-defaulttext"));
                            for (var h = 0, i = e.d.length; h < i; h++) a('<option value="' + e.d[h].Attribute.replace('"', "&quot;") + '">' + e.d[h].Attribute + "</option>").appendTo(f)
                        }
                    })
                }
            });
            var j = d.find("#searchByVehicle"),
                i = d.find("#searchByType"),
                l, k = f.location.href.split("tab=");
            k[1] && (l = parseInt(k[1].split("&")[0]));
            k || (l = 0);
            d.hasClass("tabContainer") && d.tabs({
                afterSwitch: function () {
                    j.hasClass("selected") ? (d.find("a.vehicleToggle").show(), d.find("a.sizeToggle").hide()) : (d.find("a.sizeToggle").show(), d.find("a.vehicleToggle").hide());
                    c.checkVehicleSelectorSize()
                },
                startAt: l
            });
            j.find("select").on("change", function () {
                var b = a(this).parents("form"),
                    c = !0;
                if (b.attr("id") == "vehicleSearch") {
                    var c = j.find("#selVehicleYear"),
                        d = j.find("#selVehicleMake"),
                        e = j.find("#selVehicleModel"),
                        f = j.find("#selVehicleBody"),
                        g = j.find("#selVehicleOption");
                    c.val() != "" && j.find("div.additional, div.buttons").show();
                    c = c.val() != "" && d.val() != "" && e.val() != "" && f.val() != "" && g.val() != "" ? !1 : !0
                } else b.attr("id") == "savedVehicleSearch" && (c = a("#selSavedVehicles").val() != "" ? !1 : !0);
                d = b.parents("#modalDialog").length ? "buttonPrimary" : "buttonAlternate";
                c ? b.find(".buttonAlternate").removeClass(d).addClass("buttonDisabled") : b.find(".buttonDisabled").removeClass("buttonDisabled").addClass(d)
            });
            l = function () {
                var a = i.find("#selSectionWidth"),
                    b = i.find("#selDiameter"),
                    c = i.find("#selLoadRating"),
                    d = i.find("#selAspectRatio"),
                    e = i.find("#selSpeedRating"),
                    f = i.find("#chkDisclaimer");
                a.val() != "" && i.find("div.additional, div.buttons, div.disclaimer").show();
                a.val() != "" && b.val() != "" && d.val() != "" && c.val() != "" && e.val() != "" ? i.find(".disclaimer").hide() : i.find(".disclaimer").show();
                a.val() != "" && b.val() != "" && d.val() != "" ? (c.val() == "" || e.val() == "") && f.is(":checked") || c.val() != "" && e.val() != "" ? i.find(".buttonDisabled").removeClass("buttonDisabled").addClass("buttonAlternate") : i.find(".buttonAlternate").removeClass("buttonAlternate").addClass("buttonDisabled") : i.find(".buttonAlternate").removeClass("buttonAlternate").addClass("buttonDisabled")
            };
            i.find("select").on("change", l);
            i.find("#chkDisclaimer").bind("click", l);
            var n = j.find("form"),
                o = i.find("form");
            l = function (d) {
                d.preventDefault();
                n = j.find("form");
                var e, d = a(this);
                d.hasClass("vehicleToggle") ? (e = a("#" + n.filter(".active").attr("data-nextform")), n.removeClass("active").each(function () {
                    this.reset();
                    var b = a(this);
                    b.attr("id") == "vehicleSearch" && b.find(".buttonAlternate").removeClass("buttonAlternate").addClass("buttonDisabled")
                }).hide()) : (e = a("#" + o.filter(".active").attr("data-nextform")), o.removeClass("active").each(function () {
                    this.reset();
                    var b = a(this);
                    b.attr("id") == "bySizeSearch" && b.find(".buttonAlternate").removeClass("buttonAlternate").addClass("buttonDisabled")
                }).hide());
                e.addClass("active").show();
                if (d.attr("data-omnituretag") && b.linkCode && typeof linkCode === "function") try {
                    linkCode(this, d.attr("data-omnituretag"))
                } catch (f) {}
                var g = e.attr("data-toggletext");
                e = e.attr("data-omnituretag");
                g ? (d.text(g), c.checkVehicleSelectorSize()) : d.remove();
                e ? d.attr("data-omnituretag", e) : d.attr("data-omnituretag", "")
            };
            if (n.length > 1) {
                k = a('<a href="#" class="toggle vehicleToggle">' + n.filter(".active").attr("data-toggletext") + "</a>").insertBefore(d.find(".tab").eq(0));
                k.bind("click", l);
                var p = n.filter(".active").attr("data-omnituretag");
                p && k.attr("data-omnituretag", p);
                n.filter(":visible").length || k.hide()
            }
            o.length > 1 && (k = a('<a href="#" class="toggle sizeToggle">' + o.filter(".active").attr("data-toggletext") + "</a>").insertBefore(d.find(".tab").eq(0)), k.bind("click", l), o.filter(":visible").length || k.hide());
            n.bind("reset", function () {
                var b = a(this);
                b.attr("id") != "savedVehicleSearch" && b.find("select:not(:eq(0))").each(function () {
                    var b = a(this);
                    b.find("option:not(:eq(0))").remove();
                    b.find("option:eq(0)").text("")
                })
            });
            if (e) {
                var t = function (b) {
                    b.preventDefault();
                    b = a(this).parents("form");
                    b.get(0).reset();
                    b.find("div.additional, div.buttons, div.disclaimer").hide()
                };
                d.find("form div.buttons[data-closelinktext]").each(function () {
                    var b = a(this);
                    a('<a href="#" class="close">' + b.attr("data-closelinktext") + "</a>").bind("click", t).appendTo(b)
                })
            }
            a.ajax({
                url: "https://ctcjs.carpronetwork.com/tools.asmx/getYears?Username=%22ctc%22&Password=%22w3bs3rvic3s%22&format=json&Year=0&isVehicleCrossOver=false",
                method: "get",
                dataType: "jsonp",
                cache: !0,
                jsonpCallback: "populateYearsDropdown",
                success: function (b) {
                    for (var c = a("#selVehicleYear"), d = 0, e = b.d.length; d < e; d++) a('<option value="' + b.d[d].Attribute.replace('"', "&quot;") + '">' + b.d[d].Attribute + "</option>").appendTo(c);
                    c.val("")
                }
            });
            a("#bySizeSearch").length && a("#selSectionWidth, #selDiameter, #selAspectRatio").each(function () {
                var b = a(this);
                a.ajax({
                    url: "https://ctcjs.carpronetwork.com/tools.asmx/getTireSizeAttribute?Username=%22ctc%22&Password=%22w3bs3rvic3s%22&format=json",
                    method: "get",
                    data: "AttributeType=%22" + b.attr("data-apiparam") + "%22",
                    dataType: "jsonp",
                    cache: !0,
                    success: function (c) {
                        for (var d = 0, e = c.d.length; d < e; d++) if (b.attr("id") == "selDiameter") {
                            var f = (new Number(c.d[d])).toFixed();
                            a('<option value="' + f.replace('"', "&quot;") + '">' + f + '"</option>').appendTo(b)
                        } else a('<option value="' + c.d[d].replace('"', "&quot;") + '">' + c.d[d] + "</option>").appendTo(b);
                        b.val("")
                    }
                })
            });
        }
    });
})(jQuery, CTW, this, this.document);