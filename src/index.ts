import { CprDate, generateCprs } from '../src/cpr';

const cprList = document.querySelector('#cpr-list')!;

const getValueFromInput = function (elementId: string): string {
  return (document.querySelector(elementId) as HTMLInputElement).value;
};

const getInputValues = function () {
  return new Promise<CprDate>((resolve) => {
    const day = getValueFromInput('#day-input');
    const month = getValueFromInput('#month-input');
    const year = getValueFromInput('#year-input');
    resolve({
      day,
      month,
      year,
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

(function () {
  const form = document.querySelector('#generate-cpr-form') as HTMLFormElement;
  form.addEventListener('submit', onSubmitHandler);
})();
