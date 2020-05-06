import React, {Component} from 'react'
import { Route, withRouter } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price: null
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        let newIngredients = {};
        let price;

        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1]
            } else {
                newIngredients[param[0]] = +param[1]
            }
            
        }

        this.setState({ingredients: newIngredients, price: price})
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler  = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                    cancel={this.cancelCheckoutHandler}
                    continue={this.continueCheckoutHandler} />
                <Route path={this.props.match.path + '/contact-data'}  
                        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)}
                />
            </div>
        )
    }
}
export default withRouter(Checkout);