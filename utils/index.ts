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

export const lerp = (
  min: number,
  max: number,
  value: number,
  strict: boolean = false
) => {
  if (strict && (value < min || value > max)) {
    throw new Error(`Invalid value '${value}' for range '${min} - ${max}'`)
  }

  return (1 / (max - min)) * (value - min)
}
