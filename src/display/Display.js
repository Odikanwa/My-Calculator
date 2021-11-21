import React from 'react';
import './display.css'
import '../calculator/Calculator';

//Display the inputed expression and show result
const Display = (props) => {
    console.log(props.result);

    return (
        
    <div>
        <form>
            <input type='text' id='input-display' name='form-input' value={props.expression} 
            onChange={props.handleClick} disabled={true}/>
        </form>
        <div id='result-display'>
            <span className='result' ref={props.answerRef}>{props.result}</span>
        </div>
    </div>
    )
}

export default Display;
