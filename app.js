var request = require('request');
var cheerio = require('cheerio');
var mkdirp  = require('mkdirp');
var fs      = require('fs');

var comic = process.argv[2]?(process.argv[2]*1):119874;//덴마  //335885;//가우스전자
var url = "http://m.comic.naver.com/webtoon/detail.nhn?titleId="+comic+"&no=";
var maxno = process.argv[3]?(process.argv[3]*1):400;

function download(url, no){
	request({followRedirect:false, url:url+no}, function(err, response, html){
		if(err){
			console.log(err);
			throw err;
		}
		var $ = cheerio.load(html);
		var imglist = $('#toonLayer ul li img').map(function(i, el){
			var elid   = $(this).attr().id;
			var imgUrl = ($(this).attr()['data-lazy-src'])?$(this).attr()['data-lazy-src']:$(this).attr().src;
			var filename = no+"_"+elid+imgUrl.slice(imgUrl.lastIndexOf("."));
			if (elid)
				return {id : elid, url : imgUrl, filename:filename};
			else
				return;
		}).get();

		if(imglist.length > 0){
			mkdirp(comic+"", function(err) {
				if(!err){
					imglist.map(function(el){
						fs.exists(comic+'/'+el.filename , function (exists) {
							if(!exists)
								request(el.url).pipe(fs.createWriteStream(comic+'/'+el.filename));
							//else 
							//	console.log(el.filename + " it's there");
						});
					});
				} else {
					console.log(err);
				}
			});
		}
	});
}

for(var no =1; no <= maxno; no++){
	download(url,no);
}