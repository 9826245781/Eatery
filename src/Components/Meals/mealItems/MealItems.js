import classes from './MealItems.module.css'
import MealItemsForm from './MealItemsForm';
import { useContext } from 'react';
import CartContext from '../../../Store/cart-context';
const MealItems = (props) => {
   const cartCntx= useContext(CartContext)
    const addToCartHandler = (amount) => {
        cartCntx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price:props.price

        })
    }
    const price=`Rs${props.price}`
    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{ price}</div>
        </div>
        <div>
            <MealItemsForm onAddToCart={addToCartHandler } />  
          </div>
    </li>
}
export default MealItems;