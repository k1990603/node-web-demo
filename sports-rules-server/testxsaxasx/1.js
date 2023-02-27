let  obj ={

a:55 ,
get b(){
    return 9999
},

set b(nnn){
    
     this.a=888
}

}



console.log(obj.b);

obj.b=11111


console.log(obj.a);
console.log(obj.b);