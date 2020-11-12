import { ConnectionError } from "../api/query";

// extension of the following concept:

// export type AsyncValue<E, V> = 
//   Init<E, V>
//   | Pending<E, V>
//   | Success<E, V> 
//   | Failure<E, V>

// some people also call this RemoteValue

type AsyncState = "init" | "pending" | "success" | "failure"

export type AsyncValue<V> = AsyncValue_<ConnectionError, V>

interface AsyncValue_<E, V> {
  map: <R>(f: (v:V) => R) => AsyncValue_<E, R>; // Functor
  lmap: <R>(f: (v:E) => R) => AsyncValue_<R, V>; // Bifunctor
  rmap: <R>(f: (v:V) => R) => AsyncValue_<E, R>; // Bifunctor
  bimap: <E2, V2>(fe: (e:E) => E2, fv: (v:V) => V2) => AsyncValue_<E2, V2>; // Bifunctor

  ap: <R>(av: AsyncValue_<E, (v: V) => R>) => AsyncValue_<E, R> // Apply
  chain: <R>(f: (v: V) => AsyncValue_<E, R>) => AsyncValue_<E, R> // Monad
  extend: <R>(f: (av: AsyncValue_<E, V>) => R) => AsyncValue_<E, R> // Extend
  //extract: <A, B> () => V // Comonad - not possible
  caseOf: <R>(
    init: () => R,
    pending: () => R,
    success: (v: V) => R,
    failure: (e: E) => R
  ) => R
}

export abstract class AV { // TypeRep, similar to a companion object?
  static init =  <E, V>(): AsyncValue_<E, V> => new Init<E, V>();
  static pending = <E, V>(): AsyncValue_<E, V> => new Pending<E, V>();
  static success = <E, V>(v: V): AsyncValue_<E, V> => new Success(v);
  static failure = <E, V>(e: E): AsyncValue_<E, V> => new Failure(e);

  static of = <E, V>(v: V): AsyncValue_<E, V> => AV.success<E, V>(v); // Monad
  static caseOf = <E, V, R>(
    init: () => R,
    pending: () => R,
    success: (v: V) => R,
    failure: (e: E) => R
  ) => (av: AsyncValue_<E, V>) => 
  av.caseOf(init, pending, success, failure)
}

type AVTypeRep = {
  of: <E, V>(v: V) => AsyncValue_<E, V> // Applicative
}

class Init<E, V> implements AsyncValue_<E, V>{
  readonly state: AsyncState = "init"

  map = <R>(f) => new Init<E, R>();
  lmap = <R>(f) => new Init<R, V>();
  rmap = this.map;
  bimap = <E2, V2>(fe, fv) => new Init<E2, V2>();

  ap = <R>(av: AsyncValue_<E, (v: V) => R>) => new Init<E, R>();
  chain = <R>(f: (v: V) => AsyncValue_<E, R>) => new Init<E, R>();
  extend = <R>(f: (av: AsyncValue_<E, V>) => R) => new Init<E, R>();
  caseOf = <R>(i, p, s, f): R => i();
}

class Pending<E, V> implements AsyncValue_<E, V>{
  readonly state: AsyncState = "pending"

  map = <R>(f) => new Pending<E, R>();
  lmap = <R>(f) => new Pending<R, V>();
  rmap = this.map;
  bimap = <E2, V2>(fe, fv) => new Pending<E2, V2>();

  ap = <R>(av: AsyncValue_<E, (v: V) => R>) => new Pending<E, R>();
  chain = <R>(f: (v: V) => AsyncValue_<E, R>) => new Pending<E, R>();
  extend = <R>(f: (av: AsyncValue_<E, V>) => R) => new Pending<E, R>();
  caseOf = <R>(i, p, s, f): R => p();
}

class Success<E, V> implements AsyncValue_<E, V>{
  readonly state: AsyncState = "success"
  private readonly value: V
  constructor(v: V){
    this.value = v;
  }

  map = <R>(f) => new Success<E, R>(f(this.value));
  lmap = <R>(f) => new Success<R, V>(this.value);
  rmap = this.map;
  bimap = <E2, V2>(fe, fv) => new Success<E2, V2>(fv(this.value));

  ap = <R>(av: AsyncValue_<E, (v: V) => R>): AsyncValue_<E, R> => av.map(f => f(this.value))
  chain = <R>(f: (v: V) => AsyncValue_<E, R>) => f(this.value);
  extend = <R>(f: (av: AsyncValue_<E, V>) => R) => new Success<E, R>(f(this));
  caseOf = <R>(i, p, s, f): R => s(this.value);
}

class Failure<E, V> implements AsyncValue_<E, V> {
  readonly state: AsyncState = "failure"
  private readonly error: E
  constructor(e: E){
    this.error = e;
  }
  map = <R>(f) => new Failure<E, R>(this.error);
  lmap = <R>(f) => new Failure<R, V>(f(this.error));
  rmap = this.map;
  bimap = <E2, V2>(fe, fv) => new Failure<E2, V2>(fe(this.error));

  ap = <R>(av: AsyncValue_<E, (v: V) => R>) => new Failure<E, R>(this.error);
  chain = <R>(f: (v: V) => AsyncValue_<E, R>) => new Failure<E, R>(this.error);
  extend = <R>(f: (av: AsyncValue_<E, V>) => R) => new Failure<E, R>(this.error);
  caseOf = <R>(i, p, s, f): R => f(this.error);
}



  

