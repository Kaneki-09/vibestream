
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Content } from '@/lib/types';
import { motion } from 'framer-motion';

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
<<<<<<< HEAD
    <div className="soft-neumorphism overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-1 active:shadow-inner active:scale-95">
      <div className="relative">
=======
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="soft-neumorphism overflow-hidden group border border-transparent hover:border-primary/20"
    >
      <div className="relative aspect-video overflow-hidden">
>>>>>>> b092b23 ("<!DOCTYPE html>)
        <Link href={`/player/${content.id}`} className="block w-full h-full">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={content.dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>
      <div className="p-5">
        <h3 className="font-black text-xl truncate text-gradient-shiny">{content.title}</h3>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-relaxed opacity-80">{content.caption}</p>
        <div className="mt-6 flex space-x-3">
          <Link href={`/player/${content.id}`} passHref className="flex-1">
<<<<<<< HEAD
            <Button variant="ghost" className="w-full soft-neumorphism-inset text-primary font-semibold hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-none active:scale-95">
                <Play />
=======
            <Button variant="ghost" className="w-full h-12 soft-neumorphism-inset text-primary font-bold hover:text-primary-foreground hover:bg-primary transition-all duration-300 active:scale-95">
                <Play className="fill-current" />
>>>>>>> b092b23 ("<!DOCTYPE html>)
                <span>Play</span>
            </Button>
          </Link>
          <Link href={`/player/${content.id}?search=true`} passHref className="flex-1">
<<<<<<< HEAD
             <Button variant="ghost" className="w-full soft-neumorphism-inset text-primary font-semibold hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300 active:scale-95">
=======
             <Button variant="ghost" className="w-full h-12 soft-neumorphism-inset text-accent font-bold hover:text-accent-foreground hover:bg-accent transition-all duration-300 active:scale-95">
>>>>>>> b092b23 ("<!DOCTYPE html>)
                <Search />
                <span>Vibe</span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
