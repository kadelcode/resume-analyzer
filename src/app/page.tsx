import Hero from "@/components/Hero";
import Upload from "@/components/Upload";
import ValueProposition from "@/components/ValueProposition";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/patterns/connecting-dots.svg')] bg-[length:80px_80px] bg-fixed">
      <div 
        className="backdrop-blur-xs py-12"
        style={{backdropFilter:'blur(4px)'}}
      >
        {/* Hero Section */}
        <Hero />

        {/* Value Proposition Cards */} 
        <ValueProposition />
        
        {/* Upload Section */}
        <Upload />
      </div>
    </main>
  )
}