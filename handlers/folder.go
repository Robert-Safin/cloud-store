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
	cfg, exists := utils.GetConfig(c)

	if !exists {
		utils.Write_server_error(c, "config not found")
	}

	path := c.Query("path")
	if path == "" {
		utils.Write_server_error(c, "path is required")
		return
	}

	name := c.Query("name")
	if name == "" {
		utils.Write_server_error(c, "name is required")
		return
	}

	_, err := cfg.Aws_client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(cfg.Bucket_name),
		Key:    aws.String(path + "/" + name + "/"),
		Body:   http.NoBody,
	})

	if err != nil {
		utils.Write_server_error(c, "failed to create folder")
		return
	}

	utils.Write_server_success(c, "ok")

}
