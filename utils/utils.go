package utils

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type ENV struct {
	Bucket_name string
	a           string
	b           string
}

func Load_env() (ENV, error) {
	env := ENV{}
	err := godotenv.Load()

	if err != nil {
		return env, err
	}
	fmt.Printf("%s", env.Bucket_name)

	env.Bucket_name = os.Getenv("bucket_name")
	return env, nil

}
