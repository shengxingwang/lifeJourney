 "use strict";

//  var dappAddress = "n1jpeMt9t7E7bWDsP9k21PhmT3Pt3XSYmgk"; //测试网环境
   var dappAddress = "n1yWmszfMy19rzSespfigbLXFESgkJJU3WR";//主网环境
    var nebulas = require("nebulas"),
        Account = nebulas.Account,
        neb = new nebulas.Neb();
//  neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));//测试网环境
    neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));// 
     
 	function isArray(obj){ 
      return (typeof obj=='object')&&obj.constructor==Array; 
    };
    //获取url中的参数
	function getQueryString(name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); // 匹配目标参数
	  var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
	  if (result != null) {
	    return decodeURIComponent(result[2]);
	  } else {
	    return null;
	  }
	}
