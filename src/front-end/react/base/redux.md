# 手写 Redux

首先使用 React Context 实现一个数据传输

```jsx
import React, { useState, useContext } from 'react'

const appContext = React.createContext(null)

export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: 'frank', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}

const 大儿子 = () => <section>大儿子<User/></section>
const 二儿子 = () => <section>二儿子<UserModifier/></section>
const 幺儿子 = () => <section>幺儿子</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>

}

const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    appState.user.name = e.target.value
    setAppState({...contextValue.appState})
  }
  return <div>
    <input value={contextValue.appState.user.name}
      onChange={onChange}/>
  </div>
}
```

## 使用 Redux 思想封装

redux.jsx

```jsx
import React, {useContext, useEffect, useState} from 'react'

export const store = {
  state: {
    user: {name: 'frank', age: 18}
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

export const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state}/>
  }
}

export const appContext = React.createContext(null)
```

App.jsx

```jsx
// 请从课程简介里下载本代码
import React from 'react'
import {appContext, store, connect} from './redux.jsx'

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子执行了 ' + Math.random())
  return <section>大儿子<User/></section>
}

const 二儿子 = () => {
  console.log('二儿子执行了 ' + Math.random())
  return <section>二儿子<UserModifier/></section>
}

const 幺儿子 = () => {
  console.log('幺儿子执行了 ' + Math.random())
  return <section>幺儿子</section>
}

const User = connect(({state, dispatch}) => {
  console.log('User执行了 ' + Math.random())
  return <div>User:{state.user.name}</div>
})

const UserModifier = connect(({dispatch, state, children}) => {
  console.log('UserModifier执行了 ' + Math.random())
  const onChange = (e) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange}/>
    </div>
  )
})
```

## Redux API 的作用

### reducer

reducer 函数用于规范 state 的创建流程。根据 action 的类型，它会返回一个新的状态对象。

### dispatch

dispatch 函数用于规范 setState 的流程。它接受一个 action 对象作为参数，并根据 action 的类型调用 reducer 函数来更新状态。

### connect

connect 函数用于将当前组件与全局状态关联，创建一个组件包裹器。它接受两个参数：`mapStateToProps` 和 `mapDispatchToProps`。

`mapStateToProps` 用于读取全局状态，`mapDispatchToProps` 用于设置全局状态。例如

```js
const userSelector = state => {
  return {user: state.user}
}
const userDispatcher = (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({type: 'updateUser', payload: attrs})
  }
}
export const connectToUser = connect(userSelector, userDispatcher)
```

### subscribe

subscribe 函数用于订阅状态的变化，类似于事件的订阅。
