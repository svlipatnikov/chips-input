(this["webpackJsonpchips-input"]=this["webpackJsonpchips-input"]||[]).push([[0],[,,,function(e,t,n){e.exports={wrapperNorm:"chipsItem_wrapperNorm__3z2wF",wrapperAlarm:"chipsItem_wrapperAlarm__23v36",input:"chipsItem_input__1idEC",closeBtn:"chipsItem_closeBtn__2uy89"}},function(e,t,n){e.exports={wrapper:"chipsInput_wrapper__3BAaU",inputNorm:"chipsInput_inputNorm__1kYzW",inputAlarm:"chipsInput_inputAlarm__m01fm"}},,,function(e,t,n){e.exports={message:"alarmMessage_message__1CSnM"}},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r,c,i=n(1),a=n.n(i),s=n(6),u=n.n(s),o=(n(12),n(2)),l=n(7),p=n.n(l),f=n(0),h=function(e){return e.show?Object(f.jsx)("p",{className:p.a.message,children:"\u0417\u0430\u043a\u0440\u043e\u0439\u0442\u0435 \u043a\u0430\u0432\u044b\u0447\u043a\u0438 \u0441 \u0434\u0432\u0443\u0445 \u0441\u0442\u043e\u0440\u043e\u043d"}):null};function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function b(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function m(e,t){var n=e.title,a=e.titleId,s=b(e,["title","titleId"]);return i.createElement("svg",j({width:20,height:20,viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,r||(r=i.createElement("path",{d:"M8 8L24 24",stroke:"#curent",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round"})),c||(c=i.createElement("path",{d:"M8 24L24 8",stroke:"#curent",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round"})))}var O=i.forwardRef(m),g=(n.p,n(3)),d=n.n(g),v=function(e){var t=e.value,n=e.onChange,r=e.setAlarm,c=Object(i.useState)(t),a=Object(o.a)(c,2),s=a[0],u=a[1],l=Object(i.useState)(!1),p=Object(o.a)(l,2),h=p[0],j=p[1],b=Object(i.useRef)(null);Object(i.useEffect)((function(){r(h)}),[h,r]);return Object(f.jsxs)("div",{className:h?d.a.wrapperAlarm:d.a.wrapperNorm,children:[Object(f.jsx)("input",{className:d.a.input,value:s,onChange:function(e){u(e.target.value),j(!1),!e.target.value&&n("")},onClick:function(e){e.stopPropagation()},onBlur:function(){s.split('"').length%2===0?(j(!0),b.current.focus()):s!==t&&(n(s.split(",").filter((function(e){return!!e})).join()),u(s.split(",").filter((function(e){return!!e})).join()))},size:s.length+2||1,ref:b}),Object(f.jsx)("button",{className:d.a.closeBtn,onClick:function(){n(""),h&&r(!1)},children:Object(f.jsx)(O,{})})]})},w=function(e){if(!e.length)return[];for(var t=[],n=!1,r=0,c=0;c<e.length;c++)'"'===e[c]&&(n=!n),","===e[c]&&(r===c?r=c+1:n||(t.push(e.substr(r,c-r)),r=c+1));return r<e.length&&t.push(e.substr(r,e.length-r)),t},x=n(4),_=n.n(x),k=function(e){var t=e.value,n=e.onChange,r=Object(i.useRef)(null),c=Object(i.useState)(""),a=Object(o.a)(c,2),s=a[0],u=a[1],l=Object(i.useState)(!1),p=Object(o.a)(l,2),j=p[0],b=p[1],m=Object(i.useMemo)((function(){return w(t)}),[t]),O=function(e){e.length?n(e.join()):n("")},g=function(e){return function(t){t?m[e]=t:m.splice(e,1),O(m)}};return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("div",{className:_.a.wrapper,onClick:function(){r.current.focus()},children:[m.map((function(e,t){return Object(f.jsx)(v,{value:e,onChange:g(t),setAlarm:b},e+t)})),Object(f.jsx)("input",{type:"text",ref:r,value:s,className:j?_.a.inputAlarm:_.a.inputNorm,placeholder:t?"":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0441\u043b\u043e\u0432\u0430",size:t?s.length+1:22,onChange:function(e){u(e.target.value),j&&b(!1)},onKeyDown:function(e){","===e.key&&s.split('"').length%2===1?setTimeout((function(){s.length&&n(t?t+","+s:s),u("")})):s.length||"Backspace"!==e.key&&"Delete"!==e.key||(m.splice(m.length-1,1),O(m))},onBlur:function(){s.length&&(s.split('"').length%2===1?(n(t?t+","+s:s),u("")):(r.current.focus(),b(!0)))}})]}),Object(f.jsx)(h,{show:j})]})};n(14);var y=function(){var e=Object(i.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(k,{value:n,onChange:r}),Object(f.jsx)("h5",{children:"\u0421\u0442\u0440\u043e\u043a\u043e\u0432\u043e\u0435 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0435:"}),Object(f.jsx)("div",{children:n})]})};u.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(y,{})}),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.6bdb2067.chunk.js.map