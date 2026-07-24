import { spawn } from "child_process";
import { platform } from "os";

const python = platform() === "win32" ? "python" : "python3";
const baseUrl = "http://127.0.0.1:8080";

const server = spawn(
  python,
  ["-m", "http.server", "8080", "--directory", "_site"],
  { stdio: "ignore", shell: platform() === "win32" },
);

process.env.PLAYWRIGHT_BASE_URL = baseUrl;
process.env.PLAYWRIGHT_SKIP_LIVE = "1";

const playwrightArgs = ["playwright", "test", "--grep", "@a11y", ...process.argv.slice(2)];

await new Promise((resolve) => setTimeout(resolve, 500));

const tests = spawn("npx", playwrightArgs, {
  stdio: "inherit",
  shell: platform() === "win32",
  env: process.env,
});

tests.on("exit", (code) => {
  server.kill();
  process.exit(code ?? 1);
});

server.on("exit", () => {
  // server stopped; tests may still be running
});
