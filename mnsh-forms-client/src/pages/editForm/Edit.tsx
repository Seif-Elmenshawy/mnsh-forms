import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { motion } from "motion/react";
import FloatingDots from "../components/Floating-BG/Floating";
import * as Switch from "@radix-ui/react-switch";

const serverUrl = import.meta.env.VITE_SERVER_API;

interface FormItem {
  id: string;
  form_title: string;
  form_description: string | null;
  is_private: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Edit = () => {
  const [formData, setFormData] = useState<FormItem>();
  const [questions, setQuestions] = useState([]);
  const params = useParams();
  const formId = params.id;
  const navigate = useNavigate();

  const fetchFormData = async () => {
    try {
      const response = await fetch(`${serverUrl}/forms/formData/${formId}`, {
        credentials: "include",
      });
      const data = await response.json();

      console.log(data);
      switch (response.status) {
        case 401:
          navigate("/");
          break;
        case 200:
          setFormData(data.data);
          setQuestions(data.questions);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);
  return (
    <div>
      <FloatingDots count={120} />
      <header className="bg-maroon brutal-shadow brutal-border-sharp text-cream mx-3 my-3 flex w-[calc(100%-1.5rem)] flex-row items-center justify-between px-2.5 py-3.5">
        <div className="flex flex-row items-center justify-center gap-5">
          <img className="h-20 w-20" src={logo} />
          <motion.input
            initial={{
              border: "0 solid #111111",
            }}
            whileFocus={{
              border: "4px solid #111111",
              backgroundColor: "#FFB84D",
              color: "#111111",
            }}
            transition={{ duration: 0.15 }}
            className="font-heading field-sizing-content px-1.5 py-2 text-3xl font-bold focus:outline-0"
            value={formData?.form_title ?? ""}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, form_title: e.target.value } : prev,
              )
            }
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-7">
          <div className="flex flex-col items-center justify-center gap-2.5">
            <label className="font-body text-3xs font-bold">Published</label>
            <div className="relative flex cursor-pointer items-center">
              <Switch.Root
                checked={formData?.is_published ?? false}
                onCheckedChange={(checked) =>
                  setFormData((prev) =>
                    prev ? { ...prev, is_published: checked } : prev,
                  )
                }
                className="data-[state=checked]:bg-burnt-orange relative h-6 w-11 rounded-full bg-gray-300 transition-colors"
              >
                <Switch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5">
            <label className="font-body text-2xs font-bold">Private:</label>
            <div className="flex cursor-pointer items-center">
              <Switch.Root
                checked={formData?.is_private ?? false}
                onCheckedChange={(checked) =>
                  setFormData((prev) =>
                    prev ? { ...prev, is_private: checked } : prev,
                  )
                }
                className="data-[state=checked]:bg-burnt-orange relative h-6 w-11 rounded-full bg-gray-300 transition-colors"
              >
                <Switch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-burnt-orange brutal-shadow-nav brutal-border-heavy mx-3 my-3 flex w-[calc(100%-1.5rem)] flex-col items-start justify-center px-5 py-7">
        <h1 className="font-heading text-3xl font-bold">Work Area</h1>
        {questions.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full">
            <p className="font-semibold font-body ">There a no questions yet</p>
            
          </div>
        ) : (
          <div>
            <p>you have {questions.length} questions</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Edit;
