'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
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
        <nav className="sticky top-0 w-full z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-cyan/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold neon-text">
                            R1PP<span className="text-cyber-magenta">3R</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-3 py-2 text-sm font-medium text-cyber-cyan hover:text-cyber-magenta transition-colors duration-300 relative group"
                                >
                                    {item.name}
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-magenta group-hover:w-full transition-all duration-300"
                                        initial={{ width: '0%' }}
                                        whileHover={{ width: '100%' }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-cyber-cyan hover:text-cyber-magenta focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="h-6 w-6 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                                <span className={`h-0.5 w-full bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
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