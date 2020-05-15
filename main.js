function loadEvents() {
    document.querySelector('form').addEventListener('submit', submit);
    document.getElementById('clearAll').addEventListener('click', clearAll);
    let taskLabels = document.getElementsByClassName('taskCheckBox');
    for (let i = 0; i < taskLabels.length; i++) {
        taskLabels[i].addEventListener('change', markTask);
    }
    document.querySelector('span').addEventListener('click', removeTask);
    document.getElementById('markAll').addEventListener('click', markAll);
}

loadEvents();

function submit(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value !== '') {
        addTask(input.value);
    } 
    input.value = '';
    loadEvents();
}

function addTask(task) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `<span>&#10060</span> <label class="taskCheckBox"> <input type="checkbox">${task}</label>`;
    ul.appendChild(li);
}

function clearAll() {
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
}

function markTask(e) {
    let task = e.target.parentNode;
    if (e.target.checked) {
        task.style.textDecoration = "Line-through";
        task.style.color = "#ff0000";
    } else {
        task.style.textDecoration = "none";
        task.style.color = "#000";
    }
}
function removeTask(e) {
    let li = document.querySelector('li');
    li.parentNode.removeChild(li);
    loadEvents();
}
function markAll(e) {
    
}