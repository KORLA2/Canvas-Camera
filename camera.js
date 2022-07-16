let can = document.getElementById('can');
let ctx = can.getContext('2d');

let vid, width1 = 300,
    height1 = 300,
    sze2, sze1

navigator.mediaDevices.getUserMedia({
    video: {


    },
    audio: {

    }
}).then(s => {
    vid = document.createElement('video');
    vid.srcObject = s;

    vid.onloadedmetadata = () => {
        resize()
        vid.play()
        fun();
        rand();
    }

}).catch(() => { alert('denied') });
let part = [];



class parti {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = sze2 + j * width1 / 3;
        this.y = sze1 + i * height1 / 3;
    }

    draw() {
      
        ctx.drawImage(vid, this.j * vid.videoWidth / 3, this.i * vid.videoHeight /
            3, vid.videoWidth / 3, vid.videoHeight / 3, this.x, this.y, width1/ 3, height1/ 3);
        ctx.beginPath()
        ctx.rect(this.x, this.y, width1 / 3, height1 / 3);
        ctx.lineWidth = 3;
        ctx.stroke();

    }

}
let tempi, tempj;

function rand() {
    for (let i = 0; i < part.length; ++i) {
        tempi = Math.floor(Math.random() * 3);
        tempj = Math.floor(Math.random() * 3);
        for (let j = 0; j < i; ++j) {
            if (part[j].i == tempi && part[j].j == tempj) {
                tempi = Math.floor(Math.random() * 3);
                tempj = Math.floor(Math.random() * 3);
                j = -1;
            }
        }
        part[i].i = tempi;
        part[i].j = tempj;
    }
}

function resize() {

    can.height = window.innerHeight
    can.width = window.innerWidth


    sze2 = window.innerWidth / 2 - width1 / 2;
    sze1 = window.innerHeight / 2 - height1 / 2;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            part.push(new parti(i, j));
        }
    }
}
let cnt = 0;

function fun() {
    ctx.drawImage(vid, sze2, sze1, width1, height1)
    ctx.clearRect(0, 0, can.width, can.height)
    for (let i = 0; i < part.length; ++i) {
        part[i].draw();
    }
    cnt++;
    // if (cnt == 2) return;
    requestAnimationFrame(fun)
}