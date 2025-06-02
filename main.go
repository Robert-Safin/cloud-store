package main

import (
	"context"
	"time"

	"github.com/Robert-Safin/cloud-store/handlers"
	"github.com/Robert-Safin/cloud-store/middleware"
	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/ping", handlers.Ping)
	router.POST("/upload", handlers.Upload)
	router.GET("/list", handlers.List)
	router.GET("/folder", handlers.Folder)
	router.Run(":8080")
}
