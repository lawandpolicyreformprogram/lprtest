!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.linkit=e())}(self,(()=>(()=>{var t={"ckeditor5/src/core.js":(t,e,i)=>{t.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/typing.js":(t,e,i)=>{t.exports=i("dll-reference CKEditor5.dll")("./src/typing.js")},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},e={};function i(n){var o=e[n];if(void 0!==o)return o.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,i),s.exports}i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};return(()=>{"use strict";i.d(n,{default:()=>u});var t=i("ckeditor5/src/core.js"),e=i("ckeditor5/src/typing.js");class o extends t.Plugin{init(){this.attrs=["data-entity-type","data-entity-uuid","data-entity-substitution"],this._allowAndConvertExtraAttributes(),this._removeExtraAttributesOnUnlinkCommandExecute(),this._refreshExtraAttributeValues(),this._addExtraAttributesOnLinkCommandExecute()}_allowAndConvertExtraAttributes(){const t=this.editor;t.model.schema.extend("$text",{allowAttributes:this.attrs}),this.attrs.forEach((e=>{t.conversion.for("downcast").attributeToElement({model:e,view:(t,{writer:i})=>{const n=i.createAttributeElement("a",{[e]:t},{priority:5});return i.setCustomProperty("link",!0,n),n}}),t.conversion.for("upcast").elementToAttribute({view:{name:"a",attributes:{[e]:!0}},model:{key:e,value:t=>t.getAttribute(e)}})}))}_addExtraAttributesOnLinkCommandExecute(){const t=this.editor,e=t.commands.get("link");let i=!1;e.on("execute",((e,n)=>{if(n.length<3)return;if(i)return void(i=!1);e.stop(),i=!0;const o=n[n.length-1],s=this.editor.model,r=s.document.selection;s.change((e=>{t.execute("link",...n);const i=r.getFirstPosition();this.attrs.forEach((t=>{if(r.isCollapsed){const n=i.textNode||i.nodeBefore;o[t]?e.setAttribute(t,o[t],e.createRangeOn(n)):e.removeAttribute(t,e.createRangeOn(n)),e.removeSelectionAttribute(t)}else{const i=s.schema.getValidRanges(r.getRanges(),t);for(const n of i)o[t]?e.setAttribute(t,o[t],n):e.removeAttribute(t,n)}}))}))}),{priority:"high"})}_removeExtraAttributesOnUnlinkCommandExecute(){const t=this.editor,i=t.commands.get("unlink"),n=this.editor.model,o=n.document.selection;let s=!1;i.on("execute",(i=>{s||(i.stop(),n.change((()=>{s=!0,t.execute("unlink"),s=!1,n.change((t=>{let i;this.attrs.forEach((s=>{i=o.isCollapsed?[(0,e.findAttributeRange)(o.getFirstPosition(),s,o.getAttribute(s),n)]:n.schema.getValidRanges(o.getRanges(),s);for(const e of i)t.removeAttribute(s,e)}))}))})))}),{priority:"high"})}_refreshExtraAttributeValues(){const t=this.editor,e=this.attrs,i=t.commands.get("link"),n=this.editor.model,o=n.document.selection;e.forEach((t=>{i.set(t,null)})),n.document.on("change",(()=>{e.forEach((t=>{i[t]=o.getAttribute(t)}))}))}static get pluginName(){return"LinkitEditing"}}const s=jQuery;function r(t,e){var i=s("<li>").addClass("linkit-result-line"),n=s("<div>").addClass("linkit-result-line-wrapper");return n.append(s("<span>").html(e.label).addClass("linkit-result-line--title")),e.hasOwnProperty("description")&&n.append(s("<span>").html(e.description).addClass("linkit-result-line--description")),i.append(n).appendTo(t)}function a(t,e){var i=this.element.autocomplete("instance"),n={};e.forEach((function(t){const e=t.hasOwnProperty("group")?t.group:"";n.hasOwnProperty(e)||(n[e]=[]),n[e].push(t)})),s.each(n,(function(e,n){e.length&&t.append('<li class="linkit-result-line--group ui-menu-divider">'+e+"</li>"),s.each(n,(function(e,n){i._renderItemData(t,n)}))}))}class l extends t.Plugin{static get requires(){return[o]}init(){this._state={};this.editor.config.get("linkit");this._enableLinkAutocomplete(),this._handleExtraFormFieldSubmit(),this._handleDataLoadingIntoExtraFormField()}_enableLinkAutocomplete(){const t=this.editor,e=t.config.get("linkit"),i=t.plugins.get("LinkUI").formView;let n=!1;i.extendTemplate({attributes:{class:["ck-vertical-form","ck-link-form_layout-vertical"]}}),t.plugins.get("ContextualBalloon")._rotatorView.content.on("add",((t,o)=>{if(o!==i||n)return;let l;!function(t,e){const{autocompleteUrl:i,selectHandler:n,closeHandler:o,openHandler:l}=e,u={cache:{},ajax:{dataType:"json",jsonp:!1}},d={appendTo:t.closest(".ck-labeled-field-view"),source:function(t,e){const{cache:n}=u;var o=t.term;n.hasOwnProperty(o)?e(n[o]):s.ajax(i,{success:function(t){n[o]=t.suggestions,e(t.suggestions)},data:{q:o},...u.ajax})},select:n,focus:()=>!1,search:()=>!d.isComposing,close:o,open:l,minLength:1,isComposing:!1},c=s(t).autocomplete(d),p=c.data("ui-autocomplete");p.widget().menu("option","items","> :not(.linkit-result-line--group)"),p._renderMenu=a,p._renderItem=r,c.autocomplete("widget").addClass("linkit-ui-autocomplete"),c.on("click",(function(){c.autocomplete("search",c.val())})),c.on("compositionstart.autocomplete",(function(){d.isComposing=!0})),c.on("compositionend.autocomplete",(function(){d.isComposing=!1}))}(i.urlInputView.fieldView.element,{...e,selectHandler:(t,{item:e})=>{if(!e.path)throw"Missing path param."+JSON.stringify(e);if(e.entity_type_id||e.entity_uuid||e.substitution_id){if(!e.entity_type_id||!e.entity_uuid||!e.substitution_id)throw"Missing path param."+JSON.stringify(e);this.set("entityType",e.entity_type_id),this.set("entityUuid",e.entity_uuid),this.set("entitySubstitution",e.substitution_id)}else this.set("entityType",null),this.set("entityUuid",null),this.set("entitySubstitution",null);return t.target.value=e.path,l=!0,!1},openHandler:t=>{l=!1},closeHandler:t=>{l||(this.set("entityType",null),this.set("entityUuid",null),this.set("entitySubstitution",null)),l=!1}}),n=!0,i.urlInputView.fieldView.template.attributes.class.push("form-linkit-autocomplete")}))}_handleExtraFormFieldSubmit(){const t=this.editor,e=t.plugins.get("LinkUI").formView,i=t.commands.get("link");this.listenTo(e,"submit",(()=>{const t={"data-entity-type":this.entityType,"data-entity-uuid":this.entityUuid,"data-entity-substitution":this.entitySubstitution};i.once("execute",((e,i)=>{if(i.length<3)i.push(t);else{if(3!==i.length)throw Error("The link command has more than 3 arguments.");Object.assign(i[2],t)}}),{priority:"highest"})}),{priority:"high"})}_handleDataLoadingIntoExtraFormField(){const t=this.editor.commands.get("link");this.bind("entityType").to(t,"data-entity-type"),this.bind("entityUuid").to(t,"data-entity-uuid"),this.bind("entitySubstitution").to(t,"data-entity-substitution")}static get pluginName(){return"Linkit"}}const u={Linkit:l}})(),n=n.default})()));