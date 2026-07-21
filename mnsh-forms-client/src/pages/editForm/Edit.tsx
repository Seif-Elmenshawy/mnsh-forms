import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { motion } from "motion/react";
import FloatingDots from "../components/Floating-BG/Floating";
import * as Switch from "@radix-ui/react-switch";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { TrashIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";

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

interface Question {
  id: string | null;
  question_title: string;
  question_description: string | null;
  question_type: string;
  question_order: number;
  is_required: boolean;
  choices: [] | null;
  form_id: string;
}

const Edit = () => {
  const [formData, setFormData] = useState<FormItem>();
  const [questions, setQuestions] = useState<Question[]>([]);
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

  const addQuestion = () => {
    if (!formId) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        question_title: "Untitled Question",
        question_description: null,
        question_order: prev.length,
        question_type: "short",
        is_required: true,
        choices: null,
        form_id: formId,
      },
    ]);
  };

  useEffect(() => {
    fetchFormData();
  }, []);
  return (
    <div>
      <FloatingDots count={120} />
      <header className="bg-maroon brutal-shadow brutal-border-sharp text-cream mx-3 mt-3 flex w-[calc(100%-1.5rem)] flex-row items-center justify-between px-2.5 py-3.5">
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
          <motion.button
            initial={{
              boxShadow: "4px 4px 0px #111111",
            }}
            whileTap={{
              boxShadow: "0px 0px 0px #111111",
              x: 4,
              y: 4,
            }}
            transition={{ duration: 0.11 }}
            className="bg-tomato brutal-border-sharp px-2 py-3"
          >
            Save changes
          </motion.button>
        </div>
      </header>

      <section className="bg-burnt-orange brutal-shadow-nav brutal-border-heavy mx-3 mt-10 flex w-[calc(100%-1.5rem)] flex-col items-start justify-center px-5 py-7">
        <h1 className="font-heading text-3xl font-bold">Work Area</h1>
        {questions.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center">
            <p className="font-body font-semibold">There a no questions yet</p>
            <motion.button
              whileTap={{
                x: 4,
                y: 4,
              }}
              transition={{ duration: 0.15 }}
              onClick={addQuestion}
              className="bg-tomato font-body brutal-border-sharp brutal-shadow w-37 cursor-pointer px-2 py-2.5 font-bold text-wrap"
            >
              Add your first Question
            </motion.button>
          </div>
        ) : (
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-10">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-maroon brutal-border-sharp brutal-shadow text-cream flex w-1/2 flex-col items-start justify-center px-3 py-4"
              >
                <div className="flex w-full flex-row items-center justify-between">
                  <motion.input
                    initial={{
                      border: "0 solid #111111",
                      color: "#FFFFFF",
                    }}
                    whileFocus={{
                      border: "4px solid #111111",
                      backgroundColor: "#FF8FA3",
                      color: "#111111",
                    }}
                    transition={{ duration: 0.15 }}
                    className="font-heading text-cream field-sizing-content px-1.5 py-2 text-3xl font-bold focus:outline-0"
                    value={question.question_title ?? ""}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev.map((q) =>
                          q.id == question.id
                            ? { ...q, question_title: e.target.value }
                            : q,
                        ),
                      )
                    }
                  />
                  <div className="relative">
                    <select
                      className="brutal-border-slight bg-burnt-orange text-3xs font-body w-full appearance-none px-4 py-2 pr-10 text-sm font-bold text-gray-900 shadow-sm focus:outline-none"
                      value={question.question_type}
                      onChange={(e) =>
                        setQuestions((prev) =>
                          prev.map((q) =>
                            q.id == question.id
                              ? { ...q, question_type: e.target.value }
                              : q,
                          ),
                        )
                      }
                    >
                      <option value="short">
                        Short Text <ChevronDownIcon className="text-ink w-3" />
                      </option>
                      <option value="paragraph">Paragraph</option>
                      <option value="check">Checkboxes</option>
                      <option value="multipleChoice">Multiple Choice</option>
                    </select>
                    <ChevronDownIcon className="text-ink pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>
                <motion.input
                  type="text"
                  placeholder="ex. What is your name?"
                  className="bg-burnt-orange font-body brutal-border-sharp brutal-shadow text-ink m-1.5 w-80 px-2 py-3 font-bold focus:outline-none"
                />
                <div className="flex w-full items-center justify-center">
                  <hr className="text-cream m-2 w-full" />
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                  <motion.div
                    className="w-1/15"
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <TrashIcon className="w-full" />
                  </motion.div>
                  <motion.div
                    className="w-1/15"
                    whileTap={{
                      x: -3,
                      y: 3,
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    <DocumentDuplicateIcon className="w-full" />
                  </motion.div>
                  <div className="flex flex-row gap-4">
                    <p className="font-body font-bold">Required</p>
                    <Switch.Root
                      className="data-[state=checked]:bg-burnt-orange relative h-6 w-11 rounded-full bg-gray-300 transition-colors"
                    >
                      <Switch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
                    </Switch.Root>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Edit;
