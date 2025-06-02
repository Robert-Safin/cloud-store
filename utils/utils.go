package utils

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type CFG struct {
	Aws_client  *s3.Client
	Bucket_name string
	Region      string
}

func Load_env() (CFG, error) {
	env := CFG{}
	err := godotenv.Load()

	if err != nil {
		return env, err
	}
	fmt.Printf("%s", env.Bucket_name)

	bucket := os.Getenv("S3_BUCKET")
	if bucket == "" {
		Panic_on_err(errors.New("S3_BUCKET env variable is blank"))
	}
	env.Bucket_name = bucket

	region := os.Getenv("S3_REGION")
	if region == "" {
		Panic_on_err(errors.New("S3_REGION env variable is blank"))
	}
	env.Region = region

	return env, nil

}

func Panic_on_err(err error) {
	if err != nil {
		log.Fatalf("[PANIC] %s", err)
	}
}

func Write_server_error(c *gin.Context, msg string) {
	c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
}

func Write_server_success(c *gin.Context, msg string) {
	c.JSON(http.StatusOK, gin.H{
		"message": msg,
	})
}

func GetConfig(c *gin.Context) (CFG, bool) {
	val, exists := c.Get("config")
	if !exists {
		return CFG{}, false
	}
	cfg, ok := val.(CFG)
	return cfg, ok
}
