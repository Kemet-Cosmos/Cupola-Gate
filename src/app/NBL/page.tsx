// pages/nbl-simulation.tsx
"use client"
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';

const NBLSimulation = () => {
  const [weight, setWeight] = useState<number>(0); // User weight in kg
  const [buoyantForce, setBuoyantForce] = useState<number>(0);
  const [netForce, setNetForce] = useState<number>(0);
  const [gearAdjustment, setGearAdjustment] = useState<number>(0); // Positive for floaties (up), negative for weights (down)
  const [status, setStatus] = useState<string>('Enter your weight to start');
  const [taskUnlocked, setTaskUnlocked] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const netForceRef = useRef<number>(0);

  // Constants
  const densityWater = 1000; // kg/m³
  const gravity = 9.81; // m/s²
  const averageHumanDensity = 985; // kg/m³ (approx for buoyancy calc)

  // Calculate buoyancy on weight change or gear adjustment
  useEffect(() => {
    if (weight > 0) {
      const volume = weight / averageHumanDensity; // m³
      const f_b = densityWater * gravity * volume; // Buoyant force (N)
      setBuoyantForce(f_b);
      const weightForce = weight * gravity; // Downward force (N)
      const net = weightForce - f_b - gearAdjustment; // Net force (positive = sinking)
      setNetForce(net);
      netForceRef.current = net; // Update ref for physics
      if (Math.abs(net) < 10) { // Threshold for "neutral"
        setStatus('Neutral Buoyancy Achieved! Task Unlocked.');
        setTaskUnlocked(true);
      } else if (net > 0) {
        setStatus('Sinking - Add floaties!');
        setTaskUnlocked(false);
      } else {
        setStatus('Floating - Add weights!');
        setTaskUnlocked(false);
      }
    }
  }, [weight, gearAdjustment]);

  // Matter.js physics simulation (create once on mount)
  useEffect(() => {
    if (canvasRef.current) {
      const engine = Matter.Engine.create({ gravity: { y: 0.1 } }); // Even lower gravity for slower sink/float
      const render = Matter.Render.create({
        canvas: canvasRef.current,
        engine: engine,
        options: { width: 600, height: 400, wireframes: false, background: '#00BFFF' }, // Blue water background
      });

      // Pool boundaries
      Matter.World.add(engine.world, [
        Matter.Bodies.rectangle(300, 400, 600, 50, { isStatic: true, render: { fillStyle: '#4682B4' } }), // Bottom
        Matter.Bodies.rectangle(300, 0, 600, 50, { isStatic: true }), // Top
        Matter.Bodies.rectangle(0, 200, 50, 400, { isStatic: true }), // Left
        Matter.Bodies.rectangle(600, 200, 50, 400, { isStatic: true }), // Right
      ]);

      // Avatar body (user)
      const avatar = Matter.Bodies.circle(300, 200, 20, { 
        density: 0.001, 
        restitution: 0.5, // Bouncy for fun
        render: { fillStyle: '#FFD700' } // Yellow avatar
      });
      Matter.World.add(engine.world, avatar);

      // Simulate buoyancy (apply force based on netForceRef)
      Matter.Events.on(engine, 'beforeUpdate', () => {
        const forceScale = -netForceRef.current / 10; // Increased scale for more visible movement
        Matter.Body.applyForce(avatar, avatar.position, { x: 0, y: forceScale });
      });

      // Add mouse interaction for dragging avatar or tools
      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
      });
      Matter.World.add(engine.world, mouseConstraint);
      render.mouse = mouse; // Ensure mouse works with render

      // Run the engine
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

// Task bodies (add dynamically when unlocked)
      let tool: Matter.Body | null = null;
      let hatch: Matter.Body | null = null;
      if (taskUnlocked) {
        tool = Matter.Bodies.rectangle(100, 300, 20, 20, { 
          isStatic: false, 
          render: { fillStyle: '#FF4500' } // Orange tool
        });
        hatch = Matter.Bodies.rectangle(500, 300, 30, 30, { 
          isStatic: true, 
          render: { fillStyle: '#808080' } // Gray hatch
        });
        Matter.World.add(engine.world, [tool, hatch]);

        // Collision detection for task success
        Matter.Events.on(engine, 'collisionStart', (event) => {
          const pairs = event.pairs;
          pairs.forEach(pair => {
            if ((pair.bodyA === tool && pair.bodyB === hatch)  (pair.bodyA === hatch && pair.bodyB === tool)) {
              setStatus('Task Complete! Badge Earned.');
              console.log('Task complete!');
            }
          });
        });
      }

      // Cleanup
      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      };
    }
  }, [taskUnlocked]); // Re-run only when task unlocks to add bodies

  // Adjust gear functions
  const addWeight = () => {
    setGearAdjustment(prev => prev - 10);
  };
  const addFloatie = () => {
    setGearAdjustment(prev => prev + 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-4">NBL Buoyancy Simulation</h1>
      <input
        type="number"
        placeholder="Enter your weight (kg)"
        onChange={(e) => {
          const newWeight = parseFloat(e.target.value)  0;
          setWeight(newWeight);
        }}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex space-x-4 mb-4">
        <button onClick={addWeight} className="bg-red-500 text-white px-4 py-2 rounded">Add Weight (-10N)</button>
        <button onClick={addFloatie} className="bg-green-500 text-white px-4 py-2 rounded">Add Floatie (+10N)</button>
      </div>
      <p className="mb-2">Buoyant Force: {buoyantForce.toFixed(2)} N</p>
      <p className="mb-2">Net Force: {netForce.toFixed(2)} N</p>
      <p className="mb-4 font-bold">{status}</p>
      <canvas ref={canvasRef} className="border border-black mb-4" />
      {taskUnlocked && <p className="mt-4">Drag the orange tool to the gray hatch to repair it!</p>}
    </motion.div>
  );
};

export default NBLSimulation;