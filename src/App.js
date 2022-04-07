import { useEffect, useState } from "react";
import CuppaVideo from "./video/cuppa.mp4";
import Logo from "./Logo.png";
import "./style.css";

import startFirebase from "./firebase";
import { Timestamp } from "firebase/firestore";

// firestore
// import { db } from "./firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";

// real-time
import { ref, set } from "firebase/database";

const App = () => {
    // const slogan = ["dublin is ", "xyz is ", "abc is "];

    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState(false);
    const [db, setDb] = useState(null);

    const feedbackBtnHandler = () => {
        if (feedback !== "") {
            console.log("okay");
            setToggle(true);
        }
    };

    const emailBtnHandler = async () => {
        // firestore
        // try {
        //     const docRef = await addDoc(collection(db, "feedback"), {
        //         message: feedback,
        //         email: email,
        //         created: Timestamp.now(),
        //     });
        //     // onClose()
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (err) {
        //     console.log(err);
        // }

        // real-time
        
        const datetime = Date().toLocaleString();

        set(ref(db, "feedback/"+datetime), {
            message: feedback,
            email: email,
            created: new Date().toLocaleString(),
        })
            .then(() => {
                console.log("data added successfully.");
                setToggle(false);
                setFeedback("");
                setEmail("");
            })
            .catch((err) => {
                console.log("[Error] ", err);
            });
    };

    useEffect(() => {
        setDb(startFirebase());
    }, []);

    return (
        <div id="home">
            <video id="video" autoPlay loop muted>
                <source src={CuppaVideo} type="video/mp4" />
            </video>

            <div id="logo">
                <div id="slogan">
                    <h1 id="sloganText" className="flip-animate" target="_blank">
                        Template<span data-hover="Flip">Flip</span>
                    </h1>
                    {/* {slogan.map((item) => {
                        return
                    })} */}
                </div>
                <img id="logoImg" src={Logo} alt="logo" />

                <div id="contact">
                    {toggle ? (
                        <>
                            <input
                                id="inputBox"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                placeholder="enter your email"
                            />
                            <button id="sendBtn" onClick={emailBtnHandler}>
                                Send
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                id="inputBox"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                type="text"
                                placeholder="Drop message"
                            />
                            <button id="sendBtn" onClick={feedbackBtnHandler}>
                                Go
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
