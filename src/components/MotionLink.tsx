"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export const MotionLink = motion.create(Link);

// Esempio di utilizzo nello stesso file o altrove:
// <MotionLink href="/" whileHover={{ scale: 1.1 }}>Home</MotionLink>