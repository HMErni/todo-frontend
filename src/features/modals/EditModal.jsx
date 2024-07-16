import { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { closeEditModal } from '../../features/modals/modalSlice';
import { useUpdateTodoMutation } from '../todos/TodoDataAPI';

export default function EditModal({todo}) {
  
    const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
      setId(todo.id);
      setTitle(todo.title);
      setDescription(todo.description);
      setIsDone(todo.isDone);
      setCreatedAt(todo.createdAt);
    }, [todo]);
  

    const [updatedTodo, {data, isLoading, isError}] = useUpdateTodoMutation();

    const date = new Date(createdAt).toLocaleDateString();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {

        const newTodo = { 
          title: title,
          description: description,
          isDone: isDone,
        };

        await updatedTodo({id: id, updatedTodo: newTodo})
        
      } catch (err) {
        console.log("Error updating todo: ",err); 
      }
      dispatch(closeEditModal())
    };

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (isError) {
      return <p>Error</p>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            {/*content*/}
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-amber-50 shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                <h3 className="text-xl font-semibold">Edit Todo</h3>
              </div>
              {/*body*/}
              <div className="p-5">
                <form className='m-4 space-y-3'>
                  <p className='p-2 '> Created At: {date} </p>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full rounded-lg border-gray-300 p-2 text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required={true}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full rounded-lg border-gray-300 p-2 text-black"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required={true}
                  />
                  <label>
                    <input type='checkbox' checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
                    <span className='ml-2'>Is Done? </span>
                  </label>
                  <div className="flex justify-center gap-2">
                    <Button onClick={handleSubmit}>Update</Button>
                    <Button onClick={() => dispatch(closeEditModal())}>Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
