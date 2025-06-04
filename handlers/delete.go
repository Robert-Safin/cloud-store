package handlers

import (
	"context"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"

	s3types "github.com/aws/aws-sdk-go-v2/service/s3/types"
)

func Delete(c *gin.Context) {
	cfg, exists := utils.GetConfig(c)
	if !exists {
		utils.Write_server_error(c, "config not found")
	}

	path := c.Query("path")

	if path == "" {
		utils.Write_server_error(c, "path required")
		return
	}

	listResp, err := cfg.Aws_client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(cfg.Bucket_name),
		Prefix: aws.String(path),
	})

	if err != nil {
		utils.Write_server_error(c, "Failed to list objects")
		return
	}

	if len(listResp.Contents) == 0 {
		utils.Write_server_error(c, "No files to delete")
		return
	}

	var objectsToDelete []s3types.ObjectIdentifier
	for _, obj := range listResp.Contents {
		objectsToDelete = append(objectsToDelete, s3types.ObjectIdentifier{Key: obj.Key})
	}

	_, err = cfg.Aws_client.DeleteObjects(context.TODO(), &s3.DeleteObjectsInput{
		Bucket: aws.String(cfg.Bucket_name),
		Delete: &s3types.Delete{
			Objects: objectsToDelete,
			Quiet:   aws.Bool(true),
		},
	})

	if err != nil {
		utils.Write_server_error(c, "Failed to delete objects")
		return
	}

	utils.Write_server_success(c, "ok")
}
