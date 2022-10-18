(function(){"use strict";var e={9031:function(e,t,n){var i=n(9242),o=n(3396);function r(e,t){const n=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(n)}var a=n(89);const s={},c=(0,a.Z)(s,[["render",r]]);var l=c,d=n(4002),u=n(1020),h=n(6554);const m=["/login"];d.Z.beforeEach((async(e,t,n)=>{const i=(0,h.L)(),o=i.token;if(o)if("/login"===e.path)n({path:"/"});else{const t=i.roles&&i.roles.length>0;if(t)n();else try{await i.getInfo(),await i.generateRoutes(),n({...e,replace:!0})}catch(r){console.log("error",r),n()}}else o||-1===m.indexOf(e.path)?n({path:"/login"}):n()}));var p=n(7634),f=n.n(p);const g={admin:{token:"admin-token"},editor:{token:"editor-token"}},b={"admin-token":{roles:["admin"],introduction:"super administrator",avatar:"",name:"Super Admin"},"editor-token":{roles:["editor"],introduction:"I am an editor",avatar:"",name:"Normal Editor"}};var k=[{url:"/zhizhi-cms/user/login",type:"post",response:e=>{const t=JSON.parse(e.body),{username:n}=t,{token:i}=g[n];return i?{code:200,data:{token:i}}:{code:60204,message:"Account and password are incorrect."}}},{url:"/zhizhi-cms/user/info",type:"post",response:e=>{const t=JSON.parse(e.body),{token:n}=t,i=b[n];return i?{code:200,data:i}:{code:50008,message:"Login failed, unable to get user details."}}}];const v=[{key:"admin",name:"admin",description:"Super Administrator. Have access to view all pages.",routes:d._},{key:"editor",name:"editor",description:"Normal Editor. Can see all pages except permission page",routes:d._.filter((e=>"/permission"!==e.path))},{key:"visitor",name:"visitor",description:"Just a visitor. Can only see the home page and the document page",routes:[{path:"/",redirect:"/home",children:[{path:"home",name:"home",meta:{title:"首页"}}]}]}];var y=[{url:"/zhizhi-cms/routes",type:"get",response:()=>({code:200,data:d._})},{url:"/zhizhi-cms/roles",type:"get",response:()=>({code:200,data:v})},{url:"/zhizhi-cms/role",type:"post",response:{code:200,data:{key:f().mock("@integer(300, 5000)")}}},{url:"/zhizhi-cms/role/[A-Za-z0-9]",type:"put",response:{code:200,data:{status:"success"}}},{url:"/zhizhi-cms/role/[A-Za-z0-9]",type:"delete",response:{code:200,data:{status:"success"}}}];const I=[],w=100,z='<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',C="https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";for(let A=0;A<w;A++)I.push(f().mock({id:"@increment",timestamp:+f().Random.date("T"),author:"@first",reviewer:"@first",title:"@title(5, 10)",content_short:"mock data",content:z,forecast:"@float(0, 100, 2, 2)",importance:"@integer(1, 3)","type|1":["CN","US","JP","EU"],"status|1":["published","draft"],display_time:"@datetime",comment_disabled:!0,pageviews:"@integer(300, 5000)",image_uri:C,platforms:["a-platform"]}));var R=[{url:"/zhizhi-cms/article/list",type:"get",response:e=>{const t=e.url.split("="),n=+t[1].split("&")[0],i=+t[2],o=I.filter((e=>!0)),r=o.filter(((e,t)=>t<i*n&&t>=i*(n-1)));return{code:200,data:{total:o.length,items:r}}}}];const E=[...k,...y,...R];function P(){for(const e of E)f().mock(new RegExp(e.url),e.type||"get",e.response)}var W=n(2748);n(6699),n(1703);const N=(e,t)=>{const n=(0,h.L)(),i=t.value,o=n.roles;if(!(i.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");{const t=o.some((e=>i.includes(e)));t||e.parentNode&&e.parentNode.removeChild(e)}};var Z=N;n(4415);const U=(0,i.ri)(l);for(const[A,Q]of Object.entries(W))U.component(A,Q);U.use((0,u.WB)()).use(d.Z).mount("#app"),P(),U.directive("permission",Z)},2846:function(e,t,n){n.d(t,{H4:function(){return v},QT:function(){return m},Tc:function(){return f},Vh:function(){return I},d1:function(){return u},WW:function(){return g},mE:function(){return w},rs:function(){return d},tI:function(){return p},G_:function(){return k},mp:function(){return b},p8:function(){return l},Rf:function(){return h},lx:function(){return c},xt:function(){return y}});var i=n(6265),o=n.n(i);const r=o().create({baseURL:"/zhizhi-cms",timeout:5e3});r.interceptors.request.use((e=>(e.headers=e.headers||{},localStorage.getItem("token")&&(e.headers.token=localStorage.getItem("token")||""),e))),r.interceptors.response.use((e=>{const t=e.data.code;return 200!=t&&2e3!=t?Promise.reject(e.data):e.data}),(e=>{console.log(e)}));var a=r;const s="https://www.twivbas.com:8081",c=e=>a({url:"/user/login",method:"post",data:e}),l=e=>a({url:"/user/info",method:"post",data:e}),d=()=>a({url:`${s}/getHotList`,method:"get"}),u=e=>a({url:`${s}/editHotList`,method:"post",data:e}),h=()=>a({url:`${s}/getUsers`,method:"get"}),m=e=>a({url:`${s}/banUser`,method:"put",data:e}),p=()=>a({url:`${s}/getQuestions`,method:"get"}),f=e=>a({url:`${s}/delAnswer/${e}`,method:"delete"}),g=e=>a({url:`${s}/editQuestion`,method:"post",data:e}),b=()=>a({url:"/routes",method:"get"}),k=()=>a({url:"/roles",method:"get"}),v=e=>a({url:"/role",method:"post",data:e}),y=(e,t)=>a({url:`/role/${e}`,method:"put",data:t}),I=e=>a({url:`/role/${e}`,method:"delete"}),w=e=>a({url:"/article/list",method:"get",params:e})},4002:function(e,t,n){n.d(t,{Z:function(){return E},_:function(){return C}});var i=n(2483),o=n(3293),r=(n(8199),n(6502),n(7018),n(8179)),a=(n(6809),n(4054)),s=(n(3449),n(4357),n(3396)),c=n(4870),l=n(7139),d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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",u=n(6554);const h=e=>((0,s.dD)("data-v-042c764b"),e=e(),(0,s.Cn)(),e),m={class:"homepage_container"},p={class:"homepage_header"},f=h((()=>(0,s._)("div",{class:"left"},[(0,s._)("img",{src:d,class:"logo"})],-1))),g={class:"right"},b=(0,s.Uk)("退出登录"),k={class:"homepage_menu"},v={class:"homepage_content"};var y=(0,s.aZ)({__name:"LayoutView",setup(e){const t=(0,i.tv)(),n=(0,i.yj)(),d=(0,u.L)(),h=(0,s.Fl)((()=>{const e=n.matched.map((e=>e.name));return void 0===e[0]&&e.shift(),"Home"!==e[0]&&e.unshift("Home"),e}));let y=(0,s.Fl)((()=>n.path)),I=d.filteredRoutes;const w=()=>{d.logout(),t.push({path:"/login"})};return(e,t)=>{const n=a.PJ,i=a.qc,d=r.mi,u=o.E_,z=o.F8,C=o.Q8,R=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)("div",m,[(0,s._)("div",p,[f,(0,s.Wm)(i,{separator:"/",class:"bread"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,c.SU)(h),((e,t)=>((0,s.wg)(),(0,s.j4)(n,{key:t,to:t<(0,c.SU)(h).length-1?{path:`/${e.toLowerCase()}`}:{}},{default:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(e),1)])),_:2},1032,["to"])))),128))])),_:1}),(0,s._)("div",g,[(0,s.Wm)(d,{class:"logOut",onClick:w},{default:(0,s.w5)((()=>[b])),_:1})])]),(0,s._)("div",k,[(0,s.Wm)(C,{"default-active":(0,c.SU)(y),class:"el-menu-vertical-demo",router:!0,"unique-opened":!1},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,c.SU)(I),(e=>((0,s.wg)(),(0,s.iD)(s.HY,{key:e.path},[e.meta&&e.children?((0,s.wg)(),(0,s.j4)(z,{key:0,index:e.path},{title:(0,s.w5)((()=>[(0,s._)("span",null,(0,l.zw)(e.meta.title),1)])),default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.children,(t=>((0,s.wg)(),(0,s.j4)(u,{index:e.path+"/"+t.path,key:t.path},{default:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(t.meta?.title),1)])),_:2},1032,["index"])))),128))])),_:2},1032,["index"])):e.children&&1===e.children.length&&!e.children[0].meta?.hidden?((0,s.wg)(),(0,s.j4)(u,{key:1,index:"/"!==e.path?e.path+"/"+e.children[0].path:"/"+e.children[0].path},{default:(0,s.w5)((()=>[(0,s._)("span",null,(0,l.zw)(e.children[0].meta?.title),1)])),_:2},1032,["index"])):(0,s.kq)("",!0)],64)))),128))])),_:1},8,["default-active"])]),(0,s._)("div",v,[(0,s.Wm)(R)])])}}}),I=n(89);const w=(0,I.Z)(y,[["__scopeId","data-v-042c764b"]]);var z=w;const C=[{path:"/login",name:"login",meta:{hidden:!0},component:()=>Promise.all([n.e(674),n.e(281),n.e(824)]).then(n.bind(n,2399))},{path:"/",redirect:"/home",component:z,children:[{path:"home",name:"Home",meta:{title:"首页",hidden:!1},component:()=>n.e(980).then(n.bind(n,5980))}]},{path:"/zhizhi",name:"Zhizhi",component:z,redirect:"/zhizhi/editHotList",meta:{title:"知知小程序"},children:[{path:"editHotList",name:"EditHotList",meta:{title:"编辑热榜"},component:()=>Promise.all([n.e(809),n.e(967)]).then(n.bind(n,3967))},{path:"banUser",name:"BanUser",meta:{title:"封禁用户"},component:()=>Promise.all([n.e(809),n.e(674),n.e(281),n.e(264),n.e(481)]).then(n.bind(n,196))},{path:"editAnswer",name:"EditAnswer",meta:{title:"编辑回答"},component:()=>Promise.all([n.e(809),n.e(674),n.e(281),n.e(264),n.e(173)]).then(n.bind(n,5580))}]},{path:"/permission",component:z,redirect:"/permission/page",name:"Permission",meta:{title:"Permission"},children:[{path:"page",component:()=>n.e(185).then(n.bind(n,1185)),name:"PagePermission",meta:{title:"Page Permission",roles:["admin"]}},{path:"directive",component:()=>n.e(9).then(n.bind(n,9)),name:"DirectivePermission",meta:{title:"Directive Permission"}},{path:"role",component:()=>Promise.all([n.e(809),n.e(674),n.e(806),n.e(281),n.e(264),n.e(785)]).then(n.bind(n,3472)),name:"RolePermission",meta:{title:"Role Permission",roles:["admin"]}}]},{path:"/error",children:[{path:"404",component:()=>n.e(485).then(n.bind(n,7057)),name:"Page404",meta:{title:"404",hidden:!0}}]},{path:"/guide",redirect:"/guide/index",component:z,children:[{path:"index",name:"Guide",meta:{title:"Guide",hidden:!1},component:()=>n.e(538).then(n.bind(n,1538))}]},{path:"/icon",redirect:"/icon/index",component:z,children:[{path:"index",name:"Icons",meta:{title:"Icons",hidden:!0},component:()=>n.e(401).then(n.bind(n,7460))}]},{path:"/components",name:"Components",redirect:"/components/index",component:z,children:[{path:"index",name:"Index",meta:{title:"Index",hidden:!0},component:()=>n.e(780).then(n.bind(n,9780))}]},{path:"/charts",name:"Charts",redirect:"/charts/keyboard",component:z,meta:{title:"Charts"},children:[{path:"keyboard",name:"Keyboard Chart",meta:{title:"Keyboard Chart",hidden:!1},component:()=>Promise.all([n.e(806),n.e(304),n.e(817)]).then(n.bind(n,6807))},{path:"line",name:"Line Chart",meta:{title:"Line Chart",hidden:!1},component:()=>Promise.all([n.e(806),n.e(304),n.e(92)]).then(n.bind(n,6444))},{path:"mix-chart",name:"Mix Chart",meta:{title:"Mix Chart",hidden:!1},component:()=>Promise.all([n.e(806),n.e(304),n.e(693)]).then(n.bind(n,1914))}]},{path:"/table",name:"Table",component:z,redirect:"/table/dynamic-table",meta:{title:"Table"},children:[{path:"dynamic-table",name:"DynamicTable",meta:{title:"Dynamic Table"},component:()=>Promise.all([n.e(809),n.e(874)]).then(n.bind(n,4874))},{path:"inline-edit-table",name:"Inline Edit",meta:{title:"Inline Edit"},component:()=>Promise.all([n.e(809),n.e(674),n.e(127)]).then(n.bind(n,3808))}]},{path:"/:catchAll(.*)",redirect:"/error/404",meta:{hidden:!0}}],R=(0,i.p7)({history:(0,i.r5)(),routes:C});var E=R},6554:function(e,t,n){n.d(t,{L:function(){return a}});n(6699);var i=n(2846),o=n(1020),r=n(4002);const a=(0,o.Q_)("user",{state:()=>({name:"",introduction:"",avatar:"",token:localStorage.getItem("token"),roles:[],allRoutes:[],filteredRoutes:[]}),getters:{},actions:{login(e){return new Promise(((t,n)=>{(0,i.lx)(e).then((e=>{this.token=e.data.token,localStorage.setItem("token",e.data.token),t(e)})).catch((e=>{n(e)}))}))},logout(){localStorage.removeItem("token"),this.token="",this.roles=[]},getInfo(){return new Promise(((e,t)=>{const n={token:this.token};(0,i.p8)(n).then((n=>{const{data:i}=n;i||t("Verification failed, please Login again.");const{roles:o,name:r,avatar:a,introduction:s}=i;(!o||o.length<=0)&&t("getInfo: roles must be a non-null array!"),this.roles=o,this.name=r,this.avatar=a,this.introduction=s,e(i)})).catch((e=>{t(e)}))}))},generateRoutes(){this.roles.length<1||(this.allRoutes=r._,this.roles.includes("admin")?this.filteredRoutes=this.allRoutes:this.filteredRoutes=c(this.allRoutes,this.roles))},async changeRoles(e){const t=`${e}-token`;this.token=t,localStorage.setItem("token",this.token),await this.getInfo(),await this.generateRoutes()}}}),s=(e,t)=>!t.meta||!t.meta.roles||e.some((e=>t.meta&&t.meta.roles.includes(e))),c=(e,t)=>{const n=[];return e.forEach((e=>{const i={...e};s(t,i)&&(i.children&&(i.children=c(i.children,t)),n.push(i))})),n}}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,r){if(!i){var a=1/0;for(d=0;d<e.length;d++){i=e[d][0],o=e[d][1],r=e[d][2];for(var s=!0,c=0;c<i.length;c++)(!1&r||a>=r)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(s=!1,r<a&&(a=r));if(s){e.splice(d--,1);var l=o();void 0!==l&&(t=l)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[i,o,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,i){return n.f[i](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{9:"1cc47618",92:"28aef887",127:"cd4b24f6",173:"c6b88b83",185:"5bf77131",264:"fe59813b",281:"e59a4093",304:"23a86538",401:"74dd4c67",481:"94869019",485:"72fa7734",538:"31f3e321",674:"9c856925",693:"3f666a9a",780:"a39c17ff",785:"43a2cb1b",806:"7cba9616",809:"870c7101",817:"93673678",824:"89442cd4",874:"10d75406",967:"c848bd74",980:"5e2f4dd6"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{9:"1e0311d6",92:"49edb21c",127:"938548d4",173:"256f70aa",185:"1451d749",401:"d6961630",481:"72102579",485:"fc8eb7ce",538:"21d4e937",693:"49edb21c",785:"87ab60cf",809:"d73f4ea9",817:"49edb21c",824:"16b8c259",874:"fb7895fa",967:"d31d747f"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="zhizhi_cms:";n.l=function(i,o,r,a){if(e[i])e[i].push(o);else{var s,c;if(void 0!==r)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var u=l[d];if(u.getAttribute("src")==i||u.getAttribute("data-webpack")==t+r){s=u;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+r),s.src=i),e[i]=[o];var h=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var o=e[i];if(delete e[i],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p=""}(),function(){var e=function(e,t,n,i){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var r=function(r){if(o.onerror=o.onload=null,"load"===r.type)n();else{var a=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=s,o.parentNode.removeChild(o),i(c)}};return o.onerror=o.onload=r,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var o=n[i],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var a=document.getElementsByTagName("style");for(i=0;i<a.length;i++){o=a[i],r=o.getAttribute("data-href");if(r===e||r===t)return o}},i=function(i){return new Promise((function(o,r){var a=n.miniCssF(i),s=n.p+a;if(t(a,s))return o();e(i,s,o,r)}))},o={143:0};n.f.miniCss=function(e,t){var n={9:1,92:1,127:1,173:1,185:1,401:1,481:1,485:1,538:1,693:1,785:1,809:1,817:1,824:1,874:1,967:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=i(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,i){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)i.push(o[2]);else{var r=new Promise((function(n,i){o=e[t]=[n,i]}));i.push(o[2]=r);var a=n.p+n.u(t),s=new Error,c=function(i){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,o[1](s)}};n.l(a,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,r,a=i[0],s=i[1],c=i[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var d=c(n)}for(t&&t(i);l<a.length;l++)r=a[l],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},i=self["webpackChunkzhizhi_cms"]=self["webpackChunkzhizhi_cms"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9031)}));i=n.O(i)})();
//# sourceMappingURL=app.0fe05bd7.js.map