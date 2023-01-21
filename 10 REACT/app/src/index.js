import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

class LoginForm extends React.Component {
    render() {
        return (
            <form>
                <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="logo" />
                <Field type="text" placeholder="Email address or Phone number" />
                <Field type="password" placeholder="Password" />
                <Button id="SignIn" type="submit" value="Log in" />
                <Button id="SignUp" type="button" value="Create New Account" />
            </form>
        );
    }
}

function Field(props) {
    return <input type={props.type} placeholder={props.placeholder} />;
}

function Button(props) {
    return <input id={props.id} type={props.type} value={props.value} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginForm />);