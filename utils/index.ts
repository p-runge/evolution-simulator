export const hexGenerator = (length: number): string => {
  let string: string = ''

  while (length > 0) {
    const decimal = Math.floor(Math.random() * 255)
    const hex = decimal.toString(16).padStart(2, '0')
    string += hex
    length--
  }

  return string
}

export const hexToBin = (hex: string) => {
  return parseInt(hex, 16).toString(2).padStart(8, '0')
}

export const lerp = (min: number, max: number, val: number): number => {
  return min * (1 - val) + max * val
}

const clamp = (val: number, min = 0, max = 1): number => {
  return Math.min(max, Math.max(min, val))
}

export const invlerp = (x: number, y: number, val: number): number => {
  return clamp((val - x) / (y - x))
}

export const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  val: number
): number => {
  return lerp(x2, y2, invlerp(x1, y1, val))
}

export const mixColors = (
  hex1: string,
  hex2: string,
  balance = 0.5
): string => {
  const colors: string[] = [hex1, hex2]
  if (colors.find((h) => !h.match(/^#[a-fA-F0-9]{6}$/))) {
    throw new Error(
      `At least 1 passed color does not match a hex color pattern: ${hex1}, ${hex2}`
    )
  }

  const newColorChannels = colors
    .map((color) => {
      return [color.substring(1, 3), color.substring(3, 5), color.substring(5)]
    })
    .map((color) => color.map((channel) => parseInt(channel, 16)))
    .reduce((a, b) =>
      a.map((_, i) =>
        Math.ceil((a[i] * 2 * (1 - balance) + b[i] * 2 * balance + 1) / 2 - 1)
      )
    )
    .map((newColorChannelInt) =>
      newColorChannelInt.toString(16).padStart(2, '0')
    )

  return `#${newColorChannels.join('')}`
}
