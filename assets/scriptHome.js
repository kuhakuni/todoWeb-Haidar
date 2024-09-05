const btnLogout = document.getElementById("btn-logout");

btnLogout?.addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("name");
	location.href = "/index.html";
});

const getTodos = async () => {
	const todoContainer = document.getElementById("todo-container");
	await fetch(
		"https://todo-api.bestcar.id/api/v1/todo?pageNumber=1&pageSize=1000",
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Failed to fetch data");
		})
		.then((data) => {
			console.log(data);
			data.forEach((todo) => {
				console.log(todo);
				const todoItem = document.createElement("div");
				todoItem.classList.add("col-md-6");
				todoItem.innerHTML = `
          <div class="col-md-12 todo-item" onclick="getTodoId('${
						todo.todoId
					}')">
            <div>
              <h5 class="fs-6">${todo.day}</h5>
              <p class="m-0 fs-3 fw-bold">
              ${todo.note}
              </p>
              <p class="m-0 fst-italic">
                Created at ${new Date(todo.todayDate).toLocaleString()}
              </p>
            </div>
            <div class="d-flex flex-column gap-2">
              <button class="btn btn-warning">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-danger" onclick="deleteTodo('${
								todo.todoId
							}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div
        `;
				todoContainer.appendChild(todoItem);
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const username = document.getElementById("username");
username.innerHTML = localStorage.getItem("name").toLowerCase();

getTodos();

function getTodoId(id) {
	console.log(id);
}

const btnAddTodo = document.getElementById("btn-add-todo");
const formAddTodo = document.getElementById("form-add-todo");

formAddTodo.addEventListener("submit", (e) => {
	e.preventDefault();
	const note = document.getElementById("note").value;
	const day = document.getElementById("day").value;
	const todayDate = new Date().toISOString();
	const body = {
		note,
		day,
		todayDate,
	};
	fetch("https://todo-api.bestcar.id/api/v1/todo", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(body),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Failed to add todo");
		})
		.then((_data) => {
			location.reload();
		})
		.catch((err) => {
			console.log(err);
		});
});

function deleteTodo(id) {
  const confirmDelete = confirm("Are you sure you want to delete this todo?");
  if (!confirmDelete) {
    return;
  }
	fetch(`https://todo-api.bestcar.id/api/v1/todo?todoId=${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Failed to delete todo");
		})
		.then((_data) => {
			location.reload();
		})
		.catch((err) => {
			console.log(err);
		});
}
