function docss(e){return"<font color=black>"+e+"</font>"}function docss(e){return"<font color=black>"+e+"</font>"}function dump(e){var t="";for(var n in e)t+=n+"\n";alert(t)}function objtostr(e){var t="";for(var n in e)t+=n+": "+e[n]+",\n";return t}function Ajax(e,t,n,r){var i=new XMLHttpRequest;i.open(e,t,!1),i.setRequestHeader("Accept","text/plain"),i.setRequestHeader("Accept","text/html"),i.setRequestHeader("Content-Type","application/x-ww-form-urlencoded; charset=UTF-8"),i.onreadystatechange=function(e){i.status==200?r&&r(i.responseText):console.error("ajax "+i.status)},i.send(n)}function makelist(e){var t="List of "+e.length+"\n\n";for(var n=0;n<e.length;n++)t+="<a style='color:yellow' href='javascript:r2ui.opendis("+e[n].offset+")'>0x"+e[n].offset.toString(16)+"</a>  "+e[n].name+"\n";return t}enyo.kind({name:"About",kind:"Scroller",style:"background-color:#303030",components:[{tag:"center",components:[{tag:"h1",style:"color:#f0f0f0",content:"r2wui"},{kind:"Image",src:"icon.png"},{tag:"h3",style:"color:#707070;margin-bottom:50px",content:"the web frontend for radare2"},{tag:"h2",style:"color:#a0a0a0",content:"author: pancake 2013"},{tag:"h2",style:"color:#a0a0a0",content:"version: 0.9.5git3",name:"version"}]}],create:function(){this.inherited(arguments),r2.cmd("?V",function(e){this.$.version.setContent("version: "+e)})}}),enyo.kind({name:"Assembler",kind:"Scroller",classes:"r2panel",components:[{tag:"form",style:"margin-top:8px;margin-left:8px",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,components:[{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"opcode",classes:"r2ui-input",style:"width:64px;font-weight:bold"},{kind:"Input",value:"",style:"width:60%",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"opcode"}]},{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"bytes",classes:"r2ui-input",style:"width:64px;font-weight:bold"},{kind:"Input",value:"",style:"width:120px",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"bytes"}]},{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"offset",classes:"r2ui-input",style:"width:64px;font-weight:bold"},{kind:"Input",value:"entry0",style:"width:120px",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"offset"}]}]}]},{tag:"form",style:"margin-top:8px;margin-left:8px",attributes:{action:"javascript:#"},components:[{tag:"h2",content:"Calculator"},{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",name:"value",content:"0",classes:"r2ui-input",style:"width:200px;font-weight:bold"},{kind:"Input",name:"ivalue",value:"0",style:"width:300",onkeydown:"calculateValue",attributes:{autocapitalize:"off"}}]}]}],calculateValue:function(e,t){if(t.keyCode===13){var n=this.$.value,r=e.getValue();n.setContent("..."),r2.cmd("?v "+r,function(e){n.setContent(e)})}},assembleOpcode:function(e,t){if(t.keyCode===13){var n=e.getValue(),r=this.$.offset.getValue();switch(e.name){case"opcode":var i=this.$.bytes;r2.assemble(r,n,function(e){i.setValue(e)});break;case"bytes":var s=this.$.opcode;r2.disassemble(r,n,function(e){s.setValue(e)});break;case"offset":}}}});var Config={keys:{1:"this.setIndex(0)",2:"this.setIndex(1)",3:"this.setIndex(2)",d:"r2ui.openpage(0)",a:"r2ui.openpage(1)",h:"r2ui.openpage(2)",g:"r2ui.openpage(3)",c:"r2ui.openpage(5)",s:"r2ui.openpage(8)",";":"r2.cmd('CC '+prompt('comment'));r2ui.seek('$$',true);"}};enyo.kind({name:"Console",kind:"Scroller",classes:"r2panel",style:"padding-left:7px",components:[{tag:"form",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,classes:"fittable-sample-shadow",components:[{kind:"onyx.InputDecorator",style:"margin-top:8px;background-color:#404040;width: 90%;display:inline-block",components:[{kind:"Input",style:"width:100%;color:white",value:"",onkeydown:"runCommand",attributes:{autocapitalize:"off"},name:"input"}]},{tag:"pre",classes:"r2ui-terminal",style:"width:90%;",fit:!0,allowHtml:!0,name:"output"}]}]}],runCommand:function(e,t){if(t.keyCode===13){var n=this.$.input.getValue();this.$.input.setValue(""),function(e){r2.cmd(n,function(t){e.setContent(t)})}(this.$.output)}}}),enyo.kind({name:"Disassembler",kind:"Scroller",tag:"div",style:"margin:0px;background-color:#c0c0c0",data:null,components:[{tag:"div",allowHtml:!0,classes:"colorbar",name:"colorbar"},{tag:"br"},{tag:"div",content:"^",classes:"moreless",ontap:"less"},{tag:"pre",allowHtml:!0,name:"text",content:"..",style:"margin-left:5px"},{tag:"div",content:"v",classes:"moreless",ontap:"more"}],min:0,max:0,block:512,base:"entry0",less:function(){var e=this,t=this.$.text;this.min+=this.block,r2.get_disasm(this.base+"-"+this.min,this.block,function(e){e=docss(r2.filter_asm(e,"pd"));var n=r2ui._dis.getScrollBounds().height;t.setContent(e+t.getContent());var r=r2ui._dis.getScrollBounds().height;r2ui._dis.scrollTo(0,r-n)})},more:function(){var e=this.$.text;this.max+=this.block,r2.get_disasm(this.base+"+"+this.max,this.block,function(t){t=docss(r2.filter_asm(t,"pd")),e.setContent(e.getContent()+t)})},seek:function(e){var t=this.$.text;this.base=e,this.min=this.max=0,r2.get_disasm(e,this.block,function(e){e=docss(r2.filter_asm(e,"pd")),t.setContent(e)}),this.colorbar_create()},create:function(){this.inherited(arguments);var e=this.$.text;this.seek("entry0"),r2ui._dis=this,r2ui.history_push("entry0"),this.colorbar_create()},colorbar_create:function(){var e=this;r2.cmd("pvj 24",function(t){try{var n=JSON.parse(t)}catch(r){alert(r);return}console.log(n);var i="<table class='colorbar'><tr valign=top style='height:8px;border-spacing:0'>",s={flags:"#c0c0c0",comments:"yellow",functions:"#5050f0",strings:"orange"},o="",u="100%",a=16;for(var f=0;f<n.blocks.length;f++){var l=n.blocks[f],c="<div style='overflow:hidden;width:12px;'>____</div>";if(l.offset){var c="<table width='width:100%' height="+a+" style='border-spacing:0px'>",h=0;for(var p in s)l[p]&&h++;h++;if(h==1)break;var d=a/h;for(var p in s){var v=s[p];l[p]&&(c+="<tr><td class='colorbar_item' style='background-color:"+s[p]+"'><div style='width:12px;overflow:"+"hidden;height:"+d+"px'>____</div></td></tr>")}c+="</table>",o="0x"+l.offset.toString(16)}else o="0x"+(n.from+n.blocksize*f).toString(16);i+="<td onclick='r2ui.seek("+o+",true)' title='"+o+"' style='height:"+a+"px' "+"width=15px>"+c+"</td>"}i+="</tr></table>",e.$.colorbar.setContent(i)})}}),enyo.kind({name:"Graph",kind:"Scroller",style:"background-color:#c0c0c0",components:[{tag:"h2",content:"Open graph",style:"margin-left:10px;"},{kind:"Group",classes:"enyo-border-box group",defaultKind:"onyx.Button",components:[{content:"Basic blocks",classes:"onyx-dark menu-button",ontap:"openGraphBB"},{content:"Callgraph",classes:"onyx-dark menu-button",ontap:"openGraphCG"}]}],openGraphBB:function(){window.open("/graph/","_self")},openGraphCG:function(){window.open("/d3/","_self")}}),enyo.kind({name:"Hexdump",kind:"Scroller",tag:"div",style:"margin:0px;background-color:#c0c0c0;color:black",data:null,components:[{tag:"div",allowHtml:!0,classes:"colorbar",name:"colorbar"},{tag:"div",content:"^",classes:"moreless",ontap:"less"},{tag:"pre",allowHtml:!0,name:"text",content:"..",style:"margin-left:5px;color:black"},{tag:"div",content:"v",classes:"moreless",ontap:"more"}],min:0,max:0,block:1024,base:"entry0",less:function(){var e=this,t=this.$.text;this.min+=this.block,r2.get_hexdump(this.base+"-"+this.min,this.block,function(e){e=css(r2.filter_asm(e,"px"));var n=r2ui._hex.getScrollBounds().height;t.setContent(e+t.getContent());var r=r2ui._hex.getScrollBounds().height;r2ui._hex.scrollTo(0,r-n)})},more:function(){var e=this.$.text;this.max+=this.block,r2.get_hexdump(this.base+"+"+this.max,this.block,function(t){t=docss(r2.filter_asm(t,"px")),e.setContent(e.getContent()+t)})},seek:function(e){var t=this.$.text;this.base=e,this.min=this.max=0,r2.get_hexdump(e,this.block,function(e){e=docss(r2.filter_asm(e,"px")),t.setContent(e)}),this.colorbar_create()},create:function(){this.inherited(arguments);var e=this.$.text;this.seek("entry0"),r2ui._hex=this,r2ui.history_push("entry0"),this.colorbar_create()},setupItem:function(e,t){return this.$.msg.setContent(this.data[t.index]),!0},colorbar_create:function(){var e=this;r2.cmd("pvj",function(t){try{var n=JSON.parse(t)}catch(r){alert(r);return}console.log(n);var i="<table class='colorbar'><tr valign=top style='height:20px;border-spacing:0'>",s={flags:"#c0c0c0",comments:"yellow",functions:"#5050f0",strings:"orange"},o="",u=10,a=30;for(var f=0;f<n.blocks.length;f++){var l=n.blocks[f],c="<div style='overflow:hidden;background-color:#404040;width:"+u+"px;'>&nbsp;</div>";if(l.offset){var c="<table height="+a+" style='color:black;border-spacing:0px'>",h=0;for(var p in s)l[p]&&h++;h++;if(h==1)break;var d=a/h;for(var p in s){var v=s[p];l[p]&&(c+="<tr><td style='width:"+u+"px;background-color:"+s[p]+"'><div style='width:"+u+"px;overflow:"+"hidden;height:"+d+"px'>&nbsp;</div></td></tr>")}c+="</table>",o="0x"+l.offset.toString(16)}else o="0x"+(n.from+n.blocksize*f).toString(16);i+="<td onclick='r2ui.seek("+o+",true)' title='"+o+"' style='height:"+a+"px' "+"width=15px>"+c+"</td>"}i+="</tr></table>",e.$.colorbar.setContent(i)})}}),enyo.kind({name:"LeftPanel",classes:"onyx-toolbar",kind:"Scroller",fit:!0,style:"width: 220px;height:100%;margin:0px;",accelerated:!0,horizontal:"hidden",create:function(){this.inherited(arguments),this.$.strategy.setTranslateOptimized=!0},components:[{tag:"center",components:[{tag:"h3",ontap:"openPanel2",content:"radare2",style:"margin:0px;margin-bottom:20px;"},{kind:"Group",onActivate:"buttonActivated",classes:"enyo-border-box group",defaultKind:"onyx.Button",highlander:!0,components:[{content:"Disassembler",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Disassembler",active:!0},{content:"Assembler",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Assembler"},{content:"Hexdump",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Hexdump"},{content:"Graph",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Graph"},{content:"Search",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Search"},{content:"Console",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Console"},{content:"Logs",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Logs"},{content:"Script",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Script"},{content:"Settings",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Settings"},{content:"About",classes:"onyx-dark menu-button",ontap:"openPanel",name:"About"}]}]}],openPanel2:function(){this.ra.setIndex(2)},openPanel:function(e){enyo.Panels.isScreenNarrow()&&this.ra.setIndex(1),e.name==this.oname&&this.ra.setIndex(1),this.oname=e.name,this.openCallback&&this.openCallback(e.name)},oname:null,ra:null,oldSender:null,rowTap:function(e,t){this.oldSender&&this.oldSender.setStyle("width:100%"),e.setStyle("background-color: #202020;width:100%"),this.oldSender=e,this.openCallback&&this.openCallback(t.index)},openCallback:undefined,data:[],iter:1,refresh:function(){this.iter++}}),enyo.kind({name:"Logs",kind:"Scroller",style:"background-color:#c0c0c0;padding-left:8px",components:[{tag:"form",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,classes:"fittable-sample-shadow",components:[{kind:"onyx.InputDecorator",style:"margin-top:8px;background-color:#404040;width: 90%;display:inline-block",components:[{kind:"Input",style:"width:100%;color:white",value:"",onkeydown:"sendMessage",attributes:{autocapitalize:"off"},name:"input"}]},{tag:"pre",classes:"r2ui-terminal",style:"width:90%;",fit:!0,allowHtml:!0,name:"output"}]}]}],logger:null,create:function(){this.inherited(arguments);var e=this.$.output;this.logger=r2.get_logger().on("message",function(t){e.setContent(e.getContent()+t.text+"\n")}),this.logger.autorefresh(3)},sendMessage:function(e,t){if(t.keyCode===13){var n=this.$.input.getValue();this.$.input.setValue(""),this.logger.send(n)}}}),enyo.kind({name:"RadareApp",kind:"Panels",classes:"panels enyo-unselectable",realtimeFit:!0,arrangerKind:"CollapsingArranger",components:[{name:"lp",kind:"LeftPanel"},{name:"mp",kind:"MainPanel"},{name:"rp",kind:"RightPanel"},{kind:enyo.Signals,onkeypress:"handleKeyPress"}],setPanel0:function(){this.$.RadareApp.setIndex(1)},create:function(){this.inherited(arguments);var e=[{name:"Disassembler",active:!0},{name:"Assembler"},{name:"Hexdump"},{name:"Search"},{name:"Console"},{name:"Logs"},{name:"Script"},{name:"Settings",separator:!0},{name:"About"}];this.$.lp.data=e,this.$.mp.data=e,r2ui.ra=this.$.mp.ra=this.$.lp.ra=this.$.rp.ra=this;var t=this.$.mp;r2ui.mp=t,this.$.lp.openCallback=function(e){t.openPage(e)},this.$.lp.refresh()},handleKeyPress:function(inSender,inEvent){for(var key in Config.keys)if(key.substring(0,2)=="C-"){if(inEvent.ctrlKey){var k=key.substring(2).charCodeAt(0);if(inEvent.charCode==k){var cmd=Config.keys[key];eval(cmd+";")}}}else{var k=key.charCodeAt(0);if(inEvent.charCode==k){var cmd=Config.keys[key];eval(cmd+";")}}}}),window.onload=function(){var e=(new RadareApp).renderInto(document.body)},enyo.kind({name:"MainPanel",classes:"onyx",kind:"FittableRows",classes:"enyo-fit",style:"margin:0px;padding:0px;border:0px",data:null,buttonClicked:function(e){alert("let's play!")},cancelClicked:function(e){alert("nothing to see here! move along.")},inputKey:function(e,t){if(t.keyCode===13){var n=this.$.input.getValue();r2ui.opendis(n)}},goRename:function(){var e=prompt("New name?","");e&&r2.cmd("afr "+e,function(){r2ui.seek("$$",!0)})},goComment:function(){var e=prompt("Comment?","");e&&r2.cmd("CC "+e,function(){r2ui.seek("$$",!0)})},goFlag:function(){var e=prompt("Flag name?","");e&&r2.cmd("f "+e,function(){r2ui.seek("$$",!0)})},goUnflag:function(){r2.cmd("f-$$",function(){r2ui.seek("$$",!0)})},goAnalyze:function(){r2.cmd("af",function(){r2ui.seek("$$",!0)})},goCopy:function(){var e=prompt("How many bytes?","");e&&r2.cmd("y "+e,function(){r2ui.seek("$$",!0)})},goPaste:function(){r2.cmd("yy",function(){r2ui.seek("$$",!0)})},wrString:function(){var e=prompt("Text","");e&&r2.cmd("w "+e,function(){r2ui.seek("$$",!0)})},wrOpcode:function(){var e=prompt("Opcode","");e&&r2.cmd("wa "+e,function(){r2ui.seek("$$",!0)})},wrFile:function(){var e=prompt("Filename","");e&&r2.cmd("wf "+e,function(){r2ui.seek("$$",!0)})},wrHex:function(){var e=prompt("Hexpair","");e&&r2.cmd("wx "+e,function(){r2ui.seek("$$",!0)})},coCode:function(){var e=prompt("How many bytes?","");e&&r2.cmd("y "+e,function(){r2ui.seek("$$",!0)})},coString:function(){r2.cmd("Cz",function(){r2ui.seek("$$",!0)})},coData:function(){var e=prompt("How many bytes?","");e&&r2.cmd("Cd "+e,function(){r2ui.seek("$$",!0)})},setTitle:function(e){e?(this.$.title.setContent(e),this.$.title.setStyle("visibility:visible;top:8px"),this.$.extra.setStyle("visibility:hidden;")):(this.$.title.setStyle("visibility:hidden"),this.$.extra.setStyle("visibility:visible;"))},components:[{kind:"onyx.Toolbar",components:[{kind:"onyx.Button",content:"[",ontap:"openSidebar",classes:"top"},{kind:"onyx.Button",content:"]",ontap:"openSidebar2",classes:"top"},{name:"title",tag:"h2",content:"Assembler",classes:"topbox",style:"visibility:hidden;"},{name:"extra",tag:"div",classes:"topbox",components:[{kind:"onyx.PickerDecorator",classes:"top",components:[{kind:"onyx.Button",content:"Actions"},{kind:"onyx.Picker",components:[{content:"Analyze",ontap:"goAnalyze"},{content:"Rename",ontap:"goRename"},{content:"Comment",ontap:"goComment"},{content:"Flag",ontap:"goFlag"},{content:"Unflag",ontap:"goUnflag"},{content:"Copy",ontap:"goCopy"},{content:"Paste",ontap:"goPaste"}]}]},{kind:"onyx.Button",content:"<",ontap:"prevSeek",classes:"top",style:"top:10px"},{kind:"onyx.Button",content:">",ontap:"nextSeek",classes:"top",style:"top:10px"},{kind:"onyx.InputDecorator",style:"width: 200px;top:10px",classes:"top",components:[{kind:"onyx.Input",name:"input",value:"entry0",onchange:"gotoSeek",onkeydown:"inputKey"}]},{kind:"onyx.PickerDecorator",classes:"top",components:[{kind:"onyx.Button",content:"Convert"},{kind:"onyx.Picker",components:[{content:"Data",ontap:"coData"},{content:"Code",ontap:"coCode"},{content:"String",ontap:"coString"}]}]},{kind:"onyx.PickerDecorator",classes:"top",components:[{kind:"onyx.Button",content:"Write"},{kind:"onyx.Picker",components:[{content:"File",ontap:"wrFile"},{content:"Hexpair",ontap:"wrHex"},{content:"String",ontap:"wrString"},{content:"Opcode",ontap:"wrOpcode"}]}]}]}]},{kind:"Panels",name:"panels",fit:!0,draggable:!1,realtimeFit:!0,components:[{kind:"Disassembler",name:"pageDisassembler"},{kind:"Assembler",name:"pageAssembler"},{kind:"Hexdump",name:"pageHexdump"},{kind:"Graph",name:"pageGraph"},{kind:"Search",name:"pageSearch"},{kind:"Console",name:"pageConsole"},{kind:"Logs",name:"pageLogs"},{kind:"Script",name:"pageScript"},{kind:"Settings",name:"pageSettings"},{kind:"About",name:"pageAbout"}]}],create:function(){this.inherited(arguments),r2ui.panels=this.$.panels,this.$.panels.setIndex(0)},ra:null,openSidebar:function(){this.ra.setIndex(this.ra.index?0:1)},openSidebar2:function(){this.ra.setIndex(2)},rendered:function(){this.inherited(arguments)},openPage:function(idx){var str,sp=this.$.panels,r=-1;switch(idx){case"Disassembler":r=0;break;case"Assembler":r=1;break;case"Hexdump":r=2;break;case"Graph":r=3;break;case"Search":r=4;break;case"Console":r=5;break;case"Logs":r=6;break;case"Script":r=7;break;case"Settings":r=8;break;case"About":r=9}if(r==-1){sp.setIndex(idx);return}eval("var x = this.$.page"+idx);switch(r){case 0:case 2:this.setTitle();break;default:this.setTitle(idx)}sp.setIndex(r)},seekStack:[],nextSeek:function(){var e=r2ui.history_next();if(!e)return;r2ui.seek(e,!0)},prevSeek:function(){var e=r2ui.history_prev();if(!e)return;r2ui.seek(e,!0)},gotoSeek:function(){var e=this.$.input.getValue();e[0]=="!"?r2.cmd(e.slice(1),function(e){alert(e)}):this.seekStack.push()}});var r2={},backward=!1,next_curoff=0,next_lastoff=0,prev_curoff=0,prev_lastoff=0;r2.root="",r2.assemble=function(e,t,n){var r=e?"@"+e:"";r2.cmd('"pa '+t+'"'+r,n)},r2.disassemble=function(e,t,n){var r=e?"@"+e:"",i="pi @b:"+t+r;r2.cmd(i,n)},r2.get_hexdump=function(e,t,n){r2.cmd("px "+t+"@"+e,n)},r2.get_disasm=function(e,t,n){r2.cmd("pD "+t+"@"+e,n)},r2.config_set=function(e){},r2.config_get=function(e){},r2.set_flag_space=function(e,t){r2.cmd("fs "+e,t)},r2.set_flag_space=function(e,t){r2.cmd("fs "+e,t)},r2.get_flags=function(e){r2.cmd("fj",function(t){e(t?JSON.parse(t):[])})},r2.get_opcodes=function(e,t,n){r2.cmd("pdj @"+e+"!"+t,function(e){n(JSON.parse(e))})},r2.get_bytes=function(e,t,n){r2.cmd("pcj @"+e+"!"+t,function(e){n(JSON.parse(e))})},r2.get_info=function(e){r2.cmd("ij",function(t){e(JSON.parse(t))})},r2.bin_imports=function(e){r2.cmd("iij",function(t){e(JSON.parse(t))})},r2.bin_symbols=function(e){r2.cmd("isj",function(t){e(JSON.parse(t))})},r2.bin_sections=function(e){r2.cmd("iSj",function(t){e(JSON.parse(t))})},r2.cmds=function(e,t){function r(){if(n==undefined||e.length==0)return;n=e[0],e=e.splice(1),r2.cmd(n,r),t&&t();return}if(e.length==0)return;var n=e[0];e=e.splice(1),r2.cmd(n,r)},r2.cmd=function(e,t){Ajax("GET",r2.root+"/cmd/"+encodeURI(e),"",function(e){t&&t(e)})},r2.alive=function(e){r2.cmd("b",function(t){var n=!1;t&&t.length()>0&&(n=!0),e&&e(t)})},r2.get_logger=function(e){return typeof e!="object"&&(e={}),e.last=0,e.events={},e.interval=null,r2.cmd("ll",function(t){e.last=+t}),e.load=function(t){r2.cmd("lj "+(e.last+1),function(e){t&&t(JSON.parse(e))})},e.clear=function(e){r2.cmd("l-",e)},e.send=function(e,t){r2.cmd("l "+e,t)},e.refresh=function(t){e.load(function(n){for(var r=0;r<n.length;r++){var i=n[r];e.events.message({id:i[0],text:i[1]}),i[0]>e.last&&(e.last=i[0])}t&&t()})},e.autorefresh=function(t){function n(){return e.refresh(function(){}),setTimeout(n,t*1e3),!0}if(!t){e.interval&&e.interval.stop();return}e.interval=setTimeout(n,t*1e3)},e.on=function(t,n){return e.events[t]=n,e},e},r2.filter_asm=function(e,t){function m(e){return e[0]=="p"&&e[1]=="d"?!0:e.indexOf(";pd")!=-1?!0:!1}var n=backward?prev_curoff:next_curoff,r=backward?prev_lastoff:next_lastoff,i=e.split(/\n/g);r2.cmd("s",function(e){n=e});for(var s=i.length-1;s>0;s--){var o=i[s].match(/0x([a-fA-F0-9]+)/);if(o&&o.length>0){r=o[0].replace(/:/g,"");break}}if(t=="afl"){var u="";for(var s=0;s<i.length;s++){var a=i[s].replace(/\ +/g," ").split(/ /g);u+=a[0]+"  "+a[3]+"\n"}e=u}else if(t[0]=="f"){if(t[1]=="s"){var u="";for(var s=0;s<i.length;s++){var a=i[s].replace(/\ +/g," ").split(/ /g),f=a[1]=="*"?"*":" ",l=a[2]?a[2]:a[1];if(!l)continue;u+=a[0]+" "+f+" <a href=\"javascript:runcmd('fs "+l+"')\">"+l+"</a>\n"}e=u}}else if(t[0]=="i"&&t[1]){var u="";for(var s=0;s<i.length;s++){var c=i[s].split(/ /g),h="",p="";for(var d=0;d<c.length;d++){var v=c[d].split(/=/);v[0]=="addr"&&(p=v[1]),v[0]=="name"&&(h=v[1]),v[0]=="string"&&(h=v[1])}u+=p+"  "+h+"\n"}e=u}return m(t)&&(e=e.replace(/function:/g,"<span style=color:green>function:</span>"),e=e.replace(/;(\s+)/g,";"),e=e.replace(/;(.*)/g,"// <span style='color:#209020'>$1</span>"),e=e.replace(/(bl|goto|call)/g,"<b style='color:green'>call</b>"),e=e.replace(/(jmp|bne|beq|js|jnz|jae|jge|jbe|jg|je|jl|jz|jb|ja|jne)/g,"<b style='color:green'>$1</b>"),e=e.replace(/(dword|qword|word|byte|movzx|movsxd|cmovz|mov\ |lea\ )/g,"<b style='color:#1070d0'>$1</b>"),e=e.replace(/(hlt|leave|iretd|retn|ret)/g,"<b style='color:red'>$1</b>"),e=e.replace(/(add|sbb|sub|mul|div|shl|shr|and|not|xor|inc|dec|sar|sal)/g,"<b style='color:#d06010'>$1</b>"),e=e.replace(/(push|pop)/g,"<b style='color:#40a010'>$1</b>"),e=e.replace(/(test|cmp)/g,"<b style='color:#c04080'>$1</b>"),e=e.replace(/(outsd|out|string|invalid|int |int3|trap|main|in)/g,"<b style='color:red'>$1</b>"),e=e.replace(/nop/g,"<b style='color:blue'>nop</b>"),e=e.replace(/(sym|fcn|str|imp|loc).([^:<(\\\/ \|)\->]+)/g,"<a href='javascript:r2ui.seek(\"$1.$2\")'>$1.$2</a>")),e=e.replace(/0x([a-zA-Z0-9]+)/g,"<a href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),backward?(prev_curoff=n,prev_lastoff=r):(next_curoff=n,next_lastoff=r,prev_curoff||(prev_curoff=next_curoff)),e};var r2ui={};r2ui.history=[],r2ui.history_idx=0,r2ui.history_push=function(e){r2ui.history_idx!=r2ui.history.length&&(r2ui.history=r2ui.history.splice(0,r2ui.history_idx)),r2ui.history_idx++,r2ui.history.push(e)},r2ui.history_pop=function(){return r2ui.history_idx==r2ui.history.length&&r2ui.history_idx--,r2ui.history.pop()},r2ui.history_prev=function(){r2ui.history_idx>1&&r2ui.history_idx--;var e=r2ui.history[r2ui.history_idx-1];return e},r2ui.history_next=function(){var e=r2ui.history[r2ui.history_idx];return r2ui.history_idx<r2ui.history.length&&r2ui.history_idx++,e},r2ui.seek=function(e,t){r2ui.history_push(e),r2ui.ra.getIndex()==2&&r2ui.ra.setIndex(1),r2.cmd("s "+e,function(){r2ui._dis.seek(e),r2ui._dis.scrollTo(0,0),r2ui._hex.seek(e),r2ui._hex.scrollTo(0,0)})},r2ui.seek_prev=function(){var e=r2ui.history.pop();r2.cmd("s "+e,function(){r2ui._dis.seek(e),r2ui._dis.scrollTo(0,0),r2ui._hex.seek(e),r2ui._hex.scrollTo(0,0)})},r2ui.openpage=function(e,t){t===undefined?(t=e,e=undefined):e!==undefined&&r2ui.seek(e),r2ui.ra.getIndex()==2&&r2ui.ra.setIndex(1),r2ui.mp.openPage(t)},r2ui.opendis=function(e){r2ui.openpage(e,0)},r2ui.openhex=function(e){r2ui.openpage(e,2)},enyo.kind({name:"RightPanel",style:"background-color:#404040;",classes:"onyx-toolbar",kind:"FittableRows",ra:null,components:[{kind:"FittableColumns",style:"margin-bottom:5px",components:[{kind:"onyx.Button",content:"[",ontap:"closeSidebar",style:"padding:8px;margin-right:8px"},{onup:"toggleScroll",style:"position:absolute;left:40px;top:0px;",kind:"onyx.MenuDecorator",onSelect:"itemSelected",components:[{content:"List elements"},{kind:"onyx.Menu",showOnTop:!0,maxHeight:290,name:"menu",style:"height:300px",components:[{content:"flags",value:"2"},{content:"flagspaces",value:"2"},{classes:"onyx-menu-divider"},{content:"strings",value:"1"},{content:"symbols",value:"1"},{content:"imports",value:"1"},{content:"functions",value:"1"},{content:"comments",value:"1"},{classes:"onyx-menu-divider"},{content:"registers",value:"1"},{content:"stack",value:"2"},{content:"backtrace",value:"3"}]}]}]},{kind:"Scroller",animated:!1,fit:!0,horizontal:!1,name:"scroll",components:[{tag:"pre",style:"font-size:14px",allowHtml:!0,name:"output",content:".."}]}],toggleScroll:function(){var e=this.$.menu.getShowing();this.$.scroll.setShowing(e)},rowTap:function(){},create:function(){this.inherited(arguments)},data:[],setupItem:function(e,t){var n=this.data[t.index];if(!n)return!1;var r=n.name+" "+n.offset;return console.log(r),this.$.msg.setContent(r),!0},refresh:function(){},itemSelected:function(e,t){var n=this,r=t.originator.content,i=this.$.menu.getShowing();r2ui.rp=n,this.$.scroll.setShowing(!i),this.$.menu.setShowing(!1),this.$.scroll.scrollToTop();switch(r){case"comments":r2.cmd("CC*",function(e){e=e.replace(/0x([a-zA-Z0-9]*)/g,"<a style='color:yellow' href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),n.$.output.setContent(e)});break;case"functions":r2.cmd("afl",function(e){e=e.replace(/0x([a-zA-Z0-9]*)/g,"<a style='color:yellow' href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),n.$.output.setContent(e)});break;case"flagspaces":this.updateFlagspace();break;case"strings":r2.cmd("izj",function(e){var t=JSON.parse(e),r="";for(var i in t){var s=(+t[i].offset).toString(16);r+='<a style="color:yellow" href="javascript:r2ui.opendis(0x'+s+')">0x'+s+"</a> "+t[i].string+"<br />"}n.$.output.setContent(r)});break;case"sections":r2.bin_sections(function(e){n.$.output.setContent(makelist(e))});break;case"symbols":r2.bin_symbols(function(e){n.$.output.setContent(makelist(e))});break;case"imports":r2.bin_imports(function(e){n.$.output.setContent(makelist(e))});break;case"flags":r2.get_flags(function(e){n.data=e,n.$.output.setContent(makelist(e)),n.refresh()})}},closeSidebar:function(){this.ra.setIndex(1)},selectFlagspace:function(e){r2.cmd("fs "+e,function(e){r2ui.rp.updateFlagspace()})},updateFlagspace:function(){var e=r2ui.rp;r2.cmd("fsj",function(t){var n=JSON.parse(t),r="";for(var i in n){var s=n[i].name,o=n[i].selected;r+='<a style="color:yellow" href="javascript:r2ui.rp.selectFlagspace(\''+s+"')\">"+s+"</a> "+(o?"  (selected)":"")+"<br />"}e.$.output.setContent(r)})}}),enyo.kind({name:"Script",kind:"Scroller",style:"background-color:#c0c0c0",clear:function(){with(this.$.input)setContent(value=""),render()},demo:function(){with(this.$.input)setContent(value=['r2.disassemble (0, "9090", function(text) {',"  show (text)","  show ()",'  r2.assemble (0, "mov eax, 33", function (text) {',"    show (text);","  });","  show (r2)","});"].join("\n")),render()},run:function(){function show(e){if(!e)out+="\n";else if(typeof e=="object"){out+="{";for(var t in e){var n=e[t];out+=t+": "+n+"\n , "}out+="}"}else out+=e+"\n"}var code=this.$.input.value,out="";try{eval(code),this.$.output.setContent(out)}catch(e){alert(e)}},components:[{tag:"p",style:"margin-left:10px",components:[{kind:"onyx.Button",content:"Run",classes:"sourcebutton",ontap:"run"},{kind:"onyx.Button",content:"Clear",classes:"sourcebutton",ontap:"clear"},{kind:"onyx.Button",content:"Demo",classes:"sourcebutton",ontap:"demo"}]},{kind:"onyx.TextArea",name:"input",classes:"sourcecode"},{tag:"pre",name:"output",style:"margin-left:12px"}]}),enyo.kind({name:"Search",kind:"Scroller",style:"background-color:#303030",components:[{tag:"center",components:[{tag:"h1",style:"color:#f0f0f0",content:"TODO: Search"}]}]}),enyo.kind({name:"Settings",classes:"panels-sample-sliding-content r2panel",kind:"Scroller",tag:"div",style:"color:black !important;padding:0px;margin:0px;border:0px;overflow:hidden",components:[{kind:"FittableRows",fit:!1,components:[{tag:"h2",content:"General"},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Two panels",classes:"rowline"},{kind:"onyx.ToggleButton",name:"twopanels"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Edit keybindings",classes:"rowline"},{kind:"onyx.Button",content:"+"}]}]},{kind:"FittableRows",fit:!1,components:[{tag:"h2",content:"Target"},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Arch",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",name:"arch",components:[{content:"arc"},{content:"arm"},{content:"avr"},{content:"ppc"},{content:"bf"},{content:"dalvik"},{content:"dcpu16"},{content:"i8080"},{content:"java"},{content:"m68k"},{content:"mips"},{content:"msil"},{content:"rar"},{content:"sh"},{content:"sparc"},{content:"x86",active:!0},{content:"z80"}]}]}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Bits",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",name:"bits",components:[{content:"8"},{content:"16"},{content:"32",active:!0},{content:"64"}]}]}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Endian",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",components:[{content:"little",active:!0},{content:"big"}]}]}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"OS",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",components:[{content:"linux",active:!0},{content:"darwin"},{content:"w32"},{content:"dos"}]}]}]},{tag:"h2",content:"Disassembly"},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show bytes",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_bytes"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show offsets",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_offset"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show lines",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_lines"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Pseudo",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_pseudo"}]}]},{tag:"h2",content:"Save changes?"},{tag:"div",style:"margin-left:50px",components:[{ontap:"reset",kind:"onyx.Button",style:"position:relative;left:0px",content:"Reset"},{ontap:"save",kind:"onyx.Button",style:"position:relative;left:50px",content:"Save",classes:"onyx-affirmative"}]},{tag:"div",style:"height:64px"}],load:function(){var e=this;e.$.twopanels.setActive(document.referrer.indexOf("/two")!=-1),r2.cmd("e asm.bytes",function(t){e.$.toggle_bytes.setActive(t[0]=="t")}),r2.cmd("e asm.pseudo",function(t){e.$.toggle_pseudo.setActive(t[0]=="t")}),r2.cmd("e asm.offset",function(t){e.$.toggle_offset.setActive(t[0]=="t")})},create:function(){this.inherited(arguments),this.load()},save:function(){var e=this.$.arch.selected.content,t=this.$.bits.selected.content,n=this.$.toggle_bytes.active,r=this.$.toggle_pseudo.active,i=this.$.toggle_offset.active,s=this.$.twopanels.active;r2.cmds(["e asm.arch="+e,"e asm.bits="+t,"e asm.bytes="+n,"e asm.offset="+i,"e asm.pseudo="+r]),s?window.parent.location="/enyo/two":window.parent.location="/enyo/",r2ui.seek("$$",!0)},reset:function(){this.load()}});