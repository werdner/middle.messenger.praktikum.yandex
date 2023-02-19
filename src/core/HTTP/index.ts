import {HTTPTransport, METHODS} from "./HTTPTransport";
import {api} from './BaseApi'

const httpService = new HTTPTransport('https://ya-praktikum.tech/api/v2')
export {api, httpService, METHODS}
