import Router from "next/router"

export default (ctx: any, target: string) => {
  if (ctx.res) {
    // server
    ctx.res.writeHead(303, { Location: target })
    ctx.res.end()
  } else {
    // browser
    // tslint:disable-next-line: no-unused-expression
    Router.replace(target)
  }
}
