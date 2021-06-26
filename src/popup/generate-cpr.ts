import { CprDate, generateCprs } from '../scripts/cpr';
import { InputValues } from '../InputValues';

type InputField = keyof InputValues | undefined;

const cprList = document.querySelector('#cpr-list')!;
const dayInput = document.querySelector('#day-input') as HTMLInputElement;
const monthInput = document.querySelector('#month-input')! as HTMLInputElement;
const yearInput = document.querySelector('#year-input')! as HTMLInputElement;
const form = document.querySelector('#generate-cpr-form') as HTMLFormElement;

const getInputValues = function () {
  return new Promise<CprDate>((resolve) => {
    resolve({
      day: dayInput.value,
      month: monthInput.value,
      year: yearInput.value,
    });
  });
};

const onSubmitHandler = function (event: Event) {
  event.preventDefault();
  getInputValues()
    .then(generateCprs)
    .then((cprs) => {
      cprs.forEach((cpr) => {
        const cprListElement = document.createElement('li');
        cprListElement.textContent = cpr;
        cprList.append(cprListElement);
      });
    });
};

const setInputValuesFromStore = function (storage: any) {
  const inputValues = storage.inputValues as InputValues;
  dayInput.value = inputValues.day;
  monthInput.value = inputValues.month;
  yearInput.value = inputValues.year;
};

const getPropertyToUpdate = function (inputId: string): InputField {
  switch (inputId) {
    case 'day-input':
      return 'day';
    case 'month-input':
      return 'month';
    case 'year-input':
      return 'year';
    default:
      return undefined;
  }
};

const storeInputValue = function (event: Event) {
  const input = event.target as HTMLInputElement;
  browser.storage.local
    .get('inputValues')
    .then((storage) => {
      return new Promise<InputValues>((resolve) => {
        const inputValues = storage.inputValues as InputValues;
        resolve(inputValues);
      });
    })
    .then((inputValues) => {
      return new Promise<InputValues>((resolve) => {
        const fieldToUpdate = getPropertyToUpdate(input.id)!;
        const newInputValues = { ...inputValues };
        newInputValues[fieldToUpdate] = input.value;
        resolve(newInputValues);
      });
    })
    .then((inputValues) => {
      return browser.storage.local.set({ inputValues });
    });
};

(function () {
  form.addEventListener('submit', onSubmitHandler);
  dayInput.addEventListener('keypress', storeInputValue);
  monthInput.addEventListener('keypress', storeInputValue);
  yearInput.addEventListener('keypress', storeInputValue);
  browser.storage.local.get('inputValues').then(setInputValuesFromStore);
})();
