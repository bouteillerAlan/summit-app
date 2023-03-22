import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

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
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      maxRedirects: 0,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
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
}
