'use client'
import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

interface BeatSheetContextType {
  sheet: BeatSheet;
  setSheet: React.Dispatch<React.SetStateAction<BeatSheet>> ;
  updateSheetWithMarkdown: (markdown: string) => void;
}
const defaultSheetVal: BeatSheet = { id: 0, name: "", acts: [] }

const defaultContextVal: BeatSheetContextType = {
  sheet: defaultSheetVal,
  setSheet: () => { },
  updateSheetWithMarkdown: () => { }
}


const BeatSheetContext = createContext<BeatSheetContextType>(defaultContextVal);

export const BeatSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sheet, setSheet] = useState<BeatSheet>(defaultSheetVal)

  useEffect(() => {
    fetchInitialSheet().then((initialSheet => setSheet(initialSheet)))
  }, [])

  
  interface Act {
    id: number;
    name: string;
    beats?: Beat[];
  }
  
  interface Beat {
    id: number;
    name: string;
    time: string;
    content: string;
    cameraAngle: string;
    notes: string;
  }
  
  

  // Fetching
  async function fetchData<T>(url: string, errorText: string): Promise<T> {
    try {
      const res = await fetch(url);
      if (!res.ok) { throw new Error(`${errorText} ${res.statusText}`); }
      const data: T = await res.json();
      return data;
    } catch (error) {
      console.error(`${errorText} ${error}`);
      throw error;
    }
  }
  
  async function fetchActs(): Promise<Act[]> {
    const url = `${baseUrl}/acts`
    const errorText = "Failed to fetch Acts.";
    return fetchData<Act[]>(url, errorText);
  }

  async function fetchBeats(act: Act): Promise<Beat[]> {
    const url = `${baseUrl}/acts/${act.id}/beats`
    const errorText = "Failed to fetch Beats.";
    return fetchData<Beat[]>(url, errorText);
  }

  async function fetchInitialSheet(): Promise<BeatSheet> {
    const acts = await fetchActs()
    await Promise.all(acts.map(async (act) => {
      const beats = await fetchBeats(act);
      act.beats = beats
    }));

    const beatSheet: BeatSheet = {
      name: "Beatsheet",
      id: 0, // TODO: don't hardcode these, set to value of last sheet
      acts: acts
    }

    return beatSheet
  }



  interface ASTNode {
    type?: string;
    depth?: number;
    children?: ASTNode[];
    value?: string; 
  }

  const updateSheetWithMarkdown = (newMarkdown: string) => {
    console.log(`updateSheetWithMarkdown ${newMarkdown.length}`)
    let json = unified()
      .use(remarkParse)
      .parse(newMarkdown)
    
    let acts = convertASTtoActs(json)
    
    console.log(acts);
  }



  function convertASTtoActs(ast: ASTNode): Act[] {
    let acts: Act[] = [];
    let currentAct: Act | null = null;
    let currentBeat: Beat | null = null;
  
    for (const node of ast.children ?? []) {
      if (node.type === 'heading') {
        if (node.depth === 1) {
          // Start of a new act
          if (currentAct) {
            acts.push(currentAct);
          }
          currentAct = { id: acts.length, name: node.value ?? "Act", beats: [] };
          currentBeat = null; // Reset currentBeat as we are starting a new Act
        } else if (node.depth === 2) {
          // Start of a new beat
          if (currentBeat && currentAct) {
            currentAct?.beats?.push(currentBeat);
          }
          currentBeat = {
            id: currentAct?.beats?.length ?? 0,
            name: node.value ?? 'Beat',
            time: 'placeholder', // Replace with actual value
            content: '',
            cameraAngle: 'placeholder', // Replace with actual value
            notes: 'placeholder' // Replace with actual value
          };
        }
      } else if (currentBeat) {
        // ignores 
        // For other types of nodes within a beat, append them to the current beat's content
        currentBeat.content += node.value || ''; 
      }
    }
  
    // For the last Act and Beat
    if (currentBeat && currentAct) {
      currentAct?.beats?.push(currentBeat);
    }
    if (currentAct) {
      acts.push(currentAct);
    }
  
    return acts;
  }

  return (
    <BeatSheetContext.Provider value={{ sheet, setSheet, updateSheetWithMarkdown }}>
      {children}
    </BeatSheetContext.Provider>
  )

}

export const useBeatSheet = () => {
  const context = useContext(BeatSheetContext);
  if (!context) {
    throw new Error('useBeatSheet must be used within a BeatSheetProvider.');
  }
  return context;
};