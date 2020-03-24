let x_coord = [];
let y_coord = [];
let drawSketch = false;
let clear = false;
let sketchWidth = 300;
let sketchHeight = 300;


function triggerSketch(){
    drawSketch = true;
}

function clearSketch(){
    x_coord = [];
    y_coord = [];
    clear = true;
}

var sketch = function ( p ){

    p.prevx = 0;
    p.prevy = 0;
    p.x_coord = [];
    p.y_coord = [];

    p.isDrawing = false;

    p.setup = function(){
        var skt = p.createCanvas(sketchWidth, sketchHeight);
        skt.parent('c1');
        p.background(0);
        // p.drawButton = p.createButton("Draw Sketch");
        // p.drawButton.mousePressed(p.customDraw);
    }

    p.draw = function () {
        if(clear){
            p.createCanvas(sketchWidth,sketchHeight);
            p.background(0);
            clear = !clear;

        }
        p.stroke(255);
        p.fill(0);
        if(p.isDrawing && (p.mouseX <= p.width && p.mouseX >= 0 && p.mouseY <= p.height && p.mouseY >= 0)){
            p.line(p.prevx,p.prevy, p.mouseX, p.mouseY);
            x_coord.push(p.mouseX - p.width/2);
            y_coord.push(p.mouseY - p.height/2);
            p.prevx = p.mouseX;
            p.prevy = p.mouseY;
        }
        else if (p.mouseX <= p.width && p.mouseX >= 0 && p.mouseY <= p.height && p.mouseY >= 0){
            p.prevx = p.mouseX;
            p.prevy = p.mouseY;
        }
    }

    p.mouseClicked = function () {
        if (p.mouseX <= p.width && p.mouseX >= 0 && p.mouseY <= p.height && p.mouseY >= 0) {
            p.isDrawing = !p.isDrawing;
        }
    }

    p.getSketch = function () {
        return [p.x_coord, p.y_coord];
    }
}

var canvas = function ( p ){
    p.x = [];
    p.y = [];
    p.fourierX;
    p.fourierY;
    p.time = 0;
    p.path = [];
    p.customDrawing = [];
    p.cnv;
    p.skip = 1;
    p.drawButton;

    p.setup = function(){
        var cnv = p.createCanvas(800, 600);
        cnv.parent('c2');
        for (let i = 0; i < drawing.length; i += p.skip) {
            p.x.push(drawing[0][i]);
            p.y.push(drawing[1][i]);
        }
        p.fourierX = dft(p.x);
        p.fourierY = dft(p.y);

        p.fourierX.sort((a, b) => b.amp - a.amp);
        p.fourierY.sort((a, b) => b.amp - a.amp);

    }

    p.epiCycles = function(x, y, rotation, fourier){
        for (let i = 0; i < fourier.length; i++) {
            let prevx = x;
            let prevy = y;
            let freq = fourier[i].freq;
            let radius = fourier[i].amp;
            let phase = fourier[i].phase;
            x += radius * Math.cos(freq * p.time + phase + rotation);
            y += radius * Math.sin(freq * p.time + phase + rotation);

            p.stroke(255, 100);
            p.noFill();
            p.ellipse(prevx, prevy, radius * 2);
            p.stroke(255);
            p.line(prevx, prevy, x, y);
        }
        return p.createVector(x, y);
    }

    p.resetDrawing = function(){
        p.x = [];
        p.y = [];

        p.path = [];
        p.time = 0;
    }

    p.customDraw = function(){
        p.resetDrawing();
        p.customDrawing = [x_coord, y_coord];
        console.log(p.customDrawing);
        for (let i = 0; i < p.customDrawing[0].length; i++) {
            p.x.push(p.customDrawing[0][i]);
            p.y.push(p.customDrawing[1][i]);
        }

        p.fourierX = dft(p.x);
        p.fourierY = dft(p.y);

        p.fourierX.sort((a, b) => b.amp - a.amp);
        p.fourierY.sort((a, b) => b.amp - a.amp);

    }

    p.draw = function() {

        if (drawSketch) {
            p.customDraw();
            drawSketch = !drawSketch;
        }
        const HALF_PI = Math.PI / 2;
        const TWO_PI = 2 * Math.PI;
        p.background(0);

        let vx = p.epiCycles(p.width / 2 + 100, 100, 0, p.fourierX);
        let vy = p.epiCycles(100, p.height / 2 + 100, HALF_PI, p.fourierY);
        let v = p.createVector(vx.x, vy.y);
        p.path.unshift(v);
        p.line(vx.x, vx.y, v.x, v.y);
        p.line(vy.x, vy.y, v.x, v.y);

        p.beginShape();
        p.noFill();
        for (let i = 0; i < p.path.length; i++) {
            p.vertex(p.path[i].x, p.path[i].y);
        }
        p.endShape();

        const dt = TWO_PI / p.fourierY.length;
        p.time += dt;

        if (p.time > TWO_PI) {
            p.time = 0;
            p.path = [];
        }


    }
}



var myp5 = new p5(sketch, 'c1');
var myp5 = new p5(canvas, 'c1');
