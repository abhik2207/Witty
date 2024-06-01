import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdRefresh } from "react-icons/io";
import { Flip, toast } from 'react-toastify';

const Jokes = () => {
    const [joke, setJoke] = useState("Loading...");
    const [tags, setTags] = useState([]);

    const getJoke = async () => {
        try {
            const response = await fetch("http://localhost:8080/getjoke");
            const data = await response.json();

            const newJoke = data.body;
            setJoke(newJoke);

            setTags(["Funny", ...data.tags]);

            toast.success("Here's a fresh joke for you!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
        catch (err) {
            console.error(err);

            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }

    const tweet = () => {
        window.open("https://twitter.com/intent/tweet?text=" + joke, "Tweet a joke!", "width=1000, height=600");

        toast.success('Twitter opened for you!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
    }

    const copyJoke = async () => {
        await navigator.clipboard.writeText(joke);

        toast.success('Text copied to clipboard!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
    }

    const speakJoke = () => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = joke;
        window.speechSynthesis.speak(speech);

        toast.success("Who wouldn't like litening to a good joke?", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
    }

    useEffect(() => {
        getJoke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="container">
            <div id="display">
                <p>{joke}</p>
            </div>
            <div id="tags">
                <div id="tags-left">
                    <h1>Tags</h1>
                </div>
                <div id="tags-right">
                    {tags.map((tag, index) => (
                        <div className="tag-pill" key={index}>
                            <p>{tag[0].toUpperCase() + tag.slice(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div id="buttons">
                <button className="button" onClick={() => getJoke()}><IoMdRefresh /> New Joke</button>
                <button className="button" onClick={copyJoke}><FaCopy /> Copy</button>
                <button className="button" onClick={speakJoke}><HiSpeakerWave /> Speak</button>
                <button className="button" onClick={tweet}><FaXTwitter /> Tweet</button>
            </div>
        </div>
    )
}

export default Jokes
