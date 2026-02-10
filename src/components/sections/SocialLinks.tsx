import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
// Nota: FaThreads è disponibile nelle versioni più recenti di react-icons/fa6
import { FaThreads } from "react-icons/fa6";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      href: "https://github.com/xilioscient",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      id: 2,
      href: "https://twitter.com/xilioscient",
      icon: FaTwitter,
      label: "Twitter",
    },
    {
      id: 3,
      href: "https://linkedin.com/in/alessandro-faraone",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      id: 4,
      href: "https://instagram.com/dentroilvoid",
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      id: 5,
      href: "https://threads.net/@dentroilvoid",
      icon: FaThreads,
      label: "Threads",
    },
  ];

  return (
    <div className="flex justify-center space-x-6">
      {links.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="text-cyber-neon hover:text-cyber-acid transform hover:scale-110 transition-all duration-300"
        >
          <social.icon className="w-8 h-8" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
