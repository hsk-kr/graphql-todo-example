import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  CHECK_TODO,
  UPDATE_TODO_POSITION,
  DELETE_TODO,
} from './queries';
import Todo from '../Todo';
import Loading from '../Loading';

const hideContextMenu = () => {
  document.querySelector('.todo-board-contextmenu').style.opacity = 0; // hide context menu
};

const TodoBoard = ({ onLogout }) => {
  const [shadowTodo, setShadowTodo] = useState(null);
  const todoBoardRef = useRef(null);
  // graphql queries
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, { update: refetch });
  const [updateTodo] = useMutation(UPDATE_TODO, { update: refetch });
  const [checkTodo] = useMutation(CHECK_TODO, { update: refetch });
  const [updateTodoPosition] = useMutation(UPDATE_TODO_POSITION, {
    update: refetch,
  });
  const [deleteTodo] = useMutation(DELETE_TODO, { update: refetch });

  const enableShadowTodo = selectedTodoId => {
    // copy selected Todo to shadow Todo.
    // This component will be referenced by other functions to fetch selected todo data.
    if (data && data.myTodos) {
      setShadowTodo(data.myTodos.filter(todo => todo.id === selectedTodoId)[0]);
    }
  };

  const createNewTodo = () => {
    createTodo({
      variables: {
        title: 'New Title',
        description: 'New Description',
        x: 200,
        y: 200,
      },
    });
  };

  const handleNewTodo = () => {
    hideContextMenu();
    createNewTodo();
  };

  // Todo Moving events
  const handleMouseUp = e => {
    if (shadowTodo !== null) {
      const { clientX, clientY } = e;

      // request updateTodoPosition
      updateTodoPosition({
        variables: {
          id: Number(shadowTodo.id),
          x: clientX - 150,
          y: clientY,
        },
      });

      setShadowTodo(null);
    }
  };

  const handleMouseMove = e => {
    if (shadowTodo !== null) {
      const { clientX, clientY } = e;
      document.querySelector(`#shadow`).style.left = `${clientX - 150}px`;
      document.querySelector(`#shadow`).style.top = `${clientY}px`;
      document.querySelector(`#shadow`).style.opacity = 0.3;
    }
  };

  // context menu event
  useEffect(() => {
    if (todoBoardRef.current) {
      const handleContextMenu = event => {
        event.preventDefault();
        const menu = document.querySelector('.todo-board-contextmenu');

        // open context menu
        const { clientX, clientY } = event;
        menu.style.left = `${clientX}px`;
        menu.style.top = `${clientY}px`;
        menu.style.opacity = 1;

        return false;
      };

      todoBoardRef.current.addEventListener('click', hideContextMenu);

      // add a context menu event
      todoBoardRef.current.addEventListener('contextmenu', handleContextMenu);
    }
  }, [todoBoardRef]);

  return (
    <div>
      <span id="draggableTodoId" value="" />
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          Todo App
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="#" onClick={onLogout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div
        className="todo-board"
        id="todoBoard"
        ref={todoBoardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {loading ? (
          <div className="text-center" style={{ marginTop: 300 }}>
            <Loading />
          </div>
        ) : error ? (
          onLogout() // if there is error, logout.
        ) : (
          <>
            {data.myTodos.map(todo => {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id.toString()}
                  title={todo.title}
                  checked={todo.checked}
                  description={todo.description}
                  onClickHeader={() => enableShadowTodo(todo.id)}
                  onUpdate={({ title, description }) => {
                    // request update
                    updateTodo({
                      variables: { id: todo.id, title, description },
                    });
                  }}
                  onCheck={() => {
                    // request update
                    checkTodo({
                      variables: { id: todo.id, checked: !todo.checked },
                    });
                  }}
                  onDelete={() => {
                    // request delete
                    deleteTodo({
                      variables: { id: todo.id },
                    });
                  }}
                  x={todo.position.x}
                  y={todo.position.y}
                />
              );
            })}
            {shadowTodo ? (
              <Todo
                id="shadow"
                title={shadowTodo.title}
                description={shadowTodo.description}
                checked={shadowTodo.checked}
                hidden
              />
            ) : null}
            <div className="quick-menu">
              <i className="fa fa-plus" onClick={handleNewTodo} />
            </div>
          </>
        )}
      </div>
      <ListGroup className="todo-board-contextmenu text-center">
        <ListGroupItem
          tag="a"
          href="#"
          style={{ textDecoration: 'none' }}
          onClick={handleNewTodo}
        >
          New Todo
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

TodoBoard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default TodoBoard;
