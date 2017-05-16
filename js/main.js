//这个游戏主要有两个对象，背景和当前方块。

//背景对象
//数据贮存在data中
//得分储存在sorce中
function backGround(){
    this.data = [];
    this.sorce = 0;
}

//背景对象的初始化方法
//生成一个二维数组表示背景的坐标，如backGround.data[Y][X] = 0或1
//0代表该坐标没有方块，1代表该坐标有方块
//此处的Y为0-23，X为0-14
//Y为0-3的区域是生成新方块的地方，玩家可视的区域实际是一个长20，宽15的长方形
backGround.prototype.init = function(){
    var data = this.data;
    for(var i = 0; i < 24; i++){
        data[i] = new Array();
        for(var j = 0; j < 15; j++){
            data[i][j] = 0;
        }
    }
}

$(window).on('load', function(){
    var back_ground = new backGround(); //实例一个背景
    var startDiv = $('#start');
    var restartDiv = $('#restart');
    restartDiv.hide();
    newGame(back_ground); //初始化所有背景
    startDiv.click(function(){
        getNewBlock(back_ground.data, back_ground.sorce);
        startDiv.hide();
    }) //点击开始即开始游戏，调用getNewBlock(args)，生成第一个方块

    restartDiv.click(function(){
        newGame(back_ground);
        getNewBlock(back_ground.data, back_ground.sorce);
        restartDiv.hide(); 
    })//点击重新开始，重新初始化所有背景，再生成第一个方块
    
})  

//新游戏初始化背景，用canvas绘制背景和即将下一个方块的背景
function newGame(back_ground){  
    back_ground.init();
    drawBackGround();
    drawNextBlockBG();
}

//生成新的方块
//参数为背景对象的数据，得分，该方块的形态（7种，0-6 这7个数字）
//如果指定了形态，则生成相对应的方块，若没有，则随机生成
function getNewBlock(back_ground, sorce, shape){
    var shape;
    if(typeof shape !== 'number'){
        shape = Math.floor(Math.random()*7);
    }
    var new_block = new block(back_ground, sorce, shape);
    new_block.init();
    return new_block;    
}