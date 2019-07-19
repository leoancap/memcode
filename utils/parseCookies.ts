import cookie from "cookie"

export function parseCookies(req?: any, options = {}) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options)
}
