import { headers, cookies } from "next/headers"

// @ts-ignore
import { Db, Collection } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { prompts } from "../../utils/prompt";
import { Mail } from "../../components/mail";

type Prompt = {
  _id?: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
};

const addData = async () => {
  try {
    const client = await clientPromise;
    const db: Db = client.db("aipromptlib");
    
    const collection: Collection<Prompt> = db.collection("prompts");
    const data = await collection.insertMany(prompts)


    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error -->:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


const getAllPrompts = async (rootUrl: string) => {
  try {
    const response = await fetch(`${rootUrl}/api/get-all-prompt`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log(error)
  }
}



export default async function page() {
  const layout = cookies().get("react-resizable-panels:layout:mail")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  const headersList = await headers(); 
  const host = headersList.get("host"); 
  const protocol = headersList.get("x-forwarded-proto") || "http";
  
  const rootUrl = `${protocol}://${host}`;

  // Add prompts collection from data list.
  // const res = await addData();

  // Get prompts
  const prompts: Prompt = await getAllPrompts(rootUrl);
  // console.log(prompts); 
  
  return (
    <>
      <div className="hidden flex-col md:flex h-screen">
        <Mail
          prompts={prompts}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
