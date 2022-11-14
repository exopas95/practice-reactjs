import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");

    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);

    console.log("I run all the time");
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
