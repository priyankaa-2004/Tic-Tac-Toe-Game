let boxPlayer=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let newGame=document.querySelector(".new-game");

let playerO=true; //if true player O otherwise player X
let count=0;

const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxPlayer.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(playerO){
            box.innerText="O";
            box.style.color="yellow";
            box.style.boxShadow="-3px -2px 9px yellow";
            playerO=false;
        }
        else{
            box.innerText="X";
            box.style.color="#EF2D56";
            box.style.boxShadow="-3px -2px 9px #EF2D56";
            playerO=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
    });
});

const checkWinner=()=>{
    for (let pattern of winPatterns){
        let pos1=boxPlayer[pattern[0]].innerText;
        let pos2=boxPlayer[pattern[1]].innerText;
        let pos3=boxPlayer[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                showWinner(pos1);
                disableBoxes();
            }
           else if(count==9){
            msg.innerText="The game ends in a draw. \n\nTry again to break the deadlock!";
            msgContainer.classList.remove('hidden');
           }
        }
    }
}

const showWinner=(winner)=>{
    msg.innerText = `YAAYYY!! The winner is ${winner}!`;
    msgContainer.classList.remove('hidden');
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxPlayer){
        box.disabled=true;
    }
}

const resetGame=()=>{
    playerO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add('hidden');
}

const enableBoxes=()=>{
    for(let box of boxPlayer){
        box.style.boxShadow = "-3px -2px 9px #4C4C47";
        box.disabled=false;
        box.innerText="";
    }
}

reset.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);
