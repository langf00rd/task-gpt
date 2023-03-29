import axios from "axios";
import Head from "next/head";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiCopy } from 'react-icons/bi'

export default function Home() {
  const [description, setDescription] = React.useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>('other')
  const [response, setResponse] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSelectPlatform = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    setSelectedPlatform(event.target.value);
  }

  const onGenerate = async () => {
    setLoading(true)
    await axios.post('/api/task', { description, 'platform': selectedPlatform }).then(response_ => {
      console.log('response_', response_.data)
      setResponse(response_.data)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      toast.error(error.message)
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(response).then(() => {
      toast.success('Copied to clipboard! 🚀')
    }).catch(error => {
      toast.error('Could not copy to clipboard 🥲')
    })
  }

  return (
    <div>
      <Toaster />
      <Head>
        <title>TaskGPT - Create meaningful taks names. For all the lazy people</title>
        <meta name="description" content="Create meaningful taks names for Jira, ClickUp, Trello, etc, with the power of GPT-3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-y-scroll p-5 h-screen bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <div className="w-full max-w-3xl mx-auto">
          <div>
            <h1 className="text-4xl mb-2 font-bold">TaskGPT</h1>
            <p className="text-slate-500 lg:text-xl">Apparently you&apos;re too lazy to come up with better names & descriptions for issues/tasks on Jira, trello, ClickUp, etc. So i&apos;m gonna do it for you with the power of GPT-3. God, you&apos;re so lazy smh</p>
          </div>
          <textarea value={description} onChange={event => setDescription(event.target.value)} placeholder="Describe the issue, i'll do the rest..." className="placeholder:text-slate-600 mt-5 w-full p-3 bg-transparent outline-none border border-slate-700 h-[150px] resize-none"></textarea>
          <p className="float-right text-slate-500">{description.trim().length} characters</p>
          <div>
            <p className="mt-12 mb-2 text-2xl font-bold">Pick a platform</p>
            <div className='flex items-center gap-4'>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="trello"
                  checked={selectedPlatform === "trello"}
                  onChange={handleSelectPlatform}
                />
                <p>Trello</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="jira"
                  checked={selectedPlatform === "jira"}
                  onChange={handleSelectPlatform}
                />
                <p>Jira</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="clickup"
                  checked={selectedPlatform === "clickup"}
                  onChange={handleSelectPlatform}
                />
                <p>ClickUp</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="other"
                  checked={selectedPlatform === "other"}
                  onChange={handleSelectPlatform}
                />
                <p>Other</p>
              </label>
            </div>
          </div>
          <button disabled={loading || description.trim().length <= 15} onClick={onGenerate} className="disabled:cursor-not-allowed disabled:opacity-60 bg-blue-600 p-2 px-5 rounded-md mt-5 active:scale-90 cursor-pointer transition-all">{loading ? 'Loading...' : 'Create'}</button>
          {response && <div className="border-t border-t-slate-700 mt-10 pt-10">
            <p className="text-2xl font-bold">Here you go...</p>
            <p className="whitespace-break-spaces -mt-10">{response}</p>
            <div className="bg-blue-600 p-2 px-5 flex items-center justify-center w-max gap-2 rounded-md mt-5 active:scale-90 cursor-pointer transition-all" onClick={onCopy}>
              <p>Copy</p>
              <BiCopy className="hover:opacity-75 transition-all cursor-pointer" />
            </div>
          </div>}
        </div>
      </main>
    </div>
  );
}

const styles = {
  radioButtonSelector: 'flex items-center gap-[3px] cursor-pointer transition-all hover:opacity-75'
}
