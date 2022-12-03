import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getItems = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getItems());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const [alert, setAlert] = useState({ show: false, msg: '', color: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'please fill up the field.', 'danger');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      )
      setName('');
      setEditId(0);
      setIsEditing(false);
      showAlert(true, 'item edited succesfully.', 'success')
    } else {
      showAlert(true, 'the item is being added.', 'success');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }

  }
  const showAlert = (show = false, msg = '', color = '') => {
    setAlert({ show, msg, color });
  }

  const clearList = () => {
    showAlert(true, 'empty list', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'item removed.', 'danger');
    setList(list.filter((item) => item.id !== id));
  }
  const editItem = (id) => {
    const editedItem = list.find((item) => item.id === id);
    setEditId(id);
    setIsEditing(true);
    setName(editedItem.title);
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder='e.g. apple' value={name} onChange={(e) => setName(e.target.value)} />
          <button type='submit' className='submit-btn'>{isEditing ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App
