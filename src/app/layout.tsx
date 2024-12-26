'use client';
import React, { StrictMode } from 'react';
import { AppLayout } from '@/widgets/AppLayout';
import '@/app/styles/globals.scss';
import './layoutStyled.scss';
import { Provider } from 'react-redux';
import store from '@/app/store';
import { QueryClient, QueryClientProvider } from '@blitzjs/rpc';
import { BlitzProvider } from './blitz-client';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<title>Event Management App</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='msapplication-TileImage' content='' />
				<meta name='theme-color' content='#232323' />
			</head>
			<body>
				<StrictMode>
					<Provider store={store}>
						<QueryClientProvider client={queryClient}>
							<BlitzProvider>
								<AppLayout>{children}</AppLayout>
								<ToastContainer
									position='bottom-right'
									autoClose={3000}
									hideProgressBar={false}
									pauseOnHover
									theme='dark'
								/>
							</BlitzProvider>
						</QueryClientProvider>
					</Provider>
				</StrictMode>
			</body>
		</html>
	);
}
