package handlers

import (
	"context"
	"net/http"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func Folder(c *gin.Context) {
	cfgVal, exists := c.Get("config")

	if !exists {
		utils.Write_server_error(c, "internal error")
		return
	}
	cfg := cfgVal.(utils.CFG)

	path := c.Query("path")
	if path == "" {
		utils.Write_server_error(c, "path is required")
		return
	}

	_, err := cfg.Aws_client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(cfg.Bucket_name),
		Key:    aws.String(path),
		Body:   http.NoBody,
	})

	if err != nil {
		utils.Write_server_error(c, "failed to create folder")
		return
	}

	utils.Write_server_success(c, "ok")

}
