(()=>{var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t),e.d(t,{common:()=>f,extend:()=>l});const r=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{}).app;var n=e.n(r);const o=flarum.core.compat["common/extenders"];var a=e.n(o);const i=flarum.core.compat["common/models/User"];var s=e.n(i),l=[new(a().Model)(s()).attribute("flamarktPhoneNumber")];function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}const c=flarum.core.compat["common/Component"];var p=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,u(t,r),n.prototype.view=function(){var e=this;return m("input.FormControl",{id:this.attrs.id,type:"text",value:this.attrs.value,onchange:function(t){null==e.attrs.onchange||e.attrs.onchange(t.target.value)},readonly:this.attrs.readonly,disabled:this.attrs.disabled,required:this.attrs.required})},n}(e.n(c)()),f={"components/PhoneNumberInput":p};const b=flarum.core.compat["common/extend"],d=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["pages/UserShowPage"];var h=e.n(d);n().initializers.add("flamarkt-phone-number",(function(){n().extensionData.for("flamarkt-phone-number").registerSetting({setting:"flamarkt-phone-number.searchable",type:"switch",label:n().translator.trans("flamarkt-phone-number.backoffice.settings.searchable"),help:n().translator.trans("flamarkt-phone-number.backoffice.settings.searchableHelp")}).registerSetting({setting:"flamarkt-phone-number.required",type:"switch",label:n().translator.trans("flamarkt-phone-number.backoffice.settings.required")}).registerPermission({icon:"fas fa-mobile-alt",label:n().translator.trans("flamarkt-phone-number.backoffice.permissions.editOwn"),permission:"flamarkt-phone-number.editOwn",allowGuest:!0},"moderate"),(0,b.extend)(h().prototype,"oninit",(function(){this.phoneNumber=""})),(0,b.extend)(h().prototype,"show",(function(e,t){this.phoneNumber=t.attribute("flamarktPhoneNumber")||""})),(0,b.extend)(h().prototype,"fields",(function(e){var t=this;e.add("categories",m(".Form-group",[m("label",{for:"user-edit-phone-number"},n().translator.trans("flamarkt-phone-number.lib.field.phoneNumber")),p.component({id:"user-edit-phone-number",value:this.phoneNumber,onchange:function(e){t.phoneNumber=e,t.dirty=!0},disabled:this.saving})]))})),(0,b.extend)(h().prototype,"data",(function(e){e.flamarktPhoneNumber=this.phoneNumber}))}))})(),module.exports=t})();
//# sourceMappingURL=backoffice.js.map