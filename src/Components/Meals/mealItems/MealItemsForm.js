import Input from '../../UI/Input';
import classes from './MealItemsForm.module.css'
import { useRef,useState } from 'react';
const MealItemsForm = (props) => {
    const [amountIsV,setAmountISv]=useState(true)
    const amountInputRef=useRef()
    const SubmitHanler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5)
        {
            setAmountISv(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    }
    return <form className={classes.form} onSubmit={SubmitHanler}>
        <Input
            ref={amountInputRef}
            label="Amount"
            input={{
                id: 'amount',
                type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue:'1'
        }} />
        <button>+ Add</button>
        {!amountIsV && <p>Please enter correct value </p>}
    </form>
}
export default MealItemsForm;