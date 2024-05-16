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
  const animationIdRef = useRef<number>();
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    let w: number, h: number, nt: number, i: number, x: number;
    let ctx: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement | null;

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

    const init = () => {
      canvas = canvasRef.current;
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
      nt = 0;
      window.onresize = function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        ctx!.filter = `blur(${blur}px)`;
      };
      render();
    };

    const waveColors = colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (i = 0; i < n; i++) {
        ctx!.beginPath();
        ctx!.lineWidth = waveWidth || 50;
        ctx!.strokeStyle = waveColors[i % waveColors.length];
        for (x = 0; x < w; x += 5) {
          var y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx!.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
        }
        ctx!.stroke();
        ctx!.closePath();
      }
    };

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    init();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [colors, backgroundFill, blur, noise, speed, waveOpacity, waveWidth]);

  useEffect(() => {
    // Detect Safari browser
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

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
