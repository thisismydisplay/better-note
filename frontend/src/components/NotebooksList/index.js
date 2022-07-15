import { useSelector } from 'react-redux';

import NotebookDetail from '../NotebookDetail';

function NotebooksList() {
    const notebooks = useSelector((state) => {
        return state.notebook.list;
    });

    if (!notebooks) {
        return null;
    }

    return (
        <div className='notebook-list'>
            {notebooks?.map((notebook) => {
                // when notebook.id is undefined react shows a warning, so we check to avoid that
                // this happens sometimes, but it is unclear why - shows up as wanting unique key
                if (!notebook.id) {
                    return null;
                }

                return (
                    <div
                        className='notebook-detail'
                        id={`notebook-${notebook.id}`}
                        key={notebook.id}
                    >
                        <NotebookDetail notebook={notebook} key={notebook.id} />
                    </div>
                );
            })}
        </div>
    );
}

export default NotebooksList;
