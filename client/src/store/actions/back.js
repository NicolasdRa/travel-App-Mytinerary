if (token) {
  config.headers['x-auth-token'] = token
}
if (!token) {
  const urlString = window.location.href
  const stringsArray = urlString.split('=', 2)
  if (stringsArray > 0) {
    const rawToken = stringsArray[1]
    const arrayToken = rawToken.split('#', 1)
    const token = arrayToken[0]
    config.headers['x-auth-token'] = token
    console.log(token)
  }
}
return config
