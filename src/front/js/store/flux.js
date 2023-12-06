const apiUrl = process.env.BACKEND_URL + "/api"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			sign: async (newUser) => {
				console.log(newUser);

				try {
					const response = await fetch(apiUrl + "/sign", {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {
							"Content-Type": "application/json",
							'access-control-allow-origin': "*"
						}
					});

					if (!response.ok) {
						throw new Error("Error with the request");
					}

					const data = await response.json();
					alert("usuario registrado")
					console.log("respuesta al intentar un new user:", data);

					// Aquí podrías realizar alguna acción con los datos obtenidos, como actualizar el estado

					// Ejemplo de uso de getActions (asegúrate de que getActions esté disponible en tu contexto)
					// const actions = getActions();

				} catch (error) {
					console.log("Error:", error);
					// Aquí podrías mostrar un mensaje de error al usuario o realizar alguna otra acción para manejar el error
				}
			},

			test: async () => {
				try {

					let response = await fetch(apiUrl + "/test")
					let data = await response.json()
					alert(data)

				} catch (e) {
					console.error(e)
				}
			}




		}
	};
};

export default getState;
