import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }


  body {
      background-color: rgba(0, 0, 0, 1);
      -webkit-font-smoothing: antialiased;
      color: rgba(170, 170, 170, 1);
      font-family: 'Poppins', sans-serif;

      a {
          text-decoration: none;
          color: rgba(170, 170, 170, 1);
      }
      
      ::-webkit-scrollbar {
          height: 12px;
          width: 13px;
      }
      
      /* Track */
      ::-webkit-scrollbar-track {
          padding: 1px;
          background: none;
      }
      
      /* Handle */
      ::-webkit-scrollbar-thumb {
          border-radius: 2px;
          background: #5a5a5a;
          width: 12px;
      }
      
      /* On hover */
      ::-webkit-scrollbar-thumb:hover {
          background: #b3b3b3;
      }
  }
`
