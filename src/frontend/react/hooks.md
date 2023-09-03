# React Hooks API

## useCallback

在重新 render 时缓存函数，只有在第二个数组中内容改变时才更新。

```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

如果不需要根据依赖项更新，可以传一个空数组。

```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...
```

如果你在写一个自定义的 hooks，最好将它返回的任意函数包裹到 `useCallback`

```js
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```

## useContext

从组件中获取 context，使用示例

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

## useDeferredValue

延迟更新 UI 的一部分。

- 在 React 18 之前，渲染是同步的。这意味着一旦 React 开始渲染，在它完成渲染组件之前，没有什么可以阻止它。
- 但是，对于并发渲染，React 可以暂停渲染并在稍后继续渲染，或者完全中止渲染。
- 这是一个重要的新实现，使我们能够为用户提供更流畅的用户体验。让我们通过一个例子看看如何。

```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

## useEffect

用于执行副作用函数，只有在它的依赖项更新时才重新执行。

```js
function ChatRoom({ roomId }) { // 这是一个响应式值
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]); // ✅ 因此你必须指定它们作为 Effect 的依赖项
  // ...
}
```

### 为什么 Effect 在开发模式运行两次？

- 在开发环境下，如果开启严格模式，React 会在实际运行 setup 之前额外运行一次 setup 和 cleanup。
- 这是因为在严格模式之外，React 可能会多次运行你的钩子，因为它将渲染阶段分解成碎片，并可能暂停或重新启动工作。
- 因此 React 希望你的函数是纯函数，例如，使用相同的参数，它们具有相同的结果。出于这个原因，它希望能够调用你的钩子两次，它们应该有相同的结果。


## useId

为辅助功能属性生成唯一 ID。

HTML 辅助功能属性，例如 aria-describedby 允许指定两个相关联的属性。例如，可以指定一个 input 由另一个 p 描述。

```html
<label>
  Password:
  <input type="password" aria-describedby="password-hint"/>
</label>
<p id="password-hint">
  The password should contain at least 18 characters
</p>
```

但是，像这样的固定 ID 在组件化中会导致多个组件重复 id，使用 useId 生成唯一属性 ID 避免这个问题

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        <input type="password" aria-describedby={passwordHintId}/>
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}
```