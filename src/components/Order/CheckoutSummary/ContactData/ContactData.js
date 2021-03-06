import React, {Component} from 'react';

import Button from '../../../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'}, 
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                }
            }


        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {...updatedOrderForm[inputIdentifier]}
        updatedElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement
        this.setState({orderForm: updatedOrderForm})

    }



    render() {

        const formElementsArr = [];
        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArr.map(el => <Input 
                    key={el.id}
                    inputtype={el.config.elementType} 
                    type={el.config.elementConfig.type}
                    name={el.key}
                    placeholder={el.config.elementConfig.placeholder}
                    options={el.config.elementConfig.options}
                    changed={(event) => this.inputChangedHandler(event, el.id)} />
                 )}      
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