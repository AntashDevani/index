"use strict";
!function(w,d,t){
	t(w,d)
}
(window,document,function(W,D){
	var version = "1.0",
		ADs = function(selector){return new ADs.fn.init(selector)}
	function toggleclass(a,d,s){
		let p = s?'add':'remove';
		if (!a.length>1 || !d){return a;}
		else{
			let c = d.split(" ");
			for(let i=0;i<a.length;i++){
				for(let x=0;x<c.length;x++){
					a[i].classList[p](c[x]);
				}
			}
			return a;
		}
	}
	function addInNode(A,D,s,m){
		if (!A.length>1 || !D){return A;}
		else{
			for(let i=0;i<A.length;i++){
				for(s in D){
					if (m=='c'){
						A[i].style.setProperty(s,D[s])
					}
					else if (m=='a'){
						A[i].setAttribute(s,D[s])
					}
				}
			}
		}
	}
	var el;
	function gethtml(arr,level=0,pre_ele){
		if (arr){
			for (let x=0;x<arr.length;x++){
				var root = D.createElement(arr[x].name);
				for (let a in arr[x].attr){
					var attr = D.createAttribute(a);
					attr.value=arr[x].attr[a]
					root.setAttributeNode(attr)
				}
				let n = root;
				if (pre_ele)pre_ele.appendChild(root);
				gethtml(arr[x].children,level+1,n)
			}
		}
		if (pre_ele){
			el=pre_ele
		}
	}
	ADs.j2h = async function(v){
		let data,error,html;
		if(!v){return;}
		else if(typeof v=="object"){data=v}
		else if(typeof v=="string"){data=JSON.stringify(v)}
		else{error="Format not Readble"}
		if(data){el=false;gethtml(data);html=el;el=false}
		if(html){return Promise.resolve(html)}
		else{return Promise.reject(error)}
	}
	ADs.fn = ADs.prototype = {
		jquery:version,
		constructor:ADs,
		selector: "",
		length: 0,
		addClass: function(value){
			return toggleclass(this,value,true);
		},
		removeClass:function(value){
			return toggleclass(this,value);
		},
		css:function(value){
			return addInNode(this,value,0,'c')
		},
		attr:function(value){
			return addInNode(this,value,0,'a')
		},
		append:async function(html){
			if(!this.length>0)return this;
			else{
				for(let i=0;i<this.length;i++){
					if(typeof html=="object"){
						this[i].appendChild(html)
					}
					else {
						this[i].innerHTML+=html;
					}
				}
			}
			return Promise.resolve(this)
		},
		text:function(text){
			if(!this.length>0)return this;
			else{
				for(let i=0;i<this.length;i++){
					this[i].innerText=text;
				}
			}
			return Promise.resolve(this)
		}
	}
	ADs.fn.init = function(selector){
		if (!selector){
			return;
		}
		else {
			if (typeof(selector)=='object'){
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}
			else {
				let x = D.querySelectorAll(selector);
				for(let i=0;i<x.length;i++){this[i]=x[i]}
				this.length=x.length;
				this.context = document;
				this.selector = selector;
				return this;
			}
		}
	}
	ADs.fn.init.prototype=ADs.prototype;
	W.ADs=ADs;
});
