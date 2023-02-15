import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/User'
import EditProfile from './user/EditProfile'
import NewPost from './post/NewPost'

const MainRouter = () => (
    <div>
        <Menu></Menu>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/user/:userId' component={Profile} />
            <Route exact path='/user/edit/:userId' component={EditProfile} />
            <Route exact path='/users' component={Users} />
            
            <Route exact path="/post/create" component={NewPost} />
        </Switch>

    </div>

)
export default MainRouter;

