var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(a){a=a.toUpperCase();var b=this.NODEMAP[a]||"div",c=document.createElement(b);try{c.innerHTML="<"+a+"></"+a+">"}catch(a){}var d=c.firstChild||null;if(d&&d.tagName.toUpperCase()!=a&&(d=d.getElementsByTagName(a)[0]),d||(d=document.createElement(a)),d){if(arguments[1])if(this._isStringOrNumber(arguments[1])||arguments[1]instanceof Array||arguments[1].tagName)this._children(d,arguments[1]);else{var e=this._attributes(arguments[1]);if(e.length){try{c.innerHTML="<"+a+" "+e+"></"+a+">"}catch(a){}if(d=c.firstChild||null,!d){d=document.createElement(a);for(attr in arguments[1])d["class"==attr?"className":attr]=arguments[1][attr]}d.tagName.toUpperCase()!=a&&(d=c.getElementsByTagName(a)[0])}}return arguments[2]&&this._children(d,arguments[2]),$(d)}},_text:function(a){return document.createTextNode(a)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(a){var b=[];for(attribute in a)b.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+a[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');return b.join(" ")},_children:function(a,b){return b.tagName?void a.appendChild(b):void("object"==typeof b?b.flatten().each(function(b){"object"==typeof b?a.appendChild(b):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b))}):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b)))},_isStringOrNumber:function(a){return"string"==typeof a||"number"==typeof a},build:function(a){var b=this.node("div");return $(b).update(a.strip()),b.down()},dump:function(a){"object"!=typeof a&&"function"!=typeof a&&(a=window);var b="A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/);b.each(function(b){a[b]=function(){return Builder.node.apply(Builder,[b].concat($A(arguments)))}})}};