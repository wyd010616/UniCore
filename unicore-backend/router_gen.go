package main

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	"unicore/biz/router"
)

func register(r *server.Hertz) {
	router.RegisterRouters(r)
}
