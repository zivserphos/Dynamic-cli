const previewHtml = (code: string) => `
     <html>
      <head>
        <style>html {backgroundColor:"white"}</style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script>
        const show = (value) => {
        const root= document.querySelector("#root");
        if (typeof value === 'object') { // display as an object
            if (value.$$typeof && value.props) { // check if object is a jsx elment
                ReactDOM.render(value ,root)
                }
            else {
                root.innerHTML = JSON.stringify(value)
            }
          }
        else {
            root.innerHTML =value
          }
        }
        ${code}
          const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red; position:absolute; top:10px;left:10px; font-size:1.7em"><h4>Runtimee Error</h4>' + err + '</div>';
              console.error(err);
          }
          window.addEventListener('error' , (event) => {
            event.preventDefault()
            handleError(err)
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err)
            }
          }, false);
          
        </script>
      </body>
    </html>
  `;

export default previewHtml;
