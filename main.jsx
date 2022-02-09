import React from "https://dev.jspm.io/react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";
import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import Home from "./pages/home.jsx";
const app = new Application();
app.static("/static", "static");

app.use((next) =>
  (c) => {
    let e = next(c);
    if (React.isValidElement(e)) {
      e = ReactDOMServer.renderToString(e);
    }
    return e;
  }
);

app.get("/", () => {
  return <Home />;
})
  .start({ port: 8080 });

console.log(`server listening on http://localhost:8080`);
