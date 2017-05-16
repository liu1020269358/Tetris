function drawBackGround(){
    var canvas = document.getElementById("canvas-bg");
    var context = canvas.getContext("2d");


    canvas.width = 300;
    canvas.height = 480;

    context.fillStyle = '#666';
    context.fillRect(0, 80, 300, 400);

    context.beginPath();
    for(i=0; i<16; i++){
        context.moveTo(i*20, 80)
        context.lineTo(i*20, 480)
    }
    for(i=4; i<25; i++){
        context.moveTo(0, i*20)
        context.lineTo(300, i*20)
    }
    context.stroke();
}

function drawNextBlockBG(){
    var canvas_next = document.getElementById("next-bg");
    var context_next = canvas_next.getContext("2d");

    canvas_next.width = 200;
    canvas_next.height = 120;
    context_next.fillStyle = '#242154';
    context_next.fillRect(0, 0, 200, 120);
}

function updateBG(bg){
    var canvasWidth = 300;
    var canvasHeight = 480;
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
                    start_y = i*20;
                    start_x = j*20;
                    context.fillRect(start_x, start_y, 20, 20);
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
        y = YX[0] * 20;
        x = YX[1] * 20;
        context_next.fillRect(x, y, 20, 20);
    }
}