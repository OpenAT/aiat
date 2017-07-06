var specialSpenden=Class.create({initialize:function(){if(this.spendenform=$("spendenform"),this.spendenform){new sessionChecker,this.spendenform.setStyle({display:"block"}),this.spendenform.stopObserving("submit"),this.spendenform.observe("submit",this.submit.bindAsEventListener(this)),$("jetzt_spenden_btn").writeAttribute("type","submit"),this.reiter=this.spendenform.select("div.reiter li"),this.reiter[0].addClassName("active"),this.reiter[0].up("ul").on("click","li",this.activate.bindAsEventListener(this)),this.stepsUl=this.spendenform.select("ul.steps")[0],this.steps=this.spendenform.select("ul.steps > li"),this.paneele=this.stepsUl.up("div"),this.stepSize=580,this.currentStep=0,this.btnNext=this.spendenform.select("button.next")[0].observe("click",this.activate.bindAsEventListener(this,1)),this.btnPrev=this.spendenform.select("button.prev")[0].observe("click",this.activate.bindAsEventListener(this,-1)),this.reloadUrl=null;var a=new Date;$("spende-Geburtsdatum-year").value=a.getFullYear()-18,$("formLoadingLight").on("click","button.closeButton",this.loadingHide.bindAsEventListener(this)),$("formLoadingLight").on("click","button.reloadButton",function(){null!==this.reloadUrl?location.href=this.reloadUrl:window.location.reload(!0)}.bindAsEventListener(this)),this.activate(this.stepsUl.readAttribute("data-active"));var b=this.stepsUl.select("input, select, button, a");if(b.each(function(a){a.observe("focus",this.checkFocus.bindAsEventListener(this))},this),this.other_yearly=$("spende-paysteps_yearly").select("input"),this.other_monthly=$("spende-paysteps_monthly").select("input"),this.other_once=$("spende-paysteps_once").select("input"),this.freeAmount=$("spende-frei"),this.dontsenttaxoffice=$("spende-dontsenttaxoffice").select("input"),this.freeAmount.observe("focus",function(a){this.other_yearly[this.other_yearly.length-1].checked=!0,this.other_monthly[this.other_monthly.length-1].checked=!0,this.other_once[this.other_once.length-1].checked=!0,this.checkPayment()}.bindAsEventListener(this)),this.freeAmount.observe("blur",function(a){var b=this.freeAmount.value;b=b.replace(/[^0-9\.,]/g,""),b.match(/\.[0-9][0-9]$/)?(b=b.replace(/[^0-9\.]/g,""),b=parseFloat(b)):(b=b.replace(/\./g,""),b=b.replace(/\,/g,"."),b=parseFloat(b)),isNaN(b)&&(b=0),0==b?this.freeAmount.value="":this.freeAmount.value=this.numberFormat(b,"0,000.00",",",".")}.bindAsEventListener(this)),this.other_yearly.each(function(a,b){a.observe("click",function(a){a.target!=this.other_yearly[this.other_yearly.length-1]&&a.target.checked&&(this.freeAmount.value=""),this.checkPayment()}.bindAsEventListener(this))},this),this.other_monthly.each(function(a,b){a.observe("click",function(a){a.target!=this.other_monthly[this.other_monthly.length-1]&&a.target.checked&&(this.freeAmount.value=""),this.checkPayment()}.bindAsEventListener(this))},this),this.other_once.each(function(a,b){a.observe("click",function(a){a.target!=this.other_once[this.other_once.length-1]&&a.target.checked&&(this.freeAmount.value=""),this.checkPayment()}.bindAsEventListener(this))},this),this.dontsenttaxoffice.each(function(a,b){a.observe("click",function(a){this.checkPayment()}.bindAsEventListener(this))},this),this.spendenform.select("li.fehler").length>0)for(var c=0;c<this.reiter.length-1;)this.checkErrors(c++);this.paymentEls={},this.spendenform.select("div.paneele > ul > li:nth-child(1) > ul > li").each(function(a){this.paymentEls[a.id]=a},this),this.spendenform.select("li.payintervall input, li.payoptions input").each(function(a){a.observe("click",this.checkPayment.bindAsEventListener(this))},this),$("spende-Telefonnummer").observe("keyup",this.checkPhone.bindAsEventListener(this)),this.checkPayment()}},checkPhone:function(a){var b=a.target;b.value=b.value.replace(/^\+/,"00").replace(/[\/-]/," ").replace(/  /g," ").replace(/[^0-9 ]/gi,"")},checkPayment:function(){$("spende-payintervall-monatlich").checked||$("spende-payintervall-jaehrlich").checked?(this.paymentEls.s_payoptions.hide(),this.paymentEls.s_help_online.hide(),$("spende-payintervall-jaehrlich").checked?(this.paymentEls.s_paysteps_yearly.show(),this.paymentEls.s_paysteps_monthly.hide()):(this.paymentEls.s_paysteps_yearly.hide(),this.paymentEls.s_paysteps_monthly.show()),this.paymentEls.s_paysteps_once.hide(),this.paymentEls.s_frei.show(),this.paymentEls.s_help_IBAN.show(),this.paymentEls.s_IBAN.show(),this.paymentEls.s_BIC.show(),$("spende-payintervall-jaehrlich").checked&&$("spende-paysteps_yearly-frei").checked?($("spende-paysteps_once-frei").checked=!0,this.freeAmount.writeAttribute("aria-required","true").required=!0):$("spende-payintervall-monatlich").checked&&$("spende-paysteps_monthly-frei").checked?($("spende-paysteps_once-frei").checked=!0,this.freeAmount.writeAttribute("aria-required","true").required=!0):($("spende-paysteps_once-frei").checked&&(this.other_once[0].checked=!0),this.freeAmount.writeAttribute("aria-required","false").required=!1)):(this.paymentEls.s_payoptions.show(),$("spende-payoptions-online").checked?(this.paymentEls.s_help_online.show(),this.paymentEls.s_paysteps_yearly.hide(),this.paymentEls.s_paysteps_monthly.hide(),this.paymentEls.s_paysteps_once.show(),this.paymentEls.s_frei.show(),this.paymentEls.s_help_IBAN.hide(),this.paymentEls.s_IBAN.hide(),this.paymentEls.s_BIC.hide(),$("spende-paysteps_once-frei").checked?($("spende-paysteps_yearly-frei").checked=!0,$("spende-paysteps_monthly-frei").checked=!0,this.freeAmount.writeAttribute("aria-required","true").required=!0):($("spende-paysteps_yearly-frei").checked&&(this.other_yearly[0].checked=!0),$("spende-paysteps_monthly-frei").checked&&(this.other_monthly[0].checked=!0),this.freeAmount.writeAttribute("aria-required","false").required=!1)):(this.paymentEls.s_help_online.hide(),this.paymentEls.s_paysteps_yearly.hide(),this.paymentEls.s_paysteps_monthly.hide(),this.paymentEls.s_paysteps_once.show(),this.paymentEls.s_frei.show(),this.paymentEls.s_help_IBAN.show(),this.paymentEls.s_IBAN.show(),this.paymentEls.s_BIC.show(),$("spende-paysteps_once-frei").checked?($("spende-paysteps_yearly-frei").checked=!0,$("spende-paysteps_monthly-frei").checked=!0,this.freeAmount.writeAttribute("aria-required","true").required=!0):($("spende-paysteps_yearly-frei").checked&&(this.other_yearly[0].checked=!0),$("spende-paysteps_monthly-frei").checked&&(this.other_monthly[0].checked=!0),this.freeAmount.writeAttribute("aria-required","false").required=!1)))},checkFocus:function(a){var b=a.target.up("ul.steps > li");this.paneele.scrollLeft=0,this.activate(this.getSiblingIndex(b))},activate:function(a,b){if(void 0!=b)var c=this.reiter[this.currentStep+b];else if(a&&a.target)var c=a.target;else var c=this.reiter[a];this.reiter[this.currentStep].removeClassName("active"),this.currentStep=this.getSiblingIndex(c),this.reiter[this.currentStep].addClassName("active");for(var d=0;d<this.currentStep;)this.checkErrors(d++);this.setTransform(this.stepsUl,-this.stepSize*this.currentStep),window.setTimeout(this.checkHeight.bind(this),10),0==this.currentStep?this.btnPrev.hide():this.btnPrev.show().update(this.reiter[this.currentStep-1].innerHTML+" <span>zurück</span>"),this.currentStep==this.reiter.length-1?this.btnNext.hide():this.btnNext.show().update("<span>nächster Schritt</span> "+this.reiter[this.currentStep+1].innerHTML)},checkHeight:function(){var a=this.stepsUl.childElements()[this.currentStep].getDimensions();this.paneele.setStyle({height:a.height+60+"px"})},checkErrors:function(a){var b=!1;if(0==a){if($("spende-payintervall-monatlich").checked||$("spende-payintervall-jaehrlich").checked||$("spende-payoptions-online").checked||$("spende-payoptions-einzug").checked)if($("spende-paysteps_yearly-frei").checked||$("spende-paysteps_monthly-frei").checked||$("spende-paysteps_once-frei").checked){var c=parseInt($F("spende-frei"),10);$("spende-payintervall-jaehrlich").checked&&$("spende-paysteps_yearly-frei").checked&&(1>c||isNaN(c))?($("spende-frei").up("li").addClassName("fehler"),$("s_free_min_nr").update("1,00"),$("s_free_min").setStyle({display:"block"}),b=!0):$("spende-payintervall-monatlich").checked&&$("spende-paysteps_monthly-frei").checked&&(1>c||isNaN(c))?($("spende-frei").up("li").addClassName("fehler"),$("s_free_min_nr").update("1,00"),$("s_free_min").setStyle({display:"block"}),b=!0):$("spende-payintervall-einmalig").checked&&$("spende-paysteps_once-frei").checked&&(5>c||isNaN(c))?($("spende-frei").up("li").addClassName("fehler"),$("s_free_min_nr").update("5,00"),$("s_free_min").setStyle({display:"block"}),b=!0):($("spende-frei").up("li").removeClassName("fehler"),$("s_free_min").setStyle({display:"none"}))}else $("spende-frei").up("li").removeClassName("fehler"),$("s_free_min").setStyle({display:"none"});else $("spende-frei").up("li").removeClassName("fehler"),$("s_free_min").setStyle({display:"none"});($("spende-payintervall-monatlich").checked||$("spende-payintervall-jaehrlich").checked||$("spende-payoptions-einzug").checked)&&(b=this.setRemoveError("spende-IBAN",b,!this.validateIBAN($F("spende-IBAN"))),b=this.setRemoveError("spende-BIC",b,!this.validateBIC($F("spende-BIC"))))}else if(1==a){b=this.setRemoveError("spende-Anrede",b,$F("spende-Anrede").blank()),b=this.setRemoveError("spende-Vorname",b,$F("spende-Vorname").blank()),b=this.setRemoveError("spende-Nachname",b,$F("spende-Nachname").blank()),b=this.setRemoveError("spende-Email",b,!validateEmail($F("spende-Email"),!0)),b=this.setRemoveError("spende-Geburtsdatum-day",b,$F("spende-Geburtsdatum-day").blank()),b=this.setRemoveError("spende-Geburtsdatum-month",b,$F("spende-Geburtsdatum-month").blank()),b=this.setRemoveError("spende-Geburtsdatum-year",b,$F("spende-Geburtsdatum-year").blank()),$F("spende-Geburtsdatum-day").blank()?$("spende-Geburtsdatum-day").up("li").addClassName("fehler"):$("spende-Geburtsdatum-day").up("li").removeClassName("fehler"),$F("spende-Geburtsdatum-month").blank()?$("spende-Geburtsdatum-month").up("li").addClassName("fehler"):$("spende-Geburtsdatum-month").up("li").removeClassName("fehler"),$F("spende-Geburtsdatum-year").blank()?$("spende-Geburtsdatum-year").up("li").addClassName("fehler"):$("spende-Geburtsdatum-year").up("li").removeClassName("fehler");var d=parseInt($F("spende-Geburtsdatum-day"),10),e=parseInt($F("spende-Geburtsdatum-month"),10),f=parseInt($F("spende-Geburtsdatum-year"),10),g=new Date;if(d>0&&e>0&&f>999){var h=new Date(f,e-1,d);h.getFullYear()==f&&h.getMonth()+1==e&&h.getDate()==d?31536e6>g-h?($("spende-Geburtsdatum-day").up("li.Geburtsdatum").addClassName("fehler"),b=!0):$("spende-Geburtsdatum-day").up("li.Geburtsdatum").removeClassName("fehler"):($("spende-Geburtsdatum-day").up("li.Geburtsdatum").addClassName("fehler"),b=!0)}else this.setRemoveError("spende-Geburtsdatum-day",b,!0),this.setRemoveError("spende-Geburtsdatum-month",b,!0),this.setRemoveError("spende-Geburtsdatum-year",b,!0),$("spende-Geburtsdatum-day").up("li").addClassName("fehler"),$("spende-Geburtsdatum-month").up("li").addClassName("fehler"),$("spende-Geburtsdatum-year").up("li").addClassName("fehler"),b=!0}else 2==a&&(b=this.setRemoveError("spende-Strasse",b,$F("spende-Strasse").blank()),b=this.setRemoveError("spende-PLZ",b,$F("spende-PLZ").blank()),b=this.setRemoveError("spende-Ort",b,$F("spende-Ort").blank()),b=this.setRemoveError("spende-Land",b,$F("spende-Land").blank()||"0"==$F("spende-Land")));b?this.reiter[a].addClassName("error"):this.reiter[a].removeClassName("error"),3==a&&this.concatFinale()},validateIBAN:function(a){return a=a.replace(/[^a-z0-9]/gi,""),IBAN.isValid(a)},validateBIC:function(a){a=a.replace(/[^a-z0-9]/gi,"");var b=/^[a-z]{6}[2-9a-z][0-9a-np-z]([a-wyz0-9][a-z0-9]{2}|x{3})?$/i;return b.test(a)},setRemoveError:function(a,b,c){if($(a)){if(c)return $(a).writeAttribute("aria-invalid","true"),$(a).up("li").addClassName("fehler"),!0;$(a).writeAttribute("aria-invalid","false"),$(a).up("li").removeClassName("fehler")}return b},concatFinale:function(){if(this.spendenform.select("div.reiter li.error").length>0)$("jetzt_spenden_btn").hide(),$("finaleDaten").update("Es sind noch Fehler im Formular vorhanden.");else{$("jetzt_spenden_btn").show();var a=[],b=[],c=$F("spende-Anrede");c.blank()||b.push(c);var c=$F("spende-Titel");c.blank()||b.push(c);var c=$F("spende-Vorname");c.blank()||b.push(c);var c=$F("spende-Nachname");c.blank()||b.push(c);var c=$F("spende-Firma");c.blank()||b.push("("+c+")"),b.length>0&&a.push(b.join(" "));var b=[],c=$F("spende-Email");c.blank()||b.push(c);var c=$F("spende-Strasse");c.blank()||b.push(c);var d=$F("spende-PLZ"),e=$F("spende-Ort"),f=$F("spende-Land"),g="";d.blank()||e.blank()?d.blank()?e.blank()||b.push(e):b.push(d):b.push(d+" "+e),g.blank()||f.blank()||"0"==f||(g+=" / "+f),g.blank()||b.push(g),b.length>0&&a.push(b.join(", "));var b=[],h=parseInt($F("spende-Geburtsdatum-day"),10),i=parseInt($F("spende-Geburtsdatum-month"),10),j=parseInt($F("spende-Geburtsdatum-year"),10);if(h>0&&i>0&&j>999){var k=new Date(j,i-1,h);k.getFullYear()==j&&k.getMonth()+1==i&&k.getDate()==h&&b.push("Geburtsdatum "+(10>h?"0":"")+h+"."+(10>i?"0":"")+i+"."+k.getFullYear())}var c=$F("spende-Telefonnummer");c.blank()||b.push("Tel. "+c),b.length>0&&a.push(b.join(", "));var b=[];b.push("spendet"),$("spende-payintervall-jaehrlich").checked?b.push("jährlich"):$("spende-payintervall-monatlich").checked?b.push("monatlich"):b.push("einmalig"),$("spende-payintervall-jaehrlich").checked?$("spende-paysteps_yearly-frei").checked?b.push($F("spende-frei")+" €"):$("spende-paysteps_yearly-72").checked?b.push(this.numberFormat(72,"0,000.00",",",".")+" €"):$("spende-paysteps_yearly-90").checked?b.push(this.numberFormat(90,"0,000.00",",",".")+" €"):b.push(this.numberFormat(120,"0,000.00",",",".")+" €"):$("spende-payintervall-monatlich").checked?$("spende-paysteps_monthly-frei").checked?b.push($F("spende-frei")+" €"):$("spende-paysteps_monthly-15").checked?b.push(this.numberFormat(15,"0,000.00",",",".")+" €"):$("spende-paysteps_monthly-25").checked?b.push(this.numberFormat(25,"0,000.00",",",".")+" €"):b.push(this.numberFormat(30,"0,000.00",",",".")+" €"):$("spende-paysteps_once-frei").checked?b.push($F("spende-frei")+" €"):$("spende-paysteps_once-55").checked?b.push(this.numberFormat(55,"0,000.00",",",".")+" €"):$("spende-paysteps_once-70").checked?b.push(this.numberFormat(70,"0,000.00",",",".")+" €"):b.push(this.numberFormat(100,"0,000.00",",",".")+" €"),($("spende-payintervall-monatlich").checked||$("spende-payintervall-jaehrlich").checked||$("spende-payoptions-einzug").checked)&&b.push("von meinem Konto"),$("spende-payintervall-monatlich").checked||$("spende-payintervall-jaehrlich").checked||$("spende-payintervall-einmalig").checked&&$("spende-payoptions-einzug").checked?$("finalAddition-einzug").setStyle({display:"block"}):$("finalAddition-einzug").setStyle({display:"none"}),b.push("an Amnesty International Österreich."),a.push(b.join(" ")),$("finaleDaten").update(a.join("<br>"))}},submit:function(a){Event.stop(a),this.loadingShow(),this.spendenform.request({method:"post",onComplete:this.submitDone.bind(this)})},submitDone:function(a){var b="Aus technischen Gründen kann ihre Anfrage nicht bearbeitet werden. Es wurde keine Überweisung / Buchung / Zahlung getätigt. Wir entschuldigen uns für etwaige Unanehmlichkeiten! Die Seite wird nun neu geladen. Ihre Daten gehen dadurch leider verloren.<br><button class='reloadButton' type='button'>OK</button>";if(a.responseText.isJSON()){var c=a.responseText.evalJSON(!0);if(c.formError)if(c.formError.undefined)$("formLoadingLight").update(b);else{for(var d=0;d<this.reiter.length-1;)this.checkErrors(d++);$("formLoadingLight").update("Leider ist im Formular ein Fehler aufgetreten. Bitte füllen Sie alle Felder korrekt aus.<br><button class='closeButton' type='button'>OK</button>")}else c.MPay24?window.location.href=c.MPay24:c.Error?($("formLoadingLight").update(c.Error+"<br><button class='reloadButton' type='button'>OK</button>"),this.reloadUrl=c.reloadUrl):c.done?window.location.href=c.done:$("formLoadingLight").update(b)}else $("formLoadingLight").update(b)},loadingShow:function(){$("formLoadingDark").setStyle({display:"block"}),$("formLoadingLight").update("Sende / Lade Daten...").setStyle({display:"block"})},loadingHide:function(){$("formLoadingDark").setStyle({display:"none"}),$("formLoadingLight").setStyle({display:"none"})},setTransform:function(a,b){Modernizr.csstransforms3d?(a.style.WebkitTransform="translate3d("+b+"px, 0, 0) scale3d(1, 1, 1)",a.style.MozTransform="translate3d("+b+"px, 0, 0) scale3d(1, 1, 1)",a.style.msTransform="translate3d("+b+"px, 0, 0) scale3d(1, 1, 1)",a.style.OTransform="translate3d("+b+"px, 0, 0) scale3d(1, 1, 1)",a.style.transform="translate3d("+b+"px, 0, 0) scale3d(1, 1, 1)"):Modernizr.csstransforms?(a.style.WebkitTransform="translate("+b+"px, 0)",a.style.MozTransform="translate("+b+"px, 0)",a.style.msTransform="translate("+b+"px, 0)",a.style.OTransform="translate("+b+"px, 0)",a.style.transform="translate("+b+"px, 0)"):a.style.left=b+"px"},getSiblingIndex:function(a){for(var b=0;a&&null!=(a=a.previousSibling);)++b;return b},numberFormat:function(a,b,c,d){var e=b.replace(/[^0\,\.]*/g,""),f=e.indexOf(".");f>-1&&(f=e.length-f-1);var g=e.indexOf(",");g>-1&&(g=e.length-f-2-g),c=c||".",d=d||",";var h=b.split(e)[0],i=b.split(e)[1],j=[f,g,h,i,c,d],k=(parseFloat(a)<0?"-":"")+j[2];if(a=Math.abs(Math.round(parseFloat(a)*Math.pow(10,j[0]>0?j[0]:0))).toString(),a=(a.length<j[0]?Math.pow(10,j[0]+1-a.length).toString().substr(1,j[0]+1)+a.toString():a).split("").reverse(),a[j[0]]=(a[j[0]]||"0")+(f>0?j[4]:""),j[1]>0)for(var l=j[0]+j[1];l<a.length;l+=j[1])a[l]+=j[5];return k+a.reverse().join("")+j[3]}});Prototype.Browser.IE?Event.observe(window,"load",function(){new specialSpenden}):document.observe("dom:loaded",function(){new specialSpenden});