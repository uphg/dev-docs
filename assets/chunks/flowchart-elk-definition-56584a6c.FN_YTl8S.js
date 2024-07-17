import{d as W,p as z}from"./flowDb-ff651a22.jlNzcx6R.js";import{I as f,H as B,A as L,X as U,T as P,V as N,S as T,L as V,P as A}from"./vitepress-plugin-mermaid.ffrRrlqL.js";import{i as F,a as M,l as q,b as J}from"./edges-0005682e.tegFQYtE.js";import{E as K}from"./elkjs.1qYwlUPK.js";import"./vue.6z6dcVl3.js";import"./createText-3b1f58a4.vhosYIPz.js";import"./micromark.w4vVcktF.js";import"./svgDraw-70101091.rlA7ziRN.js";const Q=(t,r,e)=>{const{parentById:a}=e,l=new Set;let n=t;for(;n;){if(l.add(n),n===r)return n;n=a[n]}for(n=r;n;){if(l.has(n))return n;n=a[n]}return"root"},D=new K;let x={};const Z={};let v={};const X=async function(t,r,e,a,l,n,d){const k=e.select(`[id="${r}"]`).insert("g").attr("class","nodes"),c=Object.keys(t);return await Promise.all(c.map(async function(b){const i=t[b];let g="default";i.classes.length>0&&(g=i.classes.join(" ")),g=g+" flowchart-label";const y=P(i.styles);let o=i.text!==void 0?i.text:i.id;const h={width:0,height:0},p=[{id:i.id+"-west",layoutOptions:{"port.side":"WEST"}},{id:i.id+"-east",layoutOptions:{"port.side":"EAST"}},{id:i.id+"-south",layoutOptions:{"port.side":"SOUTH"}},{id:i.id+"-north",layoutOptions:{"port.side":"NORTH"}}];let S=0,u="",E={};switch(i.type){case"round":S=5,u="rect";break;case"square":u="rect";break;case"diamond":u="question",E={portConstraints:"FIXED_SIDE"};break;case"hexagon":u="hexagon";break;case"odd":u="rect_left_inv_arrow";break;case"lean_right":u="lean_right";break;case"lean_left":u="lean_left";break;case"trapezoid":u="trapezoid";break;case"inv_trapezoid":u="inv_trapezoid";break;case"odd_right":u="rect_left_inv_arrow";break;case"circle":u="circle";break;case"ellipse":u="ellipse";break;case"stadium":u="stadium";break;case"subroutine":u="subroutine";break;case"cylinder":u="cylinder";break;case"group":u="rect";break;case"doublecircle":u="doublecircle";break;default:u="rect"}const $={labelStyle:y.labelStyle,shape:u,labelText:o,labelType:i.labelType,rx:S,ry:S,class:g,style:y.style,id:i.id,link:i.link,linkTarget:i.linkTarget,tooltip:l.db.getTooltip(i.id)||"",domId:l.db.lookUpDomId(i.id),haveCallback:i.haveCallback,width:i.type==="group"?500:void 0,dir:i.dir,type:i.type,props:i.props,padding:L().flowchart.padding};let _,I;if($.type!=="group")I=await M(k,$,i.dir),_=I.node().getBBox();else{a.createElementNS("http://www.w3.org/2000/svg","text");const{shapeSvg:m,bbox:w}=await q(k,$,void 0,!0);h.width=w.width,h.wrappingWidth=L().flowchart.wrappingWidth,h.height=w.height,h.labelNode=m.node(),$.labelData=h}const C={id:i.id,ports:i.type==="diamond"?p:[],layoutOptions:E,labelText:o,labelData:h,domId:l.db.lookUpDomId(i.id),width:_==null?void 0:_.width,height:_==null?void 0:_.height,type:i.type,el:I,parent:n.parentById[i.id]};v[$.id]=C})),d},R=(t,r,e)=>{const a={TB:{in:{north:"north"},out:{south:"west",west:"east",east:"south"}},LR:{in:{west:"west"},out:{east:"south",south:"north",north:"east"}},RL:{in:{east:"east"},out:{west:"north",north:"south",south:"west"}},BT:{in:{south:"south"},out:{north:"east",east:"west",west:"north"}}};return a.TD=a.TB,f.info("abc88",e,r,t),a[e][r][t]},G=(t,r,e)=>{if(f.info("getNextPort abc88",{node:t,edgeDirection:r,graphDirection:e}),!x[t])switch(e){case"TB":case"TD":x[t]={inPosition:"north",outPosition:"south"};break;case"BT":x[t]={inPosition:"south",outPosition:"north"};break;case"RL":x[t]={inPosition:"east",outPosition:"west"};break;case"LR":x[t]={inPosition:"west",outPosition:"east"};break}const a=r==="in"?x[t].inPosition:x[t].outPosition;return r==="in"?x[t].inPosition=R(x[t].inPosition,r,e):x[t].outPosition=R(x[t].outPosition,r,e),a},Y=(t,r)=>{let e=t.start,a=t.end;const l=e,n=a,d=v[e],s=v[a];return!d||!s?{source:e,target:a}:(d.type==="diamond"&&(e=`${e}-${G(e,"out",r)}`),s.type==="diamond"&&(a=`${a}-${G(a,"in",r)}`),{source:e,target:a,sourceId:l,targetId:n})},j=function(t,r,e,a){f.info("abc78 edges = ",t);const l=a.insert("g").attr("class","edgeLabels");let n={},d=r.db.getDirection(),s,k;if(t.defaultStyle!==void 0){const c=P(t.defaultStyle);s=c.style,k=c.labelStyle}return t.forEach(function(c){const b="L-"+c.start+"-"+c.end;n[b]===void 0?(n[b]=0,f.info("abc78 new entry",b,n[b])):(n[b]++,f.info("abc78 new entry",b,n[b]));let i=b+"-"+n[b];f.info("abc78 new link id to be used is",b,i,n[b]);const g="LS-"+c.start,y="LE-"+c.end,o={style:"",labelStyle:""};switch(o.minlen=c.length||1,c.type==="arrow_open"?o.arrowhead="none":o.arrowhead="normal",o.arrowTypeStart="arrow_open",o.arrowTypeEnd="arrow_open",c.type){case"double_arrow_cross":o.arrowTypeStart="arrow_cross";case"arrow_cross":o.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":o.arrowTypeStart="arrow_point";case"arrow_point":o.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":o.arrowTypeStart="arrow_circle";case"arrow_circle":o.arrowTypeEnd="arrow_circle";break}let h="",p="";switch(c.stroke){case"normal":h="fill:none;",s!==void 0&&(h=s),k!==void 0&&(p=k),o.thickness="normal",o.pattern="solid";break;case"dotted":o.thickness="normal",o.pattern="dotted",o.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":o.thickness="thick",o.pattern="solid",o.style="stroke-width: 3.5px;fill:none;";break}if(c.style!==void 0){const I=P(c.style);h=I.style,p=I.labelStyle}o.style=o.style+=h,o.labelStyle=o.labelStyle+=p,c.interpolate!==void 0?o.curve=N(c.interpolate,T):t.defaultInterpolate!==void 0?o.curve=N(t.defaultInterpolate,T):o.curve=N(Z.curve,T),c.text===void 0?c.style!==void 0&&(o.arrowheadStyle="fill: #333"):(o.arrowheadStyle="fill: #333",o.labelpos="c"),o.labelType=c.labelType,o.label=c.text.replace(V.lineBreakRegex,`
`),c.style===void 0&&(o.style=o.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),o.labelStyle=o.labelStyle.replace("color:","fill:"),o.id=i,o.classes="flowchart-link "+g+" "+y;const S=J(l,o),{source:u,target:E,sourceId:$,targetId:_}=Y(c,d);f.debug("abc78 source and target",u,E),e.edges.push({id:"e"+c.start+c.end,sources:[u],targets:[E],sourceId:$,targetId:_,labelEl:S,labels:[{width:o.width,height:o.height,orgWidth:o.width,orgHeight:o.height,text:o.label,layoutOptions:{"edgeLabels.inline":"true","edgeLabels.placement":"CENTER"}}],edgeData:o})}),e},tt=function(t,r,e,a){let l="";switch(a&&(l=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,l=l.replace(/\(/g,"\\("),l=l.replace(/\)/g,"\\)")),r.arrowTypeStart){case"arrow_cross":t.attr("marker-start","url("+l+"#"+e+"-crossStart)");break;case"arrow_point":t.attr("marker-start","url("+l+"#"+e+"-pointStart)");break;case"arrow_barb":t.attr("marker-start","url("+l+"#"+e+"-barbStart)");break;case"arrow_circle":t.attr("marker-start","url("+l+"#"+e+"-circleStart)");break;case"aggregation":t.attr("marker-start","url("+l+"#"+e+"-aggregationStart)");break;case"extension":t.attr("marker-start","url("+l+"#"+e+"-extensionStart)");break;case"composition":t.attr("marker-start","url("+l+"#"+e+"-compositionStart)");break;case"dependency":t.attr("marker-start","url("+l+"#"+e+"-dependencyStart)");break;case"lollipop":t.attr("marker-start","url("+l+"#"+e+"-lollipopStart)");break}switch(r.arrowTypeEnd){case"arrow_cross":t.attr("marker-end","url("+l+"#"+e+"-crossEnd)");break;case"arrow_point":t.attr("marker-end","url("+l+"#"+e+"-pointEnd)");break;case"arrow_barb":t.attr("marker-end","url("+l+"#"+e+"-barbEnd)");break;case"arrow_circle":t.attr("marker-end","url("+l+"#"+e+"-circleEnd)");break;case"aggregation":t.attr("marker-end","url("+l+"#"+e+"-aggregationEnd)");break;case"extension":t.attr("marker-end","url("+l+"#"+e+"-extensionEnd)");break;case"composition":t.attr("marker-end","url("+l+"#"+e+"-compositionEnd)");break;case"dependency":t.attr("marker-end","url("+l+"#"+e+"-dependencyEnd)");break;case"lollipop":t.attr("marker-end","url("+l+"#"+e+"-lollipopEnd)");break}},et=function(t,r){return f.info("Extracting classes"),r.db.getClasses()},rt=function(t){const r={parentById:{},childrenById:{}},e=t.getSubGraphs();return f.info("Subgraphs - ",e),e.forEach(function(a){a.nodes.forEach(function(l){r.parentById[l]=a.id,r.childrenById[a.id]===void 0&&(r.childrenById[a.id]=[]),r.childrenById[a.id].push(l)})}),e.forEach(function(a){a.id,r.parentById[a.id]!==void 0&&r.parentById[a.id]}),r},at=function(t,r,e){const a=Q(t,r,e);if(a===void 0||a==="root")return{x:0,y:0};const l=v[a].offset;return{x:l.posX,y:l.posY}},ot=function(t,r,e,a,l){const n=at(r.sourceId,r.targetId,l),d=r.sections[0].startPoint,s=r.sections[0].endPoint,c=(r.sections[0].bendPoints?r.sections[0].bendPoints:[]).map(p=>[p.x+n.x,p.y+n.y]),b=[[d.x+n.x,d.y+n.y],...c,[s.x+n.x,s.y+n.y]],i=A().curve(T),g=t.insert("path").attr("d",i(b)).attr("class","path "+e.classes).attr("fill","none"),y=t.insert("g").attr("class","edgeLabel"),o=B(y.node().appendChild(r.labelEl)),h=o.node().firstChild.getBoundingClientRect();o.attr("width",h.width),o.attr("height",h.height),y.attr("transform",`translate(${r.labels[0].x+n.x}, ${r.labels[0].y+n.y})`),tt(g,e,a.type,a.arrowMarkerAbsolute)},H=(t,r)=>{t.forEach(e=>{e.children||(e.children=[]);const a=r.childrenById[e.id];a&&a.forEach(l=>{e.children.push(v[l])}),H(e.children,r)})},lt=async function(t,r,e,a){var l;v={},x={};const n=B("body").append("div").attr("style","height:400px").attr("id","cy");let d={id:"root",layoutOptions:{"elk.hierarchyHandling":"INCLUDE_CHILDREN","org.eclipse.elk.padding":"[top=100, left=100, bottom=110, right=110]","elk.layered.spacing.edgeNodeBetweenLayers":"30","elk.direction":"DOWN"},children:[],edges:[]};switch(f.info("Drawing flowchart using v3 renderer",D),a.db.getDirection()){case"BT":d.layoutOptions["elk.direction"]="UP";break;case"TB":d.layoutOptions["elk.direction"]="DOWN";break;case"LR":d.layoutOptions["elk.direction"]="RIGHT";break;case"RL":d.layoutOptions["elk.direction"]="LEFT";break}const{securityLevel:k,flowchart:c}=L();let b;k==="sandbox"&&(b=B("#i"+r));const i=k==="sandbox"?B(b.nodes()[0].contentDocument.body):B("body"),g=k==="sandbox"?b.nodes()[0].contentDocument:document,y=i.select(`[id="${r}"]`);F(y,["point","circle","cross"],a.type,a.arrowMarkerAbsolute);const h=a.db.getVertices();let p;const S=a.db.getSubGraphs();f.info("Subgraphs - ",S);for(let m=S.length-1;m>=0;m--)p=S[m],a.db.addVertex(p.id,{text:p.title,type:p.labelType},"group",void 0,p.classes,p.dir);const u=y.insert("g").attr("class","subgraphs"),E=rt(a.db);d=await X(h,r,i,g,a,E,d);const $=y.insert("g").attr("class","edges edgePath"),_=a.db.getEdges();d=j(_,a,d,y),Object.keys(v).forEach(m=>{const w=v[m];w.parent||d.children.push(w),E.childrenById[m]!==void 0&&(w.labels=[{text:w.labelText,layoutOptions:{"nodeLabels.placement":"[H_CENTER, V_TOP, INSIDE]"},width:w.labelData.width,height:w.labelData.height}],delete w.x,delete w.y,delete w.width,delete w.height)}),H(d.children,E),f.info("after layout",JSON.stringify(d,null,2));const C=await D.layout(d);O(0,0,C.children,y,u,a,0),f.info("after layout",C),(l=C.edges)==null||l.map(m=>{ot($,m,m.edgeData,a,E)}),U({},y,c.diagramPadding,c.useMaxWidth),n.remove()},O=(t,r,e,a,l,n,d)=>{e.forEach(function(s){if(s)if(v[s.id].offset={posX:s.x+t,posY:s.y+r,x:t,y:r,depth:d,width:s.width,height:s.height},s.type==="group"){const k=l.insert("g").attr("class","subgraph");k.insert("rect").attr("class","subgraph subgraph-lvl-"+d%5+" node").attr("x",s.x+t).attr("y",s.y+r).attr("width",s.width).attr("height",s.height);const c=k.insert("g").attr("class","label"),b=L().flowchart.htmlLabels?s.labelData.width/2:0;c.attr("transform",`translate(${s.labels[0].x+t+s.x+b}, ${s.labels[0].y+r+s.y+3})`),c.node().appendChild(s.labelData.labelNode),f.info("Id (UGH)= ",s.type,s.labels)}else f.info("Id (UGH)= ",s.id),s.el.attr("transform",`translate(${s.x+t+s.width/2}, ${s.y+r+s.height/2})`)}),e.forEach(function(s){s&&s.type==="group"&&O(t+s.x,r+s.y,s.children,a,l,n,d+1)})},st={getClasses:et,draw:lt},nt=t=>{let r="";for(let e=0;e<5;e++)r+=`
      .subgraph-lvl-${e} {
        fill: ${t[`surface${e}`]};
        stroke: ${t[`surfacePeer${e}`]};
      }
    `;return r},it=t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span {
    color: ${t.titleColor};
  }

  .label text,span {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.85;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
  .subgraph {
    stroke-width:2;
    rx:3;
  }
  // .subgraph-lvl-1 {
  //   fill:#ccc;
  //   // stroke:black;
  // }

  .flowchart-label text {
    text-anchor: middle;
  }

  ${nt(t)}
`,ct=it,wt={db:W,renderer:st,parser:z,styles:ct};export{wt as diagram};
