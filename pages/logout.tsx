import { logoutMutation } from "../graphql/user/mutations/logout"
import { MyCtx } from "../typings/MyCtx"
import redirect from "../lib/redirect"

function Logout() {
  return null
}

Logout.getInitialProps = async ({ store, apolloClient, ...ctx }: MyCtx) => {
  await apolloClient.mutate({ mutation: logoutMutation })
  await apolloClient.resetStore()
  store.setUser("")
  redirect(ctx, "/")
  return {}
}

export default Logout
