import {useEffect, useRef, useState} from 'react'
import './App.css'
import {ColorBox} from "./components/colorBox.tsx";

export type colorBoxProps = {
    color: string;
}

const App = () => {

    const [nameSurname, setNameSurname] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>('');
    const [surnameInput, setSurnameInput] = useState<string>('');
    const [count, setCount] = useState(0);
    const [colors, setColors] = useState<colorBoxProps[]>([]);
    const [selectedColor, setSelectedColor] = useState("Red");

    const inputRef = useRef<HTMLInputElement>(null);
    const buttonDisableRef = useRef<HTMLButtonElement>(null);

    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);

    const [firstInputText, setFirstInputText] = useState("");
    const [secondInputText, setSecondtInputText] = useState("");

    const [fontSize, setFontSize] = useState(16);

    const goldenDivRef = useRef<HTMLDivElement>(null);
    const goldenDivRefCloned = useRef<HTMLDivElement>(null)
    const cornerDiv = useRef<HTMLDivElement>(null);

    const [cornerDivText, setCornerDivText] = useState("");


    useEffect(() => {
        inputRef.current && inputRef.current.focus();
        setTimeout(disableButton, 5000);

        setSecondCount(100);
        console.log("First Render");
    }, []);

    console.log("Render");

    const disableButton = () => {
        if (buttonDisableRef.current) {
            buttonDisableRef.current.disabled = false;
        }
    }

    const cloneDiv = () => {

        if (!goldenDivRefCloned.current) return;

        const originalDiv = goldenDivRefCloned.current;
        const clonedDiv = originalDiv.cloneNode(true);
        if (originalDiv.parentNode) {
            originalDiv.parentNode.appendChild(clonedDiv);
        }
    }

    return (
        <>
            <section className="container">

                <div className="nameInputContainer">
                    <input
                        type="text"
                        placeholder="Write something..."
                        ref={inputRef}
                        onChange={(e) => setNameInput(e.currentTarget.value)}
                        className="inputField"
                        maxLength={15}
                    />

                    <div className="nameInputContainer__submit-wrapper">
                        <input
                            type="text"
                            placeholder="Write something..."
                            onChange={(e) => setSurnameInput(e.currentTarget.value)}
                            className="inputField"
                            maxLength={15}
                        />
                        <button
                            className="button"
                            onClick={() => {
                                const newArr: string[] = [];
                                newArr.push(nameInput + ' ');
                                newArr.push(surnameInput);
                                inputRef.current && inputRef.current.focus();
                                setNameSurname(newArr);
                            }

                            }
                        >
                            Submit
                        </button>
                    </div>
                </div>


                <p> {nameSurname} </p>

            </section>

            <section className="container">

                <div className="countButtons__wrapper">

                    <button
                        className="button"
                        disabled={true}
                        ref={buttonDisableRef}
                    >
                        Button
                    </button>

                    <button
                        className="button"
                        onClick={() => setCount(count + 2)}
                    >
                        Count: {count}
                    </button>

                    <div className="square">
                        <p> {count * 2} </p>
                    </div>

                </div>

                <div className="colors__wrapper">
                    <div className="colors__dropdown-wrapper">

                        <button
                            className="colors__dropdown-plus"
                            onClick={() => {
                                const clonedColorsArr = [...colors];
                                const newColor: colorBoxProps = {
                                    color: selectedColor
                                }
                                clonedColorsArr.push(newColor);

                                setColors(clonedColorsArr);
                            }}
                        >
                            +
                        </button>

                        <select
                            name="colors"
                            id=""
                            className="colors__dropdown"
                            onChange={(e) => setSelectedColor(e.currentTarget.value)}
                        >
                            <option value="Red"> Red</option>
                            <option value="Green"> Green</option>
                            <option value="Blue"> Blue</option>
                            <option value="White"> White</option>
                            <option value="Black"> Black</option>
                        </select>

                    </div>

                </div>

                <div className="colorContainer">

                    <div className="Red">

                    </div>

                    {colors.map(({color}) => (
                        <ColorBox key={Math.random()} color={color}/>
                    ))}
                </div>

            </section>

            <section className="container">

                <div className="countField">

                    <button
                        className="countField__plus"
                        onClick={() => {
                            setFirstCount(firstCount + 1);
                            console.log("Changing count");
                        }}
                    >
                        +
                    </button>

                    <p> COUNT: {firstCount} </p>

                    <input
                        type="text"
                        className="inputField"
                        maxLength={25}
                        onChange={(e) => {
                            setFirstInputText(e.currentTarget.value);
                            console.log("Input change");
                        }}
                    />

                    <p> {firstInputText} </p>

                </div>

                <div className="countField">

                    <button
                        className="countField__plus"
                        onClick={() => {
                            setSecondCount(secondCount + 1);
                            setFontSize(fontSize + 1);
                            console.log("Changing count");
                        }}
                    >
                        +
                    </button>

                    <p style={{fontSize: `${fontSize}px`}}> COUNT: {secondCount} </p>

                    <input
                        type="text"
                        className="inputField"
                        maxLength={25}
                        onChange={(e) => {
                            document.title = e.currentTarget.value;
                            setSecondtInputText(e.currentTarget.value);
                            console.log("Input change");
                        }}
                    />

                    <p> {secondInputText} </p>

                </div>

            </section>

            <section>

                <div className="goldenDivs">
                    <div
                        ref={goldenDivRef}
                        className="goldenDiv"
                    >
                    </div>

                    <button
                        className="button"
                        onClick={() => {
                            goldenDivRef.current && goldenDivRef.current.classList.add("gold");
                        }}
                    > Change Color
                    </button>

                </div>

                <div className="goldenDivs">
                    <div
                        ref={goldenDivRefCloned}
                        className="goldenDiv"
                    >
                    </div>

                    <button
                        className="button"
                        onClick={() => {
                            cloneDiv();
                        }}
                    > Clone Div
                    </button>

                </div>

                <div className="goldenDivs">

                    <button
                        className="button"
                        onClick={() => {
                            cornerDiv.current && cornerDiv.current.classList.add('absolute');
                            setCornerDivText("Es esmu sturis")
                        }}
                    > Send Div to Corner
                    </button>


                    <div
                        ref={cornerDiv}
                        className="goldenDiv"
                    >

                        <p> {cornerDivText} </p>

                    </div>

                </div>

            </section>
        </>
    )
}

export default App
