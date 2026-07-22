
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AuthDatabaseMetadata
 * 
 */
export type AuthDatabaseMetadata = $Result.DefaultSelection<Prisma.$AuthDatabaseMetadataPayload>
/**
 * Model GlobalSettings
 * 
 */
export type GlobalSettings = $Result.DefaultSelection<Prisma.$GlobalSettingsPayload>
/**
 * Model TokenRevocation
 * 
 */
export type TokenRevocation = $Result.DefaultSelection<Prisma.$TokenRevocationPayload>
/**
 * Model AppBinding
 * 
 */
export type AppBinding = $Result.DefaultSelection<Prisma.$AppBindingPayload>
/**
 * Model PlayAppInventory
 * 
 */
export type PlayAppInventory = $Result.DefaultSelection<Prisma.$PlayAppInventoryPayload>
/**
 * Model GlobalUser
 * 
 */
export type GlobalUser = $Result.DefaultSelection<Prisma.$GlobalUserPayload>
/**
 * Model BindingPermission
 * 
 */
export type BindingPermission = $Result.DefaultSelection<Prisma.$BindingPermissionPayload>
/**
 * Model AppProfile
 * 
 */
export type AppProfile = $Result.DefaultSelection<Prisma.$AppProfilePayload>
/**
 * Model AppProfilePermission
 * 
 */
export type AppProfilePermission = $Result.DefaultSelection<Prisma.$AppProfilePermissionPayload>
/**
 * Model AppAccess
 * 
 */
export type AppAccess = $Result.DefaultSelection<Prisma.$AppAccessPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>
/**
 * Model AuthSession
 * 
 */
export type AuthSession = $Result.DefaultSelection<Prisma.$AuthSessionPayload>
/**
 * Model RecoveryToken
 * 
 */
export type RecoveryToken = $Result.DefaultSelection<Prisma.$RecoveryTokenPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model FederationConfig
 * 
 */
export type FederationConfig = $Result.DefaultSelection<Prisma.$FederationConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AuthDatabaseMetadata
 * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AuthDatabaseMetadata
   * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.authDatabaseMetadata`: Exposes CRUD operations for the **AuthDatabaseMetadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthDatabaseMetadata
    * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findMany()
    * ```
    */
  get authDatabaseMetadata(): Prisma.AuthDatabaseMetadataDelegate<ExtArgs>;

  /**
   * `prisma.globalSettings`: Exposes CRUD operations for the **GlobalSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalSettings
    * const globalSettings = await prisma.globalSettings.findMany()
    * ```
    */
  get globalSettings(): Prisma.GlobalSettingsDelegate<ExtArgs>;

  /**
   * `prisma.tokenRevocation`: Exposes CRUD operations for the **TokenRevocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenRevocations
    * const tokenRevocations = await prisma.tokenRevocation.findMany()
    * ```
    */
  get tokenRevocation(): Prisma.TokenRevocationDelegate<ExtArgs>;

  /**
   * `prisma.appBinding`: Exposes CRUD operations for the **AppBinding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppBindings
    * const appBindings = await prisma.appBinding.findMany()
    * ```
    */
  get appBinding(): Prisma.AppBindingDelegate<ExtArgs>;

  /**
   * `prisma.playAppInventory`: Exposes CRUD operations for the **PlayAppInventory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayAppInventories
    * const playAppInventories = await prisma.playAppInventory.findMany()
    * ```
    */
  get playAppInventory(): Prisma.PlayAppInventoryDelegate<ExtArgs>;

  /**
   * `prisma.globalUser`: Exposes CRUD operations for the **GlobalUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalUsers
    * const globalUsers = await prisma.globalUser.findMany()
    * ```
    */
  get globalUser(): Prisma.GlobalUserDelegate<ExtArgs>;

  /**
   * `prisma.bindingPermission`: Exposes CRUD operations for the **BindingPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BindingPermissions
    * const bindingPermissions = await prisma.bindingPermission.findMany()
    * ```
    */
  get bindingPermission(): Prisma.BindingPermissionDelegate<ExtArgs>;

  /**
   * `prisma.appProfile`: Exposes CRUD operations for the **AppProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppProfiles
    * const appProfiles = await prisma.appProfile.findMany()
    * ```
    */
  get appProfile(): Prisma.AppProfileDelegate<ExtArgs>;

  /**
   * `prisma.appProfilePermission`: Exposes CRUD operations for the **AppProfilePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppProfilePermissions
    * const appProfilePermissions = await prisma.appProfilePermission.findMany()
    * ```
    */
  get appProfilePermission(): Prisma.AppProfilePermissionDelegate<ExtArgs>;

  /**
   * `prisma.appAccess`: Exposes CRUD operations for the **AppAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppAccesses
    * const appAccesses = await prisma.appAccess.findMany()
    * ```
    */
  get appAccess(): Prisma.AppAccessDelegate<ExtArgs>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs>;

  /**
   * `prisma.authSession`: Exposes CRUD operations for the **AuthSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthSessions
    * const authSessions = await prisma.authSession.findMany()
    * ```
    */
  get authSession(): Prisma.AuthSessionDelegate<ExtArgs>;

  /**
   * `prisma.recoveryToken`: Exposes CRUD operations for the **RecoveryToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecoveryTokens
    * const recoveryTokens = await prisma.recoveryToken.findMany()
    * ```
    */
  get recoveryToken(): Prisma.RecoveryTokenDelegate<ExtArgs>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs>;

  /**
   * `prisma.federationConfig`: Exposes CRUD operations for the **FederationConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FederationConfigs
    * const federationConfigs = await prisma.federationConfig.findMany()
    * ```
    */
  get federationConfig(): Prisma.FederationConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "authDatabaseMetadata" | "globalSettings" | "tokenRevocation" | "appBinding" | "playAppInventory" | "globalUser" | "bindingPermission" | "appProfile" | "appProfilePermission" | "appAccess" | "role" | "rolePermission" | "userRole" | "authSession" | "recoveryToken" | "adminUser" | "federationConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AuthDatabaseMetadata: {
        payload: Prisma.$AuthDatabaseMetadataPayload<ExtArgs>
        fields: Prisma.AuthDatabaseMetadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthDatabaseMetadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthDatabaseMetadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          findFirst: {
            args: Prisma.AuthDatabaseMetadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthDatabaseMetadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          findMany: {
            args: Prisma.AuthDatabaseMetadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>[]
          }
          create: {
            args: Prisma.AuthDatabaseMetadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          createMany: {
            args: Prisma.AuthDatabaseMetadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthDatabaseMetadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>[]
          }
          delete: {
            args: Prisma.AuthDatabaseMetadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          update: {
            args: Prisma.AuthDatabaseMetadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          deleteMany: {
            args: Prisma.AuthDatabaseMetadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthDatabaseMetadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthDatabaseMetadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthDatabaseMetadataPayload>
          }
          aggregate: {
            args: Prisma.AuthDatabaseMetadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthDatabaseMetadata>
          }
          groupBy: {
            args: Prisma.AuthDatabaseMetadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthDatabaseMetadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthDatabaseMetadataCountArgs<ExtArgs>
            result: $Utils.Optional<AuthDatabaseMetadataCountAggregateOutputType> | number
          }
        }
      }
      GlobalSettings: {
        payload: Prisma.$GlobalSettingsPayload<ExtArgs>
        fields: Prisma.GlobalSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findFirst: {
            args: Prisma.GlobalSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findMany: {
            args: Prisma.GlobalSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          create: {
            args: Prisma.GlobalSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          createMany: {
            args: Prisma.GlobalSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          delete: {
            args: Prisma.GlobalSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          update: {
            args: Prisma.GlobalSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GlobalSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          aggregate: {
            args: Prisma.GlobalSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalSettings>
          }
          groupBy: {
            args: Prisma.GlobalSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsCountAggregateOutputType> | number
          }
        }
      }
      TokenRevocation: {
        payload: Prisma.$TokenRevocationPayload<ExtArgs>
        fields: Prisma.TokenRevocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenRevocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenRevocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          findFirst: {
            args: Prisma.TokenRevocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenRevocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          findMany: {
            args: Prisma.TokenRevocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>[]
          }
          create: {
            args: Prisma.TokenRevocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          createMany: {
            args: Prisma.TokenRevocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenRevocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>[]
          }
          delete: {
            args: Prisma.TokenRevocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          update: {
            args: Prisma.TokenRevocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          deleteMany: {
            args: Prisma.TokenRevocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenRevocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenRevocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenRevocationPayload>
          }
          aggregate: {
            args: Prisma.TokenRevocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenRevocation>
          }
          groupBy: {
            args: Prisma.TokenRevocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenRevocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenRevocationCountArgs<ExtArgs>
            result: $Utils.Optional<TokenRevocationCountAggregateOutputType> | number
          }
        }
      }
      AppBinding: {
        payload: Prisma.$AppBindingPayload<ExtArgs>
        fields: Prisma.AppBindingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppBindingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppBindingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          findFirst: {
            args: Prisma.AppBindingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppBindingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          findMany: {
            args: Prisma.AppBindingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>[]
          }
          create: {
            args: Prisma.AppBindingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          createMany: {
            args: Prisma.AppBindingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppBindingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>[]
          }
          delete: {
            args: Prisma.AppBindingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          update: {
            args: Prisma.AppBindingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          deleteMany: {
            args: Prisma.AppBindingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppBindingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppBindingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppBindingPayload>
          }
          aggregate: {
            args: Prisma.AppBindingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppBinding>
          }
          groupBy: {
            args: Prisma.AppBindingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppBindingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppBindingCountArgs<ExtArgs>
            result: $Utils.Optional<AppBindingCountAggregateOutputType> | number
          }
        }
      }
      PlayAppInventory: {
        payload: Prisma.$PlayAppInventoryPayload<ExtArgs>
        fields: Prisma.PlayAppInventoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayAppInventoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayAppInventoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          findFirst: {
            args: Prisma.PlayAppInventoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayAppInventoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          findMany: {
            args: Prisma.PlayAppInventoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>[]
          }
          create: {
            args: Prisma.PlayAppInventoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          createMany: {
            args: Prisma.PlayAppInventoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayAppInventoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>[]
          }
          delete: {
            args: Prisma.PlayAppInventoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          update: {
            args: Prisma.PlayAppInventoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          deleteMany: {
            args: Prisma.PlayAppInventoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayAppInventoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayAppInventoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayAppInventoryPayload>
          }
          aggregate: {
            args: Prisma.PlayAppInventoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayAppInventory>
          }
          groupBy: {
            args: Prisma.PlayAppInventoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayAppInventoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayAppInventoryCountArgs<ExtArgs>
            result: $Utils.Optional<PlayAppInventoryCountAggregateOutputType> | number
          }
        }
      }
      GlobalUser: {
        payload: Prisma.$GlobalUserPayload<ExtArgs>
        fields: Prisma.GlobalUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          findFirst: {
            args: Prisma.GlobalUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          findMany: {
            args: Prisma.GlobalUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>[]
          }
          create: {
            args: Prisma.GlobalUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          createMany: {
            args: Prisma.GlobalUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>[]
          }
          delete: {
            args: Prisma.GlobalUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          update: {
            args: Prisma.GlobalUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          deleteMany: {
            args: Prisma.GlobalUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalUserPayload>
          }
          aggregate: {
            args: Prisma.GlobalUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalUser>
          }
          groupBy: {
            args: Prisma.GlobalUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalUserCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalUserCountAggregateOutputType> | number
          }
        }
      }
      BindingPermission: {
        payload: Prisma.$BindingPermissionPayload<ExtArgs>
        fields: Prisma.BindingPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BindingPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BindingPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          findFirst: {
            args: Prisma.BindingPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BindingPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          findMany: {
            args: Prisma.BindingPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>[]
          }
          create: {
            args: Prisma.BindingPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          createMany: {
            args: Prisma.BindingPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BindingPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>[]
          }
          delete: {
            args: Prisma.BindingPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          update: {
            args: Prisma.BindingPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          deleteMany: {
            args: Prisma.BindingPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BindingPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BindingPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BindingPermissionPayload>
          }
          aggregate: {
            args: Prisma.BindingPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBindingPermission>
          }
          groupBy: {
            args: Prisma.BindingPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BindingPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BindingPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<BindingPermissionCountAggregateOutputType> | number
          }
        }
      }
      AppProfile: {
        payload: Prisma.$AppProfilePayload<ExtArgs>
        fields: Prisma.AppProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          findFirst: {
            args: Prisma.AppProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          findMany: {
            args: Prisma.AppProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>[]
          }
          create: {
            args: Prisma.AppProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          createMany: {
            args: Prisma.AppProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>[]
          }
          delete: {
            args: Prisma.AppProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          update: {
            args: Prisma.AppProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          deleteMany: {
            args: Prisma.AppProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePayload>
          }
          aggregate: {
            args: Prisma.AppProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppProfile>
          }
          groupBy: {
            args: Prisma.AppProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AppProfileCountAggregateOutputType> | number
          }
        }
      }
      AppProfilePermission: {
        payload: Prisma.$AppProfilePermissionPayload<ExtArgs>
        fields: Prisma.AppProfilePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppProfilePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppProfilePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          findFirst: {
            args: Prisma.AppProfilePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppProfilePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          findMany: {
            args: Prisma.AppProfilePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>[]
          }
          create: {
            args: Prisma.AppProfilePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          createMany: {
            args: Prisma.AppProfilePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppProfilePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>[]
          }
          delete: {
            args: Prisma.AppProfilePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          update: {
            args: Prisma.AppProfilePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          deleteMany: {
            args: Prisma.AppProfilePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppProfilePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppProfilePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppProfilePermissionPayload>
          }
          aggregate: {
            args: Prisma.AppProfilePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppProfilePermission>
          }
          groupBy: {
            args: Prisma.AppProfilePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppProfilePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppProfilePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<AppProfilePermissionCountAggregateOutputType> | number
          }
        }
      }
      AppAccess: {
        payload: Prisma.$AppAccessPayload<ExtArgs>
        fields: Prisma.AppAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          findFirst: {
            args: Prisma.AppAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          findMany: {
            args: Prisma.AppAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>[]
          }
          create: {
            args: Prisma.AppAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          createMany: {
            args: Prisma.AppAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>[]
          }
          delete: {
            args: Prisma.AppAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          update: {
            args: Prisma.AppAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          deleteMany: {
            args: Prisma.AppAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppAccessPayload>
          }
          aggregate: {
            args: Prisma.AppAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppAccess>
          }
          groupBy: {
            args: Prisma.AppAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppAccessCountArgs<ExtArgs>
            result: $Utils.Optional<AppAccessCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
      AuthSession: {
        payload: Prisma.$AuthSessionPayload<ExtArgs>
        fields: Prisma.AuthSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          findFirst: {
            args: Prisma.AuthSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          findMany: {
            args: Prisma.AuthSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>[]
          }
          create: {
            args: Prisma.AuthSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          createMany: {
            args: Prisma.AuthSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>[]
          }
          delete: {
            args: Prisma.AuthSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          update: {
            args: Prisma.AuthSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          deleteMany: {
            args: Prisma.AuthSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthSessionPayload>
          }
          aggregate: {
            args: Prisma.AuthSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthSession>
          }
          groupBy: {
            args: Prisma.AuthSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AuthSessionCountAggregateOutputType> | number
          }
        }
      }
      RecoveryToken: {
        payload: Prisma.$RecoveryTokenPayload<ExtArgs>
        fields: Prisma.RecoveryTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecoveryTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecoveryTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          findFirst: {
            args: Prisma.RecoveryTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecoveryTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          findMany: {
            args: Prisma.RecoveryTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>[]
          }
          create: {
            args: Prisma.RecoveryTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          createMany: {
            args: Prisma.RecoveryTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecoveryTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>[]
          }
          delete: {
            args: Prisma.RecoveryTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          update: {
            args: Prisma.RecoveryTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          deleteMany: {
            args: Prisma.RecoveryTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecoveryTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecoveryTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoveryTokenPayload>
          }
          aggregate: {
            args: Prisma.RecoveryTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecoveryToken>
          }
          groupBy: {
            args: Prisma.RecoveryTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecoveryTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecoveryTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RecoveryTokenCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      FederationConfig: {
        payload: Prisma.$FederationConfigPayload<ExtArgs>
        fields: Prisma.FederationConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FederationConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FederationConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          findFirst: {
            args: Prisma.FederationConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FederationConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          findMany: {
            args: Prisma.FederationConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>[]
          }
          create: {
            args: Prisma.FederationConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          createMany: {
            args: Prisma.FederationConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FederationConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>[]
          }
          delete: {
            args: Prisma.FederationConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          update: {
            args: Prisma.FederationConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          deleteMany: {
            args: Prisma.FederationConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FederationConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FederationConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FederationConfigPayload>
          }
          aggregate: {
            args: Prisma.FederationConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFederationConfig>
          }
          groupBy: {
            args: Prisma.FederationConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<FederationConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.FederationConfigCountArgs<ExtArgs>
            result: $Utils.Optional<FederationConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AppBindingCountOutputType
   */

  export type AppBindingCountOutputType = {
    permissions: number
    profiles: number
    accesses: number
  }

  export type AppBindingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | AppBindingCountOutputTypeCountPermissionsArgs
    profiles?: boolean | AppBindingCountOutputTypeCountProfilesArgs
    accesses?: boolean | AppBindingCountOutputTypeCountAccessesArgs
  }

  // Custom InputTypes
  /**
   * AppBindingCountOutputType without action
   */
  export type AppBindingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBindingCountOutputType
     */
    select?: AppBindingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppBindingCountOutputType without action
   */
  export type AppBindingCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BindingPermissionWhereInput
  }

  /**
   * AppBindingCountOutputType without action
   */
  export type AppBindingCountOutputTypeCountProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppProfileWhereInput
  }

  /**
   * AppBindingCountOutputType without action
   */
  export type AppBindingCountOutputTypeCountAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppAccessWhereInput
  }


  /**
   * Count Type GlobalUserCountOutputType
   */

  export type GlobalUserCountOutputType = {
    sessions: number
    user_roles: number
    app_accesses: number
  }

  export type GlobalUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | GlobalUserCountOutputTypeCountSessionsArgs
    user_roles?: boolean | GlobalUserCountOutputTypeCountUser_rolesArgs
    app_accesses?: boolean | GlobalUserCountOutputTypeCountApp_accessesArgs
  }

  // Custom InputTypes
  /**
   * GlobalUserCountOutputType without action
   */
  export type GlobalUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUserCountOutputType
     */
    select?: GlobalUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GlobalUserCountOutputType without action
   */
  export type GlobalUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthSessionWhereInput
  }

  /**
   * GlobalUserCountOutputType without action
   */
  export type GlobalUserCountOutputTypeCountUser_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }

  /**
   * GlobalUserCountOutputType without action
   */
  export type GlobalUserCountOutputTypeCountApp_accessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppAccessWhereInput
  }


  /**
   * Count Type BindingPermissionCountOutputType
   */

  export type BindingPermissionCountOutputType = {
    role_perms: number
    profile_perms: number
  }

  export type BindingPermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role_perms?: boolean | BindingPermissionCountOutputTypeCountRole_permsArgs
    profile_perms?: boolean | BindingPermissionCountOutputTypeCountProfile_permsArgs
  }

  // Custom InputTypes
  /**
   * BindingPermissionCountOutputType without action
   */
  export type BindingPermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermissionCountOutputType
     */
    select?: BindingPermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BindingPermissionCountOutputType without action
   */
  export type BindingPermissionCountOutputTypeCountRole_permsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }

  /**
   * BindingPermissionCountOutputType without action
   */
  export type BindingPermissionCountOutputTypeCountProfile_permsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppProfilePermissionWhereInput
  }


  /**
   * Count Type AppProfileCountOutputType
   */

  export type AppProfileCountOutputType = {
    permissions: number
    accesses: number
  }

  export type AppProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | AppProfileCountOutputTypeCountPermissionsArgs
    accesses?: boolean | AppProfileCountOutputTypeCountAccessesArgs
  }

  // Custom InputTypes
  /**
   * AppProfileCountOutputType without action
   */
  export type AppProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfileCountOutputType
     */
    select?: AppProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppProfileCountOutputType without action
   */
  export type AppProfileCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppProfilePermissionWhereInput
  }

  /**
   * AppProfileCountOutputType without action
   */
  export type AppProfileCountOutputTypeCountAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppAccessWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    permissions: number
    user_roles: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
    user_roles?: boolean | RoleCountOutputTypeCountUser_rolesArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUser_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AuthDatabaseMetadata
   */

  export type AggregateAuthDatabaseMetadata = {
    _count: AuthDatabaseMetadataCountAggregateOutputType | null
    _avg: AuthDatabaseMetadataAvgAggregateOutputType | null
    _sum: AuthDatabaseMetadataSumAggregateOutputType | null
    _min: AuthDatabaseMetadataMinAggregateOutputType | null
    _max: AuthDatabaseMetadataMaxAggregateOutputType | null
  }

  export type AuthDatabaseMetadataAvgAggregateOutputType = {
    schema_version: number | null
    data_revision: number | null
    source_revision: number | null
  }

  export type AuthDatabaseMetadataSumAggregateOutputType = {
    schema_version: number | null
    data_revision: number | null
    source_revision: number | null
  }

  export type AuthDatabaseMetadataMinAggregateOutputType = {
    id: string | null
    schema_version: number | null
    provider: string | null
    installation_id: string | null
    owner_id: string | null
    migration_state: string | null
    data_revision: number | null
    source_revision: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AuthDatabaseMetadataMaxAggregateOutputType = {
    id: string | null
    schema_version: number | null
    provider: string | null
    installation_id: string | null
    owner_id: string | null
    migration_state: string | null
    data_revision: number | null
    source_revision: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AuthDatabaseMetadataCountAggregateOutputType = {
    id: number
    schema_version: number
    provider: number
    installation_id: number
    owner_id: number
    migration_state: number
    data_revision: number
    source_revision: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AuthDatabaseMetadataAvgAggregateInputType = {
    schema_version?: true
    data_revision?: true
    source_revision?: true
  }

  export type AuthDatabaseMetadataSumAggregateInputType = {
    schema_version?: true
    data_revision?: true
    source_revision?: true
  }

  export type AuthDatabaseMetadataMinAggregateInputType = {
    id?: true
    schema_version?: true
    provider?: true
    installation_id?: true
    owner_id?: true
    migration_state?: true
    data_revision?: true
    source_revision?: true
    created_at?: true
    updated_at?: true
  }

  export type AuthDatabaseMetadataMaxAggregateInputType = {
    id?: true
    schema_version?: true
    provider?: true
    installation_id?: true
    owner_id?: true
    migration_state?: true
    data_revision?: true
    source_revision?: true
    created_at?: true
    updated_at?: true
  }

  export type AuthDatabaseMetadataCountAggregateInputType = {
    id?: true
    schema_version?: true
    provider?: true
    installation_id?: true
    owner_id?: true
    migration_state?: true
    data_revision?: true
    source_revision?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AuthDatabaseMetadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthDatabaseMetadata to aggregate.
     */
    where?: AuthDatabaseMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDatabaseMetadata to fetch.
     */
    orderBy?: AuthDatabaseMetadataOrderByWithRelationInput | AuthDatabaseMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthDatabaseMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDatabaseMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDatabaseMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthDatabaseMetadata
    **/
    _count?: true | AuthDatabaseMetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthDatabaseMetadataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthDatabaseMetadataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthDatabaseMetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthDatabaseMetadataMaxAggregateInputType
  }

  export type GetAuthDatabaseMetadataAggregateType<T extends AuthDatabaseMetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthDatabaseMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthDatabaseMetadata[P]>
      : GetScalarType<T[P], AggregateAuthDatabaseMetadata[P]>
  }




  export type AuthDatabaseMetadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthDatabaseMetadataWhereInput
    orderBy?: AuthDatabaseMetadataOrderByWithAggregationInput | AuthDatabaseMetadataOrderByWithAggregationInput[]
    by: AuthDatabaseMetadataScalarFieldEnum[] | AuthDatabaseMetadataScalarFieldEnum
    having?: AuthDatabaseMetadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthDatabaseMetadataCountAggregateInputType | true
    _avg?: AuthDatabaseMetadataAvgAggregateInputType
    _sum?: AuthDatabaseMetadataSumAggregateInputType
    _min?: AuthDatabaseMetadataMinAggregateInputType
    _max?: AuthDatabaseMetadataMaxAggregateInputType
  }

  export type AuthDatabaseMetadataGroupByOutputType = {
    id: string
    schema_version: number
    provider: string
    installation_id: string | null
    owner_id: string | null
    migration_state: string
    data_revision: number
    source_revision: number | null
    created_at: Date
    updated_at: Date
    _count: AuthDatabaseMetadataCountAggregateOutputType | null
    _avg: AuthDatabaseMetadataAvgAggregateOutputType | null
    _sum: AuthDatabaseMetadataSumAggregateOutputType | null
    _min: AuthDatabaseMetadataMinAggregateOutputType | null
    _max: AuthDatabaseMetadataMaxAggregateOutputType | null
  }

  type GetAuthDatabaseMetadataGroupByPayload<T extends AuthDatabaseMetadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthDatabaseMetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthDatabaseMetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthDatabaseMetadataGroupByOutputType[P]>
            : GetScalarType<T[P], AuthDatabaseMetadataGroupByOutputType[P]>
        }
      >
    >


  export type AuthDatabaseMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schema_version?: boolean
    provider?: boolean
    installation_id?: boolean
    owner_id?: boolean
    migration_state?: boolean
    data_revision?: boolean
    source_revision?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["authDatabaseMetadata"]>

  export type AuthDatabaseMetadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schema_version?: boolean
    provider?: boolean
    installation_id?: boolean
    owner_id?: boolean
    migration_state?: boolean
    data_revision?: boolean
    source_revision?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["authDatabaseMetadata"]>

  export type AuthDatabaseMetadataSelectScalar = {
    id?: boolean
    schema_version?: boolean
    provider?: boolean
    installation_id?: boolean
    owner_id?: boolean
    migration_state?: boolean
    data_revision?: boolean
    source_revision?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $AuthDatabaseMetadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthDatabaseMetadata"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schema_version: number
      provider: string
      installation_id: string | null
      owner_id: string | null
      migration_state: string
      data_revision: number
      source_revision: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["authDatabaseMetadata"]>
    composites: {}
  }

  type AuthDatabaseMetadataGetPayload<S extends boolean | null | undefined | AuthDatabaseMetadataDefaultArgs> = $Result.GetResult<Prisma.$AuthDatabaseMetadataPayload, S>

  type AuthDatabaseMetadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuthDatabaseMetadataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuthDatabaseMetadataCountAggregateInputType | true
    }

  export interface AuthDatabaseMetadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthDatabaseMetadata'], meta: { name: 'AuthDatabaseMetadata' } }
    /**
     * Find zero or one AuthDatabaseMetadata that matches the filter.
     * @param {AuthDatabaseMetadataFindUniqueArgs} args - Arguments to find a AuthDatabaseMetadata
     * @example
     * // Get one AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthDatabaseMetadataFindUniqueArgs>(args: SelectSubset<T, AuthDatabaseMetadataFindUniqueArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuthDatabaseMetadata that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuthDatabaseMetadataFindUniqueOrThrowArgs} args - Arguments to find a AuthDatabaseMetadata
     * @example
     * // Get one AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthDatabaseMetadataFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthDatabaseMetadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuthDatabaseMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataFindFirstArgs} args - Arguments to find a AuthDatabaseMetadata
     * @example
     * // Get one AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthDatabaseMetadataFindFirstArgs>(args?: SelectSubset<T, AuthDatabaseMetadataFindFirstArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuthDatabaseMetadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataFindFirstOrThrowArgs} args - Arguments to find a AuthDatabaseMetadata
     * @example
     * // Get one AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthDatabaseMetadataFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthDatabaseMetadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuthDatabaseMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findMany()
     * 
     * // Get first 10 AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authDatabaseMetadataWithIdOnly = await prisma.authDatabaseMetadata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthDatabaseMetadataFindManyArgs>(args?: SelectSubset<T, AuthDatabaseMetadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataCreateArgs} args - Arguments to create a AuthDatabaseMetadata.
     * @example
     * // Create one AuthDatabaseMetadata
     * const AuthDatabaseMetadata = await prisma.authDatabaseMetadata.create({
     *   data: {
     *     // ... data to create a AuthDatabaseMetadata
     *   }
     * })
     * 
     */
    create<T extends AuthDatabaseMetadataCreateArgs>(args: SelectSubset<T, AuthDatabaseMetadataCreateArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataCreateManyArgs} args - Arguments to create many AuthDatabaseMetadata.
     * @example
     * // Create many AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthDatabaseMetadataCreateManyArgs>(args?: SelectSubset<T, AuthDatabaseMetadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthDatabaseMetadata and returns the data saved in the database.
     * @param {AuthDatabaseMetadataCreateManyAndReturnArgs} args - Arguments to create many AuthDatabaseMetadata.
     * @example
     * // Create many AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthDatabaseMetadata and only return the `id`
     * const authDatabaseMetadataWithIdOnly = await prisma.authDatabaseMetadata.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthDatabaseMetadataCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthDatabaseMetadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataDeleteArgs} args - Arguments to delete one AuthDatabaseMetadata.
     * @example
     * // Delete one AuthDatabaseMetadata
     * const AuthDatabaseMetadata = await prisma.authDatabaseMetadata.delete({
     *   where: {
     *     // ... filter to delete one AuthDatabaseMetadata
     *   }
     * })
     * 
     */
    delete<T extends AuthDatabaseMetadataDeleteArgs>(args: SelectSubset<T, AuthDatabaseMetadataDeleteArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataUpdateArgs} args - Arguments to update one AuthDatabaseMetadata.
     * @example
     * // Update one AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthDatabaseMetadataUpdateArgs>(args: SelectSubset<T, AuthDatabaseMetadataUpdateArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataDeleteManyArgs} args - Arguments to filter AuthDatabaseMetadata to delete.
     * @example
     * // Delete a few AuthDatabaseMetadata
     * const { count } = await prisma.authDatabaseMetadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthDatabaseMetadataDeleteManyArgs>(args?: SelectSubset<T, AuthDatabaseMetadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthDatabaseMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthDatabaseMetadataUpdateManyArgs>(args: SelectSubset<T, AuthDatabaseMetadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthDatabaseMetadata.
     * @param {AuthDatabaseMetadataUpsertArgs} args - Arguments to update or create a AuthDatabaseMetadata.
     * @example
     * // Update or create a AuthDatabaseMetadata
     * const authDatabaseMetadata = await prisma.authDatabaseMetadata.upsert({
     *   create: {
     *     // ... data to create a AuthDatabaseMetadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthDatabaseMetadata we want to update
     *   }
     * })
     */
    upsert<T extends AuthDatabaseMetadataUpsertArgs>(args: SelectSubset<T, AuthDatabaseMetadataUpsertArgs<ExtArgs>>): Prisma__AuthDatabaseMetadataClient<$Result.GetResult<Prisma.$AuthDatabaseMetadataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuthDatabaseMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataCountArgs} args - Arguments to filter AuthDatabaseMetadata to count.
     * @example
     * // Count the number of AuthDatabaseMetadata
     * const count = await prisma.authDatabaseMetadata.count({
     *   where: {
     *     // ... the filter for the AuthDatabaseMetadata we want to count
     *   }
     * })
    **/
    count<T extends AuthDatabaseMetadataCountArgs>(
      args?: Subset<T, AuthDatabaseMetadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthDatabaseMetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthDatabaseMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthDatabaseMetadataAggregateArgs>(args: Subset<T, AuthDatabaseMetadataAggregateArgs>): Prisma.PrismaPromise<GetAuthDatabaseMetadataAggregateType<T>>

    /**
     * Group by AuthDatabaseMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDatabaseMetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthDatabaseMetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthDatabaseMetadataGroupByArgs['orderBy'] }
        : { orderBy?: AuthDatabaseMetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthDatabaseMetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthDatabaseMetadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthDatabaseMetadata model
   */
  readonly fields: AuthDatabaseMetadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthDatabaseMetadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthDatabaseMetadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthDatabaseMetadata model
   */ 
  interface AuthDatabaseMetadataFieldRefs {
    readonly id: FieldRef<"AuthDatabaseMetadata", 'String'>
    readonly schema_version: FieldRef<"AuthDatabaseMetadata", 'Int'>
    readonly provider: FieldRef<"AuthDatabaseMetadata", 'String'>
    readonly installation_id: FieldRef<"AuthDatabaseMetadata", 'String'>
    readonly owner_id: FieldRef<"AuthDatabaseMetadata", 'String'>
    readonly migration_state: FieldRef<"AuthDatabaseMetadata", 'String'>
    readonly data_revision: FieldRef<"AuthDatabaseMetadata", 'Int'>
    readonly source_revision: FieldRef<"AuthDatabaseMetadata", 'Int'>
    readonly created_at: FieldRef<"AuthDatabaseMetadata", 'DateTime'>
    readonly updated_at: FieldRef<"AuthDatabaseMetadata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthDatabaseMetadata findUnique
   */
  export type AuthDatabaseMetadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter, which AuthDatabaseMetadata to fetch.
     */
    where: AuthDatabaseMetadataWhereUniqueInput
  }

  /**
   * AuthDatabaseMetadata findUniqueOrThrow
   */
  export type AuthDatabaseMetadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter, which AuthDatabaseMetadata to fetch.
     */
    where: AuthDatabaseMetadataWhereUniqueInput
  }

  /**
   * AuthDatabaseMetadata findFirst
   */
  export type AuthDatabaseMetadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter, which AuthDatabaseMetadata to fetch.
     */
    where?: AuthDatabaseMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDatabaseMetadata to fetch.
     */
    orderBy?: AuthDatabaseMetadataOrderByWithRelationInput | AuthDatabaseMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthDatabaseMetadata.
     */
    cursor?: AuthDatabaseMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDatabaseMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDatabaseMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthDatabaseMetadata.
     */
    distinct?: AuthDatabaseMetadataScalarFieldEnum | AuthDatabaseMetadataScalarFieldEnum[]
  }

  /**
   * AuthDatabaseMetadata findFirstOrThrow
   */
  export type AuthDatabaseMetadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter, which AuthDatabaseMetadata to fetch.
     */
    where?: AuthDatabaseMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDatabaseMetadata to fetch.
     */
    orderBy?: AuthDatabaseMetadataOrderByWithRelationInput | AuthDatabaseMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthDatabaseMetadata.
     */
    cursor?: AuthDatabaseMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDatabaseMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDatabaseMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthDatabaseMetadata.
     */
    distinct?: AuthDatabaseMetadataScalarFieldEnum | AuthDatabaseMetadataScalarFieldEnum[]
  }

  /**
   * AuthDatabaseMetadata findMany
   */
  export type AuthDatabaseMetadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter, which AuthDatabaseMetadata to fetch.
     */
    where?: AuthDatabaseMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDatabaseMetadata to fetch.
     */
    orderBy?: AuthDatabaseMetadataOrderByWithRelationInput | AuthDatabaseMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthDatabaseMetadata.
     */
    cursor?: AuthDatabaseMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDatabaseMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDatabaseMetadata.
     */
    skip?: number
    distinct?: AuthDatabaseMetadataScalarFieldEnum | AuthDatabaseMetadataScalarFieldEnum[]
  }

  /**
   * AuthDatabaseMetadata create
   */
  export type AuthDatabaseMetadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * The data needed to create a AuthDatabaseMetadata.
     */
    data: XOR<AuthDatabaseMetadataCreateInput, AuthDatabaseMetadataUncheckedCreateInput>
  }

  /**
   * AuthDatabaseMetadata createMany
   */
  export type AuthDatabaseMetadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthDatabaseMetadata.
     */
    data: AuthDatabaseMetadataCreateManyInput | AuthDatabaseMetadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthDatabaseMetadata createManyAndReturn
   */
  export type AuthDatabaseMetadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuthDatabaseMetadata.
     */
    data: AuthDatabaseMetadataCreateManyInput | AuthDatabaseMetadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthDatabaseMetadata update
   */
  export type AuthDatabaseMetadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * The data needed to update a AuthDatabaseMetadata.
     */
    data: XOR<AuthDatabaseMetadataUpdateInput, AuthDatabaseMetadataUncheckedUpdateInput>
    /**
     * Choose, which AuthDatabaseMetadata to update.
     */
    where: AuthDatabaseMetadataWhereUniqueInput
  }

  /**
   * AuthDatabaseMetadata updateMany
   */
  export type AuthDatabaseMetadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthDatabaseMetadata.
     */
    data: XOR<AuthDatabaseMetadataUpdateManyMutationInput, AuthDatabaseMetadataUncheckedUpdateManyInput>
    /**
     * Filter which AuthDatabaseMetadata to update
     */
    where?: AuthDatabaseMetadataWhereInput
  }

  /**
   * AuthDatabaseMetadata upsert
   */
  export type AuthDatabaseMetadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * The filter to search for the AuthDatabaseMetadata to update in case it exists.
     */
    where: AuthDatabaseMetadataWhereUniqueInput
    /**
     * In case the AuthDatabaseMetadata found by the `where` argument doesn't exist, create a new AuthDatabaseMetadata with this data.
     */
    create: XOR<AuthDatabaseMetadataCreateInput, AuthDatabaseMetadataUncheckedCreateInput>
    /**
     * In case the AuthDatabaseMetadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthDatabaseMetadataUpdateInput, AuthDatabaseMetadataUncheckedUpdateInput>
  }

  /**
   * AuthDatabaseMetadata delete
   */
  export type AuthDatabaseMetadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
    /**
     * Filter which AuthDatabaseMetadata to delete.
     */
    where: AuthDatabaseMetadataWhereUniqueInput
  }

  /**
   * AuthDatabaseMetadata deleteMany
   */
  export type AuthDatabaseMetadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthDatabaseMetadata to delete
     */
    where?: AuthDatabaseMetadataWhereInput
  }

  /**
   * AuthDatabaseMetadata without action
   */
  export type AuthDatabaseMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthDatabaseMetadata
     */
    select?: AuthDatabaseMetadataSelect<ExtArgs> | null
  }


  /**
   * Model GlobalSettings
   */

  export type AggregateGlobalSettings = {
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  export type GlobalSettingsAvgAggregateOutputType = {
    smtp_port: number | null
  }

  export type GlobalSettingsSumAggregateOutputType = {
    smtp_port: number | null
  }

  export type GlobalSettingsMinAggregateOutputType = {
    id: string | null
    google_client_id: string | null
    google_client_secret: string | null
    github_client_id: string | null
    github_client_secret: string | null
    smtp_host: string | null
    smtp_port: number | null
    smtp_user: string | null
    smtp_pass: string | null
    smtp_from_email: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GlobalSettingsMaxAggregateOutputType = {
    id: string | null
    google_client_id: string | null
    google_client_secret: string | null
    github_client_id: string | null
    github_client_secret: string | null
    smtp_host: string | null
    smtp_port: number | null
    smtp_user: string | null
    smtp_pass: string | null
    smtp_from_email: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GlobalSettingsCountAggregateOutputType = {
    id: number
    google_client_id: number
    google_client_secret: number
    github_client_id: number
    github_client_secret: number
    smtp_host: number
    smtp_port: number
    smtp_user: number
    smtp_pass: number
    smtp_from_email: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GlobalSettingsAvgAggregateInputType = {
    smtp_port?: true
  }

  export type GlobalSettingsSumAggregateInputType = {
    smtp_port?: true
  }

  export type GlobalSettingsMinAggregateInputType = {
    id?: true
    google_client_id?: true
    google_client_secret?: true
    github_client_id?: true
    github_client_secret?: true
    smtp_host?: true
    smtp_port?: true
    smtp_user?: true
    smtp_pass?: true
    smtp_from_email?: true
    created_at?: true
    updated_at?: true
  }

  export type GlobalSettingsMaxAggregateInputType = {
    id?: true
    google_client_id?: true
    google_client_secret?: true
    github_client_id?: true
    github_client_secret?: true
    smtp_host?: true
    smtp_port?: true
    smtp_user?: true
    smtp_pass?: true
    smtp_from_email?: true
    created_at?: true
    updated_at?: true
  }

  export type GlobalSettingsCountAggregateInputType = {
    id?: true
    google_client_id?: true
    google_client_secret?: true
    github_client_id?: true
    github_client_secret?: true
    smtp_host?: true
    smtp_port?: true
    smtp_user?: true
    smtp_pass?: true
    smtp_from_email?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GlobalSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to aggregate.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalSettings
    **/
    _count?: true | GlobalSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GlobalSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GlobalSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GetGlobalSettingsAggregateType<T extends GlobalSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalSettings[P]>
      : GetScalarType<T[P], AggregateGlobalSettings[P]>
  }




  export type GlobalSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalSettingsWhereInput
    orderBy?: GlobalSettingsOrderByWithAggregationInput | GlobalSettingsOrderByWithAggregationInput[]
    by: GlobalSettingsScalarFieldEnum[] | GlobalSettingsScalarFieldEnum
    having?: GlobalSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalSettingsCountAggregateInputType | true
    _avg?: GlobalSettingsAvgAggregateInputType
    _sum?: GlobalSettingsSumAggregateInputType
    _min?: GlobalSettingsMinAggregateInputType
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GlobalSettingsGroupByOutputType = {
    id: string
    google_client_id: string | null
    google_client_secret: string | null
    github_client_id: string | null
    github_client_secret: string | null
    smtp_host: string | null
    smtp_port: number | null
    smtp_user: string | null
    smtp_pass: string | null
    smtp_from_email: string | null
    created_at: Date
    updated_at: Date
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  type GetGlobalSettingsGroupByPayload<T extends GlobalSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GlobalSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    google_client_id?: boolean
    google_client_secret?: boolean
    github_client_id?: boolean
    github_client_secret?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_user?: boolean
    smtp_pass?: boolean
    smtp_from_email?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    google_client_id?: boolean
    google_client_secret?: boolean
    github_client_id?: boolean
    github_client_secret?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_user?: boolean
    smtp_pass?: boolean
    smtp_from_email?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectScalar = {
    id?: boolean
    google_client_id?: boolean
    google_client_secret?: boolean
    github_client_id?: boolean
    github_client_secret?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_user?: boolean
    smtp_pass?: boolean
    smtp_from_email?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $GlobalSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      google_client_id: string | null
      google_client_secret: string | null
      github_client_id: string | null
      github_client_secret: string | null
      smtp_host: string | null
      smtp_port: number | null
      smtp_user: string | null
      smtp_pass: string | null
      smtp_from_email: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["globalSettings"]>
    composites: {}
  }

  type GlobalSettingsGetPayload<S extends boolean | null | undefined | GlobalSettingsDefaultArgs> = $Result.GetResult<Prisma.$GlobalSettingsPayload, S>

  type GlobalSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GlobalSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GlobalSettingsCountAggregateInputType | true
    }

  export interface GlobalSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalSettings'], meta: { name: 'GlobalSettings' } }
    /**
     * Find zero or one GlobalSettings that matches the filter.
     * @param {GlobalSettingsFindUniqueArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalSettingsFindUniqueArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GlobalSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GlobalSettingsFindUniqueOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalSettingsFindFirstArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GlobalSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany()
     * 
     * // Get first 10 GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalSettingsFindManyArgs>(args?: SelectSubset<T, GlobalSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GlobalSettings.
     * @param {GlobalSettingsCreateArgs} args - Arguments to create a GlobalSettings.
     * @example
     * // Create one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.create({
     *   data: {
     *     // ... data to create a GlobalSettings
     *   }
     * })
     * 
     */
    create<T extends GlobalSettingsCreateArgs>(args: SelectSubset<T, GlobalSettingsCreateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GlobalSettings.
     * @param {GlobalSettingsCreateManyArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalSettingsCreateManyArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalSettings and returns the data saved in the database.
     * @param {GlobalSettingsCreateManyAndReturnArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GlobalSettings.
     * @param {GlobalSettingsDeleteArgs} args - Arguments to delete one GlobalSettings.
     * @example
     * // Delete one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.delete({
     *   where: {
     *     // ... filter to delete one GlobalSettings
     *   }
     * })
     * 
     */
    delete<T extends GlobalSettingsDeleteArgs>(args: SelectSubset<T, GlobalSettingsDeleteArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GlobalSettings.
     * @param {GlobalSettingsUpdateArgs} args - Arguments to update one GlobalSettings.
     * @example
     * // Update one GlobalSettings
     * const globalSettings = await prisma.globalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalSettingsUpdateArgs>(args: SelectSubset<T, GlobalSettingsUpdateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GlobalSettings.
     * @param {GlobalSettingsDeleteManyArgs} args - Arguments to filter GlobalSettings to delete.
     * @example
     * // Delete a few GlobalSettings
     * const { count } = await prisma.globalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalSettingsDeleteManyArgs>(args?: SelectSubset<T, GlobalSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalSettingsUpdateManyArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalSettings.
     * @param {GlobalSettingsUpsertArgs} args - Arguments to update or create a GlobalSettings.
     * @example
     * // Update or create a GlobalSettings
     * const globalSettings = await prisma.globalSettings.upsert({
     *   create: {
     *     // ... data to create a GlobalSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalSettings we want to update
     *   }
     * })
     */
    upsert<T extends GlobalSettingsUpsertArgs>(args: SelectSubset<T, GlobalSettingsUpsertArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsCountArgs} args - Arguments to filter GlobalSettings to count.
     * @example
     * // Count the number of GlobalSettings
     * const count = await prisma.globalSettings.count({
     *   where: {
     *     // ... the filter for the GlobalSettings we want to count
     *   }
     * })
    **/
    count<T extends GlobalSettingsCountArgs>(
      args?: Subset<T, GlobalSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalSettingsAggregateArgs>(args: Subset<T, GlobalSettingsAggregateArgs>): Prisma.PrismaPromise<GetGlobalSettingsAggregateType<T>>

    /**
     * Group by GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GlobalSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalSettings model
   */
  readonly fields: GlobalSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalSettings model
   */ 
  interface GlobalSettingsFieldRefs {
    readonly id: FieldRef<"GlobalSettings", 'String'>
    readonly google_client_id: FieldRef<"GlobalSettings", 'String'>
    readonly google_client_secret: FieldRef<"GlobalSettings", 'String'>
    readonly github_client_id: FieldRef<"GlobalSettings", 'String'>
    readonly github_client_secret: FieldRef<"GlobalSettings", 'String'>
    readonly smtp_host: FieldRef<"GlobalSettings", 'String'>
    readonly smtp_port: FieldRef<"GlobalSettings", 'Int'>
    readonly smtp_user: FieldRef<"GlobalSettings", 'String'>
    readonly smtp_pass: FieldRef<"GlobalSettings", 'String'>
    readonly smtp_from_email: FieldRef<"GlobalSettings", 'String'>
    readonly created_at: FieldRef<"GlobalSettings", 'DateTime'>
    readonly updated_at: FieldRef<"GlobalSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalSettings findUnique
   */
  export type GlobalSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findUniqueOrThrow
   */
  export type GlobalSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findFirst
   */
  export type GlobalSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findFirstOrThrow
   */
  export type GlobalSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findMany
   */
  export type GlobalSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings create
   */
  export type GlobalSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a GlobalSettings.
     */
    data: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
  }

  /**
   * GlobalSettings createMany
   */
  export type GlobalSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings createManyAndReturn
   */
  export type GlobalSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings update
   */
  export type GlobalSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
    /**
     * Choose, which GlobalSettings to update.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings updateMany
   */
  export type GlobalSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
  }

  /**
   * GlobalSettings upsert
   */
  export type GlobalSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the GlobalSettings to update in case it exists.
     */
    where: GlobalSettingsWhereUniqueInput
    /**
     * In case the GlobalSettings found by the `where` argument doesn't exist, create a new GlobalSettings with this data.
     */
    create: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
    /**
     * In case the GlobalSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
  }

  /**
   * GlobalSettings delete
   */
  export type GlobalSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Filter which GlobalSettings to delete.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings deleteMany
   */
  export type GlobalSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to delete
     */
    where?: GlobalSettingsWhereInput
  }

  /**
   * GlobalSettings without action
   */
  export type GlobalSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
  }


  /**
   * Model TokenRevocation
   */

  export type AggregateTokenRevocation = {
    _count: TokenRevocationCountAggregateOutputType | null
    _min: TokenRevocationMinAggregateOutputType | null
    _max: TokenRevocationMaxAggregateOutputType | null
  }

  export type TokenRevocationMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    binding_id: string | null
    revoked_at: Date | null
    expires_at: Date | null
    aioson_play_id: string | null
  }

  export type TokenRevocationMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    binding_id: string | null
    revoked_at: Date | null
    expires_at: Date | null
    aioson_play_id: string | null
  }

  export type TokenRevocationCountAggregateOutputType = {
    id: number
    user_id: number
    binding_id: number
    revoked_at: number
    expires_at: number
    aioson_play_id: number
    _all: number
  }


  export type TokenRevocationMinAggregateInputType = {
    id?: true
    user_id?: true
    binding_id?: true
    revoked_at?: true
    expires_at?: true
    aioson_play_id?: true
  }

  export type TokenRevocationMaxAggregateInputType = {
    id?: true
    user_id?: true
    binding_id?: true
    revoked_at?: true
    expires_at?: true
    aioson_play_id?: true
  }

  export type TokenRevocationCountAggregateInputType = {
    id?: true
    user_id?: true
    binding_id?: true
    revoked_at?: true
    expires_at?: true
    aioson_play_id?: true
    _all?: true
  }

  export type TokenRevocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenRevocation to aggregate.
     */
    where?: TokenRevocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenRevocations to fetch.
     */
    orderBy?: TokenRevocationOrderByWithRelationInput | TokenRevocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenRevocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenRevocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenRevocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenRevocations
    **/
    _count?: true | TokenRevocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenRevocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenRevocationMaxAggregateInputType
  }

  export type GetTokenRevocationAggregateType<T extends TokenRevocationAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenRevocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenRevocation[P]>
      : GetScalarType<T[P], AggregateTokenRevocation[P]>
  }




  export type TokenRevocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenRevocationWhereInput
    orderBy?: TokenRevocationOrderByWithAggregationInput | TokenRevocationOrderByWithAggregationInput[]
    by: TokenRevocationScalarFieldEnum[] | TokenRevocationScalarFieldEnum
    having?: TokenRevocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenRevocationCountAggregateInputType | true
    _min?: TokenRevocationMinAggregateInputType
    _max?: TokenRevocationMaxAggregateInputType
  }

  export type TokenRevocationGroupByOutputType = {
    id: string
    user_id: string
    binding_id: string
    revoked_at: Date
    expires_at: Date
    aioson_play_id: string | null
    _count: TokenRevocationCountAggregateOutputType | null
    _min: TokenRevocationMinAggregateOutputType | null
    _max: TokenRevocationMaxAggregateOutputType | null
  }

  type GetTokenRevocationGroupByPayload<T extends TokenRevocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenRevocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenRevocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenRevocationGroupByOutputType[P]>
            : GetScalarType<T[P], TokenRevocationGroupByOutputType[P]>
        }
      >
    >


  export type TokenRevocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    binding_id?: boolean
    revoked_at?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
  }, ExtArgs["result"]["tokenRevocation"]>

  export type TokenRevocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    binding_id?: boolean
    revoked_at?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
  }, ExtArgs["result"]["tokenRevocation"]>

  export type TokenRevocationSelectScalar = {
    id?: boolean
    user_id?: boolean
    binding_id?: boolean
    revoked_at?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
  }


  export type $TokenRevocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenRevocation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      binding_id: string
      revoked_at: Date
      expires_at: Date
      aioson_play_id: string | null
    }, ExtArgs["result"]["tokenRevocation"]>
    composites: {}
  }

  type TokenRevocationGetPayload<S extends boolean | null | undefined | TokenRevocationDefaultArgs> = $Result.GetResult<Prisma.$TokenRevocationPayload, S>

  type TokenRevocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TokenRevocationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TokenRevocationCountAggregateInputType | true
    }

  export interface TokenRevocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenRevocation'], meta: { name: 'TokenRevocation' } }
    /**
     * Find zero or one TokenRevocation that matches the filter.
     * @param {TokenRevocationFindUniqueArgs} args - Arguments to find a TokenRevocation
     * @example
     * // Get one TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenRevocationFindUniqueArgs>(args: SelectSubset<T, TokenRevocationFindUniqueArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TokenRevocation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TokenRevocationFindUniqueOrThrowArgs} args - Arguments to find a TokenRevocation
     * @example
     * // Get one TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenRevocationFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenRevocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TokenRevocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationFindFirstArgs} args - Arguments to find a TokenRevocation
     * @example
     * // Get one TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenRevocationFindFirstArgs>(args?: SelectSubset<T, TokenRevocationFindFirstArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TokenRevocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationFindFirstOrThrowArgs} args - Arguments to find a TokenRevocation
     * @example
     * // Get one TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenRevocationFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenRevocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TokenRevocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenRevocations
     * const tokenRevocations = await prisma.tokenRevocation.findMany()
     * 
     * // Get first 10 TokenRevocations
     * const tokenRevocations = await prisma.tokenRevocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenRevocationWithIdOnly = await prisma.tokenRevocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenRevocationFindManyArgs>(args?: SelectSubset<T, TokenRevocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TokenRevocation.
     * @param {TokenRevocationCreateArgs} args - Arguments to create a TokenRevocation.
     * @example
     * // Create one TokenRevocation
     * const TokenRevocation = await prisma.tokenRevocation.create({
     *   data: {
     *     // ... data to create a TokenRevocation
     *   }
     * })
     * 
     */
    create<T extends TokenRevocationCreateArgs>(args: SelectSubset<T, TokenRevocationCreateArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TokenRevocations.
     * @param {TokenRevocationCreateManyArgs} args - Arguments to create many TokenRevocations.
     * @example
     * // Create many TokenRevocations
     * const tokenRevocation = await prisma.tokenRevocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenRevocationCreateManyArgs>(args?: SelectSubset<T, TokenRevocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenRevocations and returns the data saved in the database.
     * @param {TokenRevocationCreateManyAndReturnArgs} args - Arguments to create many TokenRevocations.
     * @example
     * // Create many TokenRevocations
     * const tokenRevocation = await prisma.tokenRevocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenRevocations and only return the `id`
     * const tokenRevocationWithIdOnly = await prisma.tokenRevocation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenRevocationCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenRevocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TokenRevocation.
     * @param {TokenRevocationDeleteArgs} args - Arguments to delete one TokenRevocation.
     * @example
     * // Delete one TokenRevocation
     * const TokenRevocation = await prisma.tokenRevocation.delete({
     *   where: {
     *     // ... filter to delete one TokenRevocation
     *   }
     * })
     * 
     */
    delete<T extends TokenRevocationDeleteArgs>(args: SelectSubset<T, TokenRevocationDeleteArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TokenRevocation.
     * @param {TokenRevocationUpdateArgs} args - Arguments to update one TokenRevocation.
     * @example
     * // Update one TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenRevocationUpdateArgs>(args: SelectSubset<T, TokenRevocationUpdateArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TokenRevocations.
     * @param {TokenRevocationDeleteManyArgs} args - Arguments to filter TokenRevocations to delete.
     * @example
     * // Delete a few TokenRevocations
     * const { count } = await prisma.tokenRevocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenRevocationDeleteManyArgs>(args?: SelectSubset<T, TokenRevocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenRevocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenRevocations
     * const tokenRevocation = await prisma.tokenRevocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenRevocationUpdateManyArgs>(args: SelectSubset<T, TokenRevocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TokenRevocation.
     * @param {TokenRevocationUpsertArgs} args - Arguments to update or create a TokenRevocation.
     * @example
     * // Update or create a TokenRevocation
     * const tokenRevocation = await prisma.tokenRevocation.upsert({
     *   create: {
     *     // ... data to create a TokenRevocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenRevocation we want to update
     *   }
     * })
     */
    upsert<T extends TokenRevocationUpsertArgs>(args: SelectSubset<T, TokenRevocationUpsertArgs<ExtArgs>>): Prisma__TokenRevocationClient<$Result.GetResult<Prisma.$TokenRevocationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TokenRevocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationCountArgs} args - Arguments to filter TokenRevocations to count.
     * @example
     * // Count the number of TokenRevocations
     * const count = await prisma.tokenRevocation.count({
     *   where: {
     *     // ... the filter for the TokenRevocations we want to count
     *   }
     * })
    **/
    count<T extends TokenRevocationCountArgs>(
      args?: Subset<T, TokenRevocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenRevocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenRevocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenRevocationAggregateArgs>(args: Subset<T, TokenRevocationAggregateArgs>): Prisma.PrismaPromise<GetTokenRevocationAggregateType<T>>

    /**
     * Group by TokenRevocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenRevocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenRevocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenRevocationGroupByArgs['orderBy'] }
        : { orderBy?: TokenRevocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenRevocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenRevocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenRevocation model
   */
  readonly fields: TokenRevocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenRevocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenRevocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenRevocation model
   */ 
  interface TokenRevocationFieldRefs {
    readonly id: FieldRef<"TokenRevocation", 'String'>
    readonly user_id: FieldRef<"TokenRevocation", 'String'>
    readonly binding_id: FieldRef<"TokenRevocation", 'String'>
    readonly revoked_at: FieldRef<"TokenRevocation", 'DateTime'>
    readonly expires_at: FieldRef<"TokenRevocation", 'DateTime'>
    readonly aioson_play_id: FieldRef<"TokenRevocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TokenRevocation findUnique
   */
  export type TokenRevocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter, which TokenRevocation to fetch.
     */
    where: TokenRevocationWhereUniqueInput
  }

  /**
   * TokenRevocation findUniqueOrThrow
   */
  export type TokenRevocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter, which TokenRevocation to fetch.
     */
    where: TokenRevocationWhereUniqueInput
  }

  /**
   * TokenRevocation findFirst
   */
  export type TokenRevocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter, which TokenRevocation to fetch.
     */
    where?: TokenRevocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenRevocations to fetch.
     */
    orderBy?: TokenRevocationOrderByWithRelationInput | TokenRevocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenRevocations.
     */
    cursor?: TokenRevocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenRevocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenRevocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenRevocations.
     */
    distinct?: TokenRevocationScalarFieldEnum | TokenRevocationScalarFieldEnum[]
  }

  /**
   * TokenRevocation findFirstOrThrow
   */
  export type TokenRevocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter, which TokenRevocation to fetch.
     */
    where?: TokenRevocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenRevocations to fetch.
     */
    orderBy?: TokenRevocationOrderByWithRelationInput | TokenRevocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenRevocations.
     */
    cursor?: TokenRevocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenRevocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenRevocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenRevocations.
     */
    distinct?: TokenRevocationScalarFieldEnum | TokenRevocationScalarFieldEnum[]
  }

  /**
   * TokenRevocation findMany
   */
  export type TokenRevocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter, which TokenRevocations to fetch.
     */
    where?: TokenRevocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenRevocations to fetch.
     */
    orderBy?: TokenRevocationOrderByWithRelationInput | TokenRevocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenRevocations.
     */
    cursor?: TokenRevocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenRevocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenRevocations.
     */
    skip?: number
    distinct?: TokenRevocationScalarFieldEnum | TokenRevocationScalarFieldEnum[]
  }

  /**
   * TokenRevocation create
   */
  export type TokenRevocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * The data needed to create a TokenRevocation.
     */
    data: XOR<TokenRevocationCreateInput, TokenRevocationUncheckedCreateInput>
  }

  /**
   * TokenRevocation createMany
   */
  export type TokenRevocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenRevocations.
     */
    data: TokenRevocationCreateManyInput | TokenRevocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenRevocation createManyAndReturn
   */
  export type TokenRevocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TokenRevocations.
     */
    data: TokenRevocationCreateManyInput | TokenRevocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenRevocation update
   */
  export type TokenRevocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * The data needed to update a TokenRevocation.
     */
    data: XOR<TokenRevocationUpdateInput, TokenRevocationUncheckedUpdateInput>
    /**
     * Choose, which TokenRevocation to update.
     */
    where: TokenRevocationWhereUniqueInput
  }

  /**
   * TokenRevocation updateMany
   */
  export type TokenRevocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenRevocations.
     */
    data: XOR<TokenRevocationUpdateManyMutationInput, TokenRevocationUncheckedUpdateManyInput>
    /**
     * Filter which TokenRevocations to update
     */
    where?: TokenRevocationWhereInput
  }

  /**
   * TokenRevocation upsert
   */
  export type TokenRevocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * The filter to search for the TokenRevocation to update in case it exists.
     */
    where: TokenRevocationWhereUniqueInput
    /**
     * In case the TokenRevocation found by the `where` argument doesn't exist, create a new TokenRevocation with this data.
     */
    create: XOR<TokenRevocationCreateInput, TokenRevocationUncheckedCreateInput>
    /**
     * In case the TokenRevocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenRevocationUpdateInput, TokenRevocationUncheckedUpdateInput>
  }

  /**
   * TokenRevocation delete
   */
  export type TokenRevocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
    /**
     * Filter which TokenRevocation to delete.
     */
    where: TokenRevocationWhereUniqueInput
  }

  /**
   * TokenRevocation deleteMany
   */
  export type TokenRevocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenRevocations to delete
     */
    where?: TokenRevocationWhereInput
  }

  /**
   * TokenRevocation without action
   */
  export type TokenRevocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenRevocation
     */
    select?: TokenRevocationSelect<ExtArgs> | null
  }


  /**
   * Model AppBinding
   */

  export type AggregateAppBinding = {
    _count: AppBindingCountAggregateOutputType | null
    _min: AppBindingMinAggregateOutputType | null
    _max: AppBindingMaxAggregateOutputType | null
  }

  export type AppBindingMinAggregateOutputType = {
    id: string | null
    app_name: string | null
    app_slug: string | null
    connection_name: string | null
    system_permissions: string | null
    enable_2fa: boolean | null
    enable_rbac: boolean | null
    auth_mode: string | null
    manifest_fingerprint: string | null
    manifest_sync_status: string | null
    manifest_sync_error: string | null
    manifest_synced_at: Date | null
    allowed_origins_json: string | null
    aioson_play_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppBindingMaxAggregateOutputType = {
    id: string | null
    app_name: string | null
    app_slug: string | null
    connection_name: string | null
    system_permissions: string | null
    enable_2fa: boolean | null
    enable_rbac: boolean | null
    auth_mode: string | null
    manifest_fingerprint: string | null
    manifest_sync_status: string | null
    manifest_sync_error: string | null
    manifest_synced_at: Date | null
    allowed_origins_json: string | null
    aioson_play_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppBindingCountAggregateOutputType = {
    id: number
    app_name: number
    app_slug: number
    connection_name: number
    system_permissions: number
    enable_2fa: number
    enable_rbac: number
    auth_mode: number
    manifest_fingerprint: number
    manifest_sync_status: number
    manifest_sync_error: number
    manifest_synced_at: number
    allowed_origins_json: number
    aioson_play_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppBindingMinAggregateInputType = {
    id?: true
    app_name?: true
    app_slug?: true
    connection_name?: true
    system_permissions?: true
    enable_2fa?: true
    enable_rbac?: true
    auth_mode?: true
    manifest_fingerprint?: true
    manifest_sync_status?: true
    manifest_sync_error?: true
    manifest_synced_at?: true
    allowed_origins_json?: true
    aioson_play_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AppBindingMaxAggregateInputType = {
    id?: true
    app_name?: true
    app_slug?: true
    connection_name?: true
    system_permissions?: true
    enable_2fa?: true
    enable_rbac?: true
    auth_mode?: true
    manifest_fingerprint?: true
    manifest_sync_status?: true
    manifest_sync_error?: true
    manifest_synced_at?: true
    allowed_origins_json?: true
    aioson_play_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AppBindingCountAggregateInputType = {
    id?: true
    app_name?: true
    app_slug?: true
    connection_name?: true
    system_permissions?: true
    enable_2fa?: true
    enable_rbac?: true
    auth_mode?: true
    manifest_fingerprint?: true
    manifest_sync_status?: true
    manifest_sync_error?: true
    manifest_synced_at?: true
    allowed_origins_json?: true
    aioson_play_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppBindingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppBinding to aggregate.
     */
    where?: AppBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppBindings to fetch.
     */
    orderBy?: AppBindingOrderByWithRelationInput | AppBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppBindings
    **/
    _count?: true | AppBindingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppBindingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppBindingMaxAggregateInputType
  }

  export type GetAppBindingAggregateType<T extends AppBindingAggregateArgs> = {
        [P in keyof T & keyof AggregateAppBinding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppBinding[P]>
      : GetScalarType<T[P], AggregateAppBinding[P]>
  }




  export type AppBindingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppBindingWhereInput
    orderBy?: AppBindingOrderByWithAggregationInput | AppBindingOrderByWithAggregationInput[]
    by: AppBindingScalarFieldEnum[] | AppBindingScalarFieldEnum
    having?: AppBindingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppBindingCountAggregateInputType | true
    _min?: AppBindingMinAggregateInputType
    _max?: AppBindingMaxAggregateInputType
  }

  export type AppBindingGroupByOutputType = {
    id: string
    app_name: string
    app_slug: string
    connection_name: string
    system_permissions: string
    enable_2fa: boolean
    enable_rbac: boolean
    auth_mode: string
    manifest_fingerprint: string | null
    manifest_sync_status: string
    manifest_sync_error: string | null
    manifest_synced_at: Date | null
    allowed_origins_json: string
    aioson_play_id: string | null
    created_at: Date
    updated_at: Date
    _count: AppBindingCountAggregateOutputType | null
    _min: AppBindingMinAggregateOutputType | null
    _max: AppBindingMaxAggregateOutputType | null
  }

  type GetAppBindingGroupByPayload<T extends AppBindingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppBindingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppBindingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppBindingGroupByOutputType[P]>
            : GetScalarType<T[P], AppBindingGroupByOutputType[P]>
        }
      >
    >


  export type AppBindingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_name?: boolean
    app_slug?: boolean
    connection_name?: boolean
    system_permissions?: boolean
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: boolean
    manifest_fingerprint?: boolean
    manifest_sync_status?: boolean
    manifest_sync_error?: boolean
    manifest_synced_at?: boolean
    allowed_origins_json?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    permissions?: boolean | AppBinding$permissionsArgs<ExtArgs>
    profiles?: boolean | AppBinding$profilesArgs<ExtArgs>
    accesses?: boolean | AppBinding$accessesArgs<ExtArgs>
    _count?: boolean | AppBindingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appBinding"]>

  export type AppBindingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_name?: boolean
    app_slug?: boolean
    connection_name?: boolean
    system_permissions?: boolean
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: boolean
    manifest_fingerprint?: boolean
    manifest_sync_status?: boolean
    manifest_sync_error?: boolean
    manifest_synced_at?: boolean
    allowed_origins_json?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appBinding"]>

  export type AppBindingSelectScalar = {
    id?: boolean
    app_name?: boolean
    app_slug?: boolean
    connection_name?: boolean
    system_permissions?: boolean
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: boolean
    manifest_fingerprint?: boolean
    manifest_sync_status?: boolean
    manifest_sync_error?: boolean
    manifest_synced_at?: boolean
    allowed_origins_json?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AppBindingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | AppBinding$permissionsArgs<ExtArgs>
    profiles?: boolean | AppBinding$profilesArgs<ExtArgs>
    accesses?: boolean | AppBinding$accessesArgs<ExtArgs>
    _count?: boolean | AppBindingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppBindingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AppBindingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppBinding"
    objects: {
      permissions: Prisma.$BindingPermissionPayload<ExtArgs>[]
      profiles: Prisma.$AppProfilePayload<ExtArgs>[]
      accesses: Prisma.$AppAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_name: string
      app_slug: string
      connection_name: string
      system_permissions: string
      enable_2fa: boolean
      enable_rbac: boolean
      auth_mode: string
      manifest_fingerprint: string | null
      manifest_sync_status: string
      manifest_sync_error: string | null
      manifest_synced_at: Date | null
      allowed_origins_json: string
      aioson_play_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appBinding"]>
    composites: {}
  }

  type AppBindingGetPayload<S extends boolean | null | undefined | AppBindingDefaultArgs> = $Result.GetResult<Prisma.$AppBindingPayload, S>

  type AppBindingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppBindingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppBindingCountAggregateInputType | true
    }

  export interface AppBindingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppBinding'], meta: { name: 'AppBinding' } }
    /**
     * Find zero or one AppBinding that matches the filter.
     * @param {AppBindingFindUniqueArgs} args - Arguments to find a AppBinding
     * @example
     * // Get one AppBinding
     * const appBinding = await prisma.appBinding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppBindingFindUniqueArgs>(args: SelectSubset<T, AppBindingFindUniqueArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppBinding that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppBindingFindUniqueOrThrowArgs} args - Arguments to find a AppBinding
     * @example
     * // Get one AppBinding
     * const appBinding = await prisma.appBinding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppBindingFindUniqueOrThrowArgs>(args: SelectSubset<T, AppBindingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppBinding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingFindFirstArgs} args - Arguments to find a AppBinding
     * @example
     * // Get one AppBinding
     * const appBinding = await prisma.appBinding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppBindingFindFirstArgs>(args?: SelectSubset<T, AppBindingFindFirstArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppBinding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingFindFirstOrThrowArgs} args - Arguments to find a AppBinding
     * @example
     * // Get one AppBinding
     * const appBinding = await prisma.appBinding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppBindingFindFirstOrThrowArgs>(args?: SelectSubset<T, AppBindingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppBindings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppBindings
     * const appBindings = await prisma.appBinding.findMany()
     * 
     * // Get first 10 AppBindings
     * const appBindings = await prisma.appBinding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appBindingWithIdOnly = await prisma.appBinding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppBindingFindManyArgs>(args?: SelectSubset<T, AppBindingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppBinding.
     * @param {AppBindingCreateArgs} args - Arguments to create a AppBinding.
     * @example
     * // Create one AppBinding
     * const AppBinding = await prisma.appBinding.create({
     *   data: {
     *     // ... data to create a AppBinding
     *   }
     * })
     * 
     */
    create<T extends AppBindingCreateArgs>(args: SelectSubset<T, AppBindingCreateArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppBindings.
     * @param {AppBindingCreateManyArgs} args - Arguments to create many AppBindings.
     * @example
     * // Create many AppBindings
     * const appBinding = await prisma.appBinding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppBindingCreateManyArgs>(args?: SelectSubset<T, AppBindingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppBindings and returns the data saved in the database.
     * @param {AppBindingCreateManyAndReturnArgs} args - Arguments to create many AppBindings.
     * @example
     * // Create many AppBindings
     * const appBinding = await prisma.appBinding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppBindings and only return the `id`
     * const appBindingWithIdOnly = await prisma.appBinding.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppBindingCreateManyAndReturnArgs>(args?: SelectSubset<T, AppBindingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppBinding.
     * @param {AppBindingDeleteArgs} args - Arguments to delete one AppBinding.
     * @example
     * // Delete one AppBinding
     * const AppBinding = await prisma.appBinding.delete({
     *   where: {
     *     // ... filter to delete one AppBinding
     *   }
     * })
     * 
     */
    delete<T extends AppBindingDeleteArgs>(args: SelectSubset<T, AppBindingDeleteArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppBinding.
     * @param {AppBindingUpdateArgs} args - Arguments to update one AppBinding.
     * @example
     * // Update one AppBinding
     * const appBinding = await prisma.appBinding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppBindingUpdateArgs>(args: SelectSubset<T, AppBindingUpdateArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppBindings.
     * @param {AppBindingDeleteManyArgs} args - Arguments to filter AppBindings to delete.
     * @example
     * // Delete a few AppBindings
     * const { count } = await prisma.appBinding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppBindingDeleteManyArgs>(args?: SelectSubset<T, AppBindingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppBindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppBindings
     * const appBinding = await prisma.appBinding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppBindingUpdateManyArgs>(args: SelectSubset<T, AppBindingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppBinding.
     * @param {AppBindingUpsertArgs} args - Arguments to update or create a AppBinding.
     * @example
     * // Update or create a AppBinding
     * const appBinding = await prisma.appBinding.upsert({
     *   create: {
     *     // ... data to create a AppBinding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppBinding we want to update
     *   }
     * })
     */
    upsert<T extends AppBindingUpsertArgs>(args: SelectSubset<T, AppBindingUpsertArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppBindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingCountArgs} args - Arguments to filter AppBindings to count.
     * @example
     * // Count the number of AppBindings
     * const count = await prisma.appBinding.count({
     *   where: {
     *     // ... the filter for the AppBindings we want to count
     *   }
     * })
    **/
    count<T extends AppBindingCountArgs>(
      args?: Subset<T, AppBindingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppBindingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppBinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppBindingAggregateArgs>(args: Subset<T, AppBindingAggregateArgs>): Prisma.PrismaPromise<GetAppBindingAggregateType<T>>

    /**
     * Group by AppBinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppBindingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppBindingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppBindingGroupByArgs['orderBy'] }
        : { orderBy?: AppBindingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppBindingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppBindingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppBinding model
   */
  readonly fields: AppBindingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppBinding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppBindingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends AppBinding$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, AppBinding$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findMany"> | Null>
    profiles<T extends AppBinding$profilesArgs<ExtArgs> = {}>(args?: Subset<T, AppBinding$profilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findMany"> | Null>
    accesses<T extends AppBinding$accessesArgs<ExtArgs> = {}>(args?: Subset<T, AppBinding$accessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppBinding model
   */ 
  interface AppBindingFieldRefs {
    readonly id: FieldRef<"AppBinding", 'String'>
    readonly app_name: FieldRef<"AppBinding", 'String'>
    readonly app_slug: FieldRef<"AppBinding", 'String'>
    readonly connection_name: FieldRef<"AppBinding", 'String'>
    readonly system_permissions: FieldRef<"AppBinding", 'String'>
    readonly enable_2fa: FieldRef<"AppBinding", 'Boolean'>
    readonly enable_rbac: FieldRef<"AppBinding", 'Boolean'>
    readonly auth_mode: FieldRef<"AppBinding", 'String'>
    readonly manifest_fingerprint: FieldRef<"AppBinding", 'String'>
    readonly manifest_sync_status: FieldRef<"AppBinding", 'String'>
    readonly manifest_sync_error: FieldRef<"AppBinding", 'String'>
    readonly manifest_synced_at: FieldRef<"AppBinding", 'DateTime'>
    readonly allowed_origins_json: FieldRef<"AppBinding", 'String'>
    readonly aioson_play_id: FieldRef<"AppBinding", 'String'>
    readonly created_at: FieldRef<"AppBinding", 'DateTime'>
    readonly updated_at: FieldRef<"AppBinding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppBinding findUnique
   */
  export type AppBindingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter, which AppBinding to fetch.
     */
    where: AppBindingWhereUniqueInput
  }

  /**
   * AppBinding findUniqueOrThrow
   */
  export type AppBindingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter, which AppBinding to fetch.
     */
    where: AppBindingWhereUniqueInput
  }

  /**
   * AppBinding findFirst
   */
  export type AppBindingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter, which AppBinding to fetch.
     */
    where?: AppBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppBindings to fetch.
     */
    orderBy?: AppBindingOrderByWithRelationInput | AppBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppBindings.
     */
    cursor?: AppBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppBindings.
     */
    distinct?: AppBindingScalarFieldEnum | AppBindingScalarFieldEnum[]
  }

  /**
   * AppBinding findFirstOrThrow
   */
  export type AppBindingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter, which AppBinding to fetch.
     */
    where?: AppBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppBindings to fetch.
     */
    orderBy?: AppBindingOrderByWithRelationInput | AppBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppBindings.
     */
    cursor?: AppBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppBindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppBindings.
     */
    distinct?: AppBindingScalarFieldEnum | AppBindingScalarFieldEnum[]
  }

  /**
   * AppBinding findMany
   */
  export type AppBindingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter, which AppBindings to fetch.
     */
    where?: AppBindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppBindings to fetch.
     */
    orderBy?: AppBindingOrderByWithRelationInput | AppBindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppBindings.
     */
    cursor?: AppBindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppBindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppBindings.
     */
    skip?: number
    distinct?: AppBindingScalarFieldEnum | AppBindingScalarFieldEnum[]
  }

  /**
   * AppBinding create
   */
  export type AppBindingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * The data needed to create a AppBinding.
     */
    data: XOR<AppBindingCreateInput, AppBindingUncheckedCreateInput>
  }

  /**
   * AppBinding createMany
   */
  export type AppBindingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppBindings.
     */
    data: AppBindingCreateManyInput | AppBindingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppBinding createManyAndReturn
   */
  export type AppBindingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppBindings.
     */
    data: AppBindingCreateManyInput | AppBindingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppBinding update
   */
  export type AppBindingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * The data needed to update a AppBinding.
     */
    data: XOR<AppBindingUpdateInput, AppBindingUncheckedUpdateInput>
    /**
     * Choose, which AppBinding to update.
     */
    where: AppBindingWhereUniqueInput
  }

  /**
   * AppBinding updateMany
   */
  export type AppBindingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppBindings.
     */
    data: XOR<AppBindingUpdateManyMutationInput, AppBindingUncheckedUpdateManyInput>
    /**
     * Filter which AppBindings to update
     */
    where?: AppBindingWhereInput
  }

  /**
   * AppBinding upsert
   */
  export type AppBindingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * The filter to search for the AppBinding to update in case it exists.
     */
    where: AppBindingWhereUniqueInput
    /**
     * In case the AppBinding found by the `where` argument doesn't exist, create a new AppBinding with this data.
     */
    create: XOR<AppBindingCreateInput, AppBindingUncheckedCreateInput>
    /**
     * In case the AppBinding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppBindingUpdateInput, AppBindingUncheckedUpdateInput>
  }

  /**
   * AppBinding delete
   */
  export type AppBindingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
    /**
     * Filter which AppBinding to delete.
     */
    where: AppBindingWhereUniqueInput
  }

  /**
   * AppBinding deleteMany
   */
  export type AppBindingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppBindings to delete
     */
    where?: AppBindingWhereInput
  }

  /**
   * AppBinding.permissions
   */
  export type AppBinding$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    where?: BindingPermissionWhereInput
    orderBy?: BindingPermissionOrderByWithRelationInput | BindingPermissionOrderByWithRelationInput[]
    cursor?: BindingPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BindingPermissionScalarFieldEnum | BindingPermissionScalarFieldEnum[]
  }

  /**
   * AppBinding.profiles
   */
  export type AppBinding$profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    where?: AppProfileWhereInput
    orderBy?: AppProfileOrderByWithRelationInput | AppProfileOrderByWithRelationInput[]
    cursor?: AppProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppProfileScalarFieldEnum | AppProfileScalarFieldEnum[]
  }

  /**
   * AppBinding.accesses
   */
  export type AppBinding$accessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    where?: AppAccessWhereInput
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    cursor?: AppAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * AppBinding without action
   */
  export type AppBindingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppBinding
     */
    select?: AppBindingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppBindingInclude<ExtArgs> | null
  }


  /**
   * Model PlayAppInventory
   */

  export type AggregatePlayAppInventory = {
    _count: PlayAppInventoryCountAggregateOutputType | null
    _min: PlayAppInventoryMinAggregateOutputType | null
    _max: PlayAppInventoryMaxAggregateOutputType | null
  }

  export type PlayAppInventoryMinAggregateOutputType = {
    id: string | null
    aioson_play_id: string | null
    inventory_id: string | null
    app_slug: string | null
    app_name: string | null
    version: string | null
    description: string | null
    lifecycle: string | null
    source: string | null
    supports_auth: boolean | null
    accepted_roles_json: string | null
    manifest_fingerprint: string | null
    warnings_json: string | null
    last_seen_at: Date | null
    archived_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PlayAppInventoryMaxAggregateOutputType = {
    id: string | null
    aioson_play_id: string | null
    inventory_id: string | null
    app_slug: string | null
    app_name: string | null
    version: string | null
    description: string | null
    lifecycle: string | null
    source: string | null
    supports_auth: boolean | null
    accepted_roles_json: string | null
    manifest_fingerprint: string | null
    warnings_json: string | null
    last_seen_at: Date | null
    archived_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PlayAppInventoryCountAggregateOutputType = {
    id: number
    aioson_play_id: number
    inventory_id: number
    app_slug: number
    app_name: number
    version: number
    description: number
    lifecycle: number
    source: number
    supports_auth: number
    accepted_roles_json: number
    manifest_fingerprint: number
    warnings_json: number
    last_seen_at: number
    archived_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PlayAppInventoryMinAggregateInputType = {
    id?: true
    aioson_play_id?: true
    inventory_id?: true
    app_slug?: true
    app_name?: true
    version?: true
    description?: true
    lifecycle?: true
    source?: true
    supports_auth?: true
    accepted_roles_json?: true
    manifest_fingerprint?: true
    warnings_json?: true
    last_seen_at?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
  }

  export type PlayAppInventoryMaxAggregateInputType = {
    id?: true
    aioson_play_id?: true
    inventory_id?: true
    app_slug?: true
    app_name?: true
    version?: true
    description?: true
    lifecycle?: true
    source?: true
    supports_auth?: true
    accepted_roles_json?: true
    manifest_fingerprint?: true
    warnings_json?: true
    last_seen_at?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
  }

  export type PlayAppInventoryCountAggregateInputType = {
    id?: true
    aioson_play_id?: true
    inventory_id?: true
    app_slug?: true
    app_name?: true
    version?: true
    description?: true
    lifecycle?: true
    source?: true
    supports_auth?: true
    accepted_roles_json?: true
    manifest_fingerprint?: true
    warnings_json?: true
    last_seen_at?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PlayAppInventoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayAppInventory to aggregate.
     */
    where?: PlayAppInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayAppInventories to fetch.
     */
    orderBy?: PlayAppInventoryOrderByWithRelationInput | PlayAppInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayAppInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayAppInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayAppInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlayAppInventories
    **/
    _count?: true | PlayAppInventoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayAppInventoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayAppInventoryMaxAggregateInputType
  }

  export type GetPlayAppInventoryAggregateType<T extends PlayAppInventoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayAppInventory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayAppInventory[P]>
      : GetScalarType<T[P], AggregatePlayAppInventory[P]>
  }




  export type PlayAppInventoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayAppInventoryWhereInput
    orderBy?: PlayAppInventoryOrderByWithAggregationInput | PlayAppInventoryOrderByWithAggregationInput[]
    by: PlayAppInventoryScalarFieldEnum[] | PlayAppInventoryScalarFieldEnum
    having?: PlayAppInventoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayAppInventoryCountAggregateInputType | true
    _min?: PlayAppInventoryMinAggregateInputType
    _max?: PlayAppInventoryMaxAggregateInputType
  }

  export type PlayAppInventoryGroupByOutputType = {
    id: string
    aioson_play_id: string
    inventory_id: string
    app_slug: string | null
    app_name: string
    version: string | null
    description: string | null
    lifecycle: string
    source: string
    supports_auth: boolean
    accepted_roles_json: string
    manifest_fingerprint: string | null
    warnings_json: string
    last_seen_at: Date
    archived_at: Date | null
    created_at: Date
    updated_at: Date
    _count: PlayAppInventoryCountAggregateOutputType | null
    _min: PlayAppInventoryMinAggregateOutputType | null
    _max: PlayAppInventoryMaxAggregateOutputType | null
  }

  type GetPlayAppInventoryGroupByPayload<T extends PlayAppInventoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayAppInventoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayAppInventoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayAppInventoryGroupByOutputType[P]>
            : GetScalarType<T[P], PlayAppInventoryGroupByOutputType[P]>
        }
      >
    >


  export type PlayAppInventorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aioson_play_id?: boolean
    inventory_id?: boolean
    app_slug?: boolean
    app_name?: boolean
    version?: boolean
    description?: boolean
    lifecycle?: boolean
    source?: boolean
    supports_auth?: boolean
    accepted_roles_json?: boolean
    manifest_fingerprint?: boolean
    warnings_json?: boolean
    last_seen_at?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["playAppInventory"]>

  export type PlayAppInventorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aioson_play_id?: boolean
    inventory_id?: boolean
    app_slug?: boolean
    app_name?: boolean
    version?: boolean
    description?: boolean
    lifecycle?: boolean
    source?: boolean
    supports_auth?: boolean
    accepted_roles_json?: boolean
    manifest_fingerprint?: boolean
    warnings_json?: boolean
    last_seen_at?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["playAppInventory"]>

  export type PlayAppInventorySelectScalar = {
    id?: boolean
    aioson_play_id?: boolean
    inventory_id?: boolean
    app_slug?: boolean
    app_name?: boolean
    version?: boolean
    description?: boolean
    lifecycle?: boolean
    source?: boolean
    supports_auth?: boolean
    accepted_roles_json?: boolean
    manifest_fingerprint?: boolean
    warnings_json?: boolean
    last_seen_at?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $PlayAppInventoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlayAppInventory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      aioson_play_id: string
      inventory_id: string
      app_slug: string | null
      app_name: string
      version: string | null
      description: string | null
      lifecycle: string
      source: string
      supports_auth: boolean
      accepted_roles_json: string
      manifest_fingerprint: string | null
      warnings_json: string
      last_seen_at: Date
      archived_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["playAppInventory"]>
    composites: {}
  }

  type PlayAppInventoryGetPayload<S extends boolean | null | undefined | PlayAppInventoryDefaultArgs> = $Result.GetResult<Prisma.$PlayAppInventoryPayload, S>

  type PlayAppInventoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlayAppInventoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayAppInventoryCountAggregateInputType | true
    }

  export interface PlayAppInventoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlayAppInventory'], meta: { name: 'PlayAppInventory' } }
    /**
     * Find zero or one PlayAppInventory that matches the filter.
     * @param {PlayAppInventoryFindUniqueArgs} args - Arguments to find a PlayAppInventory
     * @example
     * // Get one PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayAppInventoryFindUniqueArgs>(args: SelectSubset<T, PlayAppInventoryFindUniqueArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlayAppInventory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlayAppInventoryFindUniqueOrThrowArgs} args - Arguments to find a PlayAppInventory
     * @example
     * // Get one PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayAppInventoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayAppInventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlayAppInventory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryFindFirstArgs} args - Arguments to find a PlayAppInventory
     * @example
     * // Get one PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayAppInventoryFindFirstArgs>(args?: SelectSubset<T, PlayAppInventoryFindFirstArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlayAppInventory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryFindFirstOrThrowArgs} args - Arguments to find a PlayAppInventory
     * @example
     * // Get one PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayAppInventoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayAppInventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlayAppInventories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayAppInventories
     * const playAppInventories = await prisma.playAppInventory.findMany()
     * 
     * // Get first 10 PlayAppInventories
     * const playAppInventories = await prisma.playAppInventory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playAppInventoryWithIdOnly = await prisma.playAppInventory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayAppInventoryFindManyArgs>(args?: SelectSubset<T, PlayAppInventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlayAppInventory.
     * @param {PlayAppInventoryCreateArgs} args - Arguments to create a PlayAppInventory.
     * @example
     * // Create one PlayAppInventory
     * const PlayAppInventory = await prisma.playAppInventory.create({
     *   data: {
     *     // ... data to create a PlayAppInventory
     *   }
     * })
     * 
     */
    create<T extends PlayAppInventoryCreateArgs>(args: SelectSubset<T, PlayAppInventoryCreateArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlayAppInventories.
     * @param {PlayAppInventoryCreateManyArgs} args - Arguments to create many PlayAppInventories.
     * @example
     * // Create many PlayAppInventories
     * const playAppInventory = await prisma.playAppInventory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayAppInventoryCreateManyArgs>(args?: SelectSubset<T, PlayAppInventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlayAppInventories and returns the data saved in the database.
     * @param {PlayAppInventoryCreateManyAndReturnArgs} args - Arguments to create many PlayAppInventories.
     * @example
     * // Create many PlayAppInventories
     * const playAppInventory = await prisma.playAppInventory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlayAppInventories and only return the `id`
     * const playAppInventoryWithIdOnly = await prisma.playAppInventory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayAppInventoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayAppInventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlayAppInventory.
     * @param {PlayAppInventoryDeleteArgs} args - Arguments to delete one PlayAppInventory.
     * @example
     * // Delete one PlayAppInventory
     * const PlayAppInventory = await prisma.playAppInventory.delete({
     *   where: {
     *     // ... filter to delete one PlayAppInventory
     *   }
     * })
     * 
     */
    delete<T extends PlayAppInventoryDeleteArgs>(args: SelectSubset<T, PlayAppInventoryDeleteArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlayAppInventory.
     * @param {PlayAppInventoryUpdateArgs} args - Arguments to update one PlayAppInventory.
     * @example
     * // Update one PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayAppInventoryUpdateArgs>(args: SelectSubset<T, PlayAppInventoryUpdateArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlayAppInventories.
     * @param {PlayAppInventoryDeleteManyArgs} args - Arguments to filter PlayAppInventories to delete.
     * @example
     * // Delete a few PlayAppInventories
     * const { count } = await prisma.playAppInventory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayAppInventoryDeleteManyArgs>(args?: SelectSubset<T, PlayAppInventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayAppInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayAppInventories
     * const playAppInventory = await prisma.playAppInventory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayAppInventoryUpdateManyArgs>(args: SelectSubset<T, PlayAppInventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlayAppInventory.
     * @param {PlayAppInventoryUpsertArgs} args - Arguments to update or create a PlayAppInventory.
     * @example
     * // Update or create a PlayAppInventory
     * const playAppInventory = await prisma.playAppInventory.upsert({
     *   create: {
     *     // ... data to create a PlayAppInventory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayAppInventory we want to update
     *   }
     * })
     */
    upsert<T extends PlayAppInventoryUpsertArgs>(args: SelectSubset<T, PlayAppInventoryUpsertArgs<ExtArgs>>): Prisma__PlayAppInventoryClient<$Result.GetResult<Prisma.$PlayAppInventoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlayAppInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryCountArgs} args - Arguments to filter PlayAppInventories to count.
     * @example
     * // Count the number of PlayAppInventories
     * const count = await prisma.playAppInventory.count({
     *   where: {
     *     // ... the filter for the PlayAppInventories we want to count
     *   }
     * })
    **/
    count<T extends PlayAppInventoryCountArgs>(
      args?: Subset<T, PlayAppInventoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayAppInventoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayAppInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayAppInventoryAggregateArgs>(args: Subset<T, PlayAppInventoryAggregateArgs>): Prisma.PrismaPromise<GetPlayAppInventoryAggregateType<T>>

    /**
     * Group by PlayAppInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayAppInventoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayAppInventoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayAppInventoryGroupByArgs['orderBy'] }
        : { orderBy?: PlayAppInventoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayAppInventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayAppInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlayAppInventory model
   */
  readonly fields: PlayAppInventoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayAppInventory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayAppInventoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlayAppInventory model
   */ 
  interface PlayAppInventoryFieldRefs {
    readonly id: FieldRef<"PlayAppInventory", 'String'>
    readonly aioson_play_id: FieldRef<"PlayAppInventory", 'String'>
    readonly inventory_id: FieldRef<"PlayAppInventory", 'String'>
    readonly app_slug: FieldRef<"PlayAppInventory", 'String'>
    readonly app_name: FieldRef<"PlayAppInventory", 'String'>
    readonly version: FieldRef<"PlayAppInventory", 'String'>
    readonly description: FieldRef<"PlayAppInventory", 'String'>
    readonly lifecycle: FieldRef<"PlayAppInventory", 'String'>
    readonly source: FieldRef<"PlayAppInventory", 'String'>
    readonly supports_auth: FieldRef<"PlayAppInventory", 'Boolean'>
    readonly accepted_roles_json: FieldRef<"PlayAppInventory", 'String'>
    readonly manifest_fingerprint: FieldRef<"PlayAppInventory", 'String'>
    readonly warnings_json: FieldRef<"PlayAppInventory", 'String'>
    readonly last_seen_at: FieldRef<"PlayAppInventory", 'DateTime'>
    readonly archived_at: FieldRef<"PlayAppInventory", 'DateTime'>
    readonly created_at: FieldRef<"PlayAppInventory", 'DateTime'>
    readonly updated_at: FieldRef<"PlayAppInventory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlayAppInventory findUnique
   */
  export type PlayAppInventoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter, which PlayAppInventory to fetch.
     */
    where: PlayAppInventoryWhereUniqueInput
  }

  /**
   * PlayAppInventory findUniqueOrThrow
   */
  export type PlayAppInventoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter, which PlayAppInventory to fetch.
     */
    where: PlayAppInventoryWhereUniqueInput
  }

  /**
   * PlayAppInventory findFirst
   */
  export type PlayAppInventoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter, which PlayAppInventory to fetch.
     */
    where?: PlayAppInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayAppInventories to fetch.
     */
    orderBy?: PlayAppInventoryOrderByWithRelationInput | PlayAppInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayAppInventories.
     */
    cursor?: PlayAppInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayAppInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayAppInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayAppInventories.
     */
    distinct?: PlayAppInventoryScalarFieldEnum | PlayAppInventoryScalarFieldEnum[]
  }

  /**
   * PlayAppInventory findFirstOrThrow
   */
  export type PlayAppInventoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter, which PlayAppInventory to fetch.
     */
    where?: PlayAppInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayAppInventories to fetch.
     */
    orderBy?: PlayAppInventoryOrderByWithRelationInput | PlayAppInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayAppInventories.
     */
    cursor?: PlayAppInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayAppInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayAppInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayAppInventories.
     */
    distinct?: PlayAppInventoryScalarFieldEnum | PlayAppInventoryScalarFieldEnum[]
  }

  /**
   * PlayAppInventory findMany
   */
  export type PlayAppInventoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter, which PlayAppInventories to fetch.
     */
    where?: PlayAppInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayAppInventories to fetch.
     */
    orderBy?: PlayAppInventoryOrderByWithRelationInput | PlayAppInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlayAppInventories.
     */
    cursor?: PlayAppInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayAppInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayAppInventories.
     */
    skip?: number
    distinct?: PlayAppInventoryScalarFieldEnum | PlayAppInventoryScalarFieldEnum[]
  }

  /**
   * PlayAppInventory create
   */
  export type PlayAppInventoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * The data needed to create a PlayAppInventory.
     */
    data: XOR<PlayAppInventoryCreateInput, PlayAppInventoryUncheckedCreateInput>
  }

  /**
   * PlayAppInventory createMany
   */
  export type PlayAppInventoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlayAppInventories.
     */
    data: PlayAppInventoryCreateManyInput | PlayAppInventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayAppInventory createManyAndReturn
   */
  export type PlayAppInventoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlayAppInventories.
     */
    data: PlayAppInventoryCreateManyInput | PlayAppInventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayAppInventory update
   */
  export type PlayAppInventoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * The data needed to update a PlayAppInventory.
     */
    data: XOR<PlayAppInventoryUpdateInput, PlayAppInventoryUncheckedUpdateInput>
    /**
     * Choose, which PlayAppInventory to update.
     */
    where: PlayAppInventoryWhereUniqueInput
  }

  /**
   * PlayAppInventory updateMany
   */
  export type PlayAppInventoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlayAppInventories.
     */
    data: XOR<PlayAppInventoryUpdateManyMutationInput, PlayAppInventoryUncheckedUpdateManyInput>
    /**
     * Filter which PlayAppInventories to update
     */
    where?: PlayAppInventoryWhereInput
  }

  /**
   * PlayAppInventory upsert
   */
  export type PlayAppInventoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * The filter to search for the PlayAppInventory to update in case it exists.
     */
    where: PlayAppInventoryWhereUniqueInput
    /**
     * In case the PlayAppInventory found by the `where` argument doesn't exist, create a new PlayAppInventory with this data.
     */
    create: XOR<PlayAppInventoryCreateInput, PlayAppInventoryUncheckedCreateInput>
    /**
     * In case the PlayAppInventory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayAppInventoryUpdateInput, PlayAppInventoryUncheckedUpdateInput>
  }

  /**
   * PlayAppInventory delete
   */
  export type PlayAppInventoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
    /**
     * Filter which PlayAppInventory to delete.
     */
    where: PlayAppInventoryWhereUniqueInput
  }

  /**
   * PlayAppInventory deleteMany
   */
  export type PlayAppInventoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayAppInventories to delete
     */
    where?: PlayAppInventoryWhereInput
  }

  /**
   * PlayAppInventory without action
   */
  export type PlayAppInventoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayAppInventory
     */
    select?: PlayAppInventorySelect<ExtArgs> | null
  }


  /**
   * Model GlobalUser
   */

  export type AggregateGlobalUser = {
    _count: GlobalUserCountAggregateOutputType | null
    _min: GlobalUserMinAggregateOutputType | null
    _max: GlobalUserMaxAggregateOutputType | null
  }

  export type GlobalUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    name: string | null
    totp_secret: string | null
    aioson_play_origin_id: string | null
    disabled_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GlobalUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    name: string | null
    totp_secret: string | null
    aioson_play_origin_id: string | null
    disabled_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GlobalUserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    name: number
    totp_secret: number
    aioson_play_origin_id: number
    disabled_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GlobalUserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    name?: true
    totp_secret?: true
    aioson_play_origin_id?: true
    disabled_at?: true
    created_at?: true
    updated_at?: true
  }

  export type GlobalUserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    name?: true
    totp_secret?: true
    aioson_play_origin_id?: true
    disabled_at?: true
    created_at?: true
    updated_at?: true
  }

  export type GlobalUserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    name?: true
    totp_secret?: true
    aioson_play_origin_id?: true
    disabled_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GlobalUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalUser to aggregate.
     */
    where?: GlobalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalUsers to fetch.
     */
    orderBy?: GlobalUserOrderByWithRelationInput | GlobalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalUsers
    **/
    _count?: true | GlobalUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalUserMaxAggregateInputType
  }

  export type GetGlobalUserAggregateType<T extends GlobalUserAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalUser[P]>
      : GetScalarType<T[P], AggregateGlobalUser[P]>
  }




  export type GlobalUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalUserWhereInput
    orderBy?: GlobalUserOrderByWithAggregationInput | GlobalUserOrderByWithAggregationInput[]
    by: GlobalUserScalarFieldEnum[] | GlobalUserScalarFieldEnum
    having?: GlobalUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalUserCountAggregateInputType | true
    _min?: GlobalUserMinAggregateInputType
    _max?: GlobalUserMaxAggregateInputType
  }

  export type GlobalUserGroupByOutputType = {
    id: string
    email: string
    password_hash: string | null
    name: string
    totp_secret: string | null
    aioson_play_origin_id: string | null
    disabled_at: Date | null
    created_at: Date
    updated_at: Date
    _count: GlobalUserCountAggregateOutputType | null
    _min: GlobalUserMinAggregateOutputType | null
    _max: GlobalUserMaxAggregateOutputType | null
  }

  type GetGlobalUserGroupByPayload<T extends GlobalUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalUserGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalUserGroupByOutputType[P]>
        }
      >
    >


  export type GlobalUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    name?: boolean
    totp_secret?: boolean
    aioson_play_origin_id?: boolean
    disabled_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    sessions?: boolean | GlobalUser$sessionsArgs<ExtArgs>
    user_roles?: boolean | GlobalUser$user_rolesArgs<ExtArgs>
    app_accesses?: boolean | GlobalUser$app_accessesArgs<ExtArgs>
    _count?: boolean | GlobalUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["globalUser"]>

  export type GlobalUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    name?: boolean
    totp_secret?: boolean
    aioson_play_origin_id?: boolean
    disabled_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["globalUser"]>

  export type GlobalUserSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    name?: boolean
    totp_secret?: boolean
    aioson_play_origin_id?: boolean
    disabled_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GlobalUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | GlobalUser$sessionsArgs<ExtArgs>
    user_roles?: boolean | GlobalUser$user_rolesArgs<ExtArgs>
    app_accesses?: boolean | GlobalUser$app_accessesArgs<ExtArgs>
    _count?: boolean | GlobalUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GlobalUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GlobalUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalUser"
    objects: {
      sessions: Prisma.$AuthSessionPayload<ExtArgs>[]
      user_roles: Prisma.$UserRolePayload<ExtArgs>[]
      app_accesses: Prisma.$AppAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password_hash: string | null
      name: string
      totp_secret: string | null
      aioson_play_origin_id: string | null
      disabled_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["globalUser"]>
    composites: {}
  }

  type GlobalUserGetPayload<S extends boolean | null | undefined | GlobalUserDefaultArgs> = $Result.GetResult<Prisma.$GlobalUserPayload, S>

  type GlobalUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GlobalUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GlobalUserCountAggregateInputType | true
    }

  export interface GlobalUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalUser'], meta: { name: 'GlobalUser' } }
    /**
     * Find zero or one GlobalUser that matches the filter.
     * @param {GlobalUserFindUniqueArgs} args - Arguments to find a GlobalUser
     * @example
     * // Get one GlobalUser
     * const globalUser = await prisma.globalUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalUserFindUniqueArgs>(args: SelectSubset<T, GlobalUserFindUniqueArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GlobalUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GlobalUserFindUniqueOrThrowArgs} args - Arguments to find a GlobalUser
     * @example
     * // Get one GlobalUser
     * const globalUser = await prisma.globalUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalUserFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GlobalUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserFindFirstArgs} args - Arguments to find a GlobalUser
     * @example
     * // Get one GlobalUser
     * const globalUser = await prisma.globalUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalUserFindFirstArgs>(args?: SelectSubset<T, GlobalUserFindFirstArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GlobalUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserFindFirstOrThrowArgs} args - Arguments to find a GlobalUser
     * @example
     * // Get one GlobalUser
     * const globalUser = await prisma.globalUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalUserFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GlobalUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalUsers
     * const globalUsers = await prisma.globalUser.findMany()
     * 
     * // Get first 10 GlobalUsers
     * const globalUsers = await prisma.globalUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalUserWithIdOnly = await prisma.globalUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalUserFindManyArgs>(args?: SelectSubset<T, GlobalUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GlobalUser.
     * @param {GlobalUserCreateArgs} args - Arguments to create a GlobalUser.
     * @example
     * // Create one GlobalUser
     * const GlobalUser = await prisma.globalUser.create({
     *   data: {
     *     // ... data to create a GlobalUser
     *   }
     * })
     * 
     */
    create<T extends GlobalUserCreateArgs>(args: SelectSubset<T, GlobalUserCreateArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GlobalUsers.
     * @param {GlobalUserCreateManyArgs} args - Arguments to create many GlobalUsers.
     * @example
     * // Create many GlobalUsers
     * const globalUser = await prisma.globalUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalUserCreateManyArgs>(args?: SelectSubset<T, GlobalUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalUsers and returns the data saved in the database.
     * @param {GlobalUserCreateManyAndReturnArgs} args - Arguments to create many GlobalUsers.
     * @example
     * // Create many GlobalUsers
     * const globalUser = await prisma.globalUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalUsers and only return the `id`
     * const globalUserWithIdOnly = await prisma.globalUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalUserCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GlobalUser.
     * @param {GlobalUserDeleteArgs} args - Arguments to delete one GlobalUser.
     * @example
     * // Delete one GlobalUser
     * const GlobalUser = await prisma.globalUser.delete({
     *   where: {
     *     // ... filter to delete one GlobalUser
     *   }
     * })
     * 
     */
    delete<T extends GlobalUserDeleteArgs>(args: SelectSubset<T, GlobalUserDeleteArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GlobalUser.
     * @param {GlobalUserUpdateArgs} args - Arguments to update one GlobalUser.
     * @example
     * // Update one GlobalUser
     * const globalUser = await prisma.globalUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalUserUpdateArgs>(args: SelectSubset<T, GlobalUserUpdateArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GlobalUsers.
     * @param {GlobalUserDeleteManyArgs} args - Arguments to filter GlobalUsers to delete.
     * @example
     * // Delete a few GlobalUsers
     * const { count } = await prisma.globalUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalUserDeleteManyArgs>(args?: SelectSubset<T, GlobalUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalUsers
     * const globalUser = await prisma.globalUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalUserUpdateManyArgs>(args: SelectSubset<T, GlobalUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalUser.
     * @param {GlobalUserUpsertArgs} args - Arguments to update or create a GlobalUser.
     * @example
     * // Update or create a GlobalUser
     * const globalUser = await prisma.globalUser.upsert({
     *   create: {
     *     // ... data to create a GlobalUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalUser we want to update
     *   }
     * })
     */
    upsert<T extends GlobalUserUpsertArgs>(args: SelectSubset<T, GlobalUserUpsertArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GlobalUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserCountArgs} args - Arguments to filter GlobalUsers to count.
     * @example
     * // Count the number of GlobalUsers
     * const count = await prisma.globalUser.count({
     *   where: {
     *     // ... the filter for the GlobalUsers we want to count
     *   }
     * })
    **/
    count<T extends GlobalUserCountArgs>(
      args?: Subset<T, GlobalUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalUserAggregateArgs>(args: Subset<T, GlobalUserAggregateArgs>): Prisma.PrismaPromise<GetGlobalUserAggregateType<T>>

    /**
     * Group by GlobalUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalUserGroupByArgs['orderBy'] }
        : { orderBy?: GlobalUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalUser model
   */
  readonly fields: GlobalUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends GlobalUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findMany"> | Null>
    user_roles<T extends GlobalUser$user_rolesArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUser$user_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany"> | Null>
    app_accesses<T extends GlobalUser$app_accessesArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUser$app_accessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalUser model
   */ 
  interface GlobalUserFieldRefs {
    readonly id: FieldRef<"GlobalUser", 'String'>
    readonly email: FieldRef<"GlobalUser", 'String'>
    readonly password_hash: FieldRef<"GlobalUser", 'String'>
    readonly name: FieldRef<"GlobalUser", 'String'>
    readonly totp_secret: FieldRef<"GlobalUser", 'String'>
    readonly aioson_play_origin_id: FieldRef<"GlobalUser", 'String'>
    readonly disabled_at: FieldRef<"GlobalUser", 'DateTime'>
    readonly created_at: FieldRef<"GlobalUser", 'DateTime'>
    readonly updated_at: FieldRef<"GlobalUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalUser findUnique
   */
  export type GlobalUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter, which GlobalUser to fetch.
     */
    where: GlobalUserWhereUniqueInput
  }

  /**
   * GlobalUser findUniqueOrThrow
   */
  export type GlobalUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter, which GlobalUser to fetch.
     */
    where: GlobalUserWhereUniqueInput
  }

  /**
   * GlobalUser findFirst
   */
  export type GlobalUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter, which GlobalUser to fetch.
     */
    where?: GlobalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalUsers to fetch.
     */
    orderBy?: GlobalUserOrderByWithRelationInput | GlobalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalUsers.
     */
    cursor?: GlobalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalUsers.
     */
    distinct?: GlobalUserScalarFieldEnum | GlobalUserScalarFieldEnum[]
  }

  /**
   * GlobalUser findFirstOrThrow
   */
  export type GlobalUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter, which GlobalUser to fetch.
     */
    where?: GlobalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalUsers to fetch.
     */
    orderBy?: GlobalUserOrderByWithRelationInput | GlobalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalUsers.
     */
    cursor?: GlobalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalUsers.
     */
    distinct?: GlobalUserScalarFieldEnum | GlobalUserScalarFieldEnum[]
  }

  /**
   * GlobalUser findMany
   */
  export type GlobalUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter, which GlobalUsers to fetch.
     */
    where?: GlobalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalUsers to fetch.
     */
    orderBy?: GlobalUserOrderByWithRelationInput | GlobalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalUsers.
     */
    cursor?: GlobalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalUsers.
     */
    skip?: number
    distinct?: GlobalUserScalarFieldEnum | GlobalUserScalarFieldEnum[]
  }

  /**
   * GlobalUser create
   */
  export type GlobalUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * The data needed to create a GlobalUser.
     */
    data: XOR<GlobalUserCreateInput, GlobalUserUncheckedCreateInput>
  }

  /**
   * GlobalUser createMany
   */
  export type GlobalUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalUsers.
     */
    data: GlobalUserCreateManyInput | GlobalUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalUser createManyAndReturn
   */
  export type GlobalUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GlobalUsers.
     */
    data: GlobalUserCreateManyInput | GlobalUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalUser update
   */
  export type GlobalUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * The data needed to update a GlobalUser.
     */
    data: XOR<GlobalUserUpdateInput, GlobalUserUncheckedUpdateInput>
    /**
     * Choose, which GlobalUser to update.
     */
    where: GlobalUserWhereUniqueInput
  }

  /**
   * GlobalUser updateMany
   */
  export type GlobalUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalUsers.
     */
    data: XOR<GlobalUserUpdateManyMutationInput, GlobalUserUncheckedUpdateManyInput>
    /**
     * Filter which GlobalUsers to update
     */
    where?: GlobalUserWhereInput
  }

  /**
   * GlobalUser upsert
   */
  export type GlobalUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * The filter to search for the GlobalUser to update in case it exists.
     */
    where: GlobalUserWhereUniqueInput
    /**
     * In case the GlobalUser found by the `where` argument doesn't exist, create a new GlobalUser with this data.
     */
    create: XOR<GlobalUserCreateInput, GlobalUserUncheckedCreateInput>
    /**
     * In case the GlobalUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalUserUpdateInput, GlobalUserUncheckedUpdateInput>
  }

  /**
   * GlobalUser delete
   */
  export type GlobalUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
    /**
     * Filter which GlobalUser to delete.
     */
    where: GlobalUserWhereUniqueInput
  }

  /**
   * GlobalUser deleteMany
   */
  export type GlobalUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalUsers to delete
     */
    where?: GlobalUserWhereInput
  }

  /**
   * GlobalUser.sessions
   */
  export type GlobalUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    where?: AuthSessionWhereInput
    orderBy?: AuthSessionOrderByWithRelationInput | AuthSessionOrderByWithRelationInput[]
    cursor?: AuthSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthSessionScalarFieldEnum | AuthSessionScalarFieldEnum[]
  }

  /**
   * GlobalUser.user_roles
   */
  export type GlobalUser$user_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * GlobalUser.app_accesses
   */
  export type GlobalUser$app_accessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    where?: AppAccessWhereInput
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    cursor?: AppAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * GlobalUser without action
   */
  export type GlobalUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalUser
     */
    select?: GlobalUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalUserInclude<ExtArgs> | null
  }


  /**
   * Model BindingPermission
   */

  export type AggregateBindingPermission = {
    _count: BindingPermissionCountAggregateOutputType | null
    _min: BindingPermissionMinAggregateOutputType | null
    _max: BindingPermissionMaxAggregateOutputType | null
  }

  export type BindingPermissionMinAggregateOutputType = {
    id: string | null
    binding_id: string | null
    name: string | null
    resource: string | null
    action: string | null
    retired_at: Date | null
    created_at: Date | null
  }

  export type BindingPermissionMaxAggregateOutputType = {
    id: string | null
    binding_id: string | null
    name: string | null
    resource: string | null
    action: string | null
    retired_at: Date | null
    created_at: Date | null
  }

  export type BindingPermissionCountAggregateOutputType = {
    id: number
    binding_id: number
    name: number
    resource: number
    action: number
    retired_at: number
    created_at: number
    _all: number
  }


  export type BindingPermissionMinAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    resource?: true
    action?: true
    retired_at?: true
    created_at?: true
  }

  export type BindingPermissionMaxAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    resource?: true
    action?: true
    retired_at?: true
    created_at?: true
  }

  export type BindingPermissionCountAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    resource?: true
    action?: true
    retired_at?: true
    created_at?: true
    _all?: true
  }

  export type BindingPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BindingPermission to aggregate.
     */
    where?: BindingPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BindingPermissions to fetch.
     */
    orderBy?: BindingPermissionOrderByWithRelationInput | BindingPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BindingPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BindingPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BindingPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BindingPermissions
    **/
    _count?: true | BindingPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BindingPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BindingPermissionMaxAggregateInputType
  }

  export type GetBindingPermissionAggregateType<T extends BindingPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateBindingPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBindingPermission[P]>
      : GetScalarType<T[P], AggregateBindingPermission[P]>
  }




  export type BindingPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BindingPermissionWhereInput
    orderBy?: BindingPermissionOrderByWithAggregationInput | BindingPermissionOrderByWithAggregationInput[]
    by: BindingPermissionScalarFieldEnum[] | BindingPermissionScalarFieldEnum
    having?: BindingPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BindingPermissionCountAggregateInputType | true
    _min?: BindingPermissionMinAggregateInputType
    _max?: BindingPermissionMaxAggregateInputType
  }

  export type BindingPermissionGroupByOutputType = {
    id: string
    binding_id: string
    name: string
    resource: string
    action: string
    retired_at: Date | null
    created_at: Date
    _count: BindingPermissionCountAggregateOutputType | null
    _min: BindingPermissionMinAggregateOutputType | null
    _max: BindingPermissionMaxAggregateOutputType | null
  }

  type GetBindingPermissionGroupByPayload<T extends BindingPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BindingPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BindingPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BindingPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], BindingPermissionGroupByOutputType[P]>
        }
      >
    >


  export type BindingPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    name?: boolean
    resource?: boolean
    action?: boolean
    retired_at?: boolean
    created_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    role_perms?: boolean | BindingPermission$role_permsArgs<ExtArgs>
    profile_perms?: boolean | BindingPermission$profile_permsArgs<ExtArgs>
    _count?: boolean | BindingPermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bindingPermission"]>

  export type BindingPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    name?: boolean
    resource?: boolean
    action?: boolean
    retired_at?: boolean
    created_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bindingPermission"]>

  export type BindingPermissionSelectScalar = {
    id?: boolean
    binding_id?: boolean
    name?: boolean
    resource?: boolean
    action?: boolean
    retired_at?: boolean
    created_at?: boolean
  }

  export type BindingPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    role_perms?: boolean | BindingPermission$role_permsArgs<ExtArgs>
    profile_perms?: boolean | BindingPermission$profile_permsArgs<ExtArgs>
    _count?: boolean | BindingPermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BindingPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
  }

  export type $BindingPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BindingPermission"
    objects: {
      binding: Prisma.$AppBindingPayload<ExtArgs>
      role_perms: Prisma.$RolePermissionPayload<ExtArgs>[]
      profile_perms: Prisma.$AppProfilePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      binding_id: string
      name: string
      resource: string
      action: string
      retired_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["bindingPermission"]>
    composites: {}
  }

  type BindingPermissionGetPayload<S extends boolean | null | undefined | BindingPermissionDefaultArgs> = $Result.GetResult<Prisma.$BindingPermissionPayload, S>

  type BindingPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BindingPermissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BindingPermissionCountAggregateInputType | true
    }

  export interface BindingPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BindingPermission'], meta: { name: 'BindingPermission' } }
    /**
     * Find zero or one BindingPermission that matches the filter.
     * @param {BindingPermissionFindUniqueArgs} args - Arguments to find a BindingPermission
     * @example
     * // Get one BindingPermission
     * const bindingPermission = await prisma.bindingPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BindingPermissionFindUniqueArgs>(args: SelectSubset<T, BindingPermissionFindUniqueArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BindingPermission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BindingPermissionFindUniqueOrThrowArgs} args - Arguments to find a BindingPermission
     * @example
     * // Get one BindingPermission
     * const bindingPermission = await prisma.bindingPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BindingPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, BindingPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BindingPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionFindFirstArgs} args - Arguments to find a BindingPermission
     * @example
     * // Get one BindingPermission
     * const bindingPermission = await prisma.bindingPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BindingPermissionFindFirstArgs>(args?: SelectSubset<T, BindingPermissionFindFirstArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BindingPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionFindFirstOrThrowArgs} args - Arguments to find a BindingPermission
     * @example
     * // Get one BindingPermission
     * const bindingPermission = await prisma.bindingPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BindingPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, BindingPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BindingPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BindingPermissions
     * const bindingPermissions = await prisma.bindingPermission.findMany()
     * 
     * // Get first 10 BindingPermissions
     * const bindingPermissions = await prisma.bindingPermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bindingPermissionWithIdOnly = await prisma.bindingPermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BindingPermissionFindManyArgs>(args?: SelectSubset<T, BindingPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BindingPermission.
     * @param {BindingPermissionCreateArgs} args - Arguments to create a BindingPermission.
     * @example
     * // Create one BindingPermission
     * const BindingPermission = await prisma.bindingPermission.create({
     *   data: {
     *     // ... data to create a BindingPermission
     *   }
     * })
     * 
     */
    create<T extends BindingPermissionCreateArgs>(args: SelectSubset<T, BindingPermissionCreateArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BindingPermissions.
     * @param {BindingPermissionCreateManyArgs} args - Arguments to create many BindingPermissions.
     * @example
     * // Create many BindingPermissions
     * const bindingPermission = await prisma.bindingPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BindingPermissionCreateManyArgs>(args?: SelectSubset<T, BindingPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BindingPermissions and returns the data saved in the database.
     * @param {BindingPermissionCreateManyAndReturnArgs} args - Arguments to create many BindingPermissions.
     * @example
     * // Create many BindingPermissions
     * const bindingPermission = await prisma.bindingPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BindingPermissions and only return the `id`
     * const bindingPermissionWithIdOnly = await prisma.bindingPermission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BindingPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, BindingPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BindingPermission.
     * @param {BindingPermissionDeleteArgs} args - Arguments to delete one BindingPermission.
     * @example
     * // Delete one BindingPermission
     * const BindingPermission = await prisma.bindingPermission.delete({
     *   where: {
     *     // ... filter to delete one BindingPermission
     *   }
     * })
     * 
     */
    delete<T extends BindingPermissionDeleteArgs>(args: SelectSubset<T, BindingPermissionDeleteArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BindingPermission.
     * @param {BindingPermissionUpdateArgs} args - Arguments to update one BindingPermission.
     * @example
     * // Update one BindingPermission
     * const bindingPermission = await prisma.bindingPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BindingPermissionUpdateArgs>(args: SelectSubset<T, BindingPermissionUpdateArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BindingPermissions.
     * @param {BindingPermissionDeleteManyArgs} args - Arguments to filter BindingPermissions to delete.
     * @example
     * // Delete a few BindingPermissions
     * const { count } = await prisma.bindingPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BindingPermissionDeleteManyArgs>(args?: SelectSubset<T, BindingPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BindingPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BindingPermissions
     * const bindingPermission = await prisma.bindingPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BindingPermissionUpdateManyArgs>(args: SelectSubset<T, BindingPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BindingPermission.
     * @param {BindingPermissionUpsertArgs} args - Arguments to update or create a BindingPermission.
     * @example
     * // Update or create a BindingPermission
     * const bindingPermission = await prisma.bindingPermission.upsert({
     *   create: {
     *     // ... data to create a BindingPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BindingPermission we want to update
     *   }
     * })
     */
    upsert<T extends BindingPermissionUpsertArgs>(args: SelectSubset<T, BindingPermissionUpsertArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BindingPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionCountArgs} args - Arguments to filter BindingPermissions to count.
     * @example
     * // Count the number of BindingPermissions
     * const count = await prisma.bindingPermission.count({
     *   where: {
     *     // ... the filter for the BindingPermissions we want to count
     *   }
     * })
    **/
    count<T extends BindingPermissionCountArgs>(
      args?: Subset<T, BindingPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BindingPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BindingPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BindingPermissionAggregateArgs>(args: Subset<T, BindingPermissionAggregateArgs>): Prisma.PrismaPromise<GetBindingPermissionAggregateType<T>>

    /**
     * Group by BindingPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BindingPermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BindingPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BindingPermissionGroupByArgs['orderBy'] }
        : { orderBy?: BindingPermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BindingPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBindingPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BindingPermission model
   */
  readonly fields: BindingPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BindingPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BindingPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    binding<T extends AppBindingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppBindingDefaultArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    role_perms<T extends BindingPermission$role_permsArgs<ExtArgs> = {}>(args?: Subset<T, BindingPermission$role_permsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany"> | Null>
    profile_perms<T extends BindingPermission$profile_permsArgs<ExtArgs> = {}>(args?: Subset<T, BindingPermission$profile_permsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BindingPermission model
   */ 
  interface BindingPermissionFieldRefs {
    readonly id: FieldRef<"BindingPermission", 'String'>
    readonly binding_id: FieldRef<"BindingPermission", 'String'>
    readonly name: FieldRef<"BindingPermission", 'String'>
    readonly resource: FieldRef<"BindingPermission", 'String'>
    readonly action: FieldRef<"BindingPermission", 'String'>
    readonly retired_at: FieldRef<"BindingPermission", 'DateTime'>
    readonly created_at: FieldRef<"BindingPermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BindingPermission findUnique
   */
  export type BindingPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter, which BindingPermission to fetch.
     */
    where: BindingPermissionWhereUniqueInput
  }

  /**
   * BindingPermission findUniqueOrThrow
   */
  export type BindingPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter, which BindingPermission to fetch.
     */
    where: BindingPermissionWhereUniqueInput
  }

  /**
   * BindingPermission findFirst
   */
  export type BindingPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter, which BindingPermission to fetch.
     */
    where?: BindingPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BindingPermissions to fetch.
     */
    orderBy?: BindingPermissionOrderByWithRelationInput | BindingPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BindingPermissions.
     */
    cursor?: BindingPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BindingPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BindingPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BindingPermissions.
     */
    distinct?: BindingPermissionScalarFieldEnum | BindingPermissionScalarFieldEnum[]
  }

  /**
   * BindingPermission findFirstOrThrow
   */
  export type BindingPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter, which BindingPermission to fetch.
     */
    where?: BindingPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BindingPermissions to fetch.
     */
    orderBy?: BindingPermissionOrderByWithRelationInput | BindingPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BindingPermissions.
     */
    cursor?: BindingPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BindingPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BindingPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BindingPermissions.
     */
    distinct?: BindingPermissionScalarFieldEnum | BindingPermissionScalarFieldEnum[]
  }

  /**
   * BindingPermission findMany
   */
  export type BindingPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter, which BindingPermissions to fetch.
     */
    where?: BindingPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BindingPermissions to fetch.
     */
    orderBy?: BindingPermissionOrderByWithRelationInput | BindingPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BindingPermissions.
     */
    cursor?: BindingPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BindingPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BindingPermissions.
     */
    skip?: number
    distinct?: BindingPermissionScalarFieldEnum | BindingPermissionScalarFieldEnum[]
  }

  /**
   * BindingPermission create
   */
  export type BindingPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a BindingPermission.
     */
    data: XOR<BindingPermissionCreateInput, BindingPermissionUncheckedCreateInput>
  }

  /**
   * BindingPermission createMany
   */
  export type BindingPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BindingPermissions.
     */
    data: BindingPermissionCreateManyInput | BindingPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BindingPermission createManyAndReturn
   */
  export type BindingPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BindingPermissions.
     */
    data: BindingPermissionCreateManyInput | BindingPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BindingPermission update
   */
  export type BindingPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a BindingPermission.
     */
    data: XOR<BindingPermissionUpdateInput, BindingPermissionUncheckedUpdateInput>
    /**
     * Choose, which BindingPermission to update.
     */
    where: BindingPermissionWhereUniqueInput
  }

  /**
   * BindingPermission updateMany
   */
  export type BindingPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BindingPermissions.
     */
    data: XOR<BindingPermissionUpdateManyMutationInput, BindingPermissionUncheckedUpdateManyInput>
    /**
     * Filter which BindingPermissions to update
     */
    where?: BindingPermissionWhereInput
  }

  /**
   * BindingPermission upsert
   */
  export type BindingPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the BindingPermission to update in case it exists.
     */
    where: BindingPermissionWhereUniqueInput
    /**
     * In case the BindingPermission found by the `where` argument doesn't exist, create a new BindingPermission with this data.
     */
    create: XOR<BindingPermissionCreateInput, BindingPermissionUncheckedCreateInput>
    /**
     * In case the BindingPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BindingPermissionUpdateInput, BindingPermissionUncheckedUpdateInput>
  }

  /**
   * BindingPermission delete
   */
  export type BindingPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
    /**
     * Filter which BindingPermission to delete.
     */
    where: BindingPermissionWhereUniqueInput
  }

  /**
   * BindingPermission deleteMany
   */
  export type BindingPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BindingPermissions to delete
     */
    where?: BindingPermissionWhereInput
  }

  /**
   * BindingPermission.role_perms
   */
  export type BindingPermission$role_permsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * BindingPermission.profile_perms
   */
  export type BindingPermission$profile_permsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    where?: AppProfilePermissionWhereInput
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    cursor?: AppProfilePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppProfilePermissionScalarFieldEnum | AppProfilePermissionScalarFieldEnum[]
  }

  /**
   * BindingPermission without action
   */
  export type BindingPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BindingPermission
     */
    select?: BindingPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BindingPermissionInclude<ExtArgs> | null
  }


  /**
   * Model AppProfile
   */

  export type AggregateAppProfile = {
    _count: AppProfileCountAggregateOutputType | null
    _min: AppProfileMinAggregateOutputType | null
    _max: AppProfileMaxAggregateOutputType | null
  }

  export type AppProfileMinAggregateOutputType = {
    id: string | null
    binding_id: string | null
    name: string | null
    description: string | null
    is_system: boolean | null
    is_migration_generated: boolean | null
    archived_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppProfileMaxAggregateOutputType = {
    id: string | null
    binding_id: string | null
    name: string | null
    description: string | null
    is_system: boolean | null
    is_migration_generated: boolean | null
    archived_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppProfileCountAggregateOutputType = {
    id: number
    binding_id: number
    name: number
    description: number
    is_system: number
    is_migration_generated: number
    archived_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppProfileMinAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    description?: true
    is_system?: true
    is_migration_generated?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
  }

  export type AppProfileMaxAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    description?: true
    is_system?: true
    is_migration_generated?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
  }

  export type AppProfileCountAggregateInputType = {
    id?: true
    binding_id?: true
    name?: true
    description?: true
    is_system?: true
    is_migration_generated?: true
    archived_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppProfile to aggregate.
     */
    where?: AppProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfiles to fetch.
     */
    orderBy?: AppProfileOrderByWithRelationInput | AppProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppProfiles
    **/
    _count?: true | AppProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppProfileMaxAggregateInputType
  }

  export type GetAppProfileAggregateType<T extends AppProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAppProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppProfile[P]>
      : GetScalarType<T[P], AggregateAppProfile[P]>
  }




  export type AppProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppProfileWhereInput
    orderBy?: AppProfileOrderByWithAggregationInput | AppProfileOrderByWithAggregationInput[]
    by: AppProfileScalarFieldEnum[] | AppProfileScalarFieldEnum
    having?: AppProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppProfileCountAggregateInputType | true
    _min?: AppProfileMinAggregateInputType
    _max?: AppProfileMaxAggregateInputType
  }

  export type AppProfileGroupByOutputType = {
    id: string
    binding_id: string
    name: string
    description: string
    is_system: boolean
    is_migration_generated: boolean
    archived_at: Date | null
    created_at: Date
    updated_at: Date
    _count: AppProfileCountAggregateOutputType | null
    _min: AppProfileMinAggregateOutputType | null
    _max: AppProfileMaxAggregateOutputType | null
  }

  type GetAppProfileGroupByPayload<T extends AppProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AppProfileGroupByOutputType[P]>
        }
      >
    >


  export type AppProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    name?: boolean
    description?: boolean
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    permissions?: boolean | AppProfile$permissionsArgs<ExtArgs>
    accesses?: boolean | AppProfile$accessesArgs<ExtArgs>
    _count?: boolean | AppProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appProfile"]>

  export type AppProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    name?: boolean
    description?: boolean
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appProfile"]>

  export type AppProfileSelectScalar = {
    id?: boolean
    binding_id?: boolean
    name?: boolean
    description?: boolean
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AppProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    permissions?: boolean | AppProfile$permissionsArgs<ExtArgs>
    accesses?: boolean | AppProfile$accessesArgs<ExtArgs>
    _count?: boolean | AppProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
  }

  export type $AppProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppProfile"
    objects: {
      binding: Prisma.$AppBindingPayload<ExtArgs>
      permissions: Prisma.$AppProfilePermissionPayload<ExtArgs>[]
      accesses: Prisma.$AppAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      binding_id: string
      name: string
      description: string
      is_system: boolean
      is_migration_generated: boolean
      archived_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appProfile"]>
    composites: {}
  }

  type AppProfileGetPayload<S extends boolean | null | undefined | AppProfileDefaultArgs> = $Result.GetResult<Prisma.$AppProfilePayload, S>

  type AppProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppProfileCountAggregateInputType | true
    }

  export interface AppProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppProfile'], meta: { name: 'AppProfile' } }
    /**
     * Find zero or one AppProfile that matches the filter.
     * @param {AppProfileFindUniqueArgs} args - Arguments to find a AppProfile
     * @example
     * // Get one AppProfile
     * const appProfile = await prisma.appProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppProfileFindUniqueArgs>(args: SelectSubset<T, AppProfileFindUniqueArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppProfileFindUniqueOrThrowArgs} args - Arguments to find a AppProfile
     * @example
     * // Get one AppProfile
     * const appProfile = await prisma.appProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AppProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileFindFirstArgs} args - Arguments to find a AppProfile
     * @example
     * // Get one AppProfile
     * const appProfile = await prisma.appProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppProfileFindFirstArgs>(args?: SelectSubset<T, AppProfileFindFirstArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileFindFirstOrThrowArgs} args - Arguments to find a AppProfile
     * @example
     * // Get one AppProfile
     * const appProfile = await prisma.appProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AppProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppProfiles
     * const appProfiles = await prisma.appProfile.findMany()
     * 
     * // Get first 10 AppProfiles
     * const appProfiles = await prisma.appProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appProfileWithIdOnly = await prisma.appProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppProfileFindManyArgs>(args?: SelectSubset<T, AppProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppProfile.
     * @param {AppProfileCreateArgs} args - Arguments to create a AppProfile.
     * @example
     * // Create one AppProfile
     * const AppProfile = await prisma.appProfile.create({
     *   data: {
     *     // ... data to create a AppProfile
     *   }
     * })
     * 
     */
    create<T extends AppProfileCreateArgs>(args: SelectSubset<T, AppProfileCreateArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppProfiles.
     * @param {AppProfileCreateManyArgs} args - Arguments to create many AppProfiles.
     * @example
     * // Create many AppProfiles
     * const appProfile = await prisma.appProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppProfileCreateManyArgs>(args?: SelectSubset<T, AppProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppProfiles and returns the data saved in the database.
     * @param {AppProfileCreateManyAndReturnArgs} args - Arguments to create many AppProfiles.
     * @example
     * // Create many AppProfiles
     * const appProfile = await prisma.appProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppProfiles and only return the `id`
     * const appProfileWithIdOnly = await prisma.appProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AppProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppProfile.
     * @param {AppProfileDeleteArgs} args - Arguments to delete one AppProfile.
     * @example
     * // Delete one AppProfile
     * const AppProfile = await prisma.appProfile.delete({
     *   where: {
     *     // ... filter to delete one AppProfile
     *   }
     * })
     * 
     */
    delete<T extends AppProfileDeleteArgs>(args: SelectSubset<T, AppProfileDeleteArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppProfile.
     * @param {AppProfileUpdateArgs} args - Arguments to update one AppProfile.
     * @example
     * // Update one AppProfile
     * const appProfile = await prisma.appProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppProfileUpdateArgs>(args: SelectSubset<T, AppProfileUpdateArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppProfiles.
     * @param {AppProfileDeleteManyArgs} args - Arguments to filter AppProfiles to delete.
     * @example
     * // Delete a few AppProfiles
     * const { count } = await prisma.appProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppProfileDeleteManyArgs>(args?: SelectSubset<T, AppProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppProfiles
     * const appProfile = await prisma.appProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppProfileUpdateManyArgs>(args: SelectSubset<T, AppProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppProfile.
     * @param {AppProfileUpsertArgs} args - Arguments to update or create a AppProfile.
     * @example
     * // Update or create a AppProfile
     * const appProfile = await prisma.appProfile.upsert({
     *   create: {
     *     // ... data to create a AppProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppProfile we want to update
     *   }
     * })
     */
    upsert<T extends AppProfileUpsertArgs>(args: SelectSubset<T, AppProfileUpsertArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileCountArgs} args - Arguments to filter AppProfiles to count.
     * @example
     * // Count the number of AppProfiles
     * const count = await prisma.appProfile.count({
     *   where: {
     *     // ... the filter for the AppProfiles we want to count
     *   }
     * })
    **/
    count<T extends AppProfileCountArgs>(
      args?: Subset<T, AppProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppProfileAggregateArgs>(args: Subset<T, AppProfileAggregateArgs>): Prisma.PrismaPromise<GetAppProfileAggregateType<T>>

    /**
     * Group by AppProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppProfileGroupByArgs['orderBy'] }
        : { orderBy?: AppProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppProfile model
   */
  readonly fields: AppProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    binding<T extends AppBindingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppBindingDefaultArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    permissions<T extends AppProfile$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, AppProfile$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findMany"> | Null>
    accesses<T extends AppProfile$accessesArgs<ExtArgs> = {}>(args?: Subset<T, AppProfile$accessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppProfile model
   */ 
  interface AppProfileFieldRefs {
    readonly id: FieldRef<"AppProfile", 'String'>
    readonly binding_id: FieldRef<"AppProfile", 'String'>
    readonly name: FieldRef<"AppProfile", 'String'>
    readonly description: FieldRef<"AppProfile", 'String'>
    readonly is_system: FieldRef<"AppProfile", 'Boolean'>
    readonly is_migration_generated: FieldRef<"AppProfile", 'Boolean'>
    readonly archived_at: FieldRef<"AppProfile", 'DateTime'>
    readonly created_at: FieldRef<"AppProfile", 'DateTime'>
    readonly updated_at: FieldRef<"AppProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppProfile findUnique
   */
  export type AppProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter, which AppProfile to fetch.
     */
    where: AppProfileWhereUniqueInput
  }

  /**
   * AppProfile findUniqueOrThrow
   */
  export type AppProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter, which AppProfile to fetch.
     */
    where: AppProfileWhereUniqueInput
  }

  /**
   * AppProfile findFirst
   */
  export type AppProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter, which AppProfile to fetch.
     */
    where?: AppProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfiles to fetch.
     */
    orderBy?: AppProfileOrderByWithRelationInput | AppProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppProfiles.
     */
    cursor?: AppProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppProfiles.
     */
    distinct?: AppProfileScalarFieldEnum | AppProfileScalarFieldEnum[]
  }

  /**
   * AppProfile findFirstOrThrow
   */
  export type AppProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter, which AppProfile to fetch.
     */
    where?: AppProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfiles to fetch.
     */
    orderBy?: AppProfileOrderByWithRelationInput | AppProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppProfiles.
     */
    cursor?: AppProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppProfiles.
     */
    distinct?: AppProfileScalarFieldEnum | AppProfileScalarFieldEnum[]
  }

  /**
   * AppProfile findMany
   */
  export type AppProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter, which AppProfiles to fetch.
     */
    where?: AppProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfiles to fetch.
     */
    orderBy?: AppProfileOrderByWithRelationInput | AppProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppProfiles.
     */
    cursor?: AppProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfiles.
     */
    skip?: number
    distinct?: AppProfileScalarFieldEnum | AppProfileScalarFieldEnum[]
  }

  /**
   * AppProfile create
   */
  export type AppProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AppProfile.
     */
    data: XOR<AppProfileCreateInput, AppProfileUncheckedCreateInput>
  }

  /**
   * AppProfile createMany
   */
  export type AppProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppProfiles.
     */
    data: AppProfileCreateManyInput | AppProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppProfile createManyAndReturn
   */
  export type AppProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppProfiles.
     */
    data: AppProfileCreateManyInput | AppProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppProfile update
   */
  export type AppProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AppProfile.
     */
    data: XOR<AppProfileUpdateInput, AppProfileUncheckedUpdateInput>
    /**
     * Choose, which AppProfile to update.
     */
    where: AppProfileWhereUniqueInput
  }

  /**
   * AppProfile updateMany
   */
  export type AppProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppProfiles.
     */
    data: XOR<AppProfileUpdateManyMutationInput, AppProfileUncheckedUpdateManyInput>
    /**
     * Filter which AppProfiles to update
     */
    where?: AppProfileWhereInput
  }

  /**
   * AppProfile upsert
   */
  export type AppProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AppProfile to update in case it exists.
     */
    where: AppProfileWhereUniqueInput
    /**
     * In case the AppProfile found by the `where` argument doesn't exist, create a new AppProfile with this data.
     */
    create: XOR<AppProfileCreateInput, AppProfileUncheckedCreateInput>
    /**
     * In case the AppProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppProfileUpdateInput, AppProfileUncheckedUpdateInput>
  }

  /**
   * AppProfile delete
   */
  export type AppProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
    /**
     * Filter which AppProfile to delete.
     */
    where: AppProfileWhereUniqueInput
  }

  /**
   * AppProfile deleteMany
   */
  export type AppProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppProfiles to delete
     */
    where?: AppProfileWhereInput
  }

  /**
   * AppProfile.permissions
   */
  export type AppProfile$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    where?: AppProfilePermissionWhereInput
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    cursor?: AppProfilePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppProfilePermissionScalarFieldEnum | AppProfilePermissionScalarFieldEnum[]
  }

  /**
   * AppProfile.accesses
   */
  export type AppProfile$accessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    where?: AppAccessWhereInput
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    cursor?: AppAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * AppProfile without action
   */
  export type AppProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfile
     */
    select?: AppProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfileInclude<ExtArgs> | null
  }


  /**
   * Model AppProfilePermission
   */

  export type AggregateAppProfilePermission = {
    _count: AppProfilePermissionCountAggregateOutputType | null
    _min: AppProfilePermissionMinAggregateOutputType | null
    _max: AppProfilePermissionMaxAggregateOutputType | null
  }

  export type AppProfilePermissionMinAggregateOutputType = {
    id: string | null
    profile_id: string | null
    permission_id: string | null
    created_at: Date | null
  }

  export type AppProfilePermissionMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    permission_id: string | null
    created_at: Date | null
  }

  export type AppProfilePermissionCountAggregateOutputType = {
    id: number
    profile_id: number
    permission_id: number
    created_at: number
    _all: number
  }


  export type AppProfilePermissionMinAggregateInputType = {
    id?: true
    profile_id?: true
    permission_id?: true
    created_at?: true
  }

  export type AppProfilePermissionMaxAggregateInputType = {
    id?: true
    profile_id?: true
    permission_id?: true
    created_at?: true
  }

  export type AppProfilePermissionCountAggregateInputType = {
    id?: true
    profile_id?: true
    permission_id?: true
    created_at?: true
    _all?: true
  }

  export type AppProfilePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppProfilePermission to aggregate.
     */
    where?: AppProfilePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfilePermissions to fetch.
     */
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppProfilePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfilePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfilePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppProfilePermissions
    **/
    _count?: true | AppProfilePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppProfilePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppProfilePermissionMaxAggregateInputType
  }

  export type GetAppProfilePermissionAggregateType<T extends AppProfilePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateAppProfilePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppProfilePermission[P]>
      : GetScalarType<T[P], AggregateAppProfilePermission[P]>
  }




  export type AppProfilePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppProfilePermissionWhereInput
    orderBy?: AppProfilePermissionOrderByWithAggregationInput | AppProfilePermissionOrderByWithAggregationInput[]
    by: AppProfilePermissionScalarFieldEnum[] | AppProfilePermissionScalarFieldEnum
    having?: AppProfilePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppProfilePermissionCountAggregateInputType | true
    _min?: AppProfilePermissionMinAggregateInputType
    _max?: AppProfilePermissionMaxAggregateInputType
  }

  export type AppProfilePermissionGroupByOutputType = {
    id: string
    profile_id: string
    permission_id: string
    created_at: Date
    _count: AppProfilePermissionCountAggregateOutputType | null
    _min: AppProfilePermissionMinAggregateOutputType | null
    _max: AppProfilePermissionMaxAggregateOutputType | null
  }

  type GetAppProfilePermissionGroupByPayload<T extends AppProfilePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppProfilePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppProfilePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppProfilePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], AppProfilePermissionGroupByOutputType[P]>
        }
      >
    >


  export type AppProfilePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    permission_id?: boolean
    created_at?: boolean
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appProfilePermission"]>

  export type AppProfilePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    permission_id?: boolean
    created_at?: boolean
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appProfilePermission"]>

  export type AppProfilePermissionSelectScalar = {
    id?: boolean
    profile_id?: boolean
    permission_id?: boolean
    created_at?: boolean
  }

  export type AppProfilePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }
  export type AppProfilePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }

  export type $AppProfilePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppProfilePermission"
    objects: {
      profile: Prisma.$AppProfilePayload<ExtArgs>
      permission: Prisma.$BindingPermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
      permission_id: string
      created_at: Date
    }, ExtArgs["result"]["appProfilePermission"]>
    composites: {}
  }

  type AppProfilePermissionGetPayload<S extends boolean | null | undefined | AppProfilePermissionDefaultArgs> = $Result.GetResult<Prisma.$AppProfilePermissionPayload, S>

  type AppProfilePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppProfilePermissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppProfilePermissionCountAggregateInputType | true
    }

  export interface AppProfilePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppProfilePermission'], meta: { name: 'AppProfilePermission' } }
    /**
     * Find zero or one AppProfilePermission that matches the filter.
     * @param {AppProfilePermissionFindUniqueArgs} args - Arguments to find a AppProfilePermission
     * @example
     * // Get one AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppProfilePermissionFindUniqueArgs>(args: SelectSubset<T, AppProfilePermissionFindUniqueArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppProfilePermission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppProfilePermissionFindUniqueOrThrowArgs} args - Arguments to find a AppProfilePermission
     * @example
     * // Get one AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppProfilePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, AppProfilePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppProfilePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionFindFirstArgs} args - Arguments to find a AppProfilePermission
     * @example
     * // Get one AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppProfilePermissionFindFirstArgs>(args?: SelectSubset<T, AppProfilePermissionFindFirstArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppProfilePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionFindFirstOrThrowArgs} args - Arguments to find a AppProfilePermission
     * @example
     * // Get one AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppProfilePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, AppProfilePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppProfilePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppProfilePermissions
     * const appProfilePermissions = await prisma.appProfilePermission.findMany()
     * 
     * // Get first 10 AppProfilePermissions
     * const appProfilePermissions = await prisma.appProfilePermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appProfilePermissionWithIdOnly = await prisma.appProfilePermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppProfilePermissionFindManyArgs>(args?: SelectSubset<T, AppProfilePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppProfilePermission.
     * @param {AppProfilePermissionCreateArgs} args - Arguments to create a AppProfilePermission.
     * @example
     * // Create one AppProfilePermission
     * const AppProfilePermission = await prisma.appProfilePermission.create({
     *   data: {
     *     // ... data to create a AppProfilePermission
     *   }
     * })
     * 
     */
    create<T extends AppProfilePermissionCreateArgs>(args: SelectSubset<T, AppProfilePermissionCreateArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppProfilePermissions.
     * @param {AppProfilePermissionCreateManyArgs} args - Arguments to create many AppProfilePermissions.
     * @example
     * // Create many AppProfilePermissions
     * const appProfilePermission = await prisma.appProfilePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppProfilePermissionCreateManyArgs>(args?: SelectSubset<T, AppProfilePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppProfilePermissions and returns the data saved in the database.
     * @param {AppProfilePermissionCreateManyAndReturnArgs} args - Arguments to create many AppProfilePermissions.
     * @example
     * // Create many AppProfilePermissions
     * const appProfilePermission = await prisma.appProfilePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppProfilePermissions and only return the `id`
     * const appProfilePermissionWithIdOnly = await prisma.appProfilePermission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppProfilePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, AppProfilePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppProfilePermission.
     * @param {AppProfilePermissionDeleteArgs} args - Arguments to delete one AppProfilePermission.
     * @example
     * // Delete one AppProfilePermission
     * const AppProfilePermission = await prisma.appProfilePermission.delete({
     *   where: {
     *     // ... filter to delete one AppProfilePermission
     *   }
     * })
     * 
     */
    delete<T extends AppProfilePermissionDeleteArgs>(args: SelectSubset<T, AppProfilePermissionDeleteArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppProfilePermission.
     * @param {AppProfilePermissionUpdateArgs} args - Arguments to update one AppProfilePermission.
     * @example
     * // Update one AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppProfilePermissionUpdateArgs>(args: SelectSubset<T, AppProfilePermissionUpdateArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppProfilePermissions.
     * @param {AppProfilePermissionDeleteManyArgs} args - Arguments to filter AppProfilePermissions to delete.
     * @example
     * // Delete a few AppProfilePermissions
     * const { count } = await prisma.appProfilePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppProfilePermissionDeleteManyArgs>(args?: SelectSubset<T, AppProfilePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppProfilePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppProfilePermissions
     * const appProfilePermission = await prisma.appProfilePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppProfilePermissionUpdateManyArgs>(args: SelectSubset<T, AppProfilePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppProfilePermission.
     * @param {AppProfilePermissionUpsertArgs} args - Arguments to update or create a AppProfilePermission.
     * @example
     * // Update or create a AppProfilePermission
     * const appProfilePermission = await prisma.appProfilePermission.upsert({
     *   create: {
     *     // ... data to create a AppProfilePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppProfilePermission we want to update
     *   }
     * })
     */
    upsert<T extends AppProfilePermissionUpsertArgs>(args: SelectSubset<T, AppProfilePermissionUpsertArgs<ExtArgs>>): Prisma__AppProfilePermissionClient<$Result.GetResult<Prisma.$AppProfilePermissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppProfilePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionCountArgs} args - Arguments to filter AppProfilePermissions to count.
     * @example
     * // Count the number of AppProfilePermissions
     * const count = await prisma.appProfilePermission.count({
     *   where: {
     *     // ... the filter for the AppProfilePermissions we want to count
     *   }
     * })
    **/
    count<T extends AppProfilePermissionCountArgs>(
      args?: Subset<T, AppProfilePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppProfilePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppProfilePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppProfilePermissionAggregateArgs>(args: Subset<T, AppProfilePermissionAggregateArgs>): Prisma.PrismaPromise<GetAppProfilePermissionAggregateType<T>>

    /**
     * Group by AppProfilePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppProfilePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppProfilePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppProfilePermissionGroupByArgs['orderBy'] }
        : { orderBy?: AppProfilePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppProfilePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppProfilePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppProfilePermission model
   */
  readonly fields: AppProfilePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppProfilePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppProfilePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends AppProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppProfileDefaultArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    permission<T extends BindingPermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BindingPermissionDefaultArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppProfilePermission model
   */ 
  interface AppProfilePermissionFieldRefs {
    readonly id: FieldRef<"AppProfilePermission", 'String'>
    readonly profile_id: FieldRef<"AppProfilePermission", 'String'>
    readonly permission_id: FieldRef<"AppProfilePermission", 'String'>
    readonly created_at: FieldRef<"AppProfilePermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppProfilePermission findUnique
   */
  export type AppProfilePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter, which AppProfilePermission to fetch.
     */
    where: AppProfilePermissionWhereUniqueInput
  }

  /**
   * AppProfilePermission findUniqueOrThrow
   */
  export type AppProfilePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter, which AppProfilePermission to fetch.
     */
    where: AppProfilePermissionWhereUniqueInput
  }

  /**
   * AppProfilePermission findFirst
   */
  export type AppProfilePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter, which AppProfilePermission to fetch.
     */
    where?: AppProfilePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfilePermissions to fetch.
     */
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppProfilePermissions.
     */
    cursor?: AppProfilePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfilePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfilePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppProfilePermissions.
     */
    distinct?: AppProfilePermissionScalarFieldEnum | AppProfilePermissionScalarFieldEnum[]
  }

  /**
   * AppProfilePermission findFirstOrThrow
   */
  export type AppProfilePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter, which AppProfilePermission to fetch.
     */
    where?: AppProfilePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfilePermissions to fetch.
     */
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppProfilePermissions.
     */
    cursor?: AppProfilePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfilePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfilePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppProfilePermissions.
     */
    distinct?: AppProfilePermissionScalarFieldEnum | AppProfilePermissionScalarFieldEnum[]
  }

  /**
   * AppProfilePermission findMany
   */
  export type AppProfilePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter, which AppProfilePermissions to fetch.
     */
    where?: AppProfilePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppProfilePermissions to fetch.
     */
    orderBy?: AppProfilePermissionOrderByWithRelationInput | AppProfilePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppProfilePermissions.
     */
    cursor?: AppProfilePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppProfilePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppProfilePermissions.
     */
    skip?: number
    distinct?: AppProfilePermissionScalarFieldEnum | AppProfilePermissionScalarFieldEnum[]
  }

  /**
   * AppProfilePermission create
   */
  export type AppProfilePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a AppProfilePermission.
     */
    data: XOR<AppProfilePermissionCreateInput, AppProfilePermissionUncheckedCreateInput>
  }

  /**
   * AppProfilePermission createMany
   */
  export type AppProfilePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppProfilePermissions.
     */
    data: AppProfilePermissionCreateManyInput | AppProfilePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppProfilePermission createManyAndReturn
   */
  export type AppProfilePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppProfilePermissions.
     */
    data: AppProfilePermissionCreateManyInput | AppProfilePermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppProfilePermission update
   */
  export type AppProfilePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a AppProfilePermission.
     */
    data: XOR<AppProfilePermissionUpdateInput, AppProfilePermissionUncheckedUpdateInput>
    /**
     * Choose, which AppProfilePermission to update.
     */
    where: AppProfilePermissionWhereUniqueInput
  }

  /**
   * AppProfilePermission updateMany
   */
  export type AppProfilePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppProfilePermissions.
     */
    data: XOR<AppProfilePermissionUpdateManyMutationInput, AppProfilePermissionUncheckedUpdateManyInput>
    /**
     * Filter which AppProfilePermissions to update
     */
    where?: AppProfilePermissionWhereInput
  }

  /**
   * AppProfilePermission upsert
   */
  export type AppProfilePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the AppProfilePermission to update in case it exists.
     */
    where: AppProfilePermissionWhereUniqueInput
    /**
     * In case the AppProfilePermission found by the `where` argument doesn't exist, create a new AppProfilePermission with this data.
     */
    create: XOR<AppProfilePermissionCreateInput, AppProfilePermissionUncheckedCreateInput>
    /**
     * In case the AppProfilePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppProfilePermissionUpdateInput, AppProfilePermissionUncheckedUpdateInput>
  }

  /**
   * AppProfilePermission delete
   */
  export type AppProfilePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
    /**
     * Filter which AppProfilePermission to delete.
     */
    where: AppProfilePermissionWhereUniqueInput
  }

  /**
   * AppProfilePermission deleteMany
   */
  export type AppProfilePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppProfilePermissions to delete
     */
    where?: AppProfilePermissionWhereInput
  }

  /**
   * AppProfilePermission without action
   */
  export type AppProfilePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppProfilePermission
     */
    select?: AppProfilePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppProfilePermissionInclude<ExtArgs> | null
  }


  /**
   * Model AppAccess
   */

  export type AggregateAppAccess = {
    _count: AppAccessCountAggregateOutputType | null
    _min: AppAccessMinAggregateOutputType | null
    _max: AppAccessMaxAggregateOutputType | null
  }

  export type AppAccessMinAggregateOutputType = {
    id: string | null
    binding_id: string | null
    user_id: string | null
    profile_id: string | null
    status: string | null
    aioson_play_origin_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppAccessMaxAggregateOutputType = {
    id: string | null
    binding_id: string | null
    user_id: string | null
    profile_id: string | null
    status: string | null
    aioson_play_origin_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppAccessCountAggregateOutputType = {
    id: number
    binding_id: number
    user_id: number
    profile_id: number
    status: number
    aioson_play_origin_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppAccessMinAggregateInputType = {
    id?: true
    binding_id?: true
    user_id?: true
    profile_id?: true
    status?: true
    aioson_play_origin_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AppAccessMaxAggregateInputType = {
    id?: true
    binding_id?: true
    user_id?: true
    profile_id?: true
    status?: true
    aioson_play_origin_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AppAccessCountAggregateInputType = {
    id?: true
    binding_id?: true
    user_id?: true
    profile_id?: true
    status?: true
    aioson_play_origin_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppAccess to aggregate.
     */
    where?: AppAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppAccesses to fetch.
     */
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppAccesses
    **/
    _count?: true | AppAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppAccessMaxAggregateInputType
  }

  export type GetAppAccessAggregateType<T extends AppAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateAppAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppAccess[P]>
      : GetScalarType<T[P], AggregateAppAccess[P]>
  }




  export type AppAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppAccessWhereInput
    orderBy?: AppAccessOrderByWithAggregationInput | AppAccessOrderByWithAggregationInput[]
    by: AppAccessScalarFieldEnum[] | AppAccessScalarFieldEnum
    having?: AppAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppAccessCountAggregateInputType | true
    _min?: AppAccessMinAggregateInputType
    _max?: AppAccessMaxAggregateInputType
  }

  export type AppAccessGroupByOutputType = {
    id: string
    binding_id: string
    user_id: string
    profile_id: string
    status: string
    aioson_play_origin_id: string | null
    created_at: Date
    updated_at: Date
    _count: AppAccessCountAggregateOutputType | null
    _min: AppAccessMinAggregateOutputType | null
    _max: AppAccessMaxAggregateOutputType | null
  }

  type GetAppAccessGroupByPayload<T extends AppAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppAccessGroupByOutputType[P]>
            : GetScalarType<T[P], AppAccessGroupByOutputType[P]>
        }
      >
    >


  export type AppAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    user_id?: boolean
    profile_id?: boolean
    status?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appAccess"]>

  export type AppAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    binding_id?: boolean
    user_id?: boolean
    profile_id?: boolean
    status?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appAccess"]>

  export type AppAccessSelectScalar = {
    id?: boolean
    binding_id?: boolean
    user_id?: boolean
    profile_id?: boolean
    status?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AppAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
  }
  export type AppAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binding?: boolean | AppBindingDefaultArgs<ExtArgs>
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    profile?: boolean | AppProfileDefaultArgs<ExtArgs>
  }

  export type $AppAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppAccess"
    objects: {
      binding: Prisma.$AppBindingPayload<ExtArgs>
      user: Prisma.$GlobalUserPayload<ExtArgs>
      profile: Prisma.$AppProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      binding_id: string
      user_id: string
      profile_id: string
      status: string
      aioson_play_origin_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appAccess"]>
    composites: {}
  }

  type AppAccessGetPayload<S extends boolean | null | undefined | AppAccessDefaultArgs> = $Result.GetResult<Prisma.$AppAccessPayload, S>

  type AppAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppAccessFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppAccessCountAggregateInputType | true
    }

  export interface AppAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppAccess'], meta: { name: 'AppAccess' } }
    /**
     * Find zero or one AppAccess that matches the filter.
     * @param {AppAccessFindUniqueArgs} args - Arguments to find a AppAccess
     * @example
     * // Get one AppAccess
     * const appAccess = await prisma.appAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppAccessFindUniqueArgs>(args: SelectSubset<T, AppAccessFindUniqueArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppAccess that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppAccessFindUniqueOrThrowArgs} args - Arguments to find a AppAccess
     * @example
     * // Get one AppAccess
     * const appAccess = await prisma.appAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, AppAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessFindFirstArgs} args - Arguments to find a AppAccess
     * @example
     * // Get one AppAccess
     * const appAccess = await prisma.appAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppAccessFindFirstArgs>(args?: SelectSubset<T, AppAccessFindFirstArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessFindFirstOrThrowArgs} args - Arguments to find a AppAccess
     * @example
     * // Get one AppAccess
     * const appAccess = await prisma.appAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, AppAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppAccesses
     * const appAccesses = await prisma.appAccess.findMany()
     * 
     * // Get first 10 AppAccesses
     * const appAccesses = await prisma.appAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appAccessWithIdOnly = await prisma.appAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppAccessFindManyArgs>(args?: SelectSubset<T, AppAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppAccess.
     * @param {AppAccessCreateArgs} args - Arguments to create a AppAccess.
     * @example
     * // Create one AppAccess
     * const AppAccess = await prisma.appAccess.create({
     *   data: {
     *     // ... data to create a AppAccess
     *   }
     * })
     * 
     */
    create<T extends AppAccessCreateArgs>(args: SelectSubset<T, AppAccessCreateArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppAccesses.
     * @param {AppAccessCreateManyArgs} args - Arguments to create many AppAccesses.
     * @example
     * // Create many AppAccesses
     * const appAccess = await prisma.appAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppAccessCreateManyArgs>(args?: SelectSubset<T, AppAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppAccesses and returns the data saved in the database.
     * @param {AppAccessCreateManyAndReturnArgs} args - Arguments to create many AppAccesses.
     * @example
     * // Create many AppAccesses
     * const appAccess = await prisma.appAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppAccesses and only return the `id`
     * const appAccessWithIdOnly = await prisma.appAccess.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, AppAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppAccess.
     * @param {AppAccessDeleteArgs} args - Arguments to delete one AppAccess.
     * @example
     * // Delete one AppAccess
     * const AppAccess = await prisma.appAccess.delete({
     *   where: {
     *     // ... filter to delete one AppAccess
     *   }
     * })
     * 
     */
    delete<T extends AppAccessDeleteArgs>(args: SelectSubset<T, AppAccessDeleteArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppAccess.
     * @param {AppAccessUpdateArgs} args - Arguments to update one AppAccess.
     * @example
     * // Update one AppAccess
     * const appAccess = await prisma.appAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppAccessUpdateArgs>(args: SelectSubset<T, AppAccessUpdateArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppAccesses.
     * @param {AppAccessDeleteManyArgs} args - Arguments to filter AppAccesses to delete.
     * @example
     * // Delete a few AppAccesses
     * const { count } = await prisma.appAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppAccessDeleteManyArgs>(args?: SelectSubset<T, AppAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppAccesses
     * const appAccess = await prisma.appAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppAccessUpdateManyArgs>(args: SelectSubset<T, AppAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppAccess.
     * @param {AppAccessUpsertArgs} args - Arguments to update or create a AppAccess.
     * @example
     * // Update or create a AppAccess
     * const appAccess = await prisma.appAccess.upsert({
     *   create: {
     *     // ... data to create a AppAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppAccess we want to update
     *   }
     * })
     */
    upsert<T extends AppAccessUpsertArgs>(args: SelectSubset<T, AppAccessUpsertArgs<ExtArgs>>): Prisma__AppAccessClient<$Result.GetResult<Prisma.$AppAccessPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessCountArgs} args - Arguments to filter AppAccesses to count.
     * @example
     * // Count the number of AppAccesses
     * const count = await prisma.appAccess.count({
     *   where: {
     *     // ... the filter for the AppAccesses we want to count
     *   }
     * })
    **/
    count<T extends AppAccessCountArgs>(
      args?: Subset<T, AppAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppAccessAggregateArgs>(args: Subset<T, AppAccessAggregateArgs>): Prisma.PrismaPromise<GetAppAccessAggregateType<T>>

    /**
     * Group by AppAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppAccessGroupByArgs['orderBy'] }
        : { orderBy?: AppAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppAccess model
   */
  readonly fields: AppAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    binding<T extends AppBindingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppBindingDefaultArgs<ExtArgs>>): Prisma__AppBindingClient<$Result.GetResult<Prisma.$AppBindingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends GlobalUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUserDefaultArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    profile<T extends AppProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppProfileDefaultArgs<ExtArgs>>): Prisma__AppProfileClient<$Result.GetResult<Prisma.$AppProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppAccess model
   */ 
  interface AppAccessFieldRefs {
    readonly id: FieldRef<"AppAccess", 'String'>
    readonly binding_id: FieldRef<"AppAccess", 'String'>
    readonly user_id: FieldRef<"AppAccess", 'String'>
    readonly profile_id: FieldRef<"AppAccess", 'String'>
    readonly status: FieldRef<"AppAccess", 'String'>
    readonly aioson_play_origin_id: FieldRef<"AppAccess", 'String'>
    readonly created_at: FieldRef<"AppAccess", 'DateTime'>
    readonly updated_at: FieldRef<"AppAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppAccess findUnique
   */
  export type AppAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter, which AppAccess to fetch.
     */
    where: AppAccessWhereUniqueInput
  }

  /**
   * AppAccess findUniqueOrThrow
   */
  export type AppAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter, which AppAccess to fetch.
     */
    where: AppAccessWhereUniqueInput
  }

  /**
   * AppAccess findFirst
   */
  export type AppAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter, which AppAccess to fetch.
     */
    where?: AppAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppAccesses to fetch.
     */
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppAccesses.
     */
    cursor?: AppAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppAccesses.
     */
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * AppAccess findFirstOrThrow
   */
  export type AppAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter, which AppAccess to fetch.
     */
    where?: AppAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppAccesses to fetch.
     */
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppAccesses.
     */
    cursor?: AppAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppAccesses.
     */
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * AppAccess findMany
   */
  export type AppAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter, which AppAccesses to fetch.
     */
    where?: AppAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppAccesses to fetch.
     */
    orderBy?: AppAccessOrderByWithRelationInput | AppAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppAccesses.
     */
    cursor?: AppAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppAccesses.
     */
    skip?: number
    distinct?: AppAccessScalarFieldEnum | AppAccessScalarFieldEnum[]
  }

  /**
   * AppAccess create
   */
  export type AppAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a AppAccess.
     */
    data: XOR<AppAccessCreateInput, AppAccessUncheckedCreateInput>
  }

  /**
   * AppAccess createMany
   */
  export type AppAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppAccesses.
     */
    data: AppAccessCreateManyInput | AppAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppAccess createManyAndReturn
   */
  export type AppAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppAccesses.
     */
    data: AppAccessCreateManyInput | AppAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppAccess update
   */
  export type AppAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a AppAccess.
     */
    data: XOR<AppAccessUpdateInput, AppAccessUncheckedUpdateInput>
    /**
     * Choose, which AppAccess to update.
     */
    where: AppAccessWhereUniqueInput
  }

  /**
   * AppAccess updateMany
   */
  export type AppAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppAccesses.
     */
    data: XOR<AppAccessUpdateManyMutationInput, AppAccessUncheckedUpdateManyInput>
    /**
     * Filter which AppAccesses to update
     */
    where?: AppAccessWhereInput
  }

  /**
   * AppAccess upsert
   */
  export type AppAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the AppAccess to update in case it exists.
     */
    where: AppAccessWhereUniqueInput
    /**
     * In case the AppAccess found by the `where` argument doesn't exist, create a new AppAccess with this data.
     */
    create: XOR<AppAccessCreateInput, AppAccessUncheckedCreateInput>
    /**
     * In case the AppAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppAccessUpdateInput, AppAccessUncheckedUpdateInput>
  }

  /**
   * AppAccess delete
   */
  export type AppAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
    /**
     * Filter which AppAccess to delete.
     */
    where: AppAccessWhereUniqueInput
  }

  /**
   * AppAccess deleteMany
   */
  export type AppAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppAccesses to delete
     */
    where?: AppAccessWhereInput
  }

  /**
   * AppAccess without action
   */
  export type AppAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppAccess
     */
    select?: AppAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppAccessInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    description: string
    created_at: Date
    updated_at: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    user_roles?: boolean | Role$user_rolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    user_roles?: boolean | Role$user_rolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      permissions: Prisma.$RolePermissionPayload<ExtArgs>[]
      user_roles: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany"> | Null>
    user_roles<T extends Role$user_rolesArgs<ExtArgs> = {}>(args?: Subset<T, Role$user_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */ 
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly created_at: FieldRef<"Role", 'DateTime'>
    readonly updated_at: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Role.user_roles
   */
  export type Role$user_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionMinAggregateOutputType = {
    id: string | null
    role_id: string | null
    permission_id: string | null
    binding_id: string | null
    created_at: Date | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    id: string | null
    role_id: string | null
    permission_id: string | null
    binding_id: string | null
    created_at: Date | null
  }

  export type RolePermissionCountAggregateOutputType = {
    id: number
    role_id: number
    permission_id: number
    binding_id: number
    created_at: number
    _all: number
  }


  export type RolePermissionMinAggregateInputType = {
    id?: true
    role_id?: true
    permission_id?: true
    binding_id?: true
    created_at?: true
  }

  export type RolePermissionMaxAggregateInputType = {
    id?: true
    role_id?: true
    permission_id?: true
    binding_id?: true
    created_at?: true
  }

  export type RolePermissionCountAggregateInputType = {
    id?: true
    role_id?: true
    permission_id?: true
    binding_id?: true
    created_at?: true
    _all?: true
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[]
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissionCountAggregateInputType | true
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    id: string
    role_id: string
    permission_id: string
    binding_id: string
    created_at: Date
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role_id?: boolean
    permission_id?: boolean
    binding_id?: boolean
    created_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role_id?: boolean
    permission_id?: boolean
    binding_id?: boolean
    created_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectScalar = {
    id?: boolean
    role_id?: boolean
    permission_id?: boolean
    binding_id?: boolean
    created_at?: boolean
  }

  export type RolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }
  export type RolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | BindingPermissionDefaultArgs<ExtArgs>
  }

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      permission: Prisma.$BindingPermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role_id: string
      permission_id: string
      binding_id: string
      created_at: Date
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolePermissionWithIdOnly = await prisma.rolePermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissions and returns the data saved in the database.
     * @param {RolePermissionCreateManyAndReturnArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissions and only return the `id`
     * const rolePermissionWithIdOnly = await prisma.rolePermission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    permission<T extends BindingPermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BindingPermissionDefaultArgs<ExtArgs>>): Prisma__BindingPermissionClient<$Result.GetResult<Prisma.$BindingPermissionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermission model
   */ 
  interface RolePermissionFieldRefs {
    readonly id: FieldRef<"RolePermission", 'String'>
    readonly role_id: FieldRef<"RolePermission", 'String'>
    readonly permission_id: FieldRef<"RolePermission", 'String'>
    readonly binding_id: FieldRef<"RolePermission", 'String'>
    readonly created_at: FieldRef<"RolePermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission createManyAndReturn
   */
  export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    role_id: string | null
    binding_id: string | null
    aioson_play_origin_id: string | null
    created_at: Date | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    role_id: string | null
    binding_id: string | null
    aioson_play_origin_id: string | null
    created_at: Date | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    user_id: number
    role_id: number
    binding_id: number
    aioson_play_origin_id: number
    created_at: number
    _all: number
  }


  export type UserRoleMinAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    binding_id?: true
    aioson_play_origin_id?: true
    created_at?: true
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    binding_id?: true
    aioson_play_origin_id?: true
    created_at?: true
  }

  export type UserRoleCountAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    binding_id?: true
    aioson_play_origin_id?: true
    created_at?: true
    _all?: true
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[]
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    id: string
    user_id: string
    role_id: string
    binding_id: string
    aioson_play_origin_id: string | null
    created_at: Date
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    binding_id?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    binding_id?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectScalar = {
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    binding_id?: boolean
    aioson_play_origin_id?: boolean
    created_at?: boolean
  }

  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      user: Prisma.$GlobalUserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      role_id: string
      binding_id: string
      aioson_play_origin_id: string | null
      created_at: Date
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRoleCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends GlobalUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUserDefaultArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRole model
   */ 
  interface UserRoleFieldRefs {
    readonly id: FieldRef<"UserRole", 'String'>
    readonly user_id: FieldRef<"UserRole", 'String'>
    readonly role_id: FieldRef<"UserRole", 'String'>
    readonly binding_id: FieldRef<"UserRole", 'String'>
    readonly aioson_play_origin_id: FieldRef<"UserRole", 'String'>
    readonly created_at: FieldRef<"UserRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRole createManyAndReturn
   */
  export type UserRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Model AuthSession
   */

  export type AggregateAuthSession = {
    _count: AuthSessionCountAggregateOutputType | null
    _min: AuthSessionMinAggregateOutputType | null
    _max: AuthSessionMaxAggregateOutputType | null
  }

  export type AuthSessionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    binding_id: string | null
    expires_at: Date | null
    aioson_play_id: string | null
    created_at: Date | null
  }

  export type AuthSessionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    binding_id: string | null
    expires_at: Date | null
    aioson_play_id: string | null
    created_at: Date | null
  }

  export type AuthSessionCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    binding_id: number
    expires_at: number
    aioson_play_id: number
    created_at: number
    _all: number
  }


  export type AuthSessionMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    binding_id?: true
    expires_at?: true
    aioson_play_id?: true
    created_at?: true
  }

  export type AuthSessionMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    binding_id?: true
    expires_at?: true
    aioson_play_id?: true
    created_at?: true
  }

  export type AuthSessionCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    binding_id?: true
    expires_at?: true
    aioson_play_id?: true
    created_at?: true
    _all?: true
  }

  export type AuthSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthSession to aggregate.
     */
    where?: AuthSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthSessions to fetch.
     */
    orderBy?: AuthSessionOrderByWithRelationInput | AuthSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthSessions
    **/
    _count?: true | AuthSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthSessionMaxAggregateInputType
  }

  export type GetAuthSessionAggregateType<T extends AuthSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthSession[P]>
      : GetScalarType<T[P], AggregateAuthSession[P]>
  }




  export type AuthSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthSessionWhereInput
    orderBy?: AuthSessionOrderByWithAggregationInput | AuthSessionOrderByWithAggregationInput[]
    by: AuthSessionScalarFieldEnum[] | AuthSessionScalarFieldEnum
    having?: AuthSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthSessionCountAggregateInputType | true
    _min?: AuthSessionMinAggregateInputType
    _max?: AuthSessionMaxAggregateInputType
  }

  export type AuthSessionGroupByOutputType = {
    id: string
    user_id: string
    token: string
    binding_id: string | null
    expires_at: Date
    aioson_play_id: string | null
    created_at: Date
    _count: AuthSessionCountAggregateOutputType | null
    _min: AuthSessionMinAggregateOutputType | null
    _max: AuthSessionMaxAggregateOutputType | null
  }

  type GetAuthSessionGroupByPayload<T extends AuthSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AuthSessionGroupByOutputType[P]>
        }
      >
    >


  export type AuthSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    binding_id?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authSession"]>

  export type AuthSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    binding_id?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authSession"]>

  export type AuthSessionSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    binding_id?: boolean
    expires_at?: boolean
    aioson_play_id?: boolean
    created_at?: boolean
  }

  export type AuthSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
  }
  export type AuthSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GlobalUserDefaultArgs<ExtArgs>
  }

  export type $AuthSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthSession"
    objects: {
      user: Prisma.$GlobalUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token: string
      binding_id: string | null
      expires_at: Date
      aioson_play_id: string | null
      created_at: Date
    }, ExtArgs["result"]["authSession"]>
    composites: {}
  }

  type AuthSessionGetPayload<S extends boolean | null | undefined | AuthSessionDefaultArgs> = $Result.GetResult<Prisma.$AuthSessionPayload, S>

  type AuthSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuthSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuthSessionCountAggregateInputType | true
    }

  export interface AuthSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthSession'], meta: { name: 'AuthSession' } }
    /**
     * Find zero or one AuthSession that matches the filter.
     * @param {AuthSessionFindUniqueArgs} args - Arguments to find a AuthSession
     * @example
     * // Get one AuthSession
     * const authSession = await prisma.authSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthSessionFindUniqueArgs>(args: SelectSubset<T, AuthSessionFindUniqueArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuthSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuthSessionFindUniqueOrThrowArgs} args - Arguments to find a AuthSession
     * @example
     * // Get one AuthSession
     * const authSession = await prisma.authSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuthSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionFindFirstArgs} args - Arguments to find a AuthSession
     * @example
     * // Get one AuthSession
     * const authSession = await prisma.authSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthSessionFindFirstArgs>(args?: SelectSubset<T, AuthSessionFindFirstArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuthSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionFindFirstOrThrowArgs} args - Arguments to find a AuthSession
     * @example
     * // Get one AuthSession
     * const authSession = await prisma.authSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuthSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthSessions
     * const authSessions = await prisma.authSession.findMany()
     * 
     * // Get first 10 AuthSessions
     * const authSessions = await prisma.authSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authSessionWithIdOnly = await prisma.authSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthSessionFindManyArgs>(args?: SelectSubset<T, AuthSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuthSession.
     * @param {AuthSessionCreateArgs} args - Arguments to create a AuthSession.
     * @example
     * // Create one AuthSession
     * const AuthSession = await prisma.authSession.create({
     *   data: {
     *     // ... data to create a AuthSession
     *   }
     * })
     * 
     */
    create<T extends AuthSessionCreateArgs>(args: SelectSubset<T, AuthSessionCreateArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuthSessions.
     * @param {AuthSessionCreateManyArgs} args - Arguments to create many AuthSessions.
     * @example
     * // Create many AuthSessions
     * const authSession = await prisma.authSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthSessionCreateManyArgs>(args?: SelectSubset<T, AuthSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthSessions and returns the data saved in the database.
     * @param {AuthSessionCreateManyAndReturnArgs} args - Arguments to create many AuthSessions.
     * @example
     * // Create many AuthSessions
     * const authSession = await prisma.authSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthSessions and only return the `id`
     * const authSessionWithIdOnly = await prisma.authSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuthSession.
     * @param {AuthSessionDeleteArgs} args - Arguments to delete one AuthSession.
     * @example
     * // Delete one AuthSession
     * const AuthSession = await prisma.authSession.delete({
     *   where: {
     *     // ... filter to delete one AuthSession
     *   }
     * })
     * 
     */
    delete<T extends AuthSessionDeleteArgs>(args: SelectSubset<T, AuthSessionDeleteArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuthSession.
     * @param {AuthSessionUpdateArgs} args - Arguments to update one AuthSession.
     * @example
     * // Update one AuthSession
     * const authSession = await prisma.authSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthSessionUpdateArgs>(args: SelectSubset<T, AuthSessionUpdateArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuthSessions.
     * @param {AuthSessionDeleteManyArgs} args - Arguments to filter AuthSessions to delete.
     * @example
     * // Delete a few AuthSessions
     * const { count } = await prisma.authSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthSessionDeleteManyArgs>(args?: SelectSubset<T, AuthSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthSessions
     * const authSession = await prisma.authSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthSessionUpdateManyArgs>(args: SelectSubset<T, AuthSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthSession.
     * @param {AuthSessionUpsertArgs} args - Arguments to update or create a AuthSession.
     * @example
     * // Update or create a AuthSession
     * const authSession = await prisma.authSession.upsert({
     *   create: {
     *     // ... data to create a AuthSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthSession we want to update
     *   }
     * })
     */
    upsert<T extends AuthSessionUpsertArgs>(args: SelectSubset<T, AuthSessionUpsertArgs<ExtArgs>>): Prisma__AuthSessionClient<$Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuthSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionCountArgs} args - Arguments to filter AuthSessions to count.
     * @example
     * // Count the number of AuthSessions
     * const count = await prisma.authSession.count({
     *   where: {
     *     // ... the filter for the AuthSessions we want to count
     *   }
     * })
    **/
    count<T extends AuthSessionCountArgs>(
      args?: Subset<T, AuthSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthSessionAggregateArgs>(args: Subset<T, AuthSessionAggregateArgs>): Prisma.PrismaPromise<GetAuthSessionAggregateType<T>>

    /**
     * Group by AuthSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthSessionGroupByArgs['orderBy'] }
        : { orderBy?: AuthSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthSession model
   */
  readonly fields: AuthSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends GlobalUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GlobalUserDefaultArgs<ExtArgs>>): Prisma__GlobalUserClient<$Result.GetResult<Prisma.$GlobalUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthSession model
   */ 
  interface AuthSessionFieldRefs {
    readonly id: FieldRef<"AuthSession", 'String'>
    readonly user_id: FieldRef<"AuthSession", 'String'>
    readonly token: FieldRef<"AuthSession", 'String'>
    readonly binding_id: FieldRef<"AuthSession", 'String'>
    readonly expires_at: FieldRef<"AuthSession", 'DateTime'>
    readonly aioson_play_id: FieldRef<"AuthSession", 'String'>
    readonly created_at: FieldRef<"AuthSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthSession findUnique
   */
  export type AuthSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuthSession to fetch.
     */
    where: AuthSessionWhereUniqueInput
  }

  /**
   * AuthSession findUniqueOrThrow
   */
  export type AuthSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuthSession to fetch.
     */
    where: AuthSessionWhereUniqueInput
  }

  /**
   * AuthSession findFirst
   */
  export type AuthSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuthSession to fetch.
     */
    where?: AuthSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthSessions to fetch.
     */
    orderBy?: AuthSessionOrderByWithRelationInput | AuthSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthSessions.
     */
    cursor?: AuthSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthSessions.
     */
    distinct?: AuthSessionScalarFieldEnum | AuthSessionScalarFieldEnum[]
  }

  /**
   * AuthSession findFirstOrThrow
   */
  export type AuthSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuthSession to fetch.
     */
    where?: AuthSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthSessions to fetch.
     */
    orderBy?: AuthSessionOrderByWithRelationInput | AuthSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthSessions.
     */
    cursor?: AuthSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthSessions.
     */
    distinct?: AuthSessionScalarFieldEnum | AuthSessionScalarFieldEnum[]
  }

  /**
   * AuthSession findMany
   */
  export type AuthSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuthSessions to fetch.
     */
    where?: AuthSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthSessions to fetch.
     */
    orderBy?: AuthSessionOrderByWithRelationInput | AuthSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthSessions.
     */
    cursor?: AuthSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthSessions.
     */
    skip?: number
    distinct?: AuthSessionScalarFieldEnum | AuthSessionScalarFieldEnum[]
  }

  /**
   * AuthSession create
   */
  export type AuthSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthSession.
     */
    data: XOR<AuthSessionCreateInput, AuthSessionUncheckedCreateInput>
  }

  /**
   * AuthSession createMany
   */
  export type AuthSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthSessions.
     */
    data: AuthSessionCreateManyInput | AuthSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthSession createManyAndReturn
   */
  export type AuthSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuthSessions.
     */
    data: AuthSessionCreateManyInput | AuthSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthSession update
   */
  export type AuthSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthSession.
     */
    data: XOR<AuthSessionUpdateInput, AuthSessionUncheckedUpdateInput>
    /**
     * Choose, which AuthSession to update.
     */
    where: AuthSessionWhereUniqueInput
  }

  /**
   * AuthSession updateMany
   */
  export type AuthSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthSessions.
     */
    data: XOR<AuthSessionUpdateManyMutationInput, AuthSessionUncheckedUpdateManyInput>
    /**
     * Filter which AuthSessions to update
     */
    where?: AuthSessionWhereInput
  }

  /**
   * AuthSession upsert
   */
  export type AuthSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthSession to update in case it exists.
     */
    where: AuthSessionWhereUniqueInput
    /**
     * In case the AuthSession found by the `where` argument doesn't exist, create a new AuthSession with this data.
     */
    create: XOR<AuthSessionCreateInput, AuthSessionUncheckedCreateInput>
    /**
     * In case the AuthSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthSessionUpdateInput, AuthSessionUncheckedUpdateInput>
  }

  /**
   * AuthSession delete
   */
  export type AuthSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
    /**
     * Filter which AuthSession to delete.
     */
    where: AuthSessionWhereUniqueInput
  }

  /**
   * AuthSession deleteMany
   */
  export type AuthSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthSessions to delete
     */
    where?: AuthSessionWhereInput
  }

  /**
   * AuthSession without action
   */
  export type AuthSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthSession
     */
    select?: AuthSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthSessionInclude<ExtArgs> | null
  }


  /**
   * Model RecoveryToken
   */

  export type AggregateRecoveryToken = {
    _count: RecoveryTokenCountAggregateOutputType | null
    _min: RecoveryTokenMinAggregateOutputType | null
    _max: RecoveryTokenMaxAggregateOutputType | null
  }

  export type RecoveryTokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    expires_at: Date | null
    used: boolean | null
    created_at: Date | null
  }

  export type RecoveryTokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    expires_at: Date | null
    used: boolean | null
    created_at: Date | null
  }

  export type RecoveryTokenCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    expires_at: number
    used: number
    created_at: number
    _all: number
  }


  export type RecoveryTokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
  }

  export type RecoveryTokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
  }

  export type RecoveryTokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
    _all?: true
  }

  export type RecoveryTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecoveryToken to aggregate.
     */
    where?: RecoveryTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecoveryTokens to fetch.
     */
    orderBy?: RecoveryTokenOrderByWithRelationInput | RecoveryTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecoveryTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecoveryTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecoveryTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecoveryTokens
    **/
    _count?: true | RecoveryTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecoveryTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecoveryTokenMaxAggregateInputType
  }

  export type GetRecoveryTokenAggregateType<T extends RecoveryTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRecoveryToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecoveryToken[P]>
      : GetScalarType<T[P], AggregateRecoveryToken[P]>
  }




  export type RecoveryTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecoveryTokenWhereInput
    orderBy?: RecoveryTokenOrderByWithAggregationInput | RecoveryTokenOrderByWithAggregationInput[]
    by: RecoveryTokenScalarFieldEnum[] | RecoveryTokenScalarFieldEnum
    having?: RecoveryTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecoveryTokenCountAggregateInputType | true
    _min?: RecoveryTokenMinAggregateInputType
    _max?: RecoveryTokenMaxAggregateInputType
  }

  export type RecoveryTokenGroupByOutputType = {
    id: string
    user_id: string
    token: string
    expires_at: Date
    used: boolean
    created_at: Date
    _count: RecoveryTokenCountAggregateOutputType | null
    _min: RecoveryTokenMinAggregateOutputType | null
    _max: RecoveryTokenMaxAggregateOutputType | null
  }

  type GetRecoveryTokenGroupByPayload<T extends RecoveryTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecoveryTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecoveryTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecoveryTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RecoveryTokenGroupByOutputType[P]>
        }
      >
    >


  export type RecoveryTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["recoveryToken"]>

  export type RecoveryTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["recoveryToken"]>

  export type RecoveryTokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
  }


  export type $RecoveryTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecoveryToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token: string
      expires_at: Date
      used: boolean
      created_at: Date
    }, ExtArgs["result"]["recoveryToken"]>
    composites: {}
  }

  type RecoveryTokenGetPayload<S extends boolean | null | undefined | RecoveryTokenDefaultArgs> = $Result.GetResult<Prisma.$RecoveryTokenPayload, S>

  type RecoveryTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecoveryTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecoveryTokenCountAggregateInputType | true
    }

  export interface RecoveryTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecoveryToken'], meta: { name: 'RecoveryToken' } }
    /**
     * Find zero or one RecoveryToken that matches the filter.
     * @param {RecoveryTokenFindUniqueArgs} args - Arguments to find a RecoveryToken
     * @example
     * // Get one RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecoveryTokenFindUniqueArgs>(args: SelectSubset<T, RecoveryTokenFindUniqueArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RecoveryToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecoveryTokenFindUniqueOrThrowArgs} args - Arguments to find a RecoveryToken
     * @example
     * // Get one RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecoveryTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RecoveryTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RecoveryToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenFindFirstArgs} args - Arguments to find a RecoveryToken
     * @example
     * // Get one RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecoveryTokenFindFirstArgs>(args?: SelectSubset<T, RecoveryTokenFindFirstArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RecoveryToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenFindFirstOrThrowArgs} args - Arguments to find a RecoveryToken
     * @example
     * // Get one RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecoveryTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RecoveryTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RecoveryTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecoveryTokens
     * const recoveryTokens = await prisma.recoveryToken.findMany()
     * 
     * // Get first 10 RecoveryTokens
     * const recoveryTokens = await prisma.recoveryToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recoveryTokenWithIdOnly = await prisma.recoveryToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecoveryTokenFindManyArgs>(args?: SelectSubset<T, RecoveryTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RecoveryToken.
     * @param {RecoveryTokenCreateArgs} args - Arguments to create a RecoveryToken.
     * @example
     * // Create one RecoveryToken
     * const RecoveryToken = await prisma.recoveryToken.create({
     *   data: {
     *     // ... data to create a RecoveryToken
     *   }
     * })
     * 
     */
    create<T extends RecoveryTokenCreateArgs>(args: SelectSubset<T, RecoveryTokenCreateArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RecoveryTokens.
     * @param {RecoveryTokenCreateManyArgs} args - Arguments to create many RecoveryTokens.
     * @example
     * // Create many RecoveryTokens
     * const recoveryToken = await prisma.recoveryToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecoveryTokenCreateManyArgs>(args?: SelectSubset<T, RecoveryTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecoveryTokens and returns the data saved in the database.
     * @param {RecoveryTokenCreateManyAndReturnArgs} args - Arguments to create many RecoveryTokens.
     * @example
     * // Create many RecoveryTokens
     * const recoveryToken = await prisma.recoveryToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecoveryTokens and only return the `id`
     * const recoveryTokenWithIdOnly = await prisma.recoveryToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecoveryTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RecoveryTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RecoveryToken.
     * @param {RecoveryTokenDeleteArgs} args - Arguments to delete one RecoveryToken.
     * @example
     * // Delete one RecoveryToken
     * const RecoveryToken = await prisma.recoveryToken.delete({
     *   where: {
     *     // ... filter to delete one RecoveryToken
     *   }
     * })
     * 
     */
    delete<T extends RecoveryTokenDeleteArgs>(args: SelectSubset<T, RecoveryTokenDeleteArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RecoveryToken.
     * @param {RecoveryTokenUpdateArgs} args - Arguments to update one RecoveryToken.
     * @example
     * // Update one RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecoveryTokenUpdateArgs>(args: SelectSubset<T, RecoveryTokenUpdateArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RecoveryTokens.
     * @param {RecoveryTokenDeleteManyArgs} args - Arguments to filter RecoveryTokens to delete.
     * @example
     * // Delete a few RecoveryTokens
     * const { count } = await prisma.recoveryToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecoveryTokenDeleteManyArgs>(args?: SelectSubset<T, RecoveryTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecoveryTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecoveryTokens
     * const recoveryToken = await prisma.recoveryToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecoveryTokenUpdateManyArgs>(args: SelectSubset<T, RecoveryTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecoveryToken.
     * @param {RecoveryTokenUpsertArgs} args - Arguments to update or create a RecoveryToken.
     * @example
     * // Update or create a RecoveryToken
     * const recoveryToken = await prisma.recoveryToken.upsert({
     *   create: {
     *     // ... data to create a RecoveryToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecoveryToken we want to update
     *   }
     * })
     */
    upsert<T extends RecoveryTokenUpsertArgs>(args: SelectSubset<T, RecoveryTokenUpsertArgs<ExtArgs>>): Prisma__RecoveryTokenClient<$Result.GetResult<Prisma.$RecoveryTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RecoveryTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenCountArgs} args - Arguments to filter RecoveryTokens to count.
     * @example
     * // Count the number of RecoveryTokens
     * const count = await prisma.recoveryToken.count({
     *   where: {
     *     // ... the filter for the RecoveryTokens we want to count
     *   }
     * })
    **/
    count<T extends RecoveryTokenCountArgs>(
      args?: Subset<T, RecoveryTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecoveryTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecoveryToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecoveryTokenAggregateArgs>(args: Subset<T, RecoveryTokenAggregateArgs>): Prisma.PrismaPromise<GetRecoveryTokenAggregateType<T>>

    /**
     * Group by RecoveryToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecoveryTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecoveryTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecoveryTokenGroupByArgs['orderBy'] }
        : { orderBy?: RecoveryTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecoveryTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecoveryTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecoveryToken model
   */
  readonly fields: RecoveryTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecoveryToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecoveryTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecoveryToken model
   */ 
  interface RecoveryTokenFieldRefs {
    readonly id: FieldRef<"RecoveryToken", 'String'>
    readonly user_id: FieldRef<"RecoveryToken", 'String'>
    readonly token: FieldRef<"RecoveryToken", 'String'>
    readonly expires_at: FieldRef<"RecoveryToken", 'DateTime'>
    readonly used: FieldRef<"RecoveryToken", 'Boolean'>
    readonly created_at: FieldRef<"RecoveryToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecoveryToken findUnique
   */
  export type RecoveryTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter, which RecoveryToken to fetch.
     */
    where: RecoveryTokenWhereUniqueInput
  }

  /**
   * RecoveryToken findUniqueOrThrow
   */
  export type RecoveryTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter, which RecoveryToken to fetch.
     */
    where: RecoveryTokenWhereUniqueInput
  }

  /**
   * RecoveryToken findFirst
   */
  export type RecoveryTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter, which RecoveryToken to fetch.
     */
    where?: RecoveryTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecoveryTokens to fetch.
     */
    orderBy?: RecoveryTokenOrderByWithRelationInput | RecoveryTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecoveryTokens.
     */
    cursor?: RecoveryTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecoveryTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecoveryTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecoveryTokens.
     */
    distinct?: RecoveryTokenScalarFieldEnum | RecoveryTokenScalarFieldEnum[]
  }

  /**
   * RecoveryToken findFirstOrThrow
   */
  export type RecoveryTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter, which RecoveryToken to fetch.
     */
    where?: RecoveryTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecoveryTokens to fetch.
     */
    orderBy?: RecoveryTokenOrderByWithRelationInput | RecoveryTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecoveryTokens.
     */
    cursor?: RecoveryTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecoveryTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecoveryTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecoveryTokens.
     */
    distinct?: RecoveryTokenScalarFieldEnum | RecoveryTokenScalarFieldEnum[]
  }

  /**
   * RecoveryToken findMany
   */
  export type RecoveryTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter, which RecoveryTokens to fetch.
     */
    where?: RecoveryTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecoveryTokens to fetch.
     */
    orderBy?: RecoveryTokenOrderByWithRelationInput | RecoveryTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecoveryTokens.
     */
    cursor?: RecoveryTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecoveryTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecoveryTokens.
     */
    skip?: number
    distinct?: RecoveryTokenScalarFieldEnum | RecoveryTokenScalarFieldEnum[]
  }

  /**
   * RecoveryToken create
   */
  export type RecoveryTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a RecoveryToken.
     */
    data: XOR<RecoveryTokenCreateInput, RecoveryTokenUncheckedCreateInput>
  }

  /**
   * RecoveryToken createMany
   */
  export type RecoveryTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecoveryTokens.
     */
    data: RecoveryTokenCreateManyInput | RecoveryTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecoveryToken createManyAndReturn
   */
  export type RecoveryTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RecoveryTokens.
     */
    data: RecoveryTokenCreateManyInput | RecoveryTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecoveryToken update
   */
  export type RecoveryTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a RecoveryToken.
     */
    data: XOR<RecoveryTokenUpdateInput, RecoveryTokenUncheckedUpdateInput>
    /**
     * Choose, which RecoveryToken to update.
     */
    where: RecoveryTokenWhereUniqueInput
  }

  /**
   * RecoveryToken updateMany
   */
  export type RecoveryTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecoveryTokens.
     */
    data: XOR<RecoveryTokenUpdateManyMutationInput, RecoveryTokenUncheckedUpdateManyInput>
    /**
     * Filter which RecoveryTokens to update
     */
    where?: RecoveryTokenWhereInput
  }

  /**
   * RecoveryToken upsert
   */
  export type RecoveryTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the RecoveryToken to update in case it exists.
     */
    where: RecoveryTokenWhereUniqueInput
    /**
     * In case the RecoveryToken found by the `where` argument doesn't exist, create a new RecoveryToken with this data.
     */
    create: XOR<RecoveryTokenCreateInput, RecoveryTokenUncheckedCreateInput>
    /**
     * In case the RecoveryToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecoveryTokenUpdateInput, RecoveryTokenUncheckedUpdateInput>
  }

  /**
   * RecoveryToken delete
   */
  export type RecoveryTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
    /**
     * Filter which RecoveryToken to delete.
     */
    where: RecoveryTokenWhereUniqueInput
  }

  /**
   * RecoveryToken deleteMany
   */
  export type RecoveryTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecoveryTokens to delete
     */
    where?: RecoveryTokenWhereInput
  }

  /**
   * RecoveryToken without action
   */
  export type RecoveryTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecoveryToken
     */
    select?: RecoveryTokenSelect<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    created_at: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    created_at?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    email: string
    password_hash: string
    created_at: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }


  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password_hash: string
      created_at: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */ 
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly password_hash: FieldRef<"AdminUser", 'String'>
    readonly created_at: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
  }


  /**
   * Model FederationConfig
   */

  export type AggregateFederationConfig = {
    _count: FederationConfigCountAggregateOutputType | null
    _min: FederationConfigMinAggregateOutputType | null
    _max: FederationConfigMaxAggregateOutputType | null
  }

  export type FederationConfigMinAggregateOutputType = {
    id: string | null
    federation_active: boolean | null
    project_id: string | null
    project_name: string | null
    db_provider: string | null
    db_connection_keyring_id: string | null
    activated_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FederationConfigMaxAggregateOutputType = {
    id: string | null
    federation_active: boolean | null
    project_id: string | null
    project_name: string | null
    db_provider: string | null
    db_connection_keyring_id: string | null
    activated_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FederationConfigCountAggregateOutputType = {
    id: number
    federation_active: number
    project_id: number
    project_name: number
    db_provider: number
    db_connection_keyring_id: number
    activated_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FederationConfigMinAggregateInputType = {
    id?: true
    federation_active?: true
    project_id?: true
    project_name?: true
    db_provider?: true
    db_connection_keyring_id?: true
    activated_at?: true
    created_at?: true
    updated_at?: true
  }

  export type FederationConfigMaxAggregateInputType = {
    id?: true
    federation_active?: true
    project_id?: true
    project_name?: true
    db_provider?: true
    db_connection_keyring_id?: true
    activated_at?: true
    created_at?: true
    updated_at?: true
  }

  export type FederationConfigCountAggregateInputType = {
    id?: true
    federation_active?: true
    project_id?: true
    project_name?: true
    db_provider?: true
    db_connection_keyring_id?: true
    activated_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FederationConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FederationConfig to aggregate.
     */
    where?: FederationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FederationConfigs to fetch.
     */
    orderBy?: FederationConfigOrderByWithRelationInput | FederationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FederationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FederationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FederationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FederationConfigs
    **/
    _count?: true | FederationConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FederationConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FederationConfigMaxAggregateInputType
  }

  export type GetFederationConfigAggregateType<T extends FederationConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateFederationConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFederationConfig[P]>
      : GetScalarType<T[P], AggregateFederationConfig[P]>
  }




  export type FederationConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FederationConfigWhereInput
    orderBy?: FederationConfigOrderByWithAggregationInput | FederationConfigOrderByWithAggregationInput[]
    by: FederationConfigScalarFieldEnum[] | FederationConfigScalarFieldEnum
    having?: FederationConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FederationConfigCountAggregateInputType | true
    _min?: FederationConfigMinAggregateInputType
    _max?: FederationConfigMaxAggregateInputType
  }

  export type FederationConfigGroupByOutputType = {
    id: string
    federation_active: boolean
    project_id: string | null
    project_name: string | null
    db_provider: string | null
    db_connection_keyring_id: string | null
    activated_at: Date | null
    created_at: Date
    updated_at: Date
    _count: FederationConfigCountAggregateOutputType | null
    _min: FederationConfigMinAggregateOutputType | null
    _max: FederationConfigMaxAggregateOutputType | null
  }

  type GetFederationConfigGroupByPayload<T extends FederationConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FederationConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FederationConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FederationConfigGroupByOutputType[P]>
            : GetScalarType<T[P], FederationConfigGroupByOutputType[P]>
        }
      >
    >


  export type FederationConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    federation_active?: boolean
    project_id?: boolean
    project_name?: boolean
    db_provider?: boolean
    db_connection_keyring_id?: boolean
    activated_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["federationConfig"]>

  export type FederationConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    federation_active?: boolean
    project_id?: boolean
    project_name?: boolean
    db_provider?: boolean
    db_connection_keyring_id?: boolean
    activated_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["federationConfig"]>

  export type FederationConfigSelectScalar = {
    id?: boolean
    federation_active?: boolean
    project_id?: boolean
    project_name?: boolean
    db_provider?: boolean
    db_connection_keyring_id?: boolean
    activated_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $FederationConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FederationConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      federation_active: boolean
      project_id: string | null
      project_name: string | null
      db_provider: string | null
      db_connection_keyring_id: string | null
      activated_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["federationConfig"]>
    composites: {}
  }

  type FederationConfigGetPayload<S extends boolean | null | undefined | FederationConfigDefaultArgs> = $Result.GetResult<Prisma.$FederationConfigPayload, S>

  type FederationConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FederationConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FederationConfigCountAggregateInputType | true
    }

  export interface FederationConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FederationConfig'], meta: { name: 'FederationConfig' } }
    /**
     * Find zero or one FederationConfig that matches the filter.
     * @param {FederationConfigFindUniqueArgs} args - Arguments to find a FederationConfig
     * @example
     * // Get one FederationConfig
     * const federationConfig = await prisma.federationConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FederationConfigFindUniqueArgs>(args: SelectSubset<T, FederationConfigFindUniqueArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FederationConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FederationConfigFindUniqueOrThrowArgs} args - Arguments to find a FederationConfig
     * @example
     * // Get one FederationConfig
     * const federationConfig = await prisma.federationConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FederationConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, FederationConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FederationConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigFindFirstArgs} args - Arguments to find a FederationConfig
     * @example
     * // Get one FederationConfig
     * const federationConfig = await prisma.federationConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FederationConfigFindFirstArgs>(args?: SelectSubset<T, FederationConfigFindFirstArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FederationConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigFindFirstOrThrowArgs} args - Arguments to find a FederationConfig
     * @example
     * // Get one FederationConfig
     * const federationConfig = await prisma.federationConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FederationConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, FederationConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FederationConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FederationConfigs
     * const federationConfigs = await prisma.federationConfig.findMany()
     * 
     * // Get first 10 FederationConfigs
     * const federationConfigs = await prisma.federationConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const federationConfigWithIdOnly = await prisma.federationConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FederationConfigFindManyArgs>(args?: SelectSubset<T, FederationConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FederationConfig.
     * @param {FederationConfigCreateArgs} args - Arguments to create a FederationConfig.
     * @example
     * // Create one FederationConfig
     * const FederationConfig = await prisma.federationConfig.create({
     *   data: {
     *     // ... data to create a FederationConfig
     *   }
     * })
     * 
     */
    create<T extends FederationConfigCreateArgs>(args: SelectSubset<T, FederationConfigCreateArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FederationConfigs.
     * @param {FederationConfigCreateManyArgs} args - Arguments to create many FederationConfigs.
     * @example
     * // Create many FederationConfigs
     * const federationConfig = await prisma.federationConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FederationConfigCreateManyArgs>(args?: SelectSubset<T, FederationConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FederationConfigs and returns the data saved in the database.
     * @param {FederationConfigCreateManyAndReturnArgs} args - Arguments to create many FederationConfigs.
     * @example
     * // Create many FederationConfigs
     * const federationConfig = await prisma.federationConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FederationConfigs and only return the `id`
     * const federationConfigWithIdOnly = await prisma.federationConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FederationConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, FederationConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FederationConfig.
     * @param {FederationConfigDeleteArgs} args - Arguments to delete one FederationConfig.
     * @example
     * // Delete one FederationConfig
     * const FederationConfig = await prisma.federationConfig.delete({
     *   where: {
     *     // ... filter to delete one FederationConfig
     *   }
     * })
     * 
     */
    delete<T extends FederationConfigDeleteArgs>(args: SelectSubset<T, FederationConfigDeleteArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FederationConfig.
     * @param {FederationConfigUpdateArgs} args - Arguments to update one FederationConfig.
     * @example
     * // Update one FederationConfig
     * const federationConfig = await prisma.federationConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FederationConfigUpdateArgs>(args: SelectSubset<T, FederationConfigUpdateArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FederationConfigs.
     * @param {FederationConfigDeleteManyArgs} args - Arguments to filter FederationConfigs to delete.
     * @example
     * // Delete a few FederationConfigs
     * const { count } = await prisma.federationConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FederationConfigDeleteManyArgs>(args?: SelectSubset<T, FederationConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FederationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FederationConfigs
     * const federationConfig = await prisma.federationConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FederationConfigUpdateManyArgs>(args: SelectSubset<T, FederationConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FederationConfig.
     * @param {FederationConfigUpsertArgs} args - Arguments to update or create a FederationConfig.
     * @example
     * // Update or create a FederationConfig
     * const federationConfig = await prisma.federationConfig.upsert({
     *   create: {
     *     // ... data to create a FederationConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FederationConfig we want to update
     *   }
     * })
     */
    upsert<T extends FederationConfigUpsertArgs>(args: SelectSubset<T, FederationConfigUpsertArgs<ExtArgs>>): Prisma__FederationConfigClient<$Result.GetResult<Prisma.$FederationConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FederationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigCountArgs} args - Arguments to filter FederationConfigs to count.
     * @example
     * // Count the number of FederationConfigs
     * const count = await prisma.federationConfig.count({
     *   where: {
     *     // ... the filter for the FederationConfigs we want to count
     *   }
     * })
    **/
    count<T extends FederationConfigCountArgs>(
      args?: Subset<T, FederationConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FederationConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FederationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FederationConfigAggregateArgs>(args: Subset<T, FederationConfigAggregateArgs>): Prisma.PrismaPromise<GetFederationConfigAggregateType<T>>

    /**
     * Group by FederationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FederationConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FederationConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FederationConfigGroupByArgs['orderBy'] }
        : { orderBy?: FederationConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FederationConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFederationConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FederationConfig model
   */
  readonly fields: FederationConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FederationConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FederationConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FederationConfig model
   */ 
  interface FederationConfigFieldRefs {
    readonly id: FieldRef<"FederationConfig", 'String'>
    readonly federation_active: FieldRef<"FederationConfig", 'Boolean'>
    readonly project_id: FieldRef<"FederationConfig", 'String'>
    readonly project_name: FieldRef<"FederationConfig", 'String'>
    readonly db_provider: FieldRef<"FederationConfig", 'String'>
    readonly db_connection_keyring_id: FieldRef<"FederationConfig", 'String'>
    readonly activated_at: FieldRef<"FederationConfig", 'DateTime'>
    readonly created_at: FieldRef<"FederationConfig", 'DateTime'>
    readonly updated_at: FieldRef<"FederationConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FederationConfig findUnique
   */
  export type FederationConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter, which FederationConfig to fetch.
     */
    where: FederationConfigWhereUniqueInput
  }

  /**
   * FederationConfig findUniqueOrThrow
   */
  export type FederationConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter, which FederationConfig to fetch.
     */
    where: FederationConfigWhereUniqueInput
  }

  /**
   * FederationConfig findFirst
   */
  export type FederationConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter, which FederationConfig to fetch.
     */
    where?: FederationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FederationConfigs to fetch.
     */
    orderBy?: FederationConfigOrderByWithRelationInput | FederationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FederationConfigs.
     */
    cursor?: FederationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FederationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FederationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FederationConfigs.
     */
    distinct?: FederationConfigScalarFieldEnum | FederationConfigScalarFieldEnum[]
  }

  /**
   * FederationConfig findFirstOrThrow
   */
  export type FederationConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter, which FederationConfig to fetch.
     */
    where?: FederationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FederationConfigs to fetch.
     */
    orderBy?: FederationConfigOrderByWithRelationInput | FederationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FederationConfigs.
     */
    cursor?: FederationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FederationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FederationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FederationConfigs.
     */
    distinct?: FederationConfigScalarFieldEnum | FederationConfigScalarFieldEnum[]
  }

  /**
   * FederationConfig findMany
   */
  export type FederationConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter, which FederationConfigs to fetch.
     */
    where?: FederationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FederationConfigs to fetch.
     */
    orderBy?: FederationConfigOrderByWithRelationInput | FederationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FederationConfigs.
     */
    cursor?: FederationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FederationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FederationConfigs.
     */
    skip?: number
    distinct?: FederationConfigScalarFieldEnum | FederationConfigScalarFieldEnum[]
  }

  /**
   * FederationConfig create
   */
  export type FederationConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a FederationConfig.
     */
    data: XOR<FederationConfigCreateInput, FederationConfigUncheckedCreateInput>
  }

  /**
   * FederationConfig createMany
   */
  export type FederationConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FederationConfigs.
     */
    data: FederationConfigCreateManyInput | FederationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FederationConfig createManyAndReturn
   */
  export type FederationConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FederationConfigs.
     */
    data: FederationConfigCreateManyInput | FederationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FederationConfig update
   */
  export type FederationConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a FederationConfig.
     */
    data: XOR<FederationConfigUpdateInput, FederationConfigUncheckedUpdateInput>
    /**
     * Choose, which FederationConfig to update.
     */
    where: FederationConfigWhereUniqueInput
  }

  /**
   * FederationConfig updateMany
   */
  export type FederationConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FederationConfigs.
     */
    data: XOR<FederationConfigUpdateManyMutationInput, FederationConfigUncheckedUpdateManyInput>
    /**
     * Filter which FederationConfigs to update
     */
    where?: FederationConfigWhereInput
  }

  /**
   * FederationConfig upsert
   */
  export type FederationConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the FederationConfig to update in case it exists.
     */
    where: FederationConfigWhereUniqueInput
    /**
     * In case the FederationConfig found by the `where` argument doesn't exist, create a new FederationConfig with this data.
     */
    create: XOR<FederationConfigCreateInput, FederationConfigUncheckedCreateInput>
    /**
     * In case the FederationConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FederationConfigUpdateInput, FederationConfigUncheckedUpdateInput>
  }

  /**
   * FederationConfig delete
   */
  export type FederationConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
    /**
     * Filter which FederationConfig to delete.
     */
    where: FederationConfigWhereUniqueInput
  }

  /**
   * FederationConfig deleteMany
   */
  export type FederationConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FederationConfigs to delete
     */
    where?: FederationConfigWhereInput
  }

  /**
   * FederationConfig without action
   */
  export type FederationConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FederationConfig
     */
    select?: FederationConfigSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AuthDatabaseMetadataScalarFieldEnum: {
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

  export type AuthDatabaseMetadataScalarFieldEnum = (typeof AuthDatabaseMetadataScalarFieldEnum)[keyof typeof AuthDatabaseMetadataScalarFieldEnum]


  export const GlobalSettingsScalarFieldEnum: {
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

  export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum]


  export const TokenRevocationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    binding_id: 'binding_id',
    revoked_at: 'revoked_at',
    expires_at: 'expires_at',
    aioson_play_id: 'aioson_play_id'
  };

  export type TokenRevocationScalarFieldEnum = (typeof TokenRevocationScalarFieldEnum)[keyof typeof TokenRevocationScalarFieldEnum]


  export const AppBindingScalarFieldEnum: {
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

  export type AppBindingScalarFieldEnum = (typeof AppBindingScalarFieldEnum)[keyof typeof AppBindingScalarFieldEnum]


  export const PlayAppInventoryScalarFieldEnum: {
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

  export type PlayAppInventoryScalarFieldEnum = (typeof PlayAppInventoryScalarFieldEnum)[keyof typeof PlayAppInventoryScalarFieldEnum]


  export const GlobalUserScalarFieldEnum: {
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

  export type GlobalUserScalarFieldEnum = (typeof GlobalUserScalarFieldEnum)[keyof typeof GlobalUserScalarFieldEnum]


  export const BindingPermissionScalarFieldEnum: {
    id: 'id',
    binding_id: 'binding_id',
    name: 'name',
    resource: 'resource',
    action: 'action',
    retired_at: 'retired_at',
    created_at: 'created_at'
  };

  export type BindingPermissionScalarFieldEnum = (typeof BindingPermissionScalarFieldEnum)[keyof typeof BindingPermissionScalarFieldEnum]


  export const AppProfileScalarFieldEnum: {
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

  export type AppProfileScalarFieldEnum = (typeof AppProfileScalarFieldEnum)[keyof typeof AppProfileScalarFieldEnum]


  export const AppProfilePermissionScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
    permission_id: 'permission_id',
    created_at: 'created_at'
  };

  export type AppProfilePermissionScalarFieldEnum = (typeof AppProfilePermissionScalarFieldEnum)[keyof typeof AppProfilePermissionScalarFieldEnum]


  export const AppAccessScalarFieldEnum: {
    id: 'id',
    binding_id: 'binding_id',
    user_id: 'user_id',
    profile_id: 'profile_id',
    status: 'status',
    aioson_play_origin_id: 'aioson_play_origin_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AppAccessScalarFieldEnum = (typeof AppAccessScalarFieldEnum)[keyof typeof AppAccessScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    id: 'id',
    role_id: 'role_id',
    permission_id: 'permission_id',
    binding_id: 'binding_id',
    created_at: 'created_at'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    role_id: 'role_id',
    binding_id: 'binding_id',
    aioson_play_origin_id: 'aioson_play_origin_id',
    created_at: 'created_at'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const AuthSessionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    binding_id: 'binding_id',
    expires_at: 'expires_at',
    aioson_play_id: 'aioson_play_id',
    created_at: 'created_at'
  };

  export type AuthSessionScalarFieldEnum = (typeof AuthSessionScalarFieldEnum)[keyof typeof AuthSessionScalarFieldEnum]


  export const RecoveryTokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    expires_at: 'expires_at',
    used: 'used',
    created_at: 'created_at'
  };

  export type RecoveryTokenScalarFieldEnum = (typeof RecoveryTokenScalarFieldEnum)[keyof typeof RecoveryTokenScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    created_at: 'created_at'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const FederationConfigScalarFieldEnum: {
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

  export type FederationConfigScalarFieldEnum = (typeof FederationConfigScalarFieldEnum)[keyof typeof FederationConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AuthDatabaseMetadataWhereInput = {
    AND?: AuthDatabaseMetadataWhereInput | AuthDatabaseMetadataWhereInput[]
    OR?: AuthDatabaseMetadataWhereInput[]
    NOT?: AuthDatabaseMetadataWhereInput | AuthDatabaseMetadataWhereInput[]
    id?: StringFilter<"AuthDatabaseMetadata"> | string
    schema_version?: IntFilter<"AuthDatabaseMetadata"> | number
    provider?: StringFilter<"AuthDatabaseMetadata"> | string
    installation_id?: StringNullableFilter<"AuthDatabaseMetadata"> | string | null
    owner_id?: StringNullableFilter<"AuthDatabaseMetadata"> | string | null
    migration_state?: StringFilter<"AuthDatabaseMetadata"> | string
    data_revision?: IntFilter<"AuthDatabaseMetadata"> | number
    source_revision?: IntNullableFilter<"AuthDatabaseMetadata"> | number | null
    created_at?: DateTimeFilter<"AuthDatabaseMetadata"> | Date | string
    updated_at?: DateTimeFilter<"AuthDatabaseMetadata"> | Date | string
  }

  export type AuthDatabaseMetadataOrderByWithRelationInput = {
    id?: SortOrder
    schema_version?: SortOrder
    provider?: SortOrder
    installation_id?: SortOrderInput | SortOrder
    owner_id?: SortOrderInput | SortOrder
    migration_state?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuthDatabaseMetadataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthDatabaseMetadataWhereInput | AuthDatabaseMetadataWhereInput[]
    OR?: AuthDatabaseMetadataWhereInput[]
    NOT?: AuthDatabaseMetadataWhereInput | AuthDatabaseMetadataWhereInput[]
    schema_version?: IntFilter<"AuthDatabaseMetadata"> | number
    provider?: StringFilter<"AuthDatabaseMetadata"> | string
    installation_id?: StringNullableFilter<"AuthDatabaseMetadata"> | string | null
    owner_id?: StringNullableFilter<"AuthDatabaseMetadata"> | string | null
    migration_state?: StringFilter<"AuthDatabaseMetadata"> | string
    data_revision?: IntFilter<"AuthDatabaseMetadata"> | number
    source_revision?: IntNullableFilter<"AuthDatabaseMetadata"> | number | null
    created_at?: DateTimeFilter<"AuthDatabaseMetadata"> | Date | string
    updated_at?: DateTimeFilter<"AuthDatabaseMetadata"> | Date | string
  }, "id">

  export type AuthDatabaseMetadataOrderByWithAggregationInput = {
    id?: SortOrder
    schema_version?: SortOrder
    provider?: SortOrder
    installation_id?: SortOrderInput | SortOrder
    owner_id?: SortOrderInput | SortOrder
    migration_state?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AuthDatabaseMetadataCountOrderByAggregateInput
    _avg?: AuthDatabaseMetadataAvgOrderByAggregateInput
    _max?: AuthDatabaseMetadataMaxOrderByAggregateInput
    _min?: AuthDatabaseMetadataMinOrderByAggregateInput
    _sum?: AuthDatabaseMetadataSumOrderByAggregateInput
  }

  export type AuthDatabaseMetadataScalarWhereWithAggregatesInput = {
    AND?: AuthDatabaseMetadataScalarWhereWithAggregatesInput | AuthDatabaseMetadataScalarWhereWithAggregatesInput[]
    OR?: AuthDatabaseMetadataScalarWhereWithAggregatesInput[]
    NOT?: AuthDatabaseMetadataScalarWhereWithAggregatesInput | AuthDatabaseMetadataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthDatabaseMetadata"> | string
    schema_version?: IntWithAggregatesFilter<"AuthDatabaseMetadata"> | number
    provider?: StringWithAggregatesFilter<"AuthDatabaseMetadata"> | string
    installation_id?: StringNullableWithAggregatesFilter<"AuthDatabaseMetadata"> | string | null
    owner_id?: StringNullableWithAggregatesFilter<"AuthDatabaseMetadata"> | string | null
    migration_state?: StringWithAggregatesFilter<"AuthDatabaseMetadata"> | string
    data_revision?: IntWithAggregatesFilter<"AuthDatabaseMetadata"> | number
    source_revision?: IntNullableWithAggregatesFilter<"AuthDatabaseMetadata"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"AuthDatabaseMetadata"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AuthDatabaseMetadata"> | Date | string
  }

  export type GlobalSettingsWhereInput = {
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    id?: StringFilter<"GlobalSettings"> | string
    google_client_id?: StringNullableFilter<"GlobalSettings"> | string | null
    google_client_secret?: StringNullableFilter<"GlobalSettings"> | string | null
    github_client_id?: StringNullableFilter<"GlobalSettings"> | string | null
    github_client_secret?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_host?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_port?: IntNullableFilter<"GlobalSettings"> | number | null
    smtp_user?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_pass?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_from_email?: StringNullableFilter<"GlobalSettings"> | string | null
    created_at?: DateTimeFilter<"GlobalSettings"> | Date | string
    updated_at?: DateTimeFilter<"GlobalSettings"> | Date | string
  }

  export type GlobalSettingsOrderByWithRelationInput = {
    id?: SortOrder
    google_client_id?: SortOrderInput | SortOrder
    google_client_secret?: SortOrderInput | SortOrder
    github_client_id?: SortOrderInput | SortOrder
    github_client_secret?: SortOrderInput | SortOrder
    smtp_host?: SortOrderInput | SortOrder
    smtp_port?: SortOrderInput | SortOrder
    smtp_user?: SortOrderInput | SortOrder
    smtp_pass?: SortOrderInput | SortOrder
    smtp_from_email?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    google_client_id?: StringNullableFilter<"GlobalSettings"> | string | null
    google_client_secret?: StringNullableFilter<"GlobalSettings"> | string | null
    github_client_id?: StringNullableFilter<"GlobalSettings"> | string | null
    github_client_secret?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_host?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_port?: IntNullableFilter<"GlobalSettings"> | number | null
    smtp_user?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_pass?: StringNullableFilter<"GlobalSettings"> | string | null
    smtp_from_email?: StringNullableFilter<"GlobalSettings"> | string | null
    created_at?: DateTimeFilter<"GlobalSettings"> | Date | string
    updated_at?: DateTimeFilter<"GlobalSettings"> | Date | string
  }, "id">

  export type GlobalSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    google_client_id?: SortOrderInput | SortOrder
    google_client_secret?: SortOrderInput | SortOrder
    github_client_id?: SortOrderInput | SortOrder
    github_client_secret?: SortOrderInput | SortOrder
    smtp_host?: SortOrderInput | SortOrder
    smtp_port?: SortOrderInput | SortOrder
    smtp_user?: SortOrderInput | SortOrder
    smtp_pass?: SortOrderInput | SortOrder
    smtp_from_email?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GlobalSettingsCountOrderByAggregateInput
    _avg?: GlobalSettingsAvgOrderByAggregateInput
    _max?: GlobalSettingsMaxOrderByAggregateInput
    _min?: GlobalSettingsMinOrderByAggregateInput
    _sum?: GlobalSettingsSumOrderByAggregateInput
  }

  export type GlobalSettingsScalarWhereWithAggregatesInput = {
    AND?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    OR?: GlobalSettingsScalarWhereWithAggregatesInput[]
    NOT?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalSettings"> | string
    google_client_id?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    google_client_secret?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    github_client_id?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    github_client_secret?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    smtp_host?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    smtp_port?: IntNullableWithAggregatesFilter<"GlobalSettings"> | number | null
    smtp_user?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    smtp_pass?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    smtp_from_email?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
  }

  export type TokenRevocationWhereInput = {
    AND?: TokenRevocationWhereInput | TokenRevocationWhereInput[]
    OR?: TokenRevocationWhereInput[]
    NOT?: TokenRevocationWhereInput | TokenRevocationWhereInput[]
    id?: StringFilter<"TokenRevocation"> | string
    user_id?: StringFilter<"TokenRevocation"> | string
    binding_id?: StringFilter<"TokenRevocation"> | string
    revoked_at?: DateTimeFilter<"TokenRevocation"> | Date | string
    expires_at?: DateTimeFilter<"TokenRevocation"> | Date | string
    aioson_play_id?: StringNullableFilter<"TokenRevocation"> | string | null
  }

  export type TokenRevocationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    binding_id?: SortOrder
    revoked_at?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
  }

  export type TokenRevocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenRevocationWhereInput | TokenRevocationWhereInput[]
    OR?: TokenRevocationWhereInput[]
    NOT?: TokenRevocationWhereInput | TokenRevocationWhereInput[]
    user_id?: StringFilter<"TokenRevocation"> | string
    binding_id?: StringFilter<"TokenRevocation"> | string
    revoked_at?: DateTimeFilter<"TokenRevocation"> | Date | string
    expires_at?: DateTimeFilter<"TokenRevocation"> | Date | string
    aioson_play_id?: StringNullableFilter<"TokenRevocation"> | string | null
  }, "id">

  export type TokenRevocationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    binding_id?: SortOrder
    revoked_at?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
    _count?: TokenRevocationCountOrderByAggregateInput
    _max?: TokenRevocationMaxOrderByAggregateInput
    _min?: TokenRevocationMinOrderByAggregateInput
  }

  export type TokenRevocationScalarWhereWithAggregatesInput = {
    AND?: TokenRevocationScalarWhereWithAggregatesInput | TokenRevocationScalarWhereWithAggregatesInput[]
    OR?: TokenRevocationScalarWhereWithAggregatesInput[]
    NOT?: TokenRevocationScalarWhereWithAggregatesInput | TokenRevocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenRevocation"> | string
    user_id?: StringWithAggregatesFilter<"TokenRevocation"> | string
    binding_id?: StringWithAggregatesFilter<"TokenRevocation"> | string
    revoked_at?: DateTimeWithAggregatesFilter<"TokenRevocation"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"TokenRevocation"> | Date | string
    aioson_play_id?: StringNullableWithAggregatesFilter<"TokenRevocation"> | string | null
  }

  export type AppBindingWhereInput = {
    AND?: AppBindingWhereInput | AppBindingWhereInput[]
    OR?: AppBindingWhereInput[]
    NOT?: AppBindingWhereInput | AppBindingWhereInput[]
    id?: StringFilter<"AppBinding"> | string
    app_name?: StringFilter<"AppBinding"> | string
    app_slug?: StringFilter<"AppBinding"> | string
    connection_name?: StringFilter<"AppBinding"> | string
    system_permissions?: StringFilter<"AppBinding"> | string
    enable_2fa?: BoolFilter<"AppBinding"> | boolean
    enable_rbac?: BoolFilter<"AppBinding"> | boolean
    auth_mode?: StringFilter<"AppBinding"> | string
    manifest_fingerprint?: StringNullableFilter<"AppBinding"> | string | null
    manifest_sync_status?: StringFilter<"AppBinding"> | string
    manifest_sync_error?: StringNullableFilter<"AppBinding"> | string | null
    manifest_synced_at?: DateTimeNullableFilter<"AppBinding"> | Date | string | null
    allowed_origins_json?: StringFilter<"AppBinding"> | string
    aioson_play_id?: StringNullableFilter<"AppBinding"> | string | null
    created_at?: DateTimeFilter<"AppBinding"> | Date | string
    updated_at?: DateTimeFilter<"AppBinding"> | Date | string
    permissions?: BindingPermissionListRelationFilter
    profiles?: AppProfileListRelationFilter
    accesses?: AppAccessListRelationFilter
  }

  export type AppBindingOrderByWithRelationInput = {
    id?: SortOrder
    app_name?: SortOrder
    app_slug?: SortOrder
    connection_name?: SortOrder
    system_permissions?: SortOrder
    enable_2fa?: SortOrder
    enable_rbac?: SortOrder
    auth_mode?: SortOrder
    manifest_fingerprint?: SortOrderInput | SortOrder
    manifest_sync_status?: SortOrder
    manifest_sync_error?: SortOrderInput | SortOrder
    manifest_synced_at?: SortOrderInput | SortOrder
    allowed_origins_json?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    permissions?: BindingPermissionOrderByRelationAggregateInput
    profiles?: AppProfileOrderByRelationAggregateInput
    accesses?: AppAccessOrderByRelationAggregateInput
  }

  export type AppBindingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppBindingWhereInput | AppBindingWhereInput[]
    OR?: AppBindingWhereInput[]
    NOT?: AppBindingWhereInput | AppBindingWhereInput[]
    app_name?: StringFilter<"AppBinding"> | string
    app_slug?: StringFilter<"AppBinding"> | string
    connection_name?: StringFilter<"AppBinding"> | string
    system_permissions?: StringFilter<"AppBinding"> | string
    enable_2fa?: BoolFilter<"AppBinding"> | boolean
    enable_rbac?: BoolFilter<"AppBinding"> | boolean
    auth_mode?: StringFilter<"AppBinding"> | string
    manifest_fingerprint?: StringNullableFilter<"AppBinding"> | string | null
    manifest_sync_status?: StringFilter<"AppBinding"> | string
    manifest_sync_error?: StringNullableFilter<"AppBinding"> | string | null
    manifest_synced_at?: DateTimeNullableFilter<"AppBinding"> | Date | string | null
    allowed_origins_json?: StringFilter<"AppBinding"> | string
    aioson_play_id?: StringNullableFilter<"AppBinding"> | string | null
    created_at?: DateTimeFilter<"AppBinding"> | Date | string
    updated_at?: DateTimeFilter<"AppBinding"> | Date | string
    permissions?: BindingPermissionListRelationFilter
    profiles?: AppProfileListRelationFilter
    accesses?: AppAccessListRelationFilter
  }, "id">

  export type AppBindingOrderByWithAggregationInput = {
    id?: SortOrder
    app_name?: SortOrder
    app_slug?: SortOrder
    connection_name?: SortOrder
    system_permissions?: SortOrder
    enable_2fa?: SortOrder
    enable_rbac?: SortOrder
    auth_mode?: SortOrder
    manifest_fingerprint?: SortOrderInput | SortOrder
    manifest_sync_status?: SortOrder
    manifest_sync_error?: SortOrderInput | SortOrder
    manifest_synced_at?: SortOrderInput | SortOrder
    allowed_origins_json?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AppBindingCountOrderByAggregateInput
    _max?: AppBindingMaxOrderByAggregateInput
    _min?: AppBindingMinOrderByAggregateInput
  }

  export type AppBindingScalarWhereWithAggregatesInput = {
    AND?: AppBindingScalarWhereWithAggregatesInput | AppBindingScalarWhereWithAggregatesInput[]
    OR?: AppBindingScalarWhereWithAggregatesInput[]
    NOT?: AppBindingScalarWhereWithAggregatesInput | AppBindingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppBinding"> | string
    app_name?: StringWithAggregatesFilter<"AppBinding"> | string
    app_slug?: StringWithAggregatesFilter<"AppBinding"> | string
    connection_name?: StringWithAggregatesFilter<"AppBinding"> | string
    system_permissions?: StringWithAggregatesFilter<"AppBinding"> | string
    enable_2fa?: BoolWithAggregatesFilter<"AppBinding"> | boolean
    enable_rbac?: BoolWithAggregatesFilter<"AppBinding"> | boolean
    auth_mode?: StringWithAggregatesFilter<"AppBinding"> | string
    manifest_fingerprint?: StringNullableWithAggregatesFilter<"AppBinding"> | string | null
    manifest_sync_status?: StringWithAggregatesFilter<"AppBinding"> | string
    manifest_sync_error?: StringNullableWithAggregatesFilter<"AppBinding"> | string | null
    manifest_synced_at?: DateTimeNullableWithAggregatesFilter<"AppBinding"> | Date | string | null
    allowed_origins_json?: StringWithAggregatesFilter<"AppBinding"> | string
    aioson_play_id?: StringNullableWithAggregatesFilter<"AppBinding"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AppBinding"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppBinding"> | Date | string
  }

  export type PlayAppInventoryWhereInput = {
    AND?: PlayAppInventoryWhereInput | PlayAppInventoryWhereInput[]
    OR?: PlayAppInventoryWhereInput[]
    NOT?: PlayAppInventoryWhereInput | PlayAppInventoryWhereInput[]
    id?: StringFilter<"PlayAppInventory"> | string
    aioson_play_id?: StringFilter<"PlayAppInventory"> | string
    inventory_id?: StringFilter<"PlayAppInventory"> | string
    app_slug?: StringNullableFilter<"PlayAppInventory"> | string | null
    app_name?: StringFilter<"PlayAppInventory"> | string
    version?: StringNullableFilter<"PlayAppInventory"> | string | null
    description?: StringNullableFilter<"PlayAppInventory"> | string | null
    lifecycle?: StringFilter<"PlayAppInventory"> | string
    source?: StringFilter<"PlayAppInventory"> | string
    supports_auth?: BoolFilter<"PlayAppInventory"> | boolean
    accepted_roles_json?: StringFilter<"PlayAppInventory"> | string
    manifest_fingerprint?: StringNullableFilter<"PlayAppInventory"> | string | null
    warnings_json?: StringFilter<"PlayAppInventory"> | string
    last_seen_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
    archived_at?: DateTimeNullableFilter<"PlayAppInventory"> | Date | string | null
    created_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
    updated_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
  }

  export type PlayAppInventoryOrderByWithRelationInput = {
    id?: SortOrder
    aioson_play_id?: SortOrder
    inventory_id?: SortOrder
    app_slug?: SortOrderInput | SortOrder
    app_name?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    lifecycle?: SortOrder
    source?: SortOrder
    supports_auth?: SortOrder
    accepted_roles_json?: SortOrder
    manifest_fingerprint?: SortOrderInput | SortOrder
    warnings_json?: SortOrder
    last_seen_at?: SortOrder
    archived_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PlayAppInventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    aioson_play_id_inventory_id?: PlayAppInventoryAioson_play_idInventory_idCompoundUniqueInput
    AND?: PlayAppInventoryWhereInput | PlayAppInventoryWhereInput[]
    OR?: PlayAppInventoryWhereInput[]
    NOT?: PlayAppInventoryWhereInput | PlayAppInventoryWhereInput[]
    aioson_play_id?: StringFilter<"PlayAppInventory"> | string
    inventory_id?: StringFilter<"PlayAppInventory"> | string
    app_slug?: StringNullableFilter<"PlayAppInventory"> | string | null
    app_name?: StringFilter<"PlayAppInventory"> | string
    version?: StringNullableFilter<"PlayAppInventory"> | string | null
    description?: StringNullableFilter<"PlayAppInventory"> | string | null
    lifecycle?: StringFilter<"PlayAppInventory"> | string
    source?: StringFilter<"PlayAppInventory"> | string
    supports_auth?: BoolFilter<"PlayAppInventory"> | boolean
    accepted_roles_json?: StringFilter<"PlayAppInventory"> | string
    manifest_fingerprint?: StringNullableFilter<"PlayAppInventory"> | string | null
    warnings_json?: StringFilter<"PlayAppInventory"> | string
    last_seen_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
    archived_at?: DateTimeNullableFilter<"PlayAppInventory"> | Date | string | null
    created_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
    updated_at?: DateTimeFilter<"PlayAppInventory"> | Date | string
  }, "id" | "aioson_play_id_inventory_id">

  export type PlayAppInventoryOrderByWithAggregationInput = {
    id?: SortOrder
    aioson_play_id?: SortOrder
    inventory_id?: SortOrder
    app_slug?: SortOrderInput | SortOrder
    app_name?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    lifecycle?: SortOrder
    source?: SortOrder
    supports_auth?: SortOrder
    accepted_roles_json?: SortOrder
    manifest_fingerprint?: SortOrderInput | SortOrder
    warnings_json?: SortOrder
    last_seen_at?: SortOrder
    archived_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PlayAppInventoryCountOrderByAggregateInput
    _max?: PlayAppInventoryMaxOrderByAggregateInput
    _min?: PlayAppInventoryMinOrderByAggregateInput
  }

  export type PlayAppInventoryScalarWhereWithAggregatesInput = {
    AND?: PlayAppInventoryScalarWhereWithAggregatesInput | PlayAppInventoryScalarWhereWithAggregatesInput[]
    OR?: PlayAppInventoryScalarWhereWithAggregatesInput[]
    NOT?: PlayAppInventoryScalarWhereWithAggregatesInput | PlayAppInventoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    aioson_play_id?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    inventory_id?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    app_slug?: StringNullableWithAggregatesFilter<"PlayAppInventory"> | string | null
    app_name?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    version?: StringNullableWithAggregatesFilter<"PlayAppInventory"> | string | null
    description?: StringNullableWithAggregatesFilter<"PlayAppInventory"> | string | null
    lifecycle?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    source?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    supports_auth?: BoolWithAggregatesFilter<"PlayAppInventory"> | boolean
    accepted_roles_json?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    manifest_fingerprint?: StringNullableWithAggregatesFilter<"PlayAppInventory"> | string | null
    warnings_json?: StringWithAggregatesFilter<"PlayAppInventory"> | string
    last_seen_at?: DateTimeWithAggregatesFilter<"PlayAppInventory"> | Date | string
    archived_at?: DateTimeNullableWithAggregatesFilter<"PlayAppInventory"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"PlayAppInventory"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PlayAppInventory"> | Date | string
  }

  export type GlobalUserWhereInput = {
    AND?: GlobalUserWhereInput | GlobalUserWhereInput[]
    OR?: GlobalUserWhereInput[]
    NOT?: GlobalUserWhereInput | GlobalUserWhereInput[]
    id?: StringFilter<"GlobalUser"> | string
    email?: StringFilter<"GlobalUser"> | string
    password_hash?: StringNullableFilter<"GlobalUser"> | string | null
    name?: StringFilter<"GlobalUser"> | string
    totp_secret?: StringNullableFilter<"GlobalUser"> | string | null
    aioson_play_origin_id?: StringNullableFilter<"GlobalUser"> | string | null
    disabled_at?: DateTimeNullableFilter<"GlobalUser"> | Date | string | null
    created_at?: DateTimeFilter<"GlobalUser"> | Date | string
    updated_at?: DateTimeFilter<"GlobalUser"> | Date | string
    sessions?: AuthSessionListRelationFilter
    user_roles?: UserRoleListRelationFilter
    app_accesses?: AppAccessListRelationFilter
  }

  export type GlobalUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    name?: SortOrder
    totp_secret?: SortOrderInput | SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    disabled_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    sessions?: AuthSessionOrderByRelationAggregateInput
    user_roles?: UserRoleOrderByRelationAggregateInput
    app_accesses?: AppAccessOrderByRelationAggregateInput
  }

  export type GlobalUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: GlobalUserWhereInput | GlobalUserWhereInput[]
    OR?: GlobalUserWhereInput[]
    NOT?: GlobalUserWhereInput | GlobalUserWhereInput[]
    password_hash?: StringNullableFilter<"GlobalUser"> | string | null
    name?: StringFilter<"GlobalUser"> | string
    totp_secret?: StringNullableFilter<"GlobalUser"> | string | null
    aioson_play_origin_id?: StringNullableFilter<"GlobalUser"> | string | null
    disabled_at?: DateTimeNullableFilter<"GlobalUser"> | Date | string | null
    created_at?: DateTimeFilter<"GlobalUser"> | Date | string
    updated_at?: DateTimeFilter<"GlobalUser"> | Date | string
    sessions?: AuthSessionListRelationFilter
    user_roles?: UserRoleListRelationFilter
    app_accesses?: AppAccessListRelationFilter
  }, "id" | "email">

  export type GlobalUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    name?: SortOrder
    totp_secret?: SortOrderInput | SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    disabled_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GlobalUserCountOrderByAggregateInput
    _max?: GlobalUserMaxOrderByAggregateInput
    _min?: GlobalUserMinOrderByAggregateInput
  }

  export type GlobalUserScalarWhereWithAggregatesInput = {
    AND?: GlobalUserScalarWhereWithAggregatesInput | GlobalUserScalarWhereWithAggregatesInput[]
    OR?: GlobalUserScalarWhereWithAggregatesInput[]
    NOT?: GlobalUserScalarWhereWithAggregatesInput | GlobalUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalUser"> | string
    email?: StringWithAggregatesFilter<"GlobalUser"> | string
    password_hash?: StringNullableWithAggregatesFilter<"GlobalUser"> | string | null
    name?: StringWithAggregatesFilter<"GlobalUser"> | string
    totp_secret?: StringNullableWithAggregatesFilter<"GlobalUser"> | string | null
    aioson_play_origin_id?: StringNullableWithAggregatesFilter<"GlobalUser"> | string | null
    disabled_at?: DateTimeNullableWithAggregatesFilter<"GlobalUser"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"GlobalUser"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"GlobalUser"> | Date | string
  }

  export type BindingPermissionWhereInput = {
    AND?: BindingPermissionWhereInput | BindingPermissionWhereInput[]
    OR?: BindingPermissionWhereInput[]
    NOT?: BindingPermissionWhereInput | BindingPermissionWhereInput[]
    id?: StringFilter<"BindingPermission"> | string
    binding_id?: StringFilter<"BindingPermission"> | string
    name?: StringFilter<"BindingPermission"> | string
    resource?: StringFilter<"BindingPermission"> | string
    action?: StringFilter<"BindingPermission"> | string
    retired_at?: DateTimeNullableFilter<"BindingPermission"> | Date | string | null
    created_at?: DateTimeFilter<"BindingPermission"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    role_perms?: RolePermissionListRelationFilter
    profile_perms?: AppProfilePermissionListRelationFilter
  }

  export type BindingPermissionOrderByWithRelationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    retired_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    binding?: AppBindingOrderByWithRelationInput
    role_perms?: RolePermissionOrderByRelationAggregateInput
    profile_perms?: AppProfilePermissionOrderByRelationAggregateInput
  }

  export type BindingPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    binding_id_name?: BindingPermissionBinding_idNameCompoundUniqueInput
    AND?: BindingPermissionWhereInput | BindingPermissionWhereInput[]
    OR?: BindingPermissionWhereInput[]
    NOT?: BindingPermissionWhereInput | BindingPermissionWhereInput[]
    binding_id?: StringFilter<"BindingPermission"> | string
    name?: StringFilter<"BindingPermission"> | string
    resource?: StringFilter<"BindingPermission"> | string
    action?: StringFilter<"BindingPermission"> | string
    retired_at?: DateTimeNullableFilter<"BindingPermission"> | Date | string | null
    created_at?: DateTimeFilter<"BindingPermission"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    role_perms?: RolePermissionListRelationFilter
    profile_perms?: AppProfilePermissionListRelationFilter
  }, "id" | "binding_id_name">

  export type BindingPermissionOrderByWithAggregationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    retired_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: BindingPermissionCountOrderByAggregateInput
    _max?: BindingPermissionMaxOrderByAggregateInput
    _min?: BindingPermissionMinOrderByAggregateInput
  }

  export type BindingPermissionScalarWhereWithAggregatesInput = {
    AND?: BindingPermissionScalarWhereWithAggregatesInput | BindingPermissionScalarWhereWithAggregatesInput[]
    OR?: BindingPermissionScalarWhereWithAggregatesInput[]
    NOT?: BindingPermissionScalarWhereWithAggregatesInput | BindingPermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BindingPermission"> | string
    binding_id?: StringWithAggregatesFilter<"BindingPermission"> | string
    name?: StringWithAggregatesFilter<"BindingPermission"> | string
    resource?: StringWithAggregatesFilter<"BindingPermission"> | string
    action?: StringWithAggregatesFilter<"BindingPermission"> | string
    retired_at?: DateTimeNullableWithAggregatesFilter<"BindingPermission"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"BindingPermission"> | Date | string
  }

  export type AppProfileWhereInput = {
    AND?: AppProfileWhereInput | AppProfileWhereInput[]
    OR?: AppProfileWhereInput[]
    NOT?: AppProfileWhereInput | AppProfileWhereInput[]
    id?: StringFilter<"AppProfile"> | string
    binding_id?: StringFilter<"AppProfile"> | string
    name?: StringFilter<"AppProfile"> | string
    description?: StringFilter<"AppProfile"> | string
    is_system?: BoolFilter<"AppProfile"> | boolean
    is_migration_generated?: BoolFilter<"AppProfile"> | boolean
    archived_at?: DateTimeNullableFilter<"AppProfile"> | Date | string | null
    created_at?: DateTimeFilter<"AppProfile"> | Date | string
    updated_at?: DateTimeFilter<"AppProfile"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    permissions?: AppProfilePermissionListRelationFilter
    accesses?: AppAccessListRelationFilter
  }

  export type AppProfileOrderByWithRelationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_system?: SortOrder
    is_migration_generated?: SortOrder
    archived_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    binding?: AppBindingOrderByWithRelationInput
    permissions?: AppProfilePermissionOrderByRelationAggregateInput
    accesses?: AppAccessOrderByRelationAggregateInput
  }

  export type AppProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    binding_id_name?: AppProfileBinding_idNameCompoundUniqueInput
    AND?: AppProfileWhereInput | AppProfileWhereInput[]
    OR?: AppProfileWhereInput[]
    NOT?: AppProfileWhereInput | AppProfileWhereInput[]
    binding_id?: StringFilter<"AppProfile"> | string
    name?: StringFilter<"AppProfile"> | string
    description?: StringFilter<"AppProfile"> | string
    is_system?: BoolFilter<"AppProfile"> | boolean
    is_migration_generated?: BoolFilter<"AppProfile"> | boolean
    archived_at?: DateTimeNullableFilter<"AppProfile"> | Date | string | null
    created_at?: DateTimeFilter<"AppProfile"> | Date | string
    updated_at?: DateTimeFilter<"AppProfile"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    permissions?: AppProfilePermissionListRelationFilter
    accesses?: AppAccessListRelationFilter
  }, "id" | "binding_id_name">

  export type AppProfileOrderByWithAggregationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_system?: SortOrder
    is_migration_generated?: SortOrder
    archived_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AppProfileCountOrderByAggregateInput
    _max?: AppProfileMaxOrderByAggregateInput
    _min?: AppProfileMinOrderByAggregateInput
  }

  export type AppProfileScalarWhereWithAggregatesInput = {
    AND?: AppProfileScalarWhereWithAggregatesInput | AppProfileScalarWhereWithAggregatesInput[]
    OR?: AppProfileScalarWhereWithAggregatesInput[]
    NOT?: AppProfileScalarWhereWithAggregatesInput | AppProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppProfile"> | string
    binding_id?: StringWithAggregatesFilter<"AppProfile"> | string
    name?: StringWithAggregatesFilter<"AppProfile"> | string
    description?: StringWithAggregatesFilter<"AppProfile"> | string
    is_system?: BoolWithAggregatesFilter<"AppProfile"> | boolean
    is_migration_generated?: BoolWithAggregatesFilter<"AppProfile"> | boolean
    archived_at?: DateTimeNullableWithAggregatesFilter<"AppProfile"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"AppProfile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppProfile"> | Date | string
  }

  export type AppProfilePermissionWhereInput = {
    AND?: AppProfilePermissionWhereInput | AppProfilePermissionWhereInput[]
    OR?: AppProfilePermissionWhereInput[]
    NOT?: AppProfilePermissionWhereInput | AppProfilePermissionWhereInput[]
    id?: StringFilter<"AppProfilePermission"> | string
    profile_id?: StringFilter<"AppProfilePermission"> | string
    permission_id?: StringFilter<"AppProfilePermission"> | string
    created_at?: DateTimeFilter<"AppProfilePermission"> | Date | string
    profile?: XOR<AppProfileRelationFilter, AppProfileWhereInput>
    permission?: XOR<BindingPermissionRelationFilter, BindingPermissionWhereInput>
  }

  export type AppProfilePermissionOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    permission_id?: SortOrder
    created_at?: SortOrder
    profile?: AppProfileOrderByWithRelationInput
    permission?: BindingPermissionOrderByWithRelationInput
  }

  export type AppProfilePermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profile_id_permission_id?: AppProfilePermissionProfile_idPermission_idCompoundUniqueInput
    AND?: AppProfilePermissionWhereInput | AppProfilePermissionWhereInput[]
    OR?: AppProfilePermissionWhereInput[]
    NOT?: AppProfilePermissionWhereInput | AppProfilePermissionWhereInput[]
    profile_id?: StringFilter<"AppProfilePermission"> | string
    permission_id?: StringFilter<"AppProfilePermission"> | string
    created_at?: DateTimeFilter<"AppProfilePermission"> | Date | string
    profile?: XOR<AppProfileRelationFilter, AppProfileWhereInput>
    permission?: XOR<BindingPermissionRelationFilter, BindingPermissionWhereInput>
  }, "id" | "profile_id_permission_id">

  export type AppProfilePermissionOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    permission_id?: SortOrder
    created_at?: SortOrder
    _count?: AppProfilePermissionCountOrderByAggregateInput
    _max?: AppProfilePermissionMaxOrderByAggregateInput
    _min?: AppProfilePermissionMinOrderByAggregateInput
  }

  export type AppProfilePermissionScalarWhereWithAggregatesInput = {
    AND?: AppProfilePermissionScalarWhereWithAggregatesInput | AppProfilePermissionScalarWhereWithAggregatesInput[]
    OR?: AppProfilePermissionScalarWhereWithAggregatesInput[]
    NOT?: AppProfilePermissionScalarWhereWithAggregatesInput | AppProfilePermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppProfilePermission"> | string
    profile_id?: StringWithAggregatesFilter<"AppProfilePermission"> | string
    permission_id?: StringWithAggregatesFilter<"AppProfilePermission"> | string
    created_at?: DateTimeWithAggregatesFilter<"AppProfilePermission"> | Date | string
  }

  export type AppAccessWhereInput = {
    AND?: AppAccessWhereInput | AppAccessWhereInput[]
    OR?: AppAccessWhereInput[]
    NOT?: AppAccessWhereInput | AppAccessWhereInput[]
    id?: StringFilter<"AppAccess"> | string
    binding_id?: StringFilter<"AppAccess"> | string
    user_id?: StringFilter<"AppAccess"> | string
    profile_id?: StringFilter<"AppAccess"> | string
    status?: StringFilter<"AppAccess"> | string
    aioson_play_origin_id?: StringNullableFilter<"AppAccess"> | string | null
    created_at?: DateTimeFilter<"AppAccess"> | Date | string
    updated_at?: DateTimeFilter<"AppAccess"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
    profile?: XOR<AppProfileRelationFilter, AppProfileWhereInput>
  }

  export type AppAccessOrderByWithRelationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    user_id?: SortOrder
    profile_id?: SortOrder
    status?: SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    binding?: AppBindingOrderByWithRelationInput
    user?: GlobalUserOrderByWithRelationInput
    profile?: AppProfileOrderByWithRelationInput
  }

  export type AppAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    binding_id_user_id?: AppAccessBinding_idUser_idCompoundUniqueInput
    AND?: AppAccessWhereInput | AppAccessWhereInput[]
    OR?: AppAccessWhereInput[]
    NOT?: AppAccessWhereInput | AppAccessWhereInput[]
    binding_id?: StringFilter<"AppAccess"> | string
    user_id?: StringFilter<"AppAccess"> | string
    profile_id?: StringFilter<"AppAccess"> | string
    status?: StringFilter<"AppAccess"> | string
    aioson_play_origin_id?: StringNullableFilter<"AppAccess"> | string | null
    created_at?: DateTimeFilter<"AppAccess"> | Date | string
    updated_at?: DateTimeFilter<"AppAccess"> | Date | string
    binding?: XOR<AppBindingRelationFilter, AppBindingWhereInput>
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
    profile?: XOR<AppProfileRelationFilter, AppProfileWhereInput>
  }, "id" | "binding_id_user_id">

  export type AppAccessOrderByWithAggregationInput = {
    id?: SortOrder
    binding_id?: SortOrder
    user_id?: SortOrder
    profile_id?: SortOrder
    status?: SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AppAccessCountOrderByAggregateInput
    _max?: AppAccessMaxOrderByAggregateInput
    _min?: AppAccessMinOrderByAggregateInput
  }

  export type AppAccessScalarWhereWithAggregatesInput = {
    AND?: AppAccessScalarWhereWithAggregatesInput | AppAccessScalarWhereWithAggregatesInput[]
    OR?: AppAccessScalarWhereWithAggregatesInput[]
    NOT?: AppAccessScalarWhereWithAggregatesInput | AppAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppAccess"> | string
    binding_id?: StringWithAggregatesFilter<"AppAccess"> | string
    user_id?: StringWithAggregatesFilter<"AppAccess"> | string
    profile_id?: StringWithAggregatesFilter<"AppAccess"> | string
    status?: StringWithAggregatesFilter<"AppAccess"> | string
    aioson_play_origin_id?: StringNullableWithAggregatesFilter<"AppAccess"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AppAccess"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppAccess"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringFilter<"Role"> | string
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    permissions?: RolePermissionListRelationFilter
    user_roles?: UserRoleListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    permissions?: RolePermissionOrderByRelationAggregateInput
    user_roles?: UserRoleOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringFilter<"Role"> | string
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    permissions?: RolePermissionListRelationFilter
    user_roles?: UserRoleListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringWithAggregatesFilter<"Role"> | string
    created_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    id?: StringFilter<"RolePermission"> | string
    role_id?: StringFilter<"RolePermission"> | string
    permission_id?: StringFilter<"RolePermission"> | string
    binding_id?: StringFilter<"RolePermission"> | string
    created_at?: DateTimeFilter<"RolePermission"> | Date | string
    role?: XOR<RoleRelationFilter, RoleWhereInput>
    permission?: XOR<BindingPermissionRelationFilter, BindingPermissionWhereInput>
  }

  export type RolePermissionOrderByWithRelationInput = {
    id?: SortOrder
    role_id?: SortOrder
    permission_id?: SortOrder
    binding_id?: SortOrder
    created_at?: SortOrder
    role?: RoleOrderByWithRelationInput
    permission?: BindingPermissionOrderByWithRelationInput
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    role_id_permission_id_binding_id?: RolePermissionRole_idPermission_idBinding_idCompoundUniqueInput
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    role_id?: StringFilter<"RolePermission"> | string
    permission_id?: StringFilter<"RolePermission"> | string
    binding_id?: StringFilter<"RolePermission"> | string
    created_at?: DateTimeFilter<"RolePermission"> | Date | string
    role?: XOR<RoleRelationFilter, RoleWhereInput>
    permission?: XOR<BindingPermissionRelationFilter, BindingPermissionWhereInput>
  }, "id" | "role_id_permission_id_binding_id">

  export type RolePermissionOrderByWithAggregationInput = {
    id?: SortOrder
    role_id?: SortOrder
    permission_id?: SortOrder
    binding_id?: SortOrder
    created_at?: SortOrder
    _count?: RolePermissionCountOrderByAggregateInput
    _max?: RolePermissionMaxOrderByAggregateInput
    _min?: RolePermissionMinOrderByAggregateInput
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    OR?: RolePermissionScalarWhereWithAggregatesInput[]
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RolePermission"> | string
    role_id?: StringWithAggregatesFilter<"RolePermission"> | string
    permission_id?: StringWithAggregatesFilter<"RolePermission"> | string
    binding_id?: StringWithAggregatesFilter<"RolePermission"> | string
    created_at?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    id?: StringFilter<"UserRole"> | string
    user_id?: StringFilter<"UserRole"> | string
    role_id?: StringFilter<"UserRole"> | string
    binding_id?: StringFilter<"UserRole"> | string
    aioson_play_origin_id?: StringNullableFilter<"UserRole"> | string | null
    created_at?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
    role?: XOR<RoleRelationFilter, RoleWhereInput>
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    binding_id?: SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: GlobalUserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_role_id_binding_id?: UserRoleUser_idRole_idBinding_idCompoundUniqueInput
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    user_id?: StringFilter<"UserRole"> | string
    role_id?: StringFilter<"UserRole"> | string
    binding_id?: StringFilter<"UserRole"> | string
    aioson_play_origin_id?: StringNullableFilter<"UserRole"> | string | null
    created_at?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
    role?: XOR<RoleRelationFilter, RoleWhereInput>
  }, "id" | "user_id_role_id_binding_id">

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    binding_id?: SortOrder
    aioson_play_origin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    OR?: UserRoleScalarWhereWithAggregatesInput[]
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserRole"> | string
    user_id?: StringWithAggregatesFilter<"UserRole"> | string
    role_id?: StringWithAggregatesFilter<"UserRole"> | string
    binding_id?: StringWithAggregatesFilter<"UserRole"> | string
    aioson_play_origin_id?: StringNullableWithAggregatesFilter<"UserRole"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string
  }

  export type AuthSessionWhereInput = {
    AND?: AuthSessionWhereInput | AuthSessionWhereInput[]
    OR?: AuthSessionWhereInput[]
    NOT?: AuthSessionWhereInput | AuthSessionWhereInput[]
    id?: StringFilter<"AuthSession"> | string
    user_id?: StringFilter<"AuthSession"> | string
    token?: StringFilter<"AuthSession"> | string
    binding_id?: StringNullableFilter<"AuthSession"> | string | null
    expires_at?: DateTimeFilter<"AuthSession"> | Date | string
    aioson_play_id?: StringNullableFilter<"AuthSession"> | string | null
    created_at?: DateTimeFilter<"AuthSession"> | Date | string
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
  }

  export type AuthSessionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    binding_id?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: GlobalUserOrderByWithRelationInput
  }

  export type AuthSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: AuthSessionWhereInput | AuthSessionWhereInput[]
    OR?: AuthSessionWhereInput[]
    NOT?: AuthSessionWhereInput | AuthSessionWhereInput[]
    user_id?: StringFilter<"AuthSession"> | string
    binding_id?: StringNullableFilter<"AuthSession"> | string | null
    expires_at?: DateTimeFilter<"AuthSession"> | Date | string
    aioson_play_id?: StringNullableFilter<"AuthSession"> | string | null
    created_at?: DateTimeFilter<"AuthSession"> | Date | string
    user?: XOR<GlobalUserRelationFilter, GlobalUserWhereInput>
  }, "id" | "token">

  export type AuthSessionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    binding_id?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuthSessionCountOrderByAggregateInput
    _max?: AuthSessionMaxOrderByAggregateInput
    _min?: AuthSessionMinOrderByAggregateInput
  }

  export type AuthSessionScalarWhereWithAggregatesInput = {
    AND?: AuthSessionScalarWhereWithAggregatesInput | AuthSessionScalarWhereWithAggregatesInput[]
    OR?: AuthSessionScalarWhereWithAggregatesInput[]
    NOT?: AuthSessionScalarWhereWithAggregatesInput | AuthSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthSession"> | string
    user_id?: StringWithAggregatesFilter<"AuthSession"> | string
    token?: StringWithAggregatesFilter<"AuthSession"> | string
    binding_id?: StringNullableWithAggregatesFilter<"AuthSession"> | string | null
    expires_at?: DateTimeWithAggregatesFilter<"AuthSession"> | Date | string
    aioson_play_id?: StringNullableWithAggregatesFilter<"AuthSession"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuthSession"> | Date | string
  }

  export type RecoveryTokenWhereInput = {
    AND?: RecoveryTokenWhereInput | RecoveryTokenWhereInput[]
    OR?: RecoveryTokenWhereInput[]
    NOT?: RecoveryTokenWhereInput | RecoveryTokenWhereInput[]
    id?: StringFilter<"RecoveryToken"> | string
    user_id?: StringFilter<"RecoveryToken"> | string
    token?: StringFilter<"RecoveryToken"> | string
    expires_at?: DateTimeFilter<"RecoveryToken"> | Date | string
    used?: BoolFilter<"RecoveryToken"> | boolean
    created_at?: DateTimeFilter<"RecoveryToken"> | Date | string
  }

  export type RecoveryTokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
  }

  export type RecoveryTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RecoveryTokenWhereInput | RecoveryTokenWhereInput[]
    OR?: RecoveryTokenWhereInput[]
    NOT?: RecoveryTokenWhereInput | RecoveryTokenWhereInput[]
    user_id?: StringFilter<"RecoveryToken"> | string
    expires_at?: DateTimeFilter<"RecoveryToken"> | Date | string
    used?: BoolFilter<"RecoveryToken"> | boolean
    created_at?: DateTimeFilter<"RecoveryToken"> | Date | string
  }, "id" | "token">

  export type RecoveryTokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    _count?: RecoveryTokenCountOrderByAggregateInput
    _max?: RecoveryTokenMaxOrderByAggregateInput
    _min?: RecoveryTokenMinOrderByAggregateInput
  }

  export type RecoveryTokenScalarWhereWithAggregatesInput = {
    AND?: RecoveryTokenScalarWhereWithAggregatesInput | RecoveryTokenScalarWhereWithAggregatesInput[]
    OR?: RecoveryTokenScalarWhereWithAggregatesInput[]
    NOT?: RecoveryTokenScalarWhereWithAggregatesInput | RecoveryTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecoveryToken"> | string
    user_id?: StringWithAggregatesFilter<"RecoveryToken"> | string
    token?: StringWithAggregatesFilter<"RecoveryToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"RecoveryToken"> | Date | string
    used?: BoolWithAggregatesFilter<"RecoveryToken"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"RecoveryToken"> | Date | string
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    email?: StringFilter<"AdminUser"> | string
    password_hash?: StringFilter<"AdminUser"> | string
    created_at?: DateTimeFilter<"AdminUser"> | Date | string
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    password_hash?: StringFilter<"AdminUser"> | string
    created_at?: DateTimeFilter<"AdminUser"> | Date | string
  }, "id" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    password_hash?: StringWithAggregatesFilter<"AdminUser"> | string
    created_at?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type FederationConfigWhereInput = {
    AND?: FederationConfigWhereInput | FederationConfigWhereInput[]
    OR?: FederationConfigWhereInput[]
    NOT?: FederationConfigWhereInput | FederationConfigWhereInput[]
    id?: StringFilter<"FederationConfig"> | string
    federation_active?: BoolFilter<"FederationConfig"> | boolean
    project_id?: StringNullableFilter<"FederationConfig"> | string | null
    project_name?: StringNullableFilter<"FederationConfig"> | string | null
    db_provider?: StringNullableFilter<"FederationConfig"> | string | null
    db_connection_keyring_id?: StringNullableFilter<"FederationConfig"> | string | null
    activated_at?: DateTimeNullableFilter<"FederationConfig"> | Date | string | null
    created_at?: DateTimeFilter<"FederationConfig"> | Date | string
    updated_at?: DateTimeFilter<"FederationConfig"> | Date | string
  }

  export type FederationConfigOrderByWithRelationInput = {
    id?: SortOrder
    federation_active?: SortOrder
    project_id?: SortOrderInput | SortOrder
    project_name?: SortOrderInput | SortOrder
    db_provider?: SortOrderInput | SortOrder
    db_connection_keyring_id?: SortOrderInput | SortOrder
    activated_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FederationConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FederationConfigWhereInput | FederationConfigWhereInput[]
    OR?: FederationConfigWhereInput[]
    NOT?: FederationConfigWhereInput | FederationConfigWhereInput[]
    federation_active?: BoolFilter<"FederationConfig"> | boolean
    project_id?: StringNullableFilter<"FederationConfig"> | string | null
    project_name?: StringNullableFilter<"FederationConfig"> | string | null
    db_provider?: StringNullableFilter<"FederationConfig"> | string | null
    db_connection_keyring_id?: StringNullableFilter<"FederationConfig"> | string | null
    activated_at?: DateTimeNullableFilter<"FederationConfig"> | Date | string | null
    created_at?: DateTimeFilter<"FederationConfig"> | Date | string
    updated_at?: DateTimeFilter<"FederationConfig"> | Date | string
  }, "id">

  export type FederationConfigOrderByWithAggregationInput = {
    id?: SortOrder
    federation_active?: SortOrder
    project_id?: SortOrderInput | SortOrder
    project_name?: SortOrderInput | SortOrder
    db_provider?: SortOrderInput | SortOrder
    db_connection_keyring_id?: SortOrderInput | SortOrder
    activated_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FederationConfigCountOrderByAggregateInput
    _max?: FederationConfigMaxOrderByAggregateInput
    _min?: FederationConfigMinOrderByAggregateInput
  }

  export type FederationConfigScalarWhereWithAggregatesInput = {
    AND?: FederationConfigScalarWhereWithAggregatesInput | FederationConfigScalarWhereWithAggregatesInput[]
    OR?: FederationConfigScalarWhereWithAggregatesInput[]
    NOT?: FederationConfigScalarWhereWithAggregatesInput | FederationConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FederationConfig"> | string
    federation_active?: BoolWithAggregatesFilter<"FederationConfig"> | boolean
    project_id?: StringNullableWithAggregatesFilter<"FederationConfig"> | string | null
    project_name?: StringNullableWithAggregatesFilter<"FederationConfig"> | string | null
    db_provider?: StringNullableWithAggregatesFilter<"FederationConfig"> | string | null
    db_connection_keyring_id?: StringNullableWithAggregatesFilter<"FederationConfig"> | string | null
    activated_at?: DateTimeNullableWithAggregatesFilter<"FederationConfig"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"FederationConfig"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FederationConfig"> | Date | string
  }

  export type AuthDatabaseMetadataCreateInput = {
    id?: string
    schema_version?: number
    provider: string
    installation_id?: string | null
    owner_id?: string | null
    migration_state?: string
    data_revision?: number
    source_revision?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuthDatabaseMetadataUncheckedCreateInput = {
    id?: string
    schema_version?: number
    provider: string
    installation_id?: string | null
    owner_id?: string | null
    migration_state?: string
    data_revision?: number
    source_revision?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuthDatabaseMetadataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schema_version?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    installation_id?: NullableStringFieldUpdateOperationsInput | string | null
    owner_id?: NullableStringFieldUpdateOperationsInput | string | null
    migration_state?: StringFieldUpdateOperationsInput | string
    data_revision?: IntFieldUpdateOperationsInput | number
    source_revision?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthDatabaseMetadataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schema_version?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    installation_id?: NullableStringFieldUpdateOperationsInput | string | null
    owner_id?: NullableStringFieldUpdateOperationsInput | string | null
    migration_state?: StringFieldUpdateOperationsInput | string
    data_revision?: IntFieldUpdateOperationsInput | number
    source_revision?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthDatabaseMetadataCreateManyInput = {
    id?: string
    schema_version?: number
    provider: string
    installation_id?: string | null
    owner_id?: string | null
    migration_state?: string
    data_revision?: number
    source_revision?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuthDatabaseMetadataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schema_version?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    installation_id?: NullableStringFieldUpdateOperationsInput | string | null
    owner_id?: NullableStringFieldUpdateOperationsInput | string | null
    migration_state?: StringFieldUpdateOperationsInput | string
    data_revision?: IntFieldUpdateOperationsInput | number
    source_revision?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthDatabaseMetadataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schema_version?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    installation_id?: NullableStringFieldUpdateOperationsInput | string | null
    owner_id?: NullableStringFieldUpdateOperationsInput | string | null
    migration_state?: StringFieldUpdateOperationsInput | string
    data_revision?: IntFieldUpdateOperationsInput | number
    source_revision?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateInput = {
    id?: string
    google_client_id?: string | null
    google_client_secret?: string | null
    github_client_id?: string | null
    github_client_secret?: string | null
    smtp_host?: string | null
    smtp_port?: number | null
    smtp_user?: string | null
    smtp_pass?: string | null
    smtp_from_email?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GlobalSettingsUncheckedCreateInput = {
    id?: string
    google_client_id?: string | null
    google_client_secret?: string | null
    github_client_id?: string | null
    github_client_secret?: string | null
    smtp_host?: string | null
    smtp_port?: number | null
    smtp_user?: string | null
    smtp_pass?: string | null
    smtp_from_email?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GlobalSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    google_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_host?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_port?: NullableIntFieldUpdateOperationsInput | number | null
    smtp_user?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_pass?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_from_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    google_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_host?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_port?: NullableIntFieldUpdateOperationsInput | number | null
    smtp_user?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_pass?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_from_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateManyInput = {
    id?: string
    google_client_id?: string | null
    google_client_secret?: string | null
    github_client_id?: string | null
    github_client_secret?: string | null
    smtp_host?: string | null
    smtp_port?: number | null
    smtp_user?: string | null
    smtp_pass?: string | null
    smtp_from_email?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GlobalSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    google_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_host?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_port?: NullableIntFieldUpdateOperationsInput | number | null
    smtp_user?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_pass?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_from_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    google_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_id?: NullableStringFieldUpdateOperationsInput | string | null
    github_client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_host?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_port?: NullableIntFieldUpdateOperationsInput | number | null
    smtp_user?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_pass?: NullableStringFieldUpdateOperationsInput | string | null
    smtp_from_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenRevocationCreateInput = {
    id?: string
    user_id: string
    binding_id: string
    revoked_at?: Date | string
    expires_at: Date | string
    aioson_play_id?: string | null
  }

  export type TokenRevocationUncheckedCreateInput = {
    id?: string
    user_id: string
    binding_id: string
    revoked_at?: Date | string
    expires_at: Date | string
    aioson_play_id?: string | null
  }

  export type TokenRevocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    revoked_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenRevocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    revoked_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenRevocationCreateManyInput = {
    id?: string
    user_id: string
    binding_id: string
    revoked_at?: Date | string
    expires_at: Date | string
    aioson_play_id?: string | null
  }

  export type TokenRevocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    revoked_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenRevocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    revoked_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AppBindingCreateInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionCreateNestedManyWithoutBindingInput
    profiles?: AppProfileCreateNestedManyWithoutBindingInput
    accesses?: AppAccessCreateNestedManyWithoutBindingInput
  }

  export type AppBindingUncheckedCreateInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionUncheckedCreateNestedManyWithoutBindingInput
    profiles?: AppProfileUncheckedCreateNestedManyWithoutBindingInput
    accesses?: AppAccessUncheckedCreateNestedManyWithoutBindingInput
  }

  export type AppBindingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUpdateManyWithoutBindingNestedInput
    profiles?: AppProfileUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUpdateManyWithoutBindingNestedInput
  }

  export type AppBindingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUncheckedUpdateManyWithoutBindingNestedInput
    profiles?: AppProfileUncheckedUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type AppBindingCreateManyInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppBindingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppBindingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayAppInventoryCreateInput = {
    id?: string
    aioson_play_id: string
    inventory_id: string
    app_slug?: string | null
    app_name: string
    version?: string | null
    description?: string | null
    lifecycle: string
    source: string
    supports_auth?: boolean
    accepted_roles_json?: string
    manifest_fingerprint?: string | null
    warnings_json?: string
    last_seen_at: Date | string
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PlayAppInventoryUncheckedCreateInput = {
    id?: string
    aioson_play_id: string
    inventory_id: string
    app_slug?: string | null
    app_name: string
    version?: string | null
    description?: string | null
    lifecycle: string
    source: string
    supports_auth?: boolean
    accepted_roles_json?: string
    manifest_fingerprint?: string | null
    warnings_json?: string
    last_seen_at: Date | string
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PlayAppInventoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: StringFieldUpdateOperationsInput | string
    inventory_id?: StringFieldUpdateOperationsInput | string
    app_slug?: NullableStringFieldUpdateOperationsInput | string | null
    app_name?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lifecycle?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    supports_auth?: BoolFieldUpdateOperationsInput | boolean
    accepted_roles_json?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    warnings_json?: StringFieldUpdateOperationsInput | string
    last_seen_at?: DateTimeFieldUpdateOperationsInput | Date | string
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayAppInventoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: StringFieldUpdateOperationsInput | string
    inventory_id?: StringFieldUpdateOperationsInput | string
    app_slug?: NullableStringFieldUpdateOperationsInput | string | null
    app_name?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lifecycle?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    supports_auth?: BoolFieldUpdateOperationsInput | boolean
    accepted_roles_json?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    warnings_json?: StringFieldUpdateOperationsInput | string
    last_seen_at?: DateTimeFieldUpdateOperationsInput | Date | string
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayAppInventoryCreateManyInput = {
    id?: string
    aioson_play_id: string
    inventory_id: string
    app_slug?: string | null
    app_name: string
    version?: string | null
    description?: string | null
    lifecycle: string
    source: string
    supports_auth?: boolean
    accepted_roles_json?: string
    manifest_fingerprint?: string | null
    warnings_json?: string
    last_seen_at: Date | string
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PlayAppInventoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: StringFieldUpdateOperationsInput | string
    inventory_id?: StringFieldUpdateOperationsInput | string
    app_slug?: NullableStringFieldUpdateOperationsInput | string | null
    app_name?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lifecycle?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    supports_auth?: BoolFieldUpdateOperationsInput | boolean
    accepted_roles_json?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    warnings_json?: StringFieldUpdateOperationsInput | string
    last_seen_at?: DateTimeFieldUpdateOperationsInput | Date | string
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayAppInventoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: StringFieldUpdateOperationsInput | string
    inventory_id?: StringFieldUpdateOperationsInput | string
    app_slug?: NullableStringFieldUpdateOperationsInput | string | null
    app_name?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lifecycle?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    supports_auth?: BoolFieldUpdateOperationsInput | boolean
    accepted_roles_json?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    warnings_json?: StringFieldUpdateOperationsInput | string
    last_seen_at?: DateTimeFieldUpdateOperationsInput | Date | string
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalUserCreateInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionCreateNestedManyWithoutUserInput
    user_roles?: UserRoleCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessCreateNestedManyWithoutUserInput
  }

  export type GlobalUserUncheckedCreateInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionUncheckedCreateNestedManyWithoutUserInput
    user_roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type GlobalUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUpdateManyWithoutUserNestedInput
    user_roles?: UserRoleUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUpdateManyWithoutUserNestedInput
  }

  export type GlobalUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUncheckedUpdateManyWithoutUserNestedInput
    user_roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GlobalUserCreateManyInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GlobalUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BindingPermissionCreateInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutPermissionsInput
    role_perms?: RolePermissionCreateNestedManyWithoutPermissionInput
    profile_perms?: AppProfilePermissionCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionUncheckedCreateInput = {
    id?: string
    binding_id: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    role_perms?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
    profile_perms?: AppProfilePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutPermissionsNestedInput
    role_perms?: RolePermissionUpdateManyWithoutPermissionNestedInput
    profile_perms?: AppProfilePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_perms?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
    profile_perms?: AppProfilePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionCreateManyInput = {
    id?: string
    binding_id: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
  }

  export type BindingPermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BindingPermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfileCreateInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutProfilesInput
    permissions?: AppProfilePermissionCreateNestedManyWithoutProfileInput
    accesses?: AppAccessCreateNestedManyWithoutProfileInput
  }

  export type AppProfileUncheckedCreateInput = {
    id: string
    binding_id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: AppProfilePermissionUncheckedCreateNestedManyWithoutProfileInput
    accesses?: AppAccessUncheckedCreateNestedManyWithoutProfileInput
  }

  export type AppProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutProfilesNestedInput
    permissions?: AppProfilePermissionUpdateManyWithoutProfileNestedInput
    accesses?: AppAccessUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: AppProfilePermissionUncheckedUpdateManyWithoutProfileNestedInput
    accesses?: AppAccessUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileCreateManyInput = {
    id: string
    binding_id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionCreateInput = {
    id: string
    created_at?: Date | string
    profile: AppProfileCreateNestedOneWithoutPermissionsInput
    permission: BindingPermissionCreateNestedOneWithoutProfile_permsInput
  }

  export type AppProfilePermissionUncheckedCreateInput = {
    id: string
    profile_id: string
    permission_id: string
    created_at?: Date | string
  }

  export type AppProfilePermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: AppProfileUpdateOneRequiredWithoutPermissionsNestedInput
    permission?: BindingPermissionUpdateOneRequiredWithoutProfile_permsNestedInput
  }

  export type AppProfilePermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionCreateManyInput = {
    id: string
    profile_id: string
    permission_id: string
    created_at?: Date | string
  }

  export type AppProfilePermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessCreateInput = {
    id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutAccessesInput
    user: GlobalUserCreateNestedOneWithoutApp_accessesInput
    profile: AppProfileCreateNestedOneWithoutAccessesInput
  }

  export type AppAccessUncheckedCreateInput = {
    id: string
    binding_id: string
    user_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutAccessesNestedInput
    user?: GlobalUserUpdateOneRequiredWithoutApp_accessesNestedInput
    profile?: AppProfileUpdateOneRequiredWithoutAccessesNestedInput
  }

  export type AppAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessCreateManyInput = {
    id: string
    binding_id: string
    user_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput
    user_roles?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
    user_roles?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput
    user_roles?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
    user_roles?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateInput = {
    id?: string
    binding_id: string
    created_at?: Date | string
    role: RoleCreateNestedOneWithoutPermissionsInput
    permission: BindingPermissionCreateNestedOneWithoutRole_permsInput
  }

  export type RolePermissionUncheckedCreateInput = {
    id?: string
    role_id: string
    permission_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type RolePermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
    permission?: BindingPermissionUpdateOneRequiredWithoutRole_permsNestedInput
  }

  export type RolePermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyInput = {
    id?: string
    role_id: string
    permission_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type RolePermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateInput = {
    id?: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    user: GlobalUserCreateNestedOneWithoutUser_rolesInput
    role: RoleCreateNestedOneWithoutUser_rolesInput
  }

  export type UserRoleUncheckedCreateInput = {
    id?: string
    user_id: string
    role_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type UserRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: GlobalUserUpdateOneRequiredWithoutUser_rolesNestedInput
    role?: RoleUpdateOneRequiredWithoutUser_rolesNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyInput = {
    id?: string
    user_id: string
    role_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type UserRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionCreateInput = {
    id?: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
    user: GlobalUserCreateNestedOneWithoutSessionsInput
  }

  export type AuthSessionUncheckedCreateInput = {
    id?: string
    user_id: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
  }

  export type AuthSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: GlobalUserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type AuthSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionCreateManyInput = {
    id?: string
    user_id: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
  }

  export type AuthSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecoveryTokenCreateInput = {
    id?: string
    user_id: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
  }

  export type RecoveryTokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
  }

  export type RecoveryTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecoveryTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecoveryTokenCreateManyInput = {
    id?: string
    user_id: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
  }

  export type RecoveryTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecoveryTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    email: string
    password_hash: string
    created_at?: Date | string
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    email: string
    password_hash: string
    created_at?: Date | string
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManyInput = {
    id?: string
    email: string
    password_hash: string
    created_at?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FederationConfigCreateInput = {
    id?: string
    federation_active?: boolean
    project_id?: string | null
    project_name?: string | null
    db_provider?: string | null
    db_connection_keyring_id?: string | null
    activated_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FederationConfigUncheckedCreateInput = {
    id?: string
    federation_active?: boolean
    project_id?: string | null
    project_name?: string | null
    db_provider?: string | null
    db_connection_keyring_id?: string | null
    activated_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FederationConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    federation_active?: BoolFieldUpdateOperationsInput | boolean
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    db_provider?: NullableStringFieldUpdateOperationsInput | string | null
    db_connection_keyring_id?: NullableStringFieldUpdateOperationsInput | string | null
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FederationConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    federation_active?: BoolFieldUpdateOperationsInput | boolean
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    db_provider?: NullableStringFieldUpdateOperationsInput | string | null
    db_connection_keyring_id?: NullableStringFieldUpdateOperationsInput | string | null
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FederationConfigCreateManyInput = {
    id?: string
    federation_active?: boolean
    project_id?: string | null
    project_name?: string | null
    db_provider?: string | null
    db_connection_keyring_id?: string | null
    activated_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FederationConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    federation_active?: BoolFieldUpdateOperationsInput | boolean
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    db_provider?: NullableStringFieldUpdateOperationsInput | string | null
    db_connection_keyring_id?: NullableStringFieldUpdateOperationsInput | string | null
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FederationConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    federation_active?: BoolFieldUpdateOperationsInput | boolean
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    db_provider?: NullableStringFieldUpdateOperationsInput | string | null
    db_connection_keyring_id?: NullableStringFieldUpdateOperationsInput | string | null
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthDatabaseMetadataCountOrderByAggregateInput = {
    id?: SortOrder
    schema_version?: SortOrder
    provider?: SortOrder
    installation_id?: SortOrder
    owner_id?: SortOrder
    migration_state?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuthDatabaseMetadataAvgOrderByAggregateInput = {
    schema_version?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrder
  }

  export type AuthDatabaseMetadataMaxOrderByAggregateInput = {
    id?: SortOrder
    schema_version?: SortOrder
    provider?: SortOrder
    installation_id?: SortOrder
    owner_id?: SortOrder
    migration_state?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuthDatabaseMetadataMinOrderByAggregateInput = {
    id?: SortOrder
    schema_version?: SortOrder
    provider?: SortOrder
    installation_id?: SortOrder
    owner_id?: SortOrder
    migration_state?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuthDatabaseMetadataSumOrderByAggregateInput = {
    schema_version?: SortOrder
    data_revision?: SortOrder
    source_revision?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GlobalSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    google_client_id?: SortOrder
    google_client_secret?: SortOrder
    github_client_id?: SortOrder
    github_client_secret?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_user?: SortOrder
    smtp_pass?: SortOrder
    smtp_from_email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalSettingsAvgOrderByAggregateInput = {
    smtp_port?: SortOrder
  }

  export type GlobalSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    google_client_id?: SortOrder
    google_client_secret?: SortOrder
    github_client_id?: SortOrder
    github_client_secret?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_user?: SortOrder
    smtp_pass?: SortOrder
    smtp_from_email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    google_client_id?: SortOrder
    google_client_secret?: SortOrder
    github_client_id?: SortOrder
    github_client_secret?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_user?: SortOrder
    smtp_pass?: SortOrder
    smtp_from_email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalSettingsSumOrderByAggregateInput = {
    smtp_port?: SortOrder
  }

  export type TokenRevocationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    binding_id?: SortOrder
    revoked_at?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
  }

  export type TokenRevocationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    binding_id?: SortOrder
    revoked_at?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
  }

  export type TokenRevocationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    binding_id?: SortOrder
    revoked_at?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BindingPermissionListRelationFilter = {
    every?: BindingPermissionWhereInput
    some?: BindingPermissionWhereInput
    none?: BindingPermissionWhereInput
  }

  export type AppProfileListRelationFilter = {
    every?: AppProfileWhereInput
    some?: AppProfileWhereInput
    none?: AppProfileWhereInput
  }

  export type AppAccessListRelationFilter = {
    every?: AppAccessWhereInput
    some?: AppAccessWhereInput
    none?: AppAccessWhereInput
  }

  export type BindingPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppBindingCountOrderByAggregateInput = {
    id?: SortOrder
    app_name?: SortOrder
    app_slug?: SortOrder
    connection_name?: SortOrder
    system_permissions?: SortOrder
    enable_2fa?: SortOrder
    enable_rbac?: SortOrder
    auth_mode?: SortOrder
    manifest_fingerprint?: SortOrder
    manifest_sync_status?: SortOrder
    manifest_sync_error?: SortOrder
    manifest_synced_at?: SortOrder
    allowed_origins_json?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppBindingMaxOrderByAggregateInput = {
    id?: SortOrder
    app_name?: SortOrder
    app_slug?: SortOrder
    connection_name?: SortOrder
    system_permissions?: SortOrder
    enable_2fa?: SortOrder
    enable_rbac?: SortOrder
    auth_mode?: SortOrder
    manifest_fingerprint?: SortOrder
    manifest_sync_status?: SortOrder
    manifest_sync_error?: SortOrder
    manifest_synced_at?: SortOrder
    allowed_origins_json?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppBindingMinOrderByAggregateInput = {
    id?: SortOrder
    app_name?: SortOrder
    app_slug?: SortOrder
    connection_name?: SortOrder
    system_permissions?: SortOrder
    enable_2fa?: SortOrder
    enable_rbac?: SortOrder
    auth_mode?: SortOrder
    manifest_fingerprint?: SortOrder
    manifest_sync_status?: SortOrder
    manifest_sync_error?: SortOrder
    manifest_synced_at?: SortOrder
    allowed_origins_json?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PlayAppInventoryAioson_play_idInventory_idCompoundUniqueInput = {
    aioson_play_id: string
    inventory_id: string
  }

  export type PlayAppInventoryCountOrderByAggregateInput = {
    id?: SortOrder
    aioson_play_id?: SortOrder
    inventory_id?: SortOrder
    app_slug?: SortOrder
    app_name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    lifecycle?: SortOrder
    source?: SortOrder
    supports_auth?: SortOrder
    accepted_roles_json?: SortOrder
    manifest_fingerprint?: SortOrder
    warnings_json?: SortOrder
    last_seen_at?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PlayAppInventoryMaxOrderByAggregateInput = {
    id?: SortOrder
    aioson_play_id?: SortOrder
    inventory_id?: SortOrder
    app_slug?: SortOrder
    app_name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    lifecycle?: SortOrder
    source?: SortOrder
    supports_auth?: SortOrder
    accepted_roles_json?: SortOrder
    manifest_fingerprint?: SortOrder
    warnings_json?: SortOrder
    last_seen_at?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PlayAppInventoryMinOrderByAggregateInput = {
    id?: SortOrder
    aioson_play_id?: SortOrder
    inventory_id?: SortOrder
    app_slug?: SortOrder
    app_name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    lifecycle?: SortOrder
    source?: SortOrder
    supports_auth?: SortOrder
    accepted_roles_json?: SortOrder
    manifest_fingerprint?: SortOrder
    warnings_json?: SortOrder
    last_seen_at?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuthSessionListRelationFilter = {
    every?: AuthSessionWhereInput
    some?: AuthSessionWhereInput
    none?: AuthSessionWhereInput
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type AuthSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GlobalUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    totp_secret?: SortOrder
    aioson_play_origin_id?: SortOrder
    disabled_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    totp_secret?: SortOrder
    aioson_play_origin_id?: SortOrder
    disabled_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GlobalUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    totp_secret?: SortOrder
    aioson_play_origin_id?: SortOrder
    disabled_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppBindingRelationFilter = {
    is?: AppBindingWhereInput
    isNot?: AppBindingWhereInput
  }

  export type RolePermissionListRelationFilter = {
    every?: RolePermissionWhereInput
    some?: RolePermissionWhereInput
    none?: RolePermissionWhereInput
  }

  export type AppProfilePermissionListRelationFilter = {
    every?: AppProfilePermissionWhereInput
    some?: AppProfilePermissionWhereInput
    none?: AppProfilePermissionWhereInput
  }

  export type RolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppProfilePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BindingPermissionBinding_idNameCompoundUniqueInput = {
    binding_id: string
    name: string
  }

  export type BindingPermissionCountOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    retired_at?: SortOrder
    created_at?: SortOrder
  }

  export type BindingPermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    retired_at?: SortOrder
    created_at?: SortOrder
  }

  export type BindingPermissionMinOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    retired_at?: SortOrder
    created_at?: SortOrder
  }

  export type AppProfileBinding_idNameCompoundUniqueInput = {
    binding_id: string
    name: string
  }

  export type AppProfileCountOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_system?: SortOrder
    is_migration_generated?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_system?: SortOrder
    is_migration_generated?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppProfileMinOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_system?: SortOrder
    is_migration_generated?: SortOrder
    archived_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppProfileRelationFilter = {
    is?: AppProfileWhereInput
    isNot?: AppProfileWhereInput
  }

  export type BindingPermissionRelationFilter = {
    is?: BindingPermissionWhereInput
    isNot?: BindingPermissionWhereInput
  }

  export type AppProfilePermissionProfile_idPermission_idCompoundUniqueInput = {
    profile_id: string
    permission_id: string
  }

  export type AppProfilePermissionCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    permission_id?: SortOrder
    created_at?: SortOrder
  }

  export type AppProfilePermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    permission_id?: SortOrder
    created_at?: SortOrder
  }

  export type AppProfilePermissionMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    permission_id?: SortOrder
    created_at?: SortOrder
  }

  export type GlobalUserRelationFilter = {
    is?: GlobalUserWhereInput
    isNot?: GlobalUserWhereInput
  }

  export type AppAccessBinding_idUser_idCompoundUniqueInput = {
    binding_id: string
    user_id: string
  }

  export type AppAccessCountOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    user_id?: SortOrder
    profile_id?: SortOrder
    status?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    user_id?: SortOrder
    profile_id?: SortOrder
    status?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppAccessMinOrderByAggregateInput = {
    id?: SortOrder
    binding_id?: SortOrder
    user_id?: SortOrder
    profile_id?: SortOrder
    status?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type RolePermissionRole_idPermission_idBinding_idCompoundUniqueInput = {
    role_id: string
    permission_id: string
    binding_id: string
  }

  export type RolePermissionCountOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    permission_id?: SortOrder
    binding_id?: SortOrder
    created_at?: SortOrder
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    permission_id?: SortOrder
    binding_id?: SortOrder
    created_at?: SortOrder
  }

  export type RolePermissionMinOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    permission_id?: SortOrder
    binding_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleUser_idRole_idBinding_idCompoundUniqueInput = {
    user_id: string
    role_id: string
    binding_id: string
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    binding_id?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    binding_id?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    binding_id?: SortOrder
    aioson_play_origin_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuthSessionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    binding_id?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuthSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    binding_id?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuthSessionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    binding_id?: SortOrder
    expires_at?: SortOrder
    aioson_play_id?: SortOrder
    created_at?: SortOrder
  }

  export type RecoveryTokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
  }

  export type RecoveryTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
  }

  export type RecoveryTokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type FederationConfigCountOrderByAggregateInput = {
    id?: SortOrder
    federation_active?: SortOrder
    project_id?: SortOrder
    project_name?: SortOrder
    db_provider?: SortOrder
    db_connection_keyring_id?: SortOrder
    activated_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FederationConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    federation_active?: SortOrder
    project_id?: SortOrder
    project_name?: SortOrder
    db_provider?: SortOrder
    db_connection_keyring_id?: SortOrder
    activated_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FederationConfigMinOrderByAggregateInput = {
    id?: SortOrder
    federation_active?: SortOrder
    project_id?: SortOrder
    project_name?: SortOrder
    db_provider?: SortOrder
    db_connection_keyring_id?: SortOrder
    activated_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BindingPermissionCreateNestedManyWithoutBindingInput = {
    create?: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput> | BindingPermissionCreateWithoutBindingInput[] | BindingPermissionUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutBindingInput | BindingPermissionCreateOrConnectWithoutBindingInput[]
    createMany?: BindingPermissionCreateManyBindingInputEnvelope
    connect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
  }

  export type AppProfileCreateNestedManyWithoutBindingInput = {
    create?: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput> | AppProfileCreateWithoutBindingInput[] | AppProfileUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppProfileCreateOrConnectWithoutBindingInput | AppProfileCreateOrConnectWithoutBindingInput[]
    createMany?: AppProfileCreateManyBindingInputEnvelope
    connect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
  }

  export type AppAccessCreateNestedManyWithoutBindingInput = {
    create?: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput> | AppAccessCreateWithoutBindingInput[] | AppAccessUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutBindingInput | AppAccessCreateOrConnectWithoutBindingInput[]
    createMany?: AppAccessCreateManyBindingInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type BindingPermissionUncheckedCreateNestedManyWithoutBindingInput = {
    create?: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput> | BindingPermissionCreateWithoutBindingInput[] | BindingPermissionUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutBindingInput | BindingPermissionCreateOrConnectWithoutBindingInput[]
    createMany?: BindingPermissionCreateManyBindingInputEnvelope
    connect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
  }

  export type AppProfileUncheckedCreateNestedManyWithoutBindingInput = {
    create?: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput> | AppProfileCreateWithoutBindingInput[] | AppProfileUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppProfileCreateOrConnectWithoutBindingInput | AppProfileCreateOrConnectWithoutBindingInput[]
    createMany?: AppProfileCreateManyBindingInputEnvelope
    connect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
  }

  export type AppAccessUncheckedCreateNestedManyWithoutBindingInput = {
    create?: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput> | AppAccessCreateWithoutBindingInput[] | AppAccessUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutBindingInput | AppAccessCreateOrConnectWithoutBindingInput[]
    createMany?: AppAccessCreateManyBindingInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BindingPermissionUpdateManyWithoutBindingNestedInput = {
    create?: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput> | BindingPermissionCreateWithoutBindingInput[] | BindingPermissionUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutBindingInput | BindingPermissionCreateOrConnectWithoutBindingInput[]
    upsert?: BindingPermissionUpsertWithWhereUniqueWithoutBindingInput | BindingPermissionUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: BindingPermissionCreateManyBindingInputEnvelope
    set?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    disconnect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    delete?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    connect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    update?: BindingPermissionUpdateWithWhereUniqueWithoutBindingInput | BindingPermissionUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: BindingPermissionUpdateManyWithWhereWithoutBindingInput | BindingPermissionUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: BindingPermissionScalarWhereInput | BindingPermissionScalarWhereInput[]
  }

  export type AppProfileUpdateManyWithoutBindingNestedInput = {
    create?: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput> | AppProfileCreateWithoutBindingInput[] | AppProfileUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppProfileCreateOrConnectWithoutBindingInput | AppProfileCreateOrConnectWithoutBindingInput[]
    upsert?: AppProfileUpsertWithWhereUniqueWithoutBindingInput | AppProfileUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: AppProfileCreateManyBindingInputEnvelope
    set?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    disconnect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    delete?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    connect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    update?: AppProfileUpdateWithWhereUniqueWithoutBindingInput | AppProfileUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: AppProfileUpdateManyWithWhereWithoutBindingInput | AppProfileUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: AppProfileScalarWhereInput | AppProfileScalarWhereInput[]
  }

  export type AppAccessUpdateManyWithoutBindingNestedInput = {
    create?: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput> | AppAccessCreateWithoutBindingInput[] | AppAccessUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutBindingInput | AppAccessCreateOrConnectWithoutBindingInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutBindingInput | AppAccessUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: AppAccessCreateManyBindingInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutBindingInput | AppAccessUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutBindingInput | AppAccessUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type BindingPermissionUncheckedUpdateManyWithoutBindingNestedInput = {
    create?: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput> | BindingPermissionCreateWithoutBindingInput[] | BindingPermissionUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutBindingInput | BindingPermissionCreateOrConnectWithoutBindingInput[]
    upsert?: BindingPermissionUpsertWithWhereUniqueWithoutBindingInput | BindingPermissionUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: BindingPermissionCreateManyBindingInputEnvelope
    set?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    disconnect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    delete?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    connect?: BindingPermissionWhereUniqueInput | BindingPermissionWhereUniqueInput[]
    update?: BindingPermissionUpdateWithWhereUniqueWithoutBindingInput | BindingPermissionUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: BindingPermissionUpdateManyWithWhereWithoutBindingInput | BindingPermissionUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: BindingPermissionScalarWhereInput | BindingPermissionScalarWhereInput[]
  }

  export type AppProfileUncheckedUpdateManyWithoutBindingNestedInput = {
    create?: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput> | AppProfileCreateWithoutBindingInput[] | AppProfileUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppProfileCreateOrConnectWithoutBindingInput | AppProfileCreateOrConnectWithoutBindingInput[]
    upsert?: AppProfileUpsertWithWhereUniqueWithoutBindingInput | AppProfileUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: AppProfileCreateManyBindingInputEnvelope
    set?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    disconnect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    delete?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    connect?: AppProfileWhereUniqueInput | AppProfileWhereUniqueInput[]
    update?: AppProfileUpdateWithWhereUniqueWithoutBindingInput | AppProfileUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: AppProfileUpdateManyWithWhereWithoutBindingInput | AppProfileUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: AppProfileScalarWhereInput | AppProfileScalarWhereInput[]
  }

  export type AppAccessUncheckedUpdateManyWithoutBindingNestedInput = {
    create?: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput> | AppAccessCreateWithoutBindingInput[] | AppAccessUncheckedCreateWithoutBindingInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutBindingInput | AppAccessCreateOrConnectWithoutBindingInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutBindingInput | AppAccessUpsertWithWhereUniqueWithoutBindingInput[]
    createMany?: AppAccessCreateManyBindingInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutBindingInput | AppAccessUpdateWithWhereUniqueWithoutBindingInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutBindingInput | AppAccessUpdateManyWithWhereWithoutBindingInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type AuthSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput> | AuthSessionCreateWithoutUserInput[] | AuthSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthSessionCreateOrConnectWithoutUserInput | AuthSessionCreateOrConnectWithoutUserInput[]
    createMany?: AuthSessionCreateManyUserInputEnvelope
    connect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type AppAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput> | AppAccessCreateWithoutUserInput[] | AppAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutUserInput | AppAccessCreateOrConnectWithoutUserInput[]
    createMany?: AppAccessCreateManyUserInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type AuthSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput> | AuthSessionCreateWithoutUserInput[] | AuthSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthSessionCreateOrConnectWithoutUserInput | AuthSessionCreateOrConnectWithoutUserInput[]
    createMany?: AuthSessionCreateManyUserInputEnvelope
    connect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type AppAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput> | AppAccessCreateWithoutUserInput[] | AppAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutUserInput | AppAccessCreateOrConnectWithoutUserInput[]
    createMany?: AppAccessCreateManyUserInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type AuthSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput> | AuthSessionCreateWithoutUserInput[] | AuthSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthSessionCreateOrConnectWithoutUserInput | AuthSessionCreateOrConnectWithoutUserInput[]
    upsert?: AuthSessionUpsertWithWhereUniqueWithoutUserInput | AuthSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthSessionCreateManyUserInputEnvelope
    set?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    disconnect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    delete?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    connect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    update?: AuthSessionUpdateWithWhereUniqueWithoutUserInput | AuthSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthSessionUpdateManyWithWhereWithoutUserInput | AuthSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthSessionScalarWhereInput | AuthSessionScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type AppAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput> | AppAccessCreateWithoutUserInput[] | AppAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutUserInput | AppAccessCreateOrConnectWithoutUserInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutUserInput | AppAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppAccessCreateManyUserInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutUserInput | AppAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutUserInput | AppAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type AuthSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput> | AuthSessionCreateWithoutUserInput[] | AuthSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthSessionCreateOrConnectWithoutUserInput | AuthSessionCreateOrConnectWithoutUserInput[]
    upsert?: AuthSessionUpsertWithWhereUniqueWithoutUserInput | AuthSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthSessionCreateManyUserInputEnvelope
    set?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    disconnect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    delete?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    connect?: AuthSessionWhereUniqueInput | AuthSessionWhereUniqueInput[]
    update?: AuthSessionUpdateWithWhereUniqueWithoutUserInput | AuthSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthSessionUpdateManyWithWhereWithoutUserInput | AuthSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthSessionScalarWhereInput | AuthSessionScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type AppAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput> | AppAccessCreateWithoutUserInput[] | AppAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutUserInput | AppAccessCreateOrConnectWithoutUserInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutUserInput | AppAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppAccessCreateManyUserInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutUserInput | AppAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutUserInput | AppAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type AppBindingCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<AppBindingCreateWithoutPermissionsInput, AppBindingUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutPermissionsInput
    connect?: AppBindingWhereUniqueInput
  }

  export type RolePermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type AppProfilePermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput> | AppProfilePermissionCreateWithoutPermissionInput[] | AppProfilePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutPermissionInput | AppProfilePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: AppProfilePermissionCreateManyPermissionInputEnvelope
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type AppProfilePermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput> | AppProfilePermissionCreateWithoutPermissionInput[] | AppProfilePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutPermissionInput | AppProfilePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: AppProfilePermissionCreateManyPermissionInputEnvelope
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
  }

  export type AppBindingUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<AppBindingCreateWithoutPermissionsInput, AppBindingUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutPermissionsInput
    upsert?: AppBindingUpsertWithoutPermissionsInput
    connect?: AppBindingWhereUniqueInput
    update?: XOR<XOR<AppBindingUpdateToOneWithWhereWithoutPermissionsInput, AppBindingUpdateWithoutPermissionsInput>, AppBindingUncheckedUpdateWithoutPermissionsInput>
  }

  export type RolePermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type AppProfilePermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput> | AppProfilePermissionCreateWithoutPermissionInput[] | AppProfilePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutPermissionInput | AppProfilePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: AppProfilePermissionUpsertWithWhereUniqueWithoutPermissionInput | AppProfilePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: AppProfilePermissionCreateManyPermissionInputEnvelope
    set?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    disconnect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    delete?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    update?: AppProfilePermissionUpdateWithWhereUniqueWithoutPermissionInput | AppProfilePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: AppProfilePermissionUpdateManyWithWhereWithoutPermissionInput | AppProfilePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type AppProfilePermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput> | AppProfilePermissionCreateWithoutPermissionInput[] | AppProfilePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutPermissionInput | AppProfilePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: AppProfilePermissionUpsertWithWhereUniqueWithoutPermissionInput | AppProfilePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: AppProfilePermissionCreateManyPermissionInputEnvelope
    set?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    disconnect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    delete?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    update?: AppProfilePermissionUpdateWithWhereUniqueWithoutPermissionInput | AppProfilePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: AppProfilePermissionUpdateManyWithWhereWithoutPermissionInput | AppProfilePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
  }

  export type AppBindingCreateNestedOneWithoutProfilesInput = {
    create?: XOR<AppBindingCreateWithoutProfilesInput, AppBindingUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutProfilesInput
    connect?: AppBindingWhereUniqueInput
  }

  export type AppProfilePermissionCreateNestedManyWithoutProfileInput = {
    create?: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput> | AppProfilePermissionCreateWithoutProfileInput[] | AppProfilePermissionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutProfileInput | AppProfilePermissionCreateOrConnectWithoutProfileInput[]
    createMany?: AppProfilePermissionCreateManyProfileInputEnvelope
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
  }

  export type AppAccessCreateNestedManyWithoutProfileInput = {
    create?: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput> | AppAccessCreateWithoutProfileInput[] | AppAccessUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutProfileInput | AppAccessCreateOrConnectWithoutProfileInput[]
    createMany?: AppAccessCreateManyProfileInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type AppProfilePermissionUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput> | AppProfilePermissionCreateWithoutProfileInput[] | AppProfilePermissionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutProfileInput | AppProfilePermissionCreateOrConnectWithoutProfileInput[]
    createMany?: AppProfilePermissionCreateManyProfileInputEnvelope
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
  }

  export type AppAccessUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput> | AppAccessCreateWithoutProfileInput[] | AppAccessUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutProfileInput | AppAccessCreateOrConnectWithoutProfileInput[]
    createMany?: AppAccessCreateManyProfileInputEnvelope
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
  }

  export type AppBindingUpdateOneRequiredWithoutProfilesNestedInput = {
    create?: XOR<AppBindingCreateWithoutProfilesInput, AppBindingUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutProfilesInput
    upsert?: AppBindingUpsertWithoutProfilesInput
    connect?: AppBindingWhereUniqueInput
    update?: XOR<XOR<AppBindingUpdateToOneWithWhereWithoutProfilesInput, AppBindingUpdateWithoutProfilesInput>, AppBindingUncheckedUpdateWithoutProfilesInput>
  }

  export type AppProfilePermissionUpdateManyWithoutProfileNestedInput = {
    create?: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput> | AppProfilePermissionCreateWithoutProfileInput[] | AppProfilePermissionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutProfileInput | AppProfilePermissionCreateOrConnectWithoutProfileInput[]
    upsert?: AppProfilePermissionUpsertWithWhereUniqueWithoutProfileInput | AppProfilePermissionUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: AppProfilePermissionCreateManyProfileInputEnvelope
    set?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    disconnect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    delete?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    update?: AppProfilePermissionUpdateWithWhereUniqueWithoutProfileInput | AppProfilePermissionUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: AppProfilePermissionUpdateManyWithWhereWithoutProfileInput | AppProfilePermissionUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
  }

  export type AppAccessUpdateManyWithoutProfileNestedInput = {
    create?: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput> | AppAccessCreateWithoutProfileInput[] | AppAccessUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutProfileInput | AppAccessCreateOrConnectWithoutProfileInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutProfileInput | AppAccessUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: AppAccessCreateManyProfileInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutProfileInput | AppAccessUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutProfileInput | AppAccessUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type AppProfilePermissionUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput> | AppProfilePermissionCreateWithoutProfileInput[] | AppProfilePermissionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppProfilePermissionCreateOrConnectWithoutProfileInput | AppProfilePermissionCreateOrConnectWithoutProfileInput[]
    upsert?: AppProfilePermissionUpsertWithWhereUniqueWithoutProfileInput | AppProfilePermissionUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: AppProfilePermissionCreateManyProfileInputEnvelope
    set?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    disconnect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    delete?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    connect?: AppProfilePermissionWhereUniqueInput | AppProfilePermissionWhereUniqueInput[]
    update?: AppProfilePermissionUpdateWithWhereUniqueWithoutProfileInput | AppProfilePermissionUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: AppProfilePermissionUpdateManyWithWhereWithoutProfileInput | AppProfilePermissionUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
  }

  export type AppAccessUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput> | AppAccessCreateWithoutProfileInput[] | AppAccessUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: AppAccessCreateOrConnectWithoutProfileInput | AppAccessCreateOrConnectWithoutProfileInput[]
    upsert?: AppAccessUpsertWithWhereUniqueWithoutProfileInput | AppAccessUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: AppAccessCreateManyProfileInputEnvelope
    set?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    disconnect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    delete?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    connect?: AppAccessWhereUniqueInput | AppAccessWhereUniqueInput[]
    update?: AppAccessUpdateWithWhereUniqueWithoutProfileInput | AppAccessUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: AppAccessUpdateManyWithWhereWithoutProfileInput | AppAccessUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
  }

  export type AppProfileCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<AppProfileCreateWithoutPermissionsInput, AppProfileUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: AppProfileCreateOrConnectWithoutPermissionsInput
    connect?: AppProfileWhereUniqueInput
  }

  export type BindingPermissionCreateNestedOneWithoutProfile_permsInput = {
    create?: XOR<BindingPermissionCreateWithoutProfile_permsInput, BindingPermissionUncheckedCreateWithoutProfile_permsInput>
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutProfile_permsInput
    connect?: BindingPermissionWhereUniqueInput
  }

  export type AppProfileUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<AppProfileCreateWithoutPermissionsInput, AppProfileUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: AppProfileCreateOrConnectWithoutPermissionsInput
    upsert?: AppProfileUpsertWithoutPermissionsInput
    connect?: AppProfileWhereUniqueInput
    update?: XOR<XOR<AppProfileUpdateToOneWithWhereWithoutPermissionsInput, AppProfileUpdateWithoutPermissionsInput>, AppProfileUncheckedUpdateWithoutPermissionsInput>
  }

  export type BindingPermissionUpdateOneRequiredWithoutProfile_permsNestedInput = {
    create?: XOR<BindingPermissionCreateWithoutProfile_permsInput, BindingPermissionUncheckedCreateWithoutProfile_permsInput>
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutProfile_permsInput
    upsert?: BindingPermissionUpsertWithoutProfile_permsInput
    connect?: BindingPermissionWhereUniqueInput
    update?: XOR<XOR<BindingPermissionUpdateToOneWithWhereWithoutProfile_permsInput, BindingPermissionUpdateWithoutProfile_permsInput>, BindingPermissionUncheckedUpdateWithoutProfile_permsInput>
  }

  export type AppBindingCreateNestedOneWithoutAccessesInput = {
    create?: XOR<AppBindingCreateWithoutAccessesInput, AppBindingUncheckedCreateWithoutAccessesInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutAccessesInput
    connect?: AppBindingWhereUniqueInput
  }

  export type GlobalUserCreateNestedOneWithoutApp_accessesInput = {
    create?: XOR<GlobalUserCreateWithoutApp_accessesInput, GlobalUserUncheckedCreateWithoutApp_accessesInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutApp_accessesInput
    connect?: GlobalUserWhereUniqueInput
  }

  export type AppProfileCreateNestedOneWithoutAccessesInput = {
    create?: XOR<AppProfileCreateWithoutAccessesInput, AppProfileUncheckedCreateWithoutAccessesInput>
    connectOrCreate?: AppProfileCreateOrConnectWithoutAccessesInput
    connect?: AppProfileWhereUniqueInput
  }

  export type AppBindingUpdateOneRequiredWithoutAccessesNestedInput = {
    create?: XOR<AppBindingCreateWithoutAccessesInput, AppBindingUncheckedCreateWithoutAccessesInput>
    connectOrCreate?: AppBindingCreateOrConnectWithoutAccessesInput
    upsert?: AppBindingUpsertWithoutAccessesInput
    connect?: AppBindingWhereUniqueInput
    update?: XOR<XOR<AppBindingUpdateToOneWithWhereWithoutAccessesInput, AppBindingUpdateWithoutAccessesInput>, AppBindingUncheckedUpdateWithoutAccessesInput>
  }

  export type GlobalUserUpdateOneRequiredWithoutApp_accessesNestedInput = {
    create?: XOR<GlobalUserCreateWithoutApp_accessesInput, GlobalUserUncheckedCreateWithoutApp_accessesInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutApp_accessesInput
    upsert?: GlobalUserUpsertWithoutApp_accessesInput
    connect?: GlobalUserWhereUniqueInput
    update?: XOR<XOR<GlobalUserUpdateToOneWithWhereWithoutApp_accessesInput, GlobalUserUpdateWithoutApp_accessesInput>, GlobalUserUncheckedUpdateWithoutApp_accessesInput>
  }

  export type AppProfileUpdateOneRequiredWithoutAccessesNestedInput = {
    create?: XOR<AppProfileCreateWithoutAccessesInput, AppProfileUncheckedCreateWithoutAccessesInput>
    connectOrCreate?: AppProfileCreateOrConnectWithoutAccessesInput
    upsert?: AppProfileUpsertWithoutAccessesInput
    connect?: AppProfileWhereUniqueInput
    update?: XOR<XOR<AppProfileUpdateToOneWithWhereWithoutAccessesInput, AppProfileUpdateWithoutAccessesInput>, AppProfileUncheckedUpdateWithoutAccessesInput>
  }

  export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type BindingPermissionCreateNestedOneWithoutRole_permsInput = {
    create?: XOR<BindingPermissionCreateWithoutRole_permsInput, BindingPermissionUncheckedCreateWithoutRole_permsInput>
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutRole_permsInput
    connect?: BindingPermissionWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    upsert?: RoleUpsertWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPermissionsInput, RoleUpdateWithoutPermissionsInput>, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type BindingPermissionUpdateOneRequiredWithoutRole_permsNestedInput = {
    create?: XOR<BindingPermissionCreateWithoutRole_permsInput, BindingPermissionUncheckedCreateWithoutRole_permsInput>
    connectOrCreate?: BindingPermissionCreateOrConnectWithoutRole_permsInput
    upsert?: BindingPermissionUpsertWithoutRole_permsInput
    connect?: BindingPermissionWhereUniqueInput
    update?: XOR<XOR<BindingPermissionUpdateToOneWithWhereWithoutRole_permsInput, BindingPermissionUpdateWithoutRole_permsInput>, BindingPermissionUncheckedUpdateWithoutRole_permsInput>
  }

  export type GlobalUserCreateNestedOneWithoutUser_rolesInput = {
    create?: XOR<GlobalUserCreateWithoutUser_rolesInput, GlobalUserUncheckedCreateWithoutUser_rolesInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutUser_rolesInput
    connect?: GlobalUserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUser_rolesInput = {
    create?: XOR<RoleCreateWithoutUser_rolesInput, RoleUncheckedCreateWithoutUser_rolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUser_rolesInput
    connect?: RoleWhereUniqueInput
  }

  export type GlobalUserUpdateOneRequiredWithoutUser_rolesNestedInput = {
    create?: XOR<GlobalUserCreateWithoutUser_rolesInput, GlobalUserUncheckedCreateWithoutUser_rolesInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutUser_rolesInput
    upsert?: GlobalUserUpsertWithoutUser_rolesInput
    connect?: GlobalUserWhereUniqueInput
    update?: XOR<XOR<GlobalUserUpdateToOneWithWhereWithoutUser_rolesInput, GlobalUserUpdateWithoutUser_rolesInput>, GlobalUserUncheckedUpdateWithoutUser_rolesInput>
  }

  export type RoleUpdateOneRequiredWithoutUser_rolesNestedInput = {
    create?: XOR<RoleCreateWithoutUser_rolesInput, RoleUncheckedCreateWithoutUser_rolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUser_rolesInput
    upsert?: RoleUpsertWithoutUser_rolesInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUser_rolesInput, RoleUpdateWithoutUser_rolesInput>, RoleUncheckedUpdateWithoutUser_rolesInput>
  }

  export type GlobalUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<GlobalUserCreateWithoutSessionsInput, GlobalUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutSessionsInput
    connect?: GlobalUserWhereUniqueInput
  }

  export type GlobalUserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<GlobalUserCreateWithoutSessionsInput, GlobalUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GlobalUserCreateOrConnectWithoutSessionsInput
    upsert?: GlobalUserUpsertWithoutSessionsInput
    connect?: GlobalUserWhereUniqueInput
    update?: XOR<XOR<GlobalUserUpdateToOneWithWhereWithoutSessionsInput, GlobalUserUpdateWithoutSessionsInput>, GlobalUserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BindingPermissionCreateWithoutBindingInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    role_perms?: RolePermissionCreateNestedManyWithoutPermissionInput
    profile_perms?: AppProfilePermissionCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionUncheckedCreateWithoutBindingInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    role_perms?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
    profile_perms?: AppProfilePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionCreateOrConnectWithoutBindingInput = {
    where: BindingPermissionWhereUniqueInput
    create: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput>
  }

  export type BindingPermissionCreateManyBindingInputEnvelope = {
    data: BindingPermissionCreateManyBindingInput | BindingPermissionCreateManyBindingInput[]
    skipDuplicates?: boolean
  }

  export type AppProfileCreateWithoutBindingInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: AppProfilePermissionCreateNestedManyWithoutProfileInput
    accesses?: AppAccessCreateNestedManyWithoutProfileInput
  }

  export type AppProfileUncheckedCreateWithoutBindingInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: AppProfilePermissionUncheckedCreateNestedManyWithoutProfileInput
    accesses?: AppAccessUncheckedCreateNestedManyWithoutProfileInput
  }

  export type AppProfileCreateOrConnectWithoutBindingInput = {
    where: AppProfileWhereUniqueInput
    create: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput>
  }

  export type AppProfileCreateManyBindingInputEnvelope = {
    data: AppProfileCreateManyBindingInput | AppProfileCreateManyBindingInput[]
    skipDuplicates?: boolean
  }

  export type AppAccessCreateWithoutBindingInput = {
    id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: GlobalUserCreateNestedOneWithoutApp_accessesInput
    profile: AppProfileCreateNestedOneWithoutAccessesInput
  }

  export type AppAccessUncheckedCreateWithoutBindingInput = {
    id: string
    user_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessCreateOrConnectWithoutBindingInput = {
    where: AppAccessWhereUniqueInput
    create: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput>
  }

  export type AppAccessCreateManyBindingInputEnvelope = {
    data: AppAccessCreateManyBindingInput | AppAccessCreateManyBindingInput[]
    skipDuplicates?: boolean
  }

  export type BindingPermissionUpsertWithWhereUniqueWithoutBindingInput = {
    where: BindingPermissionWhereUniqueInput
    update: XOR<BindingPermissionUpdateWithoutBindingInput, BindingPermissionUncheckedUpdateWithoutBindingInput>
    create: XOR<BindingPermissionCreateWithoutBindingInput, BindingPermissionUncheckedCreateWithoutBindingInput>
  }

  export type BindingPermissionUpdateWithWhereUniqueWithoutBindingInput = {
    where: BindingPermissionWhereUniqueInput
    data: XOR<BindingPermissionUpdateWithoutBindingInput, BindingPermissionUncheckedUpdateWithoutBindingInput>
  }

  export type BindingPermissionUpdateManyWithWhereWithoutBindingInput = {
    where: BindingPermissionScalarWhereInput
    data: XOR<BindingPermissionUpdateManyMutationInput, BindingPermissionUncheckedUpdateManyWithoutBindingInput>
  }

  export type BindingPermissionScalarWhereInput = {
    AND?: BindingPermissionScalarWhereInput | BindingPermissionScalarWhereInput[]
    OR?: BindingPermissionScalarWhereInput[]
    NOT?: BindingPermissionScalarWhereInput | BindingPermissionScalarWhereInput[]
    id?: StringFilter<"BindingPermission"> | string
    binding_id?: StringFilter<"BindingPermission"> | string
    name?: StringFilter<"BindingPermission"> | string
    resource?: StringFilter<"BindingPermission"> | string
    action?: StringFilter<"BindingPermission"> | string
    retired_at?: DateTimeNullableFilter<"BindingPermission"> | Date | string | null
    created_at?: DateTimeFilter<"BindingPermission"> | Date | string
  }

  export type AppProfileUpsertWithWhereUniqueWithoutBindingInput = {
    where: AppProfileWhereUniqueInput
    update: XOR<AppProfileUpdateWithoutBindingInput, AppProfileUncheckedUpdateWithoutBindingInput>
    create: XOR<AppProfileCreateWithoutBindingInput, AppProfileUncheckedCreateWithoutBindingInput>
  }

  export type AppProfileUpdateWithWhereUniqueWithoutBindingInput = {
    where: AppProfileWhereUniqueInput
    data: XOR<AppProfileUpdateWithoutBindingInput, AppProfileUncheckedUpdateWithoutBindingInput>
  }

  export type AppProfileUpdateManyWithWhereWithoutBindingInput = {
    where: AppProfileScalarWhereInput
    data: XOR<AppProfileUpdateManyMutationInput, AppProfileUncheckedUpdateManyWithoutBindingInput>
  }

  export type AppProfileScalarWhereInput = {
    AND?: AppProfileScalarWhereInput | AppProfileScalarWhereInput[]
    OR?: AppProfileScalarWhereInput[]
    NOT?: AppProfileScalarWhereInput | AppProfileScalarWhereInput[]
    id?: StringFilter<"AppProfile"> | string
    binding_id?: StringFilter<"AppProfile"> | string
    name?: StringFilter<"AppProfile"> | string
    description?: StringFilter<"AppProfile"> | string
    is_system?: BoolFilter<"AppProfile"> | boolean
    is_migration_generated?: BoolFilter<"AppProfile"> | boolean
    archived_at?: DateTimeNullableFilter<"AppProfile"> | Date | string | null
    created_at?: DateTimeFilter<"AppProfile"> | Date | string
    updated_at?: DateTimeFilter<"AppProfile"> | Date | string
  }

  export type AppAccessUpsertWithWhereUniqueWithoutBindingInput = {
    where: AppAccessWhereUniqueInput
    update: XOR<AppAccessUpdateWithoutBindingInput, AppAccessUncheckedUpdateWithoutBindingInput>
    create: XOR<AppAccessCreateWithoutBindingInput, AppAccessUncheckedCreateWithoutBindingInput>
  }

  export type AppAccessUpdateWithWhereUniqueWithoutBindingInput = {
    where: AppAccessWhereUniqueInput
    data: XOR<AppAccessUpdateWithoutBindingInput, AppAccessUncheckedUpdateWithoutBindingInput>
  }

  export type AppAccessUpdateManyWithWhereWithoutBindingInput = {
    where: AppAccessScalarWhereInput
    data: XOR<AppAccessUpdateManyMutationInput, AppAccessUncheckedUpdateManyWithoutBindingInput>
  }

  export type AppAccessScalarWhereInput = {
    AND?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
    OR?: AppAccessScalarWhereInput[]
    NOT?: AppAccessScalarWhereInput | AppAccessScalarWhereInput[]
    id?: StringFilter<"AppAccess"> | string
    binding_id?: StringFilter<"AppAccess"> | string
    user_id?: StringFilter<"AppAccess"> | string
    profile_id?: StringFilter<"AppAccess"> | string
    status?: StringFilter<"AppAccess"> | string
    aioson_play_origin_id?: StringNullableFilter<"AppAccess"> | string | null
    created_at?: DateTimeFilter<"AppAccess"> | Date | string
    updated_at?: DateTimeFilter<"AppAccess"> | Date | string
  }

  export type AuthSessionCreateWithoutUserInput = {
    id?: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
  }

  export type AuthSessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
  }

  export type AuthSessionCreateOrConnectWithoutUserInput = {
    where: AuthSessionWhereUniqueInput
    create: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput>
  }

  export type AuthSessionCreateManyUserInputEnvelope = {
    data: AuthSessionCreateManyUserInput | AuthSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutUserInput = {
    id?: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    role: RoleCreateNestedOneWithoutUser_rolesInput
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    id?: string
    role_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AppAccessCreateWithoutUserInput = {
    id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutAccessesInput
    profile: AppProfileCreateNestedOneWithoutAccessesInput
  }

  export type AppAccessUncheckedCreateWithoutUserInput = {
    id: string
    binding_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessCreateOrConnectWithoutUserInput = {
    where: AppAccessWhereUniqueInput
    create: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput>
  }

  export type AppAccessCreateManyUserInputEnvelope = {
    data: AppAccessCreateManyUserInput | AppAccessCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthSessionWhereUniqueInput
    update: XOR<AuthSessionUpdateWithoutUserInput, AuthSessionUncheckedUpdateWithoutUserInput>
    create: XOR<AuthSessionCreateWithoutUserInput, AuthSessionUncheckedCreateWithoutUserInput>
  }

  export type AuthSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthSessionWhereUniqueInput
    data: XOR<AuthSessionUpdateWithoutUserInput, AuthSessionUncheckedUpdateWithoutUserInput>
  }

  export type AuthSessionUpdateManyWithWhereWithoutUserInput = {
    where: AuthSessionScalarWhereInput
    data: XOR<AuthSessionUpdateManyMutationInput, AuthSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthSessionScalarWhereInput = {
    AND?: AuthSessionScalarWhereInput | AuthSessionScalarWhereInput[]
    OR?: AuthSessionScalarWhereInput[]
    NOT?: AuthSessionScalarWhereInput | AuthSessionScalarWhereInput[]
    id?: StringFilter<"AuthSession"> | string
    user_id?: StringFilter<"AuthSession"> | string
    token?: StringFilter<"AuthSession"> | string
    binding_id?: StringNullableFilter<"AuthSession"> | string | null
    expires_at?: DateTimeFilter<"AuthSession"> | Date | string
    aioson_play_id?: StringNullableFilter<"AuthSession"> | string | null
    created_at?: DateTimeFilter<"AuthSession"> | Date | string
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    OR?: UserRoleScalarWhereInput[]
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    id?: StringFilter<"UserRole"> | string
    user_id?: StringFilter<"UserRole"> | string
    role_id?: StringFilter<"UserRole"> | string
    binding_id?: StringFilter<"UserRole"> | string
    aioson_play_origin_id?: StringNullableFilter<"UserRole"> | string | null
    created_at?: DateTimeFilter<"UserRole"> | Date | string
  }

  export type AppAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: AppAccessWhereUniqueInput
    update: XOR<AppAccessUpdateWithoutUserInput, AppAccessUncheckedUpdateWithoutUserInput>
    create: XOR<AppAccessCreateWithoutUserInput, AppAccessUncheckedCreateWithoutUserInput>
  }

  export type AppAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: AppAccessWhereUniqueInput
    data: XOR<AppAccessUpdateWithoutUserInput, AppAccessUncheckedUpdateWithoutUserInput>
  }

  export type AppAccessUpdateManyWithWhereWithoutUserInput = {
    where: AppAccessScalarWhereInput
    data: XOR<AppAccessUpdateManyMutationInput, AppAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type AppBindingCreateWithoutPermissionsInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    profiles?: AppProfileCreateNestedManyWithoutBindingInput
    accesses?: AppAccessCreateNestedManyWithoutBindingInput
  }

  export type AppBindingUncheckedCreateWithoutPermissionsInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    profiles?: AppProfileUncheckedCreateNestedManyWithoutBindingInput
    accesses?: AppAccessUncheckedCreateNestedManyWithoutBindingInput
  }

  export type AppBindingCreateOrConnectWithoutPermissionsInput = {
    where: AppBindingWhereUniqueInput
    create: XOR<AppBindingCreateWithoutPermissionsInput, AppBindingUncheckedCreateWithoutPermissionsInput>
  }

  export type RolePermissionCreateWithoutPermissionInput = {
    id?: string
    binding_id: string
    created_at?: Date | string
    role: RoleCreateNestedOneWithoutPermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutPermissionInput = {
    id?: string
    role_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type RolePermissionCreateOrConnectWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionCreateManyPermissionInputEnvelope = {
    data: RolePermissionCreateManyPermissionInput | RolePermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type AppProfilePermissionCreateWithoutPermissionInput = {
    id: string
    created_at?: Date | string
    profile: AppProfileCreateNestedOneWithoutPermissionsInput
  }

  export type AppProfilePermissionUncheckedCreateWithoutPermissionInput = {
    id: string
    profile_id: string
    created_at?: Date | string
  }

  export type AppProfilePermissionCreateOrConnectWithoutPermissionInput = {
    where: AppProfilePermissionWhereUniqueInput
    create: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type AppProfilePermissionCreateManyPermissionInputEnvelope = {
    data: AppProfilePermissionCreateManyPermissionInput | AppProfilePermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type AppBindingUpsertWithoutPermissionsInput = {
    update: XOR<AppBindingUpdateWithoutPermissionsInput, AppBindingUncheckedUpdateWithoutPermissionsInput>
    create: XOR<AppBindingCreateWithoutPermissionsInput, AppBindingUncheckedCreateWithoutPermissionsInput>
    where?: AppBindingWhereInput
  }

  export type AppBindingUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: AppBindingWhereInput
    data: XOR<AppBindingUpdateWithoutPermissionsInput, AppBindingUncheckedUpdateWithoutPermissionsInput>
  }

  export type AppBindingUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: AppProfileUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUpdateManyWithoutBindingNestedInput
  }

  export type AppBindingUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: AppProfileUncheckedUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type RolePermissionScalarWhereInput = {
    AND?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    OR?: RolePermissionScalarWhereInput[]
    NOT?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    id?: StringFilter<"RolePermission"> | string
    role_id?: StringFilter<"RolePermission"> | string
    permission_id?: StringFilter<"RolePermission"> | string
    binding_id?: StringFilter<"RolePermission"> | string
    created_at?: DateTimeFilter<"RolePermission"> | Date | string
  }

  export type AppProfilePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: AppProfilePermissionWhereUniqueInput
    update: XOR<AppProfilePermissionUpdateWithoutPermissionInput, AppProfilePermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<AppProfilePermissionCreateWithoutPermissionInput, AppProfilePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type AppProfilePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: AppProfilePermissionWhereUniqueInput
    data: XOR<AppProfilePermissionUpdateWithoutPermissionInput, AppProfilePermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type AppProfilePermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: AppProfilePermissionScalarWhereInput
    data: XOR<AppProfilePermissionUpdateManyMutationInput, AppProfilePermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type AppProfilePermissionScalarWhereInput = {
    AND?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
    OR?: AppProfilePermissionScalarWhereInput[]
    NOT?: AppProfilePermissionScalarWhereInput | AppProfilePermissionScalarWhereInput[]
    id?: StringFilter<"AppProfilePermission"> | string
    profile_id?: StringFilter<"AppProfilePermission"> | string
    permission_id?: StringFilter<"AppProfilePermission"> | string
    created_at?: DateTimeFilter<"AppProfilePermission"> | Date | string
  }

  export type AppBindingCreateWithoutProfilesInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionCreateNestedManyWithoutBindingInput
    accesses?: AppAccessCreateNestedManyWithoutBindingInput
  }

  export type AppBindingUncheckedCreateWithoutProfilesInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionUncheckedCreateNestedManyWithoutBindingInput
    accesses?: AppAccessUncheckedCreateNestedManyWithoutBindingInput
  }

  export type AppBindingCreateOrConnectWithoutProfilesInput = {
    where: AppBindingWhereUniqueInput
    create: XOR<AppBindingCreateWithoutProfilesInput, AppBindingUncheckedCreateWithoutProfilesInput>
  }

  export type AppProfilePermissionCreateWithoutProfileInput = {
    id: string
    created_at?: Date | string
    permission: BindingPermissionCreateNestedOneWithoutProfile_permsInput
  }

  export type AppProfilePermissionUncheckedCreateWithoutProfileInput = {
    id: string
    permission_id: string
    created_at?: Date | string
  }

  export type AppProfilePermissionCreateOrConnectWithoutProfileInput = {
    where: AppProfilePermissionWhereUniqueInput
    create: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput>
  }

  export type AppProfilePermissionCreateManyProfileInputEnvelope = {
    data: AppProfilePermissionCreateManyProfileInput | AppProfilePermissionCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type AppAccessCreateWithoutProfileInput = {
    id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutAccessesInput
    user: GlobalUserCreateNestedOneWithoutApp_accessesInput
  }

  export type AppAccessUncheckedCreateWithoutProfileInput = {
    id: string
    binding_id: string
    user_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessCreateOrConnectWithoutProfileInput = {
    where: AppAccessWhereUniqueInput
    create: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput>
  }

  export type AppAccessCreateManyProfileInputEnvelope = {
    data: AppAccessCreateManyProfileInput | AppAccessCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type AppBindingUpsertWithoutProfilesInput = {
    update: XOR<AppBindingUpdateWithoutProfilesInput, AppBindingUncheckedUpdateWithoutProfilesInput>
    create: XOR<AppBindingCreateWithoutProfilesInput, AppBindingUncheckedCreateWithoutProfilesInput>
    where?: AppBindingWhereInput
  }

  export type AppBindingUpdateToOneWithWhereWithoutProfilesInput = {
    where?: AppBindingWhereInput
    data: XOR<AppBindingUpdateWithoutProfilesInput, AppBindingUncheckedUpdateWithoutProfilesInput>
  }

  export type AppBindingUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUpdateManyWithoutBindingNestedInput
  }

  export type AppBindingUncheckedUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUncheckedUpdateManyWithoutBindingNestedInput
    accesses?: AppAccessUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type AppProfilePermissionUpsertWithWhereUniqueWithoutProfileInput = {
    where: AppProfilePermissionWhereUniqueInput
    update: XOR<AppProfilePermissionUpdateWithoutProfileInput, AppProfilePermissionUncheckedUpdateWithoutProfileInput>
    create: XOR<AppProfilePermissionCreateWithoutProfileInput, AppProfilePermissionUncheckedCreateWithoutProfileInput>
  }

  export type AppProfilePermissionUpdateWithWhereUniqueWithoutProfileInput = {
    where: AppProfilePermissionWhereUniqueInput
    data: XOR<AppProfilePermissionUpdateWithoutProfileInput, AppProfilePermissionUncheckedUpdateWithoutProfileInput>
  }

  export type AppProfilePermissionUpdateManyWithWhereWithoutProfileInput = {
    where: AppProfilePermissionScalarWhereInput
    data: XOR<AppProfilePermissionUpdateManyMutationInput, AppProfilePermissionUncheckedUpdateManyWithoutProfileInput>
  }

  export type AppAccessUpsertWithWhereUniqueWithoutProfileInput = {
    where: AppAccessWhereUniqueInput
    update: XOR<AppAccessUpdateWithoutProfileInput, AppAccessUncheckedUpdateWithoutProfileInput>
    create: XOR<AppAccessCreateWithoutProfileInput, AppAccessUncheckedCreateWithoutProfileInput>
  }

  export type AppAccessUpdateWithWhereUniqueWithoutProfileInput = {
    where: AppAccessWhereUniqueInput
    data: XOR<AppAccessUpdateWithoutProfileInput, AppAccessUncheckedUpdateWithoutProfileInput>
  }

  export type AppAccessUpdateManyWithWhereWithoutProfileInput = {
    where: AppAccessScalarWhereInput
    data: XOR<AppAccessUpdateManyMutationInput, AppAccessUncheckedUpdateManyWithoutProfileInput>
  }

  export type AppProfileCreateWithoutPermissionsInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutProfilesInput
    accesses?: AppAccessCreateNestedManyWithoutProfileInput
  }

  export type AppProfileUncheckedCreateWithoutPermissionsInput = {
    id: string
    binding_id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    accesses?: AppAccessUncheckedCreateNestedManyWithoutProfileInput
  }

  export type AppProfileCreateOrConnectWithoutPermissionsInput = {
    where: AppProfileWhereUniqueInput
    create: XOR<AppProfileCreateWithoutPermissionsInput, AppProfileUncheckedCreateWithoutPermissionsInput>
  }

  export type BindingPermissionCreateWithoutProfile_permsInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutPermissionsInput
    role_perms?: RolePermissionCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionUncheckedCreateWithoutProfile_permsInput = {
    id?: string
    binding_id: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    role_perms?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionCreateOrConnectWithoutProfile_permsInput = {
    where: BindingPermissionWhereUniqueInput
    create: XOR<BindingPermissionCreateWithoutProfile_permsInput, BindingPermissionUncheckedCreateWithoutProfile_permsInput>
  }

  export type AppProfileUpsertWithoutPermissionsInput = {
    update: XOR<AppProfileUpdateWithoutPermissionsInput, AppProfileUncheckedUpdateWithoutPermissionsInput>
    create: XOR<AppProfileCreateWithoutPermissionsInput, AppProfileUncheckedCreateWithoutPermissionsInput>
    where?: AppProfileWhereInput
  }

  export type AppProfileUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: AppProfileWhereInput
    data: XOR<AppProfileUpdateWithoutPermissionsInput, AppProfileUncheckedUpdateWithoutPermissionsInput>
  }

  export type AppProfileUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutProfilesNestedInput
    accesses?: AppAccessUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    accesses?: AppAccessUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type BindingPermissionUpsertWithoutProfile_permsInput = {
    update: XOR<BindingPermissionUpdateWithoutProfile_permsInput, BindingPermissionUncheckedUpdateWithoutProfile_permsInput>
    create: XOR<BindingPermissionCreateWithoutProfile_permsInput, BindingPermissionUncheckedCreateWithoutProfile_permsInput>
    where?: BindingPermissionWhereInput
  }

  export type BindingPermissionUpdateToOneWithWhereWithoutProfile_permsInput = {
    where?: BindingPermissionWhereInput
    data: XOR<BindingPermissionUpdateWithoutProfile_permsInput, BindingPermissionUncheckedUpdateWithoutProfile_permsInput>
  }

  export type BindingPermissionUpdateWithoutProfile_permsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutPermissionsNestedInput
    role_perms?: RolePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionUncheckedUpdateWithoutProfile_permsInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_perms?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type AppBindingCreateWithoutAccessesInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionCreateNestedManyWithoutBindingInput
    profiles?: AppProfileCreateNestedManyWithoutBindingInput
  }

  export type AppBindingUncheckedCreateWithoutAccessesInput = {
    id?: string
    app_name: string
    app_slug?: string
    connection_name: string
    system_permissions?: string
    enable_2fa?: boolean
    enable_rbac?: boolean
    auth_mode?: string
    manifest_fingerprint?: string | null
    manifest_sync_status?: string
    manifest_sync_error?: string | null
    manifest_synced_at?: Date | string | null
    allowed_origins_json?: string
    aioson_play_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: BindingPermissionUncheckedCreateNestedManyWithoutBindingInput
    profiles?: AppProfileUncheckedCreateNestedManyWithoutBindingInput
  }

  export type AppBindingCreateOrConnectWithoutAccessesInput = {
    where: AppBindingWhereUniqueInput
    create: XOR<AppBindingCreateWithoutAccessesInput, AppBindingUncheckedCreateWithoutAccessesInput>
  }

  export type GlobalUserCreateWithoutApp_accessesInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionCreateNestedManyWithoutUserInput
    user_roles?: UserRoleCreateNestedManyWithoutUserInput
  }

  export type GlobalUserUncheckedCreateWithoutApp_accessesInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionUncheckedCreateNestedManyWithoutUserInput
    user_roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
  }

  export type GlobalUserCreateOrConnectWithoutApp_accessesInput = {
    where: GlobalUserWhereUniqueInput
    create: XOR<GlobalUserCreateWithoutApp_accessesInput, GlobalUserUncheckedCreateWithoutApp_accessesInput>
  }

  export type AppProfileCreateWithoutAccessesInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutProfilesInput
    permissions?: AppProfilePermissionCreateNestedManyWithoutProfileInput
  }

  export type AppProfileUncheckedCreateWithoutAccessesInput = {
    id: string
    binding_id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: AppProfilePermissionUncheckedCreateNestedManyWithoutProfileInput
  }

  export type AppProfileCreateOrConnectWithoutAccessesInput = {
    where: AppProfileWhereUniqueInput
    create: XOR<AppProfileCreateWithoutAccessesInput, AppProfileUncheckedCreateWithoutAccessesInput>
  }

  export type AppBindingUpsertWithoutAccessesInput = {
    update: XOR<AppBindingUpdateWithoutAccessesInput, AppBindingUncheckedUpdateWithoutAccessesInput>
    create: XOR<AppBindingCreateWithoutAccessesInput, AppBindingUncheckedCreateWithoutAccessesInput>
    where?: AppBindingWhereInput
  }

  export type AppBindingUpdateToOneWithWhereWithoutAccessesInput = {
    where?: AppBindingWhereInput
    data: XOR<AppBindingUpdateWithoutAccessesInput, AppBindingUncheckedUpdateWithoutAccessesInput>
  }

  export type AppBindingUpdateWithoutAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUpdateManyWithoutBindingNestedInput
    profiles?: AppProfileUpdateManyWithoutBindingNestedInput
  }

  export type AppBindingUncheckedUpdateWithoutAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_name?: StringFieldUpdateOperationsInput | string
    app_slug?: StringFieldUpdateOperationsInput | string
    connection_name?: StringFieldUpdateOperationsInput | string
    system_permissions?: StringFieldUpdateOperationsInput | string
    enable_2fa?: BoolFieldUpdateOperationsInput | boolean
    enable_rbac?: BoolFieldUpdateOperationsInput | boolean
    auth_mode?: StringFieldUpdateOperationsInput | string
    manifest_fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_sync_status?: StringFieldUpdateOperationsInput | string
    manifest_sync_error?: NullableStringFieldUpdateOperationsInput | string | null
    manifest_synced_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    allowed_origins_json?: StringFieldUpdateOperationsInput | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: BindingPermissionUncheckedUpdateManyWithoutBindingNestedInput
    profiles?: AppProfileUncheckedUpdateManyWithoutBindingNestedInput
  }

  export type GlobalUserUpsertWithoutApp_accessesInput = {
    update: XOR<GlobalUserUpdateWithoutApp_accessesInput, GlobalUserUncheckedUpdateWithoutApp_accessesInput>
    create: XOR<GlobalUserCreateWithoutApp_accessesInput, GlobalUserUncheckedCreateWithoutApp_accessesInput>
    where?: GlobalUserWhereInput
  }

  export type GlobalUserUpdateToOneWithWhereWithoutApp_accessesInput = {
    where?: GlobalUserWhereInput
    data: XOR<GlobalUserUpdateWithoutApp_accessesInput, GlobalUserUncheckedUpdateWithoutApp_accessesInput>
  }

  export type GlobalUserUpdateWithoutApp_accessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUpdateManyWithoutUserNestedInput
    user_roles?: UserRoleUpdateManyWithoutUserNestedInput
  }

  export type GlobalUserUncheckedUpdateWithoutApp_accessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUncheckedUpdateManyWithoutUserNestedInput
    user_roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AppProfileUpsertWithoutAccessesInput = {
    update: XOR<AppProfileUpdateWithoutAccessesInput, AppProfileUncheckedUpdateWithoutAccessesInput>
    create: XOR<AppProfileCreateWithoutAccessesInput, AppProfileUncheckedCreateWithoutAccessesInput>
    where?: AppProfileWhereInput
  }

  export type AppProfileUpdateToOneWithWhereWithoutAccessesInput = {
    where?: AppProfileWhereInput
    data: XOR<AppProfileUpdateWithoutAccessesInput, AppProfileUncheckedUpdateWithoutAccessesInput>
  }

  export type AppProfileUpdateWithoutAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutProfilesNestedInput
    permissions?: AppProfilePermissionUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileUncheckedUpdateWithoutAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: AppProfilePermissionUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type RolePermissionCreateWithoutRoleInput = {
    id?: string
    binding_id: string
    created_at?: Date | string
    permission: BindingPermissionCreateNestedOneWithoutRole_permsInput
  }

  export type RolePermissionUncheckedCreateWithoutRoleInput = {
    id?: string
    permission_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionCreateManyRoleInputEnvelope = {
    data: RolePermissionCreateManyRoleInput | RolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutRoleInput = {
    id?: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    user: GlobalUserCreateNestedOneWithoutUser_rolesInput
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    id?: string
    user_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_roles?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_roles?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type BindingPermissionCreateWithoutRole_permsInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    binding: AppBindingCreateNestedOneWithoutPermissionsInput
    profile_perms?: AppProfilePermissionCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionUncheckedCreateWithoutRole_permsInput = {
    id?: string
    binding_id: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
    profile_perms?: AppProfilePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type BindingPermissionCreateOrConnectWithoutRole_permsInput = {
    where: BindingPermissionWhereUniqueInput
    create: XOR<BindingPermissionCreateWithoutRole_permsInput, BindingPermissionUncheckedCreateWithoutRole_permsInput>
  }

  export type RoleUpsertWithoutPermissionsInput = {
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_roles?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_roles?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type BindingPermissionUpsertWithoutRole_permsInput = {
    update: XOR<BindingPermissionUpdateWithoutRole_permsInput, BindingPermissionUncheckedUpdateWithoutRole_permsInput>
    create: XOR<BindingPermissionCreateWithoutRole_permsInput, BindingPermissionUncheckedCreateWithoutRole_permsInput>
    where?: BindingPermissionWhereInput
  }

  export type BindingPermissionUpdateToOneWithWhereWithoutRole_permsInput = {
    where?: BindingPermissionWhereInput
    data: XOR<BindingPermissionUpdateWithoutRole_permsInput, BindingPermissionUncheckedUpdateWithoutRole_permsInput>
  }

  export type BindingPermissionUpdateWithoutRole_permsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutPermissionsNestedInput
    profile_perms?: AppProfilePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionUncheckedUpdateWithoutRole_permsInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile_perms?: AppProfilePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type GlobalUserCreateWithoutUser_rolesInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessCreateNestedManyWithoutUserInput
  }

  export type GlobalUserUncheckedCreateWithoutUser_rolesInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: AuthSessionUncheckedCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type GlobalUserCreateOrConnectWithoutUser_rolesInput = {
    where: GlobalUserWhereUniqueInput
    create: XOR<GlobalUserCreateWithoutUser_rolesInput, GlobalUserUncheckedCreateWithoutUser_rolesInput>
  }

  export type RoleCreateWithoutUser_rolesInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUser_rolesInput = {
    id?: string
    name: string
    description?: string
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUser_rolesInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUser_rolesInput, RoleUncheckedCreateWithoutUser_rolesInput>
  }

  export type GlobalUserUpsertWithoutUser_rolesInput = {
    update: XOR<GlobalUserUpdateWithoutUser_rolesInput, GlobalUserUncheckedUpdateWithoutUser_rolesInput>
    create: XOR<GlobalUserCreateWithoutUser_rolesInput, GlobalUserUncheckedCreateWithoutUser_rolesInput>
    where?: GlobalUserWhereInput
  }

  export type GlobalUserUpdateToOneWithWhereWithoutUser_rolesInput = {
    where?: GlobalUserWhereInput
    data: XOR<GlobalUserUpdateWithoutUser_rolesInput, GlobalUserUncheckedUpdateWithoutUser_rolesInput>
  }

  export type GlobalUserUpdateWithoutUser_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUpdateManyWithoutUserNestedInput
  }

  export type GlobalUserUncheckedUpdateWithoutUser_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AuthSessionUncheckedUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoleUpsertWithoutUser_rolesInput = {
    update: XOR<RoleUpdateWithoutUser_rolesInput, RoleUncheckedUpdateWithoutUser_rolesInput>
    create: XOR<RoleCreateWithoutUser_rolesInput, RoleUncheckedCreateWithoutUser_rolesInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUser_rolesInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUser_rolesInput, RoleUncheckedUpdateWithoutUser_rolesInput>
  }

  export type RoleUpdateWithoutUser_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUser_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type GlobalUserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    user_roles?: UserRoleCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessCreateNestedManyWithoutUserInput
  }

  export type GlobalUserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password_hash?: string | null
    name?: string
    totp_secret?: string | null
    aioson_play_origin_id?: string | null
    disabled_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    user_roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    app_accesses?: AppAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type GlobalUserCreateOrConnectWithoutSessionsInput = {
    where: GlobalUserWhereUniqueInput
    create: XOR<GlobalUserCreateWithoutSessionsInput, GlobalUserUncheckedCreateWithoutSessionsInput>
  }

  export type GlobalUserUpsertWithoutSessionsInput = {
    update: XOR<GlobalUserUpdateWithoutSessionsInput, GlobalUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<GlobalUserCreateWithoutSessionsInput, GlobalUserUncheckedCreateWithoutSessionsInput>
    where?: GlobalUserWhereInput
  }

  export type GlobalUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: GlobalUserWhereInput
    data: XOR<GlobalUserUpdateWithoutSessionsInput, GlobalUserUncheckedUpdateWithoutSessionsInput>
  }

  export type GlobalUserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_roles?: UserRoleUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUpdateManyWithoutUserNestedInput
  }

  export type GlobalUserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    disabled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    app_accesses?: AppAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BindingPermissionCreateManyBindingInput = {
    id?: string
    name: string
    resource: string
    action: string
    retired_at?: Date | string | null
    created_at?: Date | string
  }

  export type AppProfileCreateManyBindingInput = {
    id: string
    name: string
    description?: string
    is_system?: boolean
    is_migration_generated?: boolean
    archived_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppAccessCreateManyBindingInput = {
    id: string
    user_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BindingPermissionUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_perms?: RolePermissionUpdateManyWithoutPermissionNestedInput
    profile_perms?: AppProfilePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionUncheckedUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_perms?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
    profile_perms?: AppProfilePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type BindingPermissionUncheckedUpdateManyWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    retired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfileUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: AppProfilePermissionUpdateManyWithoutProfileNestedInput
    accesses?: AppAccessUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileUncheckedUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: AppProfilePermissionUncheckedUpdateManyWithoutProfileNestedInput
    accesses?: AppAccessUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type AppProfileUncheckedUpdateManyWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_system?: BoolFieldUpdateOperationsInput | boolean
    is_migration_generated?: BoolFieldUpdateOperationsInput | boolean
    archived_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: GlobalUserUpdateOneRequiredWithoutApp_accessesNestedInput
    profile?: AppProfileUpdateOneRequiredWithoutAccessesNestedInput
  }

  export type AppAccessUncheckedUpdateWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUncheckedUpdateManyWithoutBindingInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionCreateManyUserInput = {
    id?: string
    token: string
    binding_id?: string | null
    expires_at: Date | string
    aioson_play_id?: string | null
    created_at?: Date | string
  }

  export type UserRoleCreateManyUserInput = {
    id?: string
    role_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type AppAccessCreateManyUserInput = {
    id: string
    binding_id: string
    profile_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuthSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    binding_id?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    aioson_play_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUser_rolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutAccessesNestedInput
    profile?: AppProfileUpdateOneRequiredWithoutAccessesNestedInput
  }

  export type AppAccessUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyPermissionInput = {
    id?: string
    role_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type AppProfilePermissionCreateManyPermissionInput = {
    id: string
    profile_id: string
    created_at?: Date | string
  }

  export type RolePermissionUpdateWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionUpdateWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: AppProfileUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type AppProfilePermissionUncheckedUpdateWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionUncheckedUpdateManyWithoutPermissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionCreateManyProfileInput = {
    id: string
    permission_id: string
    created_at?: Date | string
  }

  export type AppAccessCreateManyProfileInput = {
    id: string
    binding_id: string
    user_id: string
    status?: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppProfilePermissionUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permission?: BindingPermissionUpdateOneRequiredWithoutProfile_permsNestedInput
  }

  export type AppProfilePermissionUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppProfilePermissionUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    binding?: AppBindingUpdateOneRequiredWithoutAccessesNestedInput
    user?: GlobalUserUpdateOneRequiredWithoutApp_accessesNestedInput
  }

  export type AppAccessUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppAccessUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyRoleInput = {
    id?: string
    permission_id: string
    binding_id: string
    created_at?: Date | string
  }

  export type UserRoleCreateManyRoleInput = {
    id?: string
    user_id: string
    binding_id: string
    aioson_play_origin_id?: string | null
    created_at?: Date | string
  }

  export type RolePermissionUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permission?: BindingPermissionUpdateOneRequiredWithoutRole_permsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: GlobalUserUpdateOneRequiredWithoutUser_rolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    binding_id?: StringFieldUpdateOperationsInput | string
    aioson_play_origin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AppBindingCountOutputTypeDefaultArgs instead
     */
    export type AppBindingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppBindingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GlobalUserCountOutputTypeDefaultArgs instead
     */
    export type GlobalUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GlobalUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BindingPermissionCountOutputTypeDefaultArgs instead
     */
    export type BindingPermissionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BindingPermissionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppProfileCountOutputTypeDefaultArgs instead
     */
    export type AppProfileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppProfileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoleCountOutputTypeDefaultArgs instead
     */
    export type RoleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuthDatabaseMetadataDefaultArgs instead
     */
    export type AuthDatabaseMetadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuthDatabaseMetadataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GlobalSettingsDefaultArgs instead
     */
    export type GlobalSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GlobalSettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TokenRevocationDefaultArgs instead
     */
    export type TokenRevocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TokenRevocationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppBindingDefaultArgs instead
     */
    export type AppBindingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppBindingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayAppInventoryDefaultArgs instead
     */
    export type PlayAppInventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayAppInventoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GlobalUserDefaultArgs instead
     */
    export type GlobalUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GlobalUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BindingPermissionDefaultArgs instead
     */
    export type BindingPermissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BindingPermissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppProfileDefaultArgs instead
     */
    export type AppProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppProfilePermissionDefaultArgs instead
     */
    export type AppProfilePermissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppProfilePermissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppAccessDefaultArgs instead
     */
    export type AppAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppAccessDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoleDefaultArgs instead
     */
    export type RoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RolePermissionDefaultArgs instead
     */
    export type RolePermissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RolePermissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserRoleDefaultArgs instead
     */
    export type UserRoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserRoleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuthSessionDefaultArgs instead
     */
    export type AuthSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuthSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecoveryTokenDefaultArgs instead
     */
    export type RecoveryTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecoveryTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminUserDefaultArgs instead
     */
    export type AdminUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FederationConfigDefaultArgs instead
     */
    export type FederationConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FederationConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}