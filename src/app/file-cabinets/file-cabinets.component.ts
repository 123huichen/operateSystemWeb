import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-cabinets',
  templateUrl: './file-cabinets.component.html',
  styleUrls: ['./file-cabinets.component.css']
})
export class FileCabinetsComponent implements OnInit {
  public fileUploadImg : string;//文件上传的位置

  constructor() { }

  ngOnInit() {
    this.fileUploadImg = '../../assets/image/fileUpload.png'
  }

}
