(()=>{var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t),e.d(t,{common:()=>v,extend:()=>l});const r=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{}).app;var n=e.n(r);const o=flarum.core.compat["common/extenders"];var a=e.n(o);const s=flarum.core.compat["common/models/User"];var i=e.n(s),l=[new(a().Model)(i()).attribute("flamarktPhoneNumber")];function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}const c=flarum.core.compat["common/app"];var f=e.n(c);const p=flarum.core.compat["common/Component"];var b=e.n(p);const h=flarum.core.compat["common/components/Select"];var d=e.n(h);const g=flarum.core.compat["common/utils/extractText"];var k=e.n(g),y=function(e){var t,r;function n(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).customMode=!1,t}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,u(t,r);var o=n.prototype;return o.oninit=function(t){e.prototype.oninit.call(this,t);var r=f().forum.attribute("flamarktPhoneNumberCountryCodes")||[],n=this.attrs.value||"";this.customMode=!!n&&!r.some((function(e){return 0===n.indexOf("+"+e[2])}))},o.view=function(){var e=this,t=f().forum.attribute("flamarktPhoneNumberCountryCodes")||[],r=this.attrs.value||"",n={},o=null,a=null;t.forEach((function(t,s){var i="+"+t[2];n[t[0]]=t[1]+" "+i,e.customMode||0!==r.indexOf(i)&&(r||0!==s)||(o=i,a=t[0])})),(f().forum.attribute("flamarktPhoneNumberUseAnyPrefix")||this.customMode)&&(n.custom=k()(f().translator.trans("flamarkt-phone-number.lib.field.custom")));var s=r.replace(o||"?","");return m(".FlamarktPhoneNumberInput",[t.length>0?d().component({className:"FlamarktPhoneNumberInput-select",options:n,value:a||"custom",onchange:function(n){if("custom"===n)return e.customMode=!0,void(r===o&&(null==e.attrs.onchange||e.attrs.onchange("")));e.customMode=!1;var a="+"+t.find((function(e){return e[0]===n}))[2];null==e.attrs.onchange||e.attrs.onchange(a+s.replace("+",""))},readonly:this.attrs.readonly,disabled:this.attrs.disabled}):null,m("input.FlamarktPhoneNumberInput-text.FormControl",{id:this.attrs.id,type:"text",value:s,onchange:function(r){var n=r.target.value;if(0===n.indexOf("+"))return e.customMode=!t.some((function(e){return 1===n.indexOf(e[2]+"")})),void(null==e.attrs.onchange||e.attrs.onchange(n));null==e.attrs.onchange||e.attrs.onchange((o||"")+n)},readonly:this.attrs.readonly,disabled:this.attrs.disabled,required:this.attrs.required})])},n}(b()),v={"components/PhoneNumberInput":y};const x=flarum.core.compat["common/extend"],P=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["pages/UserShowPage"];var N=e.n(P);n().initializers.add("flamarkt-phone-number",(function(){n().extensionData.for("flamarkt-phone-number").registerSetting({setting:"flamarkt-phone-number.searchable",type:"switch",label:n().translator.trans("flamarkt-phone-number.backoffice.settings.searchable"),help:n().translator.trans("flamarkt-phone-number.backoffice.settings.searchableHelp")}).registerSetting({setting:"flamarkt-phone-number.required",type:"switch",label:n().translator.trans("flamarkt-phone-number.backoffice.settings.required")}).registerSetting({setting:"flamarkt-phone-number.selectedPrefixes",type:"text",label:n().translator.trans("flamarkt-phone-number.backoffice.settings.selectedPrefixes"),help:n().translator.trans("flamarkt-phone-number.backoffice.settings.selectedPrefixesHelp")}).registerPermission({icon:"fas fa-mobile-alt",label:n().translator.trans("flamarkt-phone-number.backoffice.permissions.editOwn"),permission:"flamarkt-phone-number.editOwn",allowGuest:!0},"reply").registerPermission({icon:"fas fa-mobile-alt",label:n().translator.trans("flamarkt-phone-number.backoffice.permissions.useAnyPrefix"),permission:"flamarkt-phone-number.useAnyPrefix",allowGuest:!0},"reply"),(0,x.extend)(N().prototype,"oninit",(function(){this.phoneNumber=""})),(0,x.extend)(N().prototype,"show",(function(e,t){this.phoneNumber=t.attribute("flamarktPhoneNumber")||""})),(0,x.extend)(N().prototype,"fields",(function(e){var t=this;e.add("categories",m(".Form-group",[m("label",{for:"user-edit-phone-number"},n().translator.trans("flamarkt-phone-number.lib.field.label")),y.component({id:"user-edit-phone-number",value:this.phoneNumber,onchange:function(e){t.phoneNumber=e,t.dirty=!0},disabled:this.saving})]))})),(0,x.extend)(N().prototype,"data",(function(e){e.flamarktPhoneNumber=this.phoneNumber}))}))})(),module.exports=t})();
//# sourceMappingURL=backoffice.js.map