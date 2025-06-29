'use client'
import useBillBoard from "@/hooks/useBillboard";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import PlayButton from "./PlayButton";

const BillBoard = () => {
  const { data } = useBillBoard();
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (titleRef.current && descriptionRef.current && buttonGroupRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      ).fromTo(
        buttonGroupRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }
  }, [data?.title, data?.description]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        src={data?.videoUrl}
        className="w-full h-[56.25vw] object-cover brightness-[80%] absolute top-0 left-0"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 space-y-4">
        <p
          ref={titleRef}
          className="text-white text-2xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl w-[80%] md:w-[70%] lg:w-[60%] leading-tight whitespace-nowrap"
        >
          {data?.title}
        </p>
        <p
          ref={descriptionRef}
          className="text-white text-sm md:text-lg lg:text-xl drop-shadow-lg w-[90%] md:w-[80%] lg:w-[50%]"
        >
          {data?.description}
        </p>

        {/* BUTTON GROUP (Flex Row) */}
        <div
          ref={buttonGroupRef}
          className="flex flex-row items-center space-x-4"
        >
          <button className="px-6 py-2 bg-white/50 text-black font-semibold text-sm md:text-base rounded-md hover:bg-neutral-300 transition shadow-lg">
            View Now
          </button>
          <PlayButton movieId={data?.id} />
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
