function drawBackGround(){
    var canvas = document.getElementById("canvas-bg");
    var context = canvas.getContext("2d");

    canvas.width = 450;
    canvas.height = 720;

    context.fillStyle = '#666';
    context.fillRect(0, 120, 450, 600);
}

function drawNextBlockBG(){
    var canvas_next = document.getElementById("next-bg");
    var context_next = canvas_next.getContext("2d");
    canvas_next.width = 300;
    canvas_next.height = 180;
    context_next.fillStyle = '#242154';
    context_next.fillRect(0, 0, 300, 180);
}

function updateBG(bg){
    var canvasWidth = 450;
    var canvasHeight = 720;
    var canvas = document.getElementById('canvas-block');
    var context = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.fillStyle = '#000';
    var start_x;
    var start_y;

    for(i in bg){
        var row = bg[i];
        if(i > 3){
            for(j in row){
                if(row[j] === 1){
                    start_y = i*30;
                    start_x = j*30;
                    context.fillRect(start_x, start_y, 30, 30);
                }
            }
        }       
    }
}

function drawNextBlock(data){
    drawNextBlockBG();
    var canvas_next = document.getElementById('next-bg');
    var context_next = canvas_next.getContext('2d');
    context_next.fillStyle = '#000';
    var y;
    var x;
    for(YX of data){
        y = YX[0] * 30;
        x = YX[1] * 30;
        context_next.fillRect(x, y, 30, 30);
    }
}