import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import React, { useContext ,useState} from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
    const [isCheckout, setIsCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit,setdidsubmit]=useState(false)
    const cartCntx = useContext(CartContext);

    const removeHandler = (id) => {
        cartCntx.removeItem( id)
    }
    const addHandler = (item) => {
        cartCntx.addItem({...item,amount:1})
    }
    const submitHandler =async (userData) => {
        setIsSubmitting(true)
       await fetch('https://eatery-50969-default-rtdb.firebaseio.com/orders.json',
           {
               method: 'POST',
               body: JSON.stringify({
                   user: userData,
                   orderedItems:cartCntx.items
               })
        })
        setIsSubmitting(false)
        setdidsubmit(true)
        cartCntx.clearCart()
    }
    const cartItems = <ul className={classes['cart-items']}>
        {cartCntx.items.map(item => <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeHandler.bind(null,item.id)}
            onAdd={addHandler.bind(null,item)}
        />)}
    </ul>;
    const orderHandler = () => {
        setIsCheckOut(true)
    }
    
    const totalAmount=`₹${cartCntx.totalAmount.toFixed(2)}`
    const hasItems = cartCntx.items.length > 0
    const modalActions = (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
    );
    const cartModelContent = <React.Fragment>
    {cartItems}
        <div className={classes.total}>
        <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </React.Fragment>
    const isSubmittingModelContent = <p>sending order data sabar karo...</p>
    const didSubmitModelContent=<p>Success!!..</p>
    return <Modal onClose={props.onClose} >
        {!isSubmitting && !didSubmit&& cartModelContent}
        {isSubmitting && isSubmittingModelContent}
        {didSubmit &&didSubmitModelContent }
    </Modal>
}
export default Cart;