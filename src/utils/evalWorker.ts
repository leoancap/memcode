export type TResult = {
  status: "error" | "timeout" | "success" | "unexecuted";
  message: string;
};

export function evalWorker(
  code: string,
  timeout: number = 5000
): Promise<TResult> {
  return new Promise((res, rej) => {
    let worker = new Worker(new URL("./worker.ts", import.meta.url));

    const workerTimeout = setTimeout(function () {
      // kill Worker
      worker.terminate();
      worker = null;
      rej({
        error: "timeout",
        message: "timeout",
      });
    }, timeout | 5000);

    worker.onmessage = (message) => {
      clearTimeout(workerTimeout);

      // kill worker
      worker.terminate();
      worker = null;
      if (message.data) {
        if (message.data.hasOwnProperty("error")) {
          rej(message.data);
        } else {
          res(message.data);
        }
      } else {
        res(message.data);
      }
    };

    worker.postMessage(code);
  });
}
