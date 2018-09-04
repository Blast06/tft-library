import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input() config: any[] = [];

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(controlConfig => {
      const control = this.fb.control(
        controlConfig.value || null,
        controlConfig.validators || null
      );
      group.addControl(controlConfig.controlName, control);
    });
    return group;
  }

  handleSubmit() {
    this.submitted.emit(this.form.value);
  }
}
