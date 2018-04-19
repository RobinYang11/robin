/*!
 * Robin.js v2.5.16
 * (c) 2018.4-2018.4 Robin Yang
 * Released under 
 the MIT License.

 */

(function(){

  console.log("doSomething after")

})(function(){


  //main function for user to initializate
  function robin(param){

    return new robin.fn.init(param)

  }

  //utils

  //check if the obj is a function
  function isFunction(obj){
  	return typeof obj === "function" && typeof obj.nodeType !== "number";
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
  function replaceBindingData(vm){

  	var bindingData=getBindingData(vm.$root);
  	// var keyArr=getKeyfromMatchedArray(bindingData);
  	bindingData.forEach(function(i){
      var bindExpression=i;
      var expressions=i.replace(/[{}\s]/g,"")
      var patt=/[a-zA-Z]+/g
      var res=i.match(patt)
      //replace all data替换所有变量
      res.forEach(function(item){

        if(isFunction(vm[item])){
            expressions=expressions.replace(item+"()",vm[item].call(vm))
        }else{
          expressions=expressions.replace(item,vm[item])
        }
      })

      if( expressions.search(/\W/g) >-1){
       vm.$root= vm.$root.replace(bindExpression,eval(expressions))
      }else{
        vm.$root= vm.$root.replace(bindExpression,expressions)
      }
  	})
  	return vm.$root
  }

  //get binding data from dom 
  function getBindingData(dom){

  	var bindingDataRegExp= RegExp('{{.*}}','gim');
  	// matched=bindingDataRegExp.exec(dom);
  	matched=dom.match(bindingDataRegExp);
  	// matchedIndex=dom.search(bindingDataRegExp);
  	// console.log(matchedIndex);
  	return matched;

  }

  function mountParamToVm(vm){
     var data=vm.$data;
     var methods=vm.$methods
     if(data!==null && data!=="undefined"){
         vm.extend(data)
     }
     if(methods!==null && methods!=="undefined"){
        vm.extend(methods)
     } 
  }


  //
  robin.fn=robin.prototype={
   
  }

  //extend the plugin
    robin.extend=robin.fn.extend=function(obj){

      //if the parameter obj is a function ,then define a property named
      // with the function for this 
      if (isFunction(obj)){           
        Object.defineProperty(this,obj.name,{
          writable:true,
          value:obj,
          enumerable:true,
          configurable:true
        })
      }
      
      //if the parameter obj is a object,then  add all properties to this
      if (isPlainObject(obj)){
        var allKeys=Object.keys(obj);
        for (i in allKeys){
          this[allKeys[i]]=obj[allKeys[i]]
        }
      }
    }

   //init the robin instance
   robin.init=robin.fn.init=function(param){

        var vm =this

        if(!param.dom){
          this.$root=document.getElementsByTagName('html')[0].innerHTML;
        }else{
          this.$root=document.getElementById(param.dom).innerHTML;
        }

        //if with data ,add the data to the instance
        if(param.data){ 
          this.$data=param.data
        }


        // if with mothods,add the methods to the instance 
        if(param.methods){
          this.$methods=param.methods
  
        }

        //merge all params ,and add to the robin instance
        // 把所有参数对象合并成一个 ，然后都挂到robin实例上
        mountParamToVm(vm)

        //replace the binding data in dom with given data
        var replacedRoot=replaceBindingData(vm);
        this.$root=replacedRoot;
        
        //render the dom with  repalced dom 
        document.getElementsByTagName('html')[0].innerHTML=this.$root;

        return this 

    }    
    robin.init.prototype=robin.fn
   


  window.robin=robin
}())
