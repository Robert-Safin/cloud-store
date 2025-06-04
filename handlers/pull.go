package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func Pull(c *gin.Context) {
	cfg, exists := utils.GetConfig(c)
	if !exists {
		utils.Write_server_error(c, "config not found")
	}

	path := c.Query("path")

	if path == "" {
		utils.Write_server_error(c, "path required")
		return
	}
	presign_client := s3.NewPresignClient(cfg.Aws_client)
	req, err := presign_client.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(cfg.Bucket_name),
		Key:    aws.String(path),
	}, s3.WithPresignExpires(5*time.Minute))

	if err != nil {
		utils.Write_server_error(c, "presign error")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"link": req,
	})

}
