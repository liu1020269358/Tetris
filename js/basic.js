//方块对象
//一个方块对象包含当前的数据和下一个方块的数据，均可用一个包含四个点坐标的二维数组表示
//7种形态都是用四个坐标表示的，这里的坐标正对应背景中的坐标
function block(backGround, sorce, shape){   
    this.backGround = backGround;
    this.sorce = sorce;
    this.shape = shape;
    this.upCase = 0; //I、S、Z三种形态的方块旋转需要用到
    this.data = this.getData(); 
    this.center_y = this.data[1][0]; //该方块的中心点的Y值,旋转需要用到
    this.center_x = this.data[1][1]; //该方块的中心点的X值,旋转需要用到
    this.next_shape = Math.floor(Math.random()*7); //下一个方块的形态
}
//方块的初始化
block.prototype.init = function(){
    var that = this;
    var backGround = this.backGround;
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 38:
                that.up();
                break;
            case 40:
                var permit_down = that.testDown();
                that.down(permit_down);
                break;
            case 39: 
                var permit_right = that.testRight();
                that.right(permit_right);
                break;
            case 37:
                var permit_left = that.testLeft();
                that.left(permit_left);
                break;
        }
    })
    //给上下左右四个键绑定事件触发函数
    
    this.drawNextBlock(this.next_shape); //用canvas绘制下一个方块

    var keepDowntimer = setInterval(function(){
        var permit = that.testDown();

        if(permit){
            that.down(permit);            
        }else{
            clearInterval(keepDowntimer);
            $(document).unbind('keydown');
            that.tryRemoveRow();
            that.tryGameOver() ? $('#restart').show() : getNewBlock(that.backGround, that.sorce, that.next_shape);    
        }
    },500)
    //使方块持续掉落，一直到不能掉落为止
    //每次掉落之前都先测试能否掉落，若能，则继续
    //若不能，解除该方块对象的事件绑定，试图消行，游戏是否结束
    //若游戏结束，则终止，弹出重新开始的按钮
    //若游戏没有结束，则按照next_shape生成新的方块 ，循环直到游戏结束
}

//根据形态获取数据
//7种形态，7种最初的数据
//每种形态都能用四个坐标表示
//在背景的0-3层生成这些，但是不用canvas绘制
//注意每个数据的第二个坐标为其旋转中心点
block.prototype.getData = function(){
    var data = [];
    var shape = this.shape;
    switch(shape){
        case 0:
            data = [[3,7], [2,7], [1,7], [0,7]]; //I
            break;
        case 1:
            data = [[1,8], [2,8], [3,8], [3,7]]; //J
            break;
        case 2:
            data = [[1,7], [2,7], [3,7], [3,8]];  //L
            break;
        case 3:
            data = [[2,7], [3,7], [3,8], [2,8]]; //O
            break;
        case 4:
            data = [[2,8], [2,7], [3,7], [3,6]]; //S
            break;
        case 5:
            data = [[2,6], [2,7], [2,8], [3,7]]; //T
            break;
        case 6:
            data = [[2,6], [2,7], [3,7], [3,8]]; //Z
            break;
    }
    return data;
}

//测试能否掉落的方法
//思路是：找出方块最下层的坐标，把这些坐标的Y值加一后即为掉落后最下层的坐标
//看背景中的这些坐标是否已存在方块
//若已存在，则不能下落，若都不存在，则可以下落
block.prototype.testDown = function(){
    var data = this.data;
    var lowestBlock = this.findLowestBlock();   
    var canDown = true;
    var backGround = this.backGround;

    for(YX of lowestBlock){
        (function(){
            var next_y = parseInt(YX[0])+1;
            var next_x = YX[1];
            if(next_y > 23){
                canDown = false;
            }else{
                var next_data = backGround[next_y][next_x];
                if(next_data !== 0){
                    canDown = false
                }
            }
        })() 
    }
    return canDown;
}

//测试能否左移的方法
//思路和测试下落类似，主要是找出最左边的方块，把X值减1
block.prototype.testLeft = function(){
    var data = this.data;
    var leftestBlock = this.findLeftestBlock();
    var canLeft = true;
    var backGround = this.backGround;

    for(YX of leftestBlock){
        (function(){
            var next_y = YX[0];
            var next_x = parseInt(YX[1])-1;
            if(next_x < 0 ){
                canLeft = false;
            }
            var next_data = backGround[next_y][next_x];
            if(next_data !== 0){
                canLeft = false;
            }
        })() 
    }
    return canLeft;
}

//测试能否右移的方法
block.prototype.testRight = function(){
    var data = this.data;
    var rigthestBlock = this.findRightestBlock();
    var canRight = true;
    var backGround = this.backGround;

    for(YX of rigthestBlock){
        (function(){
            var next_y = YX[0];
            var next_x = parseInt(YX[1])+1;
            if(next_x > 14 ){
                canRight = false;
            }
            var next_data = backGround[next_y][next_x];
            if(next_data !== 0){
                canRight = false;
            }
        })() 
    }
    return canRight;
}

//执行下落的方法
//在测试过后，若得到的permit为True，则执行下落
block.prototype.down = function(permit){
    if(permit){
        var data = this.data;
        var backGround = this.backGround;
        var first_data = [];
        var final_data = [];
        for(YX of data){
            (function(){
                var first_y = YX[0];
                var first_x = YX[1];
                backGround[first_y][first_x] = 0;                       
            })() 
        }//于背景中把当前方块所在点的坐标的值变为0

        for(YX of data){
            (function(){
                YX[0] +=1;
                var final_y = YX[0];
                var final_x = YX[1];
                backGround[final_y][final_x] = 1;
            })()
        }//于背景中吧方块下落后的坐标的值变为1

        this.backGround = backGround;
        updateBG(this.backGround);
        //重新绘制背景
    }
}

//执行左移的方法，和下落类似
//先将当前坐标的值变为0，再讲左移后的坐标的值变为1，重新绘制背景
block.prototype.left = function(permit){
    if(permit){
        var data = this.data;
        var backGround = this.backGround;
        for(YX of data){
            (function(){
                var first_y = YX[0];
                var first_x = YX[1];
                backGround[first_y][first_x] = 0;               
            })() 
        }
        for(YX of data){
            (function(){
                YX[1] -=1;
                var final_y = YX[0];
                var final_x = YX[1];
                backGround[final_y][final_x] = 1;
            })()
        }
        this.backGround = backGround;
        updateBG(this.backGround);
    }
}

//执行右移的方法
block.prototype.right = function(permit, backGround){
    if(permit){
        var data = this.data;
        var backGround = this.backGround;
        for(YX of data){
            (function(){
                var first_y = YX[0];
                var first_x = YX[1];
                backGround[first_y][first_x] = 0;            
            })() 
        }
        for(YX of data){
            (function(){
                YX[1] +=1;
                var final_y = YX[0];
                var final_x = YX[1];
                backGround[final_y][final_x] = 1;
            })()
        }
        this.backGround = backGround;
        updateBG(this.backGround);
    }
}

//找出方块最下层的坐标的方法
//主要思路是：用lowestBlockObj对象来贮存最低的坐标
//即X值相同，Y值最大的坐标。
//其中key为该坐标的X值，value为该坐标
//若有X值相同的坐标，即可进行比较，Y值更大的贮存在lowestBlockObj中
//最后将lowestBlockObj中的坐标push到一个数组lowestBlock中，返回该数组
//即返回了一个包含了最低（相同X，Y最大）坐标的二维数组。
block.prototype.findLowestBlock = function(){
    var data = this.data;
    var lowestBlockObj = {};
    var lowestBlock = [];
    for(YX of data){
        var Y = YX[0];
        var X = YX[1];
        if(lowestBlockObj.hasOwnProperty(X)){
            Y - lowestBlockObj[X][0] > 0 ?  lowestBlockObj[X] = [Y, X] : null;
        }else{
            lowestBlockObj[X] = [Y, X];
        }
    }
    for(i in lowestBlockObj){
        lowestBlock.push(lowestBlockObj[i]);
    }
    return lowestBlock;
}
//找出最左边的坐标
//和找最下层的坐标类似
//即相同Y，X最小
block.prototype.findLeftestBlock = function(){
    var data = this.data;
    var leftestBlockObj = {};
    var leftestBlock = [];
    for(YX of data){
        var Y = YX[0];
        var X = YX[1];
        if(leftestBlockObj.hasOwnProperty(Y)){
            X - leftestBlockObj[Y][1] < 0 ? leftestBlockObj[Y] = [Y, X] : null;
        }else{
            leftestBlockObj[Y] = [Y, X];
        }
    }
    for(i in leftestBlockObj){
        leftestBlock.push(leftestBlockObj[i]);
    }
    return leftestBlock;
}
//找最右边的坐标
block.prototype.findRightestBlock = function(){
    var data = this.data;
    var rightestBlockObj = {};
    var rightestBlock = [];
    for(YX of data){
        var Y = YX[0];
        var X = YX[1];
        if(rightestBlockObj.hasOwnProperty(Y)){
            X - rightestBlockObj[Y][1] > 0 ? rightestBlockObj[Y] = [Y, X] : null;
        }else{
            rightestBlockObj[Y] = [Y, X];
        }
    }
    for(i in rightestBlockObj){
        rightestBlock.push(rightestBlockObj[i]);
    }
    return rightestBlock;
}

//方块旋转的方法
//对于O形态，无需旋转
//对于J（1），L（2），T（5），只需每次都顺时针旋转90°即可
//对于I（0），S（4），Z（6），应当顺时针旋转再逆时针旋转，
//因为这三种形态实际上旋转2次和旋转4次都应当是回到了原来的位置
//但由于中心点不能为小数，因此中心点会发生偏移，导致无法回到原来的位置
//因此只需来回旋转即可，用upCase来记录当前是应当顺时针转还是逆时针转
block.prototype.up = function(){
    var backGround = this.backGround;
    var shape  = this.shape;
    if(shape == 1 || shape == 2 || shape == 5){
        this.clockRotate();
    }else if(shape == 0 || shape == 4 || shape == 6){
        switch(this.upCase){
            case 0: 
                this.clockRotate();
                this.upCase = 1;

                break;
            case 1: 
                this.counterClockRotate()
                this.upCase = 0;
                break;            
        }
    }
}

//实时获得中心点的方法
block.prototype.decideCenterPoint = function(){
    var data = this.data;
    this.center_y = data[1][0];
    this.center_x = data[1][1];

    return [this.center_y, this.center_x]
}

//方块顺时针的方法
//首先要判断能否旋转
//即旋转后的坐标上是否已有了其他方块
//再根据判断后的结果决定是否旋转
//若旋转，则是每个方块的四个坐标都围绕中心点顺时针旋转90度
block.prototype.clockRotate = function(){
    var data = this.data;
    var backGround = this.backGround;
    var center_YX = this.decideCenterPoint();
    var center_y = center_YX[0];
    var center_x = center_YX[1];
    var canUp = true;

    for(YX of data){
        (function(){
            var first_y = YX[0];
            var first_x = YX[1];

            backGround[first_y][first_x] = 0;
        })()
    }
    for(YX of data){
        (function(){
            var next_y = center_y + (YX[1] - center_x);
            var next_x = center_x - (YX[0] - center_y);  
            //旋转后的坐标
            if(next_y > 25 || next_x < 0 || next_x > 14){
                canUp = false;
            }
            var next_data = backGround[next_y][next_x];
            if(next_data !== 0){
                canUp = false;
            }
        })()
    }
    if(canUp){
        for(YX of data){
            (function(){
                var next_y = center_y + (YX[1] - center_x);
                var next_x = center_x - (YX[0] - center_y);
                //旋转后的坐标
                YX[0] = next_y;
                YX[1] = next_x;
                backGround[next_y][next_x] = 1;
            })()
        }
    }else{
        for(YX of data){
            (function(){
                var first_y = YX[0];
                var first_x = YX[1];
                backGround[first_y][first_x] = 1;
            })()
        }
    }
    this.backGround = backGround;
    updateBG(this.backGround);

}

//逆时针旋转的方法，和顺时针旋转类似
block.prototype.counterClockRotate = function(){
    var data = this.data;
    var backGround = this.backGround;
    var center_YX = this.decideCenterPoint();
    var center_y = center_YX[0];
    var center_x = center_YX[1];
    var canUp = true;

    for(YX of data){
        (function(){
            var first_y = YX[0];
            var first_x = YX[1];
            backGround[first_y][first_x] = 0;
        })()
    }
    for(YX of data){
        (function(){           
            var next_y = center_y - (YX[1] - center_x);
            var next_x = center_x + (YX[0] - center_y);    
            if(next_y > 25 || next_x < 0 || next_x > 14){
                canUp = false;
            }
            var next_data = backGround[next_y][next_x];
            if(next_data !== 0){
                canUp = false;
            }
        })()
    }
    if(canUp){
        for(YX of data){
            (function(){
                var next_y = center_y - (YX[1] - center_x);
                var next_x = center_x + (YX[0] - center_y);
                YX[0] = next_y;
                YX[1] = next_x;
                backGround[next_y][next_x] = 1;
            })()
        }
    }else{
        for(YX of data){
            (function(){
                var first_y = YX[0];
                var first_x = YX[1];
                backGround[first_y][first_x] = 1;
            })()
        }
    }
    this.backGround = backGround;
    updateBG(this.backGround);
}

//试图消行的方法
//主要思路为：遍历背景的每一行，查看该行所有坐标的值是否都为1，即全被方块占据
//若全被占据，则把该行消除，使该行上面所有行的坐标的Y值加一，即向下移一层
//然后继续遍历
//在这个方法中用到了一个newBackGroun来暂时贮存新背景
//并且每消除一行，得分增加1
block.prototype.tryRemoveRow = function(){
    var data = this.data;
    var backGround = this.backGround;
    for(var i in backGround){
        var canRemoveRow = 1;
        var row = backGround[i];
        var i = parseInt(i);
        for(var j in row){
            if(row[j] == 0){
                canRemoveRow = 0;
            }
        }
        if(canRemoveRow == 1){
            this.addSorce();
            var newBackGround = [];
            newBackGround[0] = new Array();
            for(var m = 0; m <15; m++){
                newBackGround[0][m] = 0;
            }
            for(var n = 1; n < i+1; n++){
                newBackGround[n] = new Array();
                for(m = 0; m <15; m++){
                    newBackGround[n][m] = this.backGround[n-1][m];
                }
            }
            for(n = i+1; n < 24; n++){
                newBackGround[n] = new Array();
                for(m = 0; m <15; m++){
                    newBackGround[n][m] = this.backGround[n][m];
                }
            }
        this.renderSorce();
        this.backGround = newBackGround;
        }
    }
    updateBG(this.backGround);
}

//检查是否游戏结束的方法
//于该方块不能下落后调用，看此时方块的坐标中是否有Y小于4的，即在前4层中
//若有，即意味方块的累积高度已突破最高层，游戏结束
//若无，则游戏继续
block.prototype.tryGameOver = function(){
    var data = this.data;
    var gameOver = false;
    for(YX of data){
        YX[0] < 4 ? gameOver = true : null;
    }
    return gameOver;
}

//在nextBlock区域绘制下一个掉落的方块的方法
block.prototype.drawNextBlock = function(){
    var data = [];
    switch(this.next_shape){
        case 0:
            data = [[4,5], [3,5], [2,5], [1,5]]; //I
            break;
        case 1:
            data = [[2,5], [3,5], [4,5], [4,4]]; //J
            break;
        case 2:
            data = [[2,4], [3,4], [4,4], [4,5]];  //L
            break;
        case 3:
            data = [[2,4], [3,4], [3,5], [2,5]]; //O
            break;
        case 4:
            data = [[2,6], [2,5], [3,5], [3,4]]; //S
            break;
        case 5:
            data = [[2,4], [2,5], [2,6], [3,5]]; //T
            break;
        case 6:
            data = [[2,4], [2,5], [3,5], [3,6]]; //Z
            break;
    }

    drawNextBlock(data);
}

//增加得分的方法
block.prototype.addSorce = function(){
    this.sorce = this.sorce + 1;
}
//渲染得分的数值
block.prototype.renderSorce = function(){
    $('#score-value').text(this.sorce)
}