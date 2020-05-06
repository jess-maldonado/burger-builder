import React, {Component} from 'react';

import Button from '../../../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jessica',
                address: {
                    street: 'Test street',
                    zipCode: '27517',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                console.log(response)
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
                console.log(error)
            })


    }

    render() {
        let form = (
            <form>
                    <input type="text" name="name" placeholder="NAME" className={classes.Input} />
                    <input type="text" name="email" placeholder="EMAIL" className={classes.Input} />
                    <input type="text" name="street" placeholder="STREET NAME" className={classes.Input} />
                    <input type="text" name="zip" placeholder="ZIP CODE" className={classes.Input} />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                {form}
            </div>
        )
    }

    
}

export default ContactData;