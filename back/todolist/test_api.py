import json

from graphene_django.utils.testing import GraphQLTestCase

class AddTestCase(GraphQLTestCase):
    def test_valid_add_mutation(self):
        response = self.query(
            '''
        mutation addTodoMutation($title:String!, $description: String! ){
          addTodo(title:$title, description:$description){
            code
            msg
          }
        }
            ''',
            op_name='addTodoMutation',
            variables={'title': 'My title', 'description': 'Test description'}

        )
        self.assertResponseNoErrors(response)
        
class DeleteTaskCase(GraphQLTestCase):
  def test_valid_delete_task(self):
        response = self.query(
            '''
        mutation addTodoMutation($title:String!, $description: String! ){
          addTodo(title:$title, description:$description){
            code
            msg
          }
        }
            ''',
            op_name='addTodoMutation',
            variables={'title': 'My title', 'description': 'Test description'}

        )
        self.assertResponseNoErrors(response) 

        response = self.query(
          '''
          mutation deleteTodoMutation($id: String!) {
            deleteTodo(id: $id) {
              code
              msg
            }
          }
          ''',
          op_name="deleteTodoMutation",
          variables={'id': "1"}

        )
        self.assertResponseNoErrors(response)