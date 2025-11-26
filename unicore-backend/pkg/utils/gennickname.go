package utils

var (
	prefix = []string{
		"Angry",
		"Baby",
		"Crazy",
		"Diligent",
		"Excited",
		"Fat",
		"Greedy",
		"Hungry",
		"Interesting",
		"Jolly",
		"Kind",
		"Little",
		"Magic",
		"Naïve",
		"Old",
		"PKU",
		"Quiet",
		"Rich",
		"Superman",
		"Tough",
		"Undefined",
		"Valuable",
		"Wifeless",
		"Xiangbuchulai",
		"Young",
		"Zombie",
	}
	names = []string{
		"Alice",
		"Bob",
		"Carol",
		"Dave",
		"Eve",
		"Francis",
		"Grace",
		"Hans",
		"Isabella",
		"Jason",
		"Kate",
		"Louis",
		"Margaret",
		"Nathan",
		"Olivia",
		"Paul",
		"Queen",
		"Richard",
		"Susan",
		"Thomas",
		"Uma",
		"Vivian",
		"Winnie",
		"Xander",
		"Yasmine",
		"Zach",
	}
)

func GenNickName(index int) string {
	if index < len(names) {
		return names[index]
	} else {
		nickname := ""
		for index >= len(prefix) {
			idx := index / len(prefix)
			nickname += (prefix[idx-1] + " ")
			index = index % len(prefix)
		}
		nickname += names[index]
		return nickname
	}
}
