// generic version of https://github.com/testing-library/dom-testing-library/blob/a86c54ccda5242ad8dfc1c70d31980bdbf96af7f/src/wait-for.js#L18

interface WaitForOptions {
  container?: Node;
  timeout?: number;
  interval?: number;
  onTimeout?: (error: Error) => Error;
  mutationObserverOptions?: MutationObserverInit;
}

export function waitFor<T>(
  callback: () => T | Promise<T>,
  options: WaitForOptions = {}
): Promise<T> {
  const {
    container = document,
    timeout = 5000,
    interval = 50,
    onTimeout = (error: Error) => error,
    mutationObserverOptions = {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    },
  } = options;

  if (typeof callback !== 'function') {
    throw new TypeError('Received `callback` arg must be a function');
  }

  return new Promise<T>((resolve, reject) => {
    let lastError: Error | null = null;
    const intervalId: number = window.setInterval(checkCallback, interval);
    const observer: MutationObserver = new MutationObserver(checkCallback);
    // let finished = false;
    let promiseStatus: 'idle' | 'pending' | 'resolved' | 'rejected' = 'idle';

    const overallTimeoutTimer = setTimeout(handleTimeout, timeout);

    observer.observe(container, mutationObserverOptions);

    checkCallback();

    function checkCallback() {
      if (promiseStatus === 'pending') return;
      try {
        const result = callback();
        if (result instanceof Promise) {
          promiseStatus = 'pending';
          result.then(
            (resolvedValue) => {
              promiseStatus = 'resolved';
              onDone(null, resolvedValue);
            },
            (rejectedValue) => {
              promiseStatus = 'rejected';
              lastError = rejectedValue instanceof Error ? rejectedValue : new Error(String(rejectedValue));
            },
          );
        } else {
          onDone(null, result);
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
      }
    }

    function onDone(error: Error | null, result: T | null) {
      // finished = true;
      clearTimeout(overallTimeoutTimer);
      clearInterval(intervalId);
      observer.disconnect();

      if (error) {
        reject(error);
      } else {
        resolve(result as T);
      }
    }

    function handleTimeout() {
      const error = lastError || new Error('Timed out in waitFor.');
      onDone(onTimeout(error), null);
    }
  });
}