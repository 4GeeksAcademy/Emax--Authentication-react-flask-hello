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

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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

			signUp: async (email, password, fullName, userName, country, phone, address, date, isActive) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/sign_up", {
						method: "POST",
						body: JSON.stringify({ email, password, fullName, userName, country, phone, address, date, isActive }),
						headers: {
							"Content-type": "application/json"
						}
					});

					if (response.ok) {
						const data = await response.json();
						console.log("User created successfully:", data);

					} else {

						const errorData = await response.json();
						console.error("Error creating user:", errorData);

					}
				} catch (error) {
					console.error("Error:", error);

				}
			}

		}
	};
};

export default getState;
