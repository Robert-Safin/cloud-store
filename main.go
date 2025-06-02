package main

import (
	"context"

	"github.com/Robert-Safin/cloud-store/handlers"
	"github.com/Robert-Safin/cloud-store/middleware"
	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	cfg, err := utils.Load_env()
	utils.Panic_on_err(err)

	aws_cfg, err := config.LoadDefaultConfig(context.Background(), config.WithRegion(cfg.Region))
	utils.Panic_on_err(err)

	s3_client := s3.NewFromConfig(aws_cfg)
	cfg.Aws_client = s3_client

	router.Use(middleware.ConfigMiddleware(cfg))

	router.GET("/ping", handlers.Ping)
	router.GET("/upload", handlers.Upload)
	router.Run(":8080")
}
