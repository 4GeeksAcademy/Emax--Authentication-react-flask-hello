import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [fullName, setFullName] = useState("")
	const [userName, setUserName] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")
	const [date, setDate] = useState("")
	const [isActive, setIsActive] = useState(false)

	const navigate = useNavigate()

	const handlerSignUp = (e) => {
		e.preventDefault()
		actions.signUp(email, password, fullName, userName, country, phone, address, date, isActive)
		navigate("/demo")
		setEmail("")
		setPassword("")
		setFullName("")
		setUserName("")
		setCountry("")
		setPhone("")
		setAddress("")
		setDate("")
		setIsActive("")
	}

	return (

		<>

			<div className="container-signUp mt-5">

				<div className="left">

					<h2><i className="fa-solid fa-earth-americas fa-xl mt-5 mx-3" style={{ color: "#6fe1cb" }}></i></h2>

					<div className="body-l">

						<h3 className="title-l">Plan your activities and control your progress online </h3>

						<img src="https://img.freepik.com/vector-premium/cohete-fuera-caja-lanzamiento-transbordador-espacial-al-cielo-expulsado-circulo-concepto-negocio-inicio-creativo-icono-cohete-ilustracion-vectorial-arte-papel_34950-476.jpg" alt="rochet img" />

					</div>

				</div>

				<div className="form-container right">

					<h2 className="title-r">Create Account</h2>

					<form className="row g-3 form-r">

						<div className="col-md-12">
							<label for="inputAddress" className="form-label labels">FULL NAME :</label>
							<input type="text" className="form-control inputs" id="inputAddress" value={fullName} onChange={(e) => setFullName(e.target.value)} />
						</div>

						<div className="col-md-12">
							<label for="inputCity" className="form-label labels">USER NAME :</label>
							<input type="text" className="form-control inputs" id="inputCity" value={userName} onChange={(e) => setUserName(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label for="inputEmail4" className="form-label labels">E-MAIL :</label>
							<input type="email" className="form-control inputs" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />

						</div>
						<div className="col-md-12">
							<label for="inputPassword4" className="form-label labels">PASSWORD :</label>
							<input type="password" className="form-control inputs" id="inputPassword4" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>

						<div className="col-md-12">
							<label for="inputCity" className="form-label labels">COUNTRY :</label>
							<input type="text" className="form-control inputs" id="inputCity" value={country} onChange={(e) => setCountry(e.target.value)} />
						</div>

						<div className="col-md-12">
							<label for="inputCity" className="form-label labels">PHONE :</label>
							<input type="number" className="form-control inputs" id="inputCity" value={phone} onChange={(e) => setPhone(e.target.value)} />
						</div>

						<div className="col-md-12">
							<label for="inputCity" className="form-label labels">ADDRESS :</label>
							<input type="text" className="form-control inputs" id="inputCity" value={address} onChange={(e) => setAddress(e.target.value)} />
						</div>


						<div className="col-md-4">
							<label for="inputZip" className="form-label labels">DATE :</label>
							<input type="date" className="form-control inputs inp-date" id="inputZip" value={date} onChange={(e) => setDate(e.target.value)} />
						</div>

						<div className="form-check mt-5">
							<input className="form-check-input inputs" type="checkbox" value="" id="flexCheckDefault" />
							<label className="form-check-label labels" for="flexCheckDefault">
								Accept terms and conditions?
							</label>
						</div>

						<div className="butons">

							<div></div>

							<div className="mb-4">

								<button type="submit" className="btn btn-primary singup" onClick={(e) => handlerSignUp(e)}>Sign Up</button>

							</div>

						</div>
					</form>

				</div>

			</div>

		</>
	);
};
