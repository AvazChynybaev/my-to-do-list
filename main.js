function getElement(elmId) {
    return document.getElementById(elmId);
}

function createElement(tagName) {
    return document.createElement(tagName);
}

// Model start
class BaseRepository {
    constructor(entityClass) {
        this.list = [];
        this.entityClass = entityClass;    
    }
    find(id) {
        return id ? this.list.filter(it => it.id === id) : this.list;
    }
    findOne(id) {
        return this.find(it => it.id === id);
    }
    create(obj) {
        this.list.push(new this.entityClass(obj));
    }
    update(id, obj) {
        const entity = this.findOne(id);
        if (entity) {
            entity.patch(obj);
        }
    }
    delete(id) {
        this.list = this.list.filter(it => it.id !== id);
    }
}

class ToDoRepository extends BaseRepository {

}

class BaseEntity {
    constructor() {
        this.id = Math.random();
    }
}
class ToDoEntity extends BaseEntity {
    constructor(obj = {}) {
        super();
        this.title = obj.title || '';
        this.done = obj.done || false;
    }
    patch(obj = {}) {
        this.title = obj.title || this.title;
        this.done = obj.done || this.done;
    }
}

const todoRepo = new ToDoRepository(ToDoEntity);
todoRepo.create({title: 'first todo', done: true});
todoRepo.create({title: 'second todo', done: false});
// Model end

// View start
class ToDoListRenderer {
    constructor(repo, containerId) {
        this.repo = repo;
        this.containerId = containerId;
    }
    render() {
        const todoList = this.repo.find();
        this.container.innerHTML = '';
        todoList
            .map(todo => new ToDoRenderer(todo))
            .map(toDoRender => toDoRender.render())
            .forEach(elm => this.container.append(it));
    }
    get container() {
        return getElement(this.containerId);
    }
}

class ToDoRenderer {
    constructor(todo) {
        this.todo = todo;
    }
    render() {
        const elm = createElement('div');
        elm.innerHTML = this.todo.title;
        if (this.todo.done) {
            elm.classList.add('done');
        }
    }
}

const renderer = new ToDoListRenderer(todoRepo, todoList);
// View end

document.addEventListener('DOMContentLoaded', ()=>{
    renderer.render();
})