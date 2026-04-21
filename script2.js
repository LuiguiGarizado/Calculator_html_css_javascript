const state = {
  num1: '',
  sign: '',
  num2: '',
  stage: 'num1'
};

function updateDisplay() {
  document.getElementById('num1').value   = state.num1;
  document.getElementById('sign').value   = state.sign;
  document.getElementById('num2').value   = state.num2;
}

function calculate() {
  const a = parseFloat(state.num1);
  const b = parseFloat(state.num2);
  const ops = { '+': a + b, '-': a - b, '*': a * b, '/': a / b };
  const result = ops[state.sign];
  document.getElementById('result').value =
    isFinite(result) ? result : 'ERROR';
  return result;
}

document.querySelectorAll('.btn').forEach(btn =>
  btn.addEventListener('click', () => {
    const v = btn.textContent;

    if (btn.id === 'c') {
      Object.assign(state, { num1:'', sign:'', num2:'', stage:'num1' });
    } else if (btn.id === 'delete') {
      if (state.stage === 'num1') state.num1 = state.num1.slice(0, -1);
      if (state.stage === 'num2') state.num2 = state.num2.slice(0, -1);
    } else if (btn.id === 'equal') {
      if (state.num1 && state.sign && state.num2) calculate();
      state.stage = 'result';
    } else if (['+','-','*','/'].includes(v)) {
      if (!state.num1) return;
      state.sign = v;
      state.stage = 'num2';
    } else {
      if (state.stage === 'result') {
        Object.assign(state, { num1: v, sign:'', num2:'', stage:'num1' });
      } else {
        state[state.stage] += v; 
      }
    }

    updateDisplay();
  })
);