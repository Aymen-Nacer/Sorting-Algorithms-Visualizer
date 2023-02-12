let n=40;
let array=[];
let sortingSpeed = 50;
bubbleSortFlag = true;
selectionSortFlag = false;

init();
initFlag= false;

var slider = document.querySelector(".slider");
slider.oninput = function() {
  n = this.value;
  //console.log(n);
  array=[];
  init();
}

var slider = document.querySelector(".speedSlider");
slider.oninput = function(){
sortingSpeed = this.value;
}





var bubbleSortBtn = document.querySelector(".bubble_sort");
bubbleSortBtn.addEventListener("click", function() {
selectionSortFlag = false;
bubbleSortFlag = true;
h2 = document.querySelector("h2");
h2.innerHTML = "Bubble Sort"
});

var selectionSortBtn = document.querySelector(".selection_sort");
selectionSortBtn.addEventListener("click", function() {
bubbleSortFlag = false;
selectionSortFlag = true;
h2 = document.querySelector("h2");
h2.innerHTML = "Selection Sort"
});

function init(){
    initFlag = true;
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function play(){
  initFlag = false;
  let moves= [];
    if (selectionSortFlag == true ){
    console.log("executing selection sort")
     moves=selectionSort([...array]);
  }
  else if (bubbleSortFlag ==true) {
    console.log("executing bubble sort")
     moves=bubbleSort([...array]);
  }
    animate(moves);
}


function animate(moves){
  if(initFlag==true){
    moves = [];
  }
    if(moves.length==0){
        showBars();
        return;
    }
    const move=moves.shift(0);
    const [i,j] = move.indices;
    if (move.type == "swap"){
    [array[i],array[j]]=[array[j],array[i]];
  }
    showBars(move);

    setTimeout(function(){
        animate(moves);
    },sortingSpeed);
}

function selectionSort(arr) {
  const moves=[];
  for (let i = 0; i < arr.length; i++) {
    let lowest = i
    for (let j = i + 1; j < arr.length; j++) {
      moves.push({indices: [j,lowest], type : "comp"});
      if (arr[j] < arr[lowest]) {
        lowest = j
      }
    }
    if (lowest !== i) {
      // Swap
      moves.push({indices: [i,lowest], type : "swap"});
      ;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
    }
  }
  return moves;
}
function bubbleSort(array){
    const moves=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
          moves.push({indices: [i-1,i], type : "comp"});
            if(array[i-1]>array[i]){
                moves.push({indices: [i-1,i], type : "swap"});
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return moves;
}


function showBars(move){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=move.type=="swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}
