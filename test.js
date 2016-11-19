$(window).on('load', function(){
    var aTest = new test();
    aTest.init();
})


function test(){
    this.b = [[1,2], [3,4]];
}

test.prototype.init = function(){
    this.addB();
    console.log('第一次调用后的b[0]: '+ this.b[0]);
    var B = this.b
    B.forEach(function(x){
        console.log(x);
    })
    console.log(B)
    this.addB();
    console.log('第二次调用后的b[0]: ' + this.b[0]);
    console.log('第二次调用后的b: ' + this.b);
}

test.prototype.addB = function(){
    var b = this.b;
    for(i of b){
        (function(){
            i[0] +=1;
        })()
    }
}

