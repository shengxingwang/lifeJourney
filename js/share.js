   //1.搜索所有信息
    var page = 1;
    var barrList=[];
    var itemTime =null;
    function getData(){
        console.log("最新信息页码:"+page);
        if(!page || page ===0){
             alert('请输入最新数据有效页码');
        return;
        }

        //搜索
        var from = Account.NewAccount().getAddressString();
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "getAddrs";
        var callArgs = "[\""+ page + "\"]";
        var contract = {
          "function":callFunction,
          "args":callArgs
        }
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
        }else{
            try{
              result = JSON.parse(result);
              if(isArray(result)) {
              	if(result.length>0){
              		barrList =barrList.concat(result);
									clearInterval(itemTime);
              		insertBarrage();
									setTimeout(function(){
										page=page+1;
										getData();
									},1000)
              	}
          	}else{
		            alert(result);
	            };
            }catch(err){
            	
            }
        }
    };
	function insertBarrage(){
		var idx = 0;
		itemTime = setInterval(function(){
			var len = barrList.length;
			idx+=1;
			if(idx>len){
				idx=0;
			}
			var item = {
				info:barrList[idx]
			}
			var blen = $("#dancon>.barrage").length;
			if(blen<20){
				$('#dancon').barrager(item);
			}
		},600)
	}
	
	$(function(){
		getData();
		$("#getData").click(function(){
	    	var anthor = $("#txtVal").val().trim();
	        //非空判断
	        if(!anthor){
	        	alert("请输入钱包地址");
	        	return false;
	        }
	        location.href='path_road.html?author='+anthor;
	    });
	});