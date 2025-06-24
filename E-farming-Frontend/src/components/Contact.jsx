// src/components/Contact.jsx
import React, { useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a placeholder)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-green-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">

        {/* Contact Info */}
        <div className="bg-green-100 p-8 flex flex-col justify-center space-y-4 text-green-800 text-sm">
          <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-lg" />
            <span>bhuvanbhaskardeo@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-lg" />
            <span>Ranchi, Jharkhand, India</span>
          </div>
          <div className="flex items-center gap-3">
            <FaGithub className="text-lg" />
            <a
              href="https://github.com/bhuvanbhaskardeo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/bhuvanbhaskardeo
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaLinkedin className="text-lg" />
            <a
              href="https://linkedin.com/in/bhuvanbhaskardeo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/bhuvanbhaskardeo
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
