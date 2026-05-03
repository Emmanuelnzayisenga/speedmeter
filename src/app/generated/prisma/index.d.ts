
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model VehicleLocation
 * 
 */
export type VehicleLocation = $Result.DefaultSelection<Prisma.$VehicleLocationPayload>
/**
 * Model SpeedZone
 * 
 */
export type SpeedZone = $Result.DefaultSelection<Prisma.$SpeedZonePayload>
/**
 * Model Violation
 * 
 */
export type Violation = $Result.DefaultSelection<Prisma.$ViolationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VehicleType: {
  CAR: 'CAR',
  TRUCK: 'TRUCK',
  MOTORCYCLE: 'MOTORCYCLE',
  BUS: 'BUS',
  VAN: 'VAN',
  OTHER: 'OTHER'
};

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType]


export const VehicleStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MOVING: 'MOVING',
  SPEEDING: 'SPEEDING',
  OFFLINE: 'OFFLINE'
};

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus]


export const ZoneType: {
  POLYGON: 'POLYGON',
  CIRCLE: 'CIRCLE',
  CORRIDOR: 'CORRIDOR'
};

export type ZoneType = (typeof ZoneType)[keyof typeof ZoneType]


export const ViolationStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  DISPUTED: 'DISPUTED',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED'
};

export type ViolationStatus = (typeof ViolationStatus)[keyof typeof ViolationStatus]

}

export type VehicleType = $Enums.VehicleType

export const VehicleType: typeof $Enums.VehicleType

export type VehicleStatus = $Enums.VehicleStatus

export const VehicleStatus: typeof $Enums.VehicleStatus

export type ZoneType = $Enums.ZoneType

export const ZoneType: typeof $Enums.ZoneType

export type ViolationStatus = $Enums.ViolationStatus

export const ViolationStatus: typeof $Enums.ViolationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs>;

  /**
   * `prisma.vehicleLocation`: Exposes CRUD operations for the **VehicleLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleLocations
    * const vehicleLocations = await prisma.vehicleLocation.findMany()
    * ```
    */
  get vehicleLocation(): Prisma.VehicleLocationDelegate<ExtArgs>;

  /**
   * `prisma.speedZone`: Exposes CRUD operations for the **SpeedZone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpeedZones
    * const speedZones = await prisma.speedZone.findMany()
    * ```
    */
  get speedZone(): Prisma.SpeedZoneDelegate<ExtArgs>;

  /**
   * `prisma.violation`: Exposes CRUD operations for the **Violation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Violations
    * const violations = await prisma.violation.findMany()
    * ```
    */
  get violation(): Prisma.ViolationDelegate<ExtArgs>;
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
    User: 'User',
    Vehicle: 'Vehicle',
    VehicleLocation: 'VehicleLocation',
    SpeedZone: 'SpeedZone',
    Violation: 'Violation'
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
      modelProps: "user" | "vehicle" | "vehicleLocation" | "speedZone" | "violation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      VehicleLocation: {
        payload: Prisma.$VehicleLocationPayload<ExtArgs>
        fields: Prisma.VehicleLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          findFirst: {
            args: Prisma.VehicleLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          findMany: {
            args: Prisma.VehicleLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>[]
          }
          create: {
            args: Prisma.VehicleLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          createMany: {
            args: Prisma.VehicleLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>[]
          }
          delete: {
            args: Prisma.VehicleLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          update: {
            args: Prisma.VehicleLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          deleteMany: {
            args: Prisma.VehicleLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleLocationPayload>
          }
          aggregate: {
            args: Prisma.VehicleLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleLocation>
          }
          groupBy: {
            args: Prisma.VehicleLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleLocationCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleLocationCountAggregateOutputType> | number
          }
        }
      }
      SpeedZone: {
        payload: Prisma.$SpeedZonePayload<ExtArgs>
        fields: Prisma.SpeedZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpeedZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpeedZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          findFirst: {
            args: Prisma.SpeedZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpeedZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          findMany: {
            args: Prisma.SpeedZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>[]
          }
          create: {
            args: Prisma.SpeedZoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          createMany: {
            args: Prisma.SpeedZoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpeedZoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>[]
          }
          delete: {
            args: Prisma.SpeedZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          update: {
            args: Prisma.SpeedZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          deleteMany: {
            args: Prisma.SpeedZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpeedZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpeedZoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeedZonePayload>
          }
          aggregate: {
            args: Prisma.SpeedZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpeedZone>
          }
          groupBy: {
            args: Prisma.SpeedZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpeedZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpeedZoneCountArgs<ExtArgs>
            result: $Utils.Optional<SpeedZoneCountAggregateOutputType> | number
          }
        }
      }
      Violation: {
        payload: Prisma.$ViolationPayload<ExtArgs>
        fields: Prisma.ViolationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ViolationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ViolationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          findFirst: {
            args: Prisma.ViolationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ViolationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          findMany: {
            args: Prisma.ViolationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>[]
          }
          create: {
            args: Prisma.ViolationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          createMany: {
            args: Prisma.ViolationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ViolationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>[]
          }
          delete: {
            args: Prisma.ViolationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          update: {
            args: Prisma.ViolationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          deleteMany: {
            args: Prisma.ViolationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ViolationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ViolationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViolationPayload>
          }
          aggregate: {
            args: Prisma.ViolationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateViolation>
          }
          groupBy: {
            args: Prisma.ViolationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ViolationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ViolationCountArgs<ExtArgs>
            result: $Utils.Optional<ViolationCountAggregateOutputType> | number
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
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    locations: number
    violations: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | VehicleCountOutputTypeCountLocationsArgs
    violations?: boolean | VehicleCountOutputTypeCountViolationsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleLocationWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountViolationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViolationWhereInput
  }


  /**
   * Count Type SpeedZoneCountOutputType
   */

  export type SpeedZoneCountOutputType = {
    violations: number
  }

  export type SpeedZoneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    violations?: boolean | SpeedZoneCountOutputTypeCountViolationsArgs
  }

  // Custom InputTypes
  /**
   * SpeedZoneCountOutputType without action
   */
  export type SpeedZoneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZoneCountOutputType
     */
    select?: SpeedZoneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpeedZoneCountOutputType without action
   */
  export type SpeedZoneCountOutputTypeCountViolationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViolationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    timezoneId: number | null
  }

  export type UserSumAggregateOutputType = {
    timezoneId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    phoneNumber: string | null
    isActive: boolean | null
    profilePicture: string | null
    email: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    timezoneId: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    phoneNumber: string | null
    isActive: boolean | null
    profilePicture: string | null
    email: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    timezoneId: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    middleName: number
    lastName: number
    dob: number
    phoneNumber: number
    isActive: number
    profilePicture: number
    email: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    password: number
    timezoneId: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    timezoneId?: true
  }

  export type UserSumAggregateInputType = {
    timezoneId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    phoneNumber?: true
    isActive?: true
    profilePicture?: true
    email?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    timezoneId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    phoneNumber?: true
    isActive?: true
    profilePicture?: true
    email?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    timezoneId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    phoneNumber?: true
    isActive?: true
    profilePicture?: true
    email?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    timezoneId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string | null
    dob: Date | null
    phoneNumber: string
    isActive: boolean
    profilePicture: string | null
    email: string
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
    password: string
    timezoneId: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    phoneNumber?: boolean
    isActive?: boolean
    profilePicture?: boolean
    email?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    timezoneId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    phoneNumber?: boolean
    isActive?: boolean
    profilePicture?: boolean
    email?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    timezoneId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    phoneNumber?: boolean
    isActive?: boolean
    profilePicture?: boolean
    email?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    timezoneId?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      middleName: string | null
      lastName: string | null
      dob: Date | null
      phoneNumber: string
      isActive: boolean
      profilePicture: string | null
      email: string
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
      password: string
      timezoneId: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly middleName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly dob: FieldRef<"User", 'DateTime'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
    readonly timezoneId: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    name: string | null
    plateNumber: string | null
    type: $Enums.VehicleType | null
    status: $Enums.VehicleStatus | null
    driverName: string | null
    driverPhone: string | null
    deviceId: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    plateNumber: string | null
    type: $Enums.VehicleType | null
    status: $Enums.VehicleStatus | null
    driverName: string | null
    driverPhone: string | null
    deviceId: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    name: number
    plateNumber: number
    type: number
    status: number
    driverName: number
    driverPhone: number
    deviceId: number
    color: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleMinAggregateInputType = {
    id?: true
    name?: true
    plateNumber?: true
    type?: true
    status?: true
    driverName?: true
    driverPhone?: true
    deviceId?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    name?: true
    plateNumber?: true
    type?: true
    status?: true
    driverName?: true
    driverPhone?: true
    deviceId?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    name?: true
    plateNumber?: true
    type?: true
    status?: true
    driverName?: true
    driverPhone?: true
    deviceId?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    name: string
    plateNumber: string
    type: $Enums.VehicleType
    status: $Enums.VehicleStatus
    driverName: string | null
    driverPhone: string | null
    deviceId: string | null
    color: string | null
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plateNumber?: boolean
    type?: boolean
    status?: boolean
    driverName?: boolean
    driverPhone?: boolean
    deviceId?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    locations?: boolean | Vehicle$locationsArgs<ExtArgs>
    violations?: boolean | Vehicle$violationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plateNumber?: boolean
    type?: boolean
    status?: boolean
    driverName?: boolean
    driverPhone?: boolean
    deviceId?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    name?: boolean
    plateNumber?: boolean
    type?: boolean
    status?: boolean
    driverName?: boolean
    driverPhone?: boolean
    deviceId?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | Vehicle$locationsArgs<ExtArgs>
    violations?: boolean | Vehicle$violationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      locations: Prisma.$VehicleLocationPayload<ExtArgs>[]
      violations: Prisma.$ViolationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      plateNumber: string
      type: $Enums.VehicleType
      status: $Enums.VehicleStatus
      driverName: string | null
      driverPhone: string | null
      deviceId: string | null
      color: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
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
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends Vehicle$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findMany"> | Null>
    violations<T extends Vehicle$violationsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$violationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Vehicle model
   */ 
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly name: FieldRef<"Vehicle", 'String'>
    readonly plateNumber: FieldRef<"Vehicle", 'String'>
    readonly type: FieldRef<"Vehicle", 'VehicleType'>
    readonly status: FieldRef<"Vehicle", 'VehicleStatus'>
    readonly driverName: FieldRef<"Vehicle", 'String'>
    readonly driverPhone: FieldRef<"Vehicle", 'String'>
    readonly deviceId: FieldRef<"Vehicle", 'String'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
  }

  /**
   * Vehicle.locations
   */
  export type Vehicle$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    where?: VehicleLocationWhereInput
    orderBy?: VehicleLocationOrderByWithRelationInput | VehicleLocationOrderByWithRelationInput[]
    cursor?: VehicleLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleLocationScalarFieldEnum | VehicleLocationScalarFieldEnum[]
  }

  /**
   * Vehicle.violations
   */
  export type Vehicle$violationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    where?: ViolationWhereInput
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    cursor?: ViolationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ViolationScalarFieldEnum | ViolationScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model VehicleLocation
   */

  export type AggregateVehicleLocation = {
    _count: VehicleLocationCountAggregateOutputType | null
    _avg: VehicleLocationAvgAggregateOutputType | null
    _sum: VehicleLocationSumAggregateOutputType | null
    _min: VehicleLocationMinAggregateOutputType | null
    _max: VehicleLocationMaxAggregateOutputType | null
  }

  export type VehicleLocationAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    satellites: number | null
  }

  export type VehicleLocationSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    satellites: number | null
  }

  export type VehicleLocationMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    satellites: number | null
    timestamp: Date | null
  }

  export type VehicleLocationMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    satellites: number | null
    timestamp: Date | null
  }

  export type VehicleLocationCountAggregateOutputType = {
    id: number
    vehicleId: number
    latitude: number
    longitude: number
    speed: number
    heading: number
    altitude: number
    accuracy: number
    satellites: number
    timestamp: number
    _all: number
  }


  export type VehicleLocationAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    satellites?: true
  }

  export type VehicleLocationSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    satellites?: true
  }

  export type VehicleLocationMinAggregateInputType = {
    id?: true
    vehicleId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    satellites?: true
    timestamp?: true
  }

  export type VehicleLocationMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    satellites?: true
    timestamp?: true
  }

  export type VehicleLocationCountAggregateInputType = {
    id?: true
    vehicleId?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    satellites?: true
    timestamp?: true
    _all?: true
  }

  export type VehicleLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleLocation to aggregate.
     */
    where?: VehicleLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleLocations to fetch.
     */
    orderBy?: VehicleLocationOrderByWithRelationInput | VehicleLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleLocations
    **/
    _count?: true | VehicleLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleLocationMaxAggregateInputType
  }

  export type GetVehicleLocationAggregateType<T extends VehicleLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleLocation[P]>
      : GetScalarType<T[P], AggregateVehicleLocation[P]>
  }




  export type VehicleLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleLocationWhereInput
    orderBy?: VehicleLocationOrderByWithAggregationInput | VehicleLocationOrderByWithAggregationInput[]
    by: VehicleLocationScalarFieldEnum[] | VehicleLocationScalarFieldEnum
    having?: VehicleLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleLocationCountAggregateInputType | true
    _avg?: VehicleLocationAvgAggregateInputType
    _sum?: VehicleLocationSumAggregateInputType
    _min?: VehicleLocationMinAggregateInputType
    _max?: VehicleLocationMaxAggregateInputType
  }

  export type VehicleLocationGroupByOutputType = {
    id: string
    vehicleId: string
    latitude: number
    longitude: number
    speed: number
    heading: number | null
    altitude: number | null
    accuracy: number | null
    satellites: number | null
    timestamp: Date
    _count: VehicleLocationCountAggregateOutputType | null
    _avg: VehicleLocationAvgAggregateOutputType | null
    _sum: VehicleLocationSumAggregateOutputType | null
    _min: VehicleLocationMinAggregateOutputType | null
    _max: VehicleLocationMaxAggregateOutputType | null
  }

  type GetVehicleLocationGroupByPayload<T extends VehicleLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleLocationGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleLocationGroupByOutputType[P]>
        }
      >
    >


  export type VehicleLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    satellites?: boolean
    timestamp?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleLocation"]>

  export type VehicleLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    satellites?: boolean
    timestamp?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleLocation"]>

  export type VehicleLocationSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    satellites?: boolean
    timestamp?: boolean
  }

  export type VehicleLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleLocation"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      latitude: number
      longitude: number
      speed: number
      heading: number | null
      altitude: number | null
      accuracy: number | null
      satellites: number | null
      timestamp: Date
    }, ExtArgs["result"]["vehicleLocation"]>
    composites: {}
  }

  type VehicleLocationGetPayload<S extends boolean | null | undefined | VehicleLocationDefaultArgs> = $Result.GetResult<Prisma.$VehicleLocationPayload, S>

  type VehicleLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VehicleLocationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VehicleLocationCountAggregateInputType | true
    }

  export interface VehicleLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleLocation'], meta: { name: 'VehicleLocation' } }
    /**
     * Find zero or one VehicleLocation that matches the filter.
     * @param {VehicleLocationFindUniqueArgs} args - Arguments to find a VehicleLocation
     * @example
     * // Get one VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleLocationFindUniqueArgs>(args: SelectSubset<T, VehicleLocationFindUniqueArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VehicleLocation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VehicleLocationFindUniqueOrThrowArgs} args - Arguments to find a VehicleLocation
     * @example
     * // Get one VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VehicleLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationFindFirstArgs} args - Arguments to find a VehicleLocation
     * @example
     * // Get one VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleLocationFindFirstArgs>(args?: SelectSubset<T, VehicleLocationFindFirstArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VehicleLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationFindFirstOrThrowArgs} args - Arguments to find a VehicleLocation
     * @example
     * // Get one VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VehicleLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleLocations
     * const vehicleLocations = await prisma.vehicleLocation.findMany()
     * 
     * // Get first 10 VehicleLocations
     * const vehicleLocations = await prisma.vehicleLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleLocationWithIdOnly = await prisma.vehicleLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleLocationFindManyArgs>(args?: SelectSubset<T, VehicleLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VehicleLocation.
     * @param {VehicleLocationCreateArgs} args - Arguments to create a VehicleLocation.
     * @example
     * // Create one VehicleLocation
     * const VehicleLocation = await prisma.vehicleLocation.create({
     *   data: {
     *     // ... data to create a VehicleLocation
     *   }
     * })
     * 
     */
    create<T extends VehicleLocationCreateArgs>(args: SelectSubset<T, VehicleLocationCreateArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VehicleLocations.
     * @param {VehicleLocationCreateManyArgs} args - Arguments to create many VehicleLocations.
     * @example
     * // Create many VehicleLocations
     * const vehicleLocation = await prisma.vehicleLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleLocationCreateManyArgs>(args?: SelectSubset<T, VehicleLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleLocations and returns the data saved in the database.
     * @param {VehicleLocationCreateManyAndReturnArgs} args - Arguments to create many VehicleLocations.
     * @example
     * // Create many VehicleLocations
     * const vehicleLocation = await prisma.vehicleLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleLocations and only return the `id`
     * const vehicleLocationWithIdOnly = await prisma.vehicleLocation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VehicleLocation.
     * @param {VehicleLocationDeleteArgs} args - Arguments to delete one VehicleLocation.
     * @example
     * // Delete one VehicleLocation
     * const VehicleLocation = await prisma.vehicleLocation.delete({
     *   where: {
     *     // ... filter to delete one VehicleLocation
     *   }
     * })
     * 
     */
    delete<T extends VehicleLocationDeleteArgs>(args: SelectSubset<T, VehicleLocationDeleteArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VehicleLocation.
     * @param {VehicleLocationUpdateArgs} args - Arguments to update one VehicleLocation.
     * @example
     * // Update one VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleLocationUpdateArgs>(args: SelectSubset<T, VehicleLocationUpdateArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VehicleLocations.
     * @param {VehicleLocationDeleteManyArgs} args - Arguments to filter VehicleLocations to delete.
     * @example
     * // Delete a few VehicleLocations
     * const { count } = await prisma.vehicleLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleLocationDeleteManyArgs>(args?: SelectSubset<T, VehicleLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleLocations
     * const vehicleLocation = await prisma.vehicleLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleLocationUpdateManyArgs>(args: SelectSubset<T, VehicleLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehicleLocation.
     * @param {VehicleLocationUpsertArgs} args - Arguments to update or create a VehicleLocation.
     * @example
     * // Update or create a VehicleLocation
     * const vehicleLocation = await prisma.vehicleLocation.upsert({
     *   create: {
     *     // ... data to create a VehicleLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleLocation we want to update
     *   }
     * })
     */
    upsert<T extends VehicleLocationUpsertArgs>(args: SelectSubset<T, VehicleLocationUpsertArgs<ExtArgs>>): Prisma__VehicleLocationClient<$Result.GetResult<Prisma.$VehicleLocationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VehicleLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationCountArgs} args - Arguments to filter VehicleLocations to count.
     * @example
     * // Count the number of VehicleLocations
     * const count = await prisma.vehicleLocation.count({
     *   where: {
     *     // ... the filter for the VehicleLocations we want to count
     *   }
     * })
    **/
    count<T extends VehicleLocationCountArgs>(
      args?: Subset<T, VehicleLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleLocationAggregateArgs>(args: Subset<T, VehicleLocationAggregateArgs>): Prisma.PrismaPromise<GetVehicleLocationAggregateType<T>>

    /**
     * Group by VehicleLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleLocationGroupByArgs} args - Group by arguments.
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
      T extends VehicleLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleLocationGroupByArgs['orderBy'] }
        : { orderBy?: VehicleLocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleLocation model
   */
  readonly fields: VehicleLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the VehicleLocation model
   */ 
  interface VehicleLocationFieldRefs {
    readonly id: FieldRef<"VehicleLocation", 'String'>
    readonly vehicleId: FieldRef<"VehicleLocation", 'String'>
    readonly latitude: FieldRef<"VehicleLocation", 'Float'>
    readonly longitude: FieldRef<"VehicleLocation", 'Float'>
    readonly speed: FieldRef<"VehicleLocation", 'Float'>
    readonly heading: FieldRef<"VehicleLocation", 'Float'>
    readonly altitude: FieldRef<"VehicleLocation", 'Float'>
    readonly accuracy: FieldRef<"VehicleLocation", 'Float'>
    readonly satellites: FieldRef<"VehicleLocation", 'Int'>
    readonly timestamp: FieldRef<"VehicleLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehicleLocation findUnique
   */
  export type VehicleLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleLocation to fetch.
     */
    where: VehicleLocationWhereUniqueInput
  }

  /**
   * VehicleLocation findUniqueOrThrow
   */
  export type VehicleLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleLocation to fetch.
     */
    where: VehicleLocationWhereUniqueInput
  }

  /**
   * VehicleLocation findFirst
   */
  export type VehicleLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleLocation to fetch.
     */
    where?: VehicleLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleLocations to fetch.
     */
    orderBy?: VehicleLocationOrderByWithRelationInput | VehicleLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleLocations.
     */
    cursor?: VehicleLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleLocations.
     */
    distinct?: VehicleLocationScalarFieldEnum | VehicleLocationScalarFieldEnum[]
  }

  /**
   * VehicleLocation findFirstOrThrow
   */
  export type VehicleLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleLocation to fetch.
     */
    where?: VehicleLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleLocations to fetch.
     */
    orderBy?: VehicleLocationOrderByWithRelationInput | VehicleLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleLocations.
     */
    cursor?: VehicleLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleLocations.
     */
    distinct?: VehicleLocationScalarFieldEnum | VehicleLocationScalarFieldEnum[]
  }

  /**
   * VehicleLocation findMany
   */
  export type VehicleLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleLocations to fetch.
     */
    where?: VehicleLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleLocations to fetch.
     */
    orderBy?: VehicleLocationOrderByWithRelationInput | VehicleLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleLocations.
     */
    cursor?: VehicleLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleLocations.
     */
    skip?: number
    distinct?: VehicleLocationScalarFieldEnum | VehicleLocationScalarFieldEnum[]
  }

  /**
   * VehicleLocation create
   */
  export type VehicleLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleLocation.
     */
    data: XOR<VehicleLocationCreateInput, VehicleLocationUncheckedCreateInput>
  }

  /**
   * VehicleLocation createMany
   */
  export type VehicleLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleLocations.
     */
    data: VehicleLocationCreateManyInput | VehicleLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleLocation createManyAndReturn
   */
  export type VehicleLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VehicleLocations.
     */
    data: VehicleLocationCreateManyInput | VehicleLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleLocation update
   */
  export type VehicleLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleLocation.
     */
    data: XOR<VehicleLocationUpdateInput, VehicleLocationUncheckedUpdateInput>
    /**
     * Choose, which VehicleLocation to update.
     */
    where: VehicleLocationWhereUniqueInput
  }

  /**
   * VehicleLocation updateMany
   */
  export type VehicleLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleLocations.
     */
    data: XOR<VehicleLocationUpdateManyMutationInput, VehicleLocationUncheckedUpdateManyInput>
    /**
     * Filter which VehicleLocations to update
     */
    where?: VehicleLocationWhereInput
  }

  /**
   * VehicleLocation upsert
   */
  export type VehicleLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleLocation to update in case it exists.
     */
    where: VehicleLocationWhereUniqueInput
    /**
     * In case the VehicleLocation found by the `where` argument doesn't exist, create a new VehicleLocation with this data.
     */
    create: XOR<VehicleLocationCreateInput, VehicleLocationUncheckedCreateInput>
    /**
     * In case the VehicleLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleLocationUpdateInput, VehicleLocationUncheckedUpdateInput>
  }

  /**
   * VehicleLocation delete
   */
  export type VehicleLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
    /**
     * Filter which VehicleLocation to delete.
     */
    where: VehicleLocationWhereUniqueInput
  }

  /**
   * VehicleLocation deleteMany
   */
  export type VehicleLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleLocations to delete
     */
    where?: VehicleLocationWhereInput
  }

  /**
   * VehicleLocation without action
   */
  export type VehicleLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleLocation
     */
    select?: VehicleLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleLocationInclude<ExtArgs> | null
  }


  /**
   * Model SpeedZone
   */

  export type AggregateSpeedZone = {
    _count: SpeedZoneCountAggregateOutputType | null
    _avg: SpeedZoneAvgAggregateOutputType | null
    _sum: SpeedZoneSumAggregateOutputType | null
    _min: SpeedZoneMinAggregateOutputType | null
    _max: SpeedZoneMaxAggregateOutputType | null
  }

  export type SpeedZoneAvgAggregateOutputType = {
    speedLimit: number | null
  }

  export type SpeedZoneSumAggregateOutputType = {
    speedLimit: number | null
  }

  export type SpeedZoneMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    speedLimit: number | null
    zoneType: $Enums.ZoneType | null
    color: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpeedZoneMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    speedLimit: number | null
    zoneType: $Enums.ZoneType | null
    color: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpeedZoneCountAggregateOutputType = {
    id: number
    name: number
    description: number
    speedLimit: number
    coordinates: number
    zoneType: number
    color: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpeedZoneAvgAggregateInputType = {
    speedLimit?: true
  }

  export type SpeedZoneSumAggregateInputType = {
    speedLimit?: true
  }

  export type SpeedZoneMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    speedLimit?: true
    zoneType?: true
    color?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpeedZoneMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    speedLimit?: true
    zoneType?: true
    color?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpeedZoneCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    speedLimit?: true
    coordinates?: true
    zoneType?: true
    color?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpeedZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpeedZone to aggregate.
     */
    where?: SpeedZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpeedZones to fetch.
     */
    orderBy?: SpeedZoneOrderByWithRelationInput | SpeedZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpeedZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpeedZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpeedZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpeedZones
    **/
    _count?: true | SpeedZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpeedZoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpeedZoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpeedZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpeedZoneMaxAggregateInputType
  }

  export type GetSpeedZoneAggregateType<T extends SpeedZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateSpeedZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpeedZone[P]>
      : GetScalarType<T[P], AggregateSpeedZone[P]>
  }




  export type SpeedZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpeedZoneWhereInput
    orderBy?: SpeedZoneOrderByWithAggregationInput | SpeedZoneOrderByWithAggregationInput[]
    by: SpeedZoneScalarFieldEnum[] | SpeedZoneScalarFieldEnum
    having?: SpeedZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpeedZoneCountAggregateInputType | true
    _avg?: SpeedZoneAvgAggregateInputType
    _sum?: SpeedZoneSumAggregateInputType
    _min?: SpeedZoneMinAggregateInputType
    _max?: SpeedZoneMaxAggregateInputType
  }

  export type SpeedZoneGroupByOutputType = {
    id: string
    name: string
    description: string | null
    speedLimit: number
    coordinates: JsonValue
    zoneType: $Enums.ZoneType
    color: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: SpeedZoneCountAggregateOutputType | null
    _avg: SpeedZoneAvgAggregateOutputType | null
    _sum: SpeedZoneSumAggregateOutputType | null
    _min: SpeedZoneMinAggregateOutputType | null
    _max: SpeedZoneMaxAggregateOutputType | null
  }

  type GetSpeedZoneGroupByPayload<T extends SpeedZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpeedZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpeedZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpeedZoneGroupByOutputType[P]>
            : GetScalarType<T[P], SpeedZoneGroupByOutputType[P]>
        }
      >
    >


  export type SpeedZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    speedLimit?: boolean
    coordinates?: boolean
    zoneType?: boolean
    color?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    violations?: boolean | SpeedZone$violationsArgs<ExtArgs>
    _count?: boolean | SpeedZoneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speedZone"]>

  export type SpeedZoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    speedLimit?: boolean
    coordinates?: boolean
    zoneType?: boolean
    color?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["speedZone"]>

  export type SpeedZoneSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    speedLimit?: boolean
    coordinates?: boolean
    zoneType?: boolean
    color?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpeedZoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    violations?: boolean | SpeedZone$violationsArgs<ExtArgs>
    _count?: boolean | SpeedZoneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpeedZoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SpeedZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpeedZone"
    objects: {
      violations: Prisma.$ViolationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      speedLimit: number
      coordinates: Prisma.JsonValue
      zoneType: $Enums.ZoneType
      color: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["speedZone"]>
    composites: {}
  }

  type SpeedZoneGetPayload<S extends boolean | null | undefined | SpeedZoneDefaultArgs> = $Result.GetResult<Prisma.$SpeedZonePayload, S>

  type SpeedZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpeedZoneFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpeedZoneCountAggregateInputType | true
    }

  export interface SpeedZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpeedZone'], meta: { name: 'SpeedZone' } }
    /**
     * Find zero or one SpeedZone that matches the filter.
     * @param {SpeedZoneFindUniqueArgs} args - Arguments to find a SpeedZone
     * @example
     * // Get one SpeedZone
     * const speedZone = await prisma.speedZone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpeedZoneFindUniqueArgs>(args: SelectSubset<T, SpeedZoneFindUniqueArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SpeedZone that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpeedZoneFindUniqueOrThrowArgs} args - Arguments to find a SpeedZone
     * @example
     * // Get one SpeedZone
     * const speedZone = await prisma.speedZone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpeedZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, SpeedZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SpeedZone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneFindFirstArgs} args - Arguments to find a SpeedZone
     * @example
     * // Get one SpeedZone
     * const speedZone = await prisma.speedZone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpeedZoneFindFirstArgs>(args?: SelectSubset<T, SpeedZoneFindFirstArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SpeedZone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneFindFirstOrThrowArgs} args - Arguments to find a SpeedZone
     * @example
     * // Get one SpeedZone
     * const speedZone = await prisma.speedZone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpeedZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, SpeedZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SpeedZones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpeedZones
     * const speedZones = await prisma.speedZone.findMany()
     * 
     * // Get first 10 SpeedZones
     * const speedZones = await prisma.speedZone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const speedZoneWithIdOnly = await prisma.speedZone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpeedZoneFindManyArgs>(args?: SelectSubset<T, SpeedZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SpeedZone.
     * @param {SpeedZoneCreateArgs} args - Arguments to create a SpeedZone.
     * @example
     * // Create one SpeedZone
     * const SpeedZone = await prisma.speedZone.create({
     *   data: {
     *     // ... data to create a SpeedZone
     *   }
     * })
     * 
     */
    create<T extends SpeedZoneCreateArgs>(args: SelectSubset<T, SpeedZoneCreateArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SpeedZones.
     * @param {SpeedZoneCreateManyArgs} args - Arguments to create many SpeedZones.
     * @example
     * // Create many SpeedZones
     * const speedZone = await prisma.speedZone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpeedZoneCreateManyArgs>(args?: SelectSubset<T, SpeedZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpeedZones and returns the data saved in the database.
     * @param {SpeedZoneCreateManyAndReturnArgs} args - Arguments to create many SpeedZones.
     * @example
     * // Create many SpeedZones
     * const speedZone = await prisma.speedZone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpeedZones and only return the `id`
     * const speedZoneWithIdOnly = await prisma.speedZone.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpeedZoneCreateManyAndReturnArgs>(args?: SelectSubset<T, SpeedZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SpeedZone.
     * @param {SpeedZoneDeleteArgs} args - Arguments to delete one SpeedZone.
     * @example
     * // Delete one SpeedZone
     * const SpeedZone = await prisma.speedZone.delete({
     *   where: {
     *     // ... filter to delete one SpeedZone
     *   }
     * })
     * 
     */
    delete<T extends SpeedZoneDeleteArgs>(args: SelectSubset<T, SpeedZoneDeleteArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SpeedZone.
     * @param {SpeedZoneUpdateArgs} args - Arguments to update one SpeedZone.
     * @example
     * // Update one SpeedZone
     * const speedZone = await prisma.speedZone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpeedZoneUpdateArgs>(args: SelectSubset<T, SpeedZoneUpdateArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SpeedZones.
     * @param {SpeedZoneDeleteManyArgs} args - Arguments to filter SpeedZones to delete.
     * @example
     * // Delete a few SpeedZones
     * const { count } = await prisma.speedZone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpeedZoneDeleteManyArgs>(args?: SelectSubset<T, SpeedZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpeedZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpeedZones
     * const speedZone = await prisma.speedZone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpeedZoneUpdateManyArgs>(args: SelectSubset<T, SpeedZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SpeedZone.
     * @param {SpeedZoneUpsertArgs} args - Arguments to update or create a SpeedZone.
     * @example
     * // Update or create a SpeedZone
     * const speedZone = await prisma.speedZone.upsert({
     *   create: {
     *     // ... data to create a SpeedZone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpeedZone we want to update
     *   }
     * })
     */
    upsert<T extends SpeedZoneUpsertArgs>(args: SelectSubset<T, SpeedZoneUpsertArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SpeedZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneCountArgs} args - Arguments to filter SpeedZones to count.
     * @example
     * // Count the number of SpeedZones
     * const count = await prisma.speedZone.count({
     *   where: {
     *     // ... the filter for the SpeedZones we want to count
     *   }
     * })
    **/
    count<T extends SpeedZoneCountArgs>(
      args?: Subset<T, SpeedZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpeedZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpeedZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SpeedZoneAggregateArgs>(args: Subset<T, SpeedZoneAggregateArgs>): Prisma.PrismaPromise<GetSpeedZoneAggregateType<T>>

    /**
     * Group by SpeedZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeedZoneGroupByArgs} args - Group by arguments.
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
      T extends SpeedZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpeedZoneGroupByArgs['orderBy'] }
        : { orderBy?: SpeedZoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SpeedZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpeedZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpeedZone model
   */
  readonly fields: SpeedZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpeedZone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpeedZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    violations<T extends SpeedZone$violationsArgs<ExtArgs> = {}>(args?: Subset<T, SpeedZone$violationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the SpeedZone model
   */ 
  interface SpeedZoneFieldRefs {
    readonly id: FieldRef<"SpeedZone", 'String'>
    readonly name: FieldRef<"SpeedZone", 'String'>
    readonly description: FieldRef<"SpeedZone", 'String'>
    readonly speedLimit: FieldRef<"SpeedZone", 'Float'>
    readonly coordinates: FieldRef<"SpeedZone", 'Json'>
    readonly zoneType: FieldRef<"SpeedZone", 'ZoneType'>
    readonly color: FieldRef<"SpeedZone", 'String'>
    readonly active: FieldRef<"SpeedZone", 'Boolean'>
    readonly createdAt: FieldRef<"SpeedZone", 'DateTime'>
    readonly updatedAt: FieldRef<"SpeedZone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SpeedZone findUnique
   */
  export type SpeedZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter, which SpeedZone to fetch.
     */
    where: SpeedZoneWhereUniqueInput
  }

  /**
   * SpeedZone findUniqueOrThrow
   */
  export type SpeedZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter, which SpeedZone to fetch.
     */
    where: SpeedZoneWhereUniqueInput
  }

  /**
   * SpeedZone findFirst
   */
  export type SpeedZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter, which SpeedZone to fetch.
     */
    where?: SpeedZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpeedZones to fetch.
     */
    orderBy?: SpeedZoneOrderByWithRelationInput | SpeedZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpeedZones.
     */
    cursor?: SpeedZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpeedZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpeedZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpeedZones.
     */
    distinct?: SpeedZoneScalarFieldEnum | SpeedZoneScalarFieldEnum[]
  }

  /**
   * SpeedZone findFirstOrThrow
   */
  export type SpeedZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter, which SpeedZone to fetch.
     */
    where?: SpeedZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpeedZones to fetch.
     */
    orderBy?: SpeedZoneOrderByWithRelationInput | SpeedZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpeedZones.
     */
    cursor?: SpeedZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpeedZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpeedZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpeedZones.
     */
    distinct?: SpeedZoneScalarFieldEnum | SpeedZoneScalarFieldEnum[]
  }

  /**
   * SpeedZone findMany
   */
  export type SpeedZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter, which SpeedZones to fetch.
     */
    where?: SpeedZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpeedZones to fetch.
     */
    orderBy?: SpeedZoneOrderByWithRelationInput | SpeedZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpeedZones.
     */
    cursor?: SpeedZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpeedZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpeedZones.
     */
    skip?: number
    distinct?: SpeedZoneScalarFieldEnum | SpeedZoneScalarFieldEnum[]
  }

  /**
   * SpeedZone create
   */
  export type SpeedZoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * The data needed to create a SpeedZone.
     */
    data: XOR<SpeedZoneCreateInput, SpeedZoneUncheckedCreateInput>
  }

  /**
   * SpeedZone createMany
   */
  export type SpeedZoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpeedZones.
     */
    data: SpeedZoneCreateManyInput | SpeedZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpeedZone createManyAndReturn
   */
  export type SpeedZoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SpeedZones.
     */
    data: SpeedZoneCreateManyInput | SpeedZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpeedZone update
   */
  export type SpeedZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * The data needed to update a SpeedZone.
     */
    data: XOR<SpeedZoneUpdateInput, SpeedZoneUncheckedUpdateInput>
    /**
     * Choose, which SpeedZone to update.
     */
    where: SpeedZoneWhereUniqueInput
  }

  /**
   * SpeedZone updateMany
   */
  export type SpeedZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpeedZones.
     */
    data: XOR<SpeedZoneUpdateManyMutationInput, SpeedZoneUncheckedUpdateManyInput>
    /**
     * Filter which SpeedZones to update
     */
    where?: SpeedZoneWhereInput
  }

  /**
   * SpeedZone upsert
   */
  export type SpeedZoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * The filter to search for the SpeedZone to update in case it exists.
     */
    where: SpeedZoneWhereUniqueInput
    /**
     * In case the SpeedZone found by the `where` argument doesn't exist, create a new SpeedZone with this data.
     */
    create: XOR<SpeedZoneCreateInput, SpeedZoneUncheckedCreateInput>
    /**
     * In case the SpeedZone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpeedZoneUpdateInput, SpeedZoneUncheckedUpdateInput>
  }

  /**
   * SpeedZone delete
   */
  export type SpeedZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    /**
     * Filter which SpeedZone to delete.
     */
    where: SpeedZoneWhereUniqueInput
  }

  /**
   * SpeedZone deleteMany
   */
  export type SpeedZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpeedZones to delete
     */
    where?: SpeedZoneWhereInput
  }

  /**
   * SpeedZone.violations
   */
  export type SpeedZone$violationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    where?: ViolationWhereInput
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    cursor?: ViolationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ViolationScalarFieldEnum | ViolationScalarFieldEnum[]
  }

  /**
   * SpeedZone without action
   */
  export type SpeedZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
  }


  /**
   * Model Violation
   */

  export type AggregateViolation = {
    _count: ViolationCountAggregateOutputType | null
    _avg: ViolationAvgAggregateOutputType | null
    _sum: ViolationSumAggregateOutputType | null
    _min: ViolationMinAggregateOutputType | null
    _max: ViolationMaxAggregateOutputType | null
  }

  export type ViolationAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    speedLimit: number | null
    excessSpeed: number | null
    fineAmount: number | null
  }

  export type ViolationSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    speedLimit: number | null
    excessSpeed: number | null
    fineAmount: number | null
  }

  export type ViolationMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    zoneId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    speedLimit: number | null
    excessSpeed: number | null
    fineAmount: number | null
    status: $Enums.ViolationStatus | null
    notes: string | null
    timestamp: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViolationMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    zoneId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    speedLimit: number | null
    excessSpeed: number | null
    fineAmount: number | null
    status: $Enums.ViolationStatus | null
    notes: string | null
    timestamp: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViolationCountAggregateOutputType = {
    id: number
    vehicleId: number
    zoneId: number
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount: number
    status: number
    notes: number
    timestamp: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ViolationAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    speedLimit?: true
    excessSpeed?: true
    fineAmount?: true
  }

  export type ViolationSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    speedLimit?: true
    excessSpeed?: true
    fineAmount?: true
  }

  export type ViolationMinAggregateInputType = {
    id?: true
    vehicleId?: true
    zoneId?: true
    latitude?: true
    longitude?: true
    speed?: true
    speedLimit?: true
    excessSpeed?: true
    fineAmount?: true
    status?: true
    notes?: true
    timestamp?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViolationMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    zoneId?: true
    latitude?: true
    longitude?: true
    speed?: true
    speedLimit?: true
    excessSpeed?: true
    fineAmount?: true
    status?: true
    notes?: true
    timestamp?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViolationCountAggregateInputType = {
    id?: true
    vehicleId?: true
    zoneId?: true
    latitude?: true
    longitude?: true
    speed?: true
    speedLimit?: true
    excessSpeed?: true
    fineAmount?: true
    status?: true
    notes?: true
    timestamp?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ViolationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Violation to aggregate.
     */
    where?: ViolationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Violations to fetch.
     */
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ViolationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Violations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Violations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Violations
    **/
    _count?: true | ViolationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ViolationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ViolationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ViolationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ViolationMaxAggregateInputType
  }

  export type GetViolationAggregateType<T extends ViolationAggregateArgs> = {
        [P in keyof T & keyof AggregateViolation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateViolation[P]>
      : GetScalarType<T[P], AggregateViolation[P]>
  }




  export type ViolationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViolationWhereInput
    orderBy?: ViolationOrderByWithAggregationInput | ViolationOrderByWithAggregationInput[]
    by: ViolationScalarFieldEnum[] | ViolationScalarFieldEnum
    having?: ViolationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ViolationCountAggregateInputType | true
    _avg?: ViolationAvgAggregateInputType
    _sum?: ViolationSumAggregateInputType
    _min?: ViolationMinAggregateInputType
    _max?: ViolationMaxAggregateInputType
  }

  export type ViolationGroupByOutputType = {
    id: string
    vehicleId: string
    zoneId: string | null
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount: number
    status: $Enums.ViolationStatus
    notes: string | null
    timestamp: Date
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ViolationCountAggregateOutputType | null
    _avg: ViolationAvgAggregateOutputType | null
    _sum: ViolationSumAggregateOutputType | null
    _min: ViolationMinAggregateOutputType | null
    _max: ViolationMaxAggregateOutputType | null
  }

  type GetViolationGroupByPayload<T extends ViolationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ViolationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ViolationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ViolationGroupByOutputType[P]>
            : GetScalarType<T[P], ViolationGroupByOutputType[P]>
        }
      >
    >


  export type ViolationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    zoneId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    speedLimit?: boolean
    excessSpeed?: boolean
    fineAmount?: boolean
    status?: boolean
    notes?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    zone?: boolean | Violation$zoneArgs<ExtArgs>
  }, ExtArgs["result"]["violation"]>

  export type ViolationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    zoneId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    speedLimit?: boolean
    excessSpeed?: boolean
    fineAmount?: boolean
    status?: boolean
    notes?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    zone?: boolean | Violation$zoneArgs<ExtArgs>
  }, ExtArgs["result"]["violation"]>

  export type ViolationSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    zoneId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    speedLimit?: boolean
    excessSpeed?: boolean
    fineAmount?: boolean
    status?: boolean
    notes?: boolean
    timestamp?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ViolationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    zone?: boolean | Violation$zoneArgs<ExtArgs>
  }
  export type ViolationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    zone?: boolean | Violation$zoneArgs<ExtArgs>
  }

  export type $ViolationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Violation"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      zone: Prisma.$SpeedZonePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      zoneId: string | null
      latitude: number
      longitude: number
      speed: number
      speedLimit: number
      excessSpeed: number
      fineAmount: number
      status: $Enums.ViolationStatus
      notes: string | null
      timestamp: Date
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["violation"]>
    composites: {}
  }

  type ViolationGetPayload<S extends boolean | null | undefined | ViolationDefaultArgs> = $Result.GetResult<Prisma.$ViolationPayload, S>

  type ViolationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ViolationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ViolationCountAggregateInputType | true
    }

  export interface ViolationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Violation'], meta: { name: 'Violation' } }
    /**
     * Find zero or one Violation that matches the filter.
     * @param {ViolationFindUniqueArgs} args - Arguments to find a Violation
     * @example
     * // Get one Violation
     * const violation = await prisma.violation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ViolationFindUniqueArgs>(args: SelectSubset<T, ViolationFindUniqueArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Violation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ViolationFindUniqueOrThrowArgs} args - Arguments to find a Violation
     * @example
     * // Get one Violation
     * const violation = await prisma.violation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ViolationFindUniqueOrThrowArgs>(args: SelectSubset<T, ViolationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Violation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationFindFirstArgs} args - Arguments to find a Violation
     * @example
     * // Get one Violation
     * const violation = await prisma.violation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ViolationFindFirstArgs>(args?: SelectSubset<T, ViolationFindFirstArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Violation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationFindFirstOrThrowArgs} args - Arguments to find a Violation
     * @example
     * // Get one Violation
     * const violation = await prisma.violation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ViolationFindFirstOrThrowArgs>(args?: SelectSubset<T, ViolationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Violations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Violations
     * const violations = await prisma.violation.findMany()
     * 
     * // Get first 10 Violations
     * const violations = await prisma.violation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const violationWithIdOnly = await prisma.violation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ViolationFindManyArgs>(args?: SelectSubset<T, ViolationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Violation.
     * @param {ViolationCreateArgs} args - Arguments to create a Violation.
     * @example
     * // Create one Violation
     * const Violation = await prisma.violation.create({
     *   data: {
     *     // ... data to create a Violation
     *   }
     * })
     * 
     */
    create<T extends ViolationCreateArgs>(args: SelectSubset<T, ViolationCreateArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Violations.
     * @param {ViolationCreateManyArgs} args - Arguments to create many Violations.
     * @example
     * // Create many Violations
     * const violation = await prisma.violation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ViolationCreateManyArgs>(args?: SelectSubset<T, ViolationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Violations and returns the data saved in the database.
     * @param {ViolationCreateManyAndReturnArgs} args - Arguments to create many Violations.
     * @example
     * // Create many Violations
     * const violation = await prisma.violation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Violations and only return the `id`
     * const violationWithIdOnly = await prisma.violation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ViolationCreateManyAndReturnArgs>(args?: SelectSubset<T, ViolationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Violation.
     * @param {ViolationDeleteArgs} args - Arguments to delete one Violation.
     * @example
     * // Delete one Violation
     * const Violation = await prisma.violation.delete({
     *   where: {
     *     // ... filter to delete one Violation
     *   }
     * })
     * 
     */
    delete<T extends ViolationDeleteArgs>(args: SelectSubset<T, ViolationDeleteArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Violation.
     * @param {ViolationUpdateArgs} args - Arguments to update one Violation.
     * @example
     * // Update one Violation
     * const violation = await prisma.violation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ViolationUpdateArgs>(args: SelectSubset<T, ViolationUpdateArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Violations.
     * @param {ViolationDeleteManyArgs} args - Arguments to filter Violations to delete.
     * @example
     * // Delete a few Violations
     * const { count } = await prisma.violation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ViolationDeleteManyArgs>(args?: SelectSubset<T, ViolationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Violations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Violations
     * const violation = await prisma.violation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ViolationUpdateManyArgs>(args: SelectSubset<T, ViolationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Violation.
     * @param {ViolationUpsertArgs} args - Arguments to update or create a Violation.
     * @example
     * // Update or create a Violation
     * const violation = await prisma.violation.upsert({
     *   create: {
     *     // ... data to create a Violation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Violation we want to update
     *   }
     * })
     */
    upsert<T extends ViolationUpsertArgs>(args: SelectSubset<T, ViolationUpsertArgs<ExtArgs>>): Prisma__ViolationClient<$Result.GetResult<Prisma.$ViolationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Violations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationCountArgs} args - Arguments to filter Violations to count.
     * @example
     * // Count the number of Violations
     * const count = await prisma.violation.count({
     *   where: {
     *     // ... the filter for the Violations we want to count
     *   }
     * })
    **/
    count<T extends ViolationCountArgs>(
      args?: Subset<T, ViolationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ViolationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Violation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ViolationAggregateArgs>(args: Subset<T, ViolationAggregateArgs>): Prisma.PrismaPromise<GetViolationAggregateType<T>>

    /**
     * Group by Violation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViolationGroupByArgs} args - Group by arguments.
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
      T extends ViolationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ViolationGroupByArgs['orderBy'] }
        : { orderBy?: ViolationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ViolationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetViolationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Violation model
   */
  readonly fields: ViolationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Violation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ViolationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    zone<T extends Violation$zoneArgs<ExtArgs> = {}>(args?: Subset<T, Violation$zoneArgs<ExtArgs>>): Prisma__SpeedZoneClient<$Result.GetResult<Prisma.$SpeedZonePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Violation model
   */ 
  interface ViolationFieldRefs {
    readonly id: FieldRef<"Violation", 'String'>
    readonly vehicleId: FieldRef<"Violation", 'String'>
    readonly zoneId: FieldRef<"Violation", 'String'>
    readonly latitude: FieldRef<"Violation", 'Float'>
    readonly longitude: FieldRef<"Violation", 'Float'>
    readonly speed: FieldRef<"Violation", 'Float'>
    readonly speedLimit: FieldRef<"Violation", 'Float'>
    readonly excessSpeed: FieldRef<"Violation", 'Float'>
    readonly fineAmount: FieldRef<"Violation", 'Float'>
    readonly status: FieldRef<"Violation", 'ViolationStatus'>
    readonly notes: FieldRef<"Violation", 'String'>
    readonly timestamp: FieldRef<"Violation", 'DateTime'>
    readonly resolvedAt: FieldRef<"Violation", 'DateTime'>
    readonly createdAt: FieldRef<"Violation", 'DateTime'>
    readonly updatedAt: FieldRef<"Violation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Violation findUnique
   */
  export type ViolationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter, which Violation to fetch.
     */
    where: ViolationWhereUniqueInput
  }

  /**
   * Violation findUniqueOrThrow
   */
  export type ViolationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter, which Violation to fetch.
     */
    where: ViolationWhereUniqueInput
  }

  /**
   * Violation findFirst
   */
  export type ViolationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter, which Violation to fetch.
     */
    where?: ViolationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Violations to fetch.
     */
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Violations.
     */
    cursor?: ViolationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Violations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Violations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Violations.
     */
    distinct?: ViolationScalarFieldEnum | ViolationScalarFieldEnum[]
  }

  /**
   * Violation findFirstOrThrow
   */
  export type ViolationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter, which Violation to fetch.
     */
    where?: ViolationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Violations to fetch.
     */
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Violations.
     */
    cursor?: ViolationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Violations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Violations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Violations.
     */
    distinct?: ViolationScalarFieldEnum | ViolationScalarFieldEnum[]
  }

  /**
   * Violation findMany
   */
  export type ViolationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter, which Violations to fetch.
     */
    where?: ViolationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Violations to fetch.
     */
    orderBy?: ViolationOrderByWithRelationInput | ViolationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Violations.
     */
    cursor?: ViolationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Violations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Violations.
     */
    skip?: number
    distinct?: ViolationScalarFieldEnum | ViolationScalarFieldEnum[]
  }

  /**
   * Violation create
   */
  export type ViolationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * The data needed to create a Violation.
     */
    data: XOR<ViolationCreateInput, ViolationUncheckedCreateInput>
  }

  /**
   * Violation createMany
   */
  export type ViolationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Violations.
     */
    data: ViolationCreateManyInput | ViolationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Violation createManyAndReturn
   */
  export type ViolationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Violations.
     */
    data: ViolationCreateManyInput | ViolationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Violation update
   */
  export type ViolationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * The data needed to update a Violation.
     */
    data: XOR<ViolationUpdateInput, ViolationUncheckedUpdateInput>
    /**
     * Choose, which Violation to update.
     */
    where: ViolationWhereUniqueInput
  }

  /**
   * Violation updateMany
   */
  export type ViolationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Violations.
     */
    data: XOR<ViolationUpdateManyMutationInput, ViolationUncheckedUpdateManyInput>
    /**
     * Filter which Violations to update
     */
    where?: ViolationWhereInput
  }

  /**
   * Violation upsert
   */
  export type ViolationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * The filter to search for the Violation to update in case it exists.
     */
    where: ViolationWhereUniqueInput
    /**
     * In case the Violation found by the `where` argument doesn't exist, create a new Violation with this data.
     */
    create: XOR<ViolationCreateInput, ViolationUncheckedCreateInput>
    /**
     * In case the Violation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ViolationUpdateInput, ViolationUncheckedUpdateInput>
  }

  /**
   * Violation delete
   */
  export type ViolationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
    /**
     * Filter which Violation to delete.
     */
    where: ViolationWhereUniqueInput
  }

  /**
   * Violation deleteMany
   */
  export type ViolationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Violations to delete
     */
    where?: ViolationWhereInput
  }

  /**
   * Violation.zone
   */
  export type Violation$zoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeedZone
     */
    select?: SpeedZoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeedZoneInclude<ExtArgs> | null
    where?: SpeedZoneWhereInput
  }

  /**
   * Violation without action
   */
  export type ViolationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Violation
     */
    select?: ViolationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViolationInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 'phoneNumber',
    isActive: 'isActive',
    profilePicture: 'profilePicture',
    email: 'email',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    password: 'password',
    timezoneId: 'timezoneId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    plateNumber: 'plateNumber',
    type: 'type',
    status: 'status',
    driverName: 'driverName',
    driverPhone: 'driverPhone',
    deviceId: 'deviceId',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const VehicleLocationScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    latitude: 'latitude',
    longitude: 'longitude',
    speed: 'speed',
    heading: 'heading',
    altitude: 'altitude',
    accuracy: 'accuracy',
    satellites: 'satellites',
    timestamp: 'timestamp'
  };

  export type VehicleLocationScalarFieldEnum = (typeof VehicleLocationScalarFieldEnum)[keyof typeof VehicleLocationScalarFieldEnum]


  export const SpeedZoneScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    speedLimit: 'speedLimit',
    coordinates: 'coordinates',
    zoneType: 'zoneType',
    color: 'color',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpeedZoneScalarFieldEnum = (typeof SpeedZoneScalarFieldEnum)[keyof typeof SpeedZoneScalarFieldEnum]


  export const ViolationScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    zoneId: 'zoneId',
    latitude: 'latitude',
    longitude: 'longitude',
    speed: 'speed',
    speedLimit: 'speedLimit',
    excessSpeed: 'excessSpeed',
    fineAmount: 'fineAmount',
    status: 'status',
    notes: 'notes',
    timestamp: 'timestamp',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ViolationScalarFieldEnum = (typeof ViolationScalarFieldEnum)[keyof typeof ViolationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'VehicleType'
   */
  export type EnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType'>
    


  /**
   * Reference to a field of type 'VehicleType[]'
   */
  export type ListEnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType[]'>
    


  /**
   * Reference to a field of type 'VehicleStatus'
   */
  export type EnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus'>
    


  /**
   * Reference to a field of type 'VehicleStatus[]'
   */
  export type ListEnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ZoneType'
   */
  export type EnumZoneTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ZoneType'>
    


  /**
   * Reference to a field of type 'ZoneType[]'
   */
  export type ListEnumZoneTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ZoneType[]'>
    


  /**
   * Reference to a field of type 'ViolationStatus'
   */
  export type EnumViolationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ViolationStatus'>
    


  /**
   * Reference to a field of type 'ViolationStatus[]'
   */
  export type ListEnumViolationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ViolationStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumber?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    profilePicture?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    timezoneId?: IntFilter<"User"> | number
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    isActive?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    email?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    timezoneId?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phoneNumber?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    profilePicture?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    timezoneId?: IntFilter<"User"> | number
  }, "id" | "phoneNumber" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    isActive?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    email?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    timezoneId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    middleName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    password?: StringWithAggregatesFilter<"User"> | string
    timezoneId?: IntWithAggregatesFilter<"User"> | number
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    name?: StringFilter<"Vehicle"> | string
    plateNumber?: StringFilter<"Vehicle"> | string
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    driverName?: StringNullableFilter<"Vehicle"> | string | null
    driverPhone?: StringNullableFilter<"Vehicle"> | string | null
    deviceId?: StringNullableFilter<"Vehicle"> | string | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    locations?: VehicleLocationListRelationFilter
    violations?: ViolationListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    plateNumber?: SortOrder
    type?: SortOrder
    status?: SortOrder
    driverName?: SortOrderInput | SortOrder
    driverPhone?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    locations?: VehicleLocationOrderByRelationAggregateInput
    violations?: ViolationOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plateNumber?: string
    deviceId?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    name?: StringFilter<"Vehicle"> | string
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    driverName?: StringNullableFilter<"Vehicle"> | string | null
    driverPhone?: StringNullableFilter<"Vehicle"> | string | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    locations?: VehicleLocationListRelationFilter
    violations?: ViolationListRelationFilter
  }, "id" | "plateNumber" | "deviceId">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    plateNumber?: SortOrder
    type?: SortOrder
    status?: SortOrder
    driverName?: SortOrderInput | SortOrder
    driverPhone?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    name?: StringWithAggregatesFilter<"Vehicle"> | string
    plateNumber?: StringWithAggregatesFilter<"Vehicle"> | string
    type?: EnumVehicleTypeWithAggregatesFilter<"Vehicle"> | $Enums.VehicleType
    status?: EnumVehicleStatusWithAggregatesFilter<"Vehicle"> | $Enums.VehicleStatus
    driverName?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    driverPhone?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    deviceId?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    color?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type VehicleLocationWhereInput = {
    AND?: VehicleLocationWhereInput | VehicleLocationWhereInput[]
    OR?: VehicleLocationWhereInput[]
    NOT?: VehicleLocationWhereInput | VehicleLocationWhereInput[]
    id?: StringFilter<"VehicleLocation"> | string
    vehicleId?: StringFilter<"VehicleLocation"> | string
    latitude?: FloatFilter<"VehicleLocation"> | number
    longitude?: FloatFilter<"VehicleLocation"> | number
    speed?: FloatFilter<"VehicleLocation"> | number
    heading?: FloatNullableFilter<"VehicleLocation"> | number | null
    altitude?: FloatNullableFilter<"VehicleLocation"> | number | null
    accuracy?: FloatNullableFilter<"VehicleLocation"> | number | null
    satellites?: IntNullableFilter<"VehicleLocation"> | number | null
    timestamp?: DateTimeFilter<"VehicleLocation"> | Date | string
    vehicle?: XOR<VehicleRelationFilter, VehicleWhereInput>
  }

  export type VehicleLocationOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    satellites?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type VehicleLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleLocationWhereInput | VehicleLocationWhereInput[]
    OR?: VehicleLocationWhereInput[]
    NOT?: VehicleLocationWhereInput | VehicleLocationWhereInput[]
    vehicleId?: StringFilter<"VehicleLocation"> | string
    latitude?: FloatFilter<"VehicleLocation"> | number
    longitude?: FloatFilter<"VehicleLocation"> | number
    speed?: FloatFilter<"VehicleLocation"> | number
    heading?: FloatNullableFilter<"VehicleLocation"> | number | null
    altitude?: FloatNullableFilter<"VehicleLocation"> | number | null
    accuracy?: FloatNullableFilter<"VehicleLocation"> | number | null
    satellites?: IntNullableFilter<"VehicleLocation"> | number | null
    timestamp?: DateTimeFilter<"VehicleLocation"> | Date | string
    vehicle?: XOR<VehicleRelationFilter, VehicleWhereInput>
  }, "id">

  export type VehicleLocationOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    satellites?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: VehicleLocationCountOrderByAggregateInput
    _avg?: VehicleLocationAvgOrderByAggregateInput
    _max?: VehicleLocationMaxOrderByAggregateInput
    _min?: VehicleLocationMinOrderByAggregateInput
    _sum?: VehicleLocationSumOrderByAggregateInput
  }

  export type VehicleLocationScalarWhereWithAggregatesInput = {
    AND?: VehicleLocationScalarWhereWithAggregatesInput | VehicleLocationScalarWhereWithAggregatesInput[]
    OR?: VehicleLocationScalarWhereWithAggregatesInput[]
    NOT?: VehicleLocationScalarWhereWithAggregatesInput | VehicleLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleLocation"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleLocation"> | string
    latitude?: FloatWithAggregatesFilter<"VehicleLocation"> | number
    longitude?: FloatWithAggregatesFilter<"VehicleLocation"> | number
    speed?: FloatWithAggregatesFilter<"VehicleLocation"> | number
    heading?: FloatNullableWithAggregatesFilter<"VehicleLocation"> | number | null
    altitude?: FloatNullableWithAggregatesFilter<"VehicleLocation"> | number | null
    accuracy?: FloatNullableWithAggregatesFilter<"VehicleLocation"> | number | null
    satellites?: IntNullableWithAggregatesFilter<"VehicleLocation"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"VehicleLocation"> | Date | string
  }

  export type SpeedZoneWhereInput = {
    AND?: SpeedZoneWhereInput | SpeedZoneWhereInput[]
    OR?: SpeedZoneWhereInput[]
    NOT?: SpeedZoneWhereInput | SpeedZoneWhereInput[]
    id?: StringFilter<"SpeedZone"> | string
    name?: StringFilter<"SpeedZone"> | string
    description?: StringNullableFilter<"SpeedZone"> | string | null
    speedLimit?: FloatFilter<"SpeedZone"> | number
    coordinates?: JsonFilter<"SpeedZone">
    zoneType?: EnumZoneTypeFilter<"SpeedZone"> | $Enums.ZoneType
    color?: StringFilter<"SpeedZone"> | string
    active?: BoolFilter<"SpeedZone"> | boolean
    createdAt?: DateTimeFilter<"SpeedZone"> | Date | string
    updatedAt?: DateTimeFilter<"SpeedZone"> | Date | string
    violations?: ViolationListRelationFilter
  }

  export type SpeedZoneOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    speedLimit?: SortOrder
    coordinates?: SortOrder
    zoneType?: SortOrder
    color?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    violations?: ViolationOrderByRelationAggregateInput
  }

  export type SpeedZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpeedZoneWhereInput | SpeedZoneWhereInput[]
    OR?: SpeedZoneWhereInput[]
    NOT?: SpeedZoneWhereInput | SpeedZoneWhereInput[]
    name?: StringFilter<"SpeedZone"> | string
    description?: StringNullableFilter<"SpeedZone"> | string | null
    speedLimit?: FloatFilter<"SpeedZone"> | number
    coordinates?: JsonFilter<"SpeedZone">
    zoneType?: EnumZoneTypeFilter<"SpeedZone"> | $Enums.ZoneType
    color?: StringFilter<"SpeedZone"> | string
    active?: BoolFilter<"SpeedZone"> | boolean
    createdAt?: DateTimeFilter<"SpeedZone"> | Date | string
    updatedAt?: DateTimeFilter<"SpeedZone"> | Date | string
    violations?: ViolationListRelationFilter
  }, "id">

  export type SpeedZoneOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    speedLimit?: SortOrder
    coordinates?: SortOrder
    zoneType?: SortOrder
    color?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpeedZoneCountOrderByAggregateInput
    _avg?: SpeedZoneAvgOrderByAggregateInput
    _max?: SpeedZoneMaxOrderByAggregateInput
    _min?: SpeedZoneMinOrderByAggregateInput
    _sum?: SpeedZoneSumOrderByAggregateInput
  }

  export type SpeedZoneScalarWhereWithAggregatesInput = {
    AND?: SpeedZoneScalarWhereWithAggregatesInput | SpeedZoneScalarWhereWithAggregatesInput[]
    OR?: SpeedZoneScalarWhereWithAggregatesInput[]
    NOT?: SpeedZoneScalarWhereWithAggregatesInput | SpeedZoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SpeedZone"> | string
    name?: StringWithAggregatesFilter<"SpeedZone"> | string
    description?: StringNullableWithAggregatesFilter<"SpeedZone"> | string | null
    speedLimit?: FloatWithAggregatesFilter<"SpeedZone"> | number
    coordinates?: JsonWithAggregatesFilter<"SpeedZone">
    zoneType?: EnumZoneTypeWithAggregatesFilter<"SpeedZone"> | $Enums.ZoneType
    color?: StringWithAggregatesFilter<"SpeedZone"> | string
    active?: BoolWithAggregatesFilter<"SpeedZone"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SpeedZone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SpeedZone"> | Date | string
  }

  export type ViolationWhereInput = {
    AND?: ViolationWhereInput | ViolationWhereInput[]
    OR?: ViolationWhereInput[]
    NOT?: ViolationWhereInput | ViolationWhereInput[]
    id?: StringFilter<"Violation"> | string
    vehicleId?: StringFilter<"Violation"> | string
    zoneId?: StringNullableFilter<"Violation"> | string | null
    latitude?: FloatFilter<"Violation"> | number
    longitude?: FloatFilter<"Violation"> | number
    speed?: FloatFilter<"Violation"> | number
    speedLimit?: FloatFilter<"Violation"> | number
    excessSpeed?: FloatFilter<"Violation"> | number
    fineAmount?: FloatFilter<"Violation"> | number
    status?: EnumViolationStatusFilter<"Violation"> | $Enums.ViolationStatus
    notes?: StringNullableFilter<"Violation"> | string | null
    timestamp?: DateTimeFilter<"Violation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Violation"> | Date | string | null
    createdAt?: DateTimeFilter<"Violation"> | Date | string
    updatedAt?: DateTimeFilter<"Violation"> | Date | string
    vehicle?: XOR<VehicleRelationFilter, VehicleWhereInput>
    zone?: XOR<SpeedZoneNullableRelationFilter, SpeedZoneWhereInput> | null
  }

  export type ViolationOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    zoneId?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    zone?: SpeedZoneOrderByWithRelationInput
  }

  export type ViolationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ViolationWhereInput | ViolationWhereInput[]
    OR?: ViolationWhereInput[]
    NOT?: ViolationWhereInput | ViolationWhereInput[]
    vehicleId?: StringFilter<"Violation"> | string
    zoneId?: StringNullableFilter<"Violation"> | string | null
    latitude?: FloatFilter<"Violation"> | number
    longitude?: FloatFilter<"Violation"> | number
    speed?: FloatFilter<"Violation"> | number
    speedLimit?: FloatFilter<"Violation"> | number
    excessSpeed?: FloatFilter<"Violation"> | number
    fineAmount?: FloatFilter<"Violation"> | number
    status?: EnumViolationStatusFilter<"Violation"> | $Enums.ViolationStatus
    notes?: StringNullableFilter<"Violation"> | string | null
    timestamp?: DateTimeFilter<"Violation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Violation"> | Date | string | null
    createdAt?: DateTimeFilter<"Violation"> | Date | string
    updatedAt?: DateTimeFilter<"Violation"> | Date | string
    vehicle?: XOR<VehicleRelationFilter, VehicleWhereInput>
    zone?: XOR<SpeedZoneNullableRelationFilter, SpeedZoneWhereInput> | null
  }, "id">

  export type ViolationOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    zoneId?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ViolationCountOrderByAggregateInput
    _avg?: ViolationAvgOrderByAggregateInput
    _max?: ViolationMaxOrderByAggregateInput
    _min?: ViolationMinOrderByAggregateInput
    _sum?: ViolationSumOrderByAggregateInput
  }

  export type ViolationScalarWhereWithAggregatesInput = {
    AND?: ViolationScalarWhereWithAggregatesInput | ViolationScalarWhereWithAggregatesInput[]
    OR?: ViolationScalarWhereWithAggregatesInput[]
    NOT?: ViolationScalarWhereWithAggregatesInput | ViolationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Violation"> | string
    vehicleId?: StringWithAggregatesFilter<"Violation"> | string
    zoneId?: StringNullableWithAggregatesFilter<"Violation"> | string | null
    latitude?: FloatWithAggregatesFilter<"Violation"> | number
    longitude?: FloatWithAggregatesFilter<"Violation"> | number
    speed?: FloatWithAggregatesFilter<"Violation"> | number
    speedLimit?: FloatWithAggregatesFilter<"Violation"> | number
    excessSpeed?: FloatWithAggregatesFilter<"Violation"> | number
    fineAmount?: FloatWithAggregatesFilter<"Violation"> | number
    status?: EnumViolationStatusWithAggregatesFilter<"Violation"> | $Enums.ViolationStatus
    notes?: StringNullableWithAggregatesFilter<"Violation"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"Violation"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Violation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Violation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Violation"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    dob?: Date | string | null
    phoneNumber: string
    isActive?: boolean
    profilePicture?: string | null
    email: string
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    timezoneId?: number
  }

  export type UserUncheckedCreateInput = {
    id: string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    dob?: Date | string | null
    phoneNumber: string
    isActive?: boolean
    profilePicture?: string | null
    email: string
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    timezoneId?: number
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    timezoneId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    timezoneId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateManyInput = {
    id: string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    dob?: Date | string | null
    phoneNumber: string
    isActive?: boolean
    profilePicture?: string | null
    email: string
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    timezoneId?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    timezoneId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    timezoneId?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleCreateInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VehicleLocationCreateNestedManyWithoutVehicleInput
    violations?: ViolationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VehicleLocationUncheckedCreateNestedManyWithoutVehicleInput
    violations?: ViolationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VehicleLocationUpdateManyWithoutVehicleNestedInput
    violations?: ViolationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VehicleLocationUncheckedUpdateManyWithoutVehicleNestedInput
    violations?: ViolationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationCreateInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
    vehicle: VehicleCreateNestedOneWithoutLocationsInput
  }

  export type VehicleLocationUncheckedCreateInput = {
    id?: string
    vehicleId: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
  }

  export type VehicleLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type VehicleLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationCreateManyInput = {
    id?: string
    vehicleId: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
  }

  export type VehicleLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeedZoneCreateInput = {
    id?: string
    name: string
    description?: string | null
    speedLimit: number
    coordinates: JsonNullValueInput | InputJsonValue
    zoneType?: $Enums.ZoneType
    color?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    violations?: ViolationCreateNestedManyWithoutZoneInput
  }

  export type SpeedZoneUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    speedLimit: number
    coordinates: JsonNullValueInput | InputJsonValue
    zoneType?: $Enums.ZoneType
    color?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    violations?: ViolationUncheckedCreateNestedManyWithoutZoneInput
  }

  export type SpeedZoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    violations?: ViolationUpdateManyWithoutZoneNestedInput
  }

  export type SpeedZoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    violations?: ViolationUncheckedUpdateManyWithoutZoneNestedInput
  }

  export type SpeedZoneCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    speedLimit: number
    coordinates: JsonNullValueInput | InputJsonValue
    zoneType?: $Enums.ZoneType
    color?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeedZoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeedZoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationCreateInput = {
    id?: string
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutViolationsInput
    zone?: SpeedZoneCreateNestedOneWithoutViolationsInput
  }

  export type ViolationUncheckedCreateInput = {
    id?: string
    vehicleId: string
    zoneId?: string | null
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViolationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutViolationsNestedInput
    zone?: SpeedZoneUpdateOneWithoutViolationsNestedInput
  }

  export type ViolationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationCreateManyInput = {
    id?: string
    vehicleId: string
    zoneId?: string | null
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViolationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    phoneNumber?: SortOrder
    isActive?: SortOrder
    profilePicture?: SortOrder
    email?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    timezoneId?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    timezoneId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    phoneNumber?: SortOrder
    isActive?: SortOrder
    profilePicture?: SortOrder
    email?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    timezoneId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    phoneNumber?: SortOrder
    isActive?: SortOrder
    profilePicture?: SortOrder
    email?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    timezoneId?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    timezoneId?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type EnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
  }

  export type VehicleLocationListRelationFilter = {
    every?: VehicleLocationWhereInput
    some?: VehicleLocationWhereInput
    none?: VehicleLocationWhereInput
  }

  export type ViolationListRelationFilter = {
    every?: ViolationWhereInput
    some?: ViolationWhereInput
    none?: ViolationWhereInput
  }

  export type VehicleLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ViolationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plateNumber?: SortOrder
    type?: SortOrder
    status?: SortOrder
    driverName?: SortOrder
    driverPhone?: SortOrder
    deviceId?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plateNumber?: SortOrder
    type?: SortOrder
    status?: SortOrder
    driverName?: SortOrder
    driverPhone?: SortOrder
    deviceId?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plateNumber?: SortOrder
    type?: SortOrder
    status?: SortOrder
    driverName?: SortOrder
    driverPhone?: SortOrder
    deviceId?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type EnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type VehicleRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type VehicleLocationCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    satellites?: SortOrder
    timestamp?: SortOrder
  }

  export type VehicleLocationAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    satellites?: SortOrder
  }

  export type VehicleLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    satellites?: SortOrder
    timestamp?: SortOrder
  }

  export type VehicleLocationMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    satellites?: SortOrder
    timestamp?: SortOrder
  }

  export type VehicleLocationSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    satellites?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumZoneTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ZoneType | EnumZoneTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumZoneTypeFilter<$PrismaModel> | $Enums.ZoneType
  }

  export type SpeedZoneCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    speedLimit?: SortOrder
    coordinates?: SortOrder
    zoneType?: SortOrder
    color?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeedZoneAvgOrderByAggregateInput = {
    speedLimit?: SortOrder
  }

  export type SpeedZoneMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    speedLimit?: SortOrder
    zoneType?: SortOrder
    color?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeedZoneMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    speedLimit?: SortOrder
    zoneType?: SortOrder
    color?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeedZoneSumOrderByAggregateInput = {
    speedLimit?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumZoneTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ZoneType | EnumZoneTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumZoneTypeWithAggregatesFilter<$PrismaModel> | $Enums.ZoneType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumZoneTypeFilter<$PrismaModel>
    _max?: NestedEnumZoneTypeFilter<$PrismaModel>
  }

  export type EnumViolationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ViolationStatus | EnumViolationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumViolationStatusFilter<$PrismaModel> | $Enums.ViolationStatus
  }

  export type SpeedZoneNullableRelationFilter = {
    is?: SpeedZoneWhereInput | null
    isNot?: SpeedZoneWhereInput | null
  }

  export type ViolationCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    zoneId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViolationAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
  }

  export type ViolationMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    zoneId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViolationMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    zoneId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViolationSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    speedLimit?: SortOrder
    excessSpeed?: SortOrder
    fineAmount?: SortOrder
  }

  export type EnumViolationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ViolationStatus | EnumViolationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumViolationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ViolationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumViolationStatusFilter<$PrismaModel>
    _max?: NestedEnumViolationStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VehicleLocationCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput> | VehicleLocationCreateWithoutVehicleInput[] | VehicleLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleLocationCreateOrConnectWithoutVehicleInput | VehicleLocationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleLocationCreateManyVehicleInputEnvelope
    connect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
  }

  export type ViolationCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput> | ViolationCreateWithoutVehicleInput[] | ViolationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutVehicleInput | ViolationCreateOrConnectWithoutVehicleInput[]
    createMany?: ViolationCreateManyVehicleInputEnvelope
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
  }

  export type VehicleLocationUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput> | VehicleLocationCreateWithoutVehicleInput[] | VehicleLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleLocationCreateOrConnectWithoutVehicleInput | VehicleLocationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleLocationCreateManyVehicleInputEnvelope
    connect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
  }

  export type ViolationUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput> | ViolationCreateWithoutVehicleInput[] | ViolationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutVehicleInput | ViolationCreateOrConnectWithoutVehicleInput[]
    createMany?: ViolationCreateManyVehicleInputEnvelope
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
  }

  export type EnumVehicleTypeFieldUpdateOperationsInput = {
    set?: $Enums.VehicleType
  }

  export type EnumVehicleStatusFieldUpdateOperationsInput = {
    set?: $Enums.VehicleStatus
  }

  export type VehicleLocationUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput> | VehicleLocationCreateWithoutVehicleInput[] | VehicleLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleLocationCreateOrConnectWithoutVehicleInput | VehicleLocationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleLocationUpsertWithWhereUniqueWithoutVehicleInput | VehicleLocationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleLocationCreateManyVehicleInputEnvelope
    set?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    disconnect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    delete?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    connect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    update?: VehicleLocationUpdateWithWhereUniqueWithoutVehicleInput | VehicleLocationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleLocationUpdateManyWithWhereWithoutVehicleInput | VehicleLocationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleLocationScalarWhereInput | VehicleLocationScalarWhereInput[]
  }

  export type ViolationUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput> | ViolationCreateWithoutVehicleInput[] | ViolationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutVehicleInput | ViolationCreateOrConnectWithoutVehicleInput[]
    upsert?: ViolationUpsertWithWhereUniqueWithoutVehicleInput | ViolationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ViolationCreateManyVehicleInputEnvelope
    set?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    disconnect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    delete?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    update?: ViolationUpdateWithWhereUniqueWithoutVehicleInput | ViolationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ViolationUpdateManyWithWhereWithoutVehicleInput | ViolationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
  }

  export type VehicleLocationUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput> | VehicleLocationCreateWithoutVehicleInput[] | VehicleLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleLocationCreateOrConnectWithoutVehicleInput | VehicleLocationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleLocationUpsertWithWhereUniqueWithoutVehicleInput | VehicleLocationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleLocationCreateManyVehicleInputEnvelope
    set?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    disconnect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    delete?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    connect?: VehicleLocationWhereUniqueInput | VehicleLocationWhereUniqueInput[]
    update?: VehicleLocationUpdateWithWhereUniqueWithoutVehicleInput | VehicleLocationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleLocationUpdateManyWithWhereWithoutVehicleInput | VehicleLocationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleLocationScalarWhereInput | VehicleLocationScalarWhereInput[]
  }

  export type ViolationUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput> | ViolationCreateWithoutVehicleInput[] | ViolationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutVehicleInput | ViolationCreateOrConnectWithoutVehicleInput[]
    upsert?: ViolationUpsertWithWhereUniqueWithoutVehicleInput | ViolationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ViolationCreateManyVehicleInputEnvelope
    set?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    disconnect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    delete?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    update?: ViolationUpdateWithWhereUniqueWithoutVehicleInput | ViolationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ViolationUpdateManyWithWhereWithoutVehicleInput | ViolationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutLocationsInput = {
    create?: XOR<VehicleCreateWithoutLocationsInput, VehicleUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutLocationsInput
    connect?: VehicleWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VehicleUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<VehicleCreateWithoutLocationsInput, VehicleUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutLocationsInput
    upsert?: VehicleUpsertWithoutLocationsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutLocationsInput, VehicleUpdateWithoutLocationsInput>, VehicleUncheckedUpdateWithoutLocationsInput>
  }

  export type ViolationCreateNestedManyWithoutZoneInput = {
    create?: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput> | ViolationCreateWithoutZoneInput[] | ViolationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutZoneInput | ViolationCreateOrConnectWithoutZoneInput[]
    createMany?: ViolationCreateManyZoneInputEnvelope
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
  }

  export type ViolationUncheckedCreateNestedManyWithoutZoneInput = {
    create?: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput> | ViolationCreateWithoutZoneInput[] | ViolationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutZoneInput | ViolationCreateOrConnectWithoutZoneInput[]
    createMany?: ViolationCreateManyZoneInputEnvelope
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
  }

  export type EnumZoneTypeFieldUpdateOperationsInput = {
    set?: $Enums.ZoneType
  }

  export type ViolationUpdateManyWithoutZoneNestedInput = {
    create?: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput> | ViolationCreateWithoutZoneInput[] | ViolationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutZoneInput | ViolationCreateOrConnectWithoutZoneInput[]
    upsert?: ViolationUpsertWithWhereUniqueWithoutZoneInput | ViolationUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: ViolationCreateManyZoneInputEnvelope
    set?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    disconnect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    delete?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    update?: ViolationUpdateWithWhereUniqueWithoutZoneInput | ViolationUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: ViolationUpdateManyWithWhereWithoutZoneInput | ViolationUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
  }

  export type ViolationUncheckedUpdateManyWithoutZoneNestedInput = {
    create?: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput> | ViolationCreateWithoutZoneInput[] | ViolationUncheckedCreateWithoutZoneInput[]
    connectOrCreate?: ViolationCreateOrConnectWithoutZoneInput | ViolationCreateOrConnectWithoutZoneInput[]
    upsert?: ViolationUpsertWithWhereUniqueWithoutZoneInput | ViolationUpsertWithWhereUniqueWithoutZoneInput[]
    createMany?: ViolationCreateManyZoneInputEnvelope
    set?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    disconnect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    delete?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    connect?: ViolationWhereUniqueInput | ViolationWhereUniqueInput[]
    update?: ViolationUpdateWithWhereUniqueWithoutZoneInput | ViolationUpdateWithWhereUniqueWithoutZoneInput[]
    updateMany?: ViolationUpdateManyWithWhereWithoutZoneInput | ViolationUpdateManyWithWhereWithoutZoneInput[]
    deleteMany?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutViolationsInput = {
    create?: XOR<VehicleCreateWithoutViolationsInput, VehicleUncheckedCreateWithoutViolationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutViolationsInput
    connect?: VehicleWhereUniqueInput
  }

  export type SpeedZoneCreateNestedOneWithoutViolationsInput = {
    create?: XOR<SpeedZoneCreateWithoutViolationsInput, SpeedZoneUncheckedCreateWithoutViolationsInput>
    connectOrCreate?: SpeedZoneCreateOrConnectWithoutViolationsInput
    connect?: SpeedZoneWhereUniqueInput
  }

  export type EnumViolationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ViolationStatus
  }

  export type VehicleUpdateOneRequiredWithoutViolationsNestedInput = {
    create?: XOR<VehicleCreateWithoutViolationsInput, VehicleUncheckedCreateWithoutViolationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutViolationsInput
    upsert?: VehicleUpsertWithoutViolationsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutViolationsInput, VehicleUpdateWithoutViolationsInput>, VehicleUncheckedUpdateWithoutViolationsInput>
  }

  export type SpeedZoneUpdateOneWithoutViolationsNestedInput = {
    create?: XOR<SpeedZoneCreateWithoutViolationsInput, SpeedZoneUncheckedCreateWithoutViolationsInput>
    connectOrCreate?: SpeedZoneCreateOrConnectWithoutViolationsInput
    upsert?: SpeedZoneUpsertWithoutViolationsInput
    disconnect?: SpeedZoneWhereInput | boolean
    delete?: SpeedZoneWhereInput | boolean
    connect?: SpeedZoneWhereUniqueInput
    update?: XOR<XOR<SpeedZoneUpdateToOneWithWhereWithoutViolationsInput, SpeedZoneUpdateWithoutViolationsInput>, SpeedZoneUncheckedUpdateWithoutViolationsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type NestedEnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
  }

  export type NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedEnumZoneTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ZoneType | EnumZoneTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumZoneTypeFilter<$PrismaModel> | $Enums.ZoneType
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumZoneTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ZoneType | EnumZoneTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ZoneType[] | ListEnumZoneTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumZoneTypeWithAggregatesFilter<$PrismaModel> | $Enums.ZoneType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumZoneTypeFilter<$PrismaModel>
    _max?: NestedEnumZoneTypeFilter<$PrismaModel>
  }

  export type NestedEnumViolationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ViolationStatus | EnumViolationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumViolationStatusFilter<$PrismaModel> | $Enums.ViolationStatus
  }

  export type NestedEnumViolationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ViolationStatus | EnumViolationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ViolationStatus[] | ListEnumViolationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumViolationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ViolationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumViolationStatusFilter<$PrismaModel>
    _max?: NestedEnumViolationStatusFilter<$PrismaModel>
  }

  export type VehicleLocationCreateWithoutVehicleInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
  }

  export type VehicleLocationUncheckedCreateWithoutVehicleInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
  }

  export type VehicleLocationCreateOrConnectWithoutVehicleInput = {
    where: VehicleLocationWhereUniqueInput
    create: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleLocationCreateManyVehicleInputEnvelope = {
    data: VehicleLocationCreateManyVehicleInput | VehicleLocationCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type ViolationCreateWithoutVehicleInput = {
    id?: string
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    zone?: SpeedZoneCreateNestedOneWithoutViolationsInput
  }

  export type ViolationUncheckedCreateWithoutVehicleInput = {
    id?: string
    zoneId?: string | null
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViolationCreateOrConnectWithoutVehicleInput = {
    where: ViolationWhereUniqueInput
    create: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput>
  }

  export type ViolationCreateManyVehicleInputEnvelope = {
    data: ViolationCreateManyVehicleInput | ViolationCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type VehicleLocationUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VehicleLocationWhereUniqueInput
    update: XOR<VehicleLocationUpdateWithoutVehicleInput, VehicleLocationUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleLocationCreateWithoutVehicleInput, VehicleLocationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleLocationUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VehicleLocationWhereUniqueInput
    data: XOR<VehicleLocationUpdateWithoutVehicleInput, VehicleLocationUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleLocationUpdateManyWithWhereWithoutVehicleInput = {
    where: VehicleLocationScalarWhereInput
    data: XOR<VehicleLocationUpdateManyMutationInput, VehicleLocationUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleLocationScalarWhereInput = {
    AND?: VehicleLocationScalarWhereInput | VehicleLocationScalarWhereInput[]
    OR?: VehicleLocationScalarWhereInput[]
    NOT?: VehicleLocationScalarWhereInput | VehicleLocationScalarWhereInput[]
    id?: StringFilter<"VehicleLocation"> | string
    vehicleId?: StringFilter<"VehicleLocation"> | string
    latitude?: FloatFilter<"VehicleLocation"> | number
    longitude?: FloatFilter<"VehicleLocation"> | number
    speed?: FloatFilter<"VehicleLocation"> | number
    heading?: FloatNullableFilter<"VehicleLocation"> | number | null
    altitude?: FloatNullableFilter<"VehicleLocation"> | number | null
    accuracy?: FloatNullableFilter<"VehicleLocation"> | number | null
    satellites?: IntNullableFilter<"VehicleLocation"> | number | null
    timestamp?: DateTimeFilter<"VehicleLocation"> | Date | string
  }

  export type ViolationUpsertWithWhereUniqueWithoutVehicleInput = {
    where: ViolationWhereUniqueInput
    update: XOR<ViolationUpdateWithoutVehicleInput, ViolationUncheckedUpdateWithoutVehicleInput>
    create: XOR<ViolationCreateWithoutVehicleInput, ViolationUncheckedCreateWithoutVehicleInput>
  }

  export type ViolationUpdateWithWhereUniqueWithoutVehicleInput = {
    where: ViolationWhereUniqueInput
    data: XOR<ViolationUpdateWithoutVehicleInput, ViolationUncheckedUpdateWithoutVehicleInput>
  }

  export type ViolationUpdateManyWithWhereWithoutVehicleInput = {
    where: ViolationScalarWhereInput
    data: XOR<ViolationUpdateManyMutationInput, ViolationUncheckedUpdateManyWithoutVehicleInput>
  }

  export type ViolationScalarWhereInput = {
    AND?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
    OR?: ViolationScalarWhereInput[]
    NOT?: ViolationScalarWhereInput | ViolationScalarWhereInput[]
    id?: StringFilter<"Violation"> | string
    vehicleId?: StringFilter<"Violation"> | string
    zoneId?: StringNullableFilter<"Violation"> | string | null
    latitude?: FloatFilter<"Violation"> | number
    longitude?: FloatFilter<"Violation"> | number
    speed?: FloatFilter<"Violation"> | number
    speedLimit?: FloatFilter<"Violation"> | number
    excessSpeed?: FloatFilter<"Violation"> | number
    fineAmount?: FloatFilter<"Violation"> | number
    status?: EnumViolationStatusFilter<"Violation"> | $Enums.ViolationStatus
    notes?: StringNullableFilter<"Violation"> | string | null
    timestamp?: DateTimeFilter<"Violation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Violation"> | Date | string | null
    createdAt?: DateTimeFilter<"Violation"> | Date | string
    updatedAt?: DateTimeFilter<"Violation"> | Date | string
  }

  export type VehicleCreateWithoutLocationsInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    violations?: ViolationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutLocationsInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    violations?: ViolationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutLocationsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutLocationsInput, VehicleUncheckedCreateWithoutLocationsInput>
  }

  export type VehicleUpsertWithoutLocationsInput = {
    update: XOR<VehicleUpdateWithoutLocationsInput, VehicleUncheckedUpdateWithoutLocationsInput>
    create: XOR<VehicleCreateWithoutLocationsInput, VehicleUncheckedCreateWithoutLocationsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutLocationsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutLocationsInput, VehicleUncheckedUpdateWithoutLocationsInput>
  }

  export type VehicleUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    violations?: ViolationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    violations?: ViolationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type ViolationCreateWithoutZoneInput = {
    id?: string
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutViolationsInput
  }

  export type ViolationUncheckedCreateWithoutZoneInput = {
    id?: string
    vehicleId: string
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViolationCreateOrConnectWithoutZoneInput = {
    where: ViolationWhereUniqueInput
    create: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput>
  }

  export type ViolationCreateManyZoneInputEnvelope = {
    data: ViolationCreateManyZoneInput | ViolationCreateManyZoneInput[]
    skipDuplicates?: boolean
  }

  export type ViolationUpsertWithWhereUniqueWithoutZoneInput = {
    where: ViolationWhereUniqueInput
    update: XOR<ViolationUpdateWithoutZoneInput, ViolationUncheckedUpdateWithoutZoneInput>
    create: XOR<ViolationCreateWithoutZoneInput, ViolationUncheckedCreateWithoutZoneInput>
  }

  export type ViolationUpdateWithWhereUniqueWithoutZoneInput = {
    where: ViolationWhereUniqueInput
    data: XOR<ViolationUpdateWithoutZoneInput, ViolationUncheckedUpdateWithoutZoneInput>
  }

  export type ViolationUpdateManyWithWhereWithoutZoneInput = {
    where: ViolationScalarWhereInput
    data: XOR<ViolationUpdateManyMutationInput, ViolationUncheckedUpdateManyWithoutZoneInput>
  }

  export type VehicleCreateWithoutViolationsInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VehicleLocationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutViolationsInput = {
    id?: string
    name: string
    plateNumber: string
    type?: $Enums.VehicleType
    status?: $Enums.VehicleStatus
    driverName?: string | null
    driverPhone?: string | null
    deviceId?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VehicleLocationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutViolationsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutViolationsInput, VehicleUncheckedCreateWithoutViolationsInput>
  }

  export type SpeedZoneCreateWithoutViolationsInput = {
    id?: string
    name: string
    description?: string | null
    speedLimit: number
    coordinates: JsonNullValueInput | InputJsonValue
    zoneType?: $Enums.ZoneType
    color?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeedZoneUncheckedCreateWithoutViolationsInput = {
    id?: string
    name: string
    description?: string | null
    speedLimit: number
    coordinates: JsonNullValueInput | InputJsonValue
    zoneType?: $Enums.ZoneType
    color?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeedZoneCreateOrConnectWithoutViolationsInput = {
    where: SpeedZoneWhereUniqueInput
    create: XOR<SpeedZoneCreateWithoutViolationsInput, SpeedZoneUncheckedCreateWithoutViolationsInput>
  }

  export type VehicleUpsertWithoutViolationsInput = {
    update: XOR<VehicleUpdateWithoutViolationsInput, VehicleUncheckedUpdateWithoutViolationsInput>
    create: XOR<VehicleCreateWithoutViolationsInput, VehicleUncheckedCreateWithoutViolationsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutViolationsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutViolationsInput, VehicleUncheckedUpdateWithoutViolationsInput>
  }

  export type VehicleUpdateWithoutViolationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VehicleLocationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutViolationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    driverPhone?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VehicleLocationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type SpeedZoneUpsertWithoutViolationsInput = {
    update: XOR<SpeedZoneUpdateWithoutViolationsInput, SpeedZoneUncheckedUpdateWithoutViolationsInput>
    create: XOR<SpeedZoneCreateWithoutViolationsInput, SpeedZoneUncheckedCreateWithoutViolationsInput>
    where?: SpeedZoneWhereInput
  }

  export type SpeedZoneUpdateToOneWithWhereWithoutViolationsInput = {
    where?: SpeedZoneWhereInput
    data: XOR<SpeedZoneUpdateWithoutViolationsInput, SpeedZoneUncheckedUpdateWithoutViolationsInput>
  }

  export type SpeedZoneUpdateWithoutViolationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeedZoneUncheckedUpdateWithoutViolationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    speedLimit?: FloatFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    zoneType?: EnumZoneTypeFieldUpdateOperationsInput | $Enums.ZoneType
    color?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationCreateManyVehicleInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    satellites?: number | null
    timestamp?: Date | string
  }

  export type ViolationCreateManyVehicleInput = {
    id?: string
    zoneId?: string | null
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleLocationUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleLocationUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    satellites?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    zone?: SpeedZoneUpdateOneWithoutViolationsNestedInput
  }

  export type ViolationUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    zoneId?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationCreateManyZoneInput = {
    id?: string
    vehicleId: string
    latitude: number
    longitude: number
    speed: number
    speedLimit: number
    excessSpeed: number
    fineAmount?: number
    status?: $Enums.ViolationStatus
    notes?: string | null
    timestamp?: Date | string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViolationUpdateWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutViolationsNestedInput
  }

  export type ViolationUncheckedUpdateWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViolationUncheckedUpdateManyWithoutZoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    speedLimit?: FloatFieldUpdateOperationsInput | number
    excessSpeed?: FloatFieldUpdateOperationsInput | number
    fineAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumViolationStatusFieldUpdateOperationsInput | $Enums.ViolationStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use VehicleCountOutputTypeDefaultArgs instead
     */
    export type VehicleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VehicleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpeedZoneCountOutputTypeDefaultArgs instead
     */
    export type SpeedZoneCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpeedZoneCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VehicleDefaultArgs instead
     */
    export type VehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VehicleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VehicleLocationDefaultArgs instead
     */
    export type VehicleLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VehicleLocationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpeedZoneDefaultArgs instead
     */
    export type SpeedZoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpeedZoneDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ViolationDefaultArgs instead
     */
    export type ViolationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ViolationDefaultArgs<ExtArgs>

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