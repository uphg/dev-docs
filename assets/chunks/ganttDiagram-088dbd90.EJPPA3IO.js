import{aV as N,A as it,v as le,x as ue,Z as de,$ as fe,z as he,y as me,D as ke,a1 as ye,N as ge,I as Ct,H as kt,aW as ve,aX as pe,aY as be,J as Te,aZ as xe,a_ as we,a$ as _e,b0 as Rt,b1 as Ht,b2 as Xt,b3 as Gt,b4 as Ut,b5 as De,L as Se,a0 as Ce,b6 as Ee,b7 as Me,b8 as Ae,b9 as Ie,ba as Ye,bb as Le,bc as Fe}from"./vitepress-plugin-mermaid.ffrRrlqL.js";import"./vue.6z6dcVl3.js";import"./elkjs.1qYwlUPK.js";var Dt="day",We="week",ze="year",Ve="YYYY-MM-DDTHH:mm:ssZ",Oe="isoweek";const Pe=function(t,n,i){var e=function(g,S){var _=(S?i.utc:i)().year(g).startOf(ze),E=4-_.isoWeekday();return _.isoWeekday()>4&&(E+=7),_.add(E,Dt)},r=function(g){return g.add(4-g.isoWeekday(),Dt)},o=n.prototype;o.isoWeekYear=function(){var y=r(this);return y.year()},o.isoWeek=function(y){if(!this.$utils().u(y))return this.add((y-this.isoWeek())*7,Dt);var g=r(this),S=e(this.isoWeekYear(),this.$u);return g.diff(S,We)+1},o.isoWeekday=function(y){return this.$utils().u(y)?this.day()||7:this.day(this.day()%7?y:y-7)};var l=o.startOf;o.startOf=function(y,g){var S=this.$utils(),_=S.u(g)?!0:g,E=S.p(y);return E===Oe?_?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):l.bind(this)(y,g)}};var Ne=function(n){return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(i,e,r){return e||r.slice(1)})},Be={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Re=function(n,i){return n.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(e,r,o){var l=o&&o.toUpperCase();return r||i[o]||Be[o]||Ne(i[l])})},He=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,Xe=/\d/,yt=/\d\d/,Ge=/\d{3}/,Ue=/\d{4}/,H=/\d\d?/,Ze=/[+-]?\d+/,qe=/[+-]\d\d:?(\d\d)?|Z/,ct=/\d*[^-_:/,()\s\d]+/,$={},Jt=function(n){return n=+n,n+(n>68?1900:2e3)};function je(t){if(!t||t==="Z")return 0;var n=t.match(/([+-]|\d\d)/g),i=+(n[1]*60)+(+n[2]||0);return i===0?0:n[0]==="+"?-i:i}var P=function(n){return function(i){this[n]=+i}},Zt=[qe,function(t){var n=this.zone||(this.zone={});n.offset=je(t)}],St=function(n){var i=$[n];return i&&(i.indexOf?i:i.s.concat(i.f))},qt=function(n,i){var e,r=$,o=r.meridiem;if(!o)e=n===(i?"pm":"PM");else for(var l=1;l<=24;l+=1)if(n.indexOf(o(l,0,i))>-1){e=l>12;break}return e},Qe={A:[ct,function(t){this.afternoon=qt(t,!1)}],a:[ct,function(t){this.afternoon=qt(t,!0)}],S:[Xe,function(t){this.milliseconds=+t*100}],SS:[yt,function(t){this.milliseconds=+t*10}],SSS:[Ge,function(t){this.milliseconds=+t}],s:[H,P("seconds")],ss:[H,P("seconds")],m:[H,P("minutes")],mm:[H,P("minutes")],H:[H,P("hours")],h:[H,P("hours")],HH:[H,P("hours")],hh:[H,P("hours")],D:[H,P("day")],DD:[yt,P("day")],Do:[ct,function(t){var n=$,i=n.ordinal,e=t.match(/\d+/);if(this.day=e[0],!!i)for(var r=1;r<=31;r+=1)i(r).replace(/\[|\]/g,"")===t&&(this.day=r)}],M:[H,P("month")],MM:[yt,P("month")],MMM:[ct,function(t){var n=St("months"),i=St("monthsShort"),e=(i||n.map(function(r){return r.slice(0,3)})).indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],MMMM:[ct,function(t){var n=St("months"),i=n.indexOf(t)+1;if(i<1)throw new Error;this.month=i%12||i}],Y:[Ze,P("year")],YY:[yt,function(t){this.year=Jt(t)}],YYYY:[Ue,P("year")],Z:Zt,ZZ:Zt};function Je(t){var n=t.afternoon;if(n!==void 0){var i=t.hours;n?i<12&&(t.hours+=12):i===12&&(t.hours=0),delete t.afternoon}}function $e(t){t=Re(t,$&&$.formats);for(var n=t.match(He),i=n.length,e=0;e<i;e+=1){var r=n[e],o=Qe[r],l=o&&o[0],y=o&&o[1];y?n[e]={regex:l,parser:y}:n[e]=r.replace(/^\[|\]$/g,"")}return function(g){for(var S={},_=0,E=0;_<i;_+=1){var W=n[_];if(typeof W=="string")E+=W.length;else{var Y=W.regex,I=W.parser,v=g.slice(E),V=Y.exec(v),B=V[0];I.call(S,B),g=g.replace(B,"")}}return Je(S),S}}var Ke=function(n,i,e){try{if(["x","X"].indexOf(i)>-1)return new Date((i==="X"?1e3:1)*n);var r=$e(i),o=r(n),l=o.year,y=o.month,g=o.day,S=o.hours,_=o.minutes,E=o.seconds,W=o.milliseconds,Y=o.zone,I=new Date,v=g||(!l&&!y?I.getDate():1),V=l||I.getFullYear(),B=0;l&&!y||(B=y>0?y-1:I.getMonth());var q=S||0,j=_||0,Q=E||0,J=W||0;return Y?new Date(Date.UTC(V,B,v,q,j,Q,J+Y.offset*60*1e3)):e?new Date(Date.UTC(V,B,v,q,j,Q,J)):new Date(V,B,v,q,j,Q,J)}catch{return new Date("")}};const ti=function(t,n,i){i.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(Jt=t.parseTwoDigitYear);var e=n.prototype,r=e.parse;e.parse=function(o){var l=o.date,y=o.utc,g=o.args;this.$u=y;var S=g[1];if(typeof S=="string"){var _=g[2]===!0,E=g[3]===!0,W=_||E,Y=g[2];E&&(Y=g[2]),$=this.$locale(),!_&&Y&&($=i.Ls[Y]),this.$d=Ke(l,S,y),this.init(),Y&&Y!==!0&&(this.$L=this.locale(Y).$L),W&&l!=this.format(S)&&(this.$d=new Date("")),$={}}else if(S instanceof Array)for(var I=S.length,v=1;v<=I;v+=1){g[1]=S[v-1];var V=i.apply(this,g);if(V.isValid()){this.$d=V.$d,this.$L=V.$L,this.init();break}v===I&&(this.$d=new Date(""))}else r.call(this,o)}},ei=function(t,n){var i=n.prototype,e=i.format;i.format=function(r){var o=this,l=this.$locale();if(!this.isValid())return e.bind(this)(r);var y=this.$utils(),g=r||Ve,S=g.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(_){switch(_){case"Q":return Math.ceil((o.$M+1)/3);case"Do":return l.ordinal(o.$D);case"gggg":return o.weekYear();case"GGGG":return o.isoWeekYear();case"wo":return l.ordinal(o.week(),"W");case"w":case"ww":return y.s(o.week(),_==="w"?1:2,"0");case"W":case"WW":return y.s(o.isoWeek(),_==="W"?1:2,"0");case"k":case"kk":return y.s(String(o.$H===0?24:o.$H),_==="k"?1:2,"0");case"X":return Math.floor(o.$d.getTime()/1e3);case"x":return o.$d.getTime();case"z":return"["+o.offsetName()+"]";case"zzz":return"["+o.offsetName("long")+"]";default:return _}});return e.bind(this)(S)}};var Et=function(){var t=function(w,u,d,h){for(d=d||{},h=w.length;h--;d[w[h]]=u);return d},n=[1,3],i=[1,5],e=[7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],r=[1,32],o=[1,33],l=[1,34],y=[1,35],g=[1,36],S=[1,37],_=[1,38],E=[1,15],W=[1,16],Y=[1,17],I=[1,18],v=[1,19],V=[1,20],B=[1,21],q=[1,22],j=[1,24],Q=[1,25],J=[1,26],at=[1,27],dt=[1,28],k=[1,30],x=[1,39],b=[1,42],p=[5,7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],m={trace:function(){},yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,weekday:12,weekday_monday:13,weekday_tuesday:14,weekday_wednesday:15,weekday_thursday:16,weekday_friday:17,weekday_saturday:18,weekday_sunday:19,dateFormat:20,inclusiveEndDates:21,topAxis:22,axisFormat:23,tickInterval:24,excludes:25,includes:26,todayMarker:27,title:28,acc_title:29,acc_title_value:30,acc_descr:31,acc_descr_value:32,acc_descr_multiline_value:33,section:34,clickStatement:35,taskTxt:36,taskData:37,openDirective:38,typeDirective:39,closeDirective:40,":":41,argDirective:42,click:43,callbackname:44,callbackargs:45,href:46,clickStatementDebug:47,open_directive:48,type_directive:49,arg_directive:50,close_directive:51,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",13:"weekday_monday",14:"weekday_tuesday",15:"weekday_wednesday",16:"weekday_thursday",17:"weekday_friday",18:"weekday_saturday",19:"weekday_sunday",20:"dateFormat",21:"inclusiveEndDates",22:"topAxis",23:"axisFormat",24:"tickInterval",25:"excludes",26:"includes",27:"todayMarker",28:"title",29:"acc_title",30:"acc_title_value",31:"acc_descr",32:"acc_descr_value",33:"acc_descr_multiline_value",34:"section",36:"taskTxt",37:"taskData",41:":",43:"click",44:"callbackname",45:"callbackargs",46:"href",48:"open_directive",49:"type_directive",50:"arg_directive",51:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[35,2],[35,3],[35,3],[35,4],[35,3],[35,4],[35,2],[47,2],[47,3],[47,3],[47,4],[47,3],[47,4],[47,2],[38,1],[39,1],[42,1],[40,1]],performAction:function(u,d,h,f,c,s,C){var a=s.length-1;switch(c){case 2:return s[a-1];case 3:this.$=[];break;case 4:s[a-1].push(s[a]),this.$=s[a-1];break;case 5:case 6:this.$=s[a];break;case 7:case 8:this.$=[];break;case 9:f.setWeekday("monday");break;case 10:f.setWeekday("tuesday");break;case 11:f.setWeekday("wednesday");break;case 12:f.setWeekday("thursday");break;case 13:f.setWeekday("friday");break;case 14:f.setWeekday("saturday");break;case 15:f.setWeekday("sunday");break;case 16:f.setDateFormat(s[a].substr(11)),this.$=s[a].substr(11);break;case 17:f.enableInclusiveEndDates(),this.$=s[a].substr(18);break;case 18:f.TopAxis(),this.$=s[a].substr(8);break;case 19:f.setAxisFormat(s[a].substr(11)),this.$=s[a].substr(11);break;case 20:f.setTickInterval(s[a].substr(13)),this.$=s[a].substr(13);break;case 21:f.setExcludes(s[a].substr(9)),this.$=s[a].substr(9);break;case 22:f.setIncludes(s[a].substr(9)),this.$=s[a].substr(9);break;case 23:f.setTodayMarker(s[a].substr(12)),this.$=s[a].substr(12);break;case 25:f.setDiagramTitle(s[a].substr(6)),this.$=s[a].substr(6);break;case 26:this.$=s[a].trim(),f.setAccTitle(this.$);break;case 27:case 28:this.$=s[a].trim(),f.setAccDescription(this.$);break;case 29:f.addSection(s[a].substr(8)),this.$=s[a].substr(8);break;case 31:f.addTask(s[a-1],s[a]),this.$="task";break;case 35:this.$=s[a-1],f.setClickEvent(s[a-1],s[a],null);break;case 36:this.$=s[a-2],f.setClickEvent(s[a-2],s[a-1],s[a]);break;case 37:this.$=s[a-2],f.setClickEvent(s[a-2],s[a-1],null),f.setLink(s[a-2],s[a]);break;case 38:this.$=s[a-3],f.setClickEvent(s[a-3],s[a-2],s[a-1]),f.setLink(s[a-3],s[a]);break;case 39:this.$=s[a-2],f.setClickEvent(s[a-2],s[a],null),f.setLink(s[a-2],s[a-1]);break;case 40:this.$=s[a-3],f.setClickEvent(s[a-3],s[a-1],s[a]),f.setLink(s[a-3],s[a-2]);break;case 41:this.$=s[a-1],f.setLink(s[a-1],s[a]);break;case 42:case 48:this.$=s[a-1]+" "+s[a];break;case 43:case 44:case 46:this.$=s[a-2]+" "+s[a-1]+" "+s[a];break;case 45:case 47:this.$=s[a-3]+" "+s[a-2]+" "+s[a-1]+" "+s[a];break;case 49:f.parseDirective("%%{","open_directive");break;case 50:f.parseDirective(s[a],"type_directive");break;case 51:s[a]=s[a].trim().replace(/'/g,'"'),f.parseDirective(s[a],"arg_directive");break;case 52:f.parseDirective("}%%","close_directive","gantt");break}},table:[{3:1,4:2,5:n,38:4,48:i},{1:[3]},{3:6,4:2,5:n,38:4,48:i},t(e,[2,3],{6:7}),{39:8,49:[1,9]},{49:[2,49]},{1:[2,1]},{4:31,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:23,13:r,14:o,15:l,16:y,17:g,18:S,19:_,20:E,21:W,22:Y,23:I,24:v,25:V,26:B,27:q,28:j,29:Q,31:J,33:at,34:dt,35:29,36:k,38:4,43:x,48:i},{40:40,41:[1,41],51:b},t([41,51],[2,50]),t(e,[2,8],{1:[2,2]}),t(e,[2,4]),{4:31,10:43,12:23,13:r,14:o,15:l,16:y,17:g,18:S,19:_,20:E,21:W,22:Y,23:I,24:v,25:V,26:B,27:q,28:j,29:Q,31:J,33:at,34:dt,35:29,36:k,38:4,43:x,48:i},t(e,[2,6]),t(e,[2,7]),t(e,[2,16]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),{30:[1,44]},{32:[1,45]},t(e,[2,28]),t(e,[2,29]),t(e,[2,30]),{37:[1,46]},t(e,[2,32]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),{44:[1,47],46:[1,48]},{11:[1,49]},{42:50,50:[1,51]},{11:[2,52]},t(e,[2,5]),t(e,[2,26]),t(e,[2,27]),t(e,[2,31]),t(e,[2,35],{45:[1,52],46:[1,53]}),t(e,[2,41],{44:[1,54]}),t(p,[2,33]),{40:55,51:b},{51:[2,51]},t(e,[2,36],{46:[1,56]}),t(e,[2,37]),t(e,[2,39],{45:[1,57]}),{11:[1,58]},t(e,[2,38]),t(e,[2,40]),t(p,[2,34])],defaultActions:{5:[2,49],6:[2,1],42:[2,52],51:[2,51]},parseError:function(u,d){if(d.recoverable)this.trace(u);else{var h=new Error(u);throw h.hash=d,h}},parse:function(u){var d=this,h=[0],f=[],c=[null],s=[],C=this.table,a="",T=0,z=0,A=2,ft=1,bt=s.slice.call(arguments,1),F=Object.create(this.lexer),K={yy:{}};for(var Tt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Tt)&&(K.yy[Tt]=this.yy[Tt]);F.setInput(u,K.yy),K.yy.lexer=F,K.yy.parser=this,typeof F.yylloc>"u"&&(F.yylloc={});var xt=F.yylloc;s.push(xt);var ce=F.options&&F.options.ranges;typeof K.yy.parseError=="function"?this.parseError=K.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function oe(){var U;return U=f.pop()||F.lex()||ft,typeof U!="number"&&(U instanceof Array&&(f=U,U=f.pop()),U=d.symbols_[U]||U),U}for(var O,tt,R,wt,et={},ht,G,Bt,mt;;){if(tt=h[h.length-1],this.defaultActions[tt]?R=this.defaultActions[tt]:((O===null||typeof O>"u")&&(O=oe()),R=C[tt]&&C[tt][O]),typeof R>"u"||!R.length||!R[0]){var _t="";mt=[];for(ht in C[tt])this.terminals_[ht]&&ht>A&&mt.push("'"+this.terminals_[ht]+"'");F.showPosition?_t="Parse error on line "+(T+1)+`:
`+F.showPosition()+`
Expecting `+mt.join(", ")+", got '"+(this.terminals_[O]||O)+"'":_t="Parse error on line "+(T+1)+": Unexpected "+(O==ft?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(_t,{text:F.match,token:this.terminals_[O]||O,line:F.yylineno,loc:xt,expected:mt})}if(R[0]instanceof Array&&R.length>1)throw new Error("Parse Error: multiple actions possible at state: "+tt+", token: "+O);switch(R[0]){case 1:h.push(O),c.push(F.yytext),s.push(F.yylloc),h.push(R[1]),O=null,z=F.yyleng,a=F.yytext,T=F.yylineno,xt=F.yylloc;break;case 2:if(G=this.productions_[R[1]][1],et.$=c[c.length-G],et._$={first_line:s[s.length-(G||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(G||1)].first_column,last_column:s[s.length-1].last_column},ce&&(et._$.range=[s[s.length-(G||1)].range[0],s[s.length-1].range[1]]),wt=this.performAction.apply(et,[a,z,T,K.yy,R[1],c,s].concat(bt)),typeof wt<"u")return wt;G&&(h=h.slice(0,-1*G*2),c=c.slice(0,-1*G),s=s.slice(0,-1*G)),h.push(this.productions_[R[1]][0]),c.push(et.$),s.push(et._$),Bt=C[h[h.length-2]][h[h.length-1]],h.push(Bt);break;case 3:return!0}}return!0}},M=function(){var w={EOF:1,parseError:function(d,h){if(this.yy.parser)this.yy.parser.parseError(d,h);else throw new Error(d)},setInput:function(u,d){return this.yy=d||this.yy||{},this._input=u,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var u=this._input[0];this.yytext+=u,this.yyleng++,this.offset++,this.match+=u,this.matched+=u;var d=u.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),u},unput:function(u){var d=u.length,h=u.split(/(?:\r\n?|\n)/g);this._input=u+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var c=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===f.length?this.yylloc.first_column:0)+f[f.length-h.length].length-h[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[c[0],c[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(u){this.unput(this.match.slice(u))},pastInput:function(){var u=this.matched.substr(0,this.matched.length-this.match.length);return(u.length>20?"...":"")+u.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var u=this.match;return u.length<20&&(u+=this._input.substr(0,20-u.length)),(u.substr(0,20)+(u.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var u=this.pastInput(),d=new Array(u.length+1).join("-");return u+this.upcomingInput()+`
`+d+"^"},test_match:function(u,d){var h,f,c;if(this.options.backtrack_lexer&&(c={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(c.yylloc.range=this.yylloc.range.slice(0))),f=u[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+u[0].length},this.yytext+=u[0],this.match+=u[0],this.matches=u,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(u[0].length),this.matched+=u[0],h=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var s in c)this[s]=c[s];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var u,d,h,f;this._more||(this.yytext="",this.match="");for(var c=this._currentRules(),s=0;s<c.length;s++)if(h=this._input.match(this.rules[c[s]]),h&&(!d||h[0].length>d[0].length)){if(d=h,f=s,this.options.backtrack_lexer){if(u=this.test_match(h,c[s]),u!==!1)return u;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(u=this.test_match(d,c[f]),u!==!1?u:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var d=this.next();return d||this.lex()},begin:function(d){this.conditionStack.push(d)},popState:function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},pushState:function(d){this.begin(d)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(d,h,f,c){switch(f){case 0:return this.begin("open_directive"),48;case 1:return this.begin("type_directive"),49;case 2:return this.popState(),this.begin("arg_directive"),41;case 3:return this.popState(),this.popState(),51;case 4:return 50;case 5:return this.begin("acc_title"),29;case 6:return this.popState(),"acc_title_value";case 7:return this.begin("acc_descr"),31;case 8:return this.popState(),"acc_descr_value";case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 46;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 44;case 26:this.popState();break;case 27:return 45;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 43;case 31:return 5;case 32:return 20;case 33:return 21;case 34:return 22;case 35:return 23;case 36:return 24;case 37:return 26;case 38:return 25;case 39:return 27;case 40:return 13;case 41:return 14;case 42:return 15;case 43:return 16;case 44:return 17;case 45:return 18;case 46:return 19;case 47:return"date";case 48:return 28;case 49:return"accDescription";case 50:return 34;case 51:return 36;case 52:return 37;case 53:return 41;case 54:return 7;case 55:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],inclusive:!0}}};return w}();m.lexer=M;function D(){this.yy={}}return D.prototype=m,m.Parser=D,new D}();Et.parser=Et;const ii=Et;N.extend(Pe);N.extend(ti);N.extend(ei);let X="",Yt="",Lt,Ft="",ot=[],lt=[],Wt={},zt=[],pt=[],rt="",Vt="";const $t=["active","done","crit","milestone"];let Ot=[],ut=!1,Pt=!1,Nt="sunday",Mt=0;const si=function(t,n,i){ke.parseDirective(this,t,n,i)},ri=function(){zt=[],pt=[],rt="",Ot=[],gt=0,It=void 0,vt=void 0,L=[],X="",Yt="",Vt="",Lt=void 0,Ft="",ot=[],lt=[],ut=!1,Pt=!1,Mt=0,Wt={},ye(),Nt="sunday"},ni=function(t){Yt=t},ai=function(){return Yt},ci=function(t){Lt=t},oi=function(){return Lt},li=function(t){Ft=t},ui=function(){return Ft},di=function(t){X=t},fi=function(){ut=!0},hi=function(){return ut},mi=function(){Pt=!0},ki=function(){return Pt},yi=function(t){Vt=t},gi=function(){return Vt},vi=function(){return X},pi=function(t){ot=t.toLowerCase().split(/[\s,]+/)},bi=function(){return ot},Ti=function(t){lt=t.toLowerCase().split(/[\s,]+/)},xi=function(){return lt},wi=function(){return Wt},_i=function(t){rt=t,zt.push(t)},Di=function(){return zt},Si=function(){let t=jt();const n=10;let i=0;for(;!t&&i<n;)t=jt(),i++;return pt=L,pt},Kt=function(t,n,i,e){return e.includes(t.format(n.trim()))?!1:t.isoWeekday()>=6&&i.includes("weekends")||i.includes(t.format("dddd").toLowerCase())?!0:i.includes(t.format(n.trim()))},Ci=function(t){Nt=t},Ei=function(){return Nt},te=function(t,n,i,e){if(!i.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=N(t.startTime):r=N(t.startTime,n,!0),r=r.add(1,"d");let o;t.endTime instanceof Date?o=N(t.endTime):o=N(t.endTime,n,!0);const[l,y]=Mi(r,o,n,i,e);t.endTime=l.toDate(),t.renderEndTime=y},Mi=function(t,n,i,e,r){let o=!1,l=null;for(;t<=n;)o||(l=n.toDate()),o=Kt(t,i,e,r),o&&(n=n.add(1,"d")),t=t.add(1,"d");return[n,l]},At=function(t,n,i){i=i.trim();const r=/^after\s+([\d\w- ]+)/.exec(i.trim());if(r!==null){let l=null;if(r[1].split(" ").forEach(function(y){let g=nt(y);g!==void 0&&(l?g.endTime>l.endTime&&(l=g):l=g)}),l)return l.endTime;{const y=new Date;return y.setHours(0,0,0,0),y}}let o=N(i,n.trim(),!0);if(o.isValid())return o.toDate();{Ct.debug("Invalid date:"+i),Ct.debug("With date format:"+n.trim());const l=new Date(i);if(l===void 0||isNaN(l.getTime())||l.getFullYear()<-1e4||l.getFullYear()>1e4)throw new Error("Invalid date:"+i);return l}},ee=function(t){const n=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return n!==null?[Number.parseFloat(n[1]),n[2]]:[NaN,"ms"]},ie=function(t,n,i,e=!1){i=i.trim();let r=N(i,n.trim(),!0);if(r.isValid())return e&&(r=r.add(1,"d")),r.toDate();let o=N(t);const[l,y]=ee(i);if(!Number.isNaN(l)){const g=o.add(l,y);g.isValid()&&(o=g)}return o.toDate()};let gt=0;const st=function(t){return t===void 0?(gt=gt+1,"task"+gt):t},Ai=function(t,n){let i;n.substr(0,1)===":"?i=n.substr(1,n.length):i=n;const e=i.split(","),r={};ae(e,r,$t);for(let l=0;l<e.length;l++)e[l]=e[l].trim();let o="";switch(e.length){case 1:r.id=st(),r.startTime=t.endTime,o=e[0];break;case 2:r.id=st(),r.startTime=At(void 0,X,e[0]),o=e[1];break;case 3:r.id=st(e[0]),r.startTime=At(void 0,X,e[1]),o=e[2];break}return o&&(r.endTime=ie(r.startTime,X,o,ut),r.manualEndTime=N(o,"YYYY-MM-DD",!0).isValid(),te(r,X,lt,ot)),r},Ii=function(t,n){let i;n.substr(0,1)===":"?i=n.substr(1,n.length):i=n;const e=i.split(","),r={};ae(e,r,$t);for(let o=0;o<e.length;o++)e[o]=e[o].trim();switch(e.length){case 1:r.id=st(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:e[0]};break;case 2:r.id=st(),r.startTime={type:"getStartDate",startData:e[0]},r.endTime={data:e[1]};break;case 3:r.id=st(e[0]),r.startTime={type:"getStartDate",startData:e[1]},r.endTime={data:e[2]};break}return r};let It,vt,L=[];const se={},Yi=function(t,n){const i={section:rt,type:rt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:n},task:t,classes:[]},e=Ii(vt,n);i.raw.startTime=e.startTime,i.raw.endTime=e.endTime,i.id=e.id,i.prevTaskId=vt,i.active=e.active,i.done=e.done,i.crit=e.crit,i.milestone=e.milestone,i.order=Mt,Mt++;const r=L.push(i);vt=i.id,se[i.id]=r-1},nt=function(t){const n=se[t];return L[n]},Li=function(t,n){const i={section:rt,type:rt,description:t,task:t,classes:[]},e=Ai(It,n);i.startTime=e.startTime,i.endTime=e.endTime,i.id=e.id,i.active=e.active,i.done=e.done,i.crit=e.crit,i.milestone=e.milestone,It=i,pt.push(i)},jt=function(){const t=function(i){const e=L[i];let r="";switch(L[i].raw.startTime.type){case"prevTaskEnd":{const o=nt(e.prevTaskId);e.startTime=o.endTime;break}case"getStartDate":r=At(void 0,X,L[i].raw.startTime.startData),r&&(L[i].startTime=r);break}return L[i].startTime&&(L[i].endTime=ie(L[i].startTime,X,L[i].raw.endTime.data,ut),L[i].endTime&&(L[i].processed=!0,L[i].manualEndTime=N(L[i].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),te(L[i],X,lt,ot))),L[i].processed};let n=!0;for(const[i,e]of L.entries())t(i),n=n&&e.processed;return n},Fi=function(t,n){let i=n;it().securityLevel!=="loose"&&(i=ge.sanitizeUrl(n)),t.split(",").forEach(function(e){nt(e)!==void 0&&(ne(e,()=>{window.open(i,"_self")}),Wt[e]=i)}),re(t,"clickable")},re=function(t,n){t.split(",").forEach(function(i){let e=nt(i);e!==void 0&&e.classes.push(n)})},Wi=function(t,n,i){if(it().securityLevel!=="loose"||n===void 0)return;let e=[];if(typeof i=="string"){e=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let o=0;o<e.length;o++){let l=e[o].trim();l.charAt(0)==='"'&&l.charAt(l.length-1)==='"'&&(l=l.substr(1,l.length-2)),e[o]=l}}e.length===0&&e.push(t),nt(t)!==void 0&&ne(t,()=>{Ce.runFunc(n,...e)})},ne=function(t,n){Ot.push(function(){const i=document.querySelector(`[id="${t}"]`);i!==null&&i.addEventListener("click",function(){n()})},function(){const i=document.querySelector(`[id="${t}-text"]`);i!==null&&i.addEventListener("click",function(){n()})})},zi=function(t,n,i){t.split(",").forEach(function(e){Wi(e,n,i)}),re(t,"clickable")},Vi=function(t){Ot.forEach(function(n){n(t)})},Oi={parseDirective:si,getConfig:()=>it().gantt,clear:ri,setDateFormat:di,getDateFormat:vi,enableInclusiveEndDates:fi,endDatesAreInclusive:hi,enableTopAxis:mi,topAxisEnabled:ki,setAxisFormat:ni,getAxisFormat:ai,setTickInterval:ci,getTickInterval:oi,setTodayMarker:li,getTodayMarker:ui,setAccTitle:le,getAccTitle:ue,setDiagramTitle:de,getDiagramTitle:fe,setDisplayMode:yi,getDisplayMode:gi,setAccDescription:he,getAccDescription:me,addSection:_i,getSections:Di,getTasks:Si,addTask:Yi,findTaskById:nt,addTaskOrg:Li,setIncludes:pi,getIncludes:bi,setExcludes:Ti,getExcludes:xi,setClickEvent:zi,setLink:Fi,getLinks:wi,bindFunctions:Vi,parseDuration:ee,isInvalidDate:Kt,setWeekday:Ci,getWeekday:Ei};function ae(t,n,i){let e=!0;for(;e;)e=!1,i.forEach(function(r){const o="^\\s*"+r+"\\s*$",l=new RegExp(o);t[0].match(l)&&(n[r]=!0,t.shift(1),e=!0)})}const Pi=function(){Ct.debug("Something is calling, setConf, remove the call")},Qt={monday:Ee,tuesday:Me,wednesday:Ae,thursday:Ie,friday:Ye,saturday:Le,sunday:Fe},Ni=(t,n)=>{let i=[...t].map(()=>-1/0),e=[...t].sort((o,l)=>o.startTime-l.startTime||o.order-l.order),r=0;for(const o of e)for(let l=0;l<i.length;l++)if(o.startTime>=i[l]){i[l]=o.endTime,o.order=l+n,l>r&&(r=l);break}return r};let Z;const Bi=function(t,n,i,e){const r=it().gantt,o=it().securityLevel;let l;o==="sandbox"&&(l=kt("#i"+n));const y=o==="sandbox"?kt(l.nodes()[0].contentDocument.body):kt("body"),g=o==="sandbox"?l.nodes()[0].contentDocument:document,S=g.getElementById(n);Z=S.parentElement.offsetWidth,Z===void 0&&(Z=1200),r.useWidth!==void 0&&(Z=r.useWidth);const _=e.db.getTasks();let E=[];for(const k of _)E.push(k.type);E=dt(E);const W={};let Y=2*r.topPadding;if(e.db.getDisplayMode()==="compact"||r.displayMode==="compact"){const k={};for(const b of _)k[b.section]===void 0?k[b.section]=[b]:k[b.section].push(b);let x=0;for(const b of Object.keys(k)){const p=Ni(k[b],x)+1;x+=p,Y+=p*(r.barHeight+r.barGap),W[b]=p}}else{Y+=_.length*(r.barHeight+r.barGap);for(const k of E)W[k]=_.filter(x=>x.type===k).length}S.setAttribute("viewBox","0 0 "+Z+" "+Y);const I=y.select(`[id="${n}"]`),v=ve().domain([pe(_,function(k){return k.startTime}),be(_,function(k){return k.endTime})]).rangeRound([0,Z-r.leftPadding-r.rightPadding]);function V(k,x){const b=k.startTime,p=x.startTime;let m=0;return b>p?m=1:b<p&&(m=-1),m}_.sort(V),B(_,Z,Y),Te(I,Y,Z,r.useMaxWidth),I.append("text").text(e.db.getDiagramTitle()).attr("x",Z/2).attr("y",r.titleTopMargin).attr("class","titleText");function B(k,x,b){const p=r.barHeight,m=p+r.barGap,M=r.topPadding,D=r.leftPadding,w=xe().domain([0,E.length]).range(["#00B9FA","#F95002"]).interpolate(we);j(m,M,D,x,b,k,e.db.getExcludes(),e.db.getIncludes()),Q(D,M,x,b),q(k,m,M,D,p,w,x),J(m,M),at(D,M,x,b)}function q(k,x,b,p,m,M,D){const u=[...new Set(k.map(c=>c.order))].map(c=>k.find(s=>s.order===c));I.append("g").selectAll("rect").data(u).enter().append("rect").attr("x",0).attr("y",function(c,s){return s=c.order,s*x+b-2}).attr("width",function(){return D-r.rightPadding/2}).attr("height",x).attr("class",function(c){for(const[s,C]of E.entries())if(c.type===C)return"section section"+s%r.numberSectionStyles;return"section section0"});const d=I.append("g").selectAll("rect").data(k).enter(),h=e.db.getLinks();if(d.append("rect").attr("id",function(c){return c.id}).attr("rx",3).attr("ry",3).attr("x",function(c){return c.milestone?v(c.startTime)+p+.5*(v(c.endTime)-v(c.startTime))-.5*m:v(c.startTime)+p}).attr("y",function(c,s){return s=c.order,s*x+b}).attr("width",function(c){return c.milestone?m:v(c.renderEndTime||c.endTime)-v(c.startTime)}).attr("height",m).attr("transform-origin",function(c,s){return s=c.order,(v(c.startTime)+p+.5*(v(c.endTime)-v(c.startTime))).toString()+"px "+(s*x+b+.5*m).toString()+"px"}).attr("class",function(c){const s="task";let C="";c.classes.length>0&&(C=c.classes.join(" "));let a=0;for(const[z,A]of E.entries())c.type===A&&(a=z%r.numberSectionStyles);let T="";return c.active?c.crit?T+=" activeCrit":T=" active":c.done?c.crit?T=" doneCrit":T=" done":c.crit&&(T+=" crit"),T.length===0&&(T=" task"),c.milestone&&(T=" milestone "+T),T+=a,T+=" "+C,s+T}),d.append("text").attr("id",function(c){return c.id+"-text"}).text(function(c){return c.task}).attr("font-size",r.fontSize).attr("x",function(c){let s=v(c.startTime),C=v(c.renderEndTime||c.endTime);c.milestone&&(s+=.5*(v(c.endTime)-v(c.startTime))-.5*m),c.milestone&&(C=s+m);const a=this.getBBox().width;return a>C-s?C+a+1.5*r.leftPadding>D?s+p-5:C+p+5:(C-s)/2+s+p}).attr("y",function(c,s){return s=c.order,s*x+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",m).attr("class",function(c){const s=v(c.startTime);let C=v(c.endTime);c.milestone&&(C=s+m);const a=this.getBBox().width;let T="";c.classes.length>0&&(T=c.classes.join(" "));let z=0;for(const[ft,bt]of E.entries())c.type===bt&&(z=ft%r.numberSectionStyles);let A="";return c.active&&(c.crit?A="activeCritText"+z:A="activeText"+z),c.done?c.crit?A=A+" doneCritText"+z:A=A+" doneText"+z:c.crit&&(A=A+" critText"+z),c.milestone&&(A+=" milestoneText"),a>C-s?C+a+1.5*r.leftPadding>D?T+" taskTextOutsideLeft taskTextOutside"+z+" "+A:T+" taskTextOutsideRight taskTextOutside"+z+" "+A+" width-"+a:T+" taskText taskText"+z+" "+A+" width-"+a}),it().securityLevel==="sandbox"){let c;c=kt("#i"+n);const s=c.nodes()[0].contentDocument;d.filter(function(C){return h[C.id]!==void 0}).each(function(C){var a=s.querySelector("#"+C.id),T=s.querySelector("#"+C.id+"-text");const z=a.parentNode;var A=s.createElement("a");A.setAttribute("xlink:href",h[C.id]),A.setAttribute("target","_top"),z.appendChild(A),A.appendChild(a),A.appendChild(T)})}}function j(k,x,b,p,m,M,D,w){const u=M.reduce((a,{startTime:T})=>a?Math.min(a,T):T,0),d=M.reduce((a,{endTime:T})=>a?Math.max(a,T):T,0),h=e.db.getDateFormat();if(!u||!d)return;const f=[];let c=null,s=N(u);for(;s.valueOf()<=d;)e.db.isInvalidDate(s,h,D,w)?c?c.end=s:c={start:s,end:s}:c&&(f.push(c),c=null),s=s.add(1,"d");I.append("g").selectAll("rect").data(f).enter().append("rect").attr("id",function(a){return"exclude-"+a.start.format("YYYY-MM-DD")}).attr("x",function(a){return v(a.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(a){const T=a.end.add(1,"day");return v(T)-v(a.start)}).attr("height",m-x-r.gridLineStartPadding).attr("transform-origin",function(a,T){return(v(a.start)+b+.5*(v(a.end)-v(a.start))).toString()+"px "+(T*k+.5*m).toString()+"px"}).attr("class","exclude-range")}function Q(k,x,b,p){let m=_e(v).tickSize(-p+x+r.gridLineStartPadding).tickFormat(Rt(e.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));const D=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(e.db.getTickInterval()||r.tickInterval);if(D!==null){const w=D[1],u=D[2],d=e.db.getWeekday()||r.weekday;switch(u){case"minute":m.ticks(Ut.every(w));break;case"hour":m.ticks(Gt.every(w));break;case"day":m.ticks(Xt.every(w));break;case"week":m.ticks(Qt[d].every(w));break;case"month":m.ticks(Ht.every(w));break}}if(I.append("g").attr("class","grid").attr("transform","translate("+k+", "+(p-50)+")").call(m).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),e.db.topAxisEnabled()||r.topAxis){let w=De(v).tickSize(-p+x+r.gridLineStartPadding).tickFormat(Rt(e.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(D!==null){const u=D[1],d=D[2],h=e.db.getWeekday()||r.weekday;switch(d){case"minute":w.ticks(Ut.every(u));break;case"hour":w.ticks(Gt.every(u));break;case"day":w.ticks(Xt.every(u));break;case"week":w.ticks(Qt[h].every(u));break;case"month":w.ticks(Ht.every(u));break}}I.append("g").attr("class","grid").attr("transform","translate("+k+", "+x+")").call(w).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function J(k,x){let b=0;const p=Object.keys(W).map(m=>[m,W[m]]);I.append("g").selectAll("text").data(p).enter().append(function(m){const M=m[0].split(Se.lineBreakRegex),D=-(M.length-1)/2,w=g.createElementNS("http://www.w3.org/2000/svg","text");w.setAttribute("dy",D+"em");for(const[u,d]of M.entries()){const h=g.createElementNS("http://www.w3.org/2000/svg","tspan");h.setAttribute("alignment-baseline","central"),h.setAttribute("x","10"),u>0&&h.setAttribute("dy","1em"),h.textContent=d,w.appendChild(h)}return w}).attr("x",10).attr("y",function(m,M){if(M>0)for(let D=0;D<M;D++)return b+=p[M-1][1],m[1]*k/2+b*k+x;else return m[1]*k/2+x}).attr("font-size",r.sectionFontSize).attr("class",function(m){for(const[M,D]of E.entries())if(m[0]===D)return"sectionTitle sectionTitle"+M%r.numberSectionStyles;return"sectionTitle"})}function at(k,x,b,p){const m=e.db.getTodayMarker();if(m==="off")return;const M=I.append("g").attr("class","today"),D=new Date,w=M.append("line");w.attr("x1",v(D)+k).attr("x2",v(D)+k).attr("y1",r.titleTopMargin).attr("y2",p-r.titleTopMargin).attr("class","today"),m!==""&&w.attr("style",m.replace(/,/g,";"))}function dt(k){const x={},b=[];for(let p=0,m=k.length;p<m;++p)Object.prototype.hasOwnProperty.call(x,k[p])||(x[k[p]]=!0,b.push(k[p]));return b}},Ri={setConf:Pi,draw:Bi},Hi=t=>`
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`,Xi=Hi,qi={parser:ii,db:Oi,renderer:Ri,styles:Xi};export{qi as diagram};
