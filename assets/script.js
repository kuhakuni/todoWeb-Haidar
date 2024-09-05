const form = document.querySelector("#login-form");
form?.addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = form.email.value;
	const password = form.password.value;
	await fetch("https://todo-api.bestcar.id/api/v1/auth/authentication", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Email or password is incorrect");
		})
		.then((data) => {
			localStorage.setItem("token", data.data.token);
			localStorage.setItem("name", data.data.roles[0].name);
			location.href = "/home.html";
		})
		.catch((err) => {
			const error = document.querySelector("#error-message");
			error.innerHTML = "Email or password is incorrect";
		});
});
