import Document, { Html, Head, Main, NextScript} from 'next/document' // NB: the Head component we're importing here is not the same Head component we import from 'next/head'

class MyDocument extends Document {
  render() {
    return(
      <Html lang="it">
      {/* esempio di customizzazione */}
        <Head />
        <body>
          <div id="overlays"></div>
          {/* esempio di customizzazione */}
          <Main />
          <NextScript />
        </body>
      </Html>
    ):
  }
}

export default MyDocument;
