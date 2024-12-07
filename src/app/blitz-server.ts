import { setupBlitzServer } from '@blitzjs/next';
import {
	AuthServerPlugin,
	PrismaStorage,
	simpleRolesIsAuthorized,
} from '@blitzjs/auth';
import db from '../../db';
import { BlitzLogger } from 'blitz';
import { RpcServerPlugin } from '@blitzjs/rpc';
import { authConfig } from './blitz-auth-config';

const {
	api,
	getBlitzContext,
	useAuthenticatedBlitzContext,
	invoke,
	withBlitzAuth,
	gSSP,
	gSP,
} = setupBlitzServer({
	plugins: [
		AuthServerPlugin({
			...authConfig,
			storage: PrismaStorage(db),
			isAuthorized: simpleRolesIsAuthorized,
			//sessionSecret: process.env.SESSION_SECRET || 'default-secret',
		}),
		RpcServerPlugin({}),
	],
	logger: BlitzLogger({}),
});

export {
	api,
	getBlitzContext,
	useAuthenticatedBlitzContext,
	invoke,
	withBlitzAuth,
	gSSP,
	gSP,
};
