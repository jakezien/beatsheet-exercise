import TextEditor from './components/TextEditor'
import { BeatSheetProvider } from './context/BeatSheetContext'
import SheetView from './components/SheetView'
import Header from './components/Header'
import EditorAndPreview from './components/EditorAndPreview'


export default function Home() {

  return (
    <main >
      <div className='md:h-screen flex flex-col'>
        <BeatSheetProvider>
          <EditorAndPreview/>
        </BeatSheetProvider>
      </div>
    </main>
  )
}

