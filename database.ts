import { Sequelize } from 'sequelize';

// export const SequelizeDatabase = () => {
// 	var database: Sequelize;

// 	switch (process.env.NODE_ENV) {
// 		case 'production':
// 			if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
// 			database = new Sequelize(process.env.JAWSDB_MARIA_URL);
// 			break;
// 		case 'development':
// 			if (!process.env.DB_USERNAME) throw new Error('Database username not found');
// 			database = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
// 				host: process.env.DB_HOST,
// 				dialect: 'mysql',
// 				logging: false,
// 				pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
// 			});
// 		default: throw new Error('Unknown node environment: ' + process.env.NODE_ENV);
// 	}

// 	// Test the established connection
// 	database.authenticate()
// 		.then(() => console.log('Connection established to database'),
// 			(err: any) => console.error('Unable to establish database connection:', err)
// 		);

// 	// Sync the database
// 	database.sync()
// 		.then((_: Sequelize) => console.log('Database successfully synced'),
// 			(err: any) => console.error('Unable to sync database:', err)
// 		);

// 	return database;
// }

var sequelize: Sequelize;

switch (process.env.NODE_ENV) {
	case 'production':
		if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
		sequelize = new Sequelize(process.env.JAWSDB_MARIA_URL);
		break;
	case 'development':
		if (!process.env.DB_USERNAME) throw new Error('Database username not found');
		sequelize = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
			host: process.env.DB_HOST,
			dialect: 'mysql',
			logging: false,
			pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
		});
	default: throw new Error('Unknown node environment: ' + process.env.NODE_ENV);
}

// Test the established connection
sequelize.authenticate().then(
	() => console.log('Connection established to database'),
	(err: any) => console.error('Unable to establish database connection:', err)
);

// Sync the database
sequelize.sync().then(
	(_: Sequelize) => console.log('Database successfully synced'),
	(err: any) => console.error('Unable to sync database:', err)
);

export const database = {
	sequelize
}


// /** Sequelize is the ORM we are using to interact with the database */
// export class SequelizeDatabase {
// 	db: Sequelize;

// 	constructor() {
// 		// Set up credentials dependent on environment
// 		if (process.env.NODE_ENV === 'production') {
// 			if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
// 			this.db = new Sequelize(process.env.JAWSDB_MARIA_URL);
// 		} else if (process.env.NODE_ENV === 'development') {
// 			this.db = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
// 				host: process.env.DB_HOST,
// 				dialect: 'mysql',
// 				logging: false,
// 				pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
// 			});
// 		} else throw new Error('Unknown node environment: ' + process.env.NODE_ENV);

// 		// Test the established connection
// 		this.db.authenticate()
// 			.then(() => console.log('Connection established to database'),
// 				(err: any) => console.error('Unable to establish connection to the database:', err));

// 		// Sync the database
// 		this.db.sync()
// 			.then((_: Sequelize) => console.log('Database successfully synced'),
// 				(err: any) => console.error('Could not sync with the database:', err));
// 	}
// 	// 	console.log(process.env);
// 	// 	// Set up credentials dependent on environment
// 	// 	if (process.env.NODE_ENV === 'production') {
// 	// 		if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
// 	// 		super(process.env.JAWSDB_MARIA_URL);
// 	// 	} else if (process.env.NODE_ENV === 'development') {
// 	// 		super(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
// 	// 			host: process.env.DB_HOST,
// 	// 			dialect: 'mysql',
// 	// 			logging: false,
// 	// 			pool: {
// 	// 				max: 5,
// 	// 				min: 0,
// 	// 				acquire: 30000,
// 	// 				idle: 10000
// 	// 			}
// 	// 		});
// 	// 	} else throw new Error('Unknown node environment: ' + process.env.NODE_ENV);

// 	// 	// Test the established connection
// 	// 	this.authenticate()
// 	// 		.then(() => console.log('Connection established to database'),
// 	// 			(err: any) => console.error('Unable to establish connection to the database:', err));

// 	// 	// Sync the database
// 	// 	this.sync()
// 	// 		.then((_: Sequelize) => console.log('Database successfully synced'),
// 	// 			(err: any) => console.error('Could not sync with the database:', err));
// 	// }
// }

// /** Established connection instance with the database */
// let sequelize: Sequelize;

// // Set up credentials dependent on environment
// if (process.env.NODE_ENV === 'production') {
// 	if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
// 	sequelize = new Sequelize(process.env.JAWSDB_MARIA_URL);
// } else if (process.env.NODE_ENV === 'development') {
// sequelize = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
// 	host: process.env.DB_HOST,
// 	dialect: 'mysql',
// 	logging: false,
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000
// 	}
// });
// } else throw new Error('Unknown node environment: ' + process.env.NODE_ENV);

// // Test the established connection
// sequelize.authenticate()
// 	.then(() => console.log('Connection established to database'),
// 		(err: any) => console.error('Unable to establish connection to the database:', err));

// // Sync the database
// sequelize.sync()
// 	.then((_: Sequelize) => console.log('Database successfully synced'),
// 		(err: any) => console.error('Could not sync with the database:', err));


// export { sequelize }

// const createSequelizeConnection = (): Promise<any> => import('sequelize').then(({ Sequelize }) => {
// 	let sequelize = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
// 		host: process.env.DB_HOST,
// 		dialect: 'mysql',
// 		logging: false,
// 		pool: {
// 			max: 5,
// 			min: 0,
// 			acquire: 30000,
// 			idle: 10000
// 		}
// 	})

// 	return sequelize.authenticate()
// 		.then(() => console.log('Connection established with database'))
// 		.catch((err: any) => console.error('Unable to establish connection with database:', err))
// 		.then(() => sequelize)
// }).then((sequelize: any) => sequelize.sync()
// 	.then((sequelize: any) => {
// 		console.log('Database successfully synced');
// 		return sequelize;
// 	}).catch((err: any) => {
// 		console.error('Could not sync with database:', err);
// 		return sequelize
// 	})
// );

// export const sequelize = createSequelizeConnection();


// export const sequelize = import('sequelize')
// 	.then(sqlizeImport => {
// 		let sequelizeInstance = null;
// 	})
