import React from 'react';
import { Button } from 'reactstrap';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Actions
import {  logoutUsers, getUser, getUsers } from '../actions/userActions';

// CSS
import './Home.css';

// Component
import AppNavbar from './AppNavbar';
import App from '../App';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            first_name: '',
            last_name: '',
            email: '',
            test: false
        };
        this.logout = this.logout.bind(this);
        
        
          
    }
    sendOtp = () => {
       var randomNo= Math.floor(100000 + Math.random() * 900000);
       console.log(randomNo);

    }
    async componentDidMount() {
        var self = this;
        const obj = getFromStorage('react_login_app');
        if (obj && obj.token) {
            // console.log(obj);
            const { token } = obj;
            const mainUser = await getUser(token);
            // console.log(mainUser);
            self.setState({
                token,
                first_name: mainUser.first_name,
                last_name: mainUser.last_name,
                email: mainUser.email
            });
        }
    }

    async logout() {
        const res = await logoutUsers();
        // console.log(res);
        if (res.success) {
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                test: !this.state.test
            });
        }
    }

    render() {
        const {
            token,
            first_name,
            last_name,
            email,
            test
        } = this.state;

        if (test) {
            return (
                <div className="App_CSS">
                    <App />
                    {/* <AppNavbar /> */}
                </div>
            );
        }

        return (
            <div className="Home_CSS">
            <AppNavbar />
                <h1>Login Successful</h1>
                <div className="Profile">
                    <h2>Logged in User</h2>
                    {
                        (first_name) ? (
                            <h3>Name: {first_name} {last_name}</h3>
                        ) : (null)
                    }
                    {
                        (email) ? (
                            <h3>Email: {email}</h3>
                        ) : (null)
                    }
                    <div>                       
                        
                        <form method="POST" action="verify">
                            <input type="text"></input>
                            <Button color="secondary">verify email</Button>  
                        </form>  
                    </div>
                </div>
                <Button color="primary" onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}