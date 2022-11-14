# React JS 튜토리얼

본 문서는 노마드코더의 ReactJS 무료 강의인 [ReactJS로 영화 웹 서비스 만들기](https://nomadcoders.co/react-for-beginners)를 기반으로 작성되었다.

## Contents - React Concept Basic

1.  Vanilla JS vs React
2.  React JSX
3.  React State
4.  React Practice - Creating Unit Convertor
5.  Prop
6.  userEffect
7.  Deps

### 1. Vanilla JS vs React

JavaScript는 기본적으로 아래와 같은 순서를 따라서 html에 내용을 전달한다.

1. HTML을 만든다.
2. 태그를 찾는다.
3. 태그 안의 내용을 업데이트 한다.

```html
<html>
    <body>
        <span id="spn">Total clicks: 0</span>
        <button id="btn">Click me</button>
    </body>
    <script>
        let counter = 0;
        const button = document.querySelector("#btn");
        const span = document.querySelector("#spn");
        function handleClick() {
            console.log("I have been clicked");
            counter = counter + 1;
            span.innerText = `Total clicks: ${counter}`;
        }
        button.addEventListener("click", handleClick);
    </script>
</html>
```

하지만 React는 이와 정반대의 방식을 따른다.

1. 업데이트할 내용을 작성한다.
2. 태그를 찾는다.
3. HTML을 만든다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script>
        const root = document.getElementById("root");
        const h3 = React.createElement(
            "h3",
            {
                onMouseEnter: () => {
                    console.log("moulse enter");
                },
            },
            "Hello I'm a span"
        );
        const btn = React.createElement(
            "button",
            {
                onClick: () => console.log("I'm clicked"),
            },
            "Click me"
        );
        const container = React.createElement("div", null, [h3, btn]);
        ReactDOM.render(container, root);
    </script>
</html>
```

### 2. React JSX

위 방식대로 코드를 작성하면 너무 지저분해진다. 이를 해결하기 위해 JSX를 사용해서 코드를 작성한다. JSX를 사용하면 스크립 안에서 컴포넌트를 생성하고 HTML 태그를 리턴할 수 있다. 이때 브라우저는 JSX를 이해하지 못하기 때문에 이를 변환해주는 **Babel**을 사용해야 한다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        const root = document.getElementById("root");
        const Title = () => (
            <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
                Hello I'm a title
            </h3>
        );
        const Button = () => (
            <button
                style={{ backgroundColor: "tomato" }}
                onClick={() => console.log("I'm clicked")}
            >
                CLick me
            </button>
        );
        const Container = () => (
            <div>
                <Title />
                <Button />
            </div>
        ); // 함수 태그는 무조건 대문자로 시작해야 한다.
        ReactDOM.render(<Container />, root);
    </script>
</html>
```

### 3. React State

이제 버튼을 클릭하면 숫자가 계속 증가하는 기능을 구현해본다. 버튼을 누를때마다 숫자가 증가하여야 하는데 브라우저는 이것을 알 수가 없다. 따라서 숫자가 바뀔때마다 렌더링을 계속 다시하면서 늘어난 숫자를 보여주어야한다. 그렇지만 매번 새로운 컴포넌트를 추가할 때마다 렌더링을 위한 함수를 실행시키는건 매우 불편하다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        const root = document.getElementById("root");
        let counter = 0;
        function countUp() {
            counter = counter + 1;
            render();
        }

        function render() {
            ReactDOM.render(<Container />, root);
        }
        const Container = () => (
            <div>
                <h3>Total clicks: {counter}</h3>
                <button onClick={countUp}>Click me</button>
            </div>
        );
        render();
    </script>
</html>
```

이 문제를 해결하기 위해서 등장한 것이 React의 State 구문이다. 리엑트에서는 `state`로 현재 상태를 관리하고 state에 변화가 있는 부분을 `modifier`로 전달하고, modifier를 통해서 변화가 생긴 부분만 렌더링을 하게 된다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        const root = document.getElementById("root");

        function App() {
            const [counter, setCounter] = React.useState(0);
            const onClick = () => {
                //setCounter(counter + 1);
                setCounter((current) => current + 1);
            };
            return (
                <div>
                    <h3>Total clicks: {counter}</h3>
                    <button onClick={onClick}>Click me</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
```

### 4. React Practice - Creating Unit Convertor

앞에서 배운 내용을 토대로 단위 변환기를 만들어 본다. 여기서 주의할 것은, JSX로 selector를 넘길때는 `class`가 아닌 `className`처럼 javascript와는 다른 문법을 사용해서 이를 생성해야 한다. 자세한 내용은 JSX 문서를 살펴보자.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function App() {
            const [amount, setAmount] = React.useState(0);
            const [flipped, setFlip] = React.useState(false);
            const onChange = (event) => {
                setAmount(event.target.value);
            };
            const reset = () => setAmount(0);
            const onFlip = () => {
                setFlip((current) => !current);
                reset();
            };
            return (
                <div>
                    <h1 className="title">Super Convertor</h1>
                    <div>
                        <label htmlFor="minutes">Minutes</label>
                        <input
                            value={flipped ? Math.round(amount * 60) : amount}
                            id="minutes"
                            placeholder="Minutes"
                            type="number"
                            onChange={onChange}
                            disabled={flipped == true}
                        />
                    </div>
                    <div>
                        <label htmlFor="hours">Hours</label>
                        <input
                            value={flipped ? amount : Math.round(amount / 60)}
                            id="hours"
                            placholder="Hours"
                            type="number"
                            onChange={onChange}
                            disabled={flipped == false}
                        />
                    </div>
                    <div>
                        <button onClick={reset}>Reset</button>
                        <button onClick={onFlip}>Filp</button>
                    </div>
                </div>
            );
        }
        const root = document.getElementById("root");
        ReactDOM.render(<App />, root);
    </script>
</html>
```

위 단위 변환기에 거리 단위 변화기를 추가하고, 어떤 단위 변환기를 사용할 것인지 설정할 수 있는 기능까지 구현해본다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function App() {
            const [index, setIndex] = React.useState("xxx");
            const onSelect = (event) => {
                setIndex(event.target.value);
            };
            return (
                <div>
                    <h1>Super Convertor</h1>
                    <select value={index} onChange={onSelect}>
                        <option value="xx">Select your units</option>
                        <option value="0">Minutes & Hours</option>
                        <option value="1">Km & Miles</option>
                    </select>
                    <hr />
                    {index === "xxx" ? "Please select your units" : null}
                    {index === "0" ? <MinutesToHours /> : null}
                    {index === "1" ? <KmToMiles /> : null}
                </div>
            );
        }
        function KmToMiles() {
            return <h3>KM 2 M</h3>;
        }
        function MinutesToHours() {
            const [amount, setAmount] = React.useState(0);
            const [flipped, setFlip] = React.useState(false);
            const onChange = (event) => {
                // console.log(event.target.value)
                setAmount(event.target.value);
            };
            const reset = () => setAmount(0);
            const onFlip = () => {
                setFlip((current) => !current);
                reset();
            };

            // JSX 에서는 문법이 조금 다름
            // class -> class Name, for -> htmlFor 로 바꿔서 넣어주어야 한다.
            // class & for는 javascript 언어이기 때문
            return (
                <div>
                    <div>
                        <label htmlFor="minutes">Minutes</label>
                        <input
                            value={flipped ? Math.round(amount * 60) : amount}
                            id="minutes"
                            placeholder="Minutes"
                            type="number"
                            onChange={onChange}
                            disabled={flipped == true}
                        />
                    </div>
                    <div>
                        <label htmlFor="hours">Hours</label>
                        <input
                            value={flipped ? amount : Math.round(amount / 60)}
                            id="hours"
                            placholder="Hours"
                            type="number"
                            onChange={onChange}
                            disabled={flipped == false}
                        />
                    </div>
                    <div>
                        <button onClick={reset}>Reset</button>
                        <button onClick={onFlip}>Filp</button>
                    </div>
                </div>
            );
        }
        const root = document.getElementById("root");
        ReactDOM.render(<App />, root);
    </script>
</html>
```

### 5. Props

이번엔 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법을 배운다. `App()` 에서 컴포넌트를 호출할 때 인자를 넘겨주게 되면 컴포넌트는 이것을 `props`으로 받게 된다. 이때 `props`는 "One and Only Object" 이기 때문에 여러개를 보내도 하나의 props object에 존재하게 된다. `props`로 인자를 전달받고 `props.text` 등으로 접근하여도 되지만, `{ text }`로 props 인자를 받는 것을 생략하고 데이터를 바로 받는 방법도 존재한다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function Btn(props) {
            return (
                <button
                    style={{
                        backgroundColor: "tomato",
                        color: "white",
                        padding: "10px 20px",
                        border: 0,
                        borderRadius: 10,
                    }}
                >
                    {props.banana}
                </button>
            );
        }
        function App() {
            return (
                <div>
                    <Btn banana="Save Changes" />
                    <Btn banana="Continue" />
                </div>
            );
        }
        const root = document.getElementById("root");
        ReactDOM.render(<App />, root);
    </script>
</html>
```

`props`에는 int, string 등의 value 뿐만 아니라 함수도 전달이 가능하다. 만약 `onClick` 함수를 전달한다고 했을때 커스텀 컴포넌트에 선언한 `onClick`과 html의 이벤트 리스너인 `onClick`은 서로 다르니 유의하자. 웬만하면 혼란스러운 상황을 피하기 위하여 변수명을 html 리스너와 다르게 선언하는 것이 좋다.

`App()`의 state가 바뀌게 되면 App에서 그려지는 모든 컴포넌트들은 리렌더링된다. 그러나 아래 두 번째 Btn의 경우 아무런 값이 바뀌지 않았는데도 렌더링이 다시 되어야 한다. 이를 방지하기 위해서 Memo(memorize) 기능을 사용하면 값이 바뀌지 않은 값은 리렌더링이 되지 않는 것을 볼 수 있다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        function Btn({ text, onClick }) {
            return (
                <button
                    onClick={onClick}
                    style={{
                        backgroundColor: "tomato",
                        color: "white",
                        padding: "10px 20px",
                        border: 0,
                        borderRadius: 10,
                    }}
                >
                    {text}
                </button>
            );
        }
        const MemorizedBtn = React.memo(Btn);
        function App() {
            const [value, setValue] = React.useState("Save Chnages");
            const changeValue = () => setValue("Revert Changes");
            return (
                <div>
                    <MemorizedBtn text={value} onClick={changeValue} />
                    <MemorizedBtn text={value} />
                </div>
            );
        }
        const root = document.getElementById("root");
        ReactDOM.render(<App />, root);
    </script>
</html>
```

### 6. useEffect

state를 적용한 컴포넌트는 매번 값이 바뀔때마다 리렌더링되면서 괄호 안의 모든 내용이 다시 실행된다. 이때 API콜 함수가 컴포넌트 안에 있다면, 굳이 API콜을 하지 않아도 되는 경우에도 값이 바뀔때마다 매번 함수를 실행하게 된다. 이를 방지하기 위하여 useEffect를 사용한다.

useEffect는 두 인자로 이루어져 있으며, 첫 번째 인자는 최초 렌더링에서만 실행하고 싶은 함수명을, 두 번째 인자로는 Dependency array를 입력 받는다.

```javascript
import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
    const [counter, setValue] = useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log("I run all the time");

    const iRunOnlyOnce = () => {
        console.log("I run only once");
    };

    useEffect(iRunOnlyOnce, []);
    useEffect(() => {
        console.log("CALL THE API...");
    }, []);

    return (
        <div>
            <h1>{counter}</h1>
            <button onCLick={onClick}>click me</button>
        </div>
    );
}

export default App;
```

최초 렌더링에서만 실행하고 싶은 경우 이외에도, state별로 구분해서 각기 다르게 렌더링을 하고 싶을 때도 있다. 예를 들어 검색 기능을 만들고 state로 키워드를 업데이트하고 있을 경우, 버튼을 클릭하면 `setValue`가 작동하면서 state에 변화가 일어나고, 이는 모든 state들을 다시 업데이트하게 만든다. 이를 구별해서, `keyword`에 변화가 있을 때, keyword와 관련된 state만 업데이트하고 싶을 경우, 즉 코드의 특정 부분이 변화했고 그 부분만 업데이트하고 싶을 경우 `dependency`를 설정해준다. keyword의 경우 dependency `[keyword]`를 넣어준다.

```javascript
import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");

    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);

    const iRunOnlyOnce = () => {
        console.log("I run only once");
    };

    useEffect(iRunOnlyOnce, []);

    useEffect(() => {
        console.log("CALL THE API...");
    }, []);

    useEffect(() => {
        if (keyword !== "" && keyword.length > 3) {
            console.log("SEARCH FOR", keyword);
        }
    }, [keyword]);

    return (
        <div>
            <input
                value={keyword}
                onChange={onChange}
                type="text"
                placeholder="Search here..."
            />
            <h1>{counter}</h1>
            <button onCLick={onClick}>click me</button>
        </div>
    );
}

export default App;
```

## Content - React App Basic

리엑트 앱을 어떻게 세팅하는지 살펴본다. 먼저 다음 코드를 실행하여 리엑트 앱을 생성한다.

> npx create-react-app { app name }

추가로 props 타입 지정을 위한 prop-types도 설치한다.

> npm install prop-types

이후 불필요한 파일은 삭제하고 컴포넌트별로 프로젝트를 관리한다.

-   컴포넌트 단위로 js파일을 만들고 이를 App.js 에서 import 해서 사용한다.
-   각 컴포넌트의 css는 컴포넌트명.module.css로 만들어서 컴포넌트 단위로 설정할 수 있다.

## Content - React Practice

지금까지 배운 내용들은 모두 Moview App을 구현하면서 적용이 되었다.
추가적으로 라우터간의 이동과 API 호출하는 방법 또한 다루어져 있으니 자세한 내용은 코드를 살펴보길 바란다.
