"use strict";(self["webpackChunkzhizhi_cms"]=self["webpackChunkzhizhi_cms"]||[]).push([[817],{6807:function(a,i,t){t.r(i),t.d(i,{default:function(){return l}});var e=t(3396),n=t(9563),o=t(6869),s=(0,e.aZ)({__name:"keyboardView",setup(a){const i=a=>{a=o.S1(document.getElementById("chart"));const i=[],t=[],e=[];for(let n=0;n<50;n++)i.push(n),t.push(5*(Math.sin(n/5)*(n/5-10)+n/6)),e.push(3*(Math.sin(n/5)*(n/5+10)+n/6));a.setOption({backgroundColor:"#08263a",grid:{left:"5%",right:"5%"},xAxis:[{show:!1,data:i},{show:!1,data:i}],visualMap:{show:!1,min:0,max:50,dimension:0,inRange:{color:["#4a657a","#308e92","#b1cfa5","#f5d69f","#f5898b","#ef5055"]}},yAxis:{axisLine:{show:!1},axisLabel:{color:"#4a657a"},splitLine:{show:!0,lineStyle:{color:"#08263f"}},axisTick:{show:!1}},series:[{name:"back",type:"bar",data:e,z:1,itemStyle:{opacity:.4,borderRadius:5,shadowBlur:3,shadowColor:"#111"}},{name:"Simulate Shadow",type:"line",data:t,z:2,showSymbol:!1,animationDelay:0,animationEasing:"linear",animationDuration:1200,lineStyle:{color:"transparent"},areaStyle:{color:"#08263a",shadowBlur:50,shadowColor:"#000"}},{name:"front",type:"bar",data:t,xAxisIndex:1,z:3,itemStyle:{borderRadius:5}}],animationEasing:"elasticOut",animationEasingUpdate:"elasticOut",animationDelay(a){return 20*a},animationDelayUpdate(a){return 20*a}})};return(a,t)=>((0,e.wg)(),(0,e.j4)(n.Z,{"init-chart":i}))}});const r=s;var l=r}}]);
//# sourceMappingURL=817.93673678.js.map