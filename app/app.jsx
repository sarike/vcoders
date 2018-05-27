import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'

import Header from './container/header'
import Footer from './container/footer'
import Home from './container/home'
import Form from './container/form'
import Setting from './container/setting'
import Detail from './container/detail'
import CommentDetail from './container/comment'
import Tag from './container/tag'
import User from './container/user'

import userApi from './api/user'
import store from './redux/store'

import './app.scss'

const history = createBrowserHistory()

export default class App extends Component {
    componentDidMount () {
        userApi.profile()
    }
    render () {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <React.Fragment>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/setting" component={Setting} />
                            <Route path="/publish" component={Form} />
                            <Route path="/topic/:id/edit" component={Form} />
                            <Route path="/topic/:id" component={Detail} />
                            <Route path="/comment/:id" component={CommentDetail} />
                            <Route path="/tag/:id" component={Tag} />
                            <Route path="/user/:id" component={User} />
                        </Switch>
                        <Footer />
                    </React.Fragment>
                </Router>
            </Provider>
        )
    }
}
