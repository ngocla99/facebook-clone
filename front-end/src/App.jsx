import Routes from "@/routes"

import AuthProvider from "@/providers/auth-provider"
import QueryProvider from "@/providers/query-provider"

import { ThemeProvider } from "./providers/theme-provider"

function App() {
  return (
    <div>Hello</div>
    // <QueryProvider>
    //   <AuthProvider>
    //     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    //       <Routes />
    //     </ThemeProvider>
    //   </AuthProvider>
    // </QueryProvider>
  )
}

export default App
