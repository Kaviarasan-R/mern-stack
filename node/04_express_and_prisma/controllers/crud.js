const prisma = require("../prisma/client")
const where = (req) => ({ where: { id: +req.params.id } })

module.exports = (model) => ({
    getAll: async (req, res) => res.json(await prisma[model].findMany()),
    getOne: async (req, res) => {
        const data = await prisma[model].findUniqueOrThrow({
            ...where(req),
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })
        res.json(data)
    },
    create: async (req, res) => res.status(201).json(await prisma[model].create({ data: req.body })),
    update: async (req, res) => res.json(await prisma[model].update({ ...where(req), data: req.body })),
    remove: async (req, res) => res.json(await prisma[model].delete(where(req))),
})
