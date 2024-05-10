package main

import (
	"fmt"
	"math/rand"
	"time"
)

// ------------------------------ 控制流模块 ------------------------------ //

func init() {
	fmt.Println("init")
}

func sliceDemo() {
	letters := []string{"a", "b", "c", "d", "e"}
	index := 2
	if index < len(letters) {
		fmt.Println(letters[index])
		letters = append(letters[:index], letters[index+1:]...)
		fmt.Println("After", letters)
	}
}

func mapDemo() {
	demo := make(map[string]int)
	demo["a"] = 1
	demo["b"] = 2
	for key, value := range demo {
		fmt.Println(key, value)
	}
}

func structDemo() {
	type user struct {
		name  string
		email string
		age   int
	}

	type Person struct {
		user
		phone string
	}

	var user1 = user{
		name:  "user1",
		email: "",
		age:   1,
	}
	user2 := &user1
	user2.age = 2
	fmt.Println(user1)

	var person1 = Person{
		user: user{
			name: "person1",
		},
		phone: "123456789",
	}
	fmt.Println(person1.phone, person1.name)
}

func romanNumerals(numeral string) int {
	keyValues := map[rune]int{
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	}
	result := 0
	fmt.Println("romanNumerals")
	for index, runValue := range numeral {
		if val, preset := keyValues[runValue]; preset {
			result += val
		} else {
			fmt.Println("preset", preset, "val", val)
			fmt.Println("Error", index, runValue)
			return 0
		}
	}
	fmt.Println(result)
	return result
}

func fibonacci(n int) []int {
	if n < 2 {
		return make([]int, 0)
	}
	result := make([]int, n)
	result[0], result[1] = 1, 1
	for i := 2; i < n; i++ {
		result[i] = result[i-1] + result[i-2]
	}
	return result
}

func main() {
	var i int = 1
	if i > 2 {
		fmt.Println("i > 2")
	}

	switch i {
	case 1:
		fmt.Println("i == 1")
	}
	// switch 可以调用函数，针对可能的返回值编写 case 语句
	switch time.Now().Weekday().String() {
	case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
		fmt.Println("Today is Monday")
	default:
		fmt.Println("Today is not Monday")
	}
	// 在 Go 中，可以在 switch 语句中省略条件，就像在 if 语句中那样。 此模式类似于比较 true 值，就像强制 switch 语句一直运行一样。
	rand.Seed(time.Now().Unix())
	r := rand.Float64()
	switch {
	case r > 0.1:
		fmt.Println("Common case")
	default:
		fmt.Println("10% of time")
	}
	// 在某些编程语言中，你会在每个 case 语句末尾写一个 break 关键字。 但在 Go 中，当逻辑进入某个 case 时，它会退出 switch 块，除非你显式停止它。 若要使逻辑进入到下一个紧邻的 case，请使用 fallthrough 关键字。
	switch num := 15; {
	case num < 50:
		fmt.Println("%d is less than 50\n", num)
		fallthrough
	case num > 100:
		fmt.Printf("%d is greater than 100\n", num)
		fallthrough
	case num < 200:
		fmt.Printf("%d is less than 200", num)
	}

	// for 循环
	sum := 0
	for i := 0; i < 100; i++ {
		sum += i
	}
	fmt.Println("\n", sum)
	// 空的预处理语句和后处理语句
	var num int64
	for num != 5 {
		num = rand.Int63n(15)
		fmt.Println(num)
	}
	// 无限循环和 break 语句
	var value int32
	sec := time.Now().Unix()
	rand.Seed(sec)

	for {
		fmt.Println("Writting inside the loop")
		if value = rand.Int31n(10); value == 5 {
			fmt.Println("finish!")
			break
		}
	}

	// defer语句
	for i := 0; i < 5; i++ {
		defer fmt.Println(i)
	}

	// panic语句
	// panic("PANIC")

	// 结构和容器
	// 数组
	// var arr [5]int
	cities := [2]string{"shanghai", "beijing"}
	fmt.Println(cities)
	demos := [...]string{"a"}
	fmt.Println(demos)

	sliceDemo()

	mapDemo()

	structDemo()

	romanNumerals("MCLKX")

	test1 := fibonacci(6)
	fmt.Println(test1)
}
