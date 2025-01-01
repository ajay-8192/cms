package database

import (
	"cms/config"
	"fmt"

	"github.com/redis/go-redis/v9"
)

var RDB *redis.Client

func ConnectRedis(config *config.Config) {
	RDB = redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%s", config.REDISHost, config.REDISPort),
	})
}