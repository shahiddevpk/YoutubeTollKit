/**
 * @deprecated Use `npm run audit:thin-content` (TypeScript registry merge).
 */
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['tsx', 'scripts/audit-thin-content-ts.ts'], {
  stdio: 'inherit',
  shell: true,
});
process.exit(r.status ?? 1);
