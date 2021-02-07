type LazyGetter<T> = (c: T) => any

export function Lazy<T>(getter: LazyGetter<T>): PropertyDecorator {
  return (function (target, propertyKey) {
    const privField = new WeakMap();
    Object.defineProperties(target, {
      [propertyKey]: {
        get() {
          if (!privField.get(this)) privField.set(this, getter(this));
          return privField.get(this);
        }
      }
    });
  });
}