import Document, { Head, Main, NextScript } from "next/document"

export default class extends Document {
  static async getInitialProps(context: any) {
    const initialProps = await Document.getInitialProps(context)

    return {
      ...initialProps,
    }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
