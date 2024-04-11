import React, { StrictMode, useState, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    NavLink,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./main.css";

import translate from "./translations";

const random = (max = 10, min = 1) =>
    Math.floor(Math.random() * (max - min) + min);

const problems = () =>
    Array(20)
        .fill()
        .map(() => {
            const operation = ["+", "-", "×"][random(3)];
            const numbers = [random(10), random(10)];

            let a = 0;
            let b = 0;
            let result = 0;

            switch (operation) {
                case "+":
                    [a, b] = numbers;
                    result = a + b;
                    break;
                case "-":
                    a = Math.max(...numbers);
                    b = Math.min(...numbers);
                    result = a - b;
                    break;
                case "×":
                    [a, b] = numbers;
                    result = a * b;
                    break;
            }
            let options = Array(10)
                .fill(result)
                .map((x) => x + random(5, -3))
                .filter((x) => x >= 0)
                .filter((e, i, a) => !a.slice(0, i).includes(e))
                .slice(0, 4);

            if (!options.includes(result)) {
                options.push(result);
                options = options.sort(() => Math.random() >= 0.5);
            }

            return {
                problem: `${a} ${operation} ${b} = ...`,
                result,
                options,
            };
        });

const Game = ({ lang, score, setScore }) => {
    const allProblems = problems();

    const [text, setText] = useState(allProblems[score].problem);
    const [result, setResult] = useState(allProblems[score].result);
    const [options, setOptions] = useState(allProblems[score].options);

    const answer = (cond) => {
        if (cond) {
            setText(translate(lang, "good"));
            setScore(score + 1);
        } else {
            setText(translate(lang, "bad"));
        }

        setTimeout(() => {
            const allProblems = problems();
            setText(allProblems[score].problem);
            setResult(allProblems[score].result);
            setOptions(allProblems[score].options);
        }, 1000);
    };

    return (
        <>
            <p>{text}</p>
            <ul>
                {options.map((o, i) => (
                    <li key={i}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                answer(o === result);
                            }}
                        >
                            {o}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

const App = () => {
    const [start, setStart] = useState(true);
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(false);

    const langParam = useParams();
    const lang = langParam.lang || "ro";

    const doStart = (e) => {
        e.preventDefault();
        setStart(false);
    };

    const restart = (e) => {
        e.preventDefault();
        setScore(0);
        setStart(true);
    };

    useEffect(() => {
        setEnd(score == 10);
    }, [score]);

    return (
        <>
            <main className={end ? "win" : null}>
                {start ? (
                    <>
                        <p>{translate(lang, "quest")}</p>
                        <p>
                            <button onClick={doStart}>
                                {translate(lang, "start")}
                            </button>
                        </p>
                    </>
                ) : null}
                {!start && !end ? (
                    <Game lang={lang} score={score} setScore={setScore} />
                ) : null}
                {end ? (
                    <>
                        <p>{translate(lang, "win")}</p>
                        <button onClick={restart}>
                            {translate(lang, "restart")}
                        </button>
                    </>
                ) : null}
            </main>
            <nav>
                <NavLink
                    to="/ro"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Română
                </NavLink>
                <NavLink
                    to="/en"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    English
                </NavLink>
                <NavLink
                    to="/es"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Español
                </NavLink>
            </nav>
        </>
    );
};

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:lang" element={<App />} />
        </Routes>
    </BrowserRouter>
);
