enum MarkdownElementType {
  Header1, 
  Header2, 
  Header3,
  Header4,
  UnorderedList, 
  Paragraph
}

export const useMarkdownService = () => {

  function actToMarkdown(act: Act): string {
    let newString = ""
    newString = appendElement(newString, act.name, MarkdownElementType.Header1)
    for (let beat of act.beats ?? []) {
      newString += beatToMarkdown(beat)
    }
    newString += '\n\n'
    return newString
  }

  function beatToMarkdown(beat: Beat): string {
    let newString = ""
    newString = appendElement(newString, beat.name, MarkdownElementType.Header2)
    newString = appendElement(newString, beat.time, MarkdownElementType.Paragraph)
    newString = appendElement(newString, beat.cameraAngle, MarkdownElementType.Paragraph)
    newString = appendElement(newString, beat.content, MarkdownElementType.Paragraph)
    newString = appendElement(newString, beat.notes, MarkdownElementType.UnorderedList)
    newString += '\n'
    return newString
  }


  function appendElement(existingMarkdown: string, data: string, elementType: MarkdownElementType): string {
    let prefix: string
    let suffix: string = '\n' // Default to two newlines after each element

    switch (elementType) {
      case MarkdownElementType.Header1:
        prefix = '# '
        suffix = '\n\n'
        break
      case MarkdownElementType.Header2:
        prefix = '## '
        break
      case MarkdownElementType.Header2:
        prefix = '### '
        break
      case MarkdownElementType.Header2:
        prefix = '#### '
        break
      case MarkdownElementType.UnorderedList:
        prefix = '- '
        break
      case MarkdownElementType.Paragraph:
        prefix = ''
        break
      default:
        throw new Error(`Unsupported Markdown element type: ${elementType}`)
    }

    return existingMarkdown + prefix + data + suffix
  }

  return {actToMarkdown,beatToMarkdown}
}