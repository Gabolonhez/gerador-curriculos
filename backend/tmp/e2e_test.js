(async () => {
  const payload = { name: "Test User", email: "test@example.com" };
  try {
    console.log("creating order...");
    const r = await fetch("http://127.0.0.1:8080/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    console.log("created", j.order.id, "paymentUrl", j.paymentUrl);
    const id = j.order.id;
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        const sres = await fetch("http://127.0.0.1:8080/api/order/" + id);
        if (!sres.ok) {
          console.log("order fetch not ok", sres.status);
          continue;
        }
        const s = await sres.json();
        console.log("poll", i, s.status);
        if (s.status === "ready") {
          const d = await fetch("http://127.0.0.1:8080/api/download/" + id);
          console.log("download status", d.status, "url", d.url);
          break;
        }
      } catch (e) {
        console.error("poll error", e);
      }
    }
  } catch (e) {
    console.error("create error", e);
    process.exit(1);
  }
})();
