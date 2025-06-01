import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
const queryClient = new QueryClient()

function Provider({children}) {
   return (
		<QueryClientProvider client={queryClient}>
			<Router>
			{children}
			</Router>
		</QueryClientProvider>
	 )
}

export default Provider;