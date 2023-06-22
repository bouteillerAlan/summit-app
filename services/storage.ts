import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Give you the abilities to store, read and delete data in the storage
 * automatically chose between `AsyncStorage` (if you are in web) and `SecureStorage` (for IOS and Android)
 */
export default class Storage {
  private static instance: Storage;

  /**
   * singleton handler
   * @returns {Storage} the single instance of `Storage`
   */
  public static getInstance(): Storage {
    if (typeof Storage.instance === 'undefined') Storage.instance = new Storage();
    return Storage.instance;
  }

  /**
   * check if the code is executed on a web browser
   * @returns {boolean} true if the code is executed on a web browser
   * @private
   */
  private isWeb(): boolean {
    return Platform.OS === 'web';
  }

  /**
   * save a value at a given key in the secure storage
   * @param {string} key the key you want to have for accessing the value later
   * @param {string} value the value you want to store
   * @returns {Promise<void>}
   */
  public async save(key: string, value: string): Promise<void> {
    this.isWeb()
      ? await AsyncStorage.setItem(key, value)
      : await SecureStore.setItemAsync(key, value);
  }

  /**
   * get the value for a key in the secure storage
   * @param {string} key name of the key for the value you want to access
   * @returns {Promise<string>} the value or the string 'undefined'
   */
  public async get(key: string): Promise<string> {
    const result = this.isWeb()
      ? await AsyncStorage.getItem(key)
      : await SecureStore.getItemAsync(key);
    return result === null ? 'undefined' : result;
  }

  /**
   * delete the value of a given key in the secure storage
   * @param {string} key name of the key for the value you want to delete
   * @returns {Promise<void>}
   */
  public async remove(key: string): Promise<void> {
    this.isWeb()
      ? await AsyncStorage.removeItem(key)
      : await SecureStore.deleteItemAsync(key);
  }
}
