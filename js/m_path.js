    //1.搜索所有信息
    //判断是否是对象数组
    function getData(author){
		//搜索
	    var from = Account.NewAccount().getAddressString();
	    var value = "0";
	    var nonce = "0";
	    var gas_price = "1000000";
	    var gas_limit = "2000000";
	    var callFunction = "getUserRecord";
	    var callArgs = "[\""+ author + "\"]";
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
    var author = getQueryString("author");
    getData(author);
    function cbSearchNew(resp){
        var result = resp.result;
        if(result === 'null'){
            // $(".result").addClass("hide");
            // $(".birthSay").removeClass("hide");
        }else{
            try{
              result = JSON.parse(result);
              var newArr = [];
              var flag = true;
              if(isArray(result)) {
              	for(var i = 0;i<result.length;i++){
              		var len =newArr.length;
              		flag = true;
          			for(var j = 0;j<newArr.length;j++){
              			if(result[i].age==newArr[j].age){
              				newArr[j]=result[i];
              				flag = false;
              			}
              			
          			}
              		if(flag){
              			newArr.push(result[i]);
              		}
              	}
              	creatLine(newArr);
          	}else{
		            alert(result);
	            };
            }catch(err){
            	
            }
        }
    };
    function creatArr(arr,item){
    	var returnArr = [];
    	for(var i=0;i<arr.length;i++){
    		returnArr.push(arr[i][item]);
    	}
    	return returnArr;
    };
    function getValue(arr,age){
    	var obj = {};
    	for(var i=0;i<arr.length;i++){
    		if(arr[i].age==age){
    			obj={
    				title:arr[i].title,
    				content:arr[i].content
    			}
    			break;
    		}
    	}
    	return obj;
    };
    function creatLine(arr){
    	var dom = document.getElementById("pathLine");
		var myChart = echarts.init(dom);
		var app = {};
		option = null;
		var data =arr;
		var Yarr = creatArr(arr,'grade');
		var Xarr = creatArr(arr,'age');
		option = {
		    // Make gradient line here
		    visualMap:{
		        show: false,
		        type: 'continuous',
		        seriesIndex: 0,
		        min: 0,
		        max: 400
		    },
		    title:{
		        left: 'center',
		        text: '人生轨迹'
		    },
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(data){
		        	var info = getValue(arr,data[0].axisValue);
                  	return data[0].axisValue+"岁 开心值:"+data[0].value+"<br>标题："+info.title+"<br><p style='width:300px;white-space:pre-wrap!important'>内容："+info.content+"</p>";
              	}
		    },
		    xAxis: {
		    	name:'岁数',
		    	boundaryGap: false,
		        data: Xarr
		    },
		    yAxis:{
		    	name:'开心值',
		        splitLine: {show: false}
		    },
		    grid:{
		        bottom: '16%'
		    },
		    series:{
		    	name:'开心值',
		        type: 'line',
		        showSymbol:true,
		        data: Yarr
		    },
		};
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}
//		myChart.on('mouseover', function (parmas) {
//		    console.log(parmas);
//		});
    }
    
    function check(){
    	var addr = $("#pathAddr").val().trim();
    	var age = $("#pathAge").val().trim();
    	var happy = $("#pathHappy").val().trim();
    	var title = $("#pathTitle").val().trim();
    	var content = $("#pathContent").val().trim();
    	if(!addr){
    		$("#pathAddr").addClass("errbor");
    		return false;
    	}else{
    		$("#pathAddr").removeClass("errbor");
    	}
    	if(!age){
    		$("#pathAge").addClass("errbor");
    		return false;
    	}else{
    		$("#pathAge").removeClass("errbor");
    	}
    	if(!happy){
    		$("#pathHappy").addClass("errbor");
    		return false;
    	}else{
    		$("#pathHappy").removeClass("errbor");
    	}
    	if(!title){
    		$("#pathTitle").addClass("errbor");
    		return false;
    	}else{
    		$("#pathTitle").removeClass("errbor");
    	}
    	if(title.length>10){
    		$("#pathTitle").addClass("errbor");
    		return false;
    	}else{
    		$("#pathTitle").removeClass("errbor");
    	}
    	if(!content){
    		$("#pathContent").addClass("errbor");
    		return false;
    	}else{
    		$("#pathContent").removeClass("errbor");
    	}
    	return {
    		addr:addr,
    		age:age,
    		happy:happy,
    		title:title,
    		content:content
    	};
    };
	var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
	    var nebPay = new NebPay();
	    var serialNumber
	
	//存储信息
	 $("#putSub").click(function(){
		var valObj = check();
		if(valObj){
			var to = dappAddress;
				 var value = "0";
				 var callFunction = "save";
				 var timestamp = Date.parse(new Date());
				 var callArgs = "[\"" +valObj.age+ "\",\"" +valObj.title+ "\",\"" +valObj.content+ "\",\"" +valObj.happy+ "\"]";

				 serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
					listener: cbPush        //设置listener, 处理交易返回信息
				 });
				 intervalQuery = setInterval(function () {
					funcIntervalQuery();
					}, 5000);
		}
	});

	var intervalQuery;
 
	function funcIntervalQuery(){
		nebPay.queryPayInfo(serialNumber)
				.then(function(resp){
					console.log("支付结果:"+resp);
					var respObject = JSON.parse(resp);
					if(respObject.data.status ===1){
						var author = $("#pathAddr").val().trim();
						getData(author);
					}
				}).catch(function(err){
					console.log(err);
				});
	}
	function cbPush(resp){
		 console.log("response of push:"+JSON.stringify(resp));
	}
	
	$("#reloadPath").click(function(){
		var author = $("#pathAddr").val().trim();
		if(!author){
			alert("请输入钱包地址");
			return false;
		}
		getData(author);
	});

	$(function(){
		window.postMessage({
						"target": "contentscript",
						"data": {},
					"method": "getAccount",
		}, "*");
		window.addEventListener('message', function (e) {
				if (e.data && e.data.data && e.data.data.account) {
					account =  e.data.data.account;
					localStorage.setItem("path_acount",account);
				}else{
					// $(".addrShow").html('未获取到钱包地址，请根据底部提示安装星云钱包');
					// alert("请下载钱包插件");
				}
		});
		
		setTimeout(function(){
			var addr = localStorage.getItem("path_acount",account);
			if(addr){
				$("#pathAddr").val(addr);
				getData(author);
			}else{
				$("#pathAddr").val("");
			}
		},800);
			
	})
