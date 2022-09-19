import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../utils/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: fadeInOut
})
export class AlertComponent implements OnInit {
  @Input() message?: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {}

}
