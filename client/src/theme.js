import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '5rem',
        fontFamily: 'Raleway',
        color: '#0d47a1',
      },
      h2: {
        fontSize: '3.5rem',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        color: '#0d47a1',
      },
      h3: {
        fontSize: '2.5rem',
        fontFamily: 'Roboto',
        color: '#0d47a1',
      },
    },
    palette: {
      background: {
        default: '#1CE8E2', // light blue
      },
      primary: {
        main: '#EB7657', // indigo
      },
      secondary: {
        main: '#1976d2', // blue
      },
      sidebar: {
        main: '#1CE8E2', // light blue
        },
      error: {
        main: '#D72A2A', // red
      },
      warning: {
        main: '#FC7B09', // orange
      },
      info: {
        main: '#6B7D6A', // gray
      },
      success: {
        main: '#09FE00', // green
      },
      text: {
        primary: '#000000', // black
        secondary: '#FFFFFF', // white
      },
      h1: {
        main: '#0d47a1', // Adjust the color as needed
      },
      h2: {
        main: '#0d47a1', // Adjust the color as needed
      },
      h3: {
        main: '#0d47a1', // Adjust the color as needed
      },
    },
    overrides: {
      MuiCard: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#1CE8E2',  // light blue
          },
        },
      },
    },
  })
);

export default theme;