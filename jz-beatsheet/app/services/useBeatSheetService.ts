import { useState, useEffect } from "react";

const useBeatSheetService = () => {
  const [sheet, setSheet] = useState<BeatSheet>()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  
  useEffect(() => {
    (async () => {
      const initialSheet = await fetchInitialSheet()
      setSheet(initialSheet)
    })();
  }, [])
  
  
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

  function doSet(sheet: BeatSheet) {
    console.log(sheet)
    setSheet(sheet)
  }

  return { sheet, doSet }

}

export default useBeatSheetService;