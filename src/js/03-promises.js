import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  let position = 1;
  let delayStep = Number(delay.value);
  while (position <= Number(amount.value)) { 
    const newPromise = createPromise(position, delayStep);

    newPromise
        .then(() => {
            Notiflix.Notify.success(`Fulfilled promise ${newPromise.position} in ${newPromise.delay} ms`);
          })
        .catch(() => {
            Notiflix.Notify.failure(`Rejected promise ${newPromise.position} in ${newPromise.delay} ms`);
          });
    position += 1;
    delayStep += Number(step.value);
  }
};

function createPromise(position, delay) {
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve('succes');
      }
      else {
        reject('error');
      }
    }, delay);
  });
  promise.position = position;
  promise.delay = delay;
  return promise;
}