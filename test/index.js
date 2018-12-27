const assert = require('assert')
const vkSdk = require('../index')
const querystring = require('querystring')

describe('checkVKQueryParamsSign', function() {
  const sdk = new vkSdk({
    CLIENT_SECRET: process.env.CLIENT_SECRET || 'GKuUPHZxVNSu2UmykyfL'
  })

  describe('Should verify right signatures', function() {
    it('Basic OK', function() {
      const openString = 'vk_access_token_settings=notify&vk_app_id=6799608&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_language=ru&vk_platform=desktop_web&vk_user_id=58757460&sign=3auuAb6bXaNNttQwMFuACpJ_xTeU93o0rCR3X_GpB5o'
      assert(sdk.checkVKQueryParamsSign(querystring.parse(openString)))
    })
  })

  describe('Should not verify wrong signatures', function() {
    it('Basic OK', function() {
      const openString = 'vk_access_token_settings=notify&vk_app_id=6799608&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_language=ru&vk_platform=desktop_web&vk_user_id=58757461&sign=3auuAb6bXaNNttQwMFuACpJ_xTeU93o0rCR3X_GpB5o'
      assert(!sdk.checkVKQueryParamsSign(querystring.parse(openString)))
    })

    it('Empty params', function() {
      const openString = ''
      assert(!sdk.checkVKQueryParamsSign(querystring.parse(openString)))
    })

    it('Empty sign', function() {
      const openString = 'vk_access_token_settings=notify&vk_app_id=6799608&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_language=ru&vk_platform=desktop_web&vk_user_id=58757461&sign='
      assert(!sdk.checkVKQueryParamsSign(querystring.parse(openString)))
    })
  })
})
