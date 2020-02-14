type PredicateFunction<T> = (val: T) => boolean;
type Predicate<T> = PredicateFunction<T> | boolean;
type ResolverFunction<T, U> = (val: T) => U;
type Resolver<T, U> = ResolverFunction<T, U> | U;

const isPredicateFunction = <T>(
  predicate: Predicate<T>,
): predicate is PredicateFunction<T> => typeof predicate === 'function';

const isResolverFunction = <T, U>(
  to: Resolver<T, U>,
): to is ResolverFunction<T, U> => typeof to === 'function';

const evaluate = <T>(predicate: Predicate<T>, val: T) =>
  isPredicateFunction(predicate) ? predicate(val) : predicate;

const resolve = <T, U>(to: Resolver<T, U>, val: T) =>
  isResolverFunction(to) ? to(val) : to;

export default <T>(val: T) => ({
  on<U>(predicate: Predicate<T>, to: Resolver<T, U>) {
    return evaluate(predicate, val)
      ? {
          on() {
            return this;
          },
          otherwise() {
            return resolve(to, val);
          },
        }
      : this;
  },
  otherwise<U>(to: Resolver<T, U>) {
    return resolve(to, val);
  },
});
