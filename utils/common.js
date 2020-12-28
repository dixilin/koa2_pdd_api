const generateRandomCode = (len = 4, max = 10) => {
  let code = ''
  for (let i = 0; i < len; i++) {
    code += Math.floor(Math.random() * max)
  }
  return code
}
module.exports = {
  generateRandomCode
}