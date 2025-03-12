const lockedValuesStore = new Map();

function lockFactory(store: any) {
  let lockedValues = lockedValuesStore.get(store);
  if (!lockedValues) {
    lockedValues = new Map();
    lockedValuesStore.set(store, lockedValues);
  }

  return {
    acquire: (value: any, timeout = 5000) =>
      new Promise((resolve, reject) => {
        function impl() {
          if (lockedValues.has(value)) {
            setTimeout(() => impl(), 10); // Espera bloqueio liberado
          } else {
            console.log(`Lock acquired para ID ${value}`);
            // Promise pendente para o bloqueio
            let release;
            const lockPromise = new Promise((res) => (release = res));
            lockedValues.set(value, release); // Associa o valor à função de liberação
            resolve(lockPromise); // Retorna a Promise para ser resolvida externamente

            // Configura liberação automática após timeout
            const timeoutHandle = setTimeout(() => {
              if (lockedValues.has(value)) {
                lockedValues.get(value)(); // Libera o lock
                lockedValues.delete(value);
                console.warn(
                  `Lock auto-released para ID ${value} após timeout.`
                );
              }
            }, timeout);
            
            resolve(
              lockPromise.finally(() => {
                clearTimeout(timeoutHandle);
              })
            );
          }
        }
        impl();
      }),

    release: (value: any) => {
      if (lockedValues.has(value)) {
        const release = lockedValues.get(value);
        release(); // Resolve a Promise pendente
        lockedValues.delete(value);
        console.log(`Lock released para ID ${value}`);
      } else {
        console.warn(`No lock found para ID ${value} to release.`);
      }
    },
  };
}

export default lockFactory;
