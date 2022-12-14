import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titulo from 'App/Models/Titulo'
import TituloValidator from '../../Validators/TituloValidator'

export default class TitulosController {
    public async index({ }: HttpContextContract) {
        const topic = await Titulo.all()
        return topic
      }
    
      public async store({ request }: HttpContextContract) {
        const data = await request.validate(TituloValidator)
        const topic = await Titulo.create({ ...data })
        return topic
      }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const topic = await Titulo.findOrFail(params.id)
          return topic
        } catch (error) {
          response.status(400).send("Meditação não encontrado!!!")
        }
      }
    
      public async update({ request, params, response }: HttpContextContract) {
        const { descricao, duracao, tipo } = await request.validate(TituloValidator)
        try {
          const topic = await Titulo.findOrFail(params.id)
          topic.descricao = descricao
          topic.duracao = duracao
          topic.tipo = tipo
          await topic.save()
          return topic
    
        } catch (error) {
          response.status(400).send("Meditação não encontrado!!!")
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const topic = await Titulo.findOrFail(params.id)
          await topic.delete()
          return topic
        } catch (error) {
          response.status(400).send("Meditação não encontrado!!!")
        }
      }
}
