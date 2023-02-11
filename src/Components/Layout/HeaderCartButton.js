import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import CartContext from "../../Store/cart-context";
import { useContext,useState,useEffect } from "react";
const HeaderCartButton = (props) => {
    const [isBumb, setBump] = useState(false);
    const ctx = useContext(CartContext)
    const numberOfItems = ctx.items.reduce((anyNumber, item) => {
        return anyNumber + item.amount;

    }, 0)
    const { items } = ctx;
    const btnClasses = `${classes.button} ${isBumb ? classes.bump : ''}`
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBump(true)
        const timer = setTimeout(() => {
        setBump(false)
            
        },100)
        return () => {
    clearTimeout(timer)
}
    },[ctx])
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
    <span>Your Cart</span>
        <span className={classes.badge}>{ numberOfItems}</span>
        
    </button>
}
export default HeaderCartButton;