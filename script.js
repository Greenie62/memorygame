//DOM elements
var gamecards=document.querySelectorAll('.game-card');
var scoreDOM=document.querySelector("#score")

// sounds
var spearSound=new Audio('./assets/spear.wav')
var shuffle=new Audio('./assets/shuffle.wav')
var success=new Audio('./assets/success.wav')
var boo=new Audio('./assets/boo.wav')
var victory=new Audio('./assets/victory.wav')

//game logic variables
var hasPicked=false;
var score=0;
var pickOne=""
var pickOneIndex=""
var pickTwoIndex=""
var pickTwo=""
var points=5;

scoreDOM.innerHTML=0;


    scoreDOM.innerHTML=0;
    
    gamecards.forEach((card,index)=>{
    card.style.backgroundColor="tan"

    card.addEventListener("click",(event)=>{
        pickCard(event,index)
    })
})



function pickCard(e,index){

    if(!hasPicked){
    pickOneIndex=index;
    pickOne=e.target.classList[2]
    e.target.style.backgroundColor=pickOne
    hasPicked=true;
    spearSound.play()
    return;
    }

    if(hasPicked){
        pickTwoIndex=index;
        pickTwo=e.target.classList[2]
        e.target.style.backgroundColor=pickTwo
        spearSound.play()
        // console.log("PickOne: " + pickOne)
        // console.log("PickTwo: " + pickTwo)
        // console.log("--------------")
        // console.log("IndexOne: " + pickOneIndex)
        // console.log("IndexTwo: " + pickTwoIndex)
    }
        if(pickOne === pickTwo){
             rightAnswer(gamecards,pickOne,pickTwo,pickOneIndex,pickTwoIndex)
             score+=points;
             points=5;
             console.log("Score: " + score)
             scoreDOM.innerHTML=score;
        }
        else {
        
            setTimeout(()=>{
            wrongAnswer(gamecards,pickOne,pickTwo,pickOneIndex,pickTwoIndex)
            },750)
            points--
            if(points === 1){
                points=1;
            }
            
        }
    
}

function rightAnswer(cards,pickOne,pickTwo,indexOne,indexTwo){
    console.log("Nice Job! Score: " + score)
    hasPicked=false;
    pickOne=""
    pickTwo=""
    pickOneIndex=""
    pickTwoIndex=""
    checkGame(cards)
    success.play()
}

function wrongAnswer(cards,pickOne,pickTwo,indexOne,indexTwo){
    cards[pickOneIndex].style.backgroundColor="tan"
    cards[pickTwoIndex].style.backgroundColor="tan"
    hasPicked=false;
    pickOne=""
    pickTwo=""
    pickOneIndex=""
    pickTwoIndex=""
    checkGame(cards)
    boo.play()

}


function checkGame(cards){
    var colors=[]
   for(let i=0;i<cards.length;++i){
  
       colors.push(cards[i].style.backgroundColor)
   }
   console.log(colors)
   if(colors.indexOf("tan") === -1){
       console.log("game is over!")
       victory.play()
       setTimeout(()=>{
          resetGame(cards)
       },2000)
   }
   else{
       console.log("keep playing!")
   }
    
}


function resetGame(cards){
    cards.forEach(c=>{
        c.style.backgroundColor="tan"
        shuffle.play()
    })

    score=0;
    scoreDOM.innerHTML=score
    points=0;
    hasPicked=false;
}

