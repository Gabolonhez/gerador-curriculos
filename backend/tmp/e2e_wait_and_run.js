const net = require("net");
const waitForPort = (port, host = "127.0.0.1", timeout = 5000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      const s = net
        .createConnection(port, host)
        .on("connect", () => {
          s.end();
          resolve();
        })
        .on("error", () => {
          if (Date.now() - start > timeout) return reject(new Error("timeout"));
          setTimeout(check, 200);
        });
    })();
  });

(async () => {
  try {
    console.log("waiting for backend...");
    await waitForPort(8080, "127.0.0.1", 10000);
    console.log("backend up, creating order");
    const r = await fetch("http://127.0.0.1:8080/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: true }),
    });
    const j = await r.json();
    console.log("created", j.order.id);
    const id = j.order.id;
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const sres = await fetch("http://127.0.0.1:8080/api/order/" + id);
      if (!sres.ok) continue;
      const s = await sres.json();
      console.log("status", s.status);
      if (s.status === "ready") {
        const d = await fetch("http://127.0.0.1:8080/api/download/" + id);
        console.log("download status", d.status, "url", d.url);
        break;
      }
    }
  } catch (e) {
    console.error("e2e error", e);
    process.exit(1);
  }
})();
