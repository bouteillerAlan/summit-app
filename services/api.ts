import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import Storage from './storage';
import { type DateTime } from 'luxon';

/**
 * handle all the call and the response between the app and the api
 * this is a singleton
 */
export default class Api {
  private static instance: Api;
  private readonly axs: AxiosInstance;

  constructor() {
    /**
     * init the base config for axios
     * @type {axios.AxiosInstance}
     */
    this.axs = axios.create({
      baseURL: 'http://192.168.1.103:3000',
      timeout: 5000,
      maxRedirects: 0,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * singleton handler
   * @returns {Api} the single instance of `Api`
   */
  public static getInstance(): Api {
    if (typeof Api.instance === 'undefined') Api.instance = new Api();
    return Api.instance;
  }

  /**
   * get the token
   * @returns {string} the token or the 'undefined' value if no value is given
   * @private
   */
  private async getToken(): Promise<string> {
    return Storage.getInstance().get('token')
      .then((token: string) => token)
      .catch((): string => 'error');
  }

  /**
   * HTTP POST on /auth/login
   * @param {string} email email for the login attempt
   * @param {string} password password for the login attempt
   * @returns {Response} HTTP response or error
   */
  public async login(email: string, password: string): Promise<AxiosResponse> {
    return this.axs.post(
      '/auth/login',
      { email, password },
      { validateStatus: status => status === 201 }
    );
  }

  /**
   * HTTP GET on /user/me
   * @returns {Response} HTTP response or error
   */
  public async getUser(): Promise<AxiosResponse> {
    const token = await this.getToken();
    return this.axs.get(
      '/user/me',
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: status => status === 200
      }
    );
  }

  /**
   * HTTP GET on /training/{date}
   * @param {DateTime} date the day for the workout you want to fetch
   * @returns {Response} HTTP response or error
   */
  public async getDayWorkout(date: DateTime): Promise<AxiosResponse> {
    const token: string = await this.getToken();
    return this.axs.get(
      `/training/d/${date.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: status => status === 200
      }
    );
  }
}
