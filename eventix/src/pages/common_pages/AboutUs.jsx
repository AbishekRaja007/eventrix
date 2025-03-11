import React from "react";
import user1 from "../../assets/images/user1.avif";
import user2 from "../../assets/images/user4.png";
import user3 from "../../assets/images/user5.jpg";
import user4 from "../../assets/images/user6.jpg";
import user5 from "../../assets/images/user6.png";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: user1,
  },
  {
    name: "Jane Smith",
    role: "Chief Technology Officer",
    image: user2,
  },
  {
    name: "David Brown",
    role: "Head of AI & ML",
    image: user3,
  },
  {
    name: "Emily Johnson",
    role: "Blockchain Lead",
    image: user4,
  },
  {
    name: "Michael Lee",
    role: "Software Architect",
    image: user5,
  },
];

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* About Us Section */}
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-cyan-700 hover:text-cyan-800 mb-6">
          Innovating the Future with AI, ML, & Blockchain
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At <strong>ECODERS</strong>, we specialize in cutting-edge solutions
          powered by Artificial Intelligence (AI), Machine Learning (ML), and
          Blockchain. Our mission is to build intelligent, secure, and scalable
          applications that revolutionize businesses across industries.
        </p>
      </div>

      {/* What We Do Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border border-gray-300 rounded-lg shadow">
          <h3 className="text-xl font-bold text-cyan-700 hover:text-cyan-800">
            AI & ML Solutions
          </h3>
          <p className="text-gray-600 mt-2">
            Predictive analytics, computer vision, NLP chatbots, and more.
          </p>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg shadow">
          <h3 className="text-xl font-bold text-cyan-700 hover:text-cyan-800">
            Blockchain Development
          </h3>
          <p className="text-gray-600 mt-2">
            Secure smart contracts, DeFi apps, decentralized identity solutions.
          </p>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg shadow">
          <h3 className="text-xl font-bold text-cyan-700 hover:text-cyan-800">
            Custom Software
          </h3>
          <p className="text-gray-600 mt-2">
            Scalable web & mobile applications tailored to your business needs.
          </p>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-cyan-700 hover:text-cyan-800">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Our team consists of industry experts dedicated to innovation.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg  shadow hover:shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-cyan-700 hover:text-cyan-800">
          Join Us in Shaping the Future!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          If you're passionate about AI, ML, and Blockchain, let's build the
          future together.
        </p>
        <div className="mt-4">
          <a
            href="/contact-us"
            className="flex-none rounded-md bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-cyan-600 hover:via-teal-600 hover:to-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
