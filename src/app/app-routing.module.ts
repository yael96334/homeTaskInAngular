import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsListComponent } from './components/items-list/items-list.component';


const routes: Routes = [
  { path: '', component: ItemsListComponent },
  { path: 'itemDetails/:imdbID', component: ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}