import { Sequelize } from 'sequelize';
import { error, success, info } from '@codexist/status-reports';

/** Sequelize is the ORM we are using to interact with the database */
class SequelizeDatabase {
	db: Sequelize;

	constructor() {
		// Set up credentials dependent on environment
		switch (process.env.NODE_ENV) {
			case 'production':
				if (!process.env.JAWSDB_MARIA_URL) error('JAWSDB MARIA URL for database connection not found', new Error())();
				this.db = new Sequelize(process.env.JAWSDB_MARIA_URL!);
				info('Database: JAWSDB')();
				break;
			case 'development':
				if (!process.env.DB_USERNAME) error('Database username not found', new Error())();
				this.db = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
					host: process.env.DB_HOST,
					dialect: 'mysql',
					logging: false,
					pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
				});
				info(`Database: \`${process.env.DB || 'localhost'}\``)();
				break;
			default: error('Unknown node environment: ' + process.env.NODE_ENV, new Error())();
		}

		// Test the established connection
		this.db.authenticate().then(
			success('Connection established to database'),
			(err: any) => error('Unable to establish connection to the database', err)()
		);

		// Sync the database
		this.db.sync().then(
			success('Database successfully synced'),
			(err: any) => error('Could not sync with the database', err)()
		);
	}
}

export const sequelizeDB = new SequelizeDatabase();
