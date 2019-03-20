const fs = require('fs') //модуль для ФС
const crypto = require('crypto') //модуль для криптографии Nodejs
const { stringify } = require('querystring') //методы для парсинга строки

const PUBKEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAukXD0MX64KKsWuiv2A4/
IEaXknvze019wZtvxYOIgGFjeWGp26CMa627cKpQS8TOT9TJ9OgbWuI+MWTK2dfP
yDzqfuPVHWbnBaM85O3tQ/Tv2mBwkvzP3z1gTZ+mYSuAfZG0H6vLG0GPDj2I79Zj
QSXcLSNWoS+7XNcLgDE5RCdAF+VLlSir+e1n/JWRb3XtIyyrDMF3VzfJsX6DVhxW
4FfhxqjX4JHiMhdDHHiuzMJ3zNaLOzS7ynaQ5OgCfp89ageNMgp1DbLpGbxlXlex
m4/CSuoVEY6NPrpytVAOJhiE0rwtBZPsMTGzXtBXpxv2NyO2Qdh0kjhB+qa3mmln
XwIDAQAB
-----END PUBLIC KEY-----`

class VKApp {
	constructor({ CLIENT_SECRET, MERCHANT_KEY, MERCHANT_ID }) {
		if (CLIENT_SECRET === undefined) throw 'No CLIENT_SECRET!'
		this.CLIENT_SECRET = CLIENT_SECRET
	}

	checkVKQueryParamsSign(params) {
		const list_of_params = Object.entries(params) //перевод в обьекта параметро в список
			.filter(e => e[0].startsWith('vk_')) //фильтрация параметров VK
			.sort((a, b) => {
				if (a[0] < b[0]) {
					return -1
				}
				if (a[0] > b[0]) {
					return 1
				}
				return 0
			}) //сортировка по алфавиту
		const params_str = stringify(list_of_params.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {})) //перевод параметров в строковый вид

		const hmac = crypto.createHmac('sha256', this.CLIENT_SECRET) //инициализация генератора подписи
		hmac.update(params_str) //добавление строки с параметрами
		const sign = hmac
			.digest('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '') //генерация подписи
		return sign === params.sign //сравнение подписей
	}

	checkVKPaySignature(data_str, signature) {
		return (
			crypto
				.createVerify('RSA-SHA1')
				.update(data_str)
				.verify(PUBKEY, signature, 'base64') === true
		)
	}
}

module.exports = VKApp
