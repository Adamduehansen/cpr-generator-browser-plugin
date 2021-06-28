import { browser } from 'webextension-polyfill-ts';
import { InputValues } from './InputValues';

const setInitialStorage = function () {
  const currentDate = new Date(Date.now());

  const day = new Intl.DateTimeFormat('en', {
    day: '2-digit',
  }).format(currentDate);
  const month = new Intl.DateTimeFormat('en', {
    month: '2-digit',
  }).format(currentDate);
  const year = new Intl.DateTimeFormat('en', {
    year: '2-digit',
  }).format(currentDate);

  const inputValues: InputValues = {
    day,
    month,
    year,
  };
  browser.storage.local.set({ inputValues });
};

browser.runtime.onInstalled.addListener(setInitialStorage);
