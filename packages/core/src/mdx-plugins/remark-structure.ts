interface Heading {
  id: string
  content: string
}

interface Content {
  heading: string | undefined
  content: string
}

export interface StructuredData {
  headings: Heading[]
  /**
   * Refer to paragraphs, a heading may contain multiple contents as well
   */
  contents: Content[]
}
