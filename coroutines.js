let tickCallbacks = {};
let id = 0;

function tickCoroutines() {
  Object.values(tickCallbacks).forEach(fn => {
    try {
      fn();
    } catch (error) {
      console.error("Error en tickCallback:", error);
    }
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startCoroutine(coroutine) {
  const coroutineId = id++;

  return new Promise((resolve, reject) => {
    function progress() {
      try {
        let ret = coroutine.next();
        if (ret.done) {
          resolve();
          delete tickCallbacks[coroutineId];
        } else {
          if (ret.value instanceof Promise) {
            delete tickCallbacks[coroutineId];
            ret.value
              .then(() => progress())
              .catch(error => {
                console.error("Error en la promesa de la corrutina:", error);
                reject(error);
              });
          } else {
            tickCallbacks[coroutineId] = progress;
          }
        }
      } catch (error) {
        console.error("Error en la corrutina:", error);
        reject(error);
        delete tickCallbacks[coroutineId];
      }
    }

    progress();
  });
}
