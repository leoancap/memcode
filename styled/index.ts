import { css, Global, keyframes } from '@emotion/core'
import styled, { CreateStyled } from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { Theme } from './themes/base'

export { css, Global, keyframes, ThemeProvider }
export default styled as CreateStyled<Theme>
