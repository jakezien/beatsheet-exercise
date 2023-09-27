import Image from 'next/image'
import TextEditor from './components/TextEditor'
import { BeatSheetProvider } from './context/BeatSheetContext'
import SheetView from './components/SheetView'

export default function Home() {
  return (
    <main >
      <div>
        <BeatSheetProvider>
          <div className='flex lg: flex-row'>
            <TextEditor />
            <SheetView />
          </div>
        </BeatSheetProvider>
      </div>
    </main>
  )
}
