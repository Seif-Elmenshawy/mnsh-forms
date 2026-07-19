import FloatingDots from "../components/Floating-BG/Floating";
import Nav from "../components/Nav/Nav";
import { motion } from "motion/react";

const Dashboard = () => {
  const createdForms = 10
  const responses = 200
  const respondedTo = 30
  return (
    <div className="my-5 flex w-full flex-col items-center justify-start">
      <Nav current="home" />
      <div className="bg-tomato brutal-shadow-nav brutal-border-heavy my-10 flex w-[calc(100%-2.5rem)] flex-col items-start justify-center p-5">
        <h1 className="font-heading mb-10 text-4xl font-bold">Overview</h1>
        <div id="first-row" className="flex w-full flex-row justify-around">
          <motion.div
            whileHover={{
              x: -10,
              y: -10,
            }}
            transition={{ duration: 0.15 }}
            className="bg-maroon gap-7 brutal-shadow brutal-border-sharp flex h-64 w-3xs flex-col items-center justify-center px-7 py-1 text-wrap"
          >
            <h2 className="text-cream font-heading text-center text-xl font-bold">
              Total Forms Created
            </h2>
            <h1 className="text-cream font-bold font-body text-5xl">{createdForms}</h1>
          </motion.div>
          <motion.div 
            whileHover={{
              x:-10,
              y:-10
            }}
            transition={{duration:0.15}}
            className="bg-coral-pink gap-7 brutal-shadow brutal-border-sharp flex h-64 w-3xs flex-col items-center justify-center px-4 py-1 text-wrap"
          >
            <h2 className="font-heading text-center text-xl font-bold">
              Total responses gained
            </h2>
            <h1 className="text-ink font-bold font-body text-5xl">{responses}</h1>
          </motion.div>
          <motion.div
            whileHover={{
              x:-10,
              y:-10
            }}
            transition={{duration:0.15}}
            className="bg-burnt-orange gap-7 brutal-shadow brutal-border-sharp text wrap flex h-64 w-3xs flex-col items-center justify-center px-4 py-1"
          >
            <h2 className="font-heading text-center text-xl font-bold">
              Total forms you responded to
            </h2>
            <h1 className="text-ink font-body font-bold text-5xl">{respondedTo}</h1>
          </motion.div>
        </div>
        <div id="second-row">
          
        </div>
      </div>
      <FloatingDots count={120} />
    </div>
  );
};

export default Dashboard;
