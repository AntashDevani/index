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
	},
	'jiosaavn':"https://imantashdevani.github.io/jiosaavn/index.html",
}
var JsonNodes = {
	BG:[{"name":"div","attr":{"class":"bg"}}],
	Main:[{"name":"div","attr":{"class":"main"}}],
	header:[{"name":"header","attr":{"class":"remove"},"children":[{"name":"div","attr":{"width33":"","google":""},"children":[{"name":"div","attr":{"google_logo":""}},{"name":"input","attr":{"name":"text","class":"search-input","accessKey":"g","special":""}}]},{"name":"div","attr":{"width33":"","time":""},"children":[{"name":"span","attr":{"class":"time"}}]},{"name":"div","attr":{"width33":"","control_area":""},"children":[{"name":"div","attr":{"class":"setting","accessKey":"s"}},{"name":"div","attr":{"class":"cancel hide","accessKey":"c"}},{"name":"div","attr":{"class":"bettary"},"children":[{"name":"span","attr":{"class":"bettarypercentage"}}]},{"name":"div","attr":{"class":"theme-switch-wrapper"},"children":[{"name":"label","attr":{"class":"theme-switch","for":"checkbox"},"children":[{"name":"input","attr":{"type":"checkbox","accessKey":"a","id":"checkbox"}},{"name":"div","attr":{"class":"slider round"}}]}]}]}]}],
	main:[{"name":"main"}],
	briefs:[{"name":"div","children":[{"name":"h1","attr":{"class":"gretting"}},{"name":"h1","attr":{"class":"brief"}}]}],
	footer:[{"name":"footer","children":[{"name":"iframe","attr":{"src":external_url.jiosaavn}}]}],
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
			let p = addZero(parseInt(c*100));
			let d = ((b.charging) ? p+'^' : p)
			ADs('.bettarypercentage').text(d);
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
			ADs('.gretting').text((x) ? _.gret+', '+atob(x) : _.gret)
		}
	}

	function _c_c_(a,b){
		ADs('.brief').text(atob(a) + ' - '+ atob(b));
	}

	function google_search(x){
		window.open(external_url.google_query()+x)
	}

	function search_input(){
		ADs("input.search-input")[0][_.S[0]](_.S[3],function(e){
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

	async function ads_main_theme(){
		ADs("main").append(await ADs.j2h(JsonNodes.briefs))
		let company = _.L.getItem('Xy5j')
		let country = _.L.getItem('Xy5D')
		_gretting(true)
		_c_c_(company,country)
	}

	async function add_main_page(){
		ADs(".main").append(await ADs.j2h(JsonNodes.main)).then(()=>{
			set_storage()
			ADs("main").css({height:'calc('+_.W.innerHeight+'px - 160px)'})
			ads_main_theme()
		})
	}

	function enable_dark_mode(){
		let l = localStorage.getItem("Xy5kbQ");
		let b = ADs("body");
		if (l=="true"){
			ADs("#checkbox").checked=true;
			b[0].classList.add("dark")
		}
		else if (l=="false") {
			ADs("#checkbox").checked=false;
			b[0].classList.remove("dark")
		}
	}

	function dark_mode(){
		let x = ADs('#checkbox')
		x[0][_.S[0]](_.S[5],()=>{
			let l = localStorage.getItem("Xy5kbQ");
			if (x[0].checked){localStorage.setItem("Xy5kbQ",true)}
			else{localStorage.setItem("Xy5kbQ",false)}
			enable_dark_mode()
		})
	}

	async function main(){
		_.D.title="ADs - New Tab";
		ADs(_.D.body).append(await ADs.j2h(JsonNodes.BG)).then(function(r){
			enable_dark_mode()
			var x = ADs('.bg')
			get_bg_image().then(function(r){
				if (r=='done'){
					ADs('.bg').css({'background-image':'url('+_.BGImage+')'})
					let l = localStorage.getItem("Xy5kbQ");
					if (l!=="true"){
						ADs('.bg').addClass("bg-animate")
					}
				}
			})	
		})
		ADs(_.D.body).append(await ADs.j2h(JsonNodes.Main))
		ADs(".main").append(await ADs.j2h(JsonNodes.header)).then((r)=>{
			ADs(".time").text(getTime())
			getBettary()
			search_input()
			ADs("input.search-input")[0].focus()
			ADs('div[google_logo]').onclick=function(){_.W.open(external_url.google)}
			dark_mode()
		})
		add_main_page()
		ADs(".main").append(await ADs.j2h(JsonNodes.footer))
	}

	setInterval(()=>{
		ADs(".time").text(getTime())
		getBettary()
		_gretting()
	},1000)

	function main_resize(e){
		var h=_.W.innerHeight-160;
		if (h>300){
			ADs("main").css({height:'calc('+h+'px)'})
		}
	}

	_.D[_.S[0]](_.S[1],main())
	_.W.onresize = function(e){main_resize(e)}
}