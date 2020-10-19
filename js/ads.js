"use strict";
const ads = {};
ads.node=function(id){
	if(typeof(id)=='object'){
		return id
	}
	else{
		return document.querySelectorAll(id)
	}
}
ads.add_html=function(root,html){
	return new Promise(function(resolve,reject){
		var x=ads.node(root);
		var have=false;
		if(typeof(root)=='object'){
			root.innerHTML+=html;
			resolve('done')
		}
		else{
			if(x.length>0){
				x[0].innerHTML+=html;
				resolve('done')
			}
			else{
				alert(new Error("Node not Founder "+root));
				location.reload()
			}
		}
	})
}
ads.css = function(node,attrs){
	let x=ads.node(node);
	if (x.length > 0){
		for (let i=0;i<attrs.length;i++){
			if (i%2!=0){
				x[0].style.setProperty(attrs[i-1],attrs[i])
			}
		}
	}
	else {
		alert(Error("Node not Found"))
	}
}
ads.addclass=function(node,cls){let x=ads.node(node);if(x.length){x[0].classList.add(cls)}else{x.classList.add(cls)}}
ads.removeclass=function(node,cls){let x=ads.node(node);if(x.length){x[0].classList.remove(cls)}else{x.classList.remove(cls)}}
ads.SetAttr=function(node,attrs){
	let x=ads.node(node);
	if (x.length > 0){
		for (let i=0;i<attrs.length;i++){
			if (i%2!=0){
				x[0].setAttribute(attrs[i-1],attrs[i])
			}
		}
	}
	else {
		alert(Error("Node not Found"))
	}
}
export { ads }