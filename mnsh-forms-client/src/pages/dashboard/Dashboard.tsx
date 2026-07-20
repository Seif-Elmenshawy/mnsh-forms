import { useEffect, useState } from "react";
import FloatingDots from "../components/Floating-BG/Floating";
import Nav from "../components/Nav/Nav";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";

const MotionLink = motion.create(Link);
const serverUrl = import.meta.env.VITE_SERVER_API;

interface FormItem {
  id: string;
  form_title: string;
  form_description: string | null;
  is_private: Boolean;
  is_published: Boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    createdForms: 10,
    responses: 234,
    respondedTo: 23,
  });
  const [forms, setForms] = useState<FormItem[]>([]);

  const loadData = async () => {
    try {
      const response = await fetch(`${serverUrl}/user/dashboard`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      switch (response.status) {
        case 200:
          setStats({
            createdForms: data.stats[0].forms_created,
            responses: data.stats[0].responses,
            respondedTo: data.stats[0].responded_to,
          });
          setForms(data.forms);
          console.log(forms);
          break;
        case 401:
          navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="my-5 flex w-full flex-col items-center justify-start">
      <Nav current="home" />
      <div className="bg-tomato brutal-shadow-nav brutal-border-heavy my-10 flex w-[calc(100%-2.5rem)] flex-col items-start justify-center px-12 py-5">
        <h1 className="font-heading text-4xl font-bold">Overview</h1>
        <div
          id="first-row"
          className="my-10 flex w-full flex-row items-center justify-between"
        >
          <motion.div
            whileHover={{
              x: -10,
              y: -10,
            }}
            transition={{ duration: 0.15 }}
            className="bg-maroon brutal-shadow brutal-border-sharp flex h-64 w-3xs flex-col items-center justify-center gap-7 px-7 py-1 text-wrap"
          >
            <h2 className="text-cream font-heading text-center text-xl font-bold">
              Total Forms Created
            </h2>
            <h1 className="text-cream font-body text-5xl font-bold">
              {stats.createdForms}
            </h1>
          </motion.div>
          <motion.div
            whileHover={{
              x: -10,
              y: -10,
            }}
            transition={{ duration: 0.15 }}
            className="bg-coral-pink brutal-shadow brutal-border-sharp flex h-64 w-3xs flex-col items-center justify-center gap-7 px-4 py-1 text-wrap"
          >
            <h2 className="font-heading text-center text-xl font-bold">
              Total responses gained
            </h2>
            <h1 className="text-ink font-body text-5xl font-bold">
              {stats.responses}
            </h1>
          </motion.div>
          <motion.div
            whileHover={{
              x: -10,
              y: -10,
            }}
            transition={{ duration: 0.15 }}
            className="bg-burnt-orange brutal-shadow brutal-border-sharp text wrap flex h-64 w-3xs flex-col items-center justify-center gap-7 px-4 py-1"
          >
            <h2 className="font-heading text-center text-xl font-bold">
              Total forms you responded to
            </h2>
            <h1 className="text-ink font-body text-5xl font-bold">
              {stats.respondedTo}
            </h1>
          </motion.div>
        </div>
        <div id="second-row" className="bg-cream w-full px-7 py-10">
          <h1 className="font-heading text-4xl font-bold">Your Forms</h1>
          {forms.map((form) => (
            <MotionLink
              to={`/forms/${form.id}/edit`}
              whileHover={{
                x: -4,
                y: -4,
              }}
              whileTap={{
                x: 4,
                y: 4,
              }}
              transition={{ duration: 0.15 }}
              className="bg-coral-pink text-ink brutal-shadow-accent brutal-border-accent my-2.5 flex w-full flex-row items-center justify-between px-3 py-5"
            >
              <h1 className="font-body text-2xl font-bold">
                {form.form_title}
              </h1>
              <div className="flex flex-row gap-10">
                <p>
                  Created at: <br />{" "}
                  <span className="font-body font-bold">
                    {new Date(form.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Last Updated: <br />{" "}
                  <span className="font-body font-bold">
                    {new Date(form.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
      <FloatingDots count={120} />
    </div>
  );
};

export default Dashboard;
