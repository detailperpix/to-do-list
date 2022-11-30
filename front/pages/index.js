import Head from 'next/head'
import Container from '@mui/material/Container'
import { Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from 'react';
import client from '../libs/apollo-client';
import { gql } from '@apollo/client';

export default function Home() {
  const [data, setData] = useState([])
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [count, setCount] = useState(0)

  useEffect(() => {
    setData([
      {
        id: 1,
        title: 'Test',
        description: 'this is description'
      },
      {
        id: 2,
        title: 'Test',
        description: 'this is description'
      },
    ])
    setCount(2)
    client.query({
      query: gql`
        query {
          allTodo{
            id
            title
            description
            checked
          }
        }
      `
    }).then(result => {
      console.log(result.data.allTodo)
      setData(result.data.allTodo)
      setCount(0)
    })
    return () => { }
  }, [])



  function handleAddToDo(e) {
    e.preventDefault()
    let temp = [...data]
    let tempCount = ++count

    setData([...data, { id: count, title: title, description: desc }])
    setCount(tempCount)
    client.mutate({
      mutation: gql`
        mutation addTodoMutation($title:String!, $description: String! ){
          addTodo(title:$title, description:$description){
            code
            msg
          }
        }
      `,
      variables:{
        title:title,
        description:desc
      }
    }).then(result=>{
      console.log(result)
    })
  }

  function deleteItem(id) {
    var filtered = data.filter(function (value, index, arr) {
      return value.id != id;
    });
    setData(filtered)
  }

  console.log(data)
  return (
    <div>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Simple to do list" />
      </Head>

      <main>
        <Typography variant='h1'>Simple To Do List</Typography>

        <Container>
          <Grid container spacing={2}>
            <Grid item>
              <Box>
                <TextField
                  id="todolist-input-todo-id"
                  label="To Do"
                  onChange={(e) => { setTitle(e.target.value) }}
                />
                <TextField
                  id="todolist-input-description-id"
                  label="Description"
                  onChange={(e) => { setDesc(e.target.value) }}
                  sx={{ mx: 2 }}
                />
                <Button sx={{ m: 2 }} onClick={handleAddToDo}>
                  + Add
                </Button>
              </Box>

              <List dense>
                {data.map((val, idx) => {
                  return (<ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(val.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Checkbox />
                    <ListItemText
                      primary={val.title}
                      secondary={val.description}
                    />
                  </ListItem>)
                })
                }
              </List>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
