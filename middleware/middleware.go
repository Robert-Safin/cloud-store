package middleware

import (
	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/gin-gonic/gin"
)

func ConfigMiddleware(config utils.CFG) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("config", config)
		c.Next()
	}
}
