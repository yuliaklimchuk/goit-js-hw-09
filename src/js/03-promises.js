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
        .then(({position, delay}) => {
            Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
          })
        .catch(({position, delay}) => {
            Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
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
        resolve({position, delay});
      }
      else {
        reject({position, delay});
      }
    }, delay);
  });
  promise.position = position;
  promise.delay = delay;
  return promise;
}