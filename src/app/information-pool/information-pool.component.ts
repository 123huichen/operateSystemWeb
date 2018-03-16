import { Component, OnInit } from '@angular/core';


interface FormItemOption {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[]
}
@Component({
  selector: 'app-information-pool',
  templateUrl: './information-pool.component.html',
  styleUrls: ['./information-pool.component.css']
})
export class InformationPoolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  config: FormItemOption[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name'
    },
    {
      type: 'input',
      label: 'first name',
      name: 'name',
      placeholder: 'Enter your name'
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'name',
      placeholder: 'Enter your name'
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option'
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit'
    }
  ];

}
