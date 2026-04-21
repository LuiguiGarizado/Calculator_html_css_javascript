const num1Input   = document.getElementById('num1');
const signInput   = document.getElementById('sign');
const num2Input   = document.getElementById('num2');
const resultInput = document.getElementById('result');

const buttons = document.querySelectorAll('.btn');

let currentStage = 'num1';

buttons.forEach(btn => btn.addEventListener('click', () => handleClick(btn)));

function handleClick(button){
  const value = button.textContent;

  if(button.id === 'c'){
    clearAll();
    return;
  }

  if(button.id === 'delete'){
    backspace();
    return;
  }

  if(button.id === 'equal'){
    calculate();
    currentStage = 'result';
    return;
  }

  if(isOperator(value)){
    if(!num1Input.value) return;         
    if(!signInput.value){                
      signInput.value = value;
      currentStage = 'num2';
    }else{                               
      calculate();
      clearExceptResult();                
      signInput.value = value;
      currentStage = 'num2';
    }
    return;
  }

  if(currentStage === 'num1'){
    num1Input.value += value;
  }else if(currentStage === 'num2'){
    num2Input.value += value;
  }else if(currentStage === 'result'){    
    clearAll();
    num1Input.value = value;
    currentStage = 'num1';
  }
}

function isOperator(val){
  return ['+','-','*','/'].includes(val);
}

function clearAll(){
  num1Input.value   = '';
  signInput.value   = '';
  num2Input.value   = '';
  resultInput.value = '';
  currentStage      = 'num1';
}

function clearExceptResult(){
  num1Input.value   = resultInput.value;
  signInput.value   = '';
  num2Input.value   = '';
  resultInput.value = '';
}

function backspace(){
  if(currentStage === 'num1'){
    num1Input.value = num1Input.value.slice(0,-1);
  }
  else if(currentStage === 'num2'){
    if(num2Input.value.length){
      num2Input.value = num2Input.value.slice(0,-1);
    }else{              
      signInput.value = '';
      currentStage = 'num1';
    }
  }
  else if(currentStage === 'result'){
    clearAll();       
  }
}

function calculate(){
  if(num1Input.value && signInput.value && num2Input.value){
    const expression = `${num1Input.value}${signInput.value}${num2Input.value}`;
    try{
      const res = eval(expression);
      resultInput.value = (isFinite(res)) ? res : 'ERROR';
    }catch{
      resultInput.value = 'ERROR';
    }
  }
}