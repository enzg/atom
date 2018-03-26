import BigNumber from 'bignumber.js'
export const Digit = value => {
  try {
    return new BigNumber(value)
  } catch (err) {
    const fatalErr = new Error(`[${Digit.name}]: number parse error. ${value} | ${err.stack}`)
    fatalErr.errorCode = 50001
    throw fatalErr
  }
}
