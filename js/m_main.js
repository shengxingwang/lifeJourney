function getData(type){
	//搜索
    var from = Account.NewAccount().getAddressString();
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var callFunction =type;
    var callArgs = "[]";
    var contract = {
      "function":callFunction,
      "args":callArgs
    }
//      console.log("Account:"+Account);
//      console.log("callArgs:"+callArgs)
    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(
        function(resp){
        	 console.log(resp.result);
        	if(type=="getAuthorNum"){
        		var peopleNum = parseInt(resp.result);
        		$("#peopleNum").html(peopleNum);
        	}
        	if(type=="getRecordNum"){
        		var pathNum = parseInt(resp.result);
        		$("#pathNum").html(pathNum);
        		
        	}
    }).catch(function(err){
        console.log("error:"+err.message);
    })
}
getData("getAuthorNum");
getData("getRecordNum");
