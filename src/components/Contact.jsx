import emailjs from "@emailjs/browser";
import React, { useRef } from "react";


export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const contactMessage = document.getElementById('contact-message');
        const button = document.getElementById('submit-button');
        emailjs.sendForm(
            'service_rw122oa',
            'template_a944037',
            form.current,
            'xpY7UemGR-1GYIahJ'
        ).then((result) => {
            contactMessage.textContent = 'Message sent successfully ✅';
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
            button.disabled = true;
            button.value = 'Please reload the page';
            form.current.reset();
        }, (error) => {
            contactMessage.textContent = `Error sending message: ${error.text}`;
            form.current.reset();
        })
    }
    return (
        <section className={"w-full h-full"}>
            <div className={"h-full flex-col lg:flex-row flex gap-10"}>
                <div className={"lg:w-[50%] h-fit w-full flex flex-col text-center md:text-right"}>
                    <h3 className={"text-3xl"}>Contact us</h3>
                    <h1 className={"text-7xl font-black"}>Drop us a line</h1>
                    <p className={"text-2xl opacity-60 m-2"}>Fill out this form and we'll hop straight to it.</p>
                    <h3 className={"text-3xl"}>Disclaimer</h3>
                    <p className={"opacity-60"}>
                        We handle inquiries on a case-by-case basis, promising to give yours the spotlight it deserves. So fire away with questions, ideas, or just a friendly 'hello' - we can't wait to dive into the delicious details!

                    </p>
                </div>
                <div className={"w-full flex flex-col bg-gray-900 rounded-3xl"}>
                    <h1 className={"text-white text-3xl text-center px-4 py-4"}>Send a message</h1>
                    <form className={"px-4 md:px-10 py-4 h-full overflow-auto"} action={""} onSubmit={sendEmail} ref={form}>
                        <div className={"flex-col md:flex-row flex justify-evenly gap-4"}>
                            <div className={"flex flex-col "}>
                                <label className={"text-[#BDBDBD]"} htmlFor={"fname"}>First name</label>
                                <input className={"bg-[#2C2C2C] border-none rounded-lg w-full min-w-32 text-white"} name={"fname"}
                                       placeholder={"Enter first name"}/>
                            </div>
                            <div className={"flex flex-col w-full  "}>
                                <label className={"text-[#BDBDBD]"} htmlFor={"lname"}>Last name</label>
                                <input className={"bg-[#2C2C2C] border-none rounded-lg text-white"} name={"lname"}
                                       placeholder={"Enter last name"}/>
                            </div>
                        </div>
                        <div className={"flex flex-col w-full my-2"}>
                            <label className={"text-[#BDBDBD]"} htmlFor={"email"}>Email address</label>
                            <input className={"bg-[#2C2C2C] border-none rounded-lg text-white"} name={"email"}
                                   placeholder={"Enter email address"}/>
                        </div>
                    <div className={"flex-col flex w-full h-52 gap-2 resize-y"}>
                            <div className={"flex flex-col w-full h-full"}>
                                <label className={"text-[#BDBDBD]"} htmlFor={"message"}>Message</label>
                                <textarea className={"bg-[#2C2C2C] h-full border-none rounded-lg text-white resize-none overflow-auto"} name={"message"}
                                       placeholder={"Enter your message"}/>
                            </div>
                            <button className={"mt-2 px-2 py-2 bg-orange-900 rounded-2xl border-gray-900 border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-300 transition-all text-2xl disabled:bg-gray-400"} id={"submit-button"}>Send</button>
                            <div id={'contact-message'} className={"text-white"}></div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}