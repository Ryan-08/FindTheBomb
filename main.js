var skor = 0;
var sizeField = 5;
const field = document.getElementById('field');
const tiles = document.getElementsByClassName('tiles');

// funct to make field of the game
function fieldMaker(size){    
    var number = 0;
    for (let baris = 0; baris < size; baris++) {
        var row = document.createElement('div');
        row.className="row";
        for (let kotak = 0; kotak < size; kotak++) {
            number++;
            var tiles = document.createElement('div');
            tiles.className="tiles";
            tiles.innerHTML=number;
            row.appendChild(tiles);
        }        
        field.appendChild(row);
    }
}

// game start
function Start(){
    fieldMaker(sizeField);
    addBomb(sizeField - 1);
    addEvent();
    timeDecreaser($('#timer'));
    colorTransition($('#timer'), 0, 255, 0);
}
// toggle class when click tile or open tile on click
function checkResponse() {
    var message = document.getElementById('message');
    this.classList.toggle('tile');    
    this.removeEventListener('click', checkResponse, false);
    if(this.childElementCount){
        this.classList.toggle('bomb');    
        this.innerHTML='bomb';
        skor+=5;
    }        
    message.innerHTML=skor;
};
function addEvent(){
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', checkResponse, false);    
    }
}
function removeEvent(){
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener('click', checkResponse, false);    
    }
}


function timeDecreaser($element){
    var BarWidth =  $element.width()-4;    
    $element.width(BarWidth);        
    if(BarWidth > 0) {
        setTimeout(function() {
            timeDecreaser($element);            
        }, 100);
    }  
    else{
        GameOver($element);
    }
}

function GameOver($element){
    removeEvent();
    $element.width(280);           
    $element.text("Game Over");             
    setTimeout(function() {                
        $element.text("Play Again?");
    }, 1000);            
    setTimeout(function() {                
        $element.text("Click Here!!");             
    }, 2000);      
    $element.click(function(){                
        $element.text("");  
        $("div").remove(".row, .tiles");   
        skor = 0;    
        Start();
    });    
}

function checkBomb(index){
    if(tiles[index].childElementCount){
        return true;        
    }
    return false;
}

function addBomb(total){    
    var bomb = document.createElement('div');
    bomb.className="bom";
    var index = Math.floor(Math.random() * tiles.length);
    if(checkBomb(index)==false){
        tiles[index].appendChild(bomb); //add        
    }
    else{ 
        total++;
    }

    if(total > 0)
        addBomb(total-1);    
}

function colorTransition($what, r, g, b){    
    // transistion green > red
    $what.css({"background-color": 'rgba('+r+','+g+','+b+','+100+')'});    
    if(g > 0){
        if(r < 255)
        {
            setTimeout(function() {
                colorTransition($what, r+10, g, b);  
            }, 300);            
        }            
        if(r >= 255){
            setTimeout(function() {
                colorTransition($what, r, g-10, b);     
            }, 100);                        
        }
    }
}

Start();