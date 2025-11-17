const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 1, y: 1 };
let quotesCollected = 0;

const map = [
    "############",
    "#@   #    Q#",
    "# #### ### #",
    "#      #   #",
    "# ## #### ##",
    "#   Q      #",
    "############"
];

function draw() {
    ctx.clearRect(0, 0, 320, 320);

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "#") {
                ctx.fillStyle = "#555";
                ctx.fillRect(x*20, y*20, 20, 20);
            }
        }
    }

    ctx.fillStyle = "yellow";
    ctx.fillRect(player.x * 20, player.y * 20, 20, 20);
}

function popup(text) {
    const p = document.getElementById("popup");
    p.innerText = text;
    p.style.display = "block";
    setTimeout(() => p.style.display = "none", 3000);
}

function move(dir) {
    let nx = player.x;
    let ny = player.y;

    if (dir === "up") ny--;
    if (dir === "down") ny++;
    if (dir === "left") nx--;
    if (dir === "right") nx++;

    if (map[ny][nx] === "#") return;

    player.x = nx;
    player.y = ny;

    if (map[ny][nx] === "Q") {
        quotesCollected++;
        map[ny] = map[ny].replace("Q", " ");

        if (quotesCollected === 1)
            popup("Quote 1: Discipline is destiny.");
        if (quotesCollected === 2)
            popup("Quote 2: No man is free who is not master of himself.");
    }

    draw();
}

draw();
