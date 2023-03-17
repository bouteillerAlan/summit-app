import * as SecureStore from 'expo-secure-store';

export default class StorageService {
  /**
   * save a value at a given key in the secure storage
   * @param {string} key the key you want to have for accessing the value later
   * @param {string} value the value you want to store
   * @returns {Promise<void>}
   */
  public async save(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * get the value for a key in the secure storage
   * @param {string} key name of the key for the value you want to access
   * @returns {Promise<string | undefined>} the value or undefined
   */
  public async get(key: string): Promise<string | undefined> {
    const result = await SecureStore.getItemAsync(key);
    return result === null ? undefined : result;
  }

  /**
   * delete the value of a given key in the secure storage
   * @param {string} key name of the key for the value you want to delete
   * @returns {Promise<void>}
   */
  public async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
