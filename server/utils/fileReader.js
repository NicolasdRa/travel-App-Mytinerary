const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => resolve(reader.result),
      reader.readAsDataURL(file)
    )
  })
}

module.exports = readFile
