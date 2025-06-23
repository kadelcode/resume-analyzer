"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Upload from "@/components/Upload";
import ValueProposition from "@/components/ValueProposition";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/patterns/connecting-dots.svg')] bg-[length:80px_80px] bg-fixed">
      <div 
        className="backdrop-blur-xs"
        style={{
          backdropFilter:'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
      >
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* Value Proposition Cards */} 
        <ValueProposition />
        
        {/* Upload Section */}
        <Upload />

        {/* Testimonial Section */}
        <Testimonials />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}