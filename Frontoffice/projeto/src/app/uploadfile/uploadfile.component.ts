import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../services/file-uploader.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  fileName = '';
  message = '';


  constructor(public rest: FileUploaderService) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.rest.uploadFile(file).subscribe((result:any) => {
        console.log(result);
        this.fileName = '';
        this.message = result.message;
      });
    }
  }

}
