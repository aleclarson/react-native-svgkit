import * as React from 'react'
import {
  Image,
  ImageURISource,
  ImageRequireSource,
  NativeSyntheticEvent,
  requireNativeComponent,
  StyleSheet,
  ViewProps
} from 'react-native-macos'

export type SVGErrorEvent = NativeSyntheticEvent<{ error: string }>
export type SVGLoadEvent = NativeSyntheticEvent<{
  source: { height: number; width: number; url: string }
}>

interface Props extends ViewProps {
  data?: string
  source?: ImageURISource | ImageRequireSource
  tintColor?: string
  onLoadStart?: () => void
  onError?: (event: SVGErrorEvent) => void
  onLoad?: (event: SVGLoadEvent) => void
  onLoadEnd?: () => void
}

const RNSVGKView = requireNativeComponent('RNSVGKView')

export const SVGKView = (props: Props) => (
  <RNSVGKView
    {...props}
    source={props.source && Image.resolveAssetSource(props.source)}
    style={computeStyle(props)}
  />
)

function computeStyle(props: Props) {
  const style = StyleSheet.flatten(props.style) || {}
  if (style.width == null && style.height == null) {
    if (style.flex == null) {
      style.flex = 1
    }
  }
  console.log('style:', style)
  return style
}
