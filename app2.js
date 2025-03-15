class Task {
  constructor(name, priority = 'medium', completed = false) {
    this.name = name;
    this.priority = priority;
    this.completed = completed;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

class TaskManager {
  constructor() {
    this.tasks = []; // In-memory tasks
  }

  addTask(task) {
    this.tasks.push(task);
    this.renderTasks();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
  }

  toggleTask(index) {
    this.tasks[index].toggleCompletion();
    this.renderTasks();
  }

  renderTasks() {
    const allTasksList = document.getElementById('task-list-all');
    const completedTasksList = document.getElementById('task-list-completed');
    const pendingTasksList = document.getElementById('task-list-pending');

    allTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    pendingTasksList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      li.classList.add('task-item', `task-${task.priority}`);
      li.draggable = true;

      li.addEventListener('click', () => this.toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.classList.add('delete-btn');

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeTask(index); // Remove from the tasks list
      });

      li.appendChild(deleteBtn);

      if (task.completed) {
        li.classList.add('completed');
        completedTasksList.appendChild(li);
      } else {
        pendingTasksList.appendChild(li);
      }
    });

    // Render All Tasks as well
    this.tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      li.classList.add('task-item', `task-${task.priority}`);
      li.draggable = true;

      li.addEventListener('click', () => this.toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.classList.add('delete-btn');

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeTask(index); // Remove from the tasks list
      });

      li.appendChild(deleteBtn);
      allTasksList.appendChild(li);
    });
  }
}

const taskManager = new TaskManager();

document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const priority = document.getElementById('task-priority').value;
  const taskName = taskInput.value.trim();

  if (taskName) {
    const newTask = new Task(taskName, priority);
    taskManager.addTask(newTask);
    taskInput.value = ''; // Clear input after adding task
  }
});

document.getElementById('add-note-btn').addEventListener('click', () => {
  const notesDisplay = document.getElementById('notes-display');
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText) {
    const noteElement = document.createElement('div');
    noteElement.textContent = noteText;
    notesDisplay.appendChild(noteElement);
    noteInput.value = ''; // Clear note input after adding note
  }
});
