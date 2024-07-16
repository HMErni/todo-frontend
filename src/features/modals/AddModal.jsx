import { useDispatch } from 'react-redux';
import { closeAddModal } from './modalSlice';
import Button from '../../UI/Button';
import { useAddNewTodoMutation } from '../todos/TodoDataAPI';
import { useState } from 'react';

export default function AddModal() {

  const [addNewTodo, { isLoading, isError }] = useAddNewTodoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [createdAt, setCreatedAt] = useState(new Date());

  const dispatch = useDispatch();


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTodo = {
        title,
        description,
        isDone,
        createdAt,
      };

      await addNewTodo(newTodo);

      console.log("New todo added successfully");
    } catch (err) {
      console.log("Error adding new todo: ",err);
    }

    setTitle("");
    setDescription("");
    setIsDone(false);
    setCreatedAt(new Date());

    dispatch(closeAddModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="relative mx-auto my-6 w-auto max-w-3xl">
        {/*content*/}
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-amber-50 shadow-lg outline-none focus:outline-none">
          {/*header*/}
          <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
            <h3 className="text-xl font-semibold">Add Todo</h3>
          </div>
          {/*body*/}
          <div className="p-5">
            <form>
              <input
                type="text"
                placeholder="Title"
                className="m-2 w-full rounded-lg border-gray-300 p-2 text-black"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="m-2 w-full rounded-lg border-gray-300 p-2 text-black"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex justify-center gap-2">
                <Button onClick={handleSubmit}>Add</Button>
                <Button onClick={() => dispatch(closeAddModal())}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}