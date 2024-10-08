//
// // send telegram msg to user or errors to developer
//
// import {
// 	ERR_CHAT_ID,
// 	ERROR_BOT_TOKEN,
// 	NOTIFICATION_BOT_TOKEN
// } from "../config/configs"
//
// import TelegramBot from 'node-telegram-bot-api'
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
//
// import { CustomerDatabaseService } from '../service/database/customer.db.service'
// import { CacheService } from '../service/cache/cache.service'
//
// import ErrorInterceptor from "../exceptions/Error.exception";
// import {Customer} from "../entity/customer/Customer";
//
// export class TelegramNotificationApi {
//   private readonly notifToken = NOTIFICATION_BOT_TOKEN
// 	private readonly errorToken = ERROR_BOT_TOKEN
// 	private readonly devId = ERR_CHAT_ID
//
// 	constructor() {}
//
// 	// messageInterceptor -> intercept a user message with start bot, get tg id, 2fa to approve transactions
// 	public async messageInterceptor(): Promise<void> {
// 		const bot = new TelegramBot(this.notifToken, { polling: true })
// 		const db = new CustomerDatabaseService()
// 		const c = new CacheService()
//
// 		bot.onText(/\/start/, async (msg) => await bot.sendMessage(msg.chat.id, `Welcome, ${msg.chat.first_name}! Notification bot is activated.`))
// 		bot.onText(/\/id/, async (msg) => await bot.sendMessage(msg.chat.id, `Your chat id is: ${msg.chat.id}`))
//
// 		bot.on("message", async (msg) => {
// 			if(msg.text !== "/start" && msg.text !== "/id") {
// 				let chatId: number = msg.chat.id
// 				let customer: Customer = await db.findUserByFilter({telegramId: chatId})
// 				if (!customer) {
// 					await bot.sendMessage(chatId, `You are unknown person.`)
// 					return
// 				} else {
// 					if(msg.text === "N") {
// 						await bot.sendMessage(chatId, `Transaction was rejected.`)
// 						return
// 					} else if (msg.text === "Y") {
// 						await c.clearCachedDataByKey(customer.getId())
// 						await c.setCachedData({userId: customer.getId(), isApprove: true})
// 						await bot.sendMessage(chatId, `Transaction will be approved.`)
// 						return
// 					} else {
// 						return
// 					}
// 				}
// 			}
// 		})
//
// 		bot.on("error", async () => await this.sendErrorMessage("Caught an error in notification bot."))
// 	}
//
// 	// sendInfoMessage -> send 2fa message or other notifications to users
//   public async sendInfoMessage(chatId: number, msg: string): Promise<void> {
// 		const message: string = encodeURI(msg)
// 		const url: string = `https://api.telegram.org/bot${this.notifToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`
//
// 		const opts: AxiosRequestConfig = {
// 			method: 'GET',
// 			data: msg,
// 			responseType: 'stream',
// 		}
//
// 		await this.sendRequest(url, opts)
//   }
//
// 	// sendErrorMessage -> send error messages to developer
// 	public async sendErrorMessage(msg: string): Promise<void> {
// 		console.log('tg interact');
// 		const message: string = encodeURI(msg)
// 		const url: string = `https://api.telegram.org/bot${this.errorToken}/sendMessage?chat_id=${this.devId}&parse_mode=html&text=${message}`
//
// 		const opts: AxiosRequestConfig = {
// 			method: 'GET',
// 			data: msg,
// 			responseType: 'stream',
// 		}
//
// 		await this.sendRequest(url, opts)
// 	}
//
//   // ============================================================================================================= //
//   // ############################################# private usage area ############################################ //
//   // ============================================================================================================= //
//
// 	// sendRequest -> send http request
// 	private async sendRequest(url: string, options: AxiosRequestConfig): Promise<void> {
// 		return await axios(url,options)
// 			.then((res: AxiosResponse) => {
// 				console.log(res.status)
// 				console.log(res.statusText)
// 				// console.log('res body => ', res);
// 			})
// 			.catch((e: AxiosError) => {
// 				throw ErrorInterceptor.ExpectationFailed(`Notification was failed with error: ${e.message}`)
// 			})
// 	}
//
// };