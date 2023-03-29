import Head from "next/head";
import React from "react";
import { BiCopy } from 'react-icons/bi'

export default function Home() {
  const [description, setDescription] = React.useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>('other')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    setSelectedPlatform(event.target.value);
  }

  return (
    <div>
      <Head>
        <title>TaskGPT - Create meaningful taks names. For all the lazy people</title>
        <meta name="description" content="Create meaningful taks names for Jira, ClickUp, Trello, etc, with the power of GPT-3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-y-scroll p-10 h-screen bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <div className="w-full max-w-3xl mx-auto">
          <div>
            <h1 className="text-4xl mb-2 font-bold">TaskGPT</h1>
            <p className="text-slate-500 lg:text-xl">Apparently you&apos;re too lazy to come up with better names & descriptions for issues/tasks on Jira, trello, ClickUp, etc. So i&apos;m gonna do it for you with the power of GPT-3. God, you&apos;re so lazy smh</p>
          </div>
          <textarea value={description} onChange={event => setDescription(event.target.value)} placeholder="Describe the issue, i'll do the rest..." className="placeholder:text-slate-600 mt-5 w-full p-3 bg-transparent outline-none border border-slate-700 h-[150px] resize-none"></textarea>
          <p className="float-right text-slate-500">{description.trim().length} words</p>
          <div>
            <p className="mt-12 mb-2 text-2xl font-bold">Pick a platform</p>
            <div className='flex items-center gap-4'>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="trello"
                  checked={selectedPlatform === "trello"}
                  onChange={handleChange}
                />
                <p>Trello</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="jira"
                  checked={selectedPlatform === "jira"}
                  onChange={handleChange}
                />
                <p>Jira</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="clickup"
                  checked={selectedPlatform === "clickup"}
                  onChange={handleChange}
                />
                <p>ClickUp</p>
              </label>
              <label className={styles.radioButtonSelector}>
                <input
                  type="radio"
                  name="project-management"
                  value="other"
                  checked={selectedPlatform === "other"}
                  onChange={handleChange}
                />
                <p>Other</p>
              </label>
            </div>
          </div>
          <button disabled={description.trim().length <= 20} className="disabled:cursor-not-allowed disabled:opacity-60 bg-blue-600 p-2 px-5 rounded-md mt-5 active:scale-90 cursor-pointer transition-all">Create</button>
          <div>
            <p className="mt-12 mb-2 text-2xl font-bold">Here you go...</p>
            <ul>
              <li className="flex items-center justify-between gap-2 p-3 rounded-md border border-slate-700 bg-slate-800 mb-4">
                <p>So im gonna do it for you with the power of GPT-3. God, youre so lazy smh</p>
                <BiCopy className="hover:opacity-75 transition-all cursor-pointer" />
              </li>
              <li className="flex items-center justify-between gap-2 p-3 rounded-md border border-slate-700 bg-slate-800 mb-4">
                <p>So im gonna do it for you with the power of GPT-3. God, youre so lazy smh</p>
                <BiCopy className="hover:opacity-75 transition-all cursor-pointer" />
              </li>
              <li className="flex items-center justify-between gap-2 p-3 rounded-md border border-slate-700 bg-slate-800 mb-4">
                <p>So im gonna do it for you with the power of GPT-3. God, youre so lazy smh</p>
                <BiCopy className="hover:opacity-75 transition-all cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  radioButtonSelector: 'flex items-center gap-[3px] cursor-pointer transition-all hover:opacity-75'
}
