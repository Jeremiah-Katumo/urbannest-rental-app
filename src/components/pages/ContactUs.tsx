
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get in touch</h2>
          <p className="mt-4 text-lg text-gray-500">Our dedicated support team is here to help 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First name</label>
                  <input type="text" required className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last name</label>
                  <input type="text" required className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" required className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea rows={4} required className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="w-full inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Email us</p>
                  <p className="text-sm text-gray-500">support@urbannest.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Phone className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Call us</p>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Visit us</p>
                  <p className="text-sm text-gray-500">123 Reality Drive, Suite 400<br />San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Want to list your property?</h3>
              <p className="text-indigo-100 mb-6">Our agents can help you maximize your ROI with our premium management services.</p>
              <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors w-full">
                Join as Landlord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
