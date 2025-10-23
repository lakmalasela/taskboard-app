import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerComponent } from './components/task-manager.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskManagerComponent },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
