import TextEditor from './components/TextEditor'
import { BeatSheetProvider } from './context/BeatSheetContext'
import SheetView from './components/SheetView'
import Header from './components/Header'

export default function Home() {
  return (
    <main >
      <div>
        <Header/>
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
