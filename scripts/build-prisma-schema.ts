/**
 * build-prisma-schema.ts
 *
 * Concatena `prisma/fragments/{provider}-overrides.prisma` + `prisma/schema.template.prisma`
 * e gera `prisma/schema.prisma` que o Prisma CLI consome.
 *
 * Provider é selecionado via env var `DATABASE_PROVIDER` (default: `sqlite`).
 * Providers válidos (MVP play-federation): sqlite | postgresql | mysql.
 *
 * Implementação da ADR-F-01 da feature play-federation.
 * Documentado em: .aioson/context/architecture-play-federation.md § 2 ADR-F-01.
 *
 * Uso:
 *   DATABASE_PROVIDER=sqlite     npm run db:build-schema  # local default
 *   DATABASE_PROVIDER=postgresql npm run db:build-schema  # Federação ativa (Postgres)
 *   DATABASE_PROVIDER=mysql      npm run db:build-schema  # Federação ativa (MySQL)
 *
 * Chamado automaticamente antes de `prisma generate` e `prisma migrate dev`
 * via scripts em package.json (`db:generate`, `db:migrate`).
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const VALID_PROVIDERS = ['sqlite', 'postgresql', 'mysql'] as const;
type Provider = (typeof VALID_PROVIDERS)[number];

function isValidProvider(v: string): v is Provider {
  return (VALID_PROVIDERS as readonly string[]).includes(v);
}

async function main() {
  const rawProvider = (process.env.DATABASE_PROVIDER ?? 'sqlite').toLowerCase();

  if (!isValidProvider(rawProvider)) {
    console.error(
      `[build-prisma-schema] DATABASE_PROVIDER inválido: "${rawProvider}".\n` +
        `Providers suportados: ${VALID_PROVIDERS.join(', ')}.\n` +
        `Veja ADR-F-01 em .aioson/context/architecture-play-federation.md`
    );
    process.exit(1);
  }

  const provider: Provider = rawProvider;
  const fragmentPath = resolve(repoRoot, 'prisma', 'fragments', `${provider}-overrides.prisma`);
  const templatePath = resolve(repoRoot, 'prisma', 'schema.template.prisma');
  const outputPath = resolve(repoRoot, 'prisma', 'schema.prisma');

  try {
    await access(fragmentPath);
    await access(templatePath);
  } catch (err) {
    console.error(`[build-prisma-schema] Arquivo de origem ausente: ${(err as Error).message}`);
    process.exit(1);
  }

  const [fragment, template] = await Promise.all([
    readFile(fragmentPath, 'utf-8'),
    readFile(templatePath, 'utf-8'),
  ]);

  const clientOutput = process.env.PRISMA_CLIENT_OUTPUT?.trim();
  const renderedTemplate = clientOutput
    ? template.replace(
        'generator client {\n  provider = "prisma-client-js"\n}',
        `generator client {\n  provider = "prisma-client-js"\n  output   = "${clientOutput.replaceAll('\\\\', '/')}"\n}`,
      )
    : template;

  const header = `// ⚠ ARQUIVO GERADO automaticamente por scripts/build-prisma-schema.ts\n` +
    `// Provider: ${provider}\n` +
    `// Gerado em: ${new Date().toISOString()}\n` +
    `// NÃO edite este arquivo — edite \`prisma/schema.template.prisma\` ou os fragments.\n\n`;

  const output = header + fragment.trimEnd() + '\n\n' + renderedTemplate.trimStart();

  await writeFile(outputPath, output, 'utf-8');
  console.log(`[build-prisma-schema] schema.prisma gerado pra provider=${provider}`);
}

main().catch((err) => {
  console.error('[build-prisma-schema] erro inesperado:', err);
  process.exit(1);
});
