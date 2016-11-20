function drawBackGround(){
    var canvas = document.getElementById("canvas-bg");
    var context = canvas.getContext("2d");

<<<<<<< HEAD
    canvas.width = 450;
    canvas.height = 720;

    context.fillStyle = '#666';
    context.fillRect(0, 120, 450, 600);
=======
    canvas.width = 300;
    canvas.height = 480;

    context.fillStyle = '#666';
    context.fillRect(0, 80, 300, 400);
>>>>>>> gh-pages
}

function drawNextBlockBG(){
    var canvas_next = document.getElementById("next-bg");
    var context_next = canvas_next.getContext("2d");
<<<<<<< HEAD
    canvas_next.width = 300;
    canvas_next.height = 180;
    context_next.fillStyle = '#242154';
    context_next.fillRect(0, 0, 300, 180);
}

function updateBG(bg){
    var canvasWidth = 450;
    var canvasHeight = 720;
=======
    canvas_next.width = 200;
    canvas_next.height = 120;
    context_next.fillStyle = '#242154';
    context_next.fillRect(0, 0, 200, 120);
}

function updateBG(bg){
    var canvasWidth = 300;
    var canvasHeight = 480;
>>>>>>> gh-pages
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
<<<<<<< HEAD
                    start_y = i*30;
                    start_x = j*30;
                    context.fillRect(start_x, start_y, 30, 30);
=======
                    start_y = i*20;
                    start_x = j*20;
                    context.fillRect(start_x, start_y, 20, 20);
>>>>>>> gh-pages
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
<<<<<<< HEAD
        y = YX[0] * 30;
        x = YX[1] * 30;
        context_next.fillRect(x, y, 30, 30);
=======
        y = YX[0] * 20;
        x = YX[1] * 20;
        context_next.fillRect(x, y, 20, 20);
>>>>>>> gh-pages
    }
}