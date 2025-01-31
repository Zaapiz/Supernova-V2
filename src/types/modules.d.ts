interface ScramjetControllerOptions {
  prefix: string;
  files: {
    wasm: string;
    worker: string;
    client: string;
    shared: string;
    sync: string;
  };
}

declare global {
  interface Window {
    iframeurl: string;
  }

  declare const __uv$config: {
    prefix: string;
    encodeUrl: (url: string) => string;
    decodeUrl: (url: string) => string;
    handler: string;
    client: string;
    bundle: string;
    config: string;
    sw: string;
  };

  declare class ScramjetController {
    constructor(options: ScramjetControllerOptions);

    encodeUrl(url: string): string;
    init(sw: string): void;
  }
}

export {};