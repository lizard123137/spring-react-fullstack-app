import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmail("");
        setMessage("");

        console.log(`${email} said "${message}"`);
    }

    return(
        <div className="dark:bg-gray-800 dark:text-white">
            <header className="p-4 md:p-24 bg-gray-200 dark:bg-slate-900 flex flex-col items-center justify-center">
                <h1 className="heading p-10 text-4xl md:text-7xl">Laravel chat</h1>
                <Link
                    to={{
                        pathname: "/login"
                    }}
                    className="btn-secondary w-full md:w-1/3"
                >Start Chatting</Link>
            </header>

            <article className="px-2 py-4 md:px-20">
                <h2 className="sub-heading text-center text-3xl md:text-5xl mb-5">About us</h2>
                <p>
                    Laravel chat is a web application built using the fabulously named <b className="text-green-400">DRIP</b> stack. This particular stack is based on the following technologies:
                </p>
                <ul className="list-disc px-6 md:px-20 py-4">
                    <li>Docker</li>
                    <li>React</li>
                    {/* TODO find dependency that starts with "i" */}
                    <li>i ("i" means "and" in Polish)</li>
                    <li>Php</li>
                </ul>
                <p>
                    I am building this project for one of my collage classes.
                    The assignment specified the following requirements that the project must adhere to:
                </p>
                <ul className="list-disc px-6 md:px-20 py-4">
                    <li>Must contain multiple pages</li>
                    <li>Must implement an authorization system</li>
                    <li>Must be coherent</li>
                    <li>Must follow principles of responsive design</li>
                </ul>
            </article>

            <article className="px-2 py-4 md:px-20">
                <h2 className="sub-heading text-center text-3xl md:text-5xl mb-5">Contact us</h2>
                <form onSubmit={sendEmail} className="flex flex-col gap-3 text-black">
                    <input
                        type="email"
                        placeholder="Your Email address..."
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
                    <textarea
                        placeholder="Your message..."
                        className="textarea"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required/>  
                    <input className="btn-primary" type="submit" value="Register"/>
                </form>
            </article>

            <footer className="bottom-0 p-5 bg-gray-200 dark:bg-slate-900 text-center">
                Created by <a className="text-green-400" href="https://github.com/lizard123137">Michal Gagos</a>
            </footer>
        </div>
    );
}