const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    const { ctx } = this
    let manifest

    try {
      manifest = require('../public/static/manifest.json')
    } catch (error) {
      manifest = {}
    }

    await ctx.render('home', {
      isDev: process.env.NODE_ENV === 'development',
      manifest
    })
  }
}

module.exports = HomeController
