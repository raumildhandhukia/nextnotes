import { Server } from "@hocuspocus/server";

declare global {
  var hocuspocus: typeof Server | undefined;
}

export const server =
  globalThis.hocuspocus ||
  Server.configure({
    port: 80,
  });
server.listen();
globalThis.hocuspocus = server;
