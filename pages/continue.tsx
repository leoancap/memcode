import { useStore } from "../store"
import styled from "../styled"
import React from "react"
import Layout from "../components/Layout/Layout"
import InputField from "../components/shared/InputField"
import { observer } from "mobx-react-lite"
import {
  useRegisterMutation,
  useLoginMutation,
  IMeQuery,
} from "../generated/apolloComponents"
import { validateEmail } from "../utils/validateEmail"
import { meQuery } from "../graphql/user/queries/me"
import Router from "next/router"

interface IFormValues {
  email: string
  password: string
}

export default observer(function PageIndex() {
  const store = useStore()
  const login = useLoginMutation()
  const register = useRegisterMutation()

  const [errors, setErrors] = React.useState()

  const onSubmit = async (data: any) => {
    setErrors(null)
    try {
      const res = await login({
        variables: data,
        update: (cache, { data }) => {
          if (!data || !data.login) {
            return
          }
          cache.writeQuery<IMeQuery>({
            query: meQuery,
            data: {
              me: data.login,
            },
          })
        },
      })

      if (res && res.data && res.data.login === null) {
        await register({
          variables: { data },
          update: (cache, { data }) => {
            if (!data || !data.register) {
              return
            }
            cache.writeQuery<IMeQuery>({
              query: meQuery,
              data: {
                me: data.register,
              },
            })
          },
        })
      }
      Router.push("/")
    } catch (err) {
      console.log(Object.entries(err))
    }
  }
  const validate = ({ email, password }: IFormValues) => {
    return {
      ...(!validateEmail(email) && { email: "Not a valid email" }),
      ...(password &&
        password.length < 8 && { password: "Pass not long enough" }),
    }
  }

  return (
    <Layout>
      <Container>
        <InputField errors={errors} onSubmit={onSubmit} validate={validate} />
      </Container>
    </Layout>
  )
})

const Container = styled.div`
  padding: 1rem;
  padding-top: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`
