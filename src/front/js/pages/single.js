import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<>

			{store.currentUser ?


				<div className="jumbotron">
					<h1 className="display-4">Si ves a rigo es porque estas logueado </h1>
					<img src={rigoImageUrl} />
					<hr className="my-4" />
				</div>

				:

				<>

					<h2>Logueate para que veas mas contenido</h2>

					<Link to="/">

						<button type="button" className="btn btn-primary">Create una cuenta</button>

					</Link>

				</>

			}

		</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
