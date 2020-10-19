import { ads } from "./ads.js";
"use strict";
const _ = {
	W:window,
	D:document,
	H:history,
	L:localStorage,
	chrome:navigator.userAgent.indexOf("Chrome"),
	S:['addEventListener','load','resize','keyup','click','change'],
	gret:"",
	BGImage:""
}

var external_url = {
	'google':'https://google.com',
	'google_query':function(){
		return this.google+'/search?q='
	}
}

var Nodes = {
	BG:'<div class="bg"></div>',
	Main:'<div class="main"></div>',
	header:'<header><div width33 google><div google-logo></div><input name="text" class="search-input" accessKey="g" special/></div><div width33 time><span class="time"></span></div><div width33 control_area><div class="setting" accessKey="s"></div><div accessKey="c" class="cancel hide"></div><div class="bettary"><span class="bettarypercentage"></span></div><div class="theme-switch-wrapper"><label class="theme-switch" for="checkbox"><input type="checkbox" accessKey="a" id="checkbox"/><div class="slider round"></div></label></div></div></header>',
	main:'<main></main>',
	briefs:'<div><h1 class="gretting"></h1><h1 class="brief"></h1></div>',
	setting_from:'<form><div style="margin-left:100px;margin-top 40px;"><br><div><span class="form-tag-color">Name:</span><br><input class="search-input" name="name"></div><br><div><span class="form-tag-color">Country:</span><br><input class="search-input" name="country"></div><br><div><span class="form-tag-color">Company:</span><br><input class="search-input" name="company"></div><br><button id="submit-button" class="button round">Save</button><p style="color:green;" class="hide" id="msg">Successfully Saved !</p></div></form>',
	footer:'<footer><iframe src="https://imantashdevani.github.io/index_2.html"></iframe></footer>'
}
var able = true;
if (!_.L){document.write('<h1 style="line-height:2;color:red;">localStorage is not Supported</h1>');able=false}
if (_.chrome==-1){document.write('<h1 style="line-height:2;color:red;">Use Chrome Browser for Better Experince</h1>');able=false}
if (able){
	async function get_bg_image(){
		return new Promise(async function(resolve,reject){
			let d = await fetch('https://picsum.photos/'+_.W.innerWidth+'/'+_.W.innerHeight).then(async function(p){return URL.createObjectURL(await p.blob())});
			_.BGImage = d;
			resolve('done')
		})
	}

	function addZero(a){if(a<10){a="0"+a}return a};

	function getTime(){
		let d = new Date();
		let t={
			dd:addZero(d.getDate()),
			MM:addZero(d.getMonth()+1),
			yy:addZero(d.getFullYear()),
			HH:addZero(d.getHours()),
			mm:addZero(d.getMinutes()),
			ss:addZero(d.getSeconds()+1)
		}
		return t.dd+'/'+t.MM+'/'+t.yy+' '+t.HH+':'+t.mm+':'+t.ss
	}

	function getBettary(){
		navigator.getBattery().then(function (b) {
			let c = b.level;
			let bet = ads.node('.bettarypercentage')[0];
			let p = addZero(parseInt(c*100));
			let d = ((b.charging) ? p+'^' : p)
			bet.innerText=d;
		})
	}

	function set_storage(){
		let storage_default = {
			Xy51:"", // UserName
			Xy5j:"U29sdXRpb25Gb3VuZGVy", // Company
			Xy5D:"SW5kaWE=", // Country
			Xy5kbQ:"false", // Dark Mode
			first:1
		}
		if (!_.L.getItem('first')){
			_.L.clear()
			for (let i in storage_default){
				_.L.setItem(i,storage_default[i])
			}
		}
	}

	function _gretting(direct=false){
		let h = new Date().getHours();
		let d;
		if (h>=5&&h<12){d="Good Morning"}else if(h>=12&&h<17){d="Good Afternoon"}else if(h>=17&&h<22){d="Good Evening"}else{d="Good Night"}
		if (!_.gret||_.gret!=d||direct){
			_.gret=d;
			let x=localStorage.getItem("Xy51");
			ads.node('.gretting')[0].innerText=((x) ? _.gret+', '+atob(x) : _.gret);
		}
	}

	function _c_c_(a,b){
		var x= ads.node('.brief');
		x[0].innerText = atob(a) + ' - '+ atob(b);
	}

	function google_search(x){
		window.open(external_url.google_query()+x)
	}

	function search_input(){
		ads.node("input.search-input")[0][_.S[0]](_.S[3],function(e){
			let x=this.value;
			if (x.trim()){
				if(e.ctrlKey && 13==e.keyCode){
					google_search(x)
				}
				else if (13==e.keyCode){
					if (x.indexOf("https://")!==-1||x.indexOf('http://')!==-1||x.indexOf('ftp://')!==-1){
						window.open(x)
					}
					else{
						google_search(x)
					}
				}
			}
		})
	}

	function ads_main_theme(){
		ads.add_html("main",Nodes.briefs)
		let company = _.L.getItem('Xy5j')
		let country = _.L.getItem('Xy5D')
		_gretting(true)
		_c_c_(company,country)
	}

	function ads_open_setting(){
		ads.add_html("main",Nodes.setting_from)
	}

	function add_main_page(){
		ads.add_html(".main",Nodes.main).then((r)=>{
			if(r=='done'){
				set_storage()
				ads.css("main",['height','calc('+_.W.innerHeight+'px - 160px)'])
				ads_main_theme()
			}
		})
	}

	function enable_dark_mode(){
		let l = localStorage.getItem("Xy5kbQ");
		let b = ads.node("body");
		if (l=="true"){
			ads.node("#checkbox")[0].checked=true;
			b[0].classList.add("dark")
		}
		else if (l=="false") {
			ads.node("#checkbox")[0].checked=false;
			b[0].classList.remove("dark")
		}
	}

	function dark_mode(){
		let x = ads.node('#checkbox')
		x[0][_.S[0]](_.S[5],()=>{
			let l = localStorage.getItem("Xy5kbQ");
			if (x[0].checked){localStorage.setItem("Xy5kbQ",true)}
			else{localStorage.setItem("Xy5kbQ",false)}
			enable_dark_mode()
		})
	}

	function main(){
		document.title="ADs - New Tab";
		ads.add_html(_.D.body,Nodes.BG).then(function(result){
			if (result=='done'){
				enable_dark_mode()
				var x = ads.node('.bg')
				get_bg_image().then(function(r){
					if (r=='done'){
						ads.css('.bg',['background-image','url('+_.BGImage+')','background-size',_.W.innerWidth+'px'+' '+_.W.innerHeight+'px'])
						let l = localStorage.getItem("Xy5kbQ");
						if (l!=="true"){ads.node('.bg')[0].classList.add("bg-animate")}
					}
				})
			}
		})

		ads.add_html(_.D.body,Nodes.Main)
		ads.add_html(".main",Nodes.header).then(function(r){
			if (r=='done'){
				ads.node('.time')[0].innerText=getTime();
				getBettary()
				search_input()
				ads.node("input.search-input")[0].focus()
				ads.node('div[google-logo]')[0].onclick=function(){_.W.open(external_url.google)}
				dark_mode()
			}
		})
		add_main_page()
		ads.add_html(".main",Nodes.footer)
		ads.add_html("head",'<link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet"/><link rel="stylesheet" href="css/app.css"/>')
	}

	setInterval(()=>{
		ads.node('.time')[0].innerText=getTime();
		getBettary()
		_gretting()
	},1000)

	function main_resize(e){
		var h=_.W.innerHeight-160;
		if (h>300){
			ads.css("main",['height','calc('+h+'px)'])
		}
		ads.css('.bg',['background-size',_.W.innerWidth+'px'+' '+_.W.innerHeight+'px'])
	}

	setTimeout(()=>{
		ads.node(".setting")[0].onclick=function(){
			ads.addclass(ads.node(this),'hide')
			ads.removeclass(ads.node(".cancel"),'hide')
			ads.node("main")[0].innerHTML="";
			ads_open_setting()
		}
		ads.node(".cancel")[0].onclick=function(){
			ads.addclass(ads.node(this),'hide')
			ads.removeclass(ads.node(".setting"),'hide');
			ads.node("main")[0].innerHTML="";
			ads_main_theme()
		}
	},100)

	_.D[_.S[0]](_.S[1],main())
	_.W.onresize = function(e){main_resize(e)}
}