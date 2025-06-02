package handlers

import (
	"context"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func Upload(c *gin.Context) {

	// get configs
	cfgVal, exists := c.Get("config")
	if !exists {
		utils.Write_server_error(c, "internal error")
		return
	}
	cfg := cfgVal.(utils.CFG)

	file, err := c.FormFile("file")
	if err != nil {
		utils.Write_server_error(c, "no file received")
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

// func Upload(c *gin.Context) {

// 	// get configs
// 	cfgVal, exists := c.Get("config")
// 	if !exists {
// 		utils.Write_server_error(c, "internal error")
// 		return
// 	}
// 	cfg := cfgVal.(utils.CFG)

// 	// get form-data
// 	localFilePath := "./sample.txt"
// 	// path := "a/b/c"
// 	file, err := os.Open(localFilePath)
// 	if err != nil {
// 		utils.Write_server_error(c, "could not open file")
// 		return
// 	}
// 	defer file.Close()

// 	// join s3 path
// 	_, filename := filepath.Split(localFilePath)

// 	// upload
// 	_, err = cfg.Aws_client.PutObject(context.TODO(), &s3.PutObjectInput{
// 		Bucket: aws.String(cfg.Bucket_name),
// 		Key:    aws.String(filename),
// 		Body:   file,
// 	})

// 	if err != nil {
// 		utils.Write_server_error(c, "s3 upload error")
// 		return
// 	}

// 	utils.Write_server_success(c, "upload successful")
// }
