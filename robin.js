(function(){

  console.log("doSomething after")

})(function(){

  // your code here....

  function robin(){

  	var param=arguments[0];

  	//if no dom specified ,will defaultly create instance wtih html element,
  	//else create the instance with specify dom element
  	if(!param.dom){
  		this.$root=document.getElementsByTagName('html')[0].outerHTML;
  	}else{
  		this.$root=document.getElementById(param.dom).outerHTML;
  	}

  	//
  	replaceBindingData(this.$root,this.$data);


  	//if with data ,add the data to the instance
  	if(param.data){
  		this.$data=param.data
  	}

  }

  //utils

  //check if the obj is a function
  function isFunction(obj){
  	if (obj.constructor.name==="Function"){
  		return true;
  	}
  	return false;
  }

  //check if the obj is an object
  function isPlainObject(obj){
  	if (obj.constructor.name==="Object"){
  		return true;
  	}
  	return false;
  }

  //check if the obj is an array
  function isArray(obj){
  	if (obj.constructor.name==="Array"){
  		return true;
  	}
  	return false;
  }

  //replace the binding data in dom
  function replaceBindingData(dom,data){

  	var bindingData=getBindingData(dom);
  	var keyArr=getKeyfromMatchedArray(bindingData);
  	bindingData.forEach(function(i){
  		
  	})

  }

  //get binding data from dom 
  function getBindingData(dom){

  	var bindingDataRegExp= RegExp('{[\\D]*}','g');
	// matched=bindingDataRegExp.exec(dom);
	matched=dom.match(bindingDataRegExp);
	// matchedIndex=dom.search(bindingDataRegExp);
	// console.log(matchedIndex);
	return matched;

  }

  //get key from matched array
  function getKeyfromMatchedArray(arr){
  	 var res=[];
  	 console.log(arr)
  	 arr.forEach(function(i){
  	 	var patt = new RegExp("\w","g");
  	 	var result=patt.exec(i);
  	 	console.log(result)
  	 })

  	 return res;
  }




  robin.prototype={

  	extend:function(obj){

  		if(isFunction(obj)){

  		}

  		if(isFunction(obj)){

  		}
  	}
  }

  window.robin=robin
}())
