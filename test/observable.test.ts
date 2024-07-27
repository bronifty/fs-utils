import test from 'node:test';
import assert from 'node:assert';
import { ObservableFactory } from '../src/index.ts';

const logChanges = (current: any, previous: any) => {
  console.log(`Changed to ${current} from ${previous}`);
};

test.describe('Observable Tests', () => {
  test('Observable publish and subscribe', () => {
    const observable = ObservableFactory.create(41);
    let trackedVal: number | null = null;
    observable.subscribe((current: number) => {
      console.log('Subscription callback called with value:', current);
      trackedVal = current;
    });
    console.log('Setting value to 42');
    observable.value = 42;
    assert.strictEqual(trackedVal, 42);
    console.log('Setting value to 43');
    observable.value = 43;
    assert.strictEqual(trackedVal, 43);
  });

  test('Observable publish on array replacement, not modification', () => {
    const observable = ObservableFactory.create([]);
    let count = 0;
    observable.subscribe(() => count++);
    const arr = [1, 2];
    observable.value = arr;
    arr.push(3);
    observable.value = [1, 2, 3];
    assert.strictEqual(count, 2);
    arr.push(4);
    assert.strictEqual(count, 2);
    observable.value = [1, 2, 3, 4];
    assert.strictEqual(count, 3);
  });

  test('Observable sets value with a function and arguments', () => {
    const func = (a: number, b: number) => a + b;
    const observable = ObservableFactory.create(func, 3, 4);
    assert.strictEqual(observable.value, 7);
  });

  test('Observable sets value with a function and variable number of arguments', () => {
    const func = (...args: number[]) =>
      args.reduce((acc, value) => acc + value, 0);
    const observable = ObservableFactory.create(func, 3, 4, 5, 6);
    assert.strictEqual(observable.value, 18);
  });

  test('Observable recomputes value when child observables change', () => {
    const childObservable = ObservableFactory.create(5);
    const func = () => childObservable.value * 2;
    const parentObservable = ObservableFactory.create(func);
    assert.strictEqual(parentObservable.value, 10);
    childObservable.value = 10;
    assert.strictEqual(parentObservable.value, 20);
  });

  test('ObservableValue compute with async function', async () => {
    const func = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return 42;
    };
    const observable = ObservableFactory.create(func);
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.strictEqual(observable.value, 42);
  });

  test('Overwrite computed observable value without changing computed function', () => {
    const i = ObservableFactory.create(1);
    const j = ObservableFactory.create(10);
    const func = () => i.value;
    const computed = ObservableFactory.create(func);
    computed.subscribe(logChanges);
    console.log(`computed.value: ${computed.value}`);
    assert.strictEqual(computed.value, 1);
    i.value = 2;
    assert.strictEqual(computed.value, 2);
    computed.value = j.value;
    assert.strictEqual(computed.value, 10);
    j.value = 2;
    assert.strictEqual(computed.value, 10);
    i.value = 3;
    assert.strictEqual(computed.value, 3);
  });
});

test.describe('cancel stale requests', () => {
  test(
    'should handle stale requests correctly',
    async () => {
      // create a child promise with request delay 100ms
      const setVariableDelay = (variableTime: number) => {
        return new Promise(resolve => setTimeout(resolve, variableTime));
      };

      // This will set a delay of 2 seconds

      function childFnPromise() {
        return new Promise(resolve => setTimeout(resolve, 100)).then(() => 1);
      }
      function parentFn() {
        const childValue = child.value;
        if (childValue instanceof Promise) {
          return childValue.then(val => val + 1);
        } else {
          return childValue + 1;
        }
      }
      function grandparentFn() {
        const parentValue = parent.value;
        if (parentValue instanceof Promise) {
          return parentValue.then(val => val + 1);
        } else {
          return parentValue + 1;
        }
      }
      // init the child and computed parent observables
      const child = ObservableFactory.create(childFnPromise);
      const parent = ObservableFactory.create(parentFn);
      const grandparent = ObservableFactory.create(grandparentFn);

      // simulate the delay and setting values

      await setVariableDelay(1000);
      child.value = setVariableDelay(2000).then(() => 22);

      await setVariableDelay(2000);
      child.value = setVariableDelay(2000).then(() => 3);

      await setVariableDelay(5000);
      assert.strictEqual(grandparent.value, 5);
    },
    { timeout: 10000 },
  );
});

test.describe('Observable subscribe and unsubscribe with AbortSignal', () => {
  test('should subscribe and unsubscribe correctly using AbortSignal', async () => {
    const observable1 = ObservableFactory.create(42);
    const observable2 = ObservableFactory.create('Hello');

    const controller = new AbortController();
    const { signal } = controller;

    let observable1Value: number | null = null;
    let observable2Value: string | null = null;

    observable1.subscribe((current: number) => {
      observable1Value = current;
    }, signal);

    observable2.subscribe((current: string) => {
      observable2Value = current;
    }, signal);

    observable1.value = 43;
    observable2.value = 'World';

    controller.abort();

    // Update the values again
    observable1.value = 44;
    observable2.value = 'Universe';

    // Delay to allow any potential callbacks to be called

    await new Promise(resolve => setTimeout(resolve, 100));

    assert.strictEqual(observable1Value, 43);
    assert.strictEqual(observable2Value, 'World');
  });
});

// use the useState function to create a state variable that is observable

test.describe('ObservableFactory.useState', () => {
  test('should use a tuple to return a getter setter and subscriber', async () => {
    const [getter, setter, subscriber] = ObservableFactory.useState([]);

    // const observable = ObservableFactory.create([]);
    let count = 0;
    subscriber(() => count++);
    const arr = [1, 2];
    setter(arr);

    arr.push(3);
    setter([1, 2, 3]);
    assert.strictEqual(count, 2);
    arr.push(4);
    assert.strictEqual(count, 2);
    setter([1, 2, 3, 4]);
    assert.strictEqual(count, 3);
    assert.deepStrictEqual(getter(), [1, 2, 3, 4]);
  });
});

test('Observable with useState recomputes value when child observables change', () => {
  const [childObservableGetter, childObservableSetter] =
    ObservableFactory.useState(5);
  const func = () => childObservableGetter() * 2;
  const [parentObservableGetter] = ObservableFactory.useState(func);
  assert.strictEqual(parentObservableGetter(), 10);
  childObservableSetter(10);
  assert.strictEqual(parentObservableGetter(), 20);
});
