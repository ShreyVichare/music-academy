"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const init = () => {
      let w: number, h: number, nt: number, i: number, x: number;
      let canvas = canvasRef.current;
      let ctx = canvas?.getContext("2d");
      if (ctx) {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        let animationId: number;

        const getSpeed = () => {
          switch (speed) {
            case "slow":
              return 0.001;
            case "fast":
              return 0.002;
            default:
              return 0.001;
          }
        };

        const drawWave = (n: number) => {
          nt += getSpeed();
          for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = colors ? colors[i % colors.length] : "#38bdf8";
            for (x = 0; x < w; x += 5) {
              var y = noise(x / 800, 0.3 * i, nt) * 100;
              ctx.lineTo(x, y + h * 0.5);
            }
            ctx.stroke();
            ctx.closePath();
          }
        };

        const render = () => {
          ctx.fillStyle = backgroundFill || "black";
          ctx.globalAlpha = waveOpacity || 0.5;
          ctx.fillRect(0, 0, w, h);
          drawWave(5);
          animationId = requestAnimationFrame(render);
        };

        const resizeHandler = () => {
          w = ctx.canvas.width = window.innerWidth;
          h = ctx.canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeHandler);

        render();

        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener("resize", resizeHandler);
        };
      }
    };

    init();
  }, [waveWidth, colors, backgroundFill, waveOpacity, speed, noise]);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
