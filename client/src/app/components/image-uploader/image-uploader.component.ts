import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  baseUrl = 'http://img-uploader.com';
  imagePath: string;
  status: string = null;

  constructor(private imageService: ImageService, private router: Router) {}

  ngAfterViewInit() {
    let dragArea = document.querySelector('#drag');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dragArea.addEventListener(eventName, (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    dragArea.addEventListener('drop', (e: DragEvent) => {
      this.handleFiles(e.dataTransfer.files);
    });
  }

  uploadImage(file: File): void {
    this.status = 'uploading';
    this.imageService.uploadImage(file).subscribe(
      (res) => {
        this.status = res.status;
        this.imagePath = `${this.baseUrl}${res.image}`;
      },
      (err) => {
        Swal.fire({
          title: 'Oops',
          text: 'Image could not be uploaded. Try again!',
        });
        this.router
          .navigateByUrl('/upload/image', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
        console.error(err);
      }
    );
  }

  handleFiles(files: FileList) {
    if (files.length > 1) {
      Swal.fire({
        title: 'Oops...',
        text: 'You cannot upload more than one file at a time.',
        icon: 'error',
      });
      return false;
    }
    if (files[0] && !files[0].type.match('image/*')) {
      Swal.fire({
        title: 'Oops...',
        text: 'File must be an image!',
        icon: 'error',
      });
      return false;
    }
    this.uploadImage(files[0]);
  }

  copyLink() {
    navigator.clipboard.writeText(this.imagePath);
    Swal.fire({
      title: 'Link copied!',
      text: 'The link has been copied to the clipboard.',
      icon: 'success',
    });
  }
}
