package main

import (
	"bytes"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"fmt"
	"os"
)

// 生成RSA私钥和公钥，保存到文件中
// bits 证书大小
func GenerateRSAKey(bits int) {
	//GenerateKey函数使用随机数据生成器random生成一对具有指定字位数的RSA密钥
	//Reader是一个全局、共享的密码用强随机数生成器
	privateKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		panic(err)
	}
	//保存私钥
	//通过x509标准将得到的ras私钥序列化为ASN.1 的 DER编码字符串
	X509PrivateKey := x509.MarshalPKCS1PrivateKey(privateKey)
	//使用pem格式对x509输出的内容进行编码
	//创建文件保存私钥
	privateFile, err := os.Create("private.pem")
	if err != nil {
		panic(err)
	}
	defer privateFile.Close()
	//构建一个pem.Block结构体对象
	privateBlock := pem.Block{Type: "RSA Private Key", Bytes: X509PrivateKey}
	//将数据保存到文件
	pem.Encode(privateFile, &privateBlock)

	//保存公钥
	//获取公钥的数据
	publicKey := privateKey.PublicKey
	//X509对公钥编码
	X509PublicKey, err := x509.MarshalPKIXPublicKey(&publicKey)
	if err != nil {
		panic(err)
	}
	//pem格式编码
	//创建用于保存公钥的文件
	publicFile, err := os.Create("public.pem")
	if err != nil {
		panic(err)
	}
	defer publicFile.Close()
	//创建一个pem.Block结构体对象
	publicBlock := pem.Block{Type: "RSA Public Key", Bytes: X509PublicKey}
	//保存到文件
	pem.Encode(publicFile, &publicBlock)
}

func GetPublicKeyByPrivateKey(privateKeyPemStr string) (string, error) {
	fmt.Println(privateKeyPemStr)
	privateKeyPem, _ := pem.Decode([]byte(privateKeyPemStr))
	if privateKeyPem == nil {
		return "", errors.New("decode private key pem error")
	}

	privateKey, err := x509.ParsePKCS1PrivateKey(privateKeyPem.Bytes)
	if err != nil {
		return "", err
	}

	publicKeyPemBuffer := bytes.NewBuffer([]byte{})

	publicBytes, err := x509.MarshalPKIXPublicKey(&privateKey.PublicKey)
	if err != nil {
		return "", err
	}
	publicKeyPem := &pem.Block{
		Type:    "PUBLIC KEY",
		Headers: nil,
		Bytes:   publicBytes,
	}

	if err := pem.Encode(publicKeyPemBuffer, publicKeyPem); err != nil {
		return "", err
	}
	return publicKeyPemBuffer.String(), nil
}

func InitJwt() {
	file, err := os.Open("./rsa_private_key.pem")
	if err != nil {
		panic(fmt.Sprintf("init jwt public key error: %v", err))
	}
	defer file.Close()
	info, _ := file.Stat()
	buf := make([]byte, info.Size())
	file.Read(buf)

	publicKey, err := GetPublicKeyByPrivateKey(string(buf))
	// publicKey, err := NewJWT().GetPublicKeyByPrivateKey(key)
	if err != nil {
		panic(fmt.Sprintf("init jwt public key error: %v", err))
	}
	fmt.Println(publicKey)
}

// func main() {
// 	//生成密钥对，保存到文件
// 	// GenerateRSAKey(2048)
// 	InitJwt()
// }

func main() {
	fmt.Println("init")
	InitJwt()
}
