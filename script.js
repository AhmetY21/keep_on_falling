
var character = document.getElementById('character');
var game = document.getElementById('game');
var interval;
var both=0;
var counter=0;
var currentBlocks = [];
var level = 1;
var blockCount = 0;
var gameSpeed = 1; // Change this value to adjust game speed
var minHoleLength = 50; // Minimum length of a hole
var maxHoleLength = 360; // Maximum length of a hole


window.addEventListener('touchstart', function onFirstTouch() {
    window.removeEventListener('touchstart', onFirstTouch, false);
    document.body.classList.add('user-is-touching');
  }, false);
  
function getRandomColor() { // Function to get random color
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left>0){
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left<380){
        character.style.left = left + 2 + "px";
    }
}

// Add event listeners for touch events on the buttons
document.getElementById("left-button").addEventListener("touchstart", function() {
    interval = setInterval(moveLeft,1);
});

document.getElementById("left-button").addEventListener("touchend", function() {
    clearInterval(interval);
});

document.getElementById("right-button").addEventListener("touchstart", function() {
    interval = setInterval(moveRight,1);
});

document.getElementById("right-button").addEventListener("touchend", function() {
    clearInterval(interval);
});

document.addEventListener("keydown",event =>{
    
    if(both==0)
    
    {   both++; 
        if(event.key=="ArrowLeft"){
        interval = setInterval(moveLeft,1)

    }
    if(event.key=="ArrowRight"){
        interval = setInterval(moveRight,1)
    }

}
})
document.addEventListener("keyup", event=>{
    
    clearInterval(interval);
    both=0;

})






var blocks = setInterval(function(){
    var blockLast = document.getElementById('block'+(counter - 1));
    var holeLast = document.getElementById('hole'+(counter - 1));
    if (counter > 0){
        var blockLastTop = 
        parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
        var holeLastTop = 
        parseInt(window.getComputedStyle(holeLast).getPropertyValue('top'));

    }
    if(blockLastTop<400 || counter==0)
    {    
        var block = document.createElement('div');
        var hole = document.createElement("div");
        var random = Math.floor(Math.random() * 360);
        block.setAttribute("class",'block');
        hole.setAttribute('class',"hole");
        block.setAttribute('id',"block"+counter);
        block.style.top = blockLastTop + 100 + 'px';
        hole.style.top = holeLastTop + 100 + 'px';
        hole.setAttribute('id','hole'+counter);
        hole.style.left = random + 'px'
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        var holeLength = Math.floor(Math.random() * (maxHoleLength - minHoleLength)) + minHoleLength;
        hole.style.left = holeLength + 'px'
    
        var blockColor = getRandomColor();
    
        block.style.backgroundColor = blockColor;
        
        counter++;
        blockCount++;
        if(blockCount == 15) {
            blockCount = 0;
            level++;
            document.getElementById("level").innerText = level;
            gameSpeed *= 0.9; // Increase game speed by 10%
        }
    }

    
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){

        alert('Game Over. Score: '+ (counter-9))
        clearInterval(blocks)
        location.reload()
    }

    for (var i = 0; i< currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById('block'+current);
        let ihole = document.getElementById('hole'+current);
        let iblockTop = parseInt(window.getComputedStyle(iblock).getPropertyValue('top'));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + 'px';
        ihole.style.top = iblockTop - 0.5 + 'px';
        if (iblockTop < -22){

            currentBlocks.shift();
            iblock.remove()
            ihole.remove()
        }
        
        if(iblockTop-22<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+22>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},10);
blockCount++;
if(blockCount == 5) {
    blockCount = 0;
    level++;
    document.getElementById("level").innerText = level;

    gameSpeed *= 0.9; // Increase game speed by 10%

}

// To save the score:
localStorage.setItem('previousScore', level);

// To retrieve the score:
var previousScore = localStorage.getItem('previousScore');