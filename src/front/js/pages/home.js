import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [lastName, setLastName] = useState("")
	const [userName, setUserName] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")
	const [date, setDate] = useState("")
	const [isActive, setIsActive] = useState(false)

	const navigate = useNavigate()

	const handlerSignUp= (e) => {
		e.preventDefault()
		actions.signUp(email, password, name, lastName, userName, country, phone, address, date, isActive)
		navigate("/demo")
		setEmail("")
		setPassword("")
		setName("")
		setLastName("")
		setUserName("")
		setCountry("")
		setPhone("")
		setAddress("")
		setDate("")
		setIsActive("")
	}

	return (
		<div className="container mt-5">
			
			<form className="row g-3">
			<div className="col-md-6">
				<label for="inputEmail4" className="form-label">Email</label>
				<input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e)=> setEmail(e.target.value)}/>
			</div>
			<div className="col-md-6">
				<label for="inputPassword4" className="form-label">Password</label>
				<input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e)=> setPassword(e.target.value)}/>
			</div>
			<div className="col-12">
				<label for="inputAddress" className="form-label">Name</label>
				<input type="text" className="form-control" id="inputAddress" value={name} onChange={(e)=> setName(e.target.value)}/>
			</div>
			<div className="col-12">
				<label for="inputAddress2" className="form-label">Last Name</label>
				<input type="text" className="form-control" id="inputAddress2" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
			</div>

			<div className="col-md-6">
				<label for="inputCity" className="form-label">User Name</label>
				<input type="text" className="form-control" id="inputCity" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
			</div>

			<div className="col-md-6">
				<label for="inputCity" className="form-label">Country</label>
				<input type="text" className="form-control" id="inputCity" value={country} onChange={(e)=> setCountry(e.target.value)}/>
			</div>

			<div className="col-md-6">
				<label for="inputCity" className="form-label">Phone</label>
				<input type="number" className="form-control" id="inputCity" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
			</div>

			<div className="col-md-6">
				<label for="inputCity" className="form-label">Address</label>
				<input type="text" className="form-control" id="inputCity" value={address} onChange={(e)=> setAddress(e.target.value)}/>
			</div>

			
			<div className="col-md-2">
				<label for="inputZip" className="form-label">Date</label>
				<input type="date" className="form-control" id="inputZip" value={date} onChange={(e)=> setDate(e.target.value)}/>
			</div>
			<div className="col-12">
				<div className="form-check">
				<input className="form-check-input" type="checkbox" id="gridCheck" value={isActive} onChange={(e)=> setIsActive(e.target.value)}/>
				<label className="form-check-label" for="gridCheck">
					Is active
				</label>
				</div>
			</div>
			<div className="col-12">
				<button type="submit" className="btn btn-primary" onClick={(e)=> handlerSignUp(e)}>Sign in</button>
			</div>
			</form>
		
		</div>
	);
};
