package handlers

import (
	"context"
	"net/http"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func List(c *gin.Context) {
	cfg, exists := utils.GetConfig(c)
	if !exists {
		utils.Write_server_error(c, "config not found")
	}

	path := c.Query("path")

	if path == "" {
		utils.Write_server_error(c, "path required")
		return
	}

	output, err := cfg.Aws_client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket:    &cfg.Bucket_name,
		Prefix:    aws.String(path + "/"),
		Delimiter: aws.String("/"),
	})

	if err != nil {
		utils.Write_server_error(c, "failed to list objects")
		return
	}

	var files []string
	for _, item := range output.Contents {
		if *item.Key != path+"/" {
			files = append(files, *item.Key)
		}
	}

	var folders []string
	for _, cp := range output.CommonPrefixes {
		folders = append(folders, *cp.Prefix)
	}
	// fmt.Println("__________________________")
	// fmt.Println(folders)
	// fmt.Println(files)
	// fmt.Println("__________________________")
	c.JSON(http.StatusOK, gin.H{
		"folders": folders,
		"files":   files,
	})

}
