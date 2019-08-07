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
        <Head>
          <link rel="shortcut icon" href="/static/logo.png" />
          {/* <link
            rel="icon"
            sizes="any"
            type="image/svg+xml"
            href="/static/logo.svg"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
