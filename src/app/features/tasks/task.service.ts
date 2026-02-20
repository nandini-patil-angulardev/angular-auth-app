import { computed, Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private _tasks = signal<Task[]>([]);
  tasks = this._tasks.asReadonly();

  addTask(title: string, description: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false
    };

    this._tasks.update(tasks => [...tasks, newTask]);
  }
   toggleTask(id: number) {
    this._tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  deleteTask(id: number) {
    this._tasks.update(tasks =>
      tasks.filter(t => t.id !== id)
    );
  }

  totalTasks = computed(() => this._tasks().length);
  completedTasks = computed(() =>
    this._tasks().filter(t => t.completed).length
  );
}
