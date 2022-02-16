import { TWorkerData } from "./evalWorker";

addEventListener("message", (event) => {
  try {
    const codeResult = eval(event.data);

    const response: TWorkerData = { status: "success", message: codeResult };

    postMessage(response);

    close();
  } catch (e) {
    postMessage({
      error: e.name,
      message: e.message,
    });

    close();
  }
});
