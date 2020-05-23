document.addEventListener('DOMContentLoaded', ()=>{
    getElement('addTodo').addEventListener('click', addTodo);
    getElement('clearAll').addEventListener('click', clearAll);
    getElement('markAll').addEventListener('click', markAll);
    getElement('unmarkAll').addEventListener('click', unmarkAll);
})

function markAll() {
    const todoElements = document.getElementsByClassName('todo');
    for (let i = 0; i < todoElements.length; i++) {
        const todosElm = todoElements[i];
        if (!todosElm.classList.contains('done')) {
            todosElm.classList.add('done');
        }        
    }
}

function unmarkAll() {
    const todoElements = document.getElementsByClassName('todo');
    for (let i = 0; i < todoElements.length; i++) {
        const todosElm = todoElements[i];
        if (todosElm.classList.contains('done')) {
            todosElm.classList.remove('done');
        }        
    }
}

function clearAll() {
    getElement('todoList').innerHTML = '';
}

function addTodo() {    
    const todoText = getTodoText();  
    const todoElm = createTodo(todoText);
    createRemoveButton(todoElm);
    addToggleDone(todoElm);
}

function addToggleDone(todoElm) {
    todoElm.addEventListener('click', ()=>{
        if (todoElm.classList.contains('done')) {
            todoElm.classList.remove('done');
        } else {
            todoElm.classList.add('done');
        }
    })
}

function createRemoveButton(todoElm) {
    const removeButton = createElement('button');
    todoElm.append(removeButton);
    removeButton.innerHTML = '&#10060';
    removeButton.classList.add('btn')
    removeButton.addEventListener('click', (event)=>{
        event.stopPropagation();
        todoElm.remove();
    })
}

function getElement(elmId) {
    return document.getElementById(elmId);
}

function createElement(tagName) {
    return document.createElement(tagName);
}

function append(element, containerId) {
    const container = getElement(containerId);
    container.append(element);
}

function createTodo(todoText) {
    const todoElm = createElement('div'); 
    todoElm.innerHTML = todoText; 
    todoElm.className = 'todo'; 
    if (todoText.value !== '') {
        append(todoElm, 'todoList');
        return todoElm;
    }    
    
}

function getTodoText() {
    const todoTextElm = getElement('todoText');
    const text = todoTextElm.value;
    todoTextElm.value = ''; 
    return text;
}