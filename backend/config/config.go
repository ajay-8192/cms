package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string

	REDISHost  string
	REDISPort  string

	MONGOURL  string
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	return &Config{
		DBHost    : os.Getenv("DB_HOST"),
		DBPort    : os.Getenv("DB_PORT"),
		DBUser    : os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName    : os.Getenv("DB_NAME"),
		REDISHost : os.Getenv("REDIS_HOST"),
		REDISPort : os.Getenv("REDIS_PORT"),
		MONGOURL : os.Getenv("MONGO_URL"),
	}, nil
}
