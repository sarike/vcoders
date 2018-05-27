import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'

import Header from './container/header'
import Footer from './container/footer'
import Loading from './component/loading'

import userApi from './api/user'
import store from './redux/store'

import './app.scss'

const history = createBrowserHistory()

export default class App extends Component {
    componentDidMount () {
        userApi.profile()
    }
    render () {
        const LoadableHome = Loadable({ loader: () => import(/* webpackChunkName: "home" */ './container/home'), loading: Loading })
        const LoadableSetting = Loadable({ loader: () => import(/* webpackChunkName: "setting" */ './container/setting'), loading: Loading })
        const LoadableForm = Loadable({ loader: () => import(/* webpackChunkName: "form" */ './container/form'), loading: Loading })
        const LoadableDetail = Loadable({ loader: () => import(/* webpackChunkName: "detail" */ './container/detail'), loading: Loading })
        const LoadableCommentDetail = Loadable({ loader: () => import(/* webpackChunkName: "comment" */ './container/comment'), loading: Loading })
        const LoadableTag = Loadable({ loader: () => import(/* webpackChunkName: "tag" */ './container/tag'), loading: Loading })
        const LoadableUser = Loadable({ loader: () => import(/* webpackChunkName: "user" */ './container/user'), loading: Loading })
        return (
            <Provider store={store}>
                <Router history={history}>
                    <React.Fragment>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={LoadableHome} />
                            <Route path="/setting" component={LoadableSetting} />
                            <Route path="/publish" component={LoadableForm} />
                            <Route path="/topic/:id/edit" component={LoadableForm} />
                            <Route path="/topic/:id" component={LoadableDetail} />
                            <Route path="/comment/:id" component={LoadableCommentDetail} />
                            <Route path="/tag/:id" component={LoadableTag} />
                            <Route path="/user/:id" component={LoadableUser} />
                        </Switch>
                        <Footer />
                    </React.Fragment>
                </Router>
            </Provider>
        )
    }
}
