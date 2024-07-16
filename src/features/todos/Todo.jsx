import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import { openEditModal } from '../modals/modalSlice';
import { useDeleteTodoMutation } from './TodoDataAPI';
import EditModal from '../modals/EditModal';

function Todo({ todo }) {
  const { id, title, description, createdAt, isDone} = todo;

  const [deleteTodo, {data, isLoading, isError}] = useDeleteTodoMutation();

  const date = new Date(createdAt).toLocaleDateString();

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure to delete this Todo?") == true) {
          await deleteTodo(id);
        } 
      }catch (err) {
        console.log("Error deleting todo: ", err); 
    }
  };

  return (
    <>
    
    <div className="my-3 h-72 w-full rounded-md bg-amber-100 md:w-96">
      <div className="flex justify-between px-5 py-4">
        <p>CreatedAt: {date}</p>
        <div className="flex gap-2">
          <Button style="other" onClick={() => {dispatch(openEditModal(todo))}}>Edit</Button>
          
          <Button style="other" onClick={() => handleDelete(id)}>Delete</Button>
        </div>
      </div>
      {
        isDone &&
        <h1 className="py-2 px-3 mx-5 font-semibold text-amber-700">This Todo is already done!</h1>
      }
      <h1 className="py-2 text-center font-semibold">{title}</h1>
      <div className="mx-5 bg-amber-50 p-3 rounded-md">
        <p>{description}</p>
      </div>
    </div>
    </>
  );
}

export default Todo;
