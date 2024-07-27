# fs-utils

```sh
pnpm add @bronifty/fs-utils
```

---

## get-project-root

- c[tj]s

```ts
import { getProjectRoot } from '@bronifty/fs-utils';

// same result as process.cwd()
console.log('getProjectRoot()', getProjectRoot());
console.log('process.cwd()', process.cwd());
```

- m[tj]s

```ts
import { getProjectRoot } from '@bronifty/fs-utils';

// same result as process.cwd()
console.log('getProjectRoot()', getProjectRoot());
console.log('process.cwd()', process.cwd());
```

---

## read-json-file

- c[tj]s

```ts
const {
  getProjectRoot,
  readJsonFileRelativeToRoot,
} = require('@bronifty/fs-utils');

const json = await readJsonFileRelativeToRoot('./package.json');
const jsonWithGetProjectRoot = await readJsonFileRelativeToRoot(
  `${getProjectRoot()}/package.json`,
);
// same result
console.log(json);
console.log(jsonWithGetProjectRoot);
```

- m[tj]s

```ts
import { readJsonFileRelativeToRoot, getProjectRoot } from '@bronifty/fs-utils';

const json = await readJsonFileRelativeToRoot('./package.json');
const jsonWithGetProjectRoot = await readJsonFileRelativeToRoot(
  `${getProjectRoot()}/package.json`,
);
// same result
console.log(json);
console.log(jsonWithGetProjectRoot);
```

---

## marcs-observable

- basic functionality

```ts
import { ObservableFactory } from '@bronifty/fs-utils';

const [getter, setter, subscriber] = ObservableFactory.useState([]);

let count = 0;
subscriber(() => count++);
const arr = [1, 2];
setter(arr);

arr.push(3);
setter([1, 2, 3]);
console.log('should equal 2: ', count);
arr.push(4);
console.log('should equal 2: ', count);
setter([1, 2, 3, 4]);
console.log('should equal 3: ', count);
console.log('should equal [1,2,3,4]: ', getter());
```

- application example

```ts
import React from 'react';
import MarcsObservable from '@bronifty/marcs-observable';

// declaring our observable state outside the component to maintain state across re-renders; this could also be done in a store and imported
const [
  childObservableGetter,
  childObservableSetter,
  childObservableSubscriber,
] = MarcsObservable.useState(0);
const [parentObservableGetter] = MarcsObservable.useState(
  () => childObservableGetter() * 2,
);
let unsubscribe = () => {};

const App = () => {
  // subscribing react hook for ui update to observable value update inside a useEffect so it runs once on mount and doesn't get re-assigned every re-render
  const [input1, setInput1] = React.useState(childObservableGetter());
  React.useEffect(() => {
    unsubscribe = childObservableSubscriber((newVal: any) => {
      setInput1(newVal);
    });
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleInputChange = (e: any) => {
    childObservableSetter(e.target.value); // Update observable state
  };

  return (
    <>
      <section>
        <h2>numeric input</h2>
        <input type="number" value={input1} onChange={handleInputChange} />
        <p>
          childObservableGetter value (childObservableGetter()):{' '}
          {childObservableGetter()}
        </p>
        <p>
          parentObservableGetter value (parentObservableGetter()):{' '}
          {parentObservableGetter()}
        </p>
        <button onClick={unsubscribe}>unsubscribe from ui updates</button>
      </section>
    </>
  );
};

export default App;
```

---

### Config

- example tsconfig.json (typeRoots) for a consuming app of the library

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@bronifty/fs-utils/dist/types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---
