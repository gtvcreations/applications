import { Component } from '@angular/core';
import { isNumber, getValidNumber } from '../../shared/data-handler';
import { titleGetValidNumer } from '../experiments';

@Component({
  selector: 'app-get-valid-number',
  imports: [],
  templateUrl: './get-valid-number.component.html',
  styleUrl: './get-valid-number.component.scss'
})
export class GetValidNumberComponent {
  title = titleGetValidNumer;
  inputData = [
    5,
    '5',
    3e3,
    '3e3',
    'e3',
    '',
    undefined,
    null,
    NaN,
    [],
    '[]',
    [1, 2],
    '[1, 2]',
    {},
    '{}',
    {a: 1},
    '{a: 1}',
    {a:1, b:2},
    '{a:1, b:2}',
    function test() {},
    'function test() {}',
    function() {},
    'function() {}',
    () => {},
    '() => {}',
    Infinity,
    'Infinity',
    'infinity'
  ];
  outputData: any[] = [];

  private processInputData = (data: any[]) => {
    this.outputData = [];
    this.outputData = data.map((element) => ({
      input: String(element),
      inputType: typeof element,
      output: String(getValidNumber(element))
    }));
  };

  constructor() {
    this.processInputData(this.inputData);
  }

  
}
