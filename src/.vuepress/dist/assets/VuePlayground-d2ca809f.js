import{e as p,i as v,f as c,s as n,g,v as f,h as y,j as a,I as m,_ as w}from"./app-7efa2fe1.js";const R=e=>JSON.parse(decodeURIComponent(e));var h=p({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(e){const i=v(),o=c(!0),t=n(),l=n(),s=g(()=>f({},i,R(e.settings))),u=async()=>{const{ReplStore:r,Repl:d}=await w(()=>import("./vue-repl-05d05fdb.js"),["assets/vue-repl-05d05fdb.js","assets/app-7efa2fe1.js","assets/commonjs-dynamic-modules-302442b1.js","assets/commonjsHelpers-042e6b4d.js"]);t.value=d,l.value=new r({serializedState:decodeURIComponent(e.files)}),s.value.vueVersion&&await l.value.setVueVersion(s.value.vueVersion)};return y(async()=>{await u(),o.value=!1}),()=>[a("div",{class:"vue-playground-wrapper"},[e.title?a("div",{class:"header"},decodeURIComponent(e.title)):null,a("div",{class:"repl-container"},[o.value?a(m,{class:"preview-loading",height:192}):null,t.value?a(t.value,{store:l.value,autoResize:!0,...s.value,layout:"horizontal"}):null])])]}});export{h as default};
