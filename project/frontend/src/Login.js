import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			email : "",
			password: "",
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/userSearch")
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
			this.props.history.push("/userSearch");
		}
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		await loginUser(userData);
	}

	async loginUser = userData => dispatch => {
		var path = "/api/login/" + this.state.email + "&" + "this.state.password";
		var success = await fetch(path, {method: 'GET'})
			.then(data => data.json())
			.then((res) => {
				if(res.success) {
					const {token} = res.token;
					localStorage.setItem("jwtToken", token);
					setAuthToken(token);
					const decoded = jwt_decode(token);
					dispatch(setCurrentUser(decoded));
				} else {
					alert("The email/password provided was invalid")
				}
			})
	}

	setCurrentUser = (decoded) => {
		return {
			type: SET_CURRENTUSER,
			payload: decoded,
		};
	}

	render() {
		const { errors } = this.state;
		return (
		<div className="container">
	        <div style={{ marginTop: "4rem" }} className="row">
	          <div className="col s8 offset-s2">
	            <Link to="/" className="btn-flat waves-effect">
	              <i className="material-icons left">keyboard_backspace</i> Back to
	              home
	            </Link>
	            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	              <h4>
	                <b>Login</b> below
	              </h4>
	              <p className="grey-text text-darken-1">
	                Don't have an account? Click here to register!
	              </p>
	            </div>
	            <form noValidate onSubmit={this.onSubmit}>
	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.email}
	                  error={errors.email}
	                  id="email"
	                  type="text"
	                  className={classnames("", {
	                    invalid: errors.email || errors.emailnotfound
	                  })}
	                />
	                <label htmlFor="email">Email</label>
	                <span className="red-text">
	                  {errors.email}
	                  {errors.emailnotfound}
	                </span>
	              </div>
	              <div className="input-field col s12">
	                <input
	                  onChange={this.onChange}
	                  value={this.state.password}
	                  error={errors.password}
	                  id="password"
	                  type="password"
	                  className={classnames("", {
	                    invalid: errors.password || errors.passwordincorrect
	                  })}
	                />
	                <label htmlFor="password">Password</label>
	                <span className="red-text">
	                  {errors.password}
	                  {errors.passwordincorrect}
	                </span>
	              </div>
	              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	                <button
	                  style={{
	                    width: "150px",
	                    borderRadius: "3px",
	                    letterSpacing: "1.5px",
	                    marginTop: "1rem",
	                    backgroundColor: "rgb(0, 188, 212)"
	                  }}
	                  type="submit"
	                  className="hoverable"
	                >
	                  Login
	                </button>
	              </div>
	            </form>
	          </div>
	        </div>
	      </div>
	    );
	}
}
