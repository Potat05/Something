
const button = document.querySelector('#clickclick');
const cpuSpeed = document.querySelector('#howfastiscpu');
const gpuSpeed = document.querySelector('#gpuuuuu');


button.addEventListener('click', () => {

    const start = Date.now();

    let j = 0;
    for(let i=0; i < 1000000000; i++) {
        j += (i % 2 ? 1 : i % 5 ? 10 : -5);
    }

    const end = Date.now();

    const speed = (end - start) / navigator.hardwareConcurrency;

    if(speed < 70) {
        cpuSpeed.innerText = `Your cpu is doodoo`;
    } else if(speed < 90) {
        cpuSpeed.innerText = `Your cpu is good.`;
    } else {
        cpuSpeed.innerText = `Your cpu is very good indeed.`;
    }

    console.log(speed);



    const gl = document.createElement('canvas').getContext('webgl2');

    if(gl == null) {
        gpuSpeed.innerText = `WTF???????`;
        return;
    }


    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    /** @type {string} */
    const vendor = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
    const renderer = gl.getParameter(debug.UNMASKED_VENDOR_WEBGL);


    const split = vendor.split(' ').slice(2, 8);

    if(split.includes('NVIDIA')) {
        const number = parseInt(split.find(s => !Number.isNaN(parseInt(s))));

        if(number < 1060) {
            gpuSpeed.innerText = `Your gpu is very very bad.`;
        } else if(number < 2060) {
            gpuSpeed.innerText = `Your gpu is decent`;
        } else if(number < 3060) {
            gpuSpeed.innerText = `Your gpu is good`;
        } else {
            gpuSpeed.innerText = `Your gpu is very good.`;
        }

        console.log(number);
    } else {

        let directXver = split.find(s => s.toLowerCase().includes('direct'));
        if(directXver === undefined) {
            gpuSpeed.innerText = `Unknown.. what.`;
            return;
        }

        directXver = parseInt(directXver.split('3D')[1]);

        if(directXver < 8) {
            gpuSpeed.innerText = `Your gpu is very very bad.`;
        } else if(directXver < 10) {
            gpuSpeed.innerText = `Your gpu is decent`;
        } else if(directXver < 12) {
            gpuSpeed.innerText = `Your gpu is good`;
        } else {
            gpuSpeed.innerText = `Your gpu is very good.`;
        }

        console.log(directXver);

    }

    console.log(split);





});





const canvas = document.querySelector('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = "./20180520_101512.jpg";

let x = Math.random() * canvas.width;
let y = Math.random() * canvas.height;
let dx = 0.3;
let dy = 0.3;

let last = Date.now();
function render() {
    requestAnimationFrame(() => render());
    const dt = Date.now() - last;
    last = Date.now();

    if(x < 0) dx = Math.abs(dx);
    if(y < 0) dy = Math.abs(dy);
    if(x + img.width >= canvas.width) dx = -Math.abs(dx);
    if(y + img.height >= canvas.height) dy = -Math.abs(dy);

    x += dx * dt;
    y += dy * dt;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y);



}

render();

