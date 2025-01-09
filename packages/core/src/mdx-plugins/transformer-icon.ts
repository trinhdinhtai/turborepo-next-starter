export interface CodeBlockIcon {
  viewBox: string
  fill: string
  d: string
}

export interface IconOptions {
  shortcuts?: Record<string, string>
  extend?: Record<string, CodeBlockIcon>
}
