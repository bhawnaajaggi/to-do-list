document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const taskCategory = document.getElementById('task-category');
    const taskDate = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');

    loadTasks();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value, taskCategory.value, taskDate.value);
        taskInput.value = '';
        taskDate.value = '';
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => displayTask(task));
    }

    function addTask(task, category, date) {
        if (task && category && date) {
            const taskObject = { task, category, date, completed: false };
            saveTask(taskObject);
            displayTask(taskObject);
        }
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTask(task) {
        const li = document.createElement('li');
        li.textContent = ${task.task} [${task.category}] - ${task.date};
        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => {
            removeTask(task);
            taskList.removeChild(li);
        });

        li.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            updateTask(task);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function removeTask(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.task !== taskToRemove.task || task.date !== taskToRemove.date);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => (task.task === updatedTask.task && task.date === updatedTask.date) ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});