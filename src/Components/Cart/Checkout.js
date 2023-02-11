import { useRef ,useState} from 'react'
import classes from './Checkout.module.css'
const Checkout = (props) => {
    const [formInputValid,setformInputValid] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })
    const nameInputRef = useRef()
    const postalCodeInputRef = useRef()
    const streetInputRef = useRef()
    const cityInputRef = useRef()
    const isEmpty = value => value.trim() === '';
    const isNotFiveChar=value=>value.trim().length===5
    const confirmHandler = (event) => {
        event.preventDefault()
        const enteredName = nameInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        const enteredPostalCode=postalCodeInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        
        const enterdNameisValid = !isEmpty(enteredName)
        const enteredCityisValid = !isEmpty(enteredCity)
        const enteredStreetisValid = !isEmpty(enteredStreet)
        const enteredPostalCodeIsValid=(isNotFiveChar(enteredPostalCode))
        setformInputValid({
            name:enterdNameisValid,
            street:enteredStreetisValid,
            city:enteredCityisValid,
            postalCode:enteredPostalCodeIsValid
        })
        const formIsValid = enterdNameisValid && enteredCityisValid && enteredStreetisValid
            && enteredPostalCodeIsValid;
        
        if (!formIsValid) {
         return   
        }
        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            postalCode: enteredPostalCode,
            street:enteredStreet
        })
       //submit cart data
    }
    const nameCntrlclasses = `${classes.control} ${formInputValid.name?'':classes.invalid}`
    const cityCntrlclasses = `${classes.control} ${formInputValid.city ? '' : classes.invalid}`
    const streetCntrlclasses = `${classes.control} ${formInputValid.street?'':classes.invalid}`
    const postalCntrlclasses = `${classes.control} ${formInputValid.postalCode?'':classes.invalid}`
    

        
    return (
        <form onSubmit={confirmHandler}>
            <div className={nameCntrlclasses}>
            <label htmlFor='name'> Your Name</label>
                <input type='text' id='name' ref={nameInputRef} /> 
                {!formInputValid.name && <p>Please enter correct  name </p>}
            </div>
            <div className={streetCntrlclasses}>
            <label htmlFor='street'> Your Street</label>
                <input type='text' id='street ' ref={streetInputRef} /> 
                {!formInputValid.street && <p>Please enter correct  street name</p>}
                
            </div>
            <div className={postalCntrlclasses}>
            <label htmlFor='postal'> Your Postal</label>
                <input type='text' id='postal' ref={postalCodeInputRef} /> 
                {!formInputValid.postalCode && <p>Please enter correct  postal address </p>}
                
            </div>
            <div className={cityCntrlclasses}>
            <label htmlFor='city'> Your City</label>
                <input type='text' id='city' ref={cityInputRef} /> 
                {!formInputValid.city && <p>Please enter correct city name</p>}
                
            </div>
            <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>

            </div>
        </form>

    )
}
export default Checkout;