require('dotenv').config();

const config = {
	port: process.env.PORT || 3000,

	dbUser: process.env.DB_USER || 'root',
	dbPassword: process.env.DB_PASSWORD || 'lizard4093',
	dbHost: process.env.DB_HOST || 'localhost',
	dbPort: process.env.DB_PORT || 3306,
	dbName: process.env.DB_NAME || 'digital_menu_v2.2',

	jwtSecret: process.env.JWT_SECRET || 'secretnote',
	jwtExpiration: process.env.JWT_EXPIRATION || '',
};

module.exports =  config ;