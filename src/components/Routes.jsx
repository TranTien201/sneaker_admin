import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Products from '../pages/Products'
import AddProduct from '../pages/AddProduct'
import AddImage from '../pages/AddImage'
import AddSize from '../pages/AddSize'
import AddBrand from '../pages/AddBrand'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/products' component={Products}/>
            <Route path='/add_product' component={AddProduct}/>
            <Route path='/add_image' component={AddImage} />
            <Route path='/add_size' component={AddSize} />
            <Route path='/add_brand' component={AddBrand} />
        </Switch>
    )
}

export default Routes
