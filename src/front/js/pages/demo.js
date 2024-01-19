import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState(null)

	const handlerlogInNewUser = async () => {
		try {

			let newLogIn = {
				email: email,
				password: password,
			};

			const result = await actions.logIn(newLogIn);

			if (result.access_token) {
                localStorage.setItem("token", result.access_token);
                console.log("Usuario logueado:", result.fullName);
                actions.private();
				navigate("/single")}

		} catch (e) {
			console.error(e);
			setError("An error occurred while logging in");
		}
	};

	return (
		<div className="container">

			<h2>LOG IN</h2>

			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				{/* <div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1" />
					<label className="form-check-label" htmlFor="exampleCheck1">Keep me Signed in</label>
				</div> */}
				{error && <p className="error-message">{error}</p>}
				<button type="button" onClick={handlerlogInNewUser} className="btn btn-primary">Log in</button>
			</form>


			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
