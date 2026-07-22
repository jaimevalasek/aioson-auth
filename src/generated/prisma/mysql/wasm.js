
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AuthDatabaseMetadataScalarFieldEnum = {
  id: 'id',
  schema_version: 'schema_version',
  provider: 'provider',
  installation_id: 'installation_id',
  owner_id: 'owner_id',
  migration_state: 'migration_state',
  data_revision: 'data_revision',
  source_revision: 'source_revision',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.GlobalSettingsScalarFieldEnum = {
  id: 'id',
  google_client_id: 'google_client_id',
  google_client_secret: 'google_client_secret',
  github_client_id: 'github_client_id',
  github_client_secret: 'github_client_secret',
  smtp_host: 'smtp_host',
  smtp_port: 'smtp_port',
  smtp_user: 'smtp_user',
  smtp_pass: 'smtp_pass',
  smtp_from_email: 'smtp_from_email',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TokenRevocationScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  binding_id: 'binding_id',
  revoked_at: 'revoked_at',
  expires_at: 'expires_at',
  aioson_play_id: 'aioson_play_id'
};

exports.Prisma.AppBindingScalarFieldEnum = {
  id: 'id',
  app_name: 'app_name',
  app_slug: 'app_slug',
  connection_name: 'connection_name',
  system_permissions: 'system_permissions',
  enable_2fa: 'enable_2fa',
  enable_rbac: 'enable_rbac',
  auth_mode: 'auth_mode',
  manifest_fingerprint: 'manifest_fingerprint',
  manifest_sync_status: 'manifest_sync_status',
  manifest_sync_error: 'manifest_sync_error',
  manifest_synced_at: 'manifest_synced_at',
  allowed_origins_json: 'allowed_origins_json',
  aioson_play_id: 'aioson_play_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PlayAppInventoryScalarFieldEnum = {
  id: 'id',
  aioson_play_id: 'aioson_play_id',
  inventory_id: 'inventory_id',
  app_slug: 'app_slug',
  app_name: 'app_name',
  version: 'version',
  description: 'description',
  lifecycle: 'lifecycle',
  source: 'source',
  supports_auth: 'supports_auth',
  accepted_roles_json: 'accepted_roles_json',
  manifest_fingerprint: 'manifest_fingerprint',
  warnings_json: 'warnings_json',
  last_seen_at: 'last_seen_at',
  archived_at: 'archived_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.GlobalUserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password_hash: 'password_hash',
  name: 'name',
  totp_secret: 'totp_secret',
  aioson_play_origin_id: 'aioson_play_origin_id',
  disabled_at: 'disabled_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.BindingPermissionScalarFieldEnum = {
  id: 'id',
  binding_id: 'binding_id',
  name: 'name',
  resource: 'resource',
  action: 'action',
  retired_at: 'retired_at',
  created_at: 'created_at'
};

exports.Prisma.AppProfileScalarFieldEnum = {
  id: 'id',
  binding_id: 'binding_id',
  name: 'name',
  description: 'description',
  is_system: 'is_system',
  is_migration_generated: 'is_migration_generated',
  archived_at: 'archived_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AppProfilePermissionScalarFieldEnum = {
  id: 'id',
  profile_id: 'profile_id',
  permission_id: 'permission_id',
  created_at: 'created_at'
};

exports.Prisma.AppAccessScalarFieldEnum = {
  id: 'id',
  binding_id: 'binding_id',
  user_id: 'user_id',
  profile_id: 'profile_id',
  status: 'status',
  aioson_play_origin_id: 'aioson_play_origin_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  role_id: 'role_id',
  permission_id: 'permission_id',
  binding_id: 'binding_id',
  created_at: 'created_at'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  role_id: 'role_id',
  binding_id: 'binding_id',
  aioson_play_origin_id: 'aioson_play_origin_id',
  created_at: 'created_at'
};

exports.Prisma.AuthSessionScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  token: 'token',
  binding_id: 'binding_id',
  expires_at: 'expires_at',
  aioson_play_id: 'aioson_play_id',
  created_at: 'created_at'
};

exports.Prisma.RecoveryTokenScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  token: 'token',
  expires_at: 'expires_at',
  used: 'used',
  created_at: 'created_at'
};

exports.Prisma.AdminUserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password_hash: 'password_hash',
  created_at: 'created_at'
};

exports.Prisma.FederationConfigScalarFieldEnum = {
  id: 'id',
  federation_active: 'federation_active',
  project_id: 'project_id',
  project_name: 'project_name',
  db_provider: 'db_provider',
  db_connection_keyring_id: 'db_connection_keyring_id',
  activated_at: 'activated_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  AuthDatabaseMetadata: 'AuthDatabaseMetadata',
  GlobalSettings: 'GlobalSettings',
  TokenRevocation: 'TokenRevocation',
  AppBinding: 'AppBinding',
  PlayAppInventory: 'PlayAppInventory',
  GlobalUser: 'GlobalUser',
  BindingPermission: 'BindingPermission',
  AppProfile: 'AppProfile',
  AppProfilePermission: 'AppProfilePermission',
  AppAccess: 'AppAccess',
  Role: 'Role',
  RolePermission: 'RolePermission',
  UserRole: 'UserRole',
  AuthSession: 'AuthSession',
  RecoveryToken: 'RecoveryToken',
  AdminUser: 'AdminUser',
  FederationConfig: 'FederationConfig'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
