/* vKeyboard - Usablenet Inc. Stefano Bortolotti */ (function(){function s(){function o(a){m=$(a).closest("form").get(0)}function p(){for(var a=m.elements,c=g+1,b=a.length;c<b;c++)if(j(a[c],c))break;$(document).trigger("kbclick");q(a[g])}function q(a){a=$(a);if(typeof a.data("vkb-dropdown-id")==="string"){var c=a.data("vkb-dropdown-id");$("#"+c).click();setFieldIndex(a.get(0))}else a.focus()}function j(a,c){if(a.type=="text"||a.type=="password"||a.type=="textarea"||a.nodeName=="SELECT"||typeof $(a).data("vkb-dropdown-id")==="string"){_el=$(a);if(!_el.is(":hidden")&&
_el.data("vkbcontroller-exclude")!=!0)g=c;else if(typeof $(a).data("vkb-dropdown-id")==="string")g=c;else return!1;return!0}}function e(a){var c=0;if(typeof a.selectionStart=="number"||a.selectionStart=="0")c=a.selectionStart;else if(document.selection)a.focus(),c=document.selection.createRange(),c.moveStart("character",-a.value.length),c=c.text.length;return c}var m=null,g=null,h="",k=0,f=null;this.init=function(a){f=a;o(document.forms[0]);g=-1;$("input[type=text], input[type=password], textarea").bind("focus",
function(){setFieldIndex(this);h=m.elements[g];var a=$(this);a.click();a.data("vkb-type")=="number"?f.find(".vkey").not(".number").not("#delete").addClass("hideNonDigit"):a.data("vkb-type")!="number"&&(a=f.find(".hideNonDigit"),a.length&&a.removeClass("hideNonDigit"));a=window.kb_props.visibility;if(a.status!="visible")a.show(),a.status="visible"});$("select").bind("focus",function(){setFieldIndex(this);$(this).click();h=""}).each(function(){var a=$(this);if(typeof a.data("vkb-dropdown-id")==="string"){var b=
a.data("vkb-dropdown-id");$("#"+b).click(function(){setFieldIndex(a[0]);h=""})}});$("input[type=text], input[type=password], textarea").click(function(a){k=e(this);a.stopPropagation()});$("#un_vkeyboard_next").hasClass("un_clickBinded")||($("#un_vkeyboard_next").addClass("un_clickBinded"),$("#un_vkeyboard_next, #un_vkeyboard_prev").bind("click",function(a){if($(this).attr("id")=="un_vkeyboard_next")p();else{var b=m.elements;if(g==-1)p();else{for(var d=g-1;d>=0;d--)if(j(b[d],d))break;$(document).trigger("kbclick");
q(b[g])}}h!=""&&(k=e(h));a.stopPropagation()}))};this.a=function(){return h};this.j=function(){h=""};this.b=function(){return k};this.d=function(a){k=a};this.e=setFieldIndex=function(a){o(a);for(var c=m.elements,b=0,d=c.length;b<d;b++)a==c[b]&&(g=b)};this.i=o;this.g=function(){return m};this.h=function(){return g};this.c=function(a,c){if(a.setSelectionRange)a.focus(),a.setSelectionRange(c,c);else if(a.createTextRange){var b=a.createTextRange();b.collapse(!0);b.moveEnd("character",c);b.moveStart("character",
c);b.select()}}}var r=new function(o){function p(f){if(e.a()!=""){var a=$(f),c=a.text();a.find("span.on").length?c=a.find("span.on").text():f.id=="space"&&(c=" ");var f=$(e.a()),a=f.val(),b=f.attr("maxlength")>0?!(a.length<f.attr("maxlength")):!1;b||f.val(a.substr(0,e.b())+c+a.substr(e.b(),a.length));h&&(j(),h=!1);e.a()!=""&&(c=e.b()+(b?0:c.length),e.c(e.a(),c),e.d(c))}}function q(){var f=g;f.click(function(){var a=e.h(),c;if(c=a!=-1)a=e.g().elements[a],a.type=="text"||a.type=="password"||a.type==
"textarea"||a.nodeName=="SELECT"?(_el=$(a),!_el.is(":hidden")&&_el.data("vkbcontroller-exclude")!=!0?(e.e(a),c=!0):c=!1):c=void 0;c&&(a=e.b(),e.c(e.a(),a),e.d(a))});f.find("span.vkey").click(function(a){var c=$(this);!c.hasClass("fn")&&!c.hasClass("vkey_pressed")&&p(this);c.addClass("vkey_pressed");setTimeout(function(){$(c).removeClass("vkey_pressed")},300);$(document).trigger("kbclick");a.stopPropagation()}).bind("dblclick",function(){var a=$(this);!a.hasClass("fn")&&a.hasClass("vkey_pressed")&&
p(this)});f.find("span#delete").click(function(){if(e.a()!=""){var a=e.b(),c=$(e.a()),b=c.val();c.val(b.substr(0,e.b()-1)+b.substr(e.b(),b.length));e.c(e.a(),a-1);e.d(a-1)}});f.find("span#shift").click(function(){$(this).find("span.on").text();h?(j(),h=!1):(j(),h=!0)});f.find("span#abc").click(function(){var a=g.find("span.letter span.off").closest("span.letter");a.find("span.off").attr("class","offon");a.find("span.on").attr("class","off");a.find("span.offon").attr("class","on");a=$("#abc");k?(a.find("span.off").attr("class",
"offon"),a.find("span.on").attr("class","off"),a.find("span.offon").attr("class","on"),k=!1):(a.find("span.off").attr("class","offon"),a.find("span.on").attr("class","off"),a.find("span.offon").attr("class","on"),k=!0);g.find("span#shift").toggleClass("hidden")});f.click(function(a){$(document).trigger("kbclick");a.stopPropagation()});$("body").click(function(){e.j()})}function j(){var e=g.find("span.letter span.on");h?(e.each(function(){this.innerHTML=this.innerHTML.toLowerCase()}),$("span#shift").html("UPPER CASE"),
h=!1):(e.each(function(){this.innerHTML=this.innerHTML.toUpperCase()}),$("span#shift").html("lower case"),h=!0)}var e=new s,m=null,g=null,h=!1,k=!1;this.init=function(){m=$("#containerKB");g=$("#un_keyboard");e.init(g);var f=window.kb_props,a=f.visibility;m.css("visibility",a.initialStatus);f.container=m;a.status=a.initialStatus;if(!g.find("#row1").length){f=0;for(a=o.length;f<a;f++){var c=document.createElement("div");$(c).attr("id","row"+(f+1)).attr("class","row");for(var b=o[f],d=0,h=b.length;d<
h;d++){var i=document.createElement("span");if(b[d].type=="fn")if(b[d].values[0]=="shift")$(i).attr("id","shift").attr("class",b[d].type),i.innerHTML=b[d].labels[0];else if(b[d].values[0]=="abc"){$(i).attr("id","abc").attr("class",b[d].type);for(var l=0,k=b[d].labels.length;l<k;l++){var n=document.createElement("span"),j=l==0?"on":"off";$(n).attr("class",j);n.innerHTML=b[d].labels[l];i.appendChild(n)}}else b[d].values[0]=="delete"?($(i).attr("id","delete").attr("class",b[d].type),l=b[d].labels?b[d].labels[0]:
b[d].values[0],i.innerHTML=l):($(i).attr("class",b[d].type),i.innerHTML=b[d].values[0]);else if(b[d].type=="number")j=$(i).attr("class",b[d].type),b[d].id&&j.attr("id",b[d].id),i.innerHTML=b[d].values[0];else if(b[d].values[0]==" "){if($(i).attr("id","space").attr("class",b[d].type),b[d].labels)i.innerHTML=b[d].labels[0]}else{$(i).attr("class",b[d].type);b[d].id&&$(i).attr("id",b[d].id);l=0;for(k=b[d].values.length;l<k;l++)n=document.createElement("span"),j=l==0?"on":"off",$(n).attr("class",j),n.innerHTML=
b[d].values[l],i.appendChild(n)}$(i).addClass("vkey");c.appendChild(i)}$(c).append('<div style="clear:both"></div>');g.get(0).appendChild(c);g.append('<div style="clear:both"></div>')}q()}};this.f=e.i}(kb_layout);window.VKEYBOARD=r;window.VKEYBOARD.setContestForm=r.f})();
