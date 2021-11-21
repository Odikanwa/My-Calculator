import React, { useState, useEffect, useRef } from 'react';
import Display from '../display/Display';
import Input from '../input/Input';
import './calculator.css';
import ErrorBoundary from '../ErrorBoundary';
// import useKeypress from 'react-use-keypress';

//Custom hook for extracting keyboard presses
const useKeypress = (key, action) => {
    useEffect(() => {
        const onKeyup = (e) => {
            if (e.key === key) action ()
        }
        window.addEventListener('keyup', onKeyup);
        //remove event listener when function unmounts
        return () => window.removeEventListener('keyup', onKeyup)
    }, []);
}

//Custom hook for extracting previous answer
const usePrevious = (data) => {
const ref = useRef();
useEffect(() => {
    ref.current = data;
}, [data])
    return ref.current;
}

//Component returns Input and Display Components
const Calculator = (props) => {

    //declare initial values using hooks  
    const [result, setResult] = useState('');
    const [expression, setExpression] = useState('');
    const [power, setPower] = useState('OFF')
    const [disable, setDisable] = useState(true);

    const powerRef = useRef();   

    //Toggle Power | disable buttons & form
    const powerUp = () => {
        if (power === 'OFF'){
        setPower('ON');
        powerRef.current.style.backgroundColor = '#008000';
        powerRef.current.style.color = 'white';
        setDisable(false);
        }else {
            setPower('OFF');
            powerRef.current.style.backgroundColor = 'grey';
            clear();
            setDisable(true);
        }
    }

    //Concatenate only the expression
    const handleClick = (event) => {
        //setValue(result.concat(event.target.name));
        setExpression(expression.concat(event.target.name));
        let value = event.target.name;

            //Give a space after each operator
            if (value === '+'){
                setExpression(expression + ' + ');
            } else if (value === '-'){
                setExpression(expression + ' - ');
            } else if (value === '*'){
                setExpression(expression + ' * ');
            } else if (value === '/'){
                setExpression(expression + ' / ');
            }

            //Disallow multiple zeroes before decimal point
            if ((expression.indexOf('0') === 0 || expression.charAt(0) === '' ) && (value === '0' || value === '000')){
                setExpression('0');
            }
            //Allow Zeroes and tripple zeroes after decimal point
            if (expression.charAt(1) === '.' && value === '0'){
                setExpression(expression + '0');
            } else if (expression.charAt(1) === '.' && value === '000'){
                setExpression(expression + '000');
            }
            //Ensure a decimal point doesn't start an expression
            if (expression.charAt(0) === '' && value === '.' ){
                setExpression('');
            }
            
            //Revisit
            //Prevent expressions starting with 0 but no decimal
            if (expression.charAt(0) === '0' && !(value === '.')){
                setExpression(expression);
            }

            //Prevent an entry from having more than one decimal point

            //Revisit
            //Ensure only one decimal point is entered
            if ((expression.includes('.')) && (expression.includes('+') || expression.includes('-') || expression.includes('/') 
            || expression.includes('*')) && (value === '.')) {
                setExpression(expression + '.')
            } else if ((expression.includes('.')) && !(expression.includes('+') || expression.includes('+') || expression.includes('+') 
            || expression.includes('+')) && (value === '.')){
                setExpression(expression)
            }

            //Disallow decimal following operators
            if (expression.endsWith(' ') && value === '.'){
                setExpression(expression);
            }
            
            //Disallow continous dots
            if (expression.endsWith('.') && value === '.'){
                setExpression(expression);
            }

            // let opRegex = expression.search(/[+|\-|:|*]/)
            // if (expression.split(opRegex, expression.length).includes('.') && value === '.'){
            //     alert('moron');
            // }




            // let opRegex = search(/[+|\-|:|*]/)
            // if (expression.search(/[+|\-|:|*]/) && charAt())

        //event.preventDefault(); 
    }

    //clear the last input for both expression and value
    const backspace = () => {
        setResult(result.slice(0, -1));
        setExpression(expression.slice(0, -1));
    }

    //Calculate the result: Only evaluate the expression
    const calculateResult = (event) => {
        try {
            setResult(eval(expression).toString());
        } catch (error) {
            setResult('Error');
        }
    }

    //Remove Zero prefixes if number is not a decimal (e.g 000123)


    //extract the previous result from the usePrevious custom hook  
    const prevResult = usePrevious(result);
    console.log(prevResult);

    
    //show result
    const showPrevResult = () => {
        try {
        setResult(eval(prevResult).toString());
        setExpression(eval(prevResult).toString());
        } catch (error) {
         setResult('Error');
         setExpression('Error');   
        }
    }

    //Clear the result
    const clear = (event) => {
        setResult('');
        setExpression('');
    }

    //Implement the keypress extraction
    useKeypress('1', () => {
        setExpression(expression => expression + '1');
    });
    useKeypress('2', () => {
        setExpression(expression => expression + '2');
    });
    useKeypress('3', () => {
        setExpression(expression => expression + '3');
    });
    useKeypress('4', () => {
        setExpression(expression => expression + '4');
    });
    useKeypress('5', () => {
        setExpression(expression => expression + '5');
    });
    useKeypress('6', () => {
        setExpression(expression => expression + '6');
    });
    useKeypress('7', () => {
        setExpression(expression => expression + '7');
    });
    useKeypress('8', () => {
        setExpression(expression => expression + '8');
    });
    useKeypress('9', () => {
        setExpression(expression => expression + '9');
    });
    useKeypress('.', () => {
        setExpression(expression => expression + '.');
    });
    useKeypress('0', () => {
        setExpression(expression => expression + '0');
    });
    useKeypress('*', () => {
        setExpression(expression => expression + ' * ');
    });
    useKeypress('/', () => {
        setExpression(expression => expression + ' / ');
    });
    useKeypress('+', () => {
        setExpression(expression => expression + ' + ');
    });
    useKeypress('-', () => {
        setExpression(expression => expression + ' - ');
    });
    useKeypress('=', () => {
        setResult(result => parseFloat(eval(expression)).toString());
    });
    useKeypress('Backspace', () => {
        setExpression(expression => expression.slice(0, -1));
    });
    useKeypress('Delete', () => {
        setExpression('');
        setResult('')
    });
    useKeypress('Enter', (event) => {
        setExpression(expression => eval(prevResult));

        //setExpression(expression => expression.slice(0, -1));
        //setResult(eval(prevResult).toString());
        console.log('Enter key was pressed!')
    });
   
    // useKeypress(['1', '2', '3'], (e) => {
    //     if(e.key === '1') {
    //         setExpression(expression => expression + '1');
    //     } else {
    //         setExpression('0')
    //     }
    // });
    //useKeypress('3', (event) => {handleClick(event)});


    // useKeypress(['1', '2'], (event) => {
    //     if (event.key === '1') {
    //       setExpression(expression => expression + '1');
    //     } else {
    //       setExpression('2');
    //     }
    //   });

    return (
        <ErrorBoundary>
        <div className='calc-frame'>
            <div className='header'>
                <p className='calc-name'>MIC++</p>
                <button className='powerBtn' ref={powerRef} onClick={powerUp}>{power}</button>
            </div>
            <Display result={result} handleClick={handleClick} showPrevResult={showPrevResult} 
            expression={expression} disable={disable}/>
            <Input name={result} handleClick={handleClick} clear={clear} backspace={backspace} 
            calculateResult={calculateResult} showPrevResult={showPrevResult} disable={disable}/>
        </div>
        </ErrorBoundary>
    )
}
export default Calculator;

//TODO
//Power button should toggle ON & OFF
//At OFF, all buttons, forms and displays should be disabled
//Button should show yellow when off and green when ON

//Handle all errors, use react js error class:points, etc.
//Toosh the UI abeg