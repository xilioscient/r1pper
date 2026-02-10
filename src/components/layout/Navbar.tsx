"use client" // <--- QUESTA RIGA È FONDAMENTALE

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#Projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <nav className="sticky top-0 w-full z-50 bg-gradient-to-r from-cyber-purple to-cyber-blue backdrop-blur-md border-b border-cyber-cyan/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-3xl font-extrabold neon-text">
                            R1PP<span className="text-cyber-magenta">3R</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-2 text-lg font-semibold text-cyber-cyan hover:text-cyber-magenta transition-colors duration-300 relative group"
                                >
                                    {item.name}
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-0 h-1 bg-cyber-magenta group-hover:w-full transition-all duration-300"
                                        layoutId="underline"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-cyber-cyan hover:text-cyber-magenta focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyber-magenta"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                transition={{ duration: 0.2 }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-cyber-black/90 border-b border-cyber-cyan/30">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 text-base font-medium text-cyber-cyan hover:text-cyber-magenta transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </nav>
    )
}