import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import logo from "../../assets/Logo.png"
import {motion} from "motion/react"

const serverUrl = import.meta.env.VITE_SERVER_API

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


const Edit = () => {
  const [formData, setFormData] = useState<FormItem>()
  const params = useParams()
  const formId = params.id
  
  const fetchFormData = async () => {
    try {
      const response = await fetch(`${serverUrl}/forms/formData/${formId}`, {
        credentials:"include"
      })
      const data = await response.json()
      setFormData(data.data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    fetchFormData()
  }, [] )
  return (
    <div>
      <header className="bg-maroon mx-3 flex w-[calc(100%-1.5rem)] my-3 brutal-shadow brutal-border-sharp px-2.5 py-3.5 text-cream"> 
        <div className="flex flex-row justify-center items-center gap-5">
          <img className="w-20 h-20" src={logo} />
          <motion.input 
            initial={{
              border: "0 solid #111111",
            }}
            whileFocus={{
              border: "4px solid #111111",
              backgroundColor: "#FFB84D",
              color:"#111111"
            }}
            transition={{duration:0.15}}
            className="font-bold focus:outline-0 font-heading text-3xl field-sizing-content px-1.5 py-2" value={formData?.form_title} 
          />
        </div>
      </header>
    </div>    
  )
}

export default Edit