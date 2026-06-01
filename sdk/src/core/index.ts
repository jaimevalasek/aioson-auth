// Public surface of the framework-neutral auth core (architecture.md § 2).
// Consumed internally by the Express adapter and the Next adapter, and exposed
// as `@aioson/auth-sdk/core` for advanced consumers who build their own adapter.
export * from './flows.js';
export * from './result.js';
export * from './cookies.js';
export * from './mode.js';
