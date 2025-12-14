import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import contactImg from "../assets/contact3.jpeg";
import Footer from "./Footer";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_350emm9",
        "template_dtnob6i",
        form.current,
        "R-r5ZlXkZyqmCTCs0"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <>
    <section
      id="contact"
      className="relative w-full min-h-screen text-white py-16 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${contactImg})`,
          filter: "brightness(70%)",
        }}
      />

      {/* Foreground */}
      <div className="relative z-10 text-center max-w-lg w-full px-6">
        <h2 className="text-4xl font-bold mb-2">Get In Touch</h2>
        <div className="w-16 h-1 bg-cyan-400 mx-auto mb-4"></div>

        <p className="text-gray-300 mb-8">
          Have a sweet project in mind or just want to say hi? <br />
          Feel free to send me a message!
        </p>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">NAME</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 py-2 text-white"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">EMAIL</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 py-2 text-white"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">SUBJECT</label>
            <input
              type="text"
              name="subject"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 py-2 text-white"
            />
          </div>

          <div className="text-left mb-0">
            <label className="block text-sm font-semibold mb-1">MESSAGE</label>
            <textarea
              name="message"
              rows="2"
              required
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 py-2 resize-none text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 border border-cyan-400 text-cyan-400 px-6 py-2 font-semibold hover:bg-cyan-400 hover:text-black transition-all"
          >
            SEND MESSAGE
          </button>

          {status && <p className="mt-3 text-sm text-gray-300">{status}</p>}
        </form>
      </div>

 

    </section>

     <Footer/>

</>   
  );
}
