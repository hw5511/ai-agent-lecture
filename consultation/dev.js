/**
 * Dev Server - live-server + chokidar file watcher
 * Watches sections/ and css/ for changes, auto-rebuilds and live-reloads browser.
 */

const { spawn, execSync } = require('child_process');
const path = require('path');

const ROOT = __dirname;
const PORT = 3002;

// 1. Start live-server
const liveServer = spawn(
  process.execPath,
  [
    path.join(ROOT, 'node_modules', 'live-server', 'live-server.js'),
    '.',
    `--port=${PORT}`,
    '--no-browser',
    '--wait=400',
    '--entry-file=_build/ai_agent_lecture.html',
  ],
  { cwd: ROOT, stdio: 'pipe', windowsHide: true }
);

console.log(`[dev] live-server started on port ${PORT}`);

// 2. Start chokidar watcher
const chokidar = require('chokidar');
const watchPaths = [
  path.join(ROOT, 'sections', '**', '*.html'),
  path.join(ROOT, 'manifest.json'),
];

let buildTimeout = null;

const watcher = chokidar.watch(watchPaths, {
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
});

watcher.on('all', (event, filePath) => {
  const rel = path.relative(ROOT, filePath);
  console.log(`[dev] ${event}: ${rel}`);

  // Debounce builds
  if (buildTimeout) clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log('[dev] Rebuilding...');
    try {
      execSync('python build.py', { cwd: ROOT, stdio: 'pipe', windowsHide: true });
      console.log('[dev] Build complete.');
    } catch (e) {
      console.error('[dev] Build failed:', e.message);
    }
  }, 200);
});

console.log(`[dev] Watching sections/ and manifest.json for changes`);

// Cleanup
process.on('SIGINT', () => {
  liveServer.kill();
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  liveServer.kill();
  watcher.close();
  process.exit(0);
});
