import React from "react";
import Container from "./Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden rounded-3xl group">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      </div>

      <Container className="relative h-full flex flex-col justify-center gap-6 px-12">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-xs font-bold tracking-widest uppercase rounded-full border border-white/20">
            Season Sale 2026
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
            Discover the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Future of Style
            </span>
          </h1>
          <p className="text-xl text-zinc-300 font-medium max-w-lg leading-relaxed">
            Curated collections from global designers, delivered with speed and care. Experience a marketplace built for you.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/category/all"
              className="px-8 py-4 bg-white text-darkColor font-bold rounded-2xl flex items-center gap-2 hover:bg-zinc-100 hoverEffect"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-zinc-800/50 text-white font-bold rounded-2xl border border-white/20 hover:bg-zinc-800 hoverEffect"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Container>

      {/* Visual Element - Mockup of product or abstract shape */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block select-none pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
