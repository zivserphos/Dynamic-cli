const previewHtml = (code: string) => `
     <html>
      <head>
        <style>html {backgroundColor:"white"}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
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
