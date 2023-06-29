const taskInput = document.querySelector(".tareas-input input"),
filters = document.querySelectorAll(".filtro span"),
delAll = document.querySelector(".deleteall"),
taskBox = document.querySelector(".contenedor-listas");




let todos = JSON.parse(localStorage.getItem("todo-lista"));


filters.forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");

        showTareas(btn.id);
    })
})


function showTareas(filter){
    let li ="";
    if(todos){
        todos.forEach((tareas, id) =>{
            let isCompleted = tareas.status == "completed" ? "checked" : "";
            console.log(isCompleted)
            if(filter == tareas.status || filter == "all"){
                li += `
                <li class="list">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}/><p class="${isCompleted}">
                    ${tareas.name}</p></label>
            
                <i onclick="deletask(${id})" class="fa-sharp fa-solid fa-trash" id="logodel"></i>
                </li>`;
            }
            
        });
    }

    taskBox.innerHTML = li || `<span>No hay tareas disponibles</span>`;
}
showTareas("all");



function deletask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-lista", JSON.stringify(todos));
    showTareas("all");
}

delAll.addEventListener("click"
, () => {
    todos.splice(0, todos.length)
    localStorage.setItem("todo-lista", JSON.stringify(todos));
})


function updateStatus(seletedTask){
    let taskName = seletedTask.parentElement.lastElementChild;
    if(seletedTask.checked){
        taskName.classList.add("checked");
        todos[seletedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[seletedTask.id].status = "active";
    }

    localStorage.setItem("todo-lista", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!todos) {
            todos = [];
        }

        taskInput.value = "";
        let taskInfo = {name: userTask , status: "pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-lista", JSON.stringify(todos));
    }
    showTareas("all")
});


const OPCIONS = [...document.querySelectorAll(".opcion")]





showTareas("all")


