import React from 'react';
import './input.css'
import '../calculator/Calculator';
import '../display/Display'

const Input = (props) => {

    return(
        <div className='input'>
            <div className='input-digits'>
                <button className='digits' name='7' onClick={props.handleClick} disabled={props.disable}>7</button>
                <button className='digits' name='8' onClick={props.handleClick} disabled={props.disable}>8</button>
                <button className='digits' name='9' onClick={props.handleClick} disabled={props.disable}>9</button>
                <button className='digits' name='4' onClick={props.handleClick} disabled={props.disable}>4</button>
                <button className='digits' name='5' onClick={props.handleClick} disabled={props.disable}>5</button>
                <button className='digits' name='6' onClick={props.handleClick} disabled={props.disable}>6</button>
                <button className='digits' name='1' onClick={props.handleClick} disabled={props.disable}>1</button>
                <button className='digits' name='2' onClick={props.handleClick} disabled={props.disable}>2</button>
                <button className='digits' name='3' onClick={props.handleClick} disabled={props.disable}>3</button>
                <button className='digits' name='000' onClick={props.handleClick} disabled={props.disable}>000</button>
                <button className='digits' name='.' onClick={props.handleClick} disabled={props.disable} id='dot'>.</button>
                <button className='digits' name='0' onClick={props.handleClick} disabled={props.disable}>0</button>
                
                
            </div>
            <div className='input-operators'>
                <button className='operators' name='backspace' onClick={props.backspace} disabled={props.disable}>Del</button>
                <button className='operators' name='clear' onClick={props.clear} disabled={props.disable}>AC</button>
                <button className='operators' name='*' onClick={props.handleClick} disabled={props.disable}>&times;</button>
                <button className='operators' name='/' onClick={props.handleClick} disabled={props.disable}>&divide;</button>
                <button className='operators' name='+' onClick={props.handleClick} disabled={props.disable}>+</button>
                <button className='operators' name='-' onClick={props.handleClick} disabled={props.disable}>&minus;</button>
                <button className='operators' name='prevAnswer' onClick={props.showPrevResult} disabled={props.disable}>Ans</button>
                <button className='operators' name='=' onClick={props.calculateResult} disabled={props.disable}>=</button>
            </div>
        </div>
    )
}

export default Input;