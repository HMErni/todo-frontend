import Header from './UI/Header';
import Button from './UI/Button';
import Todo from './features/todos/Todos';
import { useDispatch, useSelector } from 'react-redux';
import AddModal from './features/modals/AddModal';
import { openAddModal } from './features/modals/modalSlice';



function App() {

  const isAddOpen = useSelector((state) => state.modal.isAddOpen);
  
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      {
        isAddOpen && <AddModal/>
      }
      
      <div className="flex justify-end gap-2 p-5">
        <Button style="main" onClick={() => dispatch(openAddModal())}>Add Todo</Button>
      </div>
      <Todo />
    </>
  );
}

export default App;
