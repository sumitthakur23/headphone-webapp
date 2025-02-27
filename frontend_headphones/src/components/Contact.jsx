import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            Have questions? We’re here to help. Reach out to us through any of the methods below.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-4">
              We’d love to hear from you! Contact us using the details below.
            </p>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <span className="text-green-600 text-xl">
                  <i className="fas fa-phone-alt"></i>
                </span>
                <p className="text-gray-800">
                  <span className="font-medium">Phone:</span>{" "}
                  <a href="tel:+919876543210" className="hover:text-green-600">
                    +91-9876543210
                  </a>
                </p>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-xl">
                  <i className="fas fa-envelope"></i>
                </span>
                <p className="text-gray-800">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:support@headphonestore.com"
                    className="hover:text-blue-600"
                  >
                    sumit370thakur@gmail.com
                  </a>
                </p>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-4">
                <span className="text-red-600 text-xl">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <p className="text-gray-800">
                  <span className="font-medium">Address:</span> 123 IT Tech Park,
                  Chandigarh, India
                </p>
              </div>
              {/* Social Media */}
              <div>
                <p className="font-medium text-gray-800 mb-2">Follow Us:</p>
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 text-2xl"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-600 text-2xl"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="text-pink-600 hover:text-pink-800 text-2xl"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="text-blue-700 hover:text-blue-900 text-2xl"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Visit Us
            </h2>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.574614292053!2d76.8037723154437!3d30.72793498163564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feefb1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIT%20Park%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1633097236125!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
            <p className="text-gray-600 mt-4">
              Drop by our office for assistance or to explore our products in person!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
