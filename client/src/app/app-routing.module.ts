import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

const routes: Routes = [
  { path: '', component: ImageUploaderComponent },
  { path: 'upload/image', component: ImageUploaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
