import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class TaskListComponent {
title = '';
description = '';

constructor(public taskService: TaskService) {}

addTask() {
  if (!this.title.trim()) return;
  this.taskService.addTask(this.title, this.description);
  this.title = '';
  this.description = '';
}

trackById(index: number, item: any) {
  return item.id;
}
}
