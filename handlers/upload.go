package handlers

import (
	"context"
	"strings"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func Upload(c *gin.Context) {

	// get configs
	cfg, exists := utils.GetConfig(c)
	if !exists {
		utils.Write_server_error(c, "config not found")
	}

	file, err := c.FormFile("file")
	if err != nil {
		utils.Write_server_error(c, "no file received")
		return
	}

	if strings.Contains(file.Filename, "/") {
		utils.Write_server_error(c, "name can not have any '/'")
		return
	}

	path := c.PostForm("path")
	if path == "" {
		utils.Write_server_error(c, "no path received")
		return
	}

	s3_path := path + "/" + file.Filename

	file_data, err := file.Open()
	if err != nil {
		utils.Write_server_error(c, "could not open file")
		return
	}
	defer file_data.Close()

	_, err = cfg.Aws_client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(cfg.Bucket_name),
		Key:    aws.String(s3_path),
		Body:   file_data,
	})

	if err != nil {
		utils.Write_server_error(c, "s3 upload error")
		return
	}

	utils.Write_server_success(c, "ok")
}
