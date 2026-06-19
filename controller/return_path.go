package controller

import (
	"strings"

	"github.com/QuantumNous/token-continent/common"
	"github.com/QuantumNous/token-continent/setting/system_setting"
)

func paymentReturnPath(suffix string) string {
	base := strings.TrimRight(system_setting.ServerAddress, "/")
	return base + common.ThemeAwarePath(suffix)
}
