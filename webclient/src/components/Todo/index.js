import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';

const Todo = ({
  id,
  title,
  description,
  checked,
  x,
  y,
  onClickHeader,
  onUpdate,
  onCheck,
  onDelete,
  hidden,
}) => {
  const [txtTitle, setTitle] = useState(title);
  const [txtDescription, setDescription] = useState(description);
  const [isEditing, editMode] = useState(false);
  const todoRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (todoRef.current) {
      if (x && y) {
        todoRef.current.style.left = `${x}px`;
        todoRef.current.style.top = `${y}px`;
      }

      if (hidden) {
        todoRef.current.style.opacity = 0;
      } else {
        todoRef.current.style.opacity = 1;
      }
    }
  }, [todoRef, x, y, hidden]);

  const handleUpdate = () => {
    const title = txtTitle;
    const description = txtDescription;

    if (!title || !description) {
      alert('Fill input boxes.');
    }

    onUpdate({ title, description });
    editMode(false);
  };

  return (
    <div className="todo" id={id} ref={todoRef}>
      <Card>
        <div className="header">
          <div
            className="draggable-header"
            onMouseDown={onClickHeader}
            ref={headerRef}
          />
          <div className="header-iconbar">
            <i className="fa fa-window-close btn-close" onClick={onDelete} />
            <i
              className="fa fa-edit btn-edit"
              onClick={e => editMode(!isEditing)}
            />
          </div>
        </div>
        <CardBody>
          {isEditing ? (
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  onChange={e => setTitle(e.target.value)}
                  value={txtTitle}
                  placeholder="title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  onChange={e => setDescription(e.target.value)}
                  value={txtDescription}
                  placeholder="description"
                />
              </FormGroup>
              <Button
                type="button"
                onClick={handleUpdate}
                color="primary"
                className="mr-3"
              >
                Edit
              </Button>
              <Button
                type="button"
                color="danger"
                onClick={() => editMode(false)}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <CardTitle style={{ fontWeight: 'bold' }}>{title}</CardTitle>
              <hr />
              <CardSubtitle>{description}</CardSubtitle>
              <hr />
              <div
                className={`btn-check text-center shadow ${
                  checked ? 'checked' : 'unchecked'
                }`}
                onClick={onCheck}
              >
                <i className="fa fa-check" />
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  onClickHeader: PropTypes.func,
  onUpdate: PropTypes.func,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
  hidden: PropTypes.bool,
};

export default Todo;
