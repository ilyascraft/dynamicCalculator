import './App.css';
import { useState } from 'react';
import { sum } from './calculator';


const numberArray = [{
   id:1,
   name:1
},
{
  id:2,
  name:2
},
{
  id:3,
  name:3
},
{
  id:4,
  name:4
},
{
  id:5,
  name:5
},
{
  id:6,
  name:6
}

];
let operatorList = ['+', '-'];

function App() {

  const [output , setOutput] = useState('')

  function handleKeyPress(e){
    console.log("handleKeyPress", e.target.innerText)
     let name  = e.target.innerText
      name  = output + name;
     setOutput(name)
  }
function calculation (a, b, operator){
  if(operator==='+'){
    return a + b;
  }
  else{
    return a - b;
  }
}


function checkValueOrOperator(value){
   if(value ==='+'  || value === '-'){
    return value;
   }
  return parseInt(value)
}
  function handleResult(e){    
      
    /**
     * Handle multiple operator  + - 
     * duplicate operator not allowed
     */

       /**
         *  check output contian multiple operator 
        *    how to handle multiple operators 
        * 
        *  if(add operator is exist ) {function sum() { retunr sum..} }
        *  else if (subtract  is exist  (-)) { subtraction {}}
        * 2+3-2
        * 
        */    

         let newOutput = JSON.parse(JSON.stringify(output))
            generateTokenForGivenStr(newOutput);
       for(let j=0; j<operatorList.length; j++){
         let resultant=[];
          let operator = operatorList[j]
          let a = -1;
          let b=-1
         for(let i=0; i<newOutput.length;i++){
          console.log('output', newOutput);
          let currentValue = checkValueOrOperator(newOutput[i]) ;
          if(newOutput[i]===operator){
              a = parseInt(newOutput[i-1]);
              b= parseInt(newOutput[i+1]);
            resultant.push(calculation(a,b , operator ))
            console.log('newOutput if', operator , resultant)
            resultant.splice(i-1,1);
          }
         else if (a=== currentValue  || b=== currentValue){
            continue;
          }
          else{
            console.log('newOutput else',currentValue)
            resultant.push(currentValue)
          }
        
          
         }
        newOutput = resultant
      }
       console.log('result ' ,newOutput);
       setOutput(newOutput[0])

  }

  return (
    <div className="App">
      <label className='output-screen'>{output}</label>
      <div className='key-container'>
        {
          numberArray.map((e) => (
            <div className='btn-key' key={e.id} onClick={handleKeyPress}>{e.name}</div>
          ))  
        }
        <div className='btn-key' key="+"  onClick={handleKeyPress}> + </div>
        <div className='btn-key' key="-"  onClick={handleKeyPress}> - </div>
        <div className='btn-key' key="="  onClick={handleResult}> = </div>

       </div>

    </div>
  );
  console.log(output);
}

export default App;