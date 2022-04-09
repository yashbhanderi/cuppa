import { useEffect, useState } from "react";
import "./style.css";
import Logo from "./images/1 TRANSPARENT.png";
import LogoBlack from "./images/Logo.png";
import GooglePlay from "./images/google_play.png";
import AppStore from "./images/app_store.png";
import QRCode from "./images/qrchimpX512.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// import startFirebase from "./firebase";

// firestore
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// real-times
// import { ref, set } from "firebase/database";

const App = () => {
    const slogan = ["Dublin is", "Engage Customers Like Never Before with", "Boost revenue with"];
    const [feedback, setFeedback] = useState("");
    const [toggle, setToggle] = useState(false);
    // const [db, setDb] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [logoblack, setLogoblack] = useState(false);

    const feedbackBtnHandler = () => {
        if (feedback !== "") {
            const datetime = Date().toLocaleString();

            try {
                addDoc(collection(db, 'feedback'), {
                    mobile_number: "+"+feedback,
                    created: datetime,
                });
                setFeedback("");
                setToggle(true);
            } catch (err) {
                console.log(err);
            }

            // set(ref(db, "feedback/" + datetime), {
            //     number: "+" + feedback,
            //     created: new Date().toLocaleString(),
            // })
            //     .then(() => {
            //         console.log("data added successfully.");
            //         setFeedback("");
            //         setToggle(true);
            //     })
            //     .catch((err) => {
            //         console.log("[Error] ", err);
            //     });
        }
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

    // useEffect(() => {
    //     setDb(startFirebase());
    // }, []);

    useEffect(() => {
        const flag = document.getElementsByClassName("flag")[0];
        flag && flag.classList.add("ie");
    });

    return (
        <div className="home">
            <video
                onTimeUpdate={(e) => playbackHandler(e)}
                className="video"
                controls
                autoplay
                unmute
                loop>
                <source
                    src="https://firebasestorage.googleapis.com/v0/b/coffee-loyalty-8f106.appspot.com/o/VID-20220407-WA0001.mp4?alt=media&token=128fe0a7-8b9a-4052-8dd7-9ee27217416c"
                    type="video/mp4"
                />
            </video>

            <div className="logo">
                <div className="logoDiv">
                    <div className="verticalflip">
                        {slogan.map((item) => {
                            return <span>{item}</span>;
                        })}
                    </div>

                    {logoblack ? (
                        <img className="logoImg" src={LogoBlack} alt="logo" />
                    ) : (
                        <img className="logoImg" src={Logo} alt="logo" />
                    )}
                </div>
            </div>
            <div className="contact">
                {toggle ? (
                    <>
                        <div className="thankyouText">Thank you, we'll contact you soon !</div>
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
                            <PhoneInput
                                disableInitialCountryGuess
                                inputStyle={{
                                    color: "white",
                                    textAlign: "left",
                                    height: "60px",
                                    fontSize: "2.3rem",
                                    width: "320px",
                                    background: "none",
                                    border: "none",
                                }}
                                // dropdown menu
                                dropdownStyle={{
                                    color: "black",
                                    textAlign: "left",
                                    bottom: "70px",
                                    border: "none",
                                }}
                                // dropdown button
                                buttonStyle={{
                                    // fontSize: "2.2rem",
                                    width: "40px",
                                    height: "50px",
                                    top: "5px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    border: "none",
                                    background: "none",
                                    marginRight: "5px",
                                }}
                                country="ie"
                                placeholder="Drop your number here :) "
                                value={feedback}
                                onChange={setFeedback}
                            />
                        </div>

                        <i
                            id="sendBtn"
                            onClick={feedbackBtnHandler}
                            className="fa-solid fa-caret-up">
                            <span>Go</span>
                        </i>
                    </>
                )}
            </div>
            <div className="iconLink">
                <button id="scanMeButton">Scan Me</button>
                <img src={QRCode} alt="" className="qrCode" />
                <img src={GooglePlay} alt="" className="btn" />
                <img src={AppStore} alt="" className="btn" />
            </div>
            <div id="footer">
                <h3 className="iconText">
                    Cuppa's coffee loyalty program is free for everyone 5-minute setup, No setup
                    cost, No setup fees
                </h3>
            </div>
        </div>
    );
};

export default App;
