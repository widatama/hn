(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6010:function(e,t,n){"use strict";t.Z=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,r,s="";if("string"==typeof t||"number"==typeof t)s+=t;else if("object"==typeof t){if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(r=e(t[n]))&&(s&&(s+=" "),s+=r);else for(n in t)t[n]&&(s&&(s+=" "),s+=n)}return s}(e))&&(r&&(r+=" "),r+=t);return r}},8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2583)}])},5902:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(5893),s=n(6010),a=n(1664),i=n.n(a);n(7294);var l=n(6402);function u(e){let{className:t="",hnItem:n}=e,a=null;n.itemHostname&&(a=(0,r.jsx)("span",{className:"tw-text-xs",children:" (".concat(n.itemHostname,")")}));let u=null;"score"in n&&(u=(0,r.jsx)("span",{children:"".concat(n.score," points ")}));let c=null;return"descendants"in n&&(c=(0,r.jsxs)("span",{children:[" | ",(0,r.jsx)(i(),{href:n.itemUrl,children:"".concat(n.descendants," comments")})]})),(0,r.jsxs)("div",{className:(0,s.Z)(t),children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"tw-inline-block",children:(0,r.jsx)(i(),{href:n.url||n.itemUrl,children:n.title})}),a]}),(0,r.jsxs)("div",{className:"tw-text-xs tw-text-neutral-400",children:[u,(0,r.jsxs)("span",{children:["by ",(0,r.jsx)(i(),{href:n.creatorUrl,children:"".concat(n.by)})]}),(0,r.jsxs)("span",{children:[" ",(0,r.jsx)(i(),{href:n.itemUrl,children:(0,r.jsx)(l.Z,{date:1e3*n.time})})]}),c]})]})}u.defaultProps={className:""}},6776:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),s=n(6010);function a(e){let{className:t=""}=e;return(0,r.jsx)("div",{className:(0,s.Z)(t,"tw-animate-pulse"),children:"Loading"})}n(7294),a.defaultProps={className:""}},2583:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(5893),s=n(9008),a=n.n(s),i=n(1163),l=n(6010),u=n(1664),c=n.n(u);n(7294);var o=n(6776),d=n(1254),f=n(5902);function h(e){let{className:t="",page:n}=e,{data:s=[],error:a,isError:i,isLoading:u,isSuccess:h}=(0,d.g)({limit:30,page:n},{refetchOnMountOrArgChange:!0});return u?(0,r.jsx)(o.Z,{className:(0,l.Z)(t,"tw-mb-4")}):h?(0,r.jsxs)("div",{className:(0,l.Z)(t,"tw-overflow-y-auto tw-mb-4"),children:[s.map(e=>(0,r.jsx)(f.Z,{className:"tw-mb-3",hnItem:e},e.id)),(0,r.jsx)(c(),{className:"tw-my-6 tw-inline-block",href:{query:{p:n+1}},children:"More"})]}):i?(0,r.jsx)("div",{className:(0,l.Z)(t,"tw-mb-4"),children:a.toString()}):null}function m(){var e;let t=(0,i.useRouter)(),n=1;return"string"!=typeof t.query.p||"string"!=typeof(e=t.query.p)||Number.isNaN(e)||Number.isNaN(parseFloat(e))||(n=parseInt(t.query.p,10)),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"Hacker News Reader"})}),(0,r.jsx)(h,{page:n})]})}h.defaultProps={className:""}},9008:function(e,t,n){e.exports=n(2636)},6402:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(7294);function s(e){let t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;let n=String(e).match(/\d+/g);if(null==n||n.length<=2)return t;{let[e,t,...r]=n.map(e=>parseInt(e)),s=[e,t-1,...r],a=new Date(Date.UTC(...s));return a}}function a(e,t,n){return e+" "+(1!==e?t+"s":t)+" "+n}function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}let l=604800,u=2592e3,c=31536e3;function o({date:e,formatter:t=a,component:n="time",live:o=!0,minPeriod:d=0,maxPeriod:f=l,title:h,now:m=()=>Date.now(),...p}){let[x,j]=(0,r.useState)(m());(0,r.useEffect)(()=>{if(!o)return;let t=(()=>{let t=s(e).valueOf();if(!t)return console.warn("[react-timeago] Invalid Date provided"),0;let n=Math.round(Math.abs(x-t)/1e3),r=Math.min(Math.max(n<60?1e3:n<3600?6e4:n<86400?36e5:1e3*l,1e3*d),1e3*f);return r?setTimeout(()=>{j(m())},r):0})();return()=>{t&&clearTimeout(t)}},[e,o,f,d,m,x]);let N=s(e).valueOf();if(!N)return null;let w=Math.round(Math.abs(x-N)/1e3),v=N<x?"ago":"from now",[b,g]=w<60?[Math.round(w),"second"]:w<3600?[Math.round(w/60),"minute"]:w<86400?[Math.round(w/3600),"hour"]:w<l?[Math.round(w/86400),"day"]:w<u?[Math.round(w/l),"week"]:w<c?[Math.round(w/u),"month"]:[Math.round(w/c),"year"],y=void 0===h?"string"==typeof e?e:s(e).toISOString().substr(0,16).replace("T"," "):h,M="time"===n?{...p,dateTime:s(e).toISOString()}:p,O=a.bind(null,b,g,v);return r.createElement(n,i({},M,{title:y}),t(b,g,v,N,O,m))}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);