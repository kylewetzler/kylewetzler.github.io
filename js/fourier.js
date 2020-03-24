
function dft(signal) {
    const TWO_PI = 2*Math.PI;
    const result = [];
    const N = signal.length;
    for (let k = 0; k < N; k++) {
        let real= 0;
        let imag = 0;
        for (let n = 0; n < N; n++) {
            const phi = (TWO_PI * k * n) / N;
            real+= signal[n] * Math.cos(phi);
            imag -= signal[n] * Math.sin(phi);
        }
        real= real/ N;
        imag = imag / N;

        let freq = k;
        let amp = Math.sqrt(real*real + imag*imag);
        let phase = Math.atan2(imag, real);
        result[k] = { real, imag, freq, amp, phase };
    }
    return result;
}

function data(valid){
    if(valid){
        line(prevx,prevy, mouseX, mouseY);
        x_coord.push(mouseX);
        y_coord.push(mouseY);
        prevx = mouseX;
        prevy = mouseY;
    }else{
        prevx = mouseX;
        prevy = mouseY;
    }
}