import express from 'express';
const list = express();

const todos= [
   {id: 1, message: 'code'},
   {id: 2, message: 'apprendre'},
   {id: 3, message: 'musique'},
   {id: 4, message: 'conduire'},
   {id: 5, message: 'voyage'},

  ]

  list.use(express.json())


// recuperation de toute les données get
  list.get('/',(req, res) =>{
    res.status(200).json(todos)
  })

//GET
list.get('/:id',(req, res)=>{
  const {id} = req.params
  const data = todos.find(e => e.id ===parseInt(id))
  if(!data) {
    return res.statut(404).json({messages : "pas trouvé"})
  }
  res.status(200).json(data)
})

//POST
list.post('/', (req, res)=>{
  const { body } = req
  const datas = {
    id : todos.length + 1,
    ...body
    }
    
  console.log(datas)
  todos.push(datas)
  res.status(201).json(datas)
})


//UPDATE
list.put('/:id',(req, res) =>{
  const {id} = req.params
  const {body} = req
  const data = todos.find(e => e.id === parseInt(id))
  if(!data) {
    return res.status(404).json({messages : "pas trouvé"})
  }
  data.message = body.message
  res.status(200).json(data)
})

//DELETE
list.delete('/:id',(req, res)=>{
  const {id} = req.params
  const data = todos.find(e => e.id === parseInt(id))
  if(!data) {
    return res.status(404).json({messages : "pas trouvé"})
  }
  todos.splice(todos.indexOf(id), 1)
  res.status(200).json({message :"suppréssion de l'element"})
})
list.listen(3500, ()=> console.log('port 3500'));