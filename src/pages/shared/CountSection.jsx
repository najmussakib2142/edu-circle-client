import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaGlobe } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Advanced Tilt Card Component ---
const TiltCard = ({ children, isVisible }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      className="relative group h-full"
    >
      {children}
    </motion.div>
  );
};

const CountSection = () => {
  const [stats, setStats] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch("https://edu-circle-server-seven.vercel.app/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  const statsData = stats ? [
    { icon: <FaGraduationCap />, value: stats.students, label: "Learners", sub: "Worldwide joining", color: "bg-blue-500" },
    { icon: <FaChalkboardTeacher />, value: stats.instructors, label: "Mentors", sub: "Industry experts", color: "bg-indigo-600" },
    { icon: <FaBookOpen />, value: stats.courses, label: "Courses", sub: "Hand-picked content", color: "bg-fuchsia-600" },
    { icon: <FaGlobe />, value: stats.partners, label: "Partners", sub: "Leading institutions", color: "bg-emerald-500" },
  ] : [];

  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-white dark:bg-[#020617]">
      {/* Background Decor: Grid and Radial Glow */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' fill='none' stroke='black' stroke-width='1'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] dark:bg-[#020617] blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div className="text-start md:text-left max-w-2xl">
            <h2 className="text-indigo-600 font-bold tracking-tighter text-lg mb-2 italic">Our Momentum</h2>
            <h1 className="text-3xl pb-3 md:text-5xl font-black text-gray-900 dark:text-white leading-[0.9]">
              Growth that 
            </h1>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-[0.9]">
              speaks <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">for itself.</span>
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs text-sm border-l-2 border-indigo-500 pl-4">
            Real-time data synced with our global learning infrastructure.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {!stats ? (
            [...Array(4)].map((_, i) => <div key={i} className="h-64 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse" />)
          ) : (
            statsData.map((stat, index) => (
              <TiltCard key={index} isVisible={inView}>
                <div className="h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm py-8 px-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-start text-left relative overflow-hidden group">
                  
                  {/* Mouse Follow Glow Effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className={`p-3 rounded-xl text-white mb-6 shadow-lg ${stat.color} scale-110`}>
                    {stat.icon}
                  </div>

                  <div className="mt-auto">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <div className="text-5xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
                      <CountUp end={stat.value} duration={3} delay={index * 0.1} separator="," />
                      <span className="text-indigo-500 text-3xl">+</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-2 italic">{stat.sub}</p>
                  </div>
                </div>
              </TiltCard>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CountSection;