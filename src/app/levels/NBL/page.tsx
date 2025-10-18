"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Matter from "matter-js";
import BadgeToast from "@/components/Badges/BadgeToast";
import { Animate, FadeLeft, transition } from "@/Animation";
import { useUser } from "@clerk/nextjs";

const NBLSimulation = () => {
  const { user } = useUser();
  const [weight, setWeight] = useState<number>(0);
  const [buoyantForce, setBuoyantForce] = useState<number>(0);
  const [netForce, setNetForce] = useState<number>(0);
  const [gearAdjustment, setGearAdjustment] = useState<number>(0);
  const [status, setStatus] = useState<string>("Enter your weight to start");
  const [isStatusBad, setIsStatusBad] = useState<boolean>(false);
  const [taskUnlocked, setTaskUnlocked] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const netForceRef = useRef<number>(0);
  const enginesRef = useRef<{
    engine: Matter.Engine;
    render: Matter.Render;
    runner: Matter.Runner;
  } | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toast, setToast] = useState<string>("");

  const IMAGE_URLS = {
    avatar: "/Person.png",
    ground: "/Water.jpg",
    tool: "/Person.png",
    hatch: "/Water.jpg",
  };

  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  const densityWater = 1000;
  const gravity = 9.81;
  const averageHumanDensity = 985;

  useEffect(() => {
    if (weight > 0) {
      const volume = weight / averageHumanDensity;
      const f_b = densityWater * gravity * volume;
      setBuoyantForce(f_b);
      const weightForce = weight * gravity;
      const net = weightForce - f_b - gearAdjustment;
      setNetForce(net);
      netForceRef.current = net;

      if (Math.abs(net) < 10) {
        setStatus("Balance achieved! Task unlocked");
        setTaskUnlocked(true);
      } else if (net > 0) {
        setStatus(" You're sinking — add floaties!");
        setTaskUnlocked(false);
        setIsStatusBad(true);
      } else {
        setStatus(" You're floating — add weights!");
        setIsStatusBad(true);
        setTaskUnlocked(false);
      }
    }
  }, [weight, gearAdjustment]);

  useEffect(() => {
    const loadImages = async () => {
      for (const [key, url] of Object.entries(IMAGE_URLS)) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          imagesRef.current[key] = img;
        };
        img.src = url;
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (canvasRef.current && weight > 0) {
      const engine = Matter.Engine.create({ gravity: { y: 0.1 } });
      const render = Matter.Render.create({
        canvas: canvasRef.current,
        engine: engine,
        options: {
          width: 600,
          height: 400,
          wireframes: false,
          background: "#00BFFF",
        },
      });

      Matter.World.add(engine.world, [
        Matter.Bodies.rectangle(300, 400, 600, 50, {
          isStatic: true,
          render: { fillStyle: "#4682B4" },
        }),
        Matter.Bodies.rectangle(300, 0, 600, 50, { isStatic: true }),
        Matter.Bodies.rectangle(0, 200, 50, 400, { isStatic: true }),
        Matter.Bodies.rectangle(600, 200, 50, 400, { isStatic: true }),
      ]);

      const avatar = Matter.Bodies.circle(300, 200, 20, {
        density: 0.001,
        restitution: 0.5,
        render: { fillStyle: "#FFD700" },
      });
      Matter.World.add(engine.world, avatar);

      Matter.Events.on(engine, "beforeUpdate", () => {
        const forceScale = -netForceRef.current / 10;
        Matter.Body.applyForce(avatar, avatar.position, {
          x: 0,
          y: forceScale,
        });
      });

      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Matter.World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

      enginesRef.current = { engine, render, runner };

      let tool: Matter.Body | null = null;
      let hatch: Matter.Body | null = null;

      if (taskUnlocked) {
        tool = Matter.Bodies.rectangle(100, 300, 20, 20, {
          isStatic: false,
          render: { fillStyle: "#FF4500" },
        });
        hatch = Matter.Bodies.rectangle(500, 300, 30, 30, {
          isStatic: true,
          render: { fillStyle: "#808080" },
        });
        Matter.World.add(engine.world, [tool, hatch]);

        Matter.Events.on(engine, "collisionStart", (event) => {
          const pairs = event.pairs;
          pairs.forEach((pair) => {
            if (
              (pair.bodyA === tool && pair.bodyB === hatch) ||
              (pair.bodyA === hatch && pair.bodyB === tool)
            ) {
              setStatus("Task Completed");
              setIsStatusBad(false);
              Add("NBL");
              console.log("Task complete!");
            }
          });
        });
      }

      const Add = async (newBadge: string) => {
        try {
          const response = await fetch("/api/badge", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newBadge, fullName: user?.fullName }),
          });

          const data = await response.json();

          if (data.error) {
            console.error("Badge already exists:", data.error);
            setShowToast(false);
            return;
          }

          setShowToast(true);
          setToast(newBadge);
        } catch (error) {
          console.error("Error fetching badges:", error);
          setShowToast(false);
        }
      };
      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      };
    }
  }, [weight, taskUnlocked]);

  const addWeight = () => {
    setGearAdjustment((prev) => prev - 10);
  };

  const addFloatie = () => {
    setGearAdjustment((prev) => prev + 10);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="!pt-24 lg:!pt-20 p-6 min-h-screen flex flex-col items-center"
    >
      <h1 className="text-4xl font-bold mb-2">Buoyancy Simulation</h1>
      <p className=" my-8">
        Enter your weight and try to achieve perfect balance!
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 my-10 w-full max-w-6xl">
        <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-b from-white/3 to-white/2/0 w-full lg:w-96">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Your weight (kg):
            </label>
            <input
              type="number"
              placeholder="Enter your weight"
              onChange={(e) => {
                const newWeight = parseFloat(e.target.value) || 0;
                setWeight(newWeight);
              }}
              className="w-full mb-4 p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={addWeight}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-3 rounded-lg transition transform hover:scale-105"
            >
              Add Weight (-10N)
            </button>
            <button
              onClick={addFloatie}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-lg transition transform hover:scale-105"
            >
              Add Floatie (+10N)
            </button>
          </div>

          <div className="bg-gradient-to-b from-white/3 to-white/2/0  p-4 rounded-lg mb-4">
            <p className="mb-3 text-sm">
              <span className="font-bold">Buoyant Force:</span>{" "}
              <span className="text-blue-600 font-bold text-lg">
                {buoyantForce.toFixed(2)}
              </span>{" "}
              N
            </p>
            <p className="text-sm">
              <span className="font-bold">Net Force:</span>{" "}
              <span className="text-blue-600 font-bold text-lg">
                {netForce.toFixed(2)}
              </span>{" "}
              N
            </p>
          </div>

          <div
            className={`bg-gradient-to-r ${
              isStatusBad
                ? "from-red-500 to-red-600"
                : "from-blue-500 to-blue-600"
            }  p-4 rounded-lg  text-center`}
          >
            <div className="text-lg font-bold !text-white">{status}</div>
          </div>
        </div>
        <AnimatePresence>
          {weight > 0 && (
            <motion.div
              {...Animate}
              {...FadeLeft}
              {...transition}
              className="p-6 rounded-2xl shadow-2xl bg-gradient-to-b from-white/3 to-white/2/0 w-full lg:w-auto"
            >
              <canvas
                ref={canvasRef}
                className="w-full border-4 border-white/5 bg-gradient-to-b from-white/3 to-white/2/0  rounded-lg shadow-md mb-4"
              />
              {taskUnlocked && (
                <div className="  border-2 border-green-500 p-4 rounded-lg text-center">
                  <div className="text-white font-bold">
                    Drag the orange tool into the gray slot!
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BadgeToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="New Badge Earned!"
        message={`You unlocked ${toast}`}
      />
    </motion.section>
  );
};

export default NBLSimulation;
