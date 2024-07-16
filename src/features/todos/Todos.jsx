import { useGetAllTodosQuery} from './TodoDataAPI';
import Todo from './Todo';
import EditModal from '../modals/EditModal';
import { useDispatch, useSelector } from 'react-redux';

function Todos() {
  const { data, isLoading, isError } = useGetAllTodosQuery();

  const dispatch = useDispatch();
  const selectedTodo = useSelector((state) => state.modal.editTodo);
  const isEditOpen = useSelector((state) => state.modal.isEditOpen);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  

  return (
    <div className="rounded- mx-3 flex flex-col flex-wrap items-center gap-2 p-3 sm:mx-5 sm:flex-row sm:justify-evenly sm:gap-4 sm:p-5">
      {/* fetch all todos */}
      {data?.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
        />
      ))}
      {
        isEditOpen && <EditModal todo={selectedTodo} />
      }

      {/* fetch todo by id */}
      {/* <Todo todo={data} /> */}
    </div>
  );
}

export default Todos;
