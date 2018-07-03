var page = 1;
var pageCount = 100;
var age =null;
function getList(age){
	//搜索
    var from = Account.NewAccount().getAddressString();
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var callFunction = "getAgeRecord";
    var callArgs = "[\""+ age + "\",\""+ page + "\"]";
    var contract = {
      "function":callFunction,
      "args":callArgs
    }
//      console.log("Account:"+Account);
//      console.log("callArgs:"+callArgs)
    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(
        function(resp){
        cbSearchNew(resp);
    }).catch(function(err){
        console.log("error:"+err.message);
    })
}

function cbSearchNew(resp){
    var result = resp.result;
    if(result === 'null'){
        // $(".result").addClass("hide");
        // $(".birthSay").removeClass("hide");
    }else{
        try{
          result = JSON.parse(result);
          if(isArray(result)) {
          	var box= $("#listcon");
          	var htmlSrt = "";
          	if(result.length<=0){
          		$("#emptytip").addClass("show");
          		box.html("");
          		return false;
          	}
          	for(var i = 0;i<result.length;i++){
          		var d = result[i];
          		htmlSrt+="<li>"+
							"<p class=\"topp\">"+
								"<span class=\"t fl\">"+d.title+"</span>"+
								"<a class=\"fr\" href=\"path_road.html?author="+d.author+"\">"+d.author+"</a>"+
							"</p>"+
							"<p class=\"con\">"+d.content+" </p>"+
						"</li>";
          	}
          	$("#emptytip").removeClass("show");
          	box.html(htmlSrt);
      	}else{
            alert(result);
        };
        }catch(err){
        	
        }
    }
};
function getpageCount(age){
	//搜索
    var from = Account.NewAccount().getAddressString();
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var callFunction = "getTotalAgePage";
    var callArgs = "[\""+ age + "\"]";
    var contract = {
      "function":callFunction,
      "args":callArgs
    }
//      console.log("Account:"+Account);
//      console.log("callArgs:"+callArgs)
    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(
        function(resp){
        pageCount = parseInt(resp.result);
    }).catch(function(err){
        console.log("error:"+err.message);
    })
}

$(function(){
	$("#lookDet").click(function(){
		page = $("#pageVal").html()?parseInt($("#pageVal").html()):1;
		age = $("#searchAge").val();
		if(!age){
			alert("请选择年龄！")
			return false;
		}
		getList(age);
		getpageCount(age);
	});
	var pagebox = $("#pageVal");
	$("#prev").click(function(){
		var page = parseInt(pagebox.html());
		if(page<=1){
			alert("已经是第一页了！");
			return false;
		}else{
			page-=1;
			pagebox.html(page);
			getList(age);
		}
	});
	$("#next").click(function(){
		var page = parseInt(pagebox.html());
		if(page>=pageCount){
			alert("已经是最后一页了！");
			return false;
		}else{
			page+=1;
			pagebox.html(page);
			getList(age);
		}
	});
});