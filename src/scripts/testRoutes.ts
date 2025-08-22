import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api";

type RouteResult = { path: string; ok: boolean; status?: number; error?: string };

async function tryGet(path: string): Promise<RouteResult> {
  try {
    const res = await axios.get(`${BASE_URL}${path}`, { timeout: 10000 });
    return { path, ok: res.status >= 200 && res.status < 300, status: res.status };
  } catch (err: any) {
    const status = err?.response?.status as number | undefined;
    const message = status ? `HTTP ${status}` : err?.message || "Request failed";
    return { path, ok: false, status, error: message };
  }
}

async function main() {
  const endpoints: string[] = [
    "/", // health root
    "/health",
    "/users",
    "/drivers",
    "/riders",
    "/cars",
    "/payment-methods",
    "/rides",
    "/rides/active/list",
    "/ride-history",
  ];

  console.log(`Testing routes against ${BASE_URL}`);
  const results = await Promise.all(endpoints.map((e) => tryGet(e)));

  let passed = 0;
  for (const r of results) {
    if (r.ok) {
      passed += 1;
      console.log(`PASS  GET ${r.path} (${r.status})`);
    } else {
      console.log(`FAIL  GET ${r.path} ${r.error ? "- " + r.error : ""}`);
    }
  }

  console.log(`\n${passed}/${results.length} routes passed.`);
  if (passed !== results.length) {
    process.exitCode = 1;
  }
}

main();


