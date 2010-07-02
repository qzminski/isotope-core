var Isotope={mediaManager:function(b,c,a){var l=$(a).getFirst("table");var f=l.getFirst("tbody");var k=$(b).getParent("tr");var m=f.getChildren();Backend.getScrollOffset();switch(c){case"up":k.getPrevious()?k.injectBefore(k.getPrevious()):k.injectInside(f);break;case"down":k.getNext()?k.injectAfter(k.getNext()):k.injectBefore(f.getFirst());break;case"delete":k.destroy();break}m=f.getChildren();for(var e=0;e<m.length;e++){var h=m[e].getChildren();for(var d=0;d<h.length;d++){var g=h[d].getFirst();if(g.type=="hidden"||g.type=="text"||g.type=="textarea"){g.name=g.name.replace(/\[[0-9]+\]/ig,"["+e+"]")}}}},attributeWizard:function(d,e,f){var a=$(f);var c=$(d).getParent();Backend.getScrollOffset();switch(e){case"up":if(!c.getPrevious()||c.getPrevious().hasClass("fixed")){c.injectInside(a)}else{c.injectBefore(c.getPrevious())}break;case"down":if(c.getNext()){c.injectAfter(c.getNext())}else{var b=a.getFirst();if(b.hasClass("fixed")){b=b.getNext()}c.injectBefore(b)}break}},surchargeWizard:function(b,c,a){var n=$(a);var f=n.getFirst().getNext();var m=$(b).getParent("tr");var o=f.getChildren();Backend.getScrollOffset();switch(c){case"copy":var l=new Element("tr");var k=m.getChildren();for(var e=0;e<k.length;e++){var h=k[e].clone(true).injectInside(l);h.getFirst().value=k[e].getFirst().value}l.injectAfter(m);break;case"up":m.getPrevious()?m.injectBefore(m.getPrevious()):m.injectInside(f);break;case"down":m.getNext()?m.injectAfter(m.getNext()):m.injectBefore(f.getFirst());break;case"delete":(o.length>1)?m.destroy():null;break}o=f.getChildren();for(var e=0;e<o.length;e++){var k=o[e].getChildren();for(var d=0;d<k.length;d++){var g=k[d].getFirst();if(g.type=="select-one"||g.type=="text"||g.type=="checkbox"){g.name=g.name.replace(/\[[0-9]+\]/ig,"["+e+"]")}}}},toggleCheckboxGroup:function(c,d){var b=$(c).className;var a=$(c).checked?"checked":"";if(b=="tl_checkbox"){$$("#"+d+" .tl_checkbox").each(function(e){if(!e.disabled){e.checked=a}})}else{if(b=="tl_tree_checkbox"){$$("#"+d+" .parent .tl_tree_checkbox").each(function(e){if(!e.disabled){e.checked=a}})}}Backend.getScrollOffset()},addInteractiveHelp:function(){$$("a.tl_tip").each(function(a){if(a.retrieve("complete")){return}a.addEvent("mouseover",function(){a.timo=setTimeout(function(){var c=$("tl_helpBox");if(!c){c=new Element("div").setProperty("id","tl_helpBox").injectInside($(document.body))}var b=a.getTop();c.set("html",a.get("longdesc"));c.setStyle("display","block");c.setStyle("top",(b+18)+"px")},1000)});a.addEvent("mouseout",function(){var b=$("tl_helpBox");if(b){b.setStyle("display","none")}clearTimeout(a.timo)});a.store("complete",true)})},inheritFields:function(a,b){var c=false;a.each(function(e,f){var h=$(("ctrl_"+e));if(h){var g=h.getParent("div").getFirst("h3");if(!g&&h.match(".tl_checkbox_single_container")){g=h}if(!g){c=true;return}g.addClass("inherit");var d=$("ctrl_inherit").getFirst(("input[value="+e+"]"));d.setStyle("float","right").inject(g);$("ctrl_inherit").getFirst(("label[for="+d.get("id")+"]")).setStyles({"float":"right","padding-right":"5px","font-weight":"normal"}).set("text",b).inject(g);d.addEvent("change",function(j){var i=$(("ctrl_"+j.target.get("value")));if(i.match(".tl_checkbox_single_container")){i.getFirst("input").disabled=j.target.checked}else{i.setStyle("display",(j.target.checked?"none":"block"))}});if(h.match(".tl_checkbox_single_container")){h.getFirst("input").readonly=d.checked}else{h.setStyle("display",(d.checked?"none":"block"))}}});if(!c){$("ctrl_inherit").getParent("div").setStyle("display","none")}},productWizard:function(a){$$(("#ctrl_"+a+" .jserror")).setStyle("display","none");$$(("#ctrl_"+a+" .search")).setStyle("display","table-row");$$(("#ctrl_"+a+" tbody tr")).each(function(c){var b=c.getElement("input[type=checkbox]");if(b){b.addEvent("change",function(d){d.target.getParent("tr").destroy();$(("ctrl_"+a)).send()})}});$(("ctrl_"+a)).set("send",{url:("ajax.php?action=ffl&id="+a),link:"cancel",onRequest:function(){$$(("#ctrl_"+a+" .search input.tl_text")).setStyle("background-image","url(system/modules/isotope/html/loading.gif)")},onSuccess:function(c,d){$$(("#ctrl_"+a+" .search input.tl_text")).setStyle("background-image","none");$$(("#ctrl_"+a+" tr.found")).each(function(e){e.destroy()});var b=Elements.from(c,false);$$(("#ctrl_"+a+" tbody")).adopt(b);b.each(function(e){e.getElement("input[type=checkbox]").addEvent("change",function(f){if(f.target.checked){f.target.getParent("tr").removeClass("found").inject($$(("#ctrl_"+a+" tr.search"))[0],"before")}else{f.target.getParent("tr").destroy();$(("ctrl_"+a)).send()}})})}}).addEvent("keyup",function(b){$(("ctrl_"+a)).send()})},initializeToolsMenu:function(){if($$("#tl_buttons .isotope-tools").length<1){return}$$("#tl_buttons .header_isotope_tools").setStyle("display","inline");var d=$$("#tl_buttons .isotope-tools").clone();var c=[];var a=$("tl_buttons").childNodes;for(var b=0;b<a.length;b++){if(!a[b]){continue}if(a[b].hasClass&&a[b].hasClass("isotope-tools")){b++;continue}if(a[b].clone){c.push(a[b].clone())}else{c.push(a[b])}}if(!c[c.length-1].clone){c.erase(c[c.length-1])}$("tl_buttons").empty().adopt(c);var e=new Element("div",{id:"isotopetoolsmenu",styles:{top:($$("a.header_isotope_tools")[0].getPosition().y+22)}}).adopt(d);e.inject($(document.body));e.setStyle("left",$$("a.header_isotope_tools")[0].getPosition().x-7);$$("a.header_isotope_tools").addEvent("click",function(f){$("isotopetoolsmenu").setStyle("display","block");return false});$(document.body).addEvent("click",function(){$("isotopetoolsmenu").setStyle("display","none")})},initializeToolsButton:function(){$$("#tl_listing .isotope-tools").each(function(a){a.addClass("invisible")});$$("a.isotope-contextmenu").each(function(a){if(a.getNext("a.isotope-tools")){a.removeClass("invisible").addEvent("click",function(b){if($defined($("isotope-contextmenu"))){$("isotope-contextmenu").destroy()}var c=new Element("div",{id:"isotope-contextmenu",styles:{top:(a.getPosition().y+22),display:"block"}});a.getAllNext("a.isotope-tools").each(function(e){var d=e.getFirst("img");c.set("html",(c.get("html")+'<a href="'+e.href+'" title="'+e.title+'">'+e.get("html")+" "+d.alt+"</a>"))});c.inject($(document.body));c.setStyle("left",a.getPosition().x-(c.getSize().x/2));return false})}});$(document.body).addEvent("click",function(){if($defined($("isotope-contextmenu"))){$("isotope-contextmenu").destroy()}})}};window.addEvent("domready",function(){Isotope.addInteractiveHelp();Isotope.initializeToolsMenu();Isotope.initializeToolsButton()});