// Verifica o fix de BR-F-05 (sslaccept=preferred deve ser rejeitado).
// Roda direto contra o módulo, sem precisar de DB ou servidor.

import { assertTlsForRemote, ProviderValidationError } from '../src/services/multi_provider_client.js';

const cases: Array<{ url: string; expect: 'accept' | 'reject'; label: string }> = [
  // POSTGRES — não mudou
  { url: 'postgresql://u:p@h/d?sslmode=require', expect: 'accept', label: 'pg sslmode=require' },
  { url: 'postgresql://u:p@h/d?sslmode=verify-full', expect: 'accept', label: 'pg sslmode=verify-full' },
  { url: 'postgresql://u:p@h/d', expect: 'reject', label: 'pg sem ssl' },
  { url: 'postgresql://u:p@h/d?sslmode=disable', expect: 'reject', label: 'pg sslmode=disable' },

  // MYSQL — comportamento que mudou
  { url: 'mysql://u:p@h/d?ssl=true', expect: 'accept', label: 'mysql ssl=true' },
  { url: 'mysql://u:p@h/d?sslaccept=strict', expect: 'accept', label: 'mysql sslaccept=strict' },
  { url: 'mysql://u:p@h/d?sslaccept=preferred', expect: 'reject', label: 'mysql sslaccept=preferred (fix BR-F-05)' },
  { url: 'mysql://u:p@h/d', expect: 'reject', label: 'mysql sem ssl' },
];

let pass = 0;
let fail = 0;

for (const c of cases) {
  let actual: 'accept' | 'reject';
  try {
    assertTlsForRemote(c.url);
    actual = 'accept';
  } catch (err) {
    actual = err instanceof ProviderValidationError ? 'reject' : 'accept';
  }
  const ok = actual === c.expect;
  console.log(`${ok ? '✓' : '✗'} ${c.label} → expect=${c.expect} actual=${actual}`);
  if (ok) pass += 1;
  else fail += 1;
}

console.log(`\n${pass}/${pass + fail} pass`);
if (fail > 0) process.exit(1);
