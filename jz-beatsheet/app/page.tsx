import Image from 'next/image'
import TextEditor from './components/TextEditor'
import { BeatSheetProvider } from './context/BeatSheetContext'

export default function Home() {
  return (
    <main>
      <div>
        <BeatSheetProvider>
          <TextEditor />
        </BeatSheetProvider>
      </div>
    </main>
  )
}
