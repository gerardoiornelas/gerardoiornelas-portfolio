import React from "react"
export interface ImageData {
  publicURL: string
  src: string
  srcSet: string
  width: number
  height: number
}
export function ResponsiveImage({ image, alt, style, imgStyle }: {
  image: ImageData
  alt: string
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
}) {
  return (
    <div style={{ position: "relative", overflow: "hidden", display: "inline-block", verticalAlign: "top", ...style }}>
      <div style={{ maxWidth: image.width, display: "block" }}>
        <img aria-hidden="true" role="presentation" alt="" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`} style={{ maxWidth: "100%", display: "block", position: "static" }} />
      </div>
      <img src={image.src} srcSet={image.srcSet} sizes={`(min-width: ${image.width}px) ${image.width}px, 100vw`} width={image.width} height={image.height} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", margin: 0, position: "absolute", inset: 0, objectFit: "cover", ...imgStyle }} />
    </div>
  )
}
