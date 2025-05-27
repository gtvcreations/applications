import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { titleInputNumberNativeVsNgModel } from '../researches';

@Component({
  selector: 'app-input-number-native-vs-ngmodel',
  imports: [FormsModule],
  templateUrl: './input-number-native-vs-ngmodel.component.html',
  styleUrl: './input-number-native-vs-ngmodel.component.scss'
})
export class InputNumberNativeVsNgmodelComponent {
  title = titleInputNumberNativeVsNgModel;
  nativeField: any = 5e3;
  angularField: any = 5e3;

  nativeFieldEventData: any;
  nativeFieldConvertedToNumber: any;
  angularFieldEventData: any;

  onUpdateNativeField = (event: any) => {
    this.nativeFieldEventData = event.target.value;
    this.nativeFieldConvertedToNumber = Number(this.nativeFieldEventData);
  };

  onUpdateAngularField = (data: any) => {
    this.angularFieldEventData = data;
  }
}
