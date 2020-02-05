import gql from 'graphql-tag';

export const GET_TODOS = gql`
  query GetMyTodos {
    myTodos {
      id
      title
      description
      checked
      position {
        x
        y
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String!
    $x: Int!
    $y: Int!
  ) {
    createTodo(title: $title, description: $description, x: $x, y: $y) {
      id
      title
      description
      checked
      position {
        x
        y
      }
    }
  }
`;

export const CHECK_TODO = gql`
  mutation CheckTodo($id: Int!, $checked: Boolean!) {
    updateTodo(id: $id, checked: $checked)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String!, $description: String!) {
    updateTodo(id: $id, title: $title, description: $description)
  }
`;

export const UPDATE_TODO_POSITION = gql`
  mutation UpdateTodoPosition($id: Int!, $x: Int!, $y: Int!) {
    updateTodo(id: $id, x: $x, y: $y)
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;
