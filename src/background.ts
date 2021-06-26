type InputValues = {
  day: string;
  month: string;
  year: string;
};

const setInitialStorage = function () {
  const currentDate = new Date(Date.now());
  const inputValues: InputValues = {
    day: currentDate.getDay().toString(),
    month: currentDate.getMonth().toString(),
    year: currentDate.getFullYear().toString(),
  };
  browser.storage.local.set({ inputValues });
};

browser.runtime.onInstalled.addListener(setInitialStorage);
