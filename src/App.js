import { useEffect, useState } from "react";
// import CuppaVideo from "./video/cuppa.mp4";
import Logo from "./images/1 TRANSPARENT.png";
import LogoBlack from "./images/Logo.png";
import GooglePlay from "./images/google_play.png";
import AppStore from "./images/app_store.png";
import QRCode from "./images/qrchimpX512.png";
import "./style.css";
// import 'font-awesome/css/font-awesome.min.css'

import startFirebase from "./firebase";

// firestore
// import { db } from "./firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";

// real-times
import { ref, set } from "firebase/database";

const App = () => {
    const slogan = ["Dublin is", "Engage Customers Like Never Before with", "Boost revenue with Cuppa"];
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState(false);
    const [db, setDb] = useState(null);
    const [disable, setDisable] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [logoblack, setLogoblack] = useState(false);

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

        set(ref(db, "feedback/" + datetime), {
            message: feedback,
            email: email,
            created: new Date().toLocaleString(),
        })
            .then(() => {
                console.log("data added successfully.");
                setToggle(false);
                setFeedback("");
                setEmail("");
                setShowNotification(true);
                setDisable(true);
            })
            .catch((err) => {
                console.log("[Error] ", err);
            });
    };

    const closeMessage = (e) => {
        const elem = document.getElementById("notification");
        setShowNotification(false);
        elem.classList.add("right");
    };

    const playbackHandler = (e) => {
        if (e.target.currentTime >= 20.75 && e.target.currentTime <= 24.75) {
            setLogoblack(true);
        } else {
            setLogoblack(false);
        }
    };

    useEffect(() => {
        showNotification &&
            setTimeout(() => {
                closeMessage();
            }, 3000);
    }, [showNotification]);

    useEffect(() => {
        setDb(startFirebase());
    }, []);

    return (
        <div id="home">
            <video onTimeUpdate={(e) => playbackHandler(e)} id="video" autoPlay loop muted controls>
                <source src="https://firebasestorage.googleapis.com/v0/b/coffee-loyalty-8f106.appspot.com/o/VID-20220407-WA0001.mp4?alt=media&token=128fe0a7-8b9a-4052-8dd7-9ee27217416c" type="video/mp4" />
            </video>
            {/* <iframe
                id="video"
                src="https://www.youtube.com/embed/YBHQbu5rbdQ"
                title="YouTube video player"
                frameborder="0"
                showinfo="0"
                controls="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe> */}

            <div id="logo">
                <div id="logoDiv">
                    <div className="verticalflip"> 
                        {slogan.map((item) => {
                            return <span>{item}</span>;
                        })}
                     </div>

                    {logoblack ? (
                        <img id="logoImg" src={LogoBlack} alt="logo" />
                    ) : (
                        <img id="logoImg" src={Logo} alt="logo" />
                    )}
                </div>
            </div>
            <div id="contact">
                <div
                    id="notification"
                    style={
                        showNotification
                            ? { marginLeft: "0%", transition: "all 1s" }
                            : { marginLeft: "-100%", transition: "all 1s" }
                    }
                >
                    <span>Message has been sent</span>
                    <span onClick={closeMessage}>
                        <i
                            style={{
                                color: "white",
                                borderRadius: "4px",
                                height: "20px",
                                margin: "0 5px",
                                width: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "red",
                            }}
                            className="fa-solid fa-xmark"></i>
                    </span>
                </div>
                {toggle ? (
                    <>
                        <div
                            style={{
                                marginLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                            }}>
                            <i id="msgIcon" className="fa-regular fa-envelope"></i>
                            <input
                                id="inputBox"
                                disabled={disable ? true : false}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <button id="sendBtn" onClick={emailBtnHandler}>
                            Send
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            style={{
                                marginLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                            }}>
                            <i id="msgIcon" className="fa-regular fa-message"></i>
                            <input
                                id="inputBox"
                                disabled={disable ? true : false}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                type="text"
                                placeholder="Drop Message"
                            />
                        </div>
                        <button
                            disabled={disable ? true : false}
                            id="sendBtn"
                            onClick={feedbackBtnHandler}>
                            Go
                        </button>
                    </>
                )}
            </div>
            <div id="iconLink">
                <h3 id="iconText">
                Cuppa's coffee loyalty program is free for everyone
                5-minute setup, No setup cost, No setup fees 
                </h3>
                <img style={{ height: "200px" }} src={QRCode} alt="" />
                <img src={GooglePlay} alt="" id="btn"/>
                <img src={AppStore} alt="" id="btn" />
            </div>
        </div>
    );
};

export default App;
